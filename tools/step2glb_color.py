# -*- coding: utf-8 -*-
"""STEP -> GLB 彩色转换（按零件着色）
优先读取 STEP 自带颜色（XCAF），读不到按体积聚类配色。
用法: python step2glb_color.py 输入.step 输出.glb [公差]
"""
import sys, os

def tessellate_shape(shape, tol):
    """用 OCP 底层 API 网格化整个 shape，返回 face 三角形列表 + face->solid 映射"""
    from OCP.BRepMesh import BRepMesh_IncrementalMesh
    from OCP.BRep import BRep_Tool
    from OCP.TopExp import TopExp_Explorer, TopExp
    from OCP.TopAbs import TopAbs_FACE, TopAbs_SOLID
    from OCP.TopoDS import TopoDS
    from OCP.TopTools import TopTools_IndexedDataMapOfShapeListOfShape

    BRepMesh_IncrementalMesh(shape, tol, False, 0.35, True)

    # face -> solid 映射
    amap = TopTools_IndexedDataMapOfShapeListOfShape()
    TopExp.MapShapesAndAncestors_s(shape, TopAbs_FACE, TopAbs_SOLID, amap)

    faces = []
    exp = TopExp_Explorer(shape, TopAbs_FACE)
    while exp.More():
        face = TopoDS.Face_s(exp.Current())
        from OCP.TopLoc import TopLoc_Location
        loc = TopLoc_Location()
        tri = BRep_Tool.Triangulation_s(face, loc)
        if tri is not None and tri.NbTriangles() > 0:
            trsf = loc.Transformation()
            verts = []
            for i in range(1, tri.NbNodes() + 1):
                p = tri.Node(i).Transformed(trsf)
                verts.append((p.X(), p.Y(), p.Z()))
            tris = []
            for i in range(1, tri.NbTriangles() + 1):
                t = tri.Triangle(i)
                a, b, c = t.Get()
                tris.append((a - 1, b - 1, c - 1))
            # 找所属 solid
            solid_key = None
            try:
                lst = amap.FindFromKey(face)
                if not lst.IsEmpty():
                    solid_key = lst.First().__hash__()
            except Exception:
                pass
            faces.append((verts, tris, solid_key, face))
        exp.Next()
    return faces

def read_step_colors(path):
    """读 STEP 返回 (shape, {solid_hash: Quantity_Color})"""
    from OCP.STEPCAFControl import STEPCAFControl_Reader
    from OCP.TDocStd import TDocStd_Document
    from OCP.XCAFDoc import XCAFDoc_DocumentTool, XCAFDoc_ColorType
    from OCP.TCollection import TCollection_ExtendedString
    from OCP.TDF import TDF_LabelSequence
    from OCP.Quantity import Quantity_Color
    from OCP.TopoDS import TopoDS
    from OCP.TopAbs import TopAbs_SOLID, TopAbs_FACE

    doc = TDocStd_Document(TCollection_ExtendedString("XmlOcaf"))
    reader = STEPCAFControl_Reader()
    reader.SetNameMode(True)
    reader.SetColorMode(True)
    status = reader.ReadFile(path)
    if status != 1:
        raise RuntimeError("STEP 读取失败 status=%s" % status)
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

    # 全量遍历 labels：solid 与 face 级
    solid_labels = TDF_LabelSequence()
    shape_tool.GetShapes(solid_labels)
    n_color = 0
    for i in range(1, solid_labels.Length() + 1):
        lab = solid_labels.Value(i)
        sh = shape_tool.GetShape_s(lab)
        if sh.IsNull():
            continue
        h = sh.__hash__()
        if try_get_color(sh, h):
            n_color += 1
    print("  STEP 自带颜色: %d 个带色对象" % n_color)
    return shape, colors

def fallback_color(volume):
    """无颜色时的体积聚类配色（工业风·鲜明版）"""
    if volume > 100000: return (0.84, 0.85, 0.86, 0.15, 0.50)   # 主机壳 浅灰白
    if volume > 10000:  return (0.12, 0.34, 0.65, 0.25, 0.42)   # 部件 饱和企业蓝
    if volume > 500:    return (0.55, 0.60, 0.66, 0.60, 0.42)   # 次级件 中灰蓝
    return (0.82, 0.84, 0.88, 0.85, 0.30)                        # 紧固件 亮铬

def main():
    src, dst = sys.argv[1], sys.argv[2]
    tol = float(sys.argv[3]) if len(sys.argv) > 3 else 0.5

    import cadquery as cq
    import trimesh
    import numpy as np
    from trimesh.visual.material import PBRMaterial

    print("读取 STEP + 颜色...")
    shape, step_colors = read_step_colors(src)

    print("按零件统计体积并网格化 (tol=%s)..." % tol)
    faces = tessellate_shape(shape, tol)

    # solid hash -> 体积
    import cadquery as cq
    cq_shape = cq.Shape.cast(shape)
    solid_vol = {}
    for s in cq_shape.Solids():
        h = s.wrapped.__hash__()
        solid_vol[h] = s.Volume()
    print("  %d 个零件, %d 个面片块" % (len(solid_vol), len(faces)))

    # 按颜色分组
    groups = {}
    no_color = 0
    for verts, tris, skey, face in faces:
        col = None
        if skey in step_colors:
            c = step_colors[skey]; col = (c[0], c[1], c[2], 0.25, 0.5)
        elif face.__hash__() in step_colors:
            c = step_colors[face.__hash__()]; col = (c[0], c[1], c[2], 0.25, 0.5)
        if col is None and skey in solid_vol:
            col = fallback_color(solid_vol[skey])
        if col is None:
            col = (0.55, 0.58, 0.62, 0.3, 0.5)
        groups.setdefault(col, []).append((verts, tris))

    print("  颜色分组数: %d" % len(groups))

    scene_dict = {}
    for idx, (col, items) in enumerate(sorted(groups.items())):
        vs, fs = [], []
        off = 0
        for verts, tris in items:
            vs.extend(verts)
            fs.extend([(a + off, b + off, c + off) for a, b, c in tris])
            off += len(verts)
        mesh = trimesh.Trimesh(np.array(vs), np.array(fs), process=False)
        mesh.remove_unreferenced_vertices()
        r, g, b, met, rgh = col
        # sRGB -> linear（GLTF 规范要求线性空间，否则颜色会显白）
        lr, lg, lb = r**2.2, g**2.2, b**2.2
        mesh.visual = trimesh.visual.TextureVisuals(
            material=PBRMaterial(
                baseColorFactor=[int(lr*255), int(lg*255), int(lb*255), 255],
                metallicFactor=met, roughnessFactor=rgh, doubleSided=True))
        scene_dict["part_%02d" % idx] = mesh
        print("    %s: %d 面 rgb(%.2f,%.2f,%.2f)" % ("part_%02d" % idx, len(fs), r, g, b))

    scene = trimesh.Scene(scene_dict)
    # 居中
    bounds = scene.bounds
    scene.apply_translation(-(bounds[0] + bounds[1]) / 2)

    scene.export(dst)
    print("完成: %s (%.1f MB)" % (dst, os.path.getsize(dst) / 1048576))

if __name__ == "__main__":
    main()
