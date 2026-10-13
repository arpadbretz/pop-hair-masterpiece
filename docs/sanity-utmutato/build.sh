#!/usr/bin/env bash
# Tartalomkezelési útmutató (Sanity Studio) → PDF.
# A betűk (Inter, Cormorant Garamond) statikus TTF-ként vannak a fonts/ mappában:
# változó betűtípusból a Chrome Type 3 fontot ágyazna be, ami egyes PDF-olvasókban
# rosszul jelenik meg.
# Usage: bash docs/sanity-utmutato/build.sh
set -euo pipefail
cd "$(dirname "$0")"
OUT="../Pop-Hair-Tartalomkezelo-utmutato.pdf"
URI=$(python3 -c 'import pathlib; print(pathlib.Path("utmutato.html").resolve().as_uri())')

"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" \
  --headless=new --disable-gpu --no-pdf-header-footer \
  --print-to-pdf="$OUT" "$URI" 2>/dev/null
echo "PDF: $(cd .. && pwd)/$(basename "$OUT")"
pdffonts "$OUT"
