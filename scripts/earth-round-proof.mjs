/** Earth roundness proof: measures the rendered globe's bounding box at desktop and phone. */
import puppeteer from "puppeteer-core";
const wait = (ms) => new Promise((r) => setTimeout(r, ms));
const b = await puppeteer.launch({ executablePath: "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome", headless: "new", args: ["--hide-scrollbars", "--autoplay-policy=no-user-gesture-required"] });
for (const [name, w, h, dpr] of [["desktop", 1440, 900, 2], ["phone", 390, 844, 3]]) {
  const p = await b.newPage();
  await p.setViewport({ width: w, height: h, deviceScaleFactor: dpr });
  await p.goto("http://localhost:5173/", { waitUntil: "networkidle2" });
  await wait(2500);
  const m = await p.evaluate(() => {
    const v = document.querySelector(".earth-wrap video");
    const r = v.getBoundingClientRect();
    return { src: v.currentSrc.split("/").pop(), vw: v.videoWidth, vh: v.videoHeight, boxW: Math.round(r.width), boxH: Math.round(r.height) };
  });
  console.log(`${name}: ${m.src} intrinsic ${m.vw}x${m.vh} (ratio ${(m.vw / m.vh).toFixed(3)}) rendered ${m.boxW}x${m.boxH} (ratio ${(m.boxW / m.boxH).toFixed(3)})`);
  const clip = await p.evaluate(() => { const r = document.querySelector(".earth-wrap").getBoundingClientRect(); return { x: Math.max(0, r.x - 20), y: Math.max(0, scrollY + r.y - 20), width: Math.min(innerWidth, r.width + 40), height: r.height + 40 }; });
  await p.screenshot({ path: `remaster-proof/felt/earth-round-${name}.png`, clip });
  await p.close();
}
await b.close();
