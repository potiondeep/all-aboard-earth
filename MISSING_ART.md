# Missing art

Per ground rule 0: nothing blocks on missing art. Every seat below is **live and
animated right now** using a coded SVG placeholder. When the real asset lands,
drop it into `src/assets/`, swap the import, delete the placeholder component —
**no other change is needed**, the animation and layout stay exactly as they are.

Last checked: 2026-09-11 (verified against production).

## Still on placeholders

| Asset | Seat | Placeholder in use | Animation already wired |
|---|---|---|---|
| `vinyl-sun.png` | 1 — hero | `<VinylSun />` coded SVG (rays + grooved record + SIDE A label) | 45s/rev spin, spins up to 22s on hover, 0.15x scroll parallax capped ±40px |
| `divider-wave-mountain-a.png` | 3 — dividers | `<WaveMountainDivider />` coded SVG | `stroke-dashoffset` draw-on over 1.4s, static wobble filter |
| `divider-wave-mountain-b.png` | 3 — dividers | same component with `flip` (mirrored via `scaleX(-1)`) | same |
| `seed-mark.png` | 2, 4, 11 | `<SeedGlyph />` / `<RootsMark />` coded SVG | marquee separator; per-cell tinted icons that scale 0.6→1; footer sign-off grow-in |
| `climbing-train.png` | 9, 10 | rail: coded SVG loco. CTA crossing: 🚂 emoji | rail train rotates to climb angle + 120ms settle; CTA train crosses −20vw→120vw over 7s with ±1.5° rock |

The CTA-band train (Seat 9) is the weakest placeholder — an emoji standing in for
drawn art. It is the first one worth replacing.

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

## Open for Michael

1. **Button contrast fails WCAG AA.** Cream text on Coral (`.btn`) is about
   2.6:1; AA wants 4.5:1 for body text, 3:1 for large. This is a brand-colour
   call, not a bug, so nothing was changed. Switching button text from Cream to
   Pine Deep would clear it comfortably and keeps both brand colours.
2. **Mobile LCP is 3.3s** against the brief's 2.5s target (mobile Performance
   still scores 86, over the 85 bar). It is bound by first render of the JS
   bundle on a throttled CPU, not by images. Real fixes are code-splitting or
   pre-rendering the hero, both larger jobs.
3. **Spanish body copy** still differs from English in the hero (`hero_sub`);
   ES card names, marquee and footer were updated, the mission paragraph was not.
