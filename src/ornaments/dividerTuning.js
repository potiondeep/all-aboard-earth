/**
 * Divider motion settings, shared by every divider and the ?tune panel.
 *
 * PREVIEW-ONLY: the panel exists so the scroll-linked treatments can be
 * compared on a live URL. Settings come from the URL first
 * (?divider=dissolve|tide|static&cap=6&floor=0.15), then localStorage.
 */
const DEFAULTS = { mode: "dissolve", cap: 30, floor: 0.15 };
const KEY = "aae-divider-tune";

function read() {
  let saved = {};
  try { saved = JSON.parse(localStorage.getItem(KEY) || "{}"); } catch {}
  const q = typeof location !== "undefined" ? new URLSearchParams(location.search) : new URLSearchParams();
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
