#!/usr/bin/env bash
# ss [label] — ADB screenshot, минимальный размер для визуального теста
# ~5-15KB, 162x360px (достаточно чтобы видеть UI)

LABEL="${1:-s}"
OUTDIR="C:/tmp/ds-screens"
OUT="${OUTDIR}/$(date +%H%M%S)-${LABEL}.jpg"
ADB="/c/Users/Usser/AppData/Local/Android/Sdk/platform-tools/adb"

mkdir -p "$OUTDIR"
ls -t "${OUTDIR}"/*.jpg 2>/dev/null | tail -n +11 | xargs rm -f 2>/dev/null || true

"$ADB" shell "screencap /data/local/tmp/sc.png" 2>/dev/null
MSYS_NO_PATHCONV=1 "$ADB" pull /data/local/tmp/sc.png "${OUTDIR}/raw.png" 2>/dev/null

python - "${OUTDIR}/raw.png" "$OUT" <<'PY'
import sys
from PIL import Image
img = Image.open(sys.argv[1])
w, h = img.size
img = img.resize((w//6, h//6), Image.LANCZOS).convert("RGB")
img.save(sys.argv[2], "JPEG", quality=20, optimize=True)
import os; print(os.path.basename(sys.argv[2]), f"{os.path.getsize(sys.argv[2])//1024}KB")
PY

rm -f "${OUTDIR}/raw.png"
