/** CTA crossing proof: scroll-mapped position, idle while paused, turn-around on the way back. Usage: node scripts/cta-crossing-proof.mjs (serves http://localhost:5200) */
import puppeteer from "puppeteer-core";
const wait = (ms) => new Promise((r) => setTimeout(r, ms));
const b = await puppeteer.launch({ executablePath: "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome", headless: "new", args: ["--hide-scrollbars"] });
const p = await b.newPage(); const errs = [];
p.on("pageerror", (e) => errs.push(e.message)); p.on("console", (m) => m.type() === "error" && errs.push(m.text()));
await p.emulateMediaFeatures([{ name: "prefers-reduced-motion", value: "no-preference" }]);
await p.setViewport({ width: 1440, height: 900, deviceScaleFactor: 2 });
await p.goto("http://localhost:5200/", { waitUntil: "networkidle2" });
const state = () => p.evaluate(() => {
  const s = document.querySelector(".crossing").getBoundingClientRect();
  const t = document.querySelector(".cta-train"); const tr = t.getBoundingClientRect();
  const face = document.querySelector(".cta-face"); const tn = t.querySelector(".train");
  const w = t.querySelector(".train-wheel");
  return { trainLeft: Math.round(tr.left - s.left), stripW: Math.round(s.width), facing: face.dataset.facing, moving: t.classList.contains("is-moving"),
           anim: getComputedStyle(tn).animationName, puff: getComputedStyle(t.querySelector(".train-puff")).animationName,
           wheel: parseFloat((w.style.transform.match(/-?[\d.]+/) || [0])[0]), track: document.querySelector(".crossing-track").style.clipPath };
});
// start with the strip just entering at the bottom
await p.evaluate(() => { const s = document.querySelector(".crossing"); scrollTo(0, scrollY + s.getBoundingClientRect().top - innerHeight + 10); });
await wait(300);
const log = [];
const step = async (dy, label) => { for (let i = 0; i < 6; i++) { await p.evaluate((d) => scrollBy(0, d), dy / 6); await wait(16); } await wait(40); log.push([label, await state()]); };
for (let i = 0; i < 5; i++) await step(90, "down");
await wait(900); log.push(["PAUSED", await state()]);
await p.screenshot({ path: "remaster-proof/train/cta-crossing-paused.png", clip: await p.evaluate(() => { const r = document.querySelector(".ctaband").getBoundingClientRect(); return { x: 0, y: scrollY + r.top - 20, width: 1440, height: 300 }; }) });
for (let i = 0; i < 6; i++) await step(90, "down");
await wait(400); log.push(["past the end", await state()]);
for (let i = 0; i < 5; i++) await step(-90, "up");
await wait(900); log.push(["PAUSED up", await state()]);
await p.screenshot({ path: "remaster-proof/train/cta-crossing-returning.png", clip: await p.evaluate(() => { const r = document.querySelector(".ctaband").getBoundingClientRect(); return { x: 0, y: scrollY + r.top - 20, width: 1440, height: 300 }; }) });
for (let i = 0; i < 6; i++) await step(-90, "up");
log.push(["back at start", await state()]);
let prev = null;
for (const [label, s] of log) {
  const spin = prev === null ? "" : (s.wheel < prev ? "wheel ↓(cw when facing right)" : s.wheel > prev ? "wheel ↑" : "wheel still");
  console.log(label.padEnd(14), `x=${String(s.trainLeft).padStart(5)}/${s.stripW}`, `facing=${s.facing.padStart(2)}`, s.moving ? "moving" : "idle  ", `anim=${s.anim}`, `steam=${s.puff}`, spin, s.track);
  prev = s.wheel;
}
console.log("errors:", errs.length ? errs : "none");
await b.close();
