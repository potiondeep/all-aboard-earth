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

4. **Cool Careers page (`/cool-careers`) — things to confirm.**
   - **Spanish.** The page is fully bilingual, but the Spanish is my rendering of
     the one-pager, not official — `src/pages/coolCareersCopy.js`, `es` block.
     Career card names stay in English in both, because they label real cards
     that are drawn and printed in English and each one links into the Deck
     Explorer under that name.
   - **Portal link.** Both portal buttons go to the game platform itself,
     `cool-careers.allaboardearth.com`. The old Wix "Access the game portal"
     button went to `/cool-careers/game` (the card-game rules page) instead.
   - **The numbers are the platform's, and they will drift.** 106 cards, 104
     stations, 1,317 files and the access model come from `PROJECT_BRIEF.md` in
     `potiondeep/cool-careers`; 102 videos / 86 education routes / 85
     internships / 340 mentors are row counts from the Wix CMS exports in that
     same repo. Re-check both when the platform moves, rather than editing by
     feel.
   - **Two claims the page deliberately avoids**, because the repo says they are
     not true yet: that every station has a video (6 of 104 branded reels have
     landed) and that the curriculum is actually locked (migrations 0031 and
     0033 are written but not applied, so the storage bucket is still public).
     The page describes the access code as how a class gets set up, not as a
     security boundary. **Tell me when both migrations have run** and the page
     can say it plainly.
   - **The four thematic lines** (renewable energy · regenerative agriculture ·
     sustainable water · circular economy) are a second reading of the same 40
     career cards, grouped in `src/pages/coolCareersDeck.js`. The platform's own
     spine is still the 2024 National Career Clusters plus the seven elements —
     that is what the cards carry and what the Standards Map reports. Move a
     card between lines there if you'd file it differently.

5. **New sub pages — Spanish and a couple of specifics.**
   - `/edutainment` and `/regenerative-art` are fully bilingual, but the Spanish
     is my rendering (`src/pages/edutainmentCopy.js`, `src/pages/regenArtCopy.js`).
   - Photo captions are my descriptions of what's in each shot — correct any that
     name the wrong place, project or people.
   - Both pages' CTAs point at the same Wix booking service as the rest of the
     site. If commissions or show bookings should go somewhere else, say where.
   - The mural film streams from the Wix CDN (113MB, 2:37) and only loads when
     pressed. A trimmed, self-hosted cut would load faster if you want one.

## Resolved

- Cool Careers card count (2026-09-14): 100+ — the page says "100+ career cards"
  (the one-pager said 90+, the game portal still says "all 85 cards").

- Official mission (2026-09-12) — verbatim in the hero body and the meta
  description.
- `UP WE GO!` relocated to the CTA band stamp; still rides the marquee.
- Track 01 realigned to the three engines; no "four frequencies" reference
  remains in either language.
