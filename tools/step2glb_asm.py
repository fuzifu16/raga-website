# -*- coding: utf-8 -*-
"""STEP -> GLB 超大装配专用（保形版，不减面）
与 step2glb_burst.py 的区别：
  旧版为压体积用 fast_simplification 砍掉 ~80% 三角面 —— 圆孔/柱面直接被削平，
  看起来"一块一块、坑坑洼洼"。本版完全不减面，只做两件事：
    1. 用更粗的网格公差控制面数（面数够用就好，形状不变形）
    2. 按 (位置, 法线) 合并重复顶点 —— 只删冗余点，不动几何
  法线全部取 CAD 曲面自身的逐点法线，曲面光滑、棱边锐利。
用法: python step2glb_asm.py 输入.step 输出.glb [目标MiB]
"""
import sys, os

def tessellate_shape(shape, lin, ang):
    """网格化并取逐点法线，返回 [(verts, tris, normals, solid_key, face)]"""
    from OCP.BRepMesh import BRepMesh_IncrementalMesh
    from OCP.BRep import BRep_Tool
    from OCP.BRepTools import BRepTools
    from OCP.TopExp import TopExp_Explorer, TopExp
    from OCP.TopAbs import TopAbs_FACE, TopAbs_SOLID, TopAbs_REVERSED
    from OCP.TopoDS import TopoDS
    from OCP.TopTools import TopTools_IndexedDataMapOfShapeListOfShape
    from OCP.TopLoc import TopLoc_Location

    # 关键：先清掉上一轮已生成的三角化，否则 OCC 认为现有网格已满足要求而拒绝重划
    BRepTools.Clean_s(shape)
    BRepMesh_IncrementalMesh(shape, lin, False, ang, True)
    amap = TopTools_IndexedDataMapOfShapeListOfShape()
    TopExp.MapShapesAndAncestors_s(shape, TopAbs_FACE, TopAbs_SOLID, amap)

    out = []
    exp = TopExp_Explorer(shape, TopAbs_FACE)
    while exp.More():
        face = TopoDS.Face_s(exp.Current())
        loc = TopLoc_Location()
        tri = BRep_Tool.Triangulation_s(face, loc)
        if tri is not None and tri.NbTriangles() > 0:
            if not tri.HasNormals():
                tri.ComputeNormals()
            trsf = loc.Transformation()
            m = (trsf.Value(1, 1), trsf.Value(1, 2), trsf.Value(1, 3),
                 trsf.Value(2, 1), trsf.Value(2, 2), trsf.Value(2, 3),
                 trsf.Value(3, 1), trsf.Value(3, 2), trsf.Value(3, 3))
            reversed_face = (face.Orientation() == TopAbs_REVERSED)
            verts, normals = [], []
            for i in range(1, tri.NbNodes() + 1):
                p = tri.Node(i).Transformed(trsf)
                verts.append((p.X(), p.Y(), p.Z()))
                n = tri.Normal(i)
                nx, ny, nz = n.X(), n.Y(), n.Z()
                if reversed_face:
                    nx, ny, nz = -nx, -ny, -nz
                # 法线只受旋转变换
                normals.append((m[0] * nx + m[1] * ny + m[2] * nz,
                                m[3] * nx + m[4] * ny + m[5] * nz,
                                m[6] * nx + m[7] * ny + m[8] * nz))
            tris = []
            for i in range(1, tri.NbTriangles() + 1):
                a, b, c = tri.Triangle(i).Get()
                if reversed_face:
                    tris.append((a - 1, c - 1, b - 1))
                else:
                    tris.append((a - 1, b - 1, c - 1))
            solid_key = None
            try:
                lst = amap.FindFromKey(face)
                if not lst.IsEmpty():
                    solid_key = lst.First().__hash__()
            except Exception:
                pass
            out.append((verts, tris, normals, solid_key, face))
        exp.Next()
    return out

def read_step_colors(path):
    from OCP.STEPCAFControl import STEPCAFControl_Reader
    from OCP.TDocStd import TDocStd_Document
    from OCP.XCAFDoc import XCAFDoc_DocumentTool, XCAFDoc_ColorType
    from OCP.TCollection import TCollection_ExtendedString
    from OCP.TDF import TDF_LabelSequence
    from OCP.Quantity import Quantity_Color

    doc = TDocStd_Document(TCollection_ExtendedString("XmlOcaf"))
    reader = STEPCAFControl_Reader()
    reader.SetNameMode(True)
    reader.SetColorMode(True)
    if reader.ReadFile(path) != 1:
        raise RuntimeError("STEP 读取失败")
    reader.Transfer(doc)
    shape_tool = XCAFDoc_DocumentTool.ShapeTool_s(doc.Main())
    color_tool = XCAFDoc_DocumentTool.ColorTool_s(doc.Main())
    labels = TDF_LabelSequence()
    shape_tool.GetFreeShapes(labels)
    shape = shape_tool.GetShape_s(labels.Value(1))

    colors = {}
    col = Quantity_Color()
    seq = TDF_LabelSequence()
    shape_tool.GetShapes(seq)
    for i in range(1, seq.Length() + 1):
        sh = shape_tool.GetShape_s(seq.Value(i))
        if sh.IsNull():
            continue
        for ctype in (XCAFDoc_ColorType.XCAFDoc_ColorSurf,
                      XCAFDoc_ColorType.XCAFDoc_ColorGen,
                      XCAFDoc_ColorType.XCAFDoc_ColorCurv):
            if color_tool.GetColor(sh, ctype, col):
                colors[sh.__hash__()] = (col.Red(), col.Green(), col.Blue())
                break
    return shape, colors

