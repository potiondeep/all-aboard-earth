/**
 * Verify a deployed (or local) build of the site in a real browser.
 *
 *   node scripts/verify-site.mjs                      # production
 *   node scripts/verify-site.mjs http://localhost:5173
 *   node scripts/verify-site.mjs https://new.allaboardearth.com
 *
 * Walks every page, scrolls it so lazy assets are actually requested, and
 * reports anything that would reach a visitor: pages that do not answer, images
 * that failed, requests that 4xx/5xx, console or page errors, and the redirects
 * that other people's printed material depends on.
 *
 * Exits non-zero when something is wrong, so it can gate a deploy.
 */
import puppeteer from "puppeteer-core";

const BASE = (process.argv[2] || "https://www.allaboardearth.com").replace(/\/$/, "");
const CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const LOCAL = /localhost|127\.0\.0\.1/.test(BASE);
// The dev server serves each entry from its directory, so it needs the trailing
// slash; on Vercel the clean path is rewritten to the same file.
const PAGES = ["/", "/cool-careers", "/edutainment", "/regenerative-art", "/book-a-demo"]
  .map((p) => (LOCAL && p !== "/" ? p + "/" : p));

/** Redirects worth checking every time: the first two are the printed QR codes. */
const REDIRECTS = [
  ["/coolcareers/artist", "cards.allaboardearth.com/coolcareers/artist"],
  ["/coolactions/green-hustle", "cards.allaboardearth.com/coolactions/green-hustle"],
  ["/grooves", "open.spotify.com"],
  ["/book-online", "/book-a-demo"],
];

const wait = (ms) => new Promise((r) => setTimeout(r, ms));
const fail = [];

const browser = await puppeteer.launch({
  executablePath: CHROME,
  headless: "new",
  args: ["--hide-scrollbars", "--autoplay-policy=no-user-gesture-required"],
});

console.log(`\nverifying ${BASE}\n`);

for (const path of PAGES) {
  const page = await browser.newPage();
  const errors = [];
  const http = [];
  page.on("pageerror", (e) => errors.push(e.message));
  page.on("console", (m) => m.type() === "error" && errors.push(m.text().slice(0, 100)));
  page.on("response", (r) => { if (r.status() >= 400) http.push(`${r.status()} ${r.url().split("/").pop()}`); });
  await page.setViewport({ width: 1280, height: 900 });

  let status = 0;
  try {
    const res = await page.goto(BASE + path, { waitUntil: "networkidle2", timeout: 45000 });
    status = res.status();
    // walk the page so lazy images and clips are genuinely requested
    await page.evaluate(async () => {
      for (let y = 0; y < document.body.scrollHeight; y += 700) {
        window.scrollTo(0, y);
        await new Promise((r) => setTimeout(r, 100));
      }
    });
    await wait(1500);
  } catch (e) {
    fail.push(`${path} did not load: ${e.message}`);
    await page.close();
    continue;
  }

  const m = await page.evaluate(() => ({
    title: document.title,
    bg: getComputedStyle(document.body).backgroundColor,
    broken: [...document.images].filter((i) => i.complete && i.naturalWidth === 0).map((i) => i.currentSrc || i.src),
    canonical: document.querySelector("link[rel=canonical]")?.href || "(none)",
  }));

  if (status !== 200) fail.push(`${path} returned ${status}`);
  if (m.broken.length) fail.push(`${path} broken images: ${m.broken.slice(0, 3).join(", ")}`);
  if (http.length) fail.push(`${path} failed requests: ${http.slice(0, 3).join(", ")}`);
  if (errors.length) fail.push(`${path} errors: ${errors.slice(0, 2).join(" | ")}`);

  console.log(
    `  ${path.padEnd(19)} ${status}  bg:${m.bg.padEnd(18)} ` +
    `imgs:${m.broken.length ? "BROKEN " + m.broken.length : "ok"}  ` +
    `errs:${errors.length || "none"}  "${m.title.slice(0, 32)}"`
  );
  await page.close();
}

// Redirects: follow them the whole way, as a visitor (or a QR scanner) would.
// They live in vercel.json, which the dev server knows nothing about.
console.log("");
if (LOCAL) console.log("  (skipping redirects — vercel.json is not applied locally)");
const page = await browser.newPage();
for (const [from, expect] of LOCAL ? [] : REDIRECTS) {
  try {
    const res = await page.goto(BASE + from, { waitUntil: "domcontentloaded", timeout: 30000 });
    const landed = page.url();
    const ok = landed.includes(expect.replace(/^\//, "")) && res.status() < 400;
    if (!ok) fail.push(`${from} landed on ${landed} (${res.status()}), expected ${expect}`);
    console.log(`  ${from.padEnd(28)} -> ${landed.slice(0, 62)} ${ok ? "" : "  <-- UNEXPECTED"}`);
  } catch (e) {
    fail.push(`${from} failed: ${e.message}`);
  }
}
await browser.close();

console.log("");
if (fail.length) {
  console.log("FAILED:");
  for (const f of fail) console.log("  - " + f);
  process.exit(1);
}
console.log("all checks passed\n");
