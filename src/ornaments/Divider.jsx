import React, { useEffect, useRef, useState } from "react";
import { tuning, subscribe } from "./dividerTuning.js";
import a_far_1600 from "../assets/divider-layers/a-far-1600.webp";
import a_far_2560 from "../assets/divider-layers/a-far-2560.webp";
import a_far_3840 from "../assets/divider-layers/a-far-3840.webp";
import a_mid_1600 from "../assets/divider-layers/a-mid-1600.webp";
import a_mid_2560 from "../assets/divider-layers/a-mid-2560.webp";
import a_mid_3840 from "../assets/divider-layers/a-mid-3840.webp";
import a_land_1600 from "../assets/divider-layers/a-land-1600.webp";
import a_land_2560 from "../assets/divider-layers/a-land-2560.webp";
import a_land_3840 from "../assets/divider-layers/a-land-3840.webp";
import a_sea_1600 from "../assets/divider-layers/a-sea-1600.webp";
import a_sea_2560 from "../assets/divider-layers/a-sea-2560.webp";
import a_sea_3840 from "../assets/divider-layers/a-sea-3840.webp";
import b_far_1600 from "../assets/divider-layers/b-far-1600.webp";
import b_far_2560 from "../assets/divider-layers/b-far-2560.webp";
import b_far_3840 from "../assets/divider-layers/b-far-3840.webp";
import b_mid_1600 from "../assets/divider-layers/b-mid-1600.webp";
import b_mid_2560 from "../assets/divider-layers/b-mid-2560.webp";
import b_mid_3840 from "../assets/divider-layers/b-mid-3840.webp";
import b_land_1600 from "../assets/divider-layers/b-land-1600.webp";
import b_land_2560 from "../assets/divider-layers/b-land-2560.webp";
import b_land_3840 from "../assets/divider-layers/b-land-3840.webp";
import b_sea_1600 from "../assets/divider-layers/b-sea-1600.webp";
import b_sea_2560 from "../assets/divider-layers/b-sea-2560.webp";
import b_sea_3840 from "../assets/divider-layers/b-sea-3840.webp";

/**
 * 🌊 Wave → mountain divider — scroll-linked, painting kept.
 *
 * The banner is sliced into depth bands cut along the painting's own
 * silhouettes (far: sky/clouds/distant peaks · mid: forest line, village, open
 * sea · near: foreground water and trees, split into sea and land). Each band
 * holds only its own pixels, so at rest they recombine into the exact painting
 * and nothing is ever double-exposed.
 *
 * Progress p runs 0 (divider enters the viewport) → 1 (it leaves) and is
 * recomputed from scroll position every frame, so scrolling back reverses
 * everything. Only transform and opacity change; masks are static.
 *
 *   bleed     static top/bottom gradient mask into the neighbouring sections
 *   dissolve  wave region and mountain region crossfade across a 15% feather
 *   tide      (A/B alternate) a feathered edge uncovers the painting left→right
 *   parallax  far 0.9× · mid 1.0× · near 1.05× scroll speed, capped
 *   water     the near-sea layer bobs ±3px on 7s, whole pixels only
 */

const RUNGS = [1600, 2560, 3840];
const SRC = {
  a: { far: [a_far_1600, a_far_2560, a_far_3840], mid: [a_mid_1600, a_mid_2560, a_mid_3840],
       land: [a_land_1600, a_land_2560, a_land_3840], sea: [a_sea_1600, a_sea_2560, a_sea_3840] },
  b: { far: [b_far_1600, b_far_2560, b_far_3840], mid: [b_mid_1600, b_mid_2560, b_mid_3840],
       land: [b_land_1600, b_land_2560, b_land_3840], sea: [b_sea_1600, b_sea_2560, b_sea_3840] },
};
// which side the waves are on, and where water hands off to land
const WAVE_SIDE = { a: "left", b: "right" };
const FEATHER = 0.15;
const REF_H = 150; // the cap is authored against the 150px desktop banner

const srcSet = (list) => list.map((u, i) => `${u} ${RUNGS[i]}w`).join(", ");
const reduced = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/* ---------- one shared, rAF-throttled scroll engine for every divider ---------- */
const live = new Set();
let raf = 0;
const clamp = (v, lo, hi) => Math.max(lo, Math.min(hi, v));
const px = (v) => { const d = window.devicePixelRatio || 1; return Math.round(v * d) / d; };

