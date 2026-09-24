---
name: aae-site
description: >
  Building and shipping the All Aboard Earth website — a Vite multi-page React site on Vercel at
  www.allaboardearth.com. Covers the change→verify→deploy→verify-again loop, the asset pipeline
  (alpha video, image tiers, click-to-load facades), restyling the palette without leaving greens
  behind, the branch + staging-domain workflow for design decisions, and the domain layout that
  keeps printed QR codes alive. Use for any work in ~/Projects/all-aboard-earth: page or copy
  changes, art and animation, colour and layout, redirects, performance, or launch/DNS questions.
---

# All Aboard Earth — site development

A five-page site whose value is in its handmade art. Most work here is **packaging art
correctly**, not writing application logic. The costly mistakes in this codebase have all been
the same shape: something looked right locally and was wrong for real visitors.

## Standing rules from the owner

These override anything below. They are not preferences.

- **Do NOT touch allaboardearth.com DNS.** DNS lives in the Wix dashboard. Give exact records and
  let the owner make the change.
- **Never modify the originals.** Source art on the Desktop, and `src/assets/divider-layers/`,
  are read-only. Write derived files to a new path.
- **Don't redesign, restyle or "improve" aesthetics** that weren't asked about.
- **Don't replace art — animate it.** If a dependency or animation breaks the build, fix the
  packaging; never delete the animation.
- **Lighthouse mobile ≥ 85** on every page.

## The shape of the site

| | |
|---|---|
| Pages | `/`, `/cool-careers`, `/edutainment`, `/regenerative-art`, `/book-a-demo` |
| Build | Vite multi-page — each page is a real HTML entry in `vite.config.js` + a `src/*-main.jsx` |
| Routing | `vercel.json` `rewrites` map the clean path to `<dir>/index.html`. **A new page needs all three: the dir, the Vite input, and the rewrite** |
| Palette | `src/theme.js` — `T.*` and `LINKS.*`. One source of truth, mostly |
| Home page | `src/AllAboardEarthPrototype.jsx` — carries its own `<style>`, does not use `chromeCss` |
| Sub pages | `src/pages/*.jsx` + `*Copy.js`, sharing `src/pages/chrome.jsx` (`SiteNav`, `SiteFooter`, `chromeCss`, `useLang`, `useLoopVideo`, `reducedMotion`) |
| Copy | Every page is bilingual EN/ES in its `*Copy.js`. Spanish is unofficial — see `CONTENT_NEEDED.md` |
| Deploy | Push to `main` → Vercel builds → production. No manual step |

### Domains — the part that is load-bearing

| Host | Serves | Why it matters |
|---|---|---|
| `www.allaboardearth.com` | this site (Vercel) | apex 308s to www |
| `cards.allaboardearth.com` | **the old Wix site** | the printed Cool Careers deck has QR codes pointing at `/coolcareers/:slug`; Vercel 308s those to `cards.` The Wix subscription must stay alive |
| `cool-careers.allaboardearth.com` | the game platform | its Deck Explorer takes `?card=<slug>` |
| `new.allaboardearth.com` | staging | point it at a branch to compare designs; `noindex` via a host-matched header in `vercel.json` |

## The loop

Never finish on "it builds". Finish on "I watched it work where visitors are".

```bash
npm run build                                  # must pass
node scripts/verify-site.mjs http://localhost:5173   # local, in a real browser
git commit && git push origin main
# wait for the deploy by asset hash — not by sleeping
LOCAL=$(grep -o 'assets/main-[A-Za-z0-9_-]*\.js' dist/index.html)
for i in $(seq 1 25); do sleep 10
  LIVE=$(curl -s https://www.allaboardearth.com/ | grep -o 'assets/main-[A-Za-z0-9_-]*\.js')
  [ "$LIVE" = "$LOCAL" ] && { echo deployed; break; }; done
node scripts/verify-site.mjs                   # production
```

`scripts/verify-site.mjs` walks every page, scrolls so lazy assets are really fetched, and fails
on broken images, 4xx/5xx, console errors, or a redirect that stopped landing where it should
(including the QR chain). Exit code gates the work.

**Use the dev server from this checkout.** `preview_start` has launched a stale copy of the repo
from another directory and silently verified the wrong code three times. If a change seems not to
apply, confirm the server is serving *this* tree before debugging anything else.

## Verifying like a visitor, not like a developer

- **Screenshot from headless Chrome (puppeteer-core)**, not the browser-pane screenshot tool — the
  pane returns blank frames after programmatic scrolling.
- **"Broken image" counts are usually lies.** `!complete || naturalWidth === 0` also matches
  lazy images that simply haven't loaded. Scroll the page first, then count only
  `complete && naturalWidth === 0`, and cross-check against HTTP status.
- **Aborted media requests are normal.** `requestfailed` fires when Chrome cancels a video range
  request. Confirm with a ranged `curl` — a 206 means the file is fine.
- **Local DNS lies after a cutover.** Compare `dig @1.1.1.1` / `@8.8.8.8`, and force a host with
  `curl --resolve host:443:<ip>` to ask a specific server directly.
- **Check a third-party embed is actually playable before wiring it.** A private YouTube video
  returns `403` from oEmbed and `"reason":"Private video"` — shipping it would show
  "Video unavailable". Unlisted is enough; private is not.

## Assets

### Video with transparency

