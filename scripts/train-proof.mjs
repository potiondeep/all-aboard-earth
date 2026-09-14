/** Train proof: size, direction, rolling wheels and steam per variant; screenshots to remaster-proof/train/. Usage: node scripts/train-proof.mjs (serves http://localhost:5200) */
import puppeteer from "puppeteer-core";
const wait = (ms) => new Promise((r) => setTimeout(r, ms));
const OUT = "remaster-proof/train";
const b = await puppeteer.launch({ executablePath: "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome", headless: "new", args: ["--hide-scrollbars"] });
async function open(w, h, dpr = 1) {
  const p = await b.newPage(); const errs = [];
  p.on("pageerror", (e) => errs.push(e.message)); p.on("console", (m) => m.type() === "error" && errs.push(m.text()));
  await p.emulateMediaFeatures([{ name: "prefers-reduced-motion", value: "no-preference" }]);
  await p.setViewport({ width: w, height: h, deviceScaleFactor: dpr });
  await p.goto("http://localhost:5200/", { waitUntil: "networkidle2" });
  return { p, errs };
}
// ---- desktop 1440
let { p, errs } = await open(1440, 900, 2);
// hero: park the space train mid-path so it is on screen for the shot
await p.evaluate(() => { const t = document.querySelector(".train--space"); t.style.animationDelay = "-22s"; t.style.animationPlayState = "paused"; });
await wait(600);
await p.screenshot({ path: `${OUT}/hero-space-desktop.png` });
const space = await p.evaluate(() => { const r = document.querySelector(".train--space").getBoundingClientRect(); return { w: Math.round(r.width), h: Math.round(r.height), opacity: getComputedStyle(document.querySelector(".train--space")).opacity }; });
// rail: size vs content edge, and wheels rolling with scroll
const rail0 = await p.evaluate(() => {
  const t = document.querySelector(".train--rail").getBoundingClientRect();
  const sec = document.querySelector("section").getBoundingClientRect();
  return { trainW: Math.round(t.width), trainLeft: Math.round(t.left), trainRight: Math.round(t.right), contentRight: Math.round(sec.right), wheel: document.querySelector(".train--rail .train-wheel").style.transform || "none" };
});
for (let i = 0; i < 20; i++) { await p.evaluate(() => scrollBy(0, 60)); await wait(30); }
await wait(400);
const rail1 = await p.evaluate(() => document.querySelector(".train--rail .train-wheel").style.transform);
await p.screenshot({ path: `${OUT}/rail-desktop.png`, clip: { x: 1100, y: await p.evaluate(() => scrollY), width: 340, height: 900 } });
// crossing: scroll the CTA in, capture mid-crossing
await p.evaluate(() => document.querySelector(".ctaband").scrollIntoView({ block: "center" }));
await wait(3400);
const cross = await p.evaluate(() => { const t = document.querySelector(".train--crossing"); const r = t.getBoundingClientRect(); const c = document.querySelector(".crossing").getBoundingClientRect();
  return { w: Math.round(r.width), h: Math.round(r.height), strip: Math.round(c.height), fits: r.height <= c.height, wheel: t.querySelector(".train-wheel").style.transform, puffAnim: getComputedStyle(t.querySelector(".train-puff")).animationName }; });
const band = await p.evaluate(() => { const r = document.querySelector(".ctaband").getBoundingClientRect(); return { x: 0, y: scrollY + r.top - 20, width: 1440, height: Math.min(r.height + 40, 700) }; });
await p.screenshot({ path: `${OUT}/crossing-desktop.png`, clip: band });
console.log("DESKTOP space", JSON.stringify(space));
console.log("DESKTOP rail ", JSON.stringify(rail0), "→ wheel after scroll:", rail1);
console.log("DESKTOP cross", JSON.stringify(cross));
console.log("errors:", errs.length ? errs : "none");
await p.close();
// ---- narrower desktop: rail must stay small and clear of text
({ p, errs } = await open(1100, 800));
console.log("1100px rail", JSON.stringify(await p.evaluate(() => { const t = document.querySelector(".train--rail").getBoundingClientRect(); return { w: Math.round(t.width), right: Math.round(innerWidth - t.right) }; })));
await p.close();
// ---- phone
({ p, errs } = await open(390, 844, 3));
await p.evaluate(() => { const t = document.querySelector(".train--space"); t.style.animationDelay = "-22s"; t.style.animationPlayState = "paused"; });
await wait(500);
await p.screenshot({ path: `${OUT}/hero-space-phone.png` });
console.log("PHONE space", JSON.stringify(await p.evaluate(() => { const r = document.querySelector(".train--space").getBoundingClientRect(); return { w: Math.round(r.width), rail: getComputedStyle(document.querySelector(".rail")).display }; })));
await p.evaluate(() => document.querySelector(".ctaband").scrollIntoView({ block: "center" }));
await wait(3400);
const pb = await p.evaluate(() => { const r = document.querySelector(".ctaband").getBoundingClientRect(); return { x: 0, y: scrollY + r.top - 10, width: 390, height: Math.min(r.height + 20, 560) }; });
await p.screenshot({ path: `${OUT}/crossing-phone.png`, clip: pb });
console.log("phone errors:", errs.length ? errs : "none");
await b.close();
