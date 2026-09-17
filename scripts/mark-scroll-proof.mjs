/** Mark proof: the felt mark lands big and shrinks with scroll, nothing under it moves,
 *  and the globe's edge stays clean once the clip takes over from the still.
 *  Usage: npm run dev, then node scripts/mark-scroll-proof.mjs */
import puppeteer from "puppeteer-core";
const wait = (ms) => new Promise((r) => setTimeout(r, ms));
const b = await puppeteer.launch({ executablePath: "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome", headless: "new", args: ["--hide-scrollbars", "--autoplay-policy=no-user-gesture-required"] });
const p = await b.newPage();
const errs = [];
p.on("pageerror", (e) => errs.push(e.message));
p.on("console", (m) => m.type() === "error" && errs.push(m.text()));
await p.setViewport({ width: 1440, height: 900, deviceScaleFactor: 2 });
await p.goto("http://localhost:5173/", { waitUntil: "networkidle2" });
await wait(3000);

// the still must be gone once the clip runs, or its frozen rim shows along the edge
console.log("earth:", JSON.stringify(await p.evaluate(() => ({
  wrap: document.querySelector(".earth-wrap").className,
  paused: document.querySelector(".earth-vid")?.paused,
  stillOpacity: getComputedStyle(document.querySelector(".earth-still")).opacity,
}))));

// scale by scroll, and the element below the mark must not move a pixel
const base = await p.evaluate(() => Math.round(document.querySelector(".hero-eyebrow").getBoundingClientRect().top + scrollY));
for (const y of [0, 280, 560]) {
  await p.evaluate((v) => window.scrollTo(0, v), y);
  await wait(200);
  const m = await p.evaluate((b) => {
    const l = document.querySelector(".hero-logo");
    return { scale: l.style.transform, w: Math.round(l.getBoundingClientRect().width), shiftBelow: Math.round(document.querySelector(".hero-eyebrow").getBoundingClientRect().top + scrollY) - b };
  }, base);
  console.log(`scroll ${String(y).padStart(3)}: ${m.scale} -> ${m.w}px, shift below the mark ${m.shiftBelow}px`);
}
await p.evaluate(() => window.scrollTo(0, 0));
await wait(400);
const clip = await p.evaluate(() => { const r = document.querySelector(".earth-wrap").getBoundingClientRect(); return { x: r.x - 40, y: scrollY + r.y - 40, width: r.width + 80, height: r.height + 80 }; });
await p.screenshot({ path: "remaster-proof/felt/mark-landed.png", clip });
await p.evaluate(() => window.scrollTo(0, 560));
await wait(500);
await p.screenshot({ path: "remaster-proof/felt/mark-shrunk.png", clip: { ...clip, y: clip.y } });
console.log("errors:", errs.length ? errs : "none");
await b.close();
