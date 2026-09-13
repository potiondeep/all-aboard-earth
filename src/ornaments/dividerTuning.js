/**
 * Divider motion settings, shared by every divider and the ?tune panel.
 *
 * Production: tide wipe, no depth parallax (chosen 2026-09-13 on the preview).
 * The ?tune panel stays available for revisiting; its saved choices only
 * apply while ?tune is in the URL, so they can never change what visitors see.
 * URL overrides: ?divider=dissolve|tide|static&cap=6&floor=0.15
 */
const DEFAULTS = { mode: "tide", cap: 0, floor: 0.15 };
const KEY = "aae-divider-tune";

function read() {
  const q = typeof location !== "undefined" ? new URLSearchParams(location.search) : new URLSearchParams();
  let saved = {};
  if (q.has("tune")) {
    try { saved = JSON.parse(localStorage.getItem(KEY) || "{}"); } catch {}
  }
  const out = { ...DEFAULTS, ...saved };
  if (q.has("divider")) out.mode = q.get("divider");
  if (q.has("cap")) out.cap = Math.max(0, Math.min(30, Number(q.get("cap")) || 0));
  if (q.has("floor")) out.floor = Math.max(0, Math.min(1, Number(q.get("floor")) || 0));
  if (!["dissolve", "tide", "static"].includes(out.mode)) out.mode = DEFAULTS.mode;
  return out;
}

export const tuning = read();
const subs = new Set();
export function subscribe(fn) { subs.add(fn); return () => subs.delete(fn); }
export function setTuning(patch) {
  Object.assign(tuning, patch);
  try { localStorage.setItem(KEY, JSON.stringify(tuning)); } catch {}
  subs.forEach((fn) => fn({ ...tuning }));
}
export const tunePanelEnabled = () =>
  typeof location !== "undefined" && new URLSearchParams(location.search).has("tune");
