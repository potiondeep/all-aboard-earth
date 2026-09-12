import React, { useEffect, useRef, useState } from "react";
import trainBody from "../assets/marks/train-body.webp";

/**
 * 🚂 The companion — one component, three jobs.
 *
 * The felt locomotive is kept as art and layered, not redrawn: the fixed felt
 * steam plume is cropped off and steam is emitted procedurally instead, which
 * is what lets puff rate track scroll velocity. The body rides as a transformed
 * layer.
 *
 * Known limit: the wheels are NOT separately rotated. A connecting rod runs
 * across both wheel faces in this artwork, so a rotating circular crop would
 * sweep the rod in a circle — mechanically wrong and visibly broken. See
 * MISSING_ART.md; a side-view with separated elements would unblock it.
 *
 * variant: "rail" (scroll companion) | "crossing" (CTA band) | "space" (hero)
 */

const CHIMNEY = { x: 0.205, y: 0.055 }; // steam origin, as a fraction of the body box
const PUFFS = 5;

/** rAF-throttled scroll velocity in px/frame, plus an is-scrolling flag. */
export function useScrollMotion() {
  const [state, setState] = useState({ v: 0, moving: false, atEnd: false });
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
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
        stop = setTimeout(
          () => setState((s) => ({ ...s, v: 0, moving: false })),
          140
        );
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

export default function Train({ variant = "rail", className = "" }) {
  const { v, moving, atEnd } = useScrollMotion();
  const reduced =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // puff rate tracks velocity, clamped 2–8/sec as specified
  const rate = Math.max(2, Math.min(8, 2 + v * 0.28));
  const cycle = (PUFFS / rate).toFixed(2);

  const steaming = !reduced && (variant === "crossing" || moving || atEnd);

  return (
    <div
      className={
        `train train--${variant} ${className}` +
        (moving ? " is-chugging" : "") +
        (atEnd ? " is-arrived" : "") +
        (steaming ? " is-steaming" : "")
      }
      style={{ "--puffCycle": `${cycle}s` }}
      aria-hidden="true"
    >
      {/* procedural steam — hand-authored puffs, emitted from the chimney */}
      <svg className="train-steam" viewBox="0 0 100 100" preserveAspectRatio="none">
        {Array.from({ length: PUFFS }).map((_, i) => (
          <circle
            key={i}
            id={`train-steam-${i + 1}`}
            className="train-puff"
            cx={CHIMNEY.x * 100}
            cy={CHIMNEY.y * 100}
            r="4.4"
            style={{ "--i": i }}
          />
        ))}
      </svg>

      <img
        id="train-body"
        className="train-body"
        src={trainBody}
        alt=""
        width="620"
        height="378"
        loading="lazy"
        decoding="async"
      />
    </div>
  );
}