def fallback_color(volume):
    if volume > 100000: return (0.84, 0.85, 0.86, 0.15, 0.50)
    if volume > 10000:  return (0.12, 0.34, 0.65, 0.25, 0.42)
    if volume > 500:    return (0.55, 0.60, 0.66, 0.60, 0.42)
    return (0.82, 0.84, 0.88, 0.85, 0.30)

def merge_pos_normal(vs, ns, fs, pos_dec=3, nrm_dec=2):
    """按 (位置, 法线) 合并顶点；位置精确到 0.001，法线精确到 ~1/127"""
    import numpy as np
    n = len(vs)
    if n == 0:
        return vs, ns, fs
    key = np.empty((n, 6), dtype=np.float32)
    np.round(vs, pos_dec, out=key[:, :3])
    np.round(ns * 127.0, nrm_dec, out=key[:, 3:])
    # 以字节视图做 unique，比 axis=0 快得多
    rec = np.ascontiguousarray(key).view(np.dtype((np.void, key.dtype.itemsize * 6))).ravel()
    _, idx, inv = np.unique(rec, return_index=True, return_inverse=True)
    new_fs = inv.reshape(-1)[np.asarray(fs, dtype=np.int64).ravel()].reshape(-1, 3)
    return vs[idx], ns[idx], new_fs.astype(np.int32)

def main():
    src, dst = sys.argv[1], sys.argv[2]
    budget_mib = float(sys.argv[3]) if len(sys.argv) > 3 else 21.0

    import cadquery as cq
    import numpy as np
    import trimesh
    from trimesh.visual.material import PBRMaterial

    print("读取 STEP + 颜色...")
    shape, step_colors = read_step_colors(src)

    cq_shape = cq.Shape.cast(shape)
    solid_vol = {}
    for s in cq_shape.Solids():
        solid_vol[s.wrapped.__hash__()] = s.Volume()

    # 逐级放粗网格，直到体积进入预算（绝不减面，只降网格密度）
    TIERS = [(0.8, 0.45), (1.2, 0.55), (1.8, 0.70),
             (2.6, 0.88), (3.5, 1.05), (4.5, 1.20)]
    # 可选：指定 lin/ang 则只跑这一档（后续交给 Draco 压缩，不必靠降网格压体积）
    if len(sys.argv) > 5:
        TIERS = [(float(sys.argv[4]), float(sys.argv[5]))]
        budget_mib = 1e9
    chosen = None
    for lin, ang in TIERS:
        print("网格化 lin=%s ang=%s ..." % (lin, ang))
        faces = tessellate_shape(shape, lin, ang)
        groups = {}
        for verts, tris, normals, skey, face in faces:
            col = None
            if skey in step_colors:
                c = step_colors[skey]; col = (c[0], c[1], c[2], 0.25, 0.5)
            elif face.__hash__() in step_colors:
                c = step_colors[face.__hash__()]; col = (c[0], c[1], c[2], 0.25, 0.5)
            if col is None and skey in solid_vol:
                col = fallback_color(solid_vol[skey])
            if col is None:
                col = (0.55, 0.58, 0.62, 0.3, 0.5)
            groups.setdefault(col, []).append((verts, tris, normals))

        merged = {}
        total_tris = total_verts = 0
        for col, items in groups.items():
            Vs, Ns, Fs, off = [], [], [], 0
            for verts, tris, normals in items:
                Vs.append(np.asarray(verts, dtype=np.float32))
                Ns.append(np.asarray(normals, dtype=np.float32))
                Fs.append(np.asarray(tris, dtype=np.int64) + off)
                off += len(verts)
            vs = np.concatenate(Vs); ns = np.concatenate(Ns); fs = np.concatenate(Fs)
            mvs, mns, mfs = merge_pos_normal(vs, ns, fs)
            merged[col] = (mvs, mns, mfs)
            total_tris += len(mfs); total_verts += len(mvs)
            del Vs, Ns, Fs, vs, ns, fs
        est = (total_verts * 24 + total_tris * 12) / 1048576.0
        print("  %d 零件 / %d 三角面 / %d 顶点 -> 预估 %.1f MiB" %
              (len(solid_vol), total_tris, total_verts, est))
        chosen = merged
        if est <= budget_mib:
            print("  ✓ 进入预算")
            break
        print("  ✗ 超预算，放粗一档")

    scene_dict = {}
    for idx, (col, (mvs, mns, mfs)) in enumerate(sorted(chosen.items())):
        mesh = trimesh.Trimesh(vertices=mvs, faces=mfs, vertex_normals=mns, process=False)
        r, g, b, met, rgh = col
        lr, lg, lb = r**2.2, g**2.2, b**2.2
        mesh.visual = trimesh.visual.TextureVisuals(
            material=PBRMaterial(
                baseColorFactor=[int(lr*255), int(lg*255), int(lb*255), 255],
                metallicFactor=met, roughnessFactor=rgh, doubleSided=True))
        scene_dict["part_%02d" % idx] = mesh
        print("    part_%02d: %d 面" % (idx, len(mfs)))

    scene = trimesh.Scene(scene_dict)
    bounds = scene.bounds
    scene.apply_translation(-(bounds[0] + bounds[1]) / 2)
    scene.export(dst, include_normals=True)
    print("完成: %s (%.2f MiB)" % (dst, os.path.getsize(dst) / 1048576))

if __name__ == "__main__":
    main()
