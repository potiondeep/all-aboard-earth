#!/bin/bash
# Re-tone the divider separations so the landscape keeps its colour while the
# painting's own sky and deep water dissolve into the page.
#
# The rule is tonal, not per-band: a luminance mask drives how much of the
# original survives. Below the low cut (sky, deep water) the page colour shows
# through completely, so the band has no edge against the paper; above the high
# cut (mountains, snow, forest, sunset, wave crests) the original is untouched.
#
# The blend is a plain Over of the masked original onto the page colour.
# Passing the mask straight to -composite instead makes ImageMagick blend in
# linear light, which comes out lighter than either input.
#
#   usage: scripts/divider-tone.sh '#1C5178' src/assets/divider-layers-cy
set -e
BLUE="${1:?page colour, e.g. #1C5178}"
OUT="${2:?output dir}"
LOW="${3:-18%}"     # at or below this luminance, the page colour wins outright
HIGH="${4:-36%}"    # at or above this, the original colour is kept as painted

TMP=$(mktemp -d)
trap 'rm -rf "$TMP"' EXIT
mkdir -p "$OUT"

n=0
for f in src/assets/divider-layers/*.webp; do
  b=$(basename "$f")
  W=$(magick identify -format "%w" "$f")
  H=$(magick identify -format "%h" "$f")
  magick "$f" -alpha extract "$TMP/a.png"
  magick -size "${W}x${H}" xc:"$BLUE" \
    \( "$f" -alpha off \
       \( "$f" -alpha off -colorspace Gray -level "$LOW","$HIGH" \) \
       -alpha off -compose CopyOpacity -composite \) \
    -compose Over -composite "$TMP/rgb.png"
  magick "$TMP/rgb.png" "$TMP/a.png" -alpha off -compose CopyOpacity -composite -quality 82 "$OUT/$b"
  n=$((n + 1))
done
echo "toned $n separations -> $OUT  (page $BLUE, cuts $LOW/$HIGH)"
