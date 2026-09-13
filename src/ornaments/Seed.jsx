import React, { useEffect, useId, useRef, useState } from "react";
import seedArt from "../assets/marks/seed-mark.webp";

/**
 * 🌱 The seed sprout — the felt art, animated. Same principle as the dividers:
 * keep the artwork, drive it with masks rather than redrawing it as line work.
 *
 * The sprout is sliced into three horizontal bands (roots / pod+stem / leaves)
 * and each is revealed by its own mask rect that SCALES rather than clips —
 * scaleY is a transform, so the growth stays on the compositor instead of
 * forcing clip-path recalcs.
 *
 * Order: roots grow downward, the pod overlaps in 300ms later growing upward,
 * the leaves unfurl last from their base with a slight overshoot.
 */

const W = 520;
const H = 624;

// bands overlap slightly so no seam shows between them
const LEAVES = { y: 0, h: 236 };
const POD = { y: 192, h: 252 };
const ROOTS = { y: 418, h: H - 418 };

export default function Seed({ className = "", variant = "mark" }) {
  const uid = useId().replace(/:/g, "");
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
      { threshold: 0.4 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const m = (k) => `seed-${k}-${uid}`;

  return (
    <svg
      ref={ref}
      className={`seed seed--${variant} ${grown ? "is-grown" : ""} ${className}`}
      viewBox={`0 0 ${W} ${H}`}
      role="presentation"
      aria-hidden="true"
    >
      <defs>
        {/* each mask rect scales from the edge the growth should start at */}
        <mask id={m("roots")} maskUnits="userSpaceOnUse" x="0" y="0" width={W} height={H}>
          <rect className="sm-roots" x="0" y={ROOTS.y} width={W} height={ROOTS.h} fill="#fff" />
        </mask>
        <mask id={m("pod")} maskUnits="userSpaceOnUse" x="0" y="0" width={W} height={H}>
          <rect className="sm-pod" x="0" y={POD.y} width={W} height={POD.h} fill="#fff" />
        </mask>
        <mask id={m("leaves")} maskUnits="userSpaceOnUse" x="0" y="0" width={W} height={H}>
          <rect x="0" y={LEAVES.y} width={W} height={LEAVES.h} fill="#fff" />
        </mask>
      </defs>

      <g className="seed-sway">
        <g mask={`url(#${m("roots")})`}>
          <image href={seedArt} x="0" y="0" width={W} height={H} />
        </g>
        <g mask={`url(#${m("pod")})`}>
          <image href={seedArt} x="0" y="0" width={W} height={H} />
        </g>
        <g className="seed-leaves" mask={`url(#${m("leaves")})`}>
          <image href={seedArt} x="0" y="0" width={W} height={H} />
        </g>
      </g>
    </svg>
  );
}
