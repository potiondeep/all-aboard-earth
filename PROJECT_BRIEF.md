# All Aboard Earth site — Project Brief

**Last refreshed:** 2026-09-28 · commit `9eaf6ce`
Read by the All Aboard Earth claude.ai Project on "sync from the repo". Refreshed by Claude Code at the end of every
session that changes the site (see `CLAUDE.md`). Workflow detail lives in `.claude/skills/aae-site/SKILL.md`.

## What it is
The public marketing site, a Vite multi-page React app on Vercel. Every page is bilingual EN/ES; the Spanish is
unofficial until Michael signs off (`CONTENT_NEEDED.md`). Push to `main` deploys to production.

## Pages (5)
`/` home · `/cool-careers` · `/edutainment` · `/regenerative-art` · `/book-a-demo`
Every CTA opens a pre-addressed email (`mailTo()` in `theme.js`). None go through the old Wix booking flow.
Every nav carries a **page menu** (`PageMenu` in `src/pages/chrome.jsx`) — a dropdown of all five pages plus the game
portal, marking the current page. The homepage and Cool Careers have their own nav and import `menuCss` separately.

## `/cool-careers` — rebuilt 2026-09-28
Written against `PROJECT_BRIEF.md` in `potiondeep/cool-careers`, not by feel. Five sections on the blue ground — how the
game works and the deck (40 career / 45 action / 14 Green Line / 7 element = 106); four thematic lines (renewable energy
12, regenerative agriculture 9, sustainable water 7, circular economy 8, plus 4 that cross all of them) told in 25
self-hosted card illustrations that link into the Deck Explorer; the 104-station curriculum; The Green Line; and the
spark→paycheck arc (102 videos · 86 education routes · 85 internships · 340 mentors · Fare & Return on BLS wages).
Standards (NGSS · NM HB 171 financial literacy · 2024 Career Clusters + Perkins V) sit in the cream one-pager beside
district approval. Thematic grouping lives in `src/pages/coolCareersDeck.js`; it is a second reading of the 40 career
cards, not the platform's spine, which is still Clusters + the seven elements.
**Two claims the page deliberately avoids**, per the platform repo: that every station has a video (6 of 104 reels have
landed) and that the curriculum is locked (migrations 0031 + 0033 written, not applied). The access code is described as
how a class gets set up, not as a security boundary. Say it plainly once both have run.

## Domains
| Host | Serves |
|---|---|
| `www.allaboardearth.com` | this site (the apex redirects to www) |
| `cards.allaboardearth.com` | the old Wix site. **Keep the Wix subscription alive**, because the printed deck's QR codes (`/coolcareers/:slug`) redirect there |
| `cool-careers.allaboardearth.com` | the Cool Careers game platform (Deck Explorer takes `?card=<slug>`) |
| `new.allaboardearth.com` | staging for design comparisons (noindex) |

## Look
Cyanotype (deep blue) palette, adopted 2026-09-23. The green, cyanotype and darker-blue branches are kept for comparison.
The site is built around handmade art: an animated felt Earth hero, felt train and crew, wave→mountain dividers, murals and sculpture.
Target: Lighthouse mobile ≥ 85 on every page.

## Open items
- Spanish copy needs official sign-off (mission, hero, engine names, all sub pages).
- The felt train wheels are waiting on regenerated art (two Nano Banana edits, specified in `MISSING_ART.md`).
- The mural film is 113 MB, streamed only when a visitor presses play. A trimmed, self-hosted cut is optional.
- `new.allaboardearth.com` still points at the superseded `cyanotype` branch; switch it back to Production.
- The homepage's Regenerative Art section still uses `mural-2`, the scaffold photo removed from `/regenerative-art`.
- Cool Careers numbers are copied from the platform repo and the Wix CMS exports. Re-check them there when it moves.
