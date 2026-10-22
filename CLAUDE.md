# All Aboard Earth site — Claude Code notes

For any work here, follow the `aae-site` skill (`.claude/skills/aae-site/SKILL.md`).

## End of every session — refresh `PROJECT_BRIEF.md`
Before the last commit of any session that changed the product, update `PROJECT_BRIEF.md` at the repo root and commit it
with the work. It is the one-page state that Michael's claude.ai Project reads when he says "sync from the repo", so keep it
current (overwrite, no changelog; update the "Last refreshed" date + commit), countable, honest about live vs. written,
and one page. If nothing product-facing changed, leave it alone.

<!-- FILE-MAP:START (generated 2026-10-21, keep current) -->
## File map (read this before searching)
Workflow rules live in the `aae-site` skill; this is only where things are. Keep it current.

- **Pages**: home `src/AllAboardEarthPrototype.jsx` (1,400 lines, carries its own `<style>`, grep it) · sub pages `src/pages/{CoolCareers,Edutainment,RegenArt,Contact}.jsx`, each with a `*Copy.js` (EN/ES strings) · `src/pages/coolCareersDeck.js` (thematic grouping).
- **Entries**: one HTML folder per page (`cool-careers/`, `edutainment/`, `regenerative-art/`, `contact/`) + `src/*-main.jsx`, registered in `vite.config.js`. Redirects are in `vercel.json`.
- **Shared**: `src/pages/chrome.jsx` (nav, `PageMenu`, footer, `chromeCss`, `useLang`, `useLoopVideo`) · `src/theme.js` (palette `T.*`, `LINKS.*`, `mailTo()`) · `src/index.css` (pre-React paint) · `src/wixCardArt.js`.
- **Ornaments** (`src/ornaments/`): `Divider` (+`dividerTuning.js`, `DividerTunePanel` via `?tune`) · `Train` · `CtaCrossing` · `FeltLoop` · `Seed`.
- **Art**: `src/assets/` (originals are read-only; `divider-layers*`) · `public/art/`.
- **Proof scripts** (`scripts/`): `site-proof.mjs` (whole site) · `verify-site.mjs` (deployed build) · `lcp-probe.mjs` · page proofs `cool-careers-` / `pages-` / `felt-` / `train-` / `mark-scroll-` / `cta-crossing-` / `earth-round-` / `divider-sharpness` / `remaster-proof.mjs` · tools `divider-tone.sh`, `felt-earth-key.py`.
- **Open-items lists**: `CONTENT_NEEDED.md` (Spanish sign-off) · `MISSING_ART.md`.
- **Skip** `remaster-proof/`: screenshots only.
<!-- FILE-MAP:END -->
