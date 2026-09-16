import React, { useEffect, useRef, useState } from "react";
import { T, LINKS } from "../theme.js";
import { SiteNav, SiteFooter, chromeCss, useLang, reducedMotion, useLoopVideo } from "./chrome.jsx";
import { edCopy, EVENTS } from "./edutainmentCopy.js";

/* ============================================================
   🎤 ENVIRONMENTAL EDUTAINMENT — live performance + music production
   ============================================================ */

function Loop({ base, width, height, caption, className = "" }) {
  const ref = useRef(null);
  const [reduced] = useState(reducedMotion);
  const ready = useLoopVideo(ref, { reduced });
  return (
    <figure ref={ref} className={`ed-loop ${className}`}>
      {ready && !reduced ? (
        <video muted loop playsInline preload="auto" poster={`${base}-poster.webp`} width={width} height={height} aria-hidden="true">
          <source src={`${base}.webm`} type="video/webm" />
          <source src={`${base}.mp4`} type="video/mp4" />
        </video>
      ) : (
        <img src={`${base}-poster.webp`} alt="" width={width} height={height} loading="lazy" decoding="async" />
      )}
      <figcaption>{caption}</figcaption>
    </figure>
  );
}

/**
 * One event in the wall. Events with several photos/clips cycle every 2.8s and
 * stop on whatever frame the pointer (or keyboard focus) lands on; clicking (or
 * Enter/Space) steps to the next frame. Single-media events never move. Only
 * cycles while on screen; reduced motion holds frame one.
 */
function EventTile({ event, label }) {
  const ref = useRef(null);
  const [i, setI] = useState(0);
  const [hold, setHold] = useState(false);
  const [seen, setSeen] = useState(false);
  const [reduced] = useState(reducedMotion);
  const many = event.items.length > 1;
  const next = () => setI((n) => (n + 1) % event.items.length);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setSeen(e.isIntersecting), { rootMargin: "300px 0px" });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!many || reduced || hold || !seen) return;
    const t = setInterval(() => setI((n) => (n + 1) % event.items.length), 2800);
    return () => clearInterval(t);
  }, [many, reduced, hold, seen, event.items.length]);

  return (
    <figure
      ref={ref}
      className={"ed-tile" + (many ? " is-many" : "")}
      onMouseEnter={() => setHold(true)}
      onMouseLeave={() => setHold(false)}
      onFocus={() => setHold(true)}
      onBlur={() => setHold(false)}
      onClick={many ? next : undefined}
      onKeyDown={many ? (e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); next(); } } : undefined}
      tabIndex={many ? 0 : -1}
      role={many ? "button" : undefined}
      aria-label={many ? `${label} — ${event.items.length} photos, ${i + 1} showing. Click for the next.` : undefined}
    >
      {event.items.map(([kind, name, alt, w, pos], n) => {
        const on = n === i;
        if (kind === "video") {
          return (
            <span key={name} className={"ed-frame" + (on ? " on" : "")} aria-hidden={!on}>
              {seen && !reduced ? (
                <video muted loop playsInline preload="none" poster={`/art/edutainment/${name}-poster.webp`} style={pos ? { objectPosition: pos } : undefined}
                       ref={(v) => { if (v) (on ? v.play().catch(() => {}) : v.pause()); }}>
                  <source src={`/art/edutainment/${name}.webm`} type="video/webm" />
                  <source src={`/art/edutainment/${name}.mp4`} type="video/mp4" />
                </video>
              ) : (
                <img src={`/art/edutainment/${name}-poster.webp`} alt={alt} style={pos ? { objectPosition: pos } : undefined} loading="lazy" decoding="async" />
              )}
            </span>
          );
        }
        const big = w || 1400;
        return (
          <span key={name} className={"ed-frame" + (on ? " on" : "")} aria-hidden={!on}>
            <img src={`/art/edutainment/${name}-700.webp`}
                 srcSet={`/art/edutainment/${name}-700.webp 700w, /art/edutainment/${name}-${big}.webp ${big}w`}
                 sizes="(max-width: 700px) 50vw, (max-width: 1100px) 33vw, 260px"
                 alt={alt} style={pos ? { objectPosition: pos } : undefined} loading="lazy" decoding="async" />
          </span>
        );
      })}
      {many && <span className="ed-dots" aria-hidden="true">{event.items.map((_, n) => <i key={n} className={n === i ? "on" : ""} />)}</span>}
    </figure>
  );
}

