# Missing art

Per ground rule 0: nothing blocks on missing art. Every seat below is **live and
animated right now** using a coded SVG placeholder. When the real asset lands,
drop it into `src/assets/`, swap the import, delete the placeholder component —
**no other change is needed**, the animation and layout stay exactly as they are.

Last checked: 2026-09-11 (verified against production).

## Still on placeholders

**None.** Every asset the brief named is now real art, sourced from
`~/Desktop/AAE-web-art` on 2026-09-11.

| Asset | Seat | What shipped |
|---|---|---|
| `vinyl-sun.png` | 1 — hero | Tree-ring record with a glowing sun label. Masked to a circle so the 45s spin reads cleanly, and served from `/art` (stable path) so it can be preloaded. |
| `divider-wave-mountain-a` / `-b` | 3 — dividers | The two ultra-wide 5856x704 wave-to-mountain paintings, full-bleed, alternating. B is drawn mirrored, so the old `scaleX(-1)` flip was removed. |
| `seed-mark.png` | 4, 11 | Felt sprout with roots, at section ends and as the footer sign-off. |
| `climbing-train.png` | 9, 10 | Felt solar train with musical-note steam — on the scroll rail, and crossing the CTA band (flipped to face its direction of travel). |

Three of these were JPEGs with a **checkerboard painted into the pixels** — fake
transparency, not real alpha. Adobe's `image_remove_background` cut them properly;
local colour-keying would have eaten the train's cream steam and the seed's pale
roots, since both collide with the checker's own greys.

The coded SVG placeholders were deleted with them, except the small `SeedGlyph`,
which still draws the 22px marquee separator — the detailed seed art turns to mush
at that size.

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

## Lighthouse — measured on production, 2026-09-11 (after the art landed)

| | mobile | desktop | brief's target |
|---|---|---|---|
| Performance | 96-98 | 100 | >= 85 mobile — **pass** |
| LCP | 2.3-2.4s | 0.5s | <= 2.5s — **pass** |
| CLS | 0.000 | 0.000 | < 0.05 — **pass** |
| Accessibility | 100 | 100 | — |
| Best practices | 100 | 100 | — |
| SEO | 100 | 100 | — |

Median of three mobile runs and one desktop. The real art cost roughly 0.4s of
mobile LCP (1.8-2.0s before it), so the hero record ships at two widths behind a
`srcset` — 740px/q62 (104KB) and 1040px/q58 (180KB) — with `sizes` mirroring the
CSS (`86%` of `min(74vw, 580px)`). Mobile and 1x desktop take the 740; only
retina desktop pulls the 1040. The preload carries the same `imagesrcset` and
`imagesizes`, so exactly one file is fetched rather than one preloaded and a
different one chosen.

## Open for Michael

Nothing outstanding. Button contrast and the Spanish mission line were both
resolved on 2026-09-11:

- `.btn` text moved from Cream to Pine Deep on Coral, 2.81:1 -> 5.73:1, clearing
  WCAG AA. Ghost buttons and the CTA band keep Cream, since both sit on dark
  grounds (14.1:1 and 16.1:1).
- The Spanish hero now mirrors the English mission rather than carrying the
  older, longer crew line.
