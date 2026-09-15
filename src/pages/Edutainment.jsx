import React, { useRef, useState } from "react";
import { T, LINKS } from "../theme.js";
import { SiteNav, SiteFooter, chromeCss, useLang, reducedMotion, useLoopVideo } from "./chrome.jsx";
import { edCopy, STAGE } from "./edutainmentCopy.js";

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

        /* stage gallery — a wall of photographs */
        .ed-gallery{ columns:2; column-gap:12px; }
        @media (min-width:760px){ .ed-gallery{ columns:3; } }
        @media (min-width:1100px){ .ed-gallery{ columns:4; } }
        .ed-gallery figure{ break-inside:avoid; margin:0 0 12px; }
        .ed-gallery img{ width:100%; height:auto; display:block; border-radius:12px; border:4px solid ${T.cream}; box-shadow:0 12px 26px #0007; }
        .ed-gallery figure:nth-child(3n+1) img{ transform:rotate(-1.2deg); }
        .ed-gallery figure:nth-child(3n+2) img{ transform:rotate(.9deg); }
        .ed-cap{ margin-top:14px; font-family:'Space Mono', ui-monospace, monospace; font-size:12px; color:${T.cream}99; letter-spacing:.06em; text-align:center; }

        .ed-media-row{ display:grid; gap:clamp(18px,3vw,28px); grid-template-columns:1fr; margin-top:clamp(28px,4vh,40px); }
        @media (min-width:760px){ .ed-media-row{ grid-template-columns:1fr 1fr; } }
        .ed-media-row img{ width:100%; height:auto; display:block; border-radius:18px; border:5px solid ${T.cream}; box-shadow:0 16px 36px #0008; }
        .ed-media-row figure{ margin:0; }
        .ed-media-row figcaption{ margin-top:10px; font-family:'Space Mono', ui-monospace, monospace; font-size:12px; color:${T.cream}99; letter-spacing:.06em; }

        .ed-cta{ text-align:center; background:${T.marigold}; color:${T.pineDeep}; border-radius:28px; padding:clamp(30px,5vw,56px); transform:rotate(-.4deg); }
        .ed-cta h2{ font-size:clamp(32px,4.8vw,58px); margin-bottom:12px; }
        .ed-cta p{ font-size:18px; font-weight:500; margin-bottom:22px; }
        .ed-cta .btn{ background:${T.pineDeep}; color:${T.cream}; }
        @media (prefers-reduced-motion: reduce){
          .ed-hero-art img, .ed-gallery img, .ed-cta, .ed-loop.tilt video, .ed-loop.tilt img{ transform:none !important; }
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
          <img src="/art/edutainment/stage-3-1400.webp" srcSet="/art/edutainment/stage-3-700.webp 700w, /art/edutainment/stage-3-1400.webp 1400w"
               sizes="(max-width: 1100px) 100vw, 1100px" alt={STAGE[0][1]} width="1400" height="1050" fetchPriority="high" decoding="async" />
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
            <Loop base="/art/edutainment/march" width="480" height="638" caption={c.march_cap} className="tilt" />
          </div>
        </section>

        {/* STAGE GALLERY */}
        <section className="pg-wrap" style={{ paddingTop: 0 }} aria-labelledby="ed-stage">
          <div className="pg-label">{c.gallery_label}</div>
          <h2 id="ed-stage" className="sr-only">{c.gallery_label}</h2>
          <div className="ed-gallery">
            {STAGE.slice(1).map(([name, alt]) => (
              <figure key={name}>
                <img src={`/art/edutainment/${name}-700.webp`}
                     srcSet={`/art/edutainment/${name}-700.webp 700w, /art/edutainment/${name}-1400.webp 1400w`}
                     sizes="(max-width: 760px) 50vw, (max-width: 1100px) 33vw, 260px"
                     alt={alt} loading="lazy" decoding="async" />
              </figure>
            ))}
          </div>
          <p className="ed-cap">{c.gallery_cap}</p>
        </section>

        {/* MUSIC PRODUCTION */}
        <section className="pg-wrap" style={{ paddingTop: 0 }} aria-labelledby="ed-music">
          <div className="pg-label">{c.music_label}</div>
          <h2 id="ed-music" className="display pg-h2">{c.music_h}</h2>
          <p className="pg-lede">{c.music_p}</p>
          <ul className="ed-points" style={{ maxWidth: 680 }}>
            {c.music_points.map(([b, s]) => <li key={b}><b>{b}</b><span>{s}</span></li>)}
          </ul>
          <div className="ed-media-row">
            <figure>
              <img src="/art/edutainment/earth-boombox-1200.webp" srcSet="/art/edutainment/earth-boombox-600.webp 600w, /art/edutainment/earth-boombox-1200.webp 1200w"
                   sizes="(max-width: 760px) 100vw, 530px" alt="A boombox overgrown with living plants" loading="lazy" decoding="async" />
              <figcaption>{c.boombox_cap}</figcaption>
            </figure>
            <figure>
              <img src="/art/edutainment/solar-disco-1200.webp" srcSet="/art/edutainment/solar-disco-600.webp 600w, /art/edutainment/solar-disco-1200.webp 1200w"
                   sizes="(max-width: 760px) 100vw, 530px" alt="Dancers on a neon grid dance floor" loading="lazy" decoding="async" />
              <figcaption>{c.disco_cap}</figcaption>
            </figure>
          </div>
        </section>

        <section className="pg-wrap" style={{ paddingTop: 0 }}>
          <div className="ed-cta">
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
