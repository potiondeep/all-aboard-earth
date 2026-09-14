import React, { useEffect, useRef, useState } from "react";

/**
 * A felt character animation standing in for a still.
 *
 *   mode="pingpong"  the clip is pre-baked forward-then-reversed; loops natively
 *   mode="fade"      the clip is forward only; over its last FADE seconds the
 *                    first frame fades in on top, then the clip restarts from
 *                    that same frame underneath and the overlay drops — no
 *                    reversed motion, no jump
 *
 * The poster is frame 0 in both modes. Nothing is fetched until the clip is
 * within ~900px of the viewport (a <video> would otherwise download its poster
 * at page load), it plays only while visible, and reduced motion gets the
 * poster alone. Sources: VP9 WebM first, H.264 MP4 for browsers without VP9.
 */
const FADE = 1.0;
const reducedMotion = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export default function FeltLoop({ name, dir = "tile", width, height, alt = "", className = "", mode = "pingpong" }) {
  const vidRef = useRef(null);
  const fadeRef = useRef(null);
  const [reduced] = useState(reducedMotion);
  const [near, setNear] = useState(false);
  const base = `/art/felt/${dir}/${name}`;
  const poster = `${base}-poster.webp`;

  useEffect(() => {
    const v = vidRef.current;
    if (!v || reduced) return;
    let visible = false;
    let raf = 0;
    let fading = false;

    const approach = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setNear(true); approach.disconnect(); }
    }, { rootMargin: "900px 0px" });
    approach.observe(v);

    // fade mode: watch for the tail of the clip only while it is on screen
    const watch = () => {
      raf = requestAnimationFrame(watch);
      if (!fading && v.duration && v.currentTime >= v.duration - FADE) {
        fading = true;
        fadeRef.current?.classList.add("on");
      }
    };
    const restart = () => {
      v.currentTime = 0;
      v.play().catch(() => {});
    };
    const settled = () => {
      if (!fading) return;
      // frame 0 is now showing underneath the identical overlay: drop it instantly
      requestAnimationFrame(() => { fadeRef.current?.classList.remove("on"); fading = false; });
    };
    if (mode === "fade") {
      v.addEventListener("ended", restart);
      v.addEventListener("seeked", settled);
    }

    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
      if (visible) {
        v.play().catch(() => {});
        if (mode === "fade" && !raf) raf = requestAnimationFrame(watch);
      } else {
        v.pause();
        cancelAnimationFrame(raf); raf = 0;
      }
    }, { threshold: 0.2 });
    io.observe(v);

    return () => {
      io.disconnect(); approach.disconnect(); cancelAnimationFrame(raf);
      v.removeEventListener("ended", restart);
      v.removeEventListener("seeked", settled);
    };
  }, [reduced, mode]);

  const label = alt ? <span className="sr-only">{alt}</span> : null;

  if (reduced) {
    return (
      <div className={`felt-loop ${className}`}>
        <img src={poster} alt={alt} width={width} height={height} loading="lazy" decoding="async" />
      </div>
    );
  }
  return (
    <div className={`felt-loop ${className}`}>
      <video
        ref={vidRef}
        poster={near ? poster : undefined}
        width={width}
        height={height}
        muted
        loop={mode === "pingpong"}
        playsInline
        preload="none"
        aria-hidden="true"
      >
        <source src={`${base}.webm`} type="video/webm" />
        <source src={`${base}.mp4`} type="video/mp4" />
      </video>
      {mode === "fade" && near && <img ref={fadeRef} className="felt-fade" src={poster} alt="" aria-hidden="true" />}
      {label}
    </div>
  );
}
