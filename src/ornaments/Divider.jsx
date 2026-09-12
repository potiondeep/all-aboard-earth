import React, { useEffect, useId, useRef, useState } from "react";
import dividerA from "../assets/marks/divider-wave-mountain-a.webp";
import dividerB from "../assets/marks/divider-wave-mountain-b.webp";

/**
 * 🌊 Wave → mountain divider.
 *
 * The painting is preserved. The wave→ridge path is an invisible MASK stroke
 * over it, not visible line art — it never renders, it only decides what is
 * shown. As its dashoffset runs out the mask sweeps left→right *along the
 * horizon*, so the wave visibly becomes the ridge rather than a flat wipe.
 *
 * `pathLength="100"` normalises both contours, so the dash animation is in
 * percent and never needs getTotalLength() at runtime.
 *
 * Water bob: the full painting is the static base; two extra copies of the
 * wave side (clipped, 0.7 and 0.4 opacity) translate on 7s and 9s cycles.
 * Desynced reads as water; synced would read as wallpaper. Mountains never
 * move — land is land.
 */

const VB_W = 1600;
const VB_H = 192;

// the handoff sits where the surf gives way to the ridge, ~44% across
const WAVE_PATH =
  "M-60 108 C 60 78, 140 132, 240 104 S 420 70, 520 106 S 700 130, 830 98";
const RIDGE_PATH =
  "M770 102 L 900 58 L 1000 96 L 1120 40 L 1240 92 L 1380 48 L 1500 96 L 1680 72";

export default function Divider({ flip = false }) {
  const uid = useId().replace(/:/g, "");
  const ref = useRef(null);
  const [drawn, setDrawn] = useState(false);
  const art = flip ? dividerB : dividerA;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setDrawn(true);
      return;
    }
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setDrawn(true);
          io.disconnect();
        }
      },
      { threshold: 0.25 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const maskId = `divmask-${uid}`;
  const clipId = `divclip-${uid}`;

  return (
    <div
      ref={ref}
      className={"divider" + (drawn ? " is-drawn" : "") + (flip ? " flip" : "")}
      aria-hidden="true"
    >
      <svg
        className="divider-svg wobble"
        viewBox={`0 0 ${VB_W} ${VB_H}`}
        preserveAspectRatio="none"
        width={VB_W}
        height={VB_H}
      >
        <defs>
          {/* invisible: this stroke only decides what the painting shows */}
          <mask id={maskId} maskUnits="userSpaceOnUse" x="0" y="0" width={VB_W} height={VB_H}>
            <path
              className="mask-wave"
              d={WAVE_PATH}
              pathLength="100"
              stroke="#fff"
              strokeWidth="460"
              fill="none"
              strokeLinecap="butt"
            />
            <path
              className="mask-ridge"
              d={RIDGE_PATH}
              pathLength="100"
              stroke="#fff"
              strokeWidth="460"
              fill="none"
              strokeLinecap="butt"
            />
          </mask>
          {/* the wave third, for the bobbing copies */}
          <clipPath id={clipId}>
            <rect x="0" y="0" width={VB_W * 0.46} height={VB_H} />
          </clipPath>
        </defs>

        <g mask={`url(#${maskId})`}>
          <image href={art} x="0" y="0" width={VB_W} height={VB_H} preserveAspectRatio="none" />
          <g clipPath={`url(#${clipId})`}>
            <image className="div-wave-a" href={art} x="0" y="0" width={VB_W} height={VB_H} preserveAspectRatio="none" opacity="0.7" />
            <image className="div-wave-b" href={art} x="0" y="0" width={VB_W} height={VB_H} preserveAspectRatio="none" opacity="0.4" />
          </g>
        </g>
      </svg>
    </div>
  );
}
