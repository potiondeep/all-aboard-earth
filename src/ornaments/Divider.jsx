import React, { useEffect, useId, useRef, useState } from "react";
import aSm from "../assets/marks/divider-wave-mountain-a-1600.webp";
import aMd from "../assets/marks/divider-wave-mountain-a-2560.webp";
import aLg from "../assets/marks/divider-wave-mountain-a-3840.webp";
import bSm from "../assets/marks/divider-wave-mountain-b-1600.webp";
import bMd from "../assets/marks/divider-wave-mountain-b-2560.webp";
import bLg from "../assets/marks/divider-wave-mountain-b-3840.webp";

/* The divider is full-bleed, so its intrinsic width has to cover the whole
 * viewport at the device's pixel ratio — a 1600px asset is only 0.42x on a
 * 1920 screen at DPR 2, which is exactly what read as "blurry". SVG <image>
 * has no srcset, so pick the rung once at mount and fetch only that one. */
const RUNGS = {
  a: [[1600, aSm], [2560, aMd], [3840, aLg]],
  b: [[1600, bSm], [2560, bMd], [3840, bLg]],
};

function pickArt(variant) {
  const rungs = RUNGS[variant];
  if (typeof window === "undefined") return rungs[0][1];
  // DPR above 2 buys nothing visible here and costs real bytes on phones
  const need = window.innerWidth * Math.min(window.devicePixelRatio || 1, 2);
  return (rungs.find(([w]) => w >= need) || rungs[rungs.length - 1])[1];
}

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
  // SVG <image> has no loading="lazy", so the paintings would otherwise fetch
  // eagerly and compete with the hero for LCP. Gate them on proximity instead.
  const [near, setNear] = useState(false);
  // Once the sweep finishes the mask is fully open, so it is pure cost: it would
  // keep compositing every frame underneath the two bobbing wave layers. Drop it.
  const [maskDone, setMaskDone] = useState(false);
  const [art] = useState(() => pickArt(flip ? "b" : "a"));

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setDrawn(true);
      setNear(true);
      setMaskDone(true);
      return;
    }
    const draw = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setDrawn(true);
          draw.disconnect();
          // wave 1200ms + ridge 600ms delay + 1100ms, plus a little slack
          setTimeout(() => setMaskDone(true), 2000);
        }
      },
      { threshold: 0.25 }
    );
    const load = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setNear(true);
          load.disconnect();
        }
      },
      { rootMargin: "500px" }
    );
    draw.observe(el);
    load.observe(el);
    return () => {
      draw.disconnect();
      load.disconnect();
    };
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

        <g mask={maskDone ? undefined : `url(#${maskId})`}>
          {near && <>
          <image href={art} x="0" y="0" width={VB_W} height={VB_H} preserveAspectRatio="none" />
          <g clipPath={`url(#${clipId})`}>
            <image className="div-wave-a" href={art} x="0" y="0" width={VB_W} height={VB_H} preserveAspectRatio="none" opacity="0.7" />
            <image className="div-wave-b" href={art} x="0" y="0" width={VB_W} height={VB_H} preserveAspectRatio="none" opacity="0.4" />
          </g>
          </>}
        </g>
      </svg>
    </div>
  );
}
