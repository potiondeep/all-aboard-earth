import React, { useEffect, useRef, useState } from "react";
import trainBody from "../assets/marks/train-body.webp";
import trainWheel from "../assets/marks/train-wheel.webp";

/**
 * 🚂 The companion — one component, three jobs.
 *
 * The felt locomotive is kept as art and layered, not redrawn: a body layer
 * (chassis felted solid behind the wheels) and one wheel layer used three
 * times, each rotating about its own hub. Steam is procedural SVG, so puff rate
 * can track scroll velocity.
 *
 * The art faces LEFT; every variant travels rightward (or up the rail), so the
 * layer stack is mirrored and all geometry below is in the art's own frame.
 *
 * variant: "rail" (scroll companion) | "crossing" (CTA band) | "space" (hero)
 */

// geometry as fractions of the 759x546 container, measured from the art
const CHIMNEY = { x: 0.248, y: 0.02 };
const WHEELS = [
  { x: 0.2442, y: 0.8158 },
  { x: 0.528, y: 0.814 },
  { x: 0.821, y: 0.8139 },
];
const WHEEL_D = 0.2648; // wheel diameter, fraction of container width
const PUFFS = 5;

const reducedMotion = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/** rAF-throttled scroll velocity in px/frame, plus an is-scrolling flag. */
export function useScrollMotion() {
  const [state, setState] = useState({ v: 0, moving: false, atEnd: false });
  useEffect(() => {
    if (reducedMotion()) return;
    let raf = 0;
    let last = window.scrollY;
    let stop = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const y = window.scrollY;
        const dv = Math.abs(y - last);
        last = y;
        const max = document.documentElement.scrollHeight - window.innerHeight;
        setState({ v: dv, moving: true, atEnd: max > 0 && y / max >= 0.98 });
        clearTimeout(stop);
        stop = setTimeout(() => setState((s) => ({ ...s, v: 0, moving: false })), 140);
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
      clearTimeout(stop);
    };
  }, []);
  return state;
}

/**
 * Wheels roll by the distance the train actually covers, so they never skid:
 * rail → the train's vertical travel on screen; crossing → its horizontal
 * position. Angle = distance / circumference. Runs only while on screen.
 */
function useRollingWheels(variant, hostRef, wheelRefs) {
  useEffect(() => {
    if (variant === "space" || reducedMotion()) return;
    const host = hostRef.current;
    if (!host) return;
    let raf = 0;
    let visible = true;
    let lastPos = null;
    let angle = 0;
    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; }, { rootMargin: "100px" });
    io.observe(host);
    const tick = () => {
      raf = requestAnimationFrame(tick);
      if (!visible) return;
      const r = host.getBoundingClientRect();
      const pos = variant === "rail" ? -r.top : r.left; // up the rail / rightward = forward
      if (lastPos !== null) {
        const d = pos - lastPos;
        if (d !== 0) {
          const circumference = Math.PI * WHEEL_D * r.width;
          angle -= (d / circumference) * 360; // negative in the mirrored frame = clockwise on screen
          const t = `rotate(${angle.toFixed(2)}deg)`;
          for (const w of wheelRefs.current) if (w) w.style.transform = t;
        }
      }
      lastPos = pos;
    };
    raf = requestAnimationFrame(tick);
    return () => { cancelAnimationFrame(raf); io.disconnect(); };
  }, [variant, hostRef, wheelRefs]);
}

export default function Train({ variant = "rail", className = "" }) {
  const { v, moving, atEnd } = useScrollMotion();
  const hostRef = useRef(null);
  const wheelRefs = useRef([]);
  useRollingWheels(variant, hostRef, wheelRefs);
  const reduced = reducedMotion();

  // puff rate tracks velocity, clamped 2–8/sec as specified
  const rate = Math.max(2, Math.min(8, 2 + v * 0.28));
  const cycle = (PUFFS / rate).toFixed(2);
  const steaming = !reduced && (variant === "crossing" || moving || atEnd);

  return (
    <div
      ref={hostRef}
      className={
        `train train--${variant} ${className}` +
        (moving ? " is-chugging" : "") +
        (atEnd ? " is-arrived" : "") +
        (steaming ? " is-steaming" : "")
      }
      style={{ "--puffCycle": `${cycle}s` }}
      aria-hidden="true"
    >
      <div className="train-stack">
        {/* procedural steam — hand-authored puffs, emitted from the chimney */}
        <svg className="train-steam" viewBox="0 0 100 100" preserveAspectRatio="none">
          {Array.from({ length: PUFFS }).map((_, i) => (
            <circle key={i} className="train-puff" cx={CHIMNEY.x * 100} cy={CHIMNEY.y * 100} r="4.4" style={{ "--i": i }} />
          ))}
        </svg>
        <img className="train-body" src={trainBody} alt="" width="759" height="546" loading="lazy" decoding="async" />
        {variant !== "space" &&
          WHEELS.map((w, i) => (
            <img
              key={i}
              ref={(n) => (wheelRefs.current[i] = n)}
              className="train-wheel"
              src={trainWheel}
              alt=""
              width="256"
              height="256"
              loading="lazy"
              decoding="async"
              style={{
                left: `${(w.x - WHEEL_D / 2) * 100}%`,
                top: `calc(${w.y * 100}% - ${(WHEEL_D / 2) * 100 * (759 / 546)}%)`,
                width: `${WHEEL_D * 100}%`,
              }}
            />
          ))}
      </div>
    </div>
  );
}
