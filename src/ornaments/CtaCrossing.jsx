import React, { useEffect, useRef } from "react";
import Train from "./Train.jsx";

/**
 * 🚂 The CTA crossing, driven by scroll instead of a one-shot timer.
 *
 * Position maps to how far the strip has travelled up the viewport: fully off
 * the left edge when the strip enters at the bottom, fully off the right edge
 * once it reaches the top 15% — so scrolling down drives the train forward
 * and out of the band, and scrolling back up drives it back out the left.
 *
 * The train faces its direction of travel. It only turns around after ~24px
 * of scrolling the other way, so trackpad jitter can't spin it in place.
 * Stopped mid-scroll it keeps idling: rocking and puffing steam. While moving
 * it chugs. The track reveals up to the furthest point the train has reached.
 */
const TURN_AFTER = 24; // px of scroll in the new direction before turning round

const reducedMotion = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export default function CtaCrossing({ trackColor }) {
  const stripRef = useRef(null);
  const trainRef = useRef(null);
  const faceRef = useRef(null);
  const trackRef = useRef(null);

  useEffect(() => {
    if (reducedMotion()) return;
    const strip = stripRef.current, train = trainRef.current, face = faceRef.current, track = trackRef.current;
    if (!strip || !train || !face) return;

    let raf = 0, stop = 0, active = false;
    let lastY = window.scrollY, facing = 1, against = 0, furthest = 0;

    const place = () => {
      raf = 0;
      const r = strip.getBoundingClientRect();
      const vh = window.innerHeight;
      const p = Math.max(0, Math.min(1, (vh - r.top) / (vh * 0.85)));
      const tw = train.offsetWidth;
      const x = -tw + (r.width + tw) * p;
      train.style.transform = `translate3d(${x.toFixed(1)}px,0,0)`;
      furthest = Math.max(furthest, p);
      if (track) track.style.clipPath = `inset(0 ${((1 - furthest) * 100).toFixed(2)}% 0 0)`;
    };

    const onScroll = () => {
      if (!active) return;
      const y = window.scrollY;
      const dy = y - lastY;
      lastY = y;
      if (dy !== 0) {
        const dir = dy > 0 ? 1 : -1;
        if (dir !== facing) {
          against += Math.abs(dy);
          if (against >= TURN_AFTER) {
            facing = dir; against = 0;
            face.dataset.facing = String(facing);
            face.classList.toggle("is-reversed", facing < 0);
          }
        } else {
          against = 0;
        }
        train.classList.add("is-moving");
        clearTimeout(stop);
        stop = setTimeout(() => train.classList.remove("is-moving"), 150);
      }
      if (!raf) raf = requestAnimationFrame(place);
    };

    // only listen while the band is anywhere near the screen
    const io = new IntersectionObserver(([e]) => {
      active = e.isIntersecting;
      if (active) { lastY = window.scrollY; place(); }
    }, { rootMargin: "200px 0px" });
    io.observe(strip);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", place, { passive: true });
    place();

    return () => {
      io.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", place);
      cancelAnimationFrame(raf);
      clearTimeout(stop);
    };
  }, []);

  return (
    <div ref={stripRef} className="crossing" aria-hidden="true">
      <svg ref={trackRef} className="crossing-track" viewBox="0 0 1200 4" preserveAspectRatio="none">
        <line x1="0" y1="2" x2="1200" y2="2" stroke={trackColor} strokeOpacity=".45" strokeWidth="3" />
      </svg>
      <span ref={trainRef} className="cta-train">
        <span ref={faceRef} className="cta-face" data-facing="1">
          <Train variant="crossing" />
        </span>
      </span>
    </div>
  );
}
