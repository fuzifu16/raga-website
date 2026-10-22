# -*- coding: utf-8 -*-
"""批量转换 STEP -> GLB（光滑着色版，自适应公差控体积）
先用高精度 (0.5, 0.3)，产物超 21MiB 逐档降粗，直到合格或用完档位。
"""
import subprocess, sys, os, time

BASE = r"C:/Users/fulon/Desktop/外型图/三维外形图/新建文件夹"
OUT = r"C:/Users/fulon/raga-website/models"
PY = r"C:/Users/fulon/.workbuddy/binaries/python/envs/default/Scripts/python.exe"
SCRIPT = r"C:/Users/fulon/raga-website/tools/step2glb_smooth.py"
LIMIT = 21 * 1024 * 1024  # 21 MiB 安全线（Cloudflare 单文件 25MiB）

# (线性公差mm, 角度公差rad)，从精到粗
TIERS = [(0.5, 0.30), (0.6, 0.35), (0.75, 0.40), (0.9, 0.45), (1.1, 0.50), (1.3, 0.55)]

JOBS = [
    ("RA 分体式外型.STEP", "ra-fenti.glb"),
    ("RL10 外型图.STEP", "rl10.glb"),
    ("RL80  外型图.STEP", "rl80.glb"),
    ("RL150 外型图.STEP", "rl150.glb"),
    ("RQ03 外型图.STEP", "rq03.glb"),
    ("RQ04 外型图.STEP", "rq04.glb"),
    ("RQ06 外型图.STEP", "rq06.glb"),
    ("RQ150 外型图.STEP", "rq150.glb"),
]

def convert(src, dst, lin, ang):
    r = subprocess.run([PY, SCRIPT, src, dst, str(lin), str(ang)],
                       capture_output=True, text=True, encoding="utf-8", errors="replace")
    return r.returncode == 0 and os.path.exists(dst), (r.stdout or "") + (r.stderr or "")

for src_name, dst_name in JOBS:
    src = os.path.join(BASE, src_name)
    dst = os.path.join(OUT, dst_name)
    if not os.path.exists(src):
        print("[跳过] 不存在:", src_name); continue
    t0 = time.time()
    print("=" * 56)
    print("[开始]", src_name, "->", dst_name)
    ok = False
    for lin, ang in TIERS:
        ok, out = convert(src, dst, lin, ang)
        if not ok:
            print("  转换失败 (lin=%s ang=%s)" % (lin, ang))
            print("\n".join(out.strip().splitlines()[-4:]))
            break
        size = os.path.getsize(dst)
        print("  lin=%.2f ang=%.2f -> %.2f MiB %s" % (lin, ang, size / 1048576,
              "OK" if size <= LIMIT else "超限,降档"))
        if size <= LIMIT:
            break
    print("[耗时] %.0f 秒  %s" % (time.time() - t0, "完成" if ok else "失败"))

print("=" * 56)
print("全部结束，产出：")
for f in sorted(os.listdir(OUT)):
    if f.startswith("_"):
        continue
    p = os.path.join(OUT, f)
    print("  %-16s %6.2f MiB %s" % (f, os.path.getsize(p) / 1048576,
          "" if os.path.getsize(p) <= LIMIT else "  <-- 超限!"))
