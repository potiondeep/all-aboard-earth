/** Proof for /edutainment and /regenerative-art: renders, media, links, no errors. Usage: node scripts/pages-proof.mjs [base] */
import puppeteer from "puppeteer-core";
const BASE = process.argv[2] || "http://localhost:5200";
const wait = (ms) => new Promise((r) => setTimeout(r, ms));
const b = await puppeteer.launch({ executablePath: "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome", headless: "new", args: ["--hide-scrollbars", "--autoplay-policy=no-user-gesture-required"] });
for (const path of ["edutainment", "regenerative-art"]) {
  for (const [label, w, h, dpr, reduce] of [["desktop", 1440, 900, 1, false], ["phone", 390, 844, 2, false], ["reduced", 1440, 900, 1, true]]) {
    const p = await b.newPage(); const errs = []; const heavy = [];
    p.on("pageerror", (e) => errs.push(e.message)); p.on("console", (m) => m.type() === "error" && errs.push(m.text()));
    p.on("response", (r) => { if (/wixstatic|youtube/.test(r.url())) heavy.push(r.url().split("/").slice(2, 3)[0]); });
    await p.emulateMediaFeatures([{ name: "prefers-reduced-motion", value: reduce ? "reduce" : "no-preference" }]);
    await p.setViewport({ width: w, height: h, deviceScaleFactor: dpr });
    const res = await p.goto(`${BASE}/${path}/`, { waitUntil: "networkidle2" });
    await p.evaluate(async () => { for (let y = 0; y < document.body.scrollHeight; y += 600) { scrollTo(0, y); await new Promise((r) => setTimeout(r, 150)); } });
    await wait(2500);
    const info = await p.evaluate(() => {
      const imgs = [...document.querySelectorAll("img")];
      const vids = [...document.querySelectorAll("video")];
      return {
        title: document.title, h1: document.querySelector("h1")?.innerText,
        images: imgs.length, broken: imgs.filter((i) => i.complete && i.naturalWidth === 0).map((i) => i.currentSrc.split("/").pop()),
        noAlt: imgs.filter((i) => !i.hasAttribute("alt")).length,
        videos: vids.map((v) => ({ src: (v.currentSrc || "").split("/").pop().slice(0, 28), playing: !v.paused })),
        hScroll: document.documentElement.scrollWidth > innerWidth,
        headings: [...document.querySelectorAll("h2")].length,
      };
    });
    if (!reduce) await p.screenshot({ path: `remaster-proof/pages/${path}-${label}.png`, fullPage: true });
    console.log(path.padEnd(17), label.padEnd(8), `HTTP ${res.status()}`, JSON.stringify(info), "third-party:", [...new Set(heavy)].join(",") || "none", "errors:", errs.length ? errs : "none");
    await p.close();
  }
}
await b.close();
