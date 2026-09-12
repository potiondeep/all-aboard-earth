import React, { useEffect, useRef, useState } from "react";

/**
 * 🌱 The seed sprout — hand-authored SVG, not a trace.
 *
 * Why hand-authored: the felt seed art is a photographic render. potrace turns
 * it into a blob of contours with no separable root/stem/leaf, and a stroke
 * draw-on needs real stroked paths with known lengths. Six named paths give
 * exactly the handles the germination needs, at ~1KB instead of 68KB.
 *
 * Growth order (once, at 40% in view): roots draw down, the stem overlaps in
 * 300ms later, leaves unfurl last with a slight overshoot. Then it sways.
 */

const useGrow = (threshold = 0.4) => {
  const ref = useRef(null);
  const [grown, setGrown] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setGrown(true);
      return;
    }
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setGrown(true);
          io.disconnect();
        }
      },
      { threshold }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);
  return [ref, grown];
};

export default function Seed({ className = "", variant = "mark", hue }) {
  const [ref, grown] = useGrow(0.4);
  const stroke = hue || "currentColor";

  return (
    <svg
      ref={ref}
      className={
        "seed seed--" + variant + (grown ? " is-grown" : "") + " " + className
      }
      viewBox="0 0 100 140"
      role="presentation"
      aria-hidden="true"
    >
      <g className="seed-sway">
        {/* roots first — they draw downward from under the hull */}
        <g className="seed-roots" fill="none" strokeLinecap="round">
          <path id="seed-root-1" d="M50 92 C46 104, 38 110, 30 122" stroke={stroke} strokeWidth="3.2" />
          <path id="seed-root-2" d="M50 92 C50 106, 51 116, 50 132" stroke={stroke} strokeWidth="3.6" />
          <path id="seed-root-3" d="M50 92 C55 103, 63 109, 71 120" stroke={stroke} strokeWidth="3.2" />
        </g>

        {/* the hull sits at the origin of everything */}
        <ellipse id="seed-hull" cx="50" cy="84" rx="11" ry="8.5" fill={stroke} />

        {/* stem climbs out of the hull */}
        <path
          id="seed-stem"
          d="M50 78 C50 66, 50 56, 50 42"
          fill="none"
          stroke={stroke}
          strokeWidth="3.6"
          strokeLinecap="round"
        />

        {/* leaves unfurl last, each about its own base */}
        <path
          id="seed-leaf-l"
          className="seed-leaf"
          d="M50 52 C38 50, 28 42, 26 32 C37 30, 47 38, 50 52 Z"
          fill={stroke}
        />
        <path
          id="seed-leaf-r"
          className="seed-leaf"
          d="M50 46 C62 43, 72 34, 74 24 C63 22, 53 31, 50 46 Z"
          fill={stroke}
        />
      </g>
    </svg>
  );
}
