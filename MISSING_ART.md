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

## Open questions for Michael

1. **Card roster is 4, the brief names 5.** The brief lists solar-rigger,
   water-guardian, soil-scientist, wind-tech and aquaponics — the *original*
   prototype names, which we replaced with real CMS careers earlier by your
   choice. Current four: Photovoltaic Power Technician, Watershed Restoration
   Specialist, Fungi Biochemist, 3D Ocean Farmer. Aquaponics and soil-microbiologist
   art is ready if you want a 5th and 6th card; `.cards` is `auto-fit`, so adding
   them reflows cleanly.
2. **Seat 4 icons.** The brief replaces the four channel emoji (🎮 🎤 📺 🧵) with
   one tinted seed-mark per cell. Implemented as written, but it does cost the
   at-a-glance distinction between Cool Careers / hip-hop / series / product. Say
   the word and the emoji come back alongside the seed.
3. **Seat 11 footer.** The brief says "Tessa Foundation donation line + socials as
   built" — neither exists in the prototype, so nothing was carried over. Send the
   donation URL and social handles and they go in.
4. **Spanish body copy** still differs from English in the hero (`hero_sub`); the
   ES card names and marquee were updated, the mission paragraph was not.
