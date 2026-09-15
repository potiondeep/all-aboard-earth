/** Cool Careers page proof: renders, bus loop plays, video facade loads on click, links, reduced motion. Usage: node scripts/cool-careers-proof.mjs [base] */
import puppeteer from "puppeteer-core";
const BASE = process.argv[2] || "http://localhost:5200";
const wait = (ms) => new Promise((r) => setTimeout(r, ms));
const b = await puppeteer.launch({ executablePath: "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome", headless: "new", args: ["--hide-scrollbars", "--autoplay-policy=no-user-gesture-required"] });
for (const [label, w, h, dpr, reduce] of [["desktop", 1440, 900, 1, false], ["phone", 390, 844, 2, false], ["reduced", 1440, 900, 1, true]]) {
  const p = await b.newPage(); const errs = []; const yt = [];
  p.on("pageerror", (e) => errs.push(e.message)); p.on("console", (m) => m.type() === "error" && errs.push(m.text()));
  p.on("request", (r) => { if (/youtube/.test(r.url())) yt.push(r.url().split("?")[0]); });
  await p.emulateMediaFeatures([{ name: "prefers-reduced-motion", value: reduce ? "reduce" : "no-preference" }]);
  await p.setViewport({ width: w, height: h, deviceScaleFactor: dpr });
  const res = await p.goto(`${BASE}/cool-careers/`, { waitUntil: "networkidle2" });
  await wait(3500);
  const info = await p.evaluate(() => {
    const v = document.querySelector(".cc-buses-vid");
    return {
      title: document.title, h1: document.querySelector("h1")?.innerText.replace(/\n/g, " / "),
      bus: v ? { src: v.currentSrc.split("/").pop(), t: +v.currentTime.toFixed(1), shown: v.classList.contains("on") } : "poster only",
      stats: [...document.querySelectorAll(".cc-stat .n")].map((n) => n.textContent),
      steps: document.querySelectorAll(".cc-step").length, tiles: document.querySelectorAll(".cc-tile").length, checks: document.querySelectorAll(".cc-district li").length,
      portalLinks: [...document.querySelectorAll('a[href*="cool-careers.allaboardearth.com"]')].length,
      bookLinks: [...document.querySelectorAll('a[href*="school-performance"]')].length,
      home: document.querySelector(".brand")?.getAttribute("href"),
      hScroll: document.documentElement.scrollWidth > innerWidth,
    };
  });
  if (!reduce) {
    await p.evaluate(async () => { for (let y = 0; y < document.body.scrollHeight; y += 500) { scrollTo(0, y); await new Promise((r) => setTimeout(r, 120)); } scrollTo(0, 0); }); await wait(800);
    await p.screenshot({ path: `remaster-proof/cool-careers/${label}-full.png`, fullPage: true });
    await p.evaluate(() => document.querySelector(".cc-video").scrollIntoView({ block: "center" }));
    const before = yt.length;
    await p.click(".cc-video-facade"); await wait(2500);
    info.videoOnClick = { iframe: await p.evaluate(() => document.querySelector(".cc-video iframe")?.src.split("?")[0] || null), ytRequestsBeforeClick: before };
  }
  console.log(label.padEnd(8), `HTTP ${res.status()}`, JSON.stringify(info), "errors:", errs.length ? errs : "none");
  await p.close();
}
// language carries over from the homepage
const p = await b.newPage(); await p.setViewport({ width: 1280, height: 800 });
await p.goto(`${BASE}/`, { waitUntil: "networkidle2" });
await p.evaluate(() => [...document.querySelectorAll(".lang button")].find((x) => x.textContent === "ES").click()); await wait(300);
const heroHref = await p.evaluate(() => [...document.querySelectorAll("a")].find((a) => a.getAttribute("href") === "/cool-careers")?.textContent);
await p.goto(`${BASE}/cool-careers/`, { waitUntil: "networkidle2" });
console.log("lang carry-over:", await p.evaluate(() => document.querySelector("h1").innerText.replace(/\n/g, " / ")), "| homepage link to /cool-careers:", heroHref);
await p.evaluate(() => localStorage.removeItem("aae-lang"));
await b.close();
