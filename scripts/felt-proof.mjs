/** Felt proof: divider stillness, meditating Earth seat, and a full fade cycle on the polaroids. Usage: node scripts/felt-proof.mjs (serves http://localhost:5200) */
import puppeteer from "puppeteer-core";
const wait = (ms) => new Promise((r) => setTimeout(r, ms));
const b = await puppeteer.launch({ executablePath: "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome", headless: "new", args: ["--hide-scrollbars", "--autoplay-policy=no-user-gesture-required"] });
const p = await b.newPage(); const errs = []; const got = [];
p.on("pageerror", (e) => errs.push(e.message)); p.on("console", (m) => m.type() === "error" && errs.push(m.text()));
p.on("request", (r) => { if (r.url().includes("/art/felt/")) got.push(r.url().split("/").pop()); });
await p.emulateMediaFeatures([{ name: "prefers-reduced-motion", value: "no-preference" }]);
await p.setViewport({ width: 1440, height: 900, deviceScaleFactor: 2 });
await p.goto("http://localhost:5200/", { waitUntil: "networkidle2" });
console.log("felt requests at page load:", got.length ? got : "none");
// divider: nothing may move once the wipe has settled
await p.evaluate(() => document.querySelector(".divider").scrollIntoView({ block: "center" }));
await wait(800);
console.log("divider animations running:", await p.evaluate(() => document.getAnimations().filter((a) => a.effect?.target?.closest?.(".divider")).map((a) => a.animationName || a.constructor.name)));
// photoprint + wall
await p.evaluate(() => document.querySelector(".photoprint").scrollIntoView({ block: "center" }));
await wait(1500);
console.log("photoprint:", JSON.stringify(await p.evaluate(() => { const i = document.querySelector(".photoprint img"); const r = i.getBoundingClientRect(); return { src: i.currentSrc.split("/").pop(), alt: i.alt, w: Math.round(r.width), h: Math.round(r.height) }; })));
const clip = await p.evaluate(() => { const a = document.querySelector(".photoprint").getBoundingClientRect(); const c = document.querySelector(".collage").getBoundingClientRect(); return { x: 0, y: scrollY + a.top - 20, width: 1440, height: c.bottom - a.top + 40 }; });
await p.screenshot({ path: "remaster-proof/felt/earth-and-wall-desktop.png", clip });
// watch a full fade cycle (clips are 7.96s): sample every 250ms for 11s
const log = [];
for (let i = 0; i < 44; i++) {
  log.push(await p.evaluate(() => [...document.querySelectorAll(".polaroid")].map((w) => {
    const v = w.querySelector("video"); const f = w.querySelector(".felt-fade");
    return `${v.currentTime.toFixed(2)}${v.paused ? "p" : ""}${f?.classList.contains("on") ? "F" : ""}`;
  }).join("  ")));
  await wait(250);
}
const rows = log.filter((l, i) => i % 2 === 0 || /F/.test(l));
console.log("roadrunner  raccoon  monkey   (F = first frame fading in over the tail)\n" + rows.join("\n"));
console.log("sources:", [...new Set(got)].join(", "));
console.log("tile boxes:", JSON.stringify(await p.evaluate(() => [...document.querySelectorAll(".polaroid video")].map((v) => { const r = v.getBoundingClientRect(); return [Math.round(r.width), Math.round(r.height)]; }))));
console.log("errors:", errs.length ? errs : "none");
await b.close();
