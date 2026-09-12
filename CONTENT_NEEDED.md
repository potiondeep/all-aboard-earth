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

2. ~~**Safari alpha check.**~~ **Fixed 2026-09-12.** Safari was ignoring the
   HEVC alpha channel and showing the raw RGB, which under the keyed area was
   still the original magenta. The clip is now re-encoded so every fully-keyed
   pixel is painted Pine (`#0E2A1B`) *while keeping alpha 0* — so a browser that
   honours alpha sees a clean cut-out, and one that ignores it sees a pine
   square on a pine hero, which is invisible. Verified by discarding the alpha
   channel entirely: the result is indistinguishable from the alpha-honoured
   render.

3. **Hero button targets.** "Explore Cool Careers" jumps to the `#cool-careers`
   section; "Hear the Music" goes to `/grooves`. Both unchanged from V1 — say if
   either should point somewhere else now.

## Resolved

- Official mission (2026-09-12) — verbatim in the hero body and the meta
  description.
- `UP WE GO!` relocated to the CTA band stamp; still rides the marquee.
- Track 01 realigned to the three engines; no "four frequencies" reference
  remains in either language.
