import React, { useRef, useState } from "react";
import { T, LINKS, BOOKING_EMAIL } from "../theme.js";
import { SiteNav, SiteFooter, chromeCss, useLang, reducedMotion, useLoopVideo } from "./chrome.jsx";
import { bdCopy } from "./contactCopy.js";

/* ============================================================
   ✈️ CONTACT — the one page every ask lands on: a pilot demo, a show,
   a commission. Each route carries its own mail subject so the inbox
   sorts itself; the page never asks anyone to choose a form.
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

/** One subject line per ask, so a full inbox still sorts itself. */
const MAIL = { demo: LINKS.demoMail, show: LINKS.bookingMail, art: LINKS.commissionMail };

export default function Contact() {
  const [lang, setLang] = useLang();
  const c = bdCopy[lang];

  return (
    <div className="pg ct">
      <style>{chromeCss + `
        .bd-plane{ margin:clamp(26px,4vh,44px) auto 0; max-width:1100px; padding:0 clamp(16px,4vw,48px); }
        .bd-plane video, .bd-plane img{ width:100%; height:auto; aspect-ratio:1280/536; object-fit:cover; display:block;
          border-radius:20px; border:6px solid ${T.cream}; box-shadow:0 22px 50px #0009; transform:rotate(-.5deg); }

        /* Three routes, side by side, each ending in its own button. The page
           makes nobody choose from a dropdown or fill a form to be read. */
        .ct-ways{ list-style:none; margin-top:clamp(24px,4vh,34px); display:grid; gap:16px; }
        @media (min-width:900px){ .ct-ways{ grid-template-columns:repeat(3,1fr); } }
        .ct-way{ display:flex; flex-direction:column; background:#12385A; border:2px solid ${T.cream}1f;
          border-top-width:7px; border-radius:18px; padding:clamp(20px,2.6vw,26px); }
        .ct-kicker{ font-family:'Space Mono', ui-monospace, monospace; font-size:11px; letter-spacing:.16em; }
        .ct-way h2{ font-size:clamp(25px,2.8vw,32px); margin:11px 0 10px; }
        .ct-way > p{ font-size:15.5px; line-height:1.5; color:${T.cream}c4; }
        .ct-send{ margin:16px 0 20px; padding-top:14px; border-top:1px dashed ${T.cream}2e;
          font-size:14px; line-height:1.45; color:${T.cream}a0; }
        .ct-way .btn{ margin-top:auto; align-self:flex-start; }

        /* anything that is none of the three */
        .ct-else{ background:${T.marigold}; color:${T.pineDeep}; border-radius:28px;
          padding:clamp(28px,4.5vw,48px); text-align:center; transform:rotate(.4deg); }
        .ct-else h2{ font-size:clamp(30px,4.2vw,50px); margin-bottom:12px; }
        .ct-else p{ font-size:17px; font-weight:500; max-width:600px; margin:0 auto 22px; }
        .ct-else .btn{ background:${T.pineDeep}; color:${T.cream}; }
        /* the address is the route, so on this page it is spelled out */
        .bd-mail{ display:block; margin-top:18px; font-family:'Space Mono', ui-monospace, monospace; font-size:13px;
          letter-spacing:.04em; color:${T.pineDeep}; }
        .bd-mail a{ color:inherit; text-decoration:none; border-bottom:1.5px solid ${T.pineDeep}66; padding-bottom:1px; }
        .bd-mail a:hover{ border-bottom-color:${T.pineDeep}; }

        @media (prefers-reduced-motion: reduce){
          .bd-plane video, .bd-plane img, .bd-book{ transform:none !important; }
        }
      `}</style>

      <SiteNav lang={lang} setLang={setLang} cta={c.nav_cta} ctaHref={LINKS.inquiryMail} />

      <main>
        <header className="pg-top">
          <h1 className="display">{c.title}</h1>
          <p className="pg-tagline">{c.tagline}</p>
        </header>

        <SolarPlane alt={c.plane_alt} />

        {/* the three routes */}
        <section className="pg-wrap" aria-labelledby="ct-ways">
          <div className="pg-label" id="ct-ways">{c.ways_label}</div>
          <ul className="ct-ways">
            {c.ways.map((w) => (
              <li key={w.key} className="ct-way" style={{ borderTopColor: T[w.hue] }}>
                <div className="ct-kicker" style={{ color: T[w.hue] }}>{w.kicker}</div>
                <h2 className="display">{w.h}</h2>
                <p>{w.p}</p>
                <p className="ct-send">{w.send}</p>
                <a className="btn" href={MAIL[w.key]}>{w.cta}</a>
              </li>
            ))}
          </ul>
        </section>

        {/* anything else */}
        <section className="pg-wrap" style={{ paddingTop: 0 }} aria-labelledby="ct-else">
          <div className="ct-else">
            <div className="pg-label" style={{ color: T.pineDeep }}>{c.else_label}</div>
            <h2 id="ct-else" className="display">{c.else_h}</h2>
            <p>{c.else_p}</p>
            <a className="btn big" href={LINKS.inquiryMail}>{c.else_cta}</a>
            <span className="bd-mail">
              {c.else_alt} <a href={LINKS.inquiryMail}>{BOOKING_EMAIL}</a>
            </span>
          </div>
        </section>
      </main>

      <SiteFooter footer={c.footer} give={c.give} />
    </div>
  );
}