export default function Edutainment() {
  const [lang, setLang] = useLang();
  const c = edCopy[lang];

  return (
    <div className="pg ed">
      <style>{chromeCss + `
        .ed-hero-art{ max-width:1100px; margin:0 auto; padding:0 clamp(16px,4vw,48px); }
        .ed-hero-art img{ width:100%; height:auto; aspect-ratio:16/9; object-fit:cover; object-position:50% 30%; display:block; border-radius:20px; border:6px solid ${T.cream};
          box-shadow:0 22px 50px #0009; transform:rotate(-.5deg); }
        .ed-actions{ display:flex; flex-wrap:wrap; gap:12px; justify-content:center; margin-top:clamp(22px,3vh,30px); }

        .ed-split{ display:grid; gap:clamp(24px,4vw,52px); align-items:start; grid-template-columns:1fr; }
        @media (min-width:900px){ .ed-split{ grid-template-columns:1.05fr .95fr; } }
        .ed-points{ list-style:none; margin-top:26px; display:grid; gap:12px; }
        .ed-points li{ background:#12301F; border:2px solid ${T.cream}1f; border-radius:16px; padding:16px 18px; }
        .ed-points b{ display:block; font-size:17px; margin-bottom:4px; }
        .ed-points span{ font-size:15px; line-height:1.45; color:${T.cream}bb; }

        .ed-loop{ margin:0; }
        .ed-loop video, .ed-loop img{ width:100%; height:auto; display:block; border-radius:18px; border:5px solid ${T.cream};
          box-shadow:0 16px 36px #0008; background:${T.pineDeep}; }
        .ed-loop figcaption{ margin-top:10px; font-family:'Space Mono', ui-monospace, monospace; font-size:12px; color:${T.cream}99; letter-spacing:.06em; }
        .ed-loop.tilt video, .ed-loop.tilt img{ transform:rotate(.8deg); }

        /* the wall: one tile per event, fixed shape so cycling never reflows */
        .ed-gallery{ display:grid; gap:12px; grid-template-columns:repeat(2,1fr); }
        @media (min-width:760px){ .ed-gallery{ grid-template-columns:repeat(3,1fr); } }
        @media (min-width:1100px){ .ed-gallery{ grid-template-columns:repeat(4,1fr); } }
        .ed-tile{ position:relative; margin:0; aspect-ratio:4/3; border-radius:12px; overflow:hidden;
          border:4px solid ${T.cream}; box-shadow:0 12px 26px #0007; background:${T.pineDeep}; }
        .ed-tile:nth-child(3n+1){ transform:rotate(-1.2deg); }
        .ed-tile:nth-child(3n+2){ transform:rotate(.9deg); }
        .ed-tile.is-many{ cursor:pointer; }
        .ed-tile:focus-visible{ outline:3px solid ${T.sky}; outline-offset:3px; }
        .ed-frame{ position:absolute; inset:0; opacity:0; transition:opacity .6s var(--ease-settle); }
        .ed-frame.on{ opacity:1; }
        .ed-frame img, .ed-frame video{ width:100%; height:100%; object-fit:cover; display:block; }
        .ed-dots{ position:absolute; left:0; right:0; bottom:6px; display:flex; gap:4px; justify-content:center; pointer-events:none; }
        .ed-dots i{ width:5px; height:5px; border-radius:50%; background:${T.cream}66; box-shadow:0 1px 2px #0008; }
        .ed-dots i.on{ background:${T.marigold}; }

        /* music section: the bullets on the left, the Earth boombox filling the space beside them */
        .ed-music{ display:grid; gap:clamp(22px,4vw,44px); align-items:start; grid-template-columns:1fr; }
        @media (min-width:900px){ .ed-music{ grid-template-columns:1.05fr .95fr; } }
        .ed-boombox{ margin:0; }
        .ed-boombox img{ width:100%; height:auto; display:block; border-radius:18px; border:5px solid ${T.cream}; box-shadow:0 16px 36px #0008; transform:rotate(.8deg); }
        .ed-boombox figcaption{ margin-top:10px; font-family:'Space Mono', ui-monospace, monospace; font-size:12px; color:${T.cream}99; letter-spacing:.06em; }

        /* closing CTA sits on the solar disco */
        .ed-cta{ position:relative; text-align:center; border-radius:28px; overflow:hidden; isolation:isolate;
          padding:clamp(48px,8vw,104px) clamp(22px,5vw,56px); transform:rotate(-.4deg); color:${T.cream}; }
        .ed-cta img{ position:absolute; inset:0; width:100%; height:100%; object-fit:cover; z-index:-2; }
        .ed-cta::after{ content:""; position:absolute; inset:0; z-index:-1;
          background:linear-gradient(180deg, ${T.pineDeep}b8, ${T.pineDeep}8c 45%, ${T.pineDeep}cc); }
        .ed-cta h2{ font-size:clamp(32px,4.8vw,58px); margin-bottom:12px; text-shadow:0 3px 22px ${T.pineDeep}; }
        .ed-cta p{ font-size:18px; font-weight:500; margin-bottom:22px; color:${T.cream}e6; text-shadow:0 2px 14px ${T.pineDeep}; }
        @media (prefers-reduced-motion: reduce){
          .ed-hero-art img, .ed-tile, .ed-cta, .ed-boombox img, .ed-loop.tilt video, .ed-loop.tilt img{ transform:none !important; }
          .ed-frame{ transition:none !important; }
        }
      `}</style>

      <SiteNav lang={lang} setLang={setLang} cta={c.nav_cta} />

      <main>
        <header className="pg-top">
          <h1 className="display">{c.title}</h1>
          <p className="pg-tagline">{c.tagline}</p>
          <div className="ed-actions">
            <a className="btn big" href={LINKS.booking}>{c.cta_book}</a>
            <a className="btn big ghost" href={LINKS.grooves}>{c.cta_listen}</a>
          </div>
        </header>

        <div className="ed-hero-art">
          <img src="/art/earth-bus-1600.webp" srcSet="/art/earth-bus-800.webp 800w, /art/earth-bus-1600.webp 1600w"
               sizes="(max-width: 1100px) 100vw, 1100px" alt={c.bus_alt} width="1600" height="951" fetchPriority="high" decoding="async" />
        </div>

        {/* LIVE PERFORMANCE */}
        <section className="pg-wrap" aria-labelledby="ed-live">
          <div className="ed-split">
            <div>
              <div className="pg-label">{c.live_label}</div>
              <h2 id="ed-live" className="display pg-h2">{c.live_h}</h2>
              <p className="pg-lede">{c.live_p}</p>
              <ul className="ed-points">
                {c.live_points.map(([b, s]) => <li key={b}><b>{b}</b><span>{s}</span></li>)}
              </ul>
            </div>
            <Loop base="/art/edutainment/solardance" width="480" height="854" caption={c.solar_cap} className="tilt" />
          </div>
        </section>

        {/* STAGE GALLERY */}
        <section className="pg-wrap" style={{ paddingTop: 0 }} aria-labelledby="ed-stage">
          <div className="pg-label">{c.gallery_label}</div>
          <h2 id="ed-stage" className="sr-only">{c.gallery_label}</h2>
          <div className="ed-gallery">
            {EVENTS.map((ev) => <EventTile key={ev.id} event={ev} label={ev.label} />)}
          </div>
          <p className="ed-cap">{c.gallery_cap}</p>
        </section>

        {/* MUSIC PRODUCTION */}
        <section className="pg-wrap" style={{ paddingTop: 0 }} aria-labelledby="ed-music">
          <div className="pg-label">{c.music_label}</div>
          <h2 id="ed-music" className="display pg-h2">{c.music_h}</h2>
          <p className="pg-lede">{c.music_p}</p>
          <div className="ed-music">
            <ul className="ed-points" style={{ marginTop: 0 }}>
              {c.music_points.map(([b, s]) => <li key={b}><b>{b}</b><span>{s}</span></li>)}
            </ul>
            <figure className="ed-boombox">
              <img src="/art/edutainment/earth-boombox-1200.webp" srcSet="/art/edutainment/earth-boombox-600.webp 600w, /art/edutainment/earth-boombox-1200.webp 1200w"
                   sizes="(max-width: 900px) 100vw, 480px" alt="A boombox overgrown with living plants" loading="lazy" decoding="async" />
              <figcaption>{c.boombox_cap}</figcaption>
            </figure>
          </div>
        </section>

        <section className="pg-wrap" style={{ paddingTop: 0 }}>
          <div className="ed-cta">
            <img src="/art/edutainment/solar-disco-1200.webp" srcSet="/art/edutainment/solar-disco-600.webp 600w, /art/edutainment/solar-disco-1200.webp 1200w"
                 sizes="(max-width: 1100px) 100vw, 1000px" alt="" aria-hidden="true" loading="lazy" decoding="async" />
            <h2 className="display">{c.cta_head}</h2>
            <p>{c.cta_sub}</p>
            <a className="btn big" href={LINKS.booking}>{c.cta_book}</a>
          </div>
        </section>
      </main>

      <SiteFooter footer={c.footer} give={c.give} />
    </div>
  );
}
