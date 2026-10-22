# -*- coding: utf-8 -*-
"""STEP -> GLB 彩色转换（光滑着色版）
与 step2glb_color.py 的区别：
  1. 使用 CAD 曲面自身的逐点法线（Poly_Triangulation.ComputeNormals），
     曲面内部光滑、棱边保持锐利，不再一块一块的平面感
  2. 更细的角度公差，圆柱/曲面轮廓更圆
用法: python step2glb_smooth.py 输入.step 输出.glb [线性公差] [角度公差]
"""
import sys, os

def tessellate_shape(shape, lin, ang):
    """网格化并取逐点法线，返回 [(verts, tris, normals, solid_key, face)]"""
    from OCP.BRepMesh import BRepMesh_IncrementalMesh
    from OCP.BRep import BRep_Tool
    from OCP.TopExp import TopExp_Explorer
    from OCP.TopAbs import TopAbs_FACE, TopAbs_SOLID, TopAbs_REVERSED
    from OCP.TopoDS import TopoDS
    from OCP.TopTools import TopTools_IndexedDataMapOfShapeListOfShape
    from OCP.TopLoc import TopLoc_Location

    BRepMesh_IncrementalMesh(shape, lin, False, ang, True)

    amap = TopTools_IndexedDataMapOfShapeListOfShape()
    from OCP.TopExp import TopExp
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
                nx, ny, nz = (trsf.Value(1, 1) * nx + trsf.Value(1, 2) * ny + trsf.Value(1, 3) * nz,
                              trsf.Value(2, 1) * nx + trsf.Value(2, 2) * ny + trsf.Value(2, 3) * nz,
                              trsf.Value(3, 1) * nx + trsf.Value(3, 2) * ny + trsf.Value(3, 3) * nz)
                normals.append((nx, ny, nz))
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

    def try_get_color(sh, key):
        for ctype in (XCAFDoc_ColorType.XCAFDoc_ColorSurf,
                      XCAFDoc_ColorType.XCAFDoc_ColorGen,
                      XCAFDoc_ColorType.XCAFDoc_ColorCurv):
            if color_tool.GetColor(sh, ctype, col):
                colors[key] = (col.Red(), col.Green(), col.Blue())
                return True
        return False

    seq = TDF_LabelSequence()
    shape_tool.GetShapes(seq)
    n_color = 0
    for i in range(1, seq.Length() + 1):
        sh = shape_tool.GetShape_s(seq.Value(i))
        if sh.IsNull():
            continue
        if try_get_color(sh, sh.__hash__()):
            n_color += 1
    print("  STEP 自带颜色: %d 个带色对象" % n_color)
    return shape, colors

def fallback_color(volume):
    if volume > 100000: return (0.84, 0.85, 0.86, 0.15, 0.50)
    if volume > 10000:  return (0.12, 0.34, 0.65, 0.25, 0.42)
    if volume > 500:    return (0.55, 0.60, 0.66, 0.60, 0.42)
    return (0.82, 0.84, 0.88, 0.85, 0.30)

def main():
    src, dst = sys.argv[1], sys.argv[2]
    lin = float(sys.argv[3]) if len(sys.argv) > 3 else 0.4
    ang = float(sys.argv[4]) if len(sys.argv) > 4 else 0.2

    import cadquery as cq
    import numpy as np
    import trimesh
    from trimesh.visual.material import PBRMaterial

    print("读取 STEP + 颜色...")
    shape, step_colors = read_step_colors(src)

    print("网格化 lin=%s ang=%s 并计算曲面法线..." % (lin, ang))
    faces = tessellate_shape(shape, lin, ang)

    cq_shape = cq.Shape.cast(shape)
    solid_vol = {}
    for s in cq_shape.Solids():
        solid_vol[s.wrapped.__hash__()] = s.Volume()
    print("  %d 个零件, %d 个面片块" % (len(solid_vol), len(faces)))

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

    print("  颜色分组数: %d" % len(groups))

    scene_dict = {}
    for idx, (col, items) in enumerate(sorted(groups.items())):
        vs, fs, ns, off = [], [], [], 0
        for verts, tris, normals in items:
            vs.extend(verts)
            ns.extend(normals)
            fs.extend([(a + off, b + off, c + off) for a, b, c in tris])
            off += len(verts)
        mesh = trimesh.Trimesh(vertices=np.array(vs, dtype=np.float64),
                               faces=np.array(fs, dtype=np.int64),
                               vertex_normals=np.array(ns, dtype=np.float64),
                               process=False)
        r, g, b, met, rgh = col
        lr, lg, lb = r**2.2, g**2.2, b**2.2
        mesh.visual = trimesh.visual.TextureVisuals(
            material=PBRMaterial(
                baseColorFactor=[int(lr*255), int(lg*255), int(lb*255), 255],
                metallicFactor=met, roughnessFactor=rgh, doubleSided=True))
        scene_dict["part_%02d" % idx] = mesh
        print("    part_%02d: %d 面" % (idx, len(fs)))

    scene = trimesh.Scene(scene_dict)
    bounds = scene.bounds
    scene.apply_translation(-(bounds[0] + bounds[1]) / 2)
    scene.export(dst, include_normals=True)
    print("完成: %s (%.2f MiB)" % (dst, os.path.getsize(dst) / 1048576))

if __name__ == "__main__":
    main()
