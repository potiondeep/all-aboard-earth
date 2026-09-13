/**
 * Proves the divider rung selection and captures a 1:1 device-pixel crop so the
 * sharpness change can actually be seen rather than asserted.
 */
import puppeteer from "puppeteer-core";
import { mkdir } from "node:fs/promises";

const BASE = process.argv[2] || "http://localhost:5173";
const CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const OUT = "remaster-proof";
const settle = (ms) => new Promise((r) => setTimeout(r, ms));

const CASES = [
  { label: "phone",    width: 390,  height: 844, dpr: 3 },
  { label: "laptop",   width: 1440, height: 900, dpr: 2 },
  { label: "desktop",  width: 1920, height: 1080, dpr: 2 },
];

const browser = await puppeteer.launch({
  executablePath: CHROME, headless: "new",
  args: ["--force-prefers-reduced-motion=false", "--hide-scrollbars"],
});
await mkdir(OUT, { recursive: true });

for (const c of CASES) {
  const page = await browser.newPage();
  await page.emulateMediaFeatures([{ name: "prefers-reduced-motion", value: "no-preference" }]);
  await page.setViewport({ width: c.width, height: c.height, deviceScaleFactor: c.dpr });

  const fetched = [];
  page.on("response", (r) => {
    const u = r.url();
    if (u.includes("divider-wave-mountain")) fetched.push(u.split("/").pop());
  });

  await page.goto(BASE, { waitUntil: "networkidle2" });
  await page.evaluate(() => {
    const d = document.querySelector(".divider");
    if (d) d.scrollIntoView({ block: "center" });
  });
  await settle(2600); // reveal + mask drop

  const m = await page.evaluate(() => {
    const svg = document.querySelector(".divider .divider-svg");
    const img = document.querySelector(".divider image");
    if (!svg || !img) return null;
    const r = svg.getBoundingClientRect();
    return { cssW: Math.round(r.width), cssH: Math.round(r.height), href: (img.getAttribute("href") || "").split("/").pop() };
  });

  const el = await page.$(".divider");
  if (el) await el.screenshot({ path: `${OUT}/divider-${c.label}.png` });

  const needed = c.width * Math.min(c.dpr, 2);
  // filenames are content-hashed in prod, so match the rung width, not "-NNNN."
  const rung = m && /-(1600|2560|3840)[-.]/.exec(m.href);
  const srcW = rung ? +rung[1] : 0;
  console.log(
    `${c.label.padEnd(8)} ${String(c.width).padStart(4)}css @${c.dpr}x  ` +
    `needs ${String(needed).padStart(4)}px  ->  ${m ? m.href : "NO IMAGE"}  ` +
    `(${srcW >= needed ? "covers" : "UNDER"}; rendered ${m ? m.cssW + "x" + m.cssH : "?"} css)  ` +
    `fetched=${[...new Set(fetched)].length}`
  );
  await page.close();
}
await browser.close();
