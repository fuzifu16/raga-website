# -*- coding: utf-8 -*-
"""STEP -> GLB 转换脚本（用于网站三维在线预览）
用法: python step2glb.py 输入.step 输出.glb [线性公差]
公差越小模型越精细、文件越大。网站要求 GLB < 20MB（Cloudflare 单文件 25MB 限制）。
"""
import sys, os

def main():
    if len(sys.argv) < 3:
        print("用法: python step2glb.py 输入.step 输出.glb [公差]")
        sys.exit(1)
    src, dst = sys.argv[1], sys.argv[2]
    tol = float(sys.argv[3]) if len(sys.argv) > 3 else 0.5

    import cadquery as cq
    import trimesh
    import numpy as np

    print("读取 STEP（大文件需几分钟）...")
    shape = cq.importers.importStep(src)
    solid = shape.val()
    print("  包围盒:", solid.BoundingBox().xlen, solid.BoundingBox().ylen, solid.BoundingBox().zlen)

    tmp_stl = dst + ".tmp.stl"
    print("网格化 tessellate (tol=%s)..." % tol)
    cq.exporters.export(shape, tmp_stl, exportType="STL",
                        tolerance=tol, angularTolerance=0.35)

    mesh = trimesh.load(tmp_stl)
    print("  原始网格: %d 面, %.1f MB" % (len(mesh.faces), os.path.getsize(tmp_stl) / 1048576))

    # 若 GLB 会超 20MB，做四边形简化
    target_max = 20 * 1024 * 1024
    est = len(mesh.faces) * 64  # 每面约64字节估GLB体积
    if est > target_max:
        ratio = max(0.05, target_max / est)
        print("  超限，简化到 %.0f%% ..." % (ratio * 100))
        try:
            import fast_simplification  # noqa
            import trimesh.creation
            pts, faces = fast_simplification.simplify(
                mesh.vertices, mesh.faces, target_count=int(len(mesh.faces) * ratio))
            mesh = trimesh.Trimesh(pts, faces)
            print("  简化后: %d 面" % len(mesh.faces))
        except ImportError:
            print("  [警告] fast-simplification 未安装，跳过简化，GLB 可能较大")

    # 居中到原点
    mesh.apply_translation(-mesh.bounds.mean(axis=0))

    scene = trimesh.Scene({"model": mesh})
    scene.export(dst)
    os.remove(tmp_stl)
    print("完成: %s (%.1f MB)" % (dst, os.path.getsize(dst) / 1048576))

if __name__ == "__main__":
    main()