The hero Earth and similar pieces are keyed from a magenta master to real alpha, so they
composite over any background. Two encodes, because no single one works everywhere:

- **VP9 alpha** (`-c:v libvpx-vp9 -pix_fmt yuva420p -auto-alt-ref 0`) → Chrome/Firefox
- **HEVC alpha** (`-c:v hevc_videotoolbox -alpha_quality -pix_fmt bgra -tag:v hvc1`) → Safari

Order `<source>` HEVC first. Verify alpha survived — `ffprobe` reports `yuv420p` either way and
tells you nothing:

```bash
swift -e 'import AVFoundation; print(AVURLAsset(url: URL(fileURLWithPath: "x.mov"))
  .tracks(withMediaType: .video)[0].hasMediaCharacteristic(.containsAlphaChannel))'
```

Keep a phone tier (`<source media="(max-width: 700px)">`); the hero clip becomes the LCP element
at full size.

### Images

- **Never upscale.** Ship the source's native size and below.
- **The `sizes` hint must describe the size the image actually lands at**, including any CSS
  `transform: scale()`. A 1.7× scaled mark with a 1× hint picks a file too small and looks soft.
- **`-strip` on re-encode.** Carried-over EXIF has caused surprises.
- **`naturalWidth` smaller than the file is not a bug.** With `w`-descriptor `srcset`, the browser
  reports intrinsic size ÷ effective density — a 600px file in a 200px slot reads 200. That means
  it's being treated as 3×, which is what you want. Don't "fix" it.
- **Drop tiers the browser never picks.** Compute the slot size before adding a 2× file.

### Third-party embeds — always a facade

YouTube and similar load behind a **local** poster and a play button; nothing reaches the
third party until a click. Verify both halves:

```js
page.on("request", r => { if (/youtube|ytimg|googlevideo/.test(r.url())) hits.add(r.url()); });
// before click: hits must be empty.  after click: googlevideo means it really played.
```

### ImageMagick traps that have cost real time

- **A mask handed to `-composite` blends in linear light** and comes out lighter than either
  input. Apply the mask as the top layer's alpha (`-compose CopyOpacity`) and composite `Over`.
- **`-colorspace Gray` drops alpha.** Extract alpha first, re-apply after.
- **`-floodfill` only touches connected pixels** — the right tool for replacing a background sky
  without eating similarly-coloured detail elsewhere.

## Restyling the palette

`T.pine` / `T.pineDeep` cover most of it, but colour hides in five other places. Miss the first
and every page flashes the old colour before React mounts:

1. `src/index.css` — paints `html, body, #root` **before React**
2. `index.html` (and each page's) `<meta name="theme-color">`
3. Hard-coded card/raised surfaces (e.g. `#12301F`) inside page `<style>` blocks
4. Per-page gradients — e.g. Cool Careers' `.cc-top` radial wash
5. Divider art with the old background baked in (below)

Then check contrast, because accent colours tuned for one background may fail on another:

```
cream ≥ 7:1 on the page · marigold ≥ 4.5:1 · dark type on coral ≥ 4.5:1
```

`T.ink` exists for type on accent fills: when `pineDeep` became a blue, dark-on-coral fell to
4.46:1, and `ink` (#0A1F33) restores it.

Finally sweep for survivors — `getComputedStyle` across the live pages, not a grep:

```js
[...document.querySelectorAll("*")].filter(e => /rgb\(14, ?42, ?27\)/.test(getComputedStyle(e).backgroundColor)).length
```

### The wave→mountain dividers

Four depth bands per divider (`far`, `mid`, `land`, `sea`) sliced along the painting's own
silhouettes. **`far` is opaque with the sky baked in**, so on a new background it paints as a hard
rectangle. `scripts/divider-tone.sh '<page hex>' src/assets/divider-layers-cy` re-tones them: a
luminance mask sends only the darkest values (sky, deep water) to the page colour so the band has
no edge, while everything lighter — mountains, snow, forest, sunset, wave crests — stays as
painted. Re-run it whenever the page colour changes; the originals in `divider-layers/` are never
touched, so reverting is one import path.

## Deciding a design change

Don't argue about a look in prose — put it on a real URL.

```bash
git checkout -b <variant> && …changes… && git push -u origin <variant>
```

Then in Vercel → Domains → `new.allaboardearth.com` → Edit → **Preview**, branch `<variant>`.
Flip the dropdown between branches to compare; production is untouched throughout. Branches kept
for this: `green` (the original green site), `cyanotype`, `darker-blue`.

Preview deployments sit behind Vercel Authentication, so `new.` redirects to a Vercel login —
fine for the owner, invisible to anyone else. To share, turn off Deployment Protection; the
`noindex` header still keeps it out of search.

## Conventions worth keeping

- **Every CTA opens a pre-addressed email**, one subject per ask, built by `mailTo()` in
  `theme.js`. No CTA points at the old Wix booking flow.
- **Copy lives in `*Copy.js`, both languages.** Adding a string means adding it twice.
- **`reducedMotion` is a function.** `useState(reducedMotion)` calls it; assigning it directly
  makes the check always true and silently kills the animation.
- **Transform and opacity only** for scroll-linked motion, rAF-throttled, paused off-viewport,
  with a reduced-motion variant and no layout shift.
- **Deleting between markers has removed live code twice.** Re-read a region before cutting.
