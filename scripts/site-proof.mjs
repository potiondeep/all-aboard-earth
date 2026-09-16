/** Whole-site check: every page renders, every link resolves, no console errors. Usage: node scripts/site-proof.mjs [base] */
import puppeteer from "puppeteer-core";
const BASE = process.argv[2] || "https://all-aboard-earth.vercel.app";
const PAGES = ["/", "/cool-careers", "/edutainment", "/regenerative-art"];
const wait = (ms) => new Promise((r) => setTimeout(r, ms));
const b = await puppeteer.launch({ executablePath: "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome", headless: "new", args: ["--hide-scrollbars"] });
const links = new Map();
for (const path of PAGES) {
  const p = await b.newPage(); const errs = [];
  p.on("pageerror", (e) => errs.push(e.message)); p.on("console", (m) => m.type() === "error" && errs.push(m.text()));
  await p.setViewport({ width: 1280, height: 900 });
  const res = await p.goto(BASE + path, { waitUntil: "networkidle2" });
  await wait(1200);
  const found = await p.evaluate(() => [...document.querySelectorAll("a[href]")].map((a) => a.href).filter((h) => /^https?:/.test(h)));
  found.forEach((h) => links.set(h, (links.get(h) || new Set()).add(path)));
  const info = await p.evaluate(() => ({ h1: document.querySelector("h1")?.innerText.slice(0, 40), imgs: document.querySelectorAll("img").length }));
  console.log(path.padEnd(19), `HTTP ${res.status()}`, JSON.stringify(info), "errors:", errs.length ? errs : "none");
  await p.close();
}
console.log("\nchecking", links.size, "distinct links");
const p = await b.newPage();
for (const [href, from] of [...links].sort()) {
  let status;
  try { const r = await p.goto(href, { waitUntil: "domcontentloaded", timeout: 25000 }); status = r.status(); }
  catch (e) { status = "ERR " + e.message.split("\n")[0].slice(0, 40); }
  const bad = typeof status !== "number" || status >= 400;
  if (bad || /allaboardearth|vercel/.test(href)) console.log(String(status).padStart(6), href.slice(0, 78), bad ? "  <= from " + [...from].join(",") : "");
}
await b.close();
