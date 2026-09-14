import React, { useEffect, useRef, useState } from "react";

/**
 * A felt animation loop standing in for a still. Each clip is a ping-pong loop
 * whose poster is frame 0, so the swap from still to motion has no jump.
 *
 * Nothing is fetched until the clip nears the viewport — not even the poster,
 * which a <video> would otherwise download at page load (preload="none"), it
 * plays only while visible, and reduced motion gets the poster alone.
 * Sources: VP9 WebM first, H.264 MP4 for browsers without VP9.
 */
const reducedMotion = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export default function FeltLoop({ name, width, height, alt = "", className }) {
  const ref = useRef(null);
  const [reduced] = useState(reducedMotion);
  const [near, setNear] = useState(false);
  const base = `/art/felt/${name}`;

  useEffect(() => {
    const v = ref.current;
    if (!v || reduced) return;
    const approach = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setNear(true); approach.disconnect(); }
    }, { rootMargin: "900px 0px" });
    approach.observe(v);
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) v.play().catch(() => {});
        else v.pause();
      },
      { threshold: 0.2 }
    );
    io.observe(v);
    return () => { io.disconnect(); approach.disconnect(); };
  }, [reduced]);

  const label = alt ? (
    <span style={{ position: "absolute", width: 1, height: 1, overflow: "hidden", clip: "rect(0 0 0 0)", whiteSpace: "nowrap" }}>
      {alt}
    </span>
  ) : null;

  if (reduced) {
    return <img className={className} src={`${base}-poster.webp`} alt={alt} width={width} height={height} loading="lazy" decoding="async" />;
  }
  return (
    <>
      <video
        ref={ref}
        className={className}
        poster={near ? `${base}-poster.webp` : undefined}
        width={width}
        height={height}
        muted
        loop
        playsInline
        preload="none"
        aria-hidden="true"
      >
        <source src={`${base}.webm`} type="video/webm" />
        <source src={`${base}.mp4`} type="video/mp4" />
      </video>
      {label}
    </>
  );
}
