# All Aboard Earth site — Project Brief

**Last refreshed:** 2026-09-28 · commit `ef1ae2f`
Read by the All Aboard Earth claude.ai Project on "sync from the repo". Refreshed by Claude Code at the end of every
session that changes the site (see `CLAUDE.md`). Workflow detail lives in `.claude/skills/aae-site/SKILL.md`.

## What it is
The public marketing site, a Vite multi-page React app on Vercel. Every page is bilingual EN/ES; the Spanish is
unofficial until Michael signs off (`CONTENT_NEEDED.md`). Push to `main` deploys to production.

## Pages (5)
`/` home · `/cool-careers` · `/edutainment` · `/regenerative-art` · `/contact`
`/contact` replaced `/book-a-demo` on 2026-09-28 and carries three routes — pilot demo, live show, art commission —
each with its own mail subject. `/book-a-demo` and `/book-online` 308 to it, and nothing redirects *through* it.
Its plane clip is `felt-4-loop.*`, not `felt-4.*`: the original is a boomerang (second half = first half reversed), so
the loop is its forward half with the last 1.25s dissolved back into its own opening. `felt-4.*` stays — there is no
Desktop original behind it — and derives the loop if it ever needs rebuilding.
Every CTA opens a pre-addressed email (`mailTo()` in `theme.js`). None go through the old Wix booking flow.
Every nav carries a **page menu** (`PageMenu` in `src/pages/chrome.jsx`) — a dropdown of the five pages, marking the current page. Pages
only — the Cool Careers portal is reached from its own page, by the button closing the spark→paycheck arc. The homepage and Cool Careers have their own nav and import `menuCss` separately.

## `/cool-careers` — rebuilt 2026-09-28
Written against `PROJECT_BRIEF.md` in `potiondeep/cool-careers`, not by feel. Four sections on the blue ground — the
four thematic lines (renewable energy 12, regenerative agriculture
9, sustainable water 7, circular economy 8) told in 23 self-hosted card illustrations that link into the Deck Explorer;
the 104-station curriculum, shown as four real teacher-deck plates — one station per thematic line, not four views of the same card; The Green Line, opening on the module's own **Now Boarding** hub plate
(`public/greenline/now-boarding.webp` in the platform repo, derived into `/art/cool-careers/greenline`) above a CSS
route diagram of the eight stops running my money → our money; and the spark→paycheck arc (102 videos · 86 education routes · 85 internships · 340 mentors · Fare & Return on BLS wages).
Trimmed hard on 2026-09-29 at Michael's direction, over several passes: the five-step game walkthrough, the whole
"How the game works" section and its deck tiles, the element-card tile, the cross-cutting careers block, the per-line
station plates, the 01–04 pathway stages, "What students do", "What teachers get", the marigold game-portal block and
the pilot line all came out, along with several stray lines of body copy. Page height 11,537 → 7,909px at 1280. Orphaned art was deleted with them, so nothing unused ships.
The eagle stayed and moved to sit beside the standards heading. The one portal link is now a single button closing the
spark→paycheck arc, labelled "Open the Cool Careers Portal"; the hero keeps only "Book a pilot demo". The stats section
is titled "Why it's important" rather than "Why now".
Standards (NGSS · NM HB 171 financial literacy · 2024 Career Clusters + Perkins V) sit beside district approval.
The page went fully cyanotype on 2026-09-29 — the cream "paper" one-pager is gone, so all five pages now share the same
mottled blue ground. Its cards became the dark panels the rest of the page uses, and and the eagle now shows **whole on its own white
studio card** (`eagle-plain.*`), paired with the portal screenshot beside it and stretched to the same height. Keying it
out was tried twice and abandoned: every cut loses something at the silhouette, because the head is cream against white
and the wing fringe is soft. The card is `#FFF` because that is what the browser decodes the clip's background to
(measured). The keyed alpha pair (`eagle.webm` alpha_mode=1, `eagle-hevc.mov`) is kept but not rendered. The way into the portal sits opposite the eagle: a framed screenshot of the student home a visitor actually lands on,
with a full-width button under it. **The screenshot goes stale** — it is `public/art/cool-careers/portal-preview-*.webp`,
captured from the free tier of cool-careers.allaboardearth.com with the access banner scrolled off. Re-shoot it when the
portal's home screen changes (last done 2026-10-07, when the portal's doors were reordered to lead with *Discover what
lights you up!*). **The portal now answers 403 "Vercel Security Checkpoint" to headless Chrome and curl**, so the shot
has to come from a real browser — the in-app browser pane passes it; puppeteer does not. Thematic grouping lives in `src/pages/coolCareersDeck.js`; it is a second reading of the 40 career
cards, not the platform's spine, which is still Clusters + the seven elements.
Migrations 0031 + 0033 were applied 2026-09-28, so the page now states plainly that station rows and files are gated at
the database and the file store. **One claim it still avoids:** that every station has a video — 6 of 104 branded reels
have landed, so the page cites the 102-video resource library instead.
The four teacher-deck plates are derived from `~/Projects/station-pipeline`; originals untouched.

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

## Fixed 2026-09-28
- Four pages still carried the pre-cyanotype `theme-color` (`#0E2A1B`), so mobile browser chrome tinted green.
- The homepage nav had no narrow breakpoint; adding the page menu tipped it over and the CTA overlapped the language
  pill at 390–412px. It now drops the CTA below 560px like the sub pages. Lighthouse mobile accessibility 95 → 100.

## Open items
- Spanish copy needs official sign-off (mission, hero, engine names, all sub pages).
- The felt train wheels are waiting on regenerated art (two Nano Banana edits, specified in `MISSING_ART.md`).
- The mural film is 113 MB, streamed only when a visitor presses play. A trimmed, self-hosted cut is optional.
- `new.allaboardearth.com` still points at the superseded `cyanotype` branch; switch it back to Production.
- Lighthouse flags `image-aspect-ratio` on the wave→mountain dividers. It is a false positive: the bands are
  deliberately stretched to `clamp(84px,11vw,150px)` and the audit only inspects `object-fit:fill`. Clearing it means
  either a thinner divider on phones or moving the layers to CSS backgrounds and losing lazy-loading. Left as-is.
- The homepage's Regenerative Art section still uses `mural-2`, the scaffold photo removed from `/regenerative-art`.
- Cool Careers numbers are copied from the platform repo and the Wix CMS exports. Re-check them there when it moves.
