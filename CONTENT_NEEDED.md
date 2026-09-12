# Content needed

Open copy/content questions. Art gaps live in `MISSING_ART.md`.

## Needs your sign-off

1. **Spanish mission.** The official English mission is used verbatim everywhere.
   The Spanish rendering is mine, not official:

   > Un movimiento que enciende la voluntad visionaria de la humanidad para
   > fomentar la salud ecológica mediante rutas de carreras verdes,
   > edutenimiento ambiental y arte regenerativo.

   Same for the Spanish hero headline (`LA TIERRA NECESITA SOÑADORES` /
   `¡CON EL TALENTO PARA LOGRARLO!`) and the three engine names. Replace any of
   these with official wording whenever you have it — they are all in the `es`
   block of `src/AllAboardEarthPrototype.jsx`.

2. **Safari alpha check.** The hero video ships HEVC-with-alpha for Safari and
   VP9-with-alpha for everyone else. Chrome is verified automatically; Safari
   could not be, because screen capture is permission-blocked for this process.
   Open the site in Safari and confirm the Earth floats on the starfield with no
   magenta box behind it. If it shows a box, tell me and I will fall back to the
   WebM + radial-mask route.

3. **Hero button targets.** "Explore Cool Careers" jumps to the `#cool-careers`
   section; "Hear the Music" goes to `/grooves`. Both unchanged from V1 — say if
   either should point somewhere else now.

## Resolved

- Official mission (2026-09-12) — verbatim in the hero body and the meta
  description.
- `UP WE GO!` relocated to the CTA band stamp; still rides the marquee.
- Track 01 realigned to the three engines; no "four frequencies" reference
  remains in either language.