function frame() {
  raf = 0;
  const vh = window.innerHeight;
  for (const d of live) {
    const r = d.el.getBoundingClientRect();
    const p = clamp((vh - r.top) / (vh + r.height), 0, 1);
    const c = p - 0.5;
    const travel = vh + r.height;
    const cap = tuning.cap * (r.height / REF_H);
    const far = px(clamp(0.10 * c * travel, -cap, cap));
    const near = px(clamp(-0.05 * c * travel, -cap, cap));
    for (const n of d.far) n.style.transform = `translate3d(0,${far}px,0)`;
    for (const n of d.near) n.style.transform = `translate3d(0,${near}px,0)`;

    if (d.waveRegion && d.landRegion) {
      // waves full on entry, the whole painting at mid-scroll, mountains full on exit
      const f = tuning.floor;
      d.waveRegion.style.opacity = (p <= 0.5 ? 1 : 1 - (1 - f) * ((p - 0.5) / 0.5)).toFixed(3);
      d.landRegion.style.opacity = (p >= 0.5 ? 1 : f + (1 - f) * (p / 0.5)).toFixed(3);
    }
    if (d.tide && d.tideInner) {
      // fully uncovered by the time the divider reaches mid-viewport
      const t = clamp(p / 0.5, 0, 1);
      const w = r.width * (1 + FEATHER);
      const x = px(-w + w * t);
      d.tide.style.transform = `translate3d(${x}px,0,0)`;
      d.tideInner.style.transform = `translate3d(${-x}px,0,0)`;
    }
  }
}
const schedule = () => { if (!raf) raf = requestAnimationFrame(frame); };
let listening = false;
function ensureListening() {
  if (listening) return;
  listening = true;
  window.addEventListener("scroll", schedule, { passive: true });
  window.addEventListener("resize", schedule, { passive: true });
  subscribe(schedule);
}

/* ---------- the band stack (rendered once, or once per dissolve region) ---------- */
function Stack({ v, register }) {
  const s = SRC[v];
  const img = (name) => (
    <img className={`dv-img dv-${name}`} src={s[name][0]} srcSet={srcSet(s[name])} sizes="100vw"
         width="1600" height="192" alt="" loading="lazy" decoding="async" />
  );
  return (
    <>
      <div className="dv-layer" ref={(n) => register("far", n)}>{img("far")}</div>
      <div className="dv-layer">{img("mid")}</div>
      <div className="dv-layer" ref={(n) => register("near", n)}>{img("land")}</div>
      <div className="dv-layer" ref={(n) => register("near", n)}><div className="dv-bob">{img("sea")}</div></div>
    </>
  );
}

export default function Divider({ flip = false }) {
  const v = flip ? "b" : "a";
  const ref = useRef(null);
  const nodes = useRef(null);
  const [mode, setMode] = useState(reduced() ? "static" : tuning.mode);
  const [visible, setVisible] = useState(false);

  useEffect(() => (reduced() ? undefined : subscribe((t) => setMode(t.mode))), []);

  // one registry per mode: switching mode remounts the subtree, so start clean
  if (!nodes.current || nodes.current.mode !== mode) {
    nodes.current = { mode, el: null, far: new Set(), near: new Set(),
                      waveRegion: null, landRegion: null, tide: null, tideInner: null };
  }
  const register = (kind, n) => { if (n) nodes.current[kind].add(n); };

  useEffect(() => {
    const d = nodes.current;
    d.el = ref.current;
    if (!d.el || mode === "static") return;
    ensureListening();
    const io = new IntersectionObserver(([e]) => {
      setVisible(e.isIntersecting);
      if (e.isIntersecting) { live.add(d); schedule(); } else live.delete(d);
    }, { rootMargin: "200px 0px" });
    io.observe(d.el);
    return () => { io.disconnect(); live.delete(d); };
  }, [mode]);

  const waveMaskClass = WAVE_SIDE[v] === "left" ? "dv-mask-left" : "dv-mask-right";
  const landMaskClass = WAVE_SIDE[v] === "left" ? "dv-mask-right-cover" : "dv-mask-left-cover";

  return (
    <div ref={ref} className={`divider divider--${mode}${visible ? " is-live" : ""}`} aria-hidden="true">
      <div className="dv-bleed">
        {mode === "dissolve" ? (
          <>
            {/* land sits underneath and fully covers everything the wave feather leaves */}
            <div className={`dv-region ${landMaskClass}`} ref={(n) => n && (nodes.current.landRegion = n)}>
              <Stack v={v} register={register} />
            </div>
            <div className={`dv-region ${waveMaskClass}`} ref={(n) => n && (nodes.current.waveRegion = n)}>
              <Stack v={v} register={register} />
            </div>
          </>
        ) : mode === "tide" ? (
          <div className="dv-tide" ref={(n) => n && (nodes.current.tide = n)}>
            <div className="dv-tide-inner" ref={(n) => n && (nodes.current.tideInner = n)}>
              <Stack v={v} register={register} />
            </div>
          </div>
        ) : (
          <div className="dv-region"><Stack v={v} register={() => {}} /></div>
        )}
      </div>
    </div>
  );
}
