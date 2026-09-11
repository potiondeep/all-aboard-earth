/**
 * Verification pass for the remaster (section 3 of the brief).
 *
 * Renders the site in a real (headless) Chrome, where requestAnimationFrame and
 * IntersectionObserver actually run — the Claude browser panes report
 * visibilityState "hidden", which pauses both and makes scroll-reveal
 * impossible to exercise there.
 *
 * Produces:
 *   remaster-proof/<seat>-desktop.png   1440x900
 *   remaster-proof/<seat>-mobile.png     390x844
 *   remaster-proof/report.json           reveal + motion + CLS findings
 *
 * Usage: node scripts/remaster-proof.mjs [baseUrl]
 */
import puppeteer from "puppeteer-core";
import { mkdir, writeFile } from "node:fs/promises";

const BASE = process.argv[2] || "http://localhost:5173";
const CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const OUT = "remaster-proof";

const SEATS = [
  { id: "01-hero", scroll: 0 },
  { id: "02-marquee-track01", sel: ".marquee" },
  { id: "05-cool-careers", sel: "#cool-careers" },
  { id: "06-panels", sel: ".panels" },
  { id: "07-cards", sel: ".cards" },
  { id: "08-proof", sel: ".photoprint" },
  { id: "09-cta-footer", sel: ".ctaband" },
];

const settle = (ms) => new Promise((r) => setTimeout(r, ms));

async function shoot(page, label, width, height) {
  await page.setViewport({ width, height, deviceScaleFactor: 1 });
  for (const seat of SEATS) {
    await page.evaluate(() => window.scrollTo(0, 0));
    await settle(250);
    if (seat.sel) {
      const found = await page.evaluate((s) => {
        const el = document.querySelector(s);
        if (!el) return false;
        el.scrollIntoView({ block: "center" });
        return true;
      }, seat.sel);
      if (!found) { console.log(`  ! ${seat.id}: selector ${seat.sel} not found`); continue; }
    } else {
      await page.evaluate((y) => window.scrollTo(0, y), seat.scroll || 0);
    }
    await settle(1500); // let reveals + entrances finish naturally
    await page.screenshot({ path: `${OUT}/${seat.id}-${label}.png` });
    console.log(`  ${seat.id}-${label}.png`);
  }
}

const browser = await puppeteer.launch({
  executablePath: CHROME,
  headless: "new",
  args: ["--force-prefers-reduced-motion=false", "--hide-scrollbars"],
});

try {
  await mkdir(OUT, { recursive: true });
  const page = await browser.newPage();
  // Headless Chrome can default to reduced motion, which would silently make
  // every reveal "pass" via the reduced-motion rule. Pin it explicitly.
  await page.emulateMediaFeatures([{ name: "prefers-reduced-motion", value: "no-preference" }]);
  const report = {};

  await page.setViewport({ width: 1440, height: 900 });
  await page.goto(BASE, { waitUntil: "networkidle2", timeout: 60000 });
  await settle(1200);

  report.visibilityState = await page.evaluate(() => document.visibilityState);
  report.prefersReducedMotion = await page.evaluate(() => matchMedia("(prefers-reduced-motion: reduce)").matches);
  report.rafRuns = await page.evaluate(
    () => new Promise((r) => { requestAnimationFrame(() => r(true)); setTimeout(() => r(false), 800); })
  );

  // --- scroll-reveal, exercised for real ---
  report.revealBeforeScroll = await page.evaluate(
    () => document.querySelectorAll("[data-reveal].in").length
  );
  const h = await page.evaluate(() => document.documentElement.scrollHeight);
  for (let y = 0; y < h; y += 500) {
    await page.evaluate((v) => window.scrollTo(0, v), y);
    await settle(160);
  }
  await settle(1200);
  Object.assign(report, await page.evaluate(() => {
    const els = [...document.querySelectorAll("[data-reveal]")];
    return {
      revealTotal: els.length,
      revealAfterScroll: els.filter((e) => e.classList.contains("in")).length,
      revealOpacities: [...new Set(els.map((e) => getComputedStyle(e).opacity))],
      drawOnOffsets: [...new Set([...document.querySelectorAll(".draw-on")].map((e) => getComputedStyle(e).strokeDashoffset))],
      sunSpinDuration: getComputedStyle(document.querySelector(".vinyl-disc")).animationDuration,
      sunParallax: getComputedStyle(document.querySelector(".hero")).getPropertyValue("--sun-shift"),
      railClimb: document.querySelector(".rail-train")?.style.getPropertyValue("--climb"),
      seedIcoOpacity: getComputedStyle(document.querySelector(".seed-ico")).opacity,
    };
  }));

  // --- layout stability: every image must carry explicit dimensions ---
  report.imagesWithoutDimensions = await page.evaluate(
    () => [...document.querySelectorAll("img")].filter((i) => !i.getAttribute("width") || !i.getAttribute("height")).length
  );
  report.imageCount = await page.evaluate(() => document.querySelectorAll("img").length);
  report.brokenImages = await page.evaluate(
    () => [...document.querySelectorAll("img")].filter((i) => i.complete && i.naturalWidth === 0).map((i) => i.src)
  );

  // --- reduced motion ---
  const rm = await browser.newPage();
  await rm.emulateMediaFeatures([{ name: "prefers-reduced-motion", value: "reduce" }]);
  await rm.setViewport({ width: 1440, height: 900 });
  await rm.goto(BASE, { waitUntil: "networkidle2", timeout: 60000 });
  await settle(1200);
  report.reducedMotion = await rm.evaluate(() => {
    const running = [...document.querySelectorAll("*")]
      .flatMap((e) => (e.getAnimations ? e.getAnimations() : []))
      .filter((a) => a.playState === "running")
      .map((a) => a.animationName || "transition");
    return {
      grainHidden: getComputedStyle(document.querySelector(".grain")).display === "none",
      revealsVisible: [...document.querySelectorAll("[data-reveal]")].every((e) => getComputedStyle(e).opacity === "1"),
      stillRunning: [...new Set(running)],
    };
  });
  await rm.close();

  console.log("desktop shots:");
  await shoot(page, "desktop", 1440, 900);
  console.log("mobile shots:");
  await shoot(page, "mobile", 390, 844);

  // --- overflow at 390px ---
  await page.setViewport({ width: 390, height: 844 });
  await settle(500);
  report.mobileHorizontalScroll = await page.evaluate(
    () => document.documentElement.scrollWidth > document.documentElement.clientWidth
  );

  await writeFile(`${OUT}/report.json`, JSON.stringify(report, null, 2));
  console.log("\n" + JSON.stringify(report, null, 2));
} finally {
  await browser.close();
}
