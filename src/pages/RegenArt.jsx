import React, { useRef, useState } from "react";
import { T, LINKS } from "../theme.js";
import { SiteNav, SiteFooter, chromeCss, useLang, reducedMotion, useLoopVideo } from "./chrome.jsx";
import { raCopy, MURAL_VIDEO_ID } from "./regenArtCopy.js";

/* ============================================================
   🎨 REGENERATIVE ART — murals · sculpture · reclaimed objects
   ============================================================ */

/** The mural film, on YouTube. The poster is ours and local, so nothing reaches
 *  YouTube until someone actually presses play. */
function MuralVideo({ label, title }) {
  const [on, setOn] = useState(false);
  return (
    <div className="ra-video">
      {on ? (
        <iframe src={`https://www.youtube-nocookie.com/embed/${MURAL_VIDEO_ID}?autoplay=1&rel=0`} title={title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen />
      ) : (
        <button className="ra-video-facade" onClick={() => setOn(true)} aria-label={label}>
          <img src="/art/regen-art/mural-video-poster.webp" alt="" width="1280" height="720" loading="lazy" decoding="async" />
          <span className="ra-play" aria-hidden="true">▶</span>
        </button>
      )}
    </div>
  );
}

function EcoHomeLoop({ caption }) {
  const ref = useRef(null);
  const [reduced] = useState(reducedMotion);
  const ready = useLoopVideo(ref, { reduced });   // it sits at the top, so this resolves immediately
  const sm = typeof window !== "undefined" && window.innerWidth * (window.devicePixelRatio || 1) <= 1100 ? "-sm" : "";
  return (
    <figure ref={ref}>
      {ready && !reduced ? (
        <video muted loop playsInline preload="auto" poster="/art/regen-art/eco-home-poster.webp" width="1280" height="572" aria-hidden="true">
          <source src={`/art/regen-art/eco-home${sm}.webm`} type="video/webm" />
          <source src={`/art/regen-art/eco-home${sm}.mp4`} type="video/mp4" />
        </video>
      ) : (
        <img src="/art/regen-art/eco-home-poster.webp" alt="" width="1280" height="572" loading="lazy" decoding="async" />
      )}
      <figcaption className="sr-only">{caption}</figcaption>
    </figure>
  );
}

const MURALS = ["mural-finished", "mural-1", "mural-2", "mural-3", "mural-4"];
const SCULPTURE = ["sculpture-1", "sculpture-2", "sculpture-3", "sculpture-4", "sculpture-5"];

export default function RegenArt() {
  const [lang, setLang] = useLang();
  const c = raCopy[lang];

  return (
    <div className="pg ra">
      <style>{chromeCss + `
        .ra-actions{ display:flex; flex-wrap:wrap; gap:12px; justify-content:center; margin-top:clamp(22px,3vh,30px); }
        .ra-hero-art{ max-width:1100px; margin:0 auto; padding:0 clamp(16px,4vw,48px); }
        .ra-hero-art img, .ra-hero-art video{ width:100%; height:auto; display:block; border-radius:20px; border:6px solid ${T.cream};
          box-shadow:0 22px 50px #0009; transform:rotate(.5deg); }
        .ra-hero-art figure{ margin:0; }

        .ra-split{ display:grid; gap:clamp(24px,4vw,52px); align-items:start; grid-template-columns:1fr; }
        @media (min-width:900px){ .ra-split{ grid-template-columns:1fr 1fr; } }
        .ra-points{ list-style:none; margin-top:24px; display:grid; gap:12px; }
        .ra-points li{ background:#12385A; border:2px solid ${T.cream}1f; border-radius:16px; padding:16px 18px; }
        .ra-points b{ display:block; font-size:17px; margin-bottom:4px; }
        .ra-points span{ font-size:15px; line-height:1.45; color:${T.cream}bb; }

        .ra-grid{ display:grid; gap:14px; grid-template-columns:1fr; margin-top:clamp(24px,4vh,36px); }
        @media (min-width:700px){ .ra-grid{ grid-template-columns:1fr 1fr; } }
        /* the installed wall runs the whole measure; the rest stay paired */
        .ra-grid .ra-wide{ grid-column:1 / -1; }
        .ra-grid figure{ margin:0; }
        .ra-grid img{ width:100%; height:auto; display:block; border-radius:16px; border:5px solid ${T.cream}; box-shadow:0 14px 32px #0008; }
        .ra-grid figcaption{ margin-top:9px; font-family:'Space Mono', ui-monospace, monospace; font-size:12px; color:${T.cream}99; letter-spacing:.06em; }
        .ra-grid figure:nth-child(odd) img{ transform:rotate(-.8deg); }
        .ra-grid figure:nth-child(even) img{ transform:rotate(.6deg); }

        .ra-video{ position:relative; margin-top:clamp(24px,4vh,36px); aspect-ratio:16/9; border-radius:20px; overflow:hidden;
          border:6px solid ${T.cream}; box-shadow:0 22px 50px #0009; background:#000; }
        .ra-video iframe, .ra-video-facade, .ra-video-facade img{ position:absolute; inset:0; width:100%; height:100%; border:0; display:block; }
        .ra-video iframe{ background:#000; }
        .ra-video-facade{ cursor:pointer; background:#000; padding:0; }
        .ra-video-facade img{ object-fit:cover; transition:transform .5s var(--ease-settle), filter .5s; }
        .ra-video-facade:hover img{ transform:scale(1.03); filter:brightness(.85); }
        .ra-play{ position:absolute; left:50%; top:50%; width:92px; height:92px; margin:-46px 0 0 -46px; border-radius:50%;
          background:${T.coral}; color:${T.pineDeep}; font-size:34px; display:grid; place-items:center; padding-left:6px; box-shadow:0 10px 30px #0008; }
        @media (max-width:560px){ .ra-play{ width:60px; height:60px; margin:-30px 0 0 -30px; font-size:22px; padding-left:4px; } .ra-video, .ra-hero-art img{ border-width:4px; } }


        .ra-cta{ text-align:center; background:${T.coral}; color:${T.ink}; border-radius:28px; padding:clamp(30px,5vw,56px); transform:rotate(.4deg); }
        .ra-cta h2{ font-size:clamp(32px,4.8vw,58px); margin-bottom:12px; }
        .ra-cta p{ font-size:18px; font-weight:500; margin-bottom:22px; max-width:640px; margin-left:auto; margin-right:auto; }
        .ra-cta .btn{ background:${T.pineDeep}; color:${T.cream}; }
        @media (prefers-reduced-motion: reduce){
          .ra-hero-art img, .ra-grid img, .ra-cta{ transform:none !important; }
          .ra-video-facade img{ transition:none !important; } .ra-video-facade:hover img{ transform:none !important; }
        }
      `}</style>

      <SiteNav lang={lang} setLang={setLang} cta={c.nav_cta} ctaHref={LINKS.commissionMail} />

      <main>
        <header className="pg-top">
          <h1 className="display">{c.title}</h1>
          <p className="pg-tagline">{c.tagline}</p>
          <div className="ra-actions">
            <a className="btn big" href={LINKS.commissionMail}>{c.cta_commission}</a>
          </div>
        </header>

        <div className="ra-hero-art">
          <EcoHomeLoop caption={c.felt_h} />
        </div>

        {/* MATERIALS */}
        <section className="pg-wrap" aria-labelledby="ra-materials">
          <div className="ra-split">
            <div>
              <div className="pg-label">{c.materials_label}</div>
              <h2 id="ra-materials" className="display pg-h2">{c.materials_h}</h2>
              <p className="pg-lede">{c.materials_p}</p>
            </div>
            <ul className="ra-points" style={{ marginTop: 0 }}>
              {c.materials_points.map(([b, s]) => <li key={b}><b>{b}</b><span>{s}</span></li>)}
            </ul>
          </div>
        </section>

        {/* MURAL PROJECT */}
        <section id="mural" className="pg-wrap" style={{ paddingTop: 0 }} aria-labelledby="ra-mural">
          <div className="pg-label">{c.mural_label}</div>
          <h2 id="ra-mural" className="display pg-h2">{c.mural_h}</h2>
          <p className="pg-lede">{c.mural_p}</p>
          <MuralVideo label={c.mural_video_play} title={c.mural_video_title} />
          <div className="ra-grid">
            {MURALS.map((n, i) => (
              <figure key={n} className={i === 0 ? "ra-wide" : undefined}>
                <img src={`/art/regen-art/${n}-1400.webp`} srcSet={`/art/regen-art/${n}-700.webp 700w, /art/regen-art/${n}-1400.webp 1400w`}
                     sizes={i === 0 ? "(max-width: 1100px) 100vw, 1000px" : "(max-width: 700px) 100vw, 530px"}
                     alt={c.mural_caps[i]} loading="lazy" decoding="async" />
                <figcaption>{c.mural_caps[i]}</figcaption>
              </figure>
            ))}
          </div>
        </section>

        {/* SCULPTURE */}
        <section className="pg-wrap" style={{ paddingTop: 0 }} aria-labelledby="ra-sculpture">
          <div className="pg-label">{c.sculpture_label}</div>
          <h2 id="ra-sculpture" className="display pg-h2">{c.sculpture_h}</h2>
          <p className="pg-lede">{c.sculpture_p}</p>
          <div className="ra-grid">
            {SCULPTURE.map((n, i) => (
              <figure key={n} className={i === 0 ? "ra-wide" : undefined}>
                <img src={`/art/regen-art/${n}-1400.webp`} srcSet={`/art/regen-art/${n}-700.webp 700w, /art/regen-art/${n}-1400.webp 1400w`}
                     sizes={i === 0 ? "(max-width: 1100px) 100vw, 1000px" : "(max-width: 700px) 100vw, 530px"}
                     alt={c.sculpture_caps[i]} loading="lazy" decoding="async" />
                <figcaption>{c.sculpture_caps[i]}</figcaption>
              </figure>
            ))}
          </div>
        </section>

        {/* SUSTAINABILITY ADVOCACY CAMPAIGNS */}
        <section className="pg-wrap" style={{ paddingTop: 0 }} aria-labelledby="ra-objects">
          <div className="pg-label">{c.objects_label}</div>
          <h2 id="ra-objects" className="sr-only">{c.objects_label}</h2>
          <div className="ra-grid" style={{ marginTop: 0 }}>
            <figure>
              <img src="/art/regen-art/recycle-honor-the-earth-1200.webp" srcSet="/art/regen-art/recycle-honor-the-earth-600.webp 600w, /art/regen-art/recycle-honor-the-earth-1200.webp 1200w"
                   sizes="(max-width: 700px) 100vw, 530px" alt="A recycling symbol built from bottles, cans and leaves" loading="lazy" decoding="async" />
              <figcaption>{c.objects_caps[0]}</figcaption>
            </figure>
            <figure>
              <img src="/art/regen-art/there-is-no-try-1000.webp" srcSet="/art/regen-art/there-is-no-try-600.webp 600w, /art/regen-art/there-is-no-try-1000.webp 1000w"
                   sizes="(max-width: 700px) 100vw, 530px" alt="Poster: Recycle. Or not. There is no try." loading="lazy" decoding="async" />
              <figcaption>{c.objects_caps[1]}</figcaption>
            </figure>
            <figure>
              <img src="/art/regen-art/yo-mama-1080.webp" srcSet="/art/regen-art/yo-mama-600.webp 600w, /art/regen-art/yo-mama-1080.webp 1080w"
                   sizes="(max-width: 700px) 100vw, 530px" alt="Campaign poster: Yo' mama is so bright — she electrifies the whole planet"
                   loading="lazy" decoding="async" width="1080" height="1080" />
              <figcaption>{c.objects_caps[2]}</figcaption>
            </figure>
            <figure>
              <img src="/art/regen-art/recycling-is-magic-1080.webp" srcSet="/art/regen-art/recycling-is-magic-600.webp 600w, /art/regen-art/recycling-is-magic-1080.webp 1080w"
                   sizes="(max-width: 700px) 100vw, 530px" alt="Campaign poster: a wizard stirring a cauldron of cans and bottles — Recycling is Magic"
                   loading="lazy" decoding="async" width="1080" height="1080" />
              <figcaption>{c.objects_caps[3]}</figcaption>
            </figure>
          </div>
        </section>

        <section className="pg-wrap" style={{ paddingTop: 0 }}>
          <div className="ra-cta">
            <h2 className="display">{c.cta_head}</h2>
            <p>{c.cta_sub}</p>
            <a className="btn big" href={LINKS.commissionMail}>{c.cta_commission}</a>
          </div>
        </section>
      </main>

      <SiteFooter footer={c.footer} give={c.give} />
    </div>
  );
}
