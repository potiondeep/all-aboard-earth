import React, { useRef, useState } from "react";
import { T, LINKS, BOOKING_EMAIL } from "../theme.js";
import { SiteNav, SiteFooter, chromeCss, useLang, reducedMotion, useLoopVideo } from "./chrome.jsx";
import { bdCopy } from "./bookDemoCopy.js";

/* ============================================================
   ✈️ BOOK A PILOT DEMO — the one page every "Book a pilot demo" leads to
   ============================================================ */

/** The felt solar plane, looped. Loads only as it nears the viewport; a still for reduced motion. */
function SolarPlane({ alt }) {
  const ref = useRef(null);
  const [reduced] = useState(reducedMotion);
  const ready = useLoopVideo(ref, { reduced });
  return (
    <figure className="bd-plane" ref={ref}>
      {ready && !reduced ? (
        <video muted loop playsInline preload="auto" poster="/art/felt/felt-4-poster.webp"
               width="1280" height="536" aria-label={alt}>
          <source src="/art/felt/felt-4.webm" type="video/webm" />
          <source src="/art/felt/felt-4.mp4" type="video/mp4" />
        </video>
      ) : (
        <img src="/art/felt/felt-4-poster.webp" alt={alt} width="1280" height="536" decoding="async" />
      )}
    </figure>
  );
}

export default function BookDemo() {
  const [lang, setLang] = useLang();
  const c = bdCopy[lang];

  return (
    <div className="pg bd">
      <style>{chromeCss + `
        .bd-plane{ margin:clamp(26px,4vh,44px) auto 0; max-width:1100px; padding:0 clamp(16px,4vw,48px); }
        .bd-plane video, .bd-plane img{ width:100%; height:auto; aspect-ratio:1280/536; object-fit:cover; display:block;
          border-radius:20px; border:6px solid ${T.cream}; box-shadow:0 22px 50px #0009; transform:rotate(-.5deg); }

        .bd-points{ list-style:none; margin-top:clamp(24px,4vh,34px); display:grid; gap:14px; }
        @media (min-width:860px){ .bd-points{ grid-template-columns:repeat(3,1fr); } }
        .bd-points li{ background:#12385A; border:2px solid ${T.cream}1f; border-radius:16px; padding:20px 20px 22px; }
        .bd-points b{ display:block; font-size:18px; margin-bottom:6px; }
        .bd-points span{ font-size:15px; line-height:1.5; color:${T.cream}bb; }

        /* the booking block: the page's one action, so it gets the marigold */
        .bd-book{ background:${T.marigold}; color:${T.pineDeep}; border-radius:28px;
          padding:clamp(30px,5vw,56px); text-align:center; transform:rotate(.4deg); }
        .bd-book h2{ font-size:clamp(32px,4.8vw,58px); margin-bottom:12px; }
        .bd-book p{ font-size:18px; font-weight:500; max-width:620px; margin:0 auto 24px; }
        .bd-book .btn{ background:${T.pineDeep}; color:${T.cream}; }
        /* the address is the booking route, so on this page it is spelled out */
        .bd-mail{ display:block; margin-top:18px; font-family:'Space Mono', ui-monospace, monospace; font-size:13px;
          letter-spacing:.04em; color:${T.pineDeep}; }
        .bd-mail a{ color:inherit; text-decoration:none; border-bottom:1.5px solid ${T.pineDeep}66; padding-bottom:1px; }
        .bd-mail a:hover{ border-bottom-color:${T.pineDeep}; }

        @media (prefers-reduced-motion: reduce){
          .bd-plane video, .bd-plane img, .bd-book{ transform:none !important; }
        }
      `}</style>

      <SiteNav lang={lang} setLang={setLang} cta={c.nav_cta} ctaHref={LINKS.demoMail} />

      <main>
        <header className="pg-top">
          <h1 className="display">{c.title}</h1>
          <p className="pg-tagline">{c.tagline}</p>
        </header>

        <SolarPlane alt={c.plane_alt} />

        {/* what a demo looks like */}
        <section className="pg-wrap" aria-labelledby="bd-what">
          <div className="pg-label">{c.what_label}</div>
          <h2 id="bd-what" className="display pg-h2">{c.what_h}</h2>
          <ul className="bd-points">
            {c.what_points.map(([b, s]) => <li key={b}><b>{b}</b><span>{s}</span></li>)}
          </ul>
        </section>

        {/* who it's for */}
        <section className="pg-wrap" style={{ paddingTop: 0 }} aria-labelledby="bd-who">
          <div className="pg-label">{c.who_label}</div>
          <h2 id="bd-who" className="display pg-h2">{c.who_h}</h2>
          <p className="pg-lede">{c.who_p}</p>
        </section>

        {/* the booking itself */}
        <section className="pg-wrap" style={{ paddingTop: 0 }} aria-labelledby="bd-book">
          <div className="bd-book">
            <div className="pg-label" style={{ color: T.pineDeep }}>{c.book_label}</div>
            <h2 id="bd-book" className="display">{c.book_h}</h2>
            <p>{c.book_p}</p>
            <a className="btn big" href={LINKS.demoMail}>{c.cta_book}</a>
            <span className="bd-mail">
              {c.book_alt} <a href={LINKS.demoMail}>{BOOKING_EMAIL}</a>
            </span>
          </div>
        </section>
      </main>

      <SiteFooter footer={c.footer} give={c.give} />
    </div>
  );
}
