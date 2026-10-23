# -*- coding: utf-8 -*-
"""DWG -> 黑底预览图 PNG（还原 CAD 黑色背景显示效果）
流程: dwg2dxf(LibreDWG) 转 DXF -> ezdxf/matplotlib 渲染(透明底) -> 合成到黑底
用法: python tools/dwg2png.py  (批量处理 downloads/dwg/*.dwg -> downloads/dwg-preview/*.png)
"""
import os, sys, glob, subprocess, tempfile, shutil, io, time

PROJ = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DWG_DIR = os.path.join(PROJ, 'downloads', 'dwg')
OUT_DIR = os.path.join(PROJ, 'downloads', 'dwg-preview')
DWG2DXF = r'C:/Users/fulon/AppData/Local/Temp/ldwg/dwg2dxf.exe'

os.makedirs(OUT_DIR, exist_ok=True)


def convert_one(dwg_path, tmpdir):
    base = os.path.splitext(os.path.basename(dwg_path))[0]
    out_png = os.path.join(OUT_DIR, base + '.png')
    if os.path.exists(out_png) and not os.environ.get('DWG_FORCE'):
        return 'skip'
    # 1) DWG -> DXF（ASCII 临时名，避免中文路径问题）
    t_dwg = os.path.join(tmpdir, 'in.dwg')
    t_dxf = os.path.join(tmpdir, 'out.dxf')
    shutil.copy(dwg_path, t_dwg)
    if os.path.exists(t_dxf):
        os.remove(t_dxf)
    r = subprocess.run([DWG2DXF, '-v0', '-o', t_dxf, t_dwg],
                       capture_output=True, timeout=300)
    if not os.path.exists(t_dxf):
        return 'dxf-fail: ' + r.stderr.decode('utf-8', 'ignore')[-120:]
    # 2) DXF -> 透明底渲染 -> 黑底合成
    import ezdxf
    from ezdxf.addons.drawing import RenderContext, Frontend
    from ezdxf.addons.drawing.matplotlib import MatplotlibBackend
    import matplotlib
    matplotlib.use('Agg')
    import matplotlib.pyplot as plt
    from PIL import Image

    doc = ezdxf.readfile(t_dxf)
    msp = doc.modelspace()
    # 防护：删除坐标异常（>1e8）的损坏实体，避免画布被撑到无限大
    import math

    def _vec(p):
        try:
            return abs(float(p[0])), abs(float(p[1]))
        except TypeError:
            return abs(float(p.x)), abs(float(p.y))

    bad_ents = []
    for ent in msp:
        t = ent.dxftype()
        p = None
        try:
            if t == 'ARC':
                p = _vec(ent.dxf.center)
            elif t == 'CIRCLE':
                p = _vec(ent.dxf.center)
            elif t in ('LINE',):
                p = _vec(ent.dxf.start)
            elif t == 'SOLID':
                p = _vec(ent.dxf.vtx0)
        except Exception:
            pass
        if p and (p[0] > 1e8 or p[1] > 1e8):
            bad_ents.append(ent)
    for ent in bad_ents:
        msp.delete_entity(ent)
    if bad_ents:
        print('[drop %d bad-coord ents]' % len(bad_ents), end=' ')
    fig = plt.figure(figsize=(16, 11.32))
    ax = fig.add_axes([0, 0, 1, 1])
    ctx = RenderContext(doc)
    out = MatplotlibBackend(ax)
    fe = Frontend(ctx, out)
    try:
        fe.draw_entities(msp)
    except Exception:
        # 整体渲染失败（个别样条实体节点数据异常）→ 逐实体容错跳过
        plt.close(fig)
        fig = plt.figure(figsize=(16, 11.32))
        ax = fig.add_axes([0, 0, 1, 1])
        out = MatplotlibBackend(ax)
        fe = Frontend(ctx, out)
        bad = 0
        for ent in msp:
            try:
                fe.draw_entities([ent])
            except Exception:
                bad += 1
        if bad:
            print('[skip %d bad ents]' % bad, end=' ')
    out.finalize()
    buf = io.BytesIO()
    fig.savefig(buf, format='png', dpi=420, transparent=True)
    plt.close(fig)
    buf.seek(0)
    img = Image.open(buf).convert('RGBA')
    black = Image.new('RGBA', img.size, (5, 5, 5, 255))
    comp = Image.alpha_composite(black, img).convert('RGB')
    # 内容聚焦裁剪：内容 bbox 占比过小时裁剪放大
    import numpy as np
    g = np.asarray(comp.convert('L'))
    ys, xs = np.where(g > 18)
    if len(xs):
        bx0, bx1 = int(xs.min()), int(xs.max())
        by0, by1 = int(ys.min()), int(ys.max())
        area = (bx1 - bx0) * (by1 - by0)
        if area < 0.55 * g.size and area > 0:
            mx = int(0.03 * (bx1 - bx0)) + 8
            my = int(0.03 * (by1 - by0)) + 8
            comp = comp.crop((max(0, bx0 - mx), max(0, by0 - my),
                              min(comp.width, bx1 + mx), min(comp.height, by1 + my)))
    # 64 色索引 PNG：线稿压缩率极高（高清体积反而小于低清全彩）
    comp.convert('P', palette=Image.ADAPTIVE, colors=64).save(out_png, optimize=True)
    os.remove(t_dxf)
    return 'ok %.0fKB' % (os.path.getsize(out_png) / 1024)


def main():
    only = sys.argv[1] if len(sys.argv) > 1 else None
    files = sorted(glob.glob(os.path.join(DWG_DIR, '*.dwg')))
    if only:
        files = [f for f in files if only.lower() in os.path.basename(f).lower()]
    print('total %d dwg' % len(files))
    tmpdir = tempfile.mkdtemp(prefix='dwg2png_')
    ok = fail = 0
    try:
        for i, f in enumerate(files, 1):
            t0 = time.time()
            try:
                res = convert_one(f, tmpdir)
            except Exception as e:
                res = 'err: %s' % str(e)[:150]
            if res.startswith(('ok', 'skip')):
                ok += 1
            else:
                fail += 1
            print('%3d/%d %-40s %s (%.0fs)' % (i, len(files),
                  os.path.basename(f)[:38], res, time.time() - t0), flush=True)
    finally:
        shutil.rmtree(tmpdir, ignore_errors=True)
    print('done: ok=%d fail=%d' % (ok, fail))


if __name__ == '__main__':
    main()
