/** Mobile LCP probe against any base URL (4x CPU, 1.6Mbps). Usage: node scripts/lcp-probe.mjs <base> [runs] */
import puppeteer from "puppeteer-core";
const BASE = process.argv[2]; const RUNS = +(process.argv[3] || 5);
const wait = (ms) => new Promise((r) => setTimeout(r, ms));
const b = await puppeteer.launch({ executablePath: "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome", headless: "new" });
const out = [];
for (let i = 0; i < RUNS; i++) {
  const p = await b.newPage();
  await p.emulate({ viewport: { width: 412, height: 823, deviceScaleFactor: 2.6, isMobile: true, hasTouch: true },
    userAgent: "Mozilla/5.0 (Linux; Android 11) AppleWebKit/537.36 Chrome/120 Mobile Safari/537.36" });
  const c = await p.target().createCDPSession();
  await c.send("Network.enable");
  await c.send("Network.clearBrowserCache");
  await c.send("Network.emulateNetworkConditions", { offline: false, latency: 150, downloadThroughput: 1.6*1024*1024/8, uploadThroughput: 750*1024/8 });
  await c.send("Emulation.setCPUThrottlingRate", { rate: 4 });
  await p.evaluateOnNewDocument(() => {
    window.__m = { lcp: 0, el: "", fcp: 0 };
    new PerformanceObserver((l) => { for (const e of l.getEntries()) { window.__m.lcp = e.startTime; window.__m.el = (e.element?.className || e.element?.tagName || "") + " " + (e.url || "").split("/").pop(); } })
      .observe({ type: "largest-contentful-paint", buffered: true });
    new PerformanceObserver((l) => { for (const e of l.getEntries()) if (e.name === "first-contentful-paint") window.__m.fcp = e.startTime; })
      .observe({ type: "paint", buffered: true });
  });
  await p.goto(BASE, { waitUntil: "networkidle2", timeout: 90000 });
  await wait(2000);
  const m = await p.evaluate(() => window.__m);
  out.push(m); console.log(`  run ${i+1}: FCP ${(m.fcp/1000).toFixed(2)}s  LCP ${(m.lcp/1000).toFixed(2)}s  <- ${m.el.trim()}`);
  await p.close();
}
const med = (a) => a.slice().sort((x, y) => x - y)[Math.floor(a.length / 2)];
console.log(`MEDIAN  FCP ${(med(out.map(o=>o.fcp))/1000).toFixed(2)}s  LCP ${(med(out.map(o=>o.lcp))/1000).toFixed(2)}s`);
await b.close();
