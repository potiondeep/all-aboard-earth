import React, { useEffect, useRef, useState } from "react";
import { T, LINKS, SPOTIFY_ARTIST_ID } from "../theme.js";
import { SiteNav, SiteFooter, chromeCss, useLang, reducedMotion } from "./chrome.jsx";
import { edCopy, EVENTS } from "./edutainmentCopy.js";

/* ============================================================
   🎤 ENVIRONMENTAL EDUTAINMENT — live performance + music production
   ============================================================ */

/** YouTube facade: thumbnail and play button; the player only loads on click. */
function NewsVideo({ id, label, title, poster }) {
  const [on, setOn] = useState(false);
  return (
    <div className="ed-news">
      {on ? (
        <iframe src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`} title={title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen />
      ) : (
        <button className="ed-news-facade" onClick={() => setOn(true)} aria-label={label}>
          <img src={poster} alt="" width="1280" height="720" loading="lazy" decoding="async" />
          <span className="ed-play" aria-hidden="true">▶</span>
        </button>
      )}
    </div>
  );
}

/**
 * One event in the wall. Events with several photos/clips cycle every 2.8s and
 * stop on whatever frame the pointer (or keyboard focus) lands on; the arrows
 * beside the dots step through the group by hand. Clicking the frame opens it
 * large. Single-media events never move. Only cycles while on screen; reduced
 * motion holds frame one.
 */
function EventTile({ event, label, copy, onOpen }) {
  const ref = useRef(null);
  const [i, setI] = useState(0);
  const [hold, setHold] = useState(false);
  const [seen, setSeen] = useState(false);
  const [reduced] = useState(reducedMotion);
  const many = event.items.length > 1;
  const len = event.items.length;
  const step = (d) => setI((n) => (n + d + len) % len);

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
      className="ed-tile"
      onMouseEnter={() => setHold(true)}
      onMouseLeave={() => setHold(false)}
      onFocus={() => setHold(true)}
      onBlur={() => setHold(false)}
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
      <button
        className="ed-open"
        onClick={() => onOpen(event, i, label)}
        aria-label={many ? `${label} — ${len} frames, ${i + 1} showing. ${copy.lb_open}` : `${label}. ${copy.lb_open}`}
      />
      {many && (
        <span className="ed-dots">
          <button className="ed-arrow" onClick={(e) => { e.stopPropagation(); step(-1); }} aria-label={`${label} — ${copy.lb_prev}`}>‹</button>
          <span className="ed-pips" aria-hidden="true">{event.items.map((_, n) => <i key={n} className={n === i ? "on" : ""} />)}</span>
          <button className="ed-arrow" onClick={(e) => { e.stopPropagation(); step(1); }} aria-label={`${label} — ${copy.lb_next}`}>›</button>
        </span>
      )}
    </figure>
  );
}

/**
 * One frame, popped out large. Leaves on Escape, on the backdrop, or on close;
 * arrow keys and the side buttons walk a group. Locks the page behind it and
 * hands focus to close, so a keyboard never falls through to the page.
 */
function Lightbox({ event, index, label, copy, onClose }) {
  const [i, setI] = useState(index);
  const closeRef = useRef(null);
  const len = event.items.length;
  const many = len > 1;
  const step = (d) => setI((n) => (n + d + len) % len);

  useEffect(() => { closeRef.current?.focus(); }, []);
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
      else if (many && e.key === "ArrowRight") setI((n) => (n + 1) % len);
      else if (many && e.key === "ArrowLeft") setI((n) => (n - 1 + len) % len);
    };
    document.addEventListener("keydown", onKey);
    const held = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.removeEventListener("keydown", onKey); document.body.style.overflow = held; };
  }, [many, len, onClose]);

  const [kind, name, alt, w] = event.items[i];
  const big = w || 1400;
  return (
    <div className="ed-lb" role="dialog" aria-modal="true" aria-label={label} onClick={onClose}>
      <div className="ed-lb-stage" onClick={(e) => e.stopPropagation()}>
        {kind === "video" ? (
          <video key={name} className="ed-lb-media" autoPlay muted loop playsInline controls poster={`/art/edutainment/${name}-poster.webp`}>
            <source src={`/art/edutainment/${name}.webm`} type="video/webm" />
            <source src={`/art/edutainment/${name}.mp4`} type="video/mp4" />
          </video>
        ) : (
          <img key={name} className="ed-lb-media" src={`/art/edutainment/${name}-${big}.webp`} alt={alt} />
        )}
        <p className="ed-lb-cap mono">{alt}{many ? ` · ${i + 1}/${len}` : ""}</p>
        {many && (
          <>
            <button className="ed-lb-nav prev" onClick={() => step(-1)} aria-label={copy.lb_prev}>‹</button>
            <button className="ed-lb-nav next" onClick={() => step(1)} aria-label={copy.lb_next}>›</button>
          </>
        )}
      </div>
      <button ref={closeRef} className="ed-lb-close" onClick={onClose} aria-label={copy.lb_close}>✕</button>
    </div>
  );
}

export default function Edutainment() {
  const [lang, setLang] = useLang();
  const c = edCopy[lang];
  const [lb, setLb] = useState(null);   // { event, index, label } while a frame is open

  return (
    <div className="pg ed">
      <style>{chromeCss + `
        .ed-hero-art{ max-width:1100px; margin:0 auto; padding:0 clamp(16px,4vw,48px); }
        .ed-hero-art img{ width:100%; height:auto; aspect-ratio:16/9; object-fit:cover; object-position:50% 30%; display:block; border-radius:20px; border:6px solid ${T.cream};
          box-shadow:0 22px 50px #0009; transform:rotate(-.5deg); }
        .ed-actions{ display:flex; flex-wrap:wrap; gap:12px; justify-content:center; margin-top:clamp(22px,3vh,30px); }

        /* the live-performance headline runs the full width */
        .ed-live-h{ font-size:clamp(38px,6.4vw,84px); margin-bottom:18px; }
        .ed-live-p{ max-width:900px; font-size:clamp(17px,1.9vw,20px); }
        .ed-news-label{ margin:clamp(30px,5vh,48px) 0 14px; }
        .ed-news{ position:relative; aspect-ratio:16/9; max-width:1000px; border-radius:20px; overflow:hidden;
          border:6px solid ${T.cream}; box-shadow:0 22px 50px #0009; background:#000; transform:rotate(-.4deg); }
        .ed-news iframe, .ed-news-facade, .ed-news-facade img{ position:absolute; inset:0; width:100%; height:100%; border:0; display:block; }
        .ed-news-facade{ cursor:pointer; background:#000; padding:0; }
        .ed-news-facade img{ object-fit:cover; transition:transform .5s var(--ease-settle), filter .5s; }
        .ed-news-facade:hover img{ transform:scale(1.03); filter:brightness(.85); }
        .ed-play{ position:absolute; left:50%; top:50%; width:92px; height:92px; margin:-46px 0 0 -46px; border-radius:50%;
          background:${T.coral}; color:${T.pineDeep}; font-size:34px; display:grid; place-items:center; padding-left:6px; box-shadow:0 10px 30px #0008; }
        @media (max-width:560px){ .ed-play{ width:60px; height:60px; margin:-30px 0 0 -30px; font-size:22px; padding-left:4px; } .ed-news{ border-width:4px; } }
        .ed-points{ list-style:none; margin-top:26px; display:grid; gap:12px; }
        .ed-points li{ background:#12385A; border:2px solid ${T.cream}1f; border-radius:16px; padding:16px 18px; }
        .ed-points b{ display:block; font-size:17px; margin-bottom:4px; }
        .ed-points span{ font-size:15px; line-height:1.45; color:${T.cream}bb; }


        /* the wall: one tile per event, fixed shape so cycling never reflows */
        .ed-gallery{ display:grid; gap:12px; grid-template-columns:repeat(2,1fr); }
        @media (min-width:760px){ .ed-gallery{ grid-template-columns:repeat(3,1fr); } }
        @media (min-width:1100px){ .ed-gallery{ grid-template-columns:repeat(4,1fr); } }
        .ed-tile{ position:relative; margin:0; aspect-ratio:4/3; border-radius:12px; overflow:hidden;
          border:4px solid ${T.cream}; box-shadow:0 12px 26px #0007; background:${T.pineDeep}; }
        .ed-tile:nth-child(3n+1){ transform:rotate(-1.2deg); }
        .ed-tile:nth-child(3n+2){ transform:rotate(.9deg); }
        /* the opener covers the media; the arrows sit above it and take their own clicks */
        .ed-open{ position:absolute; inset:0; z-index:1; border:0; padding:0; background:none; cursor:zoom-in; }
        .ed-open:focus-visible{ outline:3px solid ${T.sky}; outline-offset:-3px; }
        .ed-frame{ position:absolute; inset:0; opacity:0; transition:opacity .6s var(--ease-settle); }
        .ed-frame.on{ opacity:1; }
        .ed-frame img, .ed-frame video{ width:100%; height:100%; object-fit:cover; display:block; }
        .ed-dots{ position:absolute; left:0; right:0; bottom:6px; z-index:2;
          display:flex; gap:8px; justify-content:center; align-items:center; pointer-events:none; }
        .ed-pips{ display:flex; gap:4px; align-items:center; }
        .ed-dots i{ width:5px; height:5px; border-radius:50%; background:${T.cream}66; box-shadow:0 1px 2px #0008; }
        .ed-dots i.on{ background:${T.marigold}; }
        .ed-arrow{ pointer-events:auto; width:22px; height:22px; padding:0 0 2px; border-radius:50%;
          border:1.5px solid ${T.cream}55; background:${T.pineDeep}bb; color:${T.cream};
          font-size:14px; line-height:1; display:grid; place-items:center; cursor:pointer;
          transition:background .2s, color .2s, border-color .2s; }
        .ed-arrow:hover{ background:${T.marigold}; color:${T.pineDeep}; border-color:${T.marigold}; }
        .ed-arrow:focus-visible{ outline:3px solid ${T.sky}; outline-offset:2px; }

        /* a frame popped out large */
        .ed-lb{ position:fixed; inset:0; z-index:100; background:${T.pineDeep}f2;
          display:grid; place-items:center; padding:clamp(16px,4vw,48px); animation:ed-lb-in .2s ease both; }
        @keyframes ed-lb-in{ from{ opacity:0; } to{ opacity:1; } }
        .ed-lb-stage{ position:relative; display:flex; flex-direction:column; align-items:center; gap:10px; max-width:min(1100px,100%); }
        .ed-lb-media{ display:block; max-width:100%; max-height:calc(100vh - 160px); width:auto; height:auto;
          object-fit:contain; border-radius:14px; border:4px solid ${T.cream}; box-shadow:0 26px 60px #000a; background:#000; }
        .ed-lb-cap{ color:${T.cream}bb; font-size:12px; letter-spacing:.06em; text-align:center; max-width:64ch; }
        .ed-lb-close, .ed-lb-nav{ border-radius:50%; border:2px solid ${T.cream}44; background:${T.pineDeep}dd;
          color:${T.cream}; cursor:pointer; display:grid; place-items:center; transition:background .2s, border-color .2s; }
        .ed-lb-close:hover, .ed-lb-nav:hover{ background:${T.marigold}; color:${T.pineDeep}; border-color:${T.marigold}; }
        .ed-lb-close{ position:absolute; top:clamp(10px,2.5vw,24px); right:clamp(10px,2.5vw,24px); width:44px; height:44px; font-size:17px; }
        .ed-lb-nav{ position:absolute; top:calc(50% - 22px); width:46px; height:46px; font-size:26px; padding-bottom:4px; }
        .ed-lb-nav.prev{ left:-10px; } .ed-lb-nav.next{ right:-10px; }
        @media (max-width:640px){ .ed-lb-nav.prev{ left:4px; } .ed-lb-nav.next{ right:4px; } }
        @media (prefers-reduced-motion: reduce){ .ed-lb{ animation:none; } }

        /* music section: the bullets on the left, the Earth boombox filling the space beside them */
        .ed-music{ display:grid; gap:clamp(22px,4vw,44px); align-items:start; grid-template-columns:1fr; }
        .ed-music > ul{ grid-column:1; }
        @media (min-width:900px){ .ed-music > .ed-scene{ grid-column:2; grid-row:1; align-self:stretch; } }
        @media (min-width:900px){ .ed-music{ grid-template-columns:1.05fr .95fr; } }
        /* listen and watch, side by side: the compact player plus the channel */
        .ed-listen{ display:grid; gap:14px; grid-template-columns:1fr; align-items:stretch; max-width:900px; }
        @media (min-width:760px){ .ed-listen{ grid-template-columns:minmax(0,1fr) minmax(0,310px); } }
        .ed-spotify{ display:block; width:100%; height:152px; border:0; border-radius:14px; }
        .ed-yt{ display:flex; align-items:center; gap:14px; height:152px; padding:16px; border-radius:14px;
          background:#12385A; border:2px solid ${T.cream}1f; color:${T.cream}; text-decoration:none;
          transition:transform .3s var(--ease-settle), border-color .3s; }
        .ed-yt:hover{ transform:translateY(-3px); border-color:${T.marigold}66; }
        .ed-yt img{ width:84px; height:84px; border-radius:50%; flex:none; display:block; }
        .ed-yt b{ display:block; font-size:16px; line-height:1.25; margin-bottom:5px; }
        .ed-yt .handle{ display:block; font-family:'Space Mono', ui-monospace, monospace; font-size:12px;
          letter-spacing:.06em; color:${T.cream}99; margin-bottom:9px; }
        .ed-yt .go{ font-size:13px; color:${T.marigold}; }
        /* Cutouts standing on the page rather than framed photographs: the crew
           sets the height, and the boombox sits lower and in front of them, so it
           reads as being on the ground in the same scene. */
        /* Both stand on the page as cutouts rather than framed photographs. The
           crew holds the right column; the boombox fills the space the bullets
           leave under them on the left. */
        .ed-scene{ margin:0; }
        .ed-scene-crew{ display:block; width:92%; max-width:440px; height:auto; margin:0 auto;
          filter:drop-shadow(0 18px 26px rgba(0,0,0,.42)); }
        /* One rig holds both: the locomotive on the floor, the crew rising out
           of its boiler with their crop line hidden behind it. Everything inside
           is sized and placed off the rig's own width, so the two keep the same
           relationship at every screen width — a crew anchored to the column
           instead drifts out from behind the train as the column reflows and
           shows the cut. The rig's aspect ratio is the stack's full height,
           locomotive plus the part of the crew standing above it. */
        .ed-rig{ position:relative; width:100%; max-width:460px; margin:clamp(14px,3vh,26px) auto 0;
          aspect-ratio:1 / .961; pointer-events:none; }
        .ed-scene-crew{ position:absolute; right:2%; bottom:32.6%; width:79%; height:auto; z-index:2;
          filter:drop-shadow(0 18px 26px rgba(0,0,0,.42)); }
        .ed-train{ position:absolute; right:0; bottom:0; width:100%; height:auto; z-index:3;
          transform:scaleX(-1); filter:drop-shadow(0 16px 22px rgba(0,0,0,.40)); }
        /* Wide, the rig hangs off the bottom-right of the column. That column is
           a grid item stretched to the row, and the row is set by the bullet
           list beside it — so the wheels land exactly on the last bullet. */
        @media (min-width:900px){
          .ed-scene{ position:relative; min-height:300px; }
          .ed-rig{ position:absolute; right:-6%; bottom:0; width:104%; max-width:none; margin:0; }
        }

        /* closing CTA sits on the solar disco */
        .ed-cta{ position:relative; text-align:center; border-radius:28px; overflow:hidden; isolation:isolate;
          padding:clamp(48px,8vw,104px) clamp(22px,5vw,56px); transform:rotate(-.4deg); color:${T.cream}; }
        .ed-cta img{ position:absolute; inset:0; width:100%; height:100%; object-fit:cover; z-index:-2; }
        /* Lighter than it was: the old art was busy edge to edge and needed heavy
           cover for the type. This one is built with a quiet middle, so the scrim
           only has to seat the text — the dancers keep their neon. */
        .ed-cta::after{ content:""; position:absolute; inset:0; z-index:-1;
          background:linear-gradient(180deg, ${T.pineDeep}8c, ${T.pineDeep}4d 45%, ${T.pineDeep}a3); }
        .ed-cta h2{ font-size:clamp(32px,4.8vw,58px); margin-bottom:12px; text-shadow:0 3px 22px ${T.pineDeep}; }
        .ed-cta p{ font-size:18px; font-weight:500; margin-bottom:22px; color:${T.cream}e6; text-shadow:0 2px 14px ${T.pineDeep}; }
        @media (prefers-reduced-motion: reduce){
          .ed-hero-art img, .ed-tile, .ed-cta, .ed-news{ transform:none !important; }
          .ed-news-facade img{ transition:none !important; } .ed-news-facade:hover img{ transform:none !important; }
          .ed-frame{ transition:none !important; }
        }
      `}</style>

      <SiteNav lang={lang} setLang={setLang} cta={c.nav_cta} ctaHref={LINKS.bookingMail} />

      <main>
        <header className="pg-top">
          <h1 className="display">{c.title}</h1>
          <p className="pg-tagline">{c.tagline}</p>
          <div className="ed-actions">
            <a className="btn big" href={LINKS.bookingMail}>{c.cta_book}</a>
            <a className="btn big ghost" href={LINKS.spotify}>{c.cta_listen}</a>
          </div>
        </header>

        <div className="ed-hero-art">
          <img src="/art/earth-bus-1600.webp" srcSet="/art/earth-bus-800.webp 800w, /art/earth-bus-1600.webp 1600w"
               sizes="(max-width: 1100px) 100vw, 1100px" alt={c.bus_alt} width="1600" height="951" fetchPriority="high" decoding="async" />
        </div>

        {/* LIVE PERFORMANCE */}
        <section className="pg-wrap" aria-labelledby="ed-live">
          <div className="pg-label">{c.live_label}</div>
          <h2 id="ed-live" className="display ed-live-h">{c.live_h}</h2>
          <p className="pg-lede ed-live-p">{c.live_p}</p>
          <div className="pg-label ed-news-label">{c.news_label}</div>
          <NewsVideo id="JjrR9mBG1kI" label={c.news_play} title={c.news_title} poster="/art/edutainment/news-video.webp" />
        </section>

        {/* STAGE GALLERY */}
        <section className="pg-wrap" style={{ paddingTop: 0 }} aria-labelledby="ed-stage">
          <div className="pg-label">{c.gallery_label}</div>
          <h2 id="ed-stage" className="sr-only">{c.gallery_label}</h2>
          <div className="ed-gallery">
            {EVENTS.map((ev) => (
              <EventTile key={ev.id} event={ev} label={ev.label} copy={c}
                         onOpen={(event, index, label) => setLb({ event, index, label })} />
            ))}
          </div>
          <p className="ed-cap">{c.gallery_cap}</p>
        </section>

        {/* MUSIC PRODUCTION */}
        <section className="pg-wrap" style={{ paddingTop: 0 }} aria-labelledby="ed-music">
          <div className="pg-label">{c.music_label}</div>
          <h2 id="ed-music" className="display pg-h2">{c.music_h}</h2>
          <p className="pg-lede">{c.music_p}</p>
          <div className="ed-music">
            <ul className="ed-points" style={{ marginTop: "clamp(26px,4vh,44px)" }}>
              {/* the live show sits in the same run of bubbles; booking is one
                  screen below on the closing CTA, so it needs no button here */}
              {[...c.music_points, c.booking_point].map(([b, s]) => <li key={b}><b>{b}</b><span>{s}</span></li>)}
            </ul>
            <figure className="ed-scene">
              <div className="ed-rig">
              <img className="ed-scene-crew" src="/art/edutainment/crew-cutout-800.webp"
                   srcSet="/art/edutainment/crew-cutout-400.webp 400w, /art/edutainment/crew-cutout-800.webp 800w"
                   sizes="(max-width: 900px) 74vw, 430px" alt={c.crew_alt}
                   width="800" height="656" loading="lazy" decoding="async" />
              <img className="ed-train" src="/art/edutainment/steam-train-1200.webp"
                   srcSet="/art/edutainment/steam-train-600.webp 600w, /art/edutainment/steam-train-1200.webp 1200w"
                   sizes="(max-width: 900px) 92vw, 430px" alt=""
                   width="1200" height="938" loading="lazy" decoding="async" />
              </div>
            </figure>
          </div>
        </section>

        {/* LISTEN — the artist page itself. Lazy, so a below-the-fold third-party
            frame costs nothing at load, and a fixed height so it can't shift. */}
        <section className="pg-wrap" style={{ paddingTop: 0 }} aria-labelledby="ed-listen">
          <div className="pg-label">{c.listen_label}</div>
          <h2 id="ed-listen" className="sr-only">{c.listen_label}</h2>
          <div className="ed-listen">
            <iframe
              className="ed-spotify"
              src={`https://open.spotify.com/embed/artist/${SPOTIFY_ARTIST_ID}?utm_source=generator&theme=0`}
              title={c.spotify_title}
              height="152"
              loading="lazy"
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            />
            {/* a channel has no embeddable player of its own, so this is a card to it */}
            <a className="ed-yt" href={LINKS.youtube} target="_blank" rel="noopener noreferrer">
              <img src="/art/edutainment/youtube-avatar.webp" alt="" width="300" height="300" loading="lazy" decoding="async" />
              <span>
                <b>{c.yt_title}</b>
                <span className="handle">@allaboardearth</span>
                <span className="go">{c.yt_go}</span>
              </span>
            </a>
          </div>
        </section>

        <section className="pg-wrap" style={{ paddingTop: 0 }}>
          <div className="ed-cta">
            <img src="/art/edutainment/solar-disco-1200.webp" srcSet="/art/edutainment/solar-disco-600.webp 600w, /art/edutainment/solar-disco-1200.webp 1200w, /art/edutainment/solar-disco-1800.webp 1800w"
                 sizes="(max-width: 1100px) 100vw, 1000px" alt="" aria-hidden="true" loading="lazy" decoding="async" />
            <h2 className="display">{c.cta_head}</h2>
            <p>{c.cta_sub}</p>
            <a className="btn big" href={LINKS.bookingMail}>{c.cta_book}</a>
          </div>
        </section>
      </main>

      {lb && <Lightbox event={lb.event} index={lb.index} label={lb.label} copy={c} onClose={() => setLb(null)} />}

      <SiteFooter footer={c.footer} give={c.give} />
    </div>
  );
}
