# All Aboard Earth site — Project Brief

**Last refreshed:** 2026-09-26 · commit `461c5dc`
Read by the All Aboard Earth claude.ai Project on "sync from the repo". Refreshed by Claude Code at the end of every
session that changes the site (see `CLAUDE.md`). Workflow detail lives in `.claude/skills/aae-site/SKILL.md`.

## What it is
The public marketing site, a Vite multi-page React app on Vercel. Every page is bilingual EN/ES; the Spanish is
unofficial until Michael signs off (`CONTENT_NEEDED.md`). Push to `main` deploys to production.

## Pages (5)
`/` home · `/cool-careers` · `/edutainment` · `/regenerative-art` · `/book-a-demo`
Every CTA opens a pre-addressed email (`mailTo()` in `theme.js`). None go through the old Wix booking flow.

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
- Cool Careers copy says "100+ career cards". The deck is now 106.
- The felt train wheels are waiting on regenerated art (two Nano Banana edits, specified in `MISSING_ART.md`).
- The mural film is 113 MB, streamed only when a visitor presses play. A trimmed, self-hosted cut is optional.
