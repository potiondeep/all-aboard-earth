# Missing art

Per ground rule 0: nothing blocks on missing art. Every seat below is **live and
animated right now** using a coded SVG placeholder. When the real asset lands,
drop it into `src/assets/`, swap the import, delete the placeholder component —
**no other change is needed**, the animation and layout stay exactly as they are.

Last checked: 2026-09-11 (verified against production).

## Still on placeholders

**None.** V2 hero art landed 2026-09-12.

| Asset | Seat | What shipped |
|---|---|---|
| `felt-earth.webm` / `-hevc.mov` | B — hero | The Flow clip, chroma-keyed off its pink background. 560x560, VP9-alpha 571KB + HEVC-alpha 1.6MB; each browser fetches only the one it can decode. |
| `felt-earth-poster.webp` | B — hero | Derived from the same keyed pipeline, so it matches frame one exactly and there is no jump when the video takes over. Preloaded; it is what first paint shows. |

### Logo vectorization (Seat C)

`public/art/logo.svg` was traced here from the graffiti PNG — 49 paths in four
groups, one per brand colour, no white box. Verified against the source: all
four colours present as separate paths, letterforms intact, the spiral's every
turn and the star preserved.

Colours sampled from the file, not guessed — the brief's estimates were all
slightly off: blue `#25AAE1` (not #29ABE2), yellow `#FDCB25` (not #FFCB2E),
green `#8CC640` (not #8CC63E), pink `#ED1579` (not #EC1E79).

Route: resize to 2000px wide, flatten onto white, then per colour
`-fuzz 26%` isolate → threshold → `potrace --turdsize 8 --alphamax 1.0`, then
recombine the four `<g>`s under one viewBox with pink at the back and the green
spiral on top. Coverage sanity-checks at pink 11%, yellow 7%, blue 3%, green 2%.
No upscale was needed — detail held at 2000px.

### Keying notes (for when the next clip arrives)

The brief said key `#FF00FF`, but the plate is **not** pure magenta — it is an
unevenly lit pink running roughly `#B32F72` to `#E966B2`. A `colorkey` at
`#FF00FF` removes nothing. What works:

- `chromakey=0xD34C97:0.11:0.06` — chromakey (YUV) rather than colorkey (RGB),
  so the uneven lighting does not matter. **Similarity is the whole game:** at
  0.05-0.08 a pink rim survives, at 0.14 it starts eating the globe, 0.11 is the
  window where the background is gone and the felt fibers are intact.
- A `geq` despill that only fires where **both** R and B exceed G. That is
  magenta specifically — the ocean's blue has low R, the clouds are neutral, the
  land is green-dominant, so none of them are touched.
- `crop=840:840:553:149` before scaling — the globe only occupies x 583-1364,
  y 193-945 across the whole clip, so the rest is wasted pixels.

`ffprobe` reports `pix_fmt=yuv420p` for a correct VP9-alpha file and ffmpeg's own
decoder drops the alpha — neither means the key failed. Check `alpha_mode=1` in
the tags, or test in a browser.

## Resolved — no longer missing

| Spec name | Resolved to |
|---|---|
| `card-solar-rigger.png` | Wix CMS — `photovoltaic-power-technician` |
| `card-water-guardian.png` | Wix CMS — `watershed-restoration-specialist` |
| `card-soil-scientist.png` | Wix CMS — `soil-microbiologist` (available, not currently on a card) |
| `card-wind-tech.png` | Wix CMS — `wind-power-technician` (used as the Seat 5 pinned poster) |
| `card-aquaponics.png` | Wix CMS — `aquaponics-technician` (available, not currently on a card) |
| `felt-raccoon.jpg` | `src/assets/scenes/felt-raccoon.webp` from the Desktop photo set |

All 40 Cool Careers illustrations are reachable through `src/wixCardArt.js`, so any
card can be re-pointed by changing one slug.

## Resolved 2026-09-11

- **Card roster** is now five, as requested: Solar Technician, Watershed
  Restoration Specialist, Soil Microbiologist, Aquaponics Technician, Wind
  Technician. They deal as one row at >=1000px and wrap below.
- **Seat 4 icons** reverted to the original emoji (game / mic / screen / thread);
  the seed grow-in motion was dropped with them.
- **Seat 11 footer** carries the Tessa Foundation donation line
  (https://www.tessafoundation.org/donate) and @allaboardearth.
- **Seat 5 poster** moved from the wind technician to the 3D Ocean Farmer, since
  the turbine art is now a card and would otherwise appear twice on one page.
  One-line change if you would rather it repeat.

## Lighthouse — measured on production, 2026-09-11 (final)

| | mobile | desktop | brief's target |
|---|---|---|---|
| Performance | 97 | 100 | >= 85 mobile — **pass** |
| LCP | 2.38s | 0.5s | <= 2.5s — **pass** |
| CLS | 0.000 | 0.000 | < 0.05 — **pass** |
| Accessibility | 100 | 100 | — |
| Best practices | 100 | 100 | — |
| SEO | 100 | 100 | — |

Mobile is the **median of six runs** (LCP 2.29-2.59s, perf 95-98) — single runs on
this page swing ~0.3s, so one sample is not a reading. Desktop is one run.

The real art cost roughly 0.4s of mobile LCP (1.8-2.0s before it). The hero record
ships at two widths behind a `srcset` — 740px/q62 (104KB) and 1040px/q58 (180KB) —
with `sizes` mirroring the CSS (`86%` of `min(74vw, 580px)`). Mobile and 1x desktop
take the 740; only retina desktop pulls the 1040. The preload carries the same
`imagesrcset`/`imagesizes`, so exactly one file is fetched rather than one preloaded
and a different one chosen. Verified: Lighthouse mobile (412px @ 1.75) downloads
only the 740, at High priority.

## Open for Michael

Nothing outstanding. Button contrast and the Spanish mission line were both
resolved on 2026-09-11:

- `.btn` text moved from Cream to Pine Deep on Coral, 2.81:1 -> 5.73:1, clearing
  WCAG AA. Ghost buttons and the CTA band keep Cream, since both sit on dark
  grounds (14.1:1 and 16.1:1).
- The Spanish hero now mirrors the English mission rather than carrying the
  older, longer crew line.
