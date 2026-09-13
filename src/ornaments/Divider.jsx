import React from "react";
import aSm from "../assets/marks/divider-wave-mountain-a-1600.webp";
import aMd from "../assets/marks/divider-wave-mountain-a-2560.webp";
import aLg from "../assets/marks/divider-wave-mountain-a-3840.webp";
import bSm from "../assets/marks/divider-wave-mountain-b-1600.webp";
import bMd from "../assets/marks/divider-wave-mountain-b-2560.webp";
import bLg from "../assets/marks/divider-wave-mountain-b-3840.webp";

/**
 * 🌊 Wave → mountain divider — deliberately static.
 *
 * Every motion treatment tried here (mask sweep, bobbing wave copies, scroll
 * parallax, the wobble displacement filter) resampled or double-exposed the
 * fine engraved hatching and read as fuzz. The painting is shown as-is.
 *
 * The divider is full-bleed, so the source has to cover the viewport at the
 * device pixel ratio; a plain <img> gets a real srcset and native lazy loading.
 */

const ART = {
  a: `${aSm} 1600w, ${aMd} 2560w, ${aLg} 3840w`,
  b: `${bSm} 1600w, ${bMd} 2560w, ${bLg} 3840w`,
};

export default function Divider({ flip = false }) {
  const v = flip ? "b" : "a";
  return (
    <div className={"divider" + (flip ? " flip" : "")} aria-hidden="true">
      <img
        className="divider-img"
        src={v === "a" ? aSm : bSm}
        srcSet={ART[v]}
        sizes="100vw"
        width="1600"
        height="192"
        alt=""
        loading="lazy"
        decoding="async"
      />
    </div>
  );
}
