import React, { useEffect, useRef, useState } from "react";
import { T, LINKS } from "../theme.js";
import { ccCopy } from "./coolCareersCopy.js";
import { PageMenu, menuCss } from "./chrome.jsx";
import { THEMES, DECK_PLATES } from "./coolCareersDeck.js";
import { cardArtSm, cardSrcSet, DECK_CARD } from "../wixCardArt.js";

/* ============================================================
   🌱 COOL CAREERS — program overview · music video · game portal
   ============================================================ */

const YT_ID = "G1IOqfjphIw"; // "Cool Careers" music video, All Aboard Earth on YouTube (as embedded on the Wix page)

const reducedMotion = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/**
 * The felt solar eagle, keyed to real alpha so it sits on the page rather than
 * in a box. HEVC first for Safari, VP9 (alpha_mode=1) for everyone else.
 *
 * Re-keyed 2026-09-29 off the white studio master. The head is cream and the
 * solar panel has white highlights, so a threshold on whiteness eats them —
 * only the background is connected to the frame border, so the key floods in
 * from the edge instead and never reaches interior cream. Loose tuft fibres
 * survived as islands floating beside the head (invisible on white, debris on
 * blue), so only the component joined to the bird is kept. 12px of transparent
 * padding too: the old frames ran flush to the bottom edge.
 *
 * eagle-plain.* is that white master. Nothing renders it, but it is the only
 * unkeyed copy of this clip — there is no Desktop original — so it stays as
 * what a re-key would start from.
 */
function Eagle({ label }) {
  const ref = useRef(null);
  const [ready, setReady] = useState(false);
  const [reduced] = useState(reducedMotion);
  useEffect(() => {
    const el = ref.current;
    if (reduced || !el) return;
    const near = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setReady(true); near.disconnect(); } }, { rootMargin: "600px 0px" });
    near.observe(el);
    const play = new IntersectionObserver(([e]) => { const v = el.querySelector("video"); if (v) e.isIntersecting ? v.play().catch(() => {}) : v.pause(); }, { threshold: 0.2 });
    play.observe(el);
    return () => { near.disconnect(); play.disconnect(); };
  }, [reduced]);

  // the observer above can fire before the <video> exists, so start it on mount too
  useEffect(() => {
    if (!ready) return;
    ref.current?.querySelector("video")?.play().catch(() => {});
  }, [ready]);
  return (
    <div ref={ref} className="cc-eagle" role="img" aria-label={label}>
      {ready ? (
        <video muted loop playsInline preload="auto" poster="/art/cool-careers/eagle-poster.webp" width="584" height="570" aria-hidden="true">
          <source src="/art/cool-careers/eagle-hevc.mov" type="video/quicktime" />
          <source src="/art/cool-careers/eagle.webm" type="video/webm" />
        </video>
      ) : (
        <img src="/art/cool-careers/eagle-poster.webp" alt="" width="584" height="570" loading="lazy" decoding="async" />
      )}
    </div>
  );
}

/** Felt electric school buses charging — the hero backdrop. Poster first, clip after load. */
function BusLoop({ caption }) {
  const vidRef = useRef(null);
  const [ready, setReady] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [reduced] = useState(reducedMotion);
  const figRef = useRef(null);
  // the frame is at most 760 css px wide: the 960px encode covers it unless the screen is dense
  const sm = typeof window !== "undefined" && Math.min(760, window.innerWidth) * (window.devicePixelRatio || 1) > 1000 ? "" : "-sm";
  const base = "/art/cool-careers/electric-buses";

  // near the bottom of the page: fetch nothing until it's approached
  useEffect(() => {
    const el = figRef.current;
    if (reduced || !el) return;
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setReady(true); io.disconnect(); } }, { rootMargin: "600px 0px" });
    io.observe(el);
    return () => io.disconnect();
  }, [reduced]);

  useEffect(() => {
    const v = vidRef.current;
    if (!ready || !v) return;
    const io = new IntersectionObserver(([e]) => (e.isIntersecting ? v.play().catch(() => {}) : v.pause()), { threshold: 0.1 });
    io.observe(v);
    return () => io.disconnect();
  }, [ready]);

  return (
    <figure ref={figRef} className="cc-buses" aria-label={caption}>
      <img className="cc-buses-media" src={`${base}${sm}-poster.webp`} alt="" width="1600" height="896" loading="lazy" decoding="async" />
      {ready && (
        <video ref={vidRef} className={"cc-buses-media cc-buses-vid" + (playing ? " on" : "")} muted loop playsInline preload="auto"
               aria-hidden="true" onPlaying={() => setPlaying(true)}>
          <source src={`${base}${sm}.webm`} type="video/webm" />
          <source src={`${base}${sm}.mp4`} type="video/mp4" />
        </video>
      )}
      <figcaption className="cc-sr">{caption}</figcaption>
    </figure>
  );
}

/** YouTube facade: a thumbnail and play button; the player only loads on click. */
function MusicVideo({ label, title }) {
  const [on, setOn] = useState(false);
  return (
    <div className="cc-video">
      {on ? (
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${YT_ID}?autoplay=1&rel=0`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        />
      ) : (
        <button className="cc-video-facade" onClick={() => setOn(true)} aria-label={label}>
          <img src="/art/cool-careers/cool-careers-video.webp" alt="" width="1280" height="720" fetchPriority="high" decoding="async" />
          <span className="cc-play" aria-hidden="true">▶</span>
        </button>
      )}
    </div>
  );
}

/**
 * The illustrated cards for one line, then the rest of that line as chips.
 * Every card and every chip opens the Deck Explorer on that slug — the deck is
 * the product, so the page should never be a dead end in front of it.
 */
function CardRow({ cards, more, open, tint }) {
  const drawn = cards.filter((k) => k.art);
  const rest = cards.filter((k) => !k.art);
  return (
    <>
      {drawn.length > 0 && (
        <ul className="cc-cards">
          {drawn.map((k) => (
            <li key={k.slug}>
              <a href={DECK_CARD(k.slug)} title={`${k.name} — ${open}`} style={{ borderColor: tint + "66" }}>
                <img src={cardArtSm(k.slug)} srcSet={cardSrcSet(k.slug)}
                     sizes="(max-width: 620px) 26vw, (max-width: 1000px) 17vw, 130px"
                     alt={k.name} width="300" height="420" loading="lazy" decoding="async" />
              </a>
            </li>
          ))}
        </ul>
      )}
      {rest.length > 0 && (
        <>
          <p className="cc-more">{more}</p>
          <div className="cc-chips">
            {rest.map((k) => (
              <a key={k.slug} className="cc-chip" href={DECK_CARD(k.slug)}>{k.name}</a>
            ))}
          </div>
        </>
      )}
    </>
  );
}

export default function CoolCareers() {
  const [lang, setLang] = useState(() => {
    try { return localStorage.getItem("aae-lang") === "es" ? "es" : "en"; } catch { return "en"; }
  });
  const c = ccCopy[lang];
  const hue = (h) => (h ? T[h] : undefined);

  useEffect(() => {
    document.documentElement.lang = lang;
    try { localStorage.setItem("aae-lang", lang); } catch {}
  }, [lang]);

  return (
    <div className="cc-page">
      <style>{menuCss + `
        * { margin:0; padding:0; box-sizing:border-box; }
        html, body { background:${T.pine}; }
        .cc-page{
          --ease-settle: cubic-bezier(.22, 1, .36, 1);
          /* cyanotype paper: the tone, with the fibre texture blended into it —
             the same ground the other four pages stand on */
          background:${T.pine} url('/art/paper-cyanotype.webp') repeat top center / 1400px auto;
          background-blend-mode:soft-light;
          color:${T.cream}; font-family:'Bricolage Grotesque', system-ui, sans-serif;
          min-height:100vh; overflow-x:hidden; -webkit-font-smoothing:antialiased;
        }
        .display{ font-family:'Anton', Impact, sans-serif; text-transform:uppercase; letter-spacing:.01em; line-height:.95; font-weight:400; }
        .mono{ font-family:'Space Mono', ui-monospace, monospace; }
        .cc-sr{ position:absolute; width:1px; height:1px; overflow:hidden; clip:rect(0 0 0 0); white-space:nowrap; }
        a{ color:inherit; }

        /* nav — same as the homepage, transparent over the hero */
        .cc-nav{ position:absolute; top:0; left:0; right:0; z-index:20; display:flex; align-items:center; justify-content:space-between; gap:12px;
          padding:20px clamp(16px,4vw,48px); }
        .brand{ font-family:'Anton'; font-size:18px; letter-spacing:.06em; text-decoration:none; color:${T.cream}; white-space:nowrap; }
        .brand b{ color:${T.marigold}; font-weight:400; }
        .navr{ display:flex; gap:12px; align-items:center; }
        .lang{ display:flex; border:2px solid ${T.cream}44; border-radius:999px; overflow:hidden; }
        .lang button{ background:none; border:none; color:${T.cream}; font-family:'Space Mono'; font-size:12px; padding:6px 12px; cursor:pointer; }
        .lang button.on{ background:${T.marigold}; color:${T.pineDeep}; font-weight:700; }
        .btn{ display:inline-block; background:${T.coral}; color:${T.ink}; border:none; border-radius:999px; padding:12px 22px;
          font-family:'Bricolage Grotesque'; font-weight:700; font-size:15px; cursor:pointer; text-decoration:none;
          transition:transform .2s var(--ease-settle), box-shadow .2s var(--ease-settle); }
        .btn:hover{ transform:translateY(-3px) rotate(-1deg); box-shadow:0 10px 24px ${T.coral}55; }
        .btn.big{ padding:17px 30px; font-size:17px; }
        .btn.ghost{ background:transparent; color:${T.cream}; border:2px solid ${T.cream}66; }
        .btn.ghost:hover{ border-color:${T.marigold}; color:${T.marigold}; box-shadow:none; }
        .btn:focus-visible, .lang button:focus-visible, .cc-video-facade:focus-visible{ outline:3px solid ${T.sky}; outline-offset:3px; }
        @media (max-width:560px){ .brand{ font-size:15px; } .navr .btn{ display:none; } }

        /* top — title, tagline, the music video */
        .cc-top{ background:radial-gradient(120% 80% at 50% 0%, #12385A 0%, ${T.pine} 62%); text-align:center;
          padding:calc(clamp(84px,11vh,112px) + 12px) clamp(16px,4vw,48px) clamp(40px,6vh,64px); }
        .cc-top h1{ font-size:clamp(52px,9vw,120px); color:${T.cream}; }
        .cc-tagline{ margin:10px auto clamp(24px,4vh,36px); font-family:'Space Mono', ui-monospace, monospace; font-size:clamp(13px,1.6vw,17px);
          letter-spacing:.16em; text-transform:uppercase; color:${T.marigold}; }

        /* headline + game portal */
        .cc-hero{ text-align:center; max-width:1100px; margin:0 auto; padding:clamp(28px,5vh,56px) clamp(16px,4vw,48px) clamp(56px,9vh,96px); }
        .cc-hero h2{ font-size:clamp(40px,7vw,96px); color:${T.cream}; }
        .cc-hero h2 span{ display:block; color:${T.marigold}; }
        .cc-band{ margin:24px auto 26px; max-width:760px; background:${T.pineDeep}; border:2px solid ${T.cream}22; border-radius:16px;
          padding:14px 20px; font-size:clamp(16px,1.8vw,20px); font-weight:600; line-height:1.4; }
        .cc-band b{ font-weight:800; }
        .cc-actions{ display:flex; flex-wrap:wrap; gap:12px; justify-content:center; }

        /* the felt buses, framed small by the closing CTA — stretched full-bleed they show their seams */
        .cc-buses{ position:relative; width:min(760px, 100%); aspect-ratio:16/9;
          margin:clamp(72px,10vh,132px) auto clamp(26px,4vh,36px); overflow:hidden;
          border:6px solid ${T.cream}; border-radius:18px; box-shadow:0 18px 40px #0008; transform:rotate(.6deg); background:${T.pineDeep}; }
        .cc-buses-media{ position:absolute; inset:0; width:100%; height:100%; object-fit:cover; display:block; }
        .cc-buses-vid{ opacity:0; }
        .cc-buses-vid.on{ opacity:1; }

        /* overview — the one-pager. It was a cream island; now it sits on the
           same blue as everything else and its cards match the dark panels. */
        .cc-paper{ background:transparent; color:${T.cream}; }
        .cc-wrap{ max-width:1100px; margin:0 auto; padding:clamp(56px,9vh,100px) clamp(16px,4vw,48px); }
        .cc-label{ font-size:12px; letter-spacing:.22em; color:${T.marigold}; margin-bottom:14px; }
        .cc-why{ display:grid; gap:14px; grid-template-columns:1fr; }
        @media (min-width:860px){ .cc-why{ grid-template-columns:repeat(3,1fr); } }
        /* Side by side the cards stretch to the tallest, so the source line
           goes to the floor of each rather than trailing its own text. */
        .cc-why .cc-stat{ margin-bottom:0; align-content:space-between; }
        .cc-card{ background:${T.pineDeep}; border:2px solid ${T.cream}22; border-radius:18px; }
        .cc-stat{ padding:18px 20px 14px; margin-bottom:14px; display:grid; grid-template-columns:auto 1fr; column-gap:16px; align-items:start; }
        .cc-stat .n{ font-family:'Anton'; font-size:clamp(46px,5.4vw,64px); line-height:.9; white-space:nowrap; }
        .cc-stat p{ font-weight:700; font-size:16px; line-height:1.3; padding-top:6px; }
        .cc-stat small{ grid-column:1 / -1; margin-top:10px; font-family:'Space Mono'; font-size:11px; color:${T.cream}80; }
        .cc-foot{ font-family:'Anton'; text-transform:none; font-size:clamp(20px,2.2vw,24px); letter-spacing:.01em; margin-top:8px; }
        .cc-district{ margin-top:clamp(32px,5vh,48px); border:2px solid ${T.leaf}66; border-radius:18px; background:${T.pineDeep}; padding:22px clamp(18px,3vw,30px); }
        .cc-district ul{ list-style:none; display:grid; gap:10px 34px; grid-template-columns:1fr; }
        @media (min-width:800px){ .cc-district ul{ grid-template-columns:1fr 1fr; } }
        .cc-district li{ position:relative; padding-left:26px; font-size:15px; line-height:1.4; }
        .cc-district li::before{ content:"✓"; position:absolute; left:0; top:0; color:${T.leaf}; font-weight:800; }
        .cc-pilot{ margin-top:clamp(28px,4vh,40px); padding-top:24px; border-top:2px dashed ${T.cream}33; }
        .cc-pilot p{ font-weight:800; font-size:clamp(17px,2vw,21px); }
        .cc-pilot p span{ color:${T.marigold}; }

        /* music video */
        .cc-video{ position:relative; max-width:960px; margin:0 auto; aspect-ratio:16/9; border-radius:20px; overflow:hidden;
          border:6px solid ${T.cream}; box-shadow:0 22px 50px #0009; background:#000; transform:rotate(-.6deg); }
        .cc-video iframe, .cc-video-facade, .cc-video-facade img{ position:absolute; inset:0; width:100%; height:100%; border:0; display:block; }
        .cc-video-facade{ cursor:pointer; background:#000; padding:0; }
        .cc-video-facade img{ object-fit:cover; transition:transform .5s var(--ease-settle), filter .5s; }
        .cc-video-facade:hover img{ transform:scale(1.03); filter:brightness(.85); }
        .cc-play{ position:absolute; left:50%; top:50%; width:92px; height:92px; margin:-46px 0 0 -46px; border-radius:50%;
          background:${T.coral}; color:${T.pineDeep}; font-size:34px; display:grid; place-items:center; padding-left:6px;
          box-shadow:0 10px 30px #0008; transition:transform .25s var(--ease-settle); }
        .cc-video-facade:hover .cc-play{ transform:scale(1.08); }
        @media (max-width:560px){ .cc-play{ width:60px; height:60px; margin:-30px 0 0 -30px; font-size:22px; padding-left:4px; } .cc-video, .cc-buses{ border-width:4px; } }

        /* The way in: what the portal looks like, then the button. The shot is
           inert to the keyboard — the button beside it goes to the same place,
           so a second stop on the same target is just noise. */
        .cc-way-in{ flex:0 1 540px; min-width:0; }
        .cc-portal-shot{ display:block; line-height:0; border-radius:16px; overflow:hidden;
          border:5px solid ${T.cream}; box-shadow:0 18px 40px #00000059; transform:rotate(-.6deg);
          transition:transform .25s var(--ease-settle); }
        .cc-portal-shot:hover{ transform:rotate(-.6deg) translateY(-4px); }
        .cc-portal-shot img{ display:block; width:100%; height:auto; }
        /* Full width of the shot above it, so the pair reads as one way in
           rather than a picture with a button loose beside it. */
        .cc-portal-open{ display:block; width:100%; text-align:center;
          margin-top:clamp(20px,3vh,28px); font-size:clamp(17px,1.9vw,21px);
          padding:clamp(17px,2.4vh,22px) clamp(20px,3vw,32px); }
        /* the solar eagle fills the open space beside the standards heading */
        .cc-pipeline-row{ display:flex; align-items:center; justify-content:space-between; gap:clamp(16px,3vw,40px);
          flex-wrap:wrap; margin:clamp(40px,6vh,64px) 0 clamp(34px,5vh,52px); }
        .cc-eagle{ flex:none; width:clamp(130px,21vw,265px); line-height:0; margin-bottom:-6px; }
        /* Once the row wraps there is no "opposite" left, so both halves centre. */
        @media (max-width:760px){ .cc-pipeline-row{ justify-content:center; } }
        /* Real alpha, so no edge to melt — just a shadow to seat it on the page. */
        .cc-eagle video, .cc-eagle img{ width:100%; height:auto; display:block;
          filter:drop-shadow(0 14px 22px rgba(0,0,0,.42)); }
        @media (max-width:560px){ .cc-eagle{ width:130px; } }

        /* ---------- the dark sections between the hero and the one-pager ----------
           The page's cream "paper" carries the school-facing document; everything
           about the game and the deck sits on the cyanotype ground instead,
           because that is where the card illustrations have any contrast. */
        .cc-dlabel{ font-family:'Space Mono', ui-monospace, monospace; font-size:12px; letter-spacing:.22em; color:${T.marigold}; margin-bottom:14px; }
        .cc-dh{ font-size:clamp(32px,4.6vw,58px); margin-bottom:14px; }
        .cc-dlede{ font-size:18px; line-height:1.5; color:${T.cream}cc; max-width:720px; }
        .cc-panel{ background:${T.pineDeep}; border:2px solid ${T.cream}22; border-radius:18px; }

        /* the deck, counted out */
        .cc-deck{ display:grid; gap:12px; grid-template-columns:repeat(2,1fr); margin-top:clamp(22px,3vh,32px); }
        @media (min-width:760px){ .cc-deck{ grid-template-columns:repeat(3,1fr); } }
        .cc-deck > div{ background:${T.pineDeep}; border:2px solid ${T.cream}22; border-radius:16px; padding:18px clamp(14px,2vw,20px); }
        .cc-deck .n{ font-family:'Anton'; font-size:clamp(34px,4vw,48px); line-height:.9; }
        .cc-deck b{ display:block; font-family:'Space Mono', ui-monospace, monospace; font-size:11.5px; letter-spacing:.14em;
          text-transform:uppercase; color:${T.cream}; margin:10px 0 9px; }
        .cc-deck p{ font-size:14px; line-height:1.42; color:${T.cream}aa; }

        /* the four lines */
        .cc-lines{ display:grid; gap:clamp(18px,2.6vw,26px); margin-top:clamp(26px,4vh,42px); }
        .cc-line{ background:${T.pineDeep}; border:2px solid ${T.cream}22; border-left-width:7px; border-radius:18px;
          padding:clamp(20px,3vw,30px); }
        .cc-line-head{ display:flex; align-items:baseline; gap:clamp(12px,2vw,20px); flex-wrap:wrap; }
        .cc-line-n{ font-family:'Anton'; font-size:clamp(38px,4.6vw,58px); line-height:.85; }
        .cc-line h3{ font-family:'Anton', Impact, sans-serif; text-transform:uppercase; font-weight:400; letter-spacing:.01em;
          font-size:clamp(23px,2.9vw,34px); line-height:1; }
        .cc-line-blurb{ margin-top:12px; font-size:16.5px; line-height:1.45; color:${T.cream}d0; max-width:660px; }
        .cc-cards{ list-style:none; display:grid; gap:10px; grid-template-columns:repeat(3,1fr); margin:clamp(18px,2.6vw,24px) 0 16px; }
        @media (min-width:620px){ .cc-cards{ grid-template-columns:repeat(5,1fr); } }
        @media (min-width:1000px){ .cc-cards{ grid-template-columns:repeat(7,1fr); } }
        .cc-cards a{ display:block; line-height:0; border-radius:10px; overflow:hidden; border:2px solid ${T.cream}2e;
          transition:transform .2s var(--ease-settle), border-color .2s var(--ease-settle); }
        .cc-cards a:hover{ transform:translateY(-5px) rotate(-1.2deg); }
        .cc-cards img{ display:block; width:100%; height:auto; }
        .cc-more{ font-family:'Space Mono', ui-monospace, monospace; font-size:11.5px; letter-spacing:.14em; text-transform:uppercase;
          color:${T.cream}88; margin-bottom:10px; }
        .cc-chips{ display:flex; flex-wrap:wrap; gap:8px; }
        .cc-chip{ font-family:'Space Mono', ui-monospace, monospace; font-size:12px; letter-spacing:.03em; text-decoration:none;
          border:1.5px solid ${T.cream}33; border-radius:999px; padding:7px 13px; color:${T.cream}cc;
          transition:border-color .18s var(--ease-settle), color .18s var(--ease-settle); }
        .cc-line-curric{ margin-top:18px; padding-top:15px; border-top:1px dashed ${T.cream}2e;
          font-size:14.5px; line-height:1.5; color:${T.cream}a6; }

        /* the curriculum — the teacher deck shown, then what a station holds
           as a plain list, because the plates already carry the weight */
        .cc-plates{ display:grid; gap:10px; grid-template-columns:repeat(2,1fr); margin:clamp(24px,3.5vh,36px) 0 0; }
        @media (min-width:820px){ .cc-plates{ grid-template-columns:repeat(4,1fr); } }
        .cc-plates img{ display:block; width:100%; height:auto; border-radius:10px; border:2px solid ${T.cream}2e; }
        .cc-plates figcaption{ grid-column:1 / -1; margin-top:4px; font-family:'Space Mono', ui-monospace, monospace;
          font-size:11.5px; letter-spacing:.06em; color:${T.cream}88; }
        .cc-kit{ list-style:none; display:flex; flex-wrap:wrap; gap:8px; margin-top:16px; }
        .cc-kit li{ font-family:'Space Mono', ui-monospace, monospace; font-size:12px; letter-spacing:.03em;
          border:1.5px solid ${T.marigold}55; border-radius:999px; padding:7px 13px; color:${T.cream}d0; }
        .cc-tiers{ display:grid; gap:12px; grid-template-columns:1fr; margin-top:18px; }
        @media (min-width:760px){ .cc-tiers{ grid-template-columns:repeat(3,1fr); } }
        .cc-tier{ display:flex; gap:16px; align-items:flex-start; background:${T.pineDeep}; border:2px solid ${T.sky}44;
          border-radius:14px; padding:16px 18px; }
        .cc-tier b{ font-family:'Anton'; font-weight:400; font-size:clamp(22px,2.4vw,28px); color:${T.sky}; line-height:1; white-space:nowrap; }
        .cc-tier span{ font-size:14px; line-height:1.4; color:${T.cream}bb; }

        /* the green line */
        .cc-stops{ list-style:none; display:flex; flex-wrap:wrap; gap:0; align-items:center;
          margin:clamp(24px,3.5vh,36px) 0 clamp(26px,4vh,40px); }
        .cc-stops li{ display:flex; align-items:center; gap:10px; }
        .cc-stops span{ display:flex; align-items:center; gap:9px; font-family:'Space Mono', ui-monospace, monospace;
          font-size:12.5px; letter-spacing:.04em; color:${T.cream}d0; padding:7px 0; }
        .cc-stops i{ width:11px; height:11px; border-radius:50%; background:${T.leaf}; box-shadow:0 0 0 3px ${T.leaf}33; }
        .cc-stops em{ width:clamp(14px,2.4vw,34px); height:3px; background:${T.leaf}66; margin:0 10px; border-radius:2px; }
        .cc-gl{ display:grid; gap:clamp(18px,3vw,30px); grid-template-columns:1fr; }
        @media (min-width:900px){ .cc-gl{ grid-template-columns:1fr 1fr; } }
        .cc-gl h3{ font-family:'Anton'; font-weight:400; text-transform:uppercase; font-size:clamp(19px,2.1vw,24px); margin-bottom:14px; color:${T.leaf}; }
        .cc-dict{ list-style:none; display:grid; gap:1px; background:${T.cream}1c; border:2px solid ${T.cream}22; border-radius:14px; overflow:hidden; }
        .cc-dict li{ display:grid; grid-template-columns:1fr 1.25fr; gap:14px; background:${T.pineDeep}; padding:12px 16px; font-size:14px; line-height:1.4; }
        .cc-dict b{ font-weight:700; color:${T.cream}; }
        .cc-dict span{ color:${T.cream}a8; }
        .cc-rides{ list-style:none; display:grid; gap:10px; }
        .cc-rides li{ background:${T.pineDeep}; border:2px solid ${T.leaf}44; border-radius:14px; padding:14px 16px; }
        .cc-rides b{ display:block; font-size:15.5px; margin-bottom:4px; color:${T.leaf}; }
        .cc-rides span{ font-size:14px; line-height:1.42; color:${T.cream}a8; }
        .cc-gl-foot{ margin-top:clamp(22px,3vh,32px); padding:16px 20px; border-left:4px solid ${T.leaf};
          background:${T.pineDeep}; border-radius:0 14px 14px 0; font-size:15.5px; line-height:1.5; color:${T.cream}c4; }

        /* from spark to paycheck */
        .cc-path{ display:grid; gap:12px; grid-template-columns:1fr; margin-top:clamp(26px,4vh,42px); }
        @media (min-width:900px){ .cc-path{ grid-template-columns:repeat(4,1fr); } }
        .cc-stage{ background:${T.pineDeep}; border:2px solid ${T.cream}22; border-top-width:6px; border-radius:16px; padding:18px clamp(15px,2vw,20px); }
        .cc-stage .n{ font-family:'Space Mono', ui-monospace, monospace; font-size:12px; letter-spacing:.2em; }
        .cc-stage h3{ font-family:'Anton'; font-weight:400; text-transform:uppercase; font-size:clamp(20px,2.3vw,26px); margin:8px 0 9px; }
        .cc-stage p{ font-size:14.5px; line-height:1.45; color:${T.cream}aa; }
        .cc-nums{ display:grid; gap:12px; grid-template-columns:repeat(2,1fr); margin-top:clamp(20px,3vh,28px); }
        @media (min-width:880px){ .cc-nums{ grid-template-columns:repeat(4,1fr); } }
        .cc-num{ border:2px solid ${T.cream}22; border-radius:16px; padding:18px clamp(14px,2vw,20px); background:${T.pineDeep}; }
        .cc-num .n{ font-family:'Anton'; font-size:clamp(38px,4.4vw,54px); line-height:.9; color:${T.marigold}; }
        .cc-num b{ display:block; font-family:'Space Mono', ui-monospace, monospace; font-size:11.5px; letter-spacing:.14em;
          text-transform:uppercase; margin:9px 0 8px; }
        .cc-num span{ font-size:13.5px; line-height:1.4; color:${T.cream}a0; }
        .cc-path-foot{ margin-top:16px; font-family:'Space Mono', ui-monospace, monospace; font-size:12px; color:${T.cream}88; }

        /* standards — inside the paper one-pager, so these are ink on cream */
        .cc-std{ display:grid; gap:14px; grid-template-columns:1fr; margin-top:6px; }
        @media (min-width:900px){ .cc-std{ grid-template-columns:repeat(3,1fr); } }
        .cc-std > div{ background:${T.pineDeep}; border:2px solid ${T.cream}22; border-top-width:7px; border-radius:18px;
          padding:20px clamp(16px,2.2vw,22px); }
        .cc-std h3{ font-family:'Anton'; font-weight:400; text-transform:uppercase; font-size:clamp(21px,2.3vw,26px); margin-bottom:11px; }
        .cc-std p{ font-size:14.5px; line-height:1.5; }
        .cc-std p + p{ margin-top:11px; padding-top:11px; border-top:1px dashed ${T.cream}2e; font-weight:700; }
        .cc-std-h{ font-family:'Anton'; font-size:clamp(24px,3vw,34px); margin:0 0 20px; }

        @media (max-width:560px){
          .cc-dict li{ grid-template-columns:1fr; gap:4px; }
          .cc-stops em{ display:none; }
          .cc-stops li{ width:50%; }
        }

        /* closing CTA + footer */
        .cc-cta{ text-align:center; }
        .cc-cta h2{ font-size:clamp(34px,5vw,60px); margin-bottom:12px; }
        .cc-cta p{ font-size:18px; color:${T.cream}cc; margin-bottom:24px; }
        footer{ text-align:center; padding:30px; font-family:'Space Mono'; font-size:12px; color:${T.cream}88; letter-spacing:.12em; }
        footer p{ margin-top:8px; } footer a{ color:${T.marigold}; }

        @media (prefers-reduced-motion: reduce){
          .btn, .cc-video-facade img, .cc-play{ transition:none !important; }
          .btn:hover, .cc-video-facade:hover img, .cc-video-facade:hover .cc-play{ transform:none !important; }
          .cc-video, .cc-buses{ transform:none; }
          .cc-cards a{ transition:none !important; } .cc-cards a:hover{ transform:none !important; }
        }
      `}</style>

      <nav className="cc-nav">
        <a className="brand" href={LINKS.home} aria-label={`All Aboard Earth — ${c.nav_home}`}>ALL ABOARD <b>EARTH</b></a>
        <div className="navr">
          <div className="lang" role="group" aria-label="Language">
            <button className={lang === "en" ? "on" : ""} aria-pressed={lang === "en"} onClick={() => setLang("en")}>EN</button>
            <button className={lang === "es" ? "on" : ""} aria-pressed={lang === "es"} onClick={() => setLang("es")}>ES</button>
          </div>
          <PageMenu lang={lang} />
          <a className="btn" href={LINKS.contact}>{c.nav_cta}</a>
        </div>
      </nav>

      <main>
        {/* TOP — the Cool Careers music video */}
        <header className="cc-top">
          <h1 className="display">{c.video_title}</h1>
          <p className="cc-tagline">{c.video_sub}</p>
          <MusicVideo label={c.video_play} title={c.video_title} />
        </header>

        {/* HEADLINE + GAME PORTAL */}
        <section className="cc-hero" aria-labelledby="cc-headline">
          <h2 id="cc-headline" className="display">{c.hero_title}<span>{c.hero_title_b}</span></h2>
          <p className="cc-band">
            {c.hero_band.map(([t, h], i) => (h ? <b key={i} style={{ color: hue(h) }}>{t}</b> : <React.Fragment key={i}>{t}</React.Fragment>))}
          </p>
          <div className="cc-actions">
            <a className="btn big" href={LINKS.contact}>{c.hero_demo}</a>
          </div>
        </section>

        {/* HOW THE GAME WORKS */}
        <section aria-labelledby="cc-game">
          <div className="cc-wrap" style={{ paddingTop: 0 }}>
            <div className="mono cc-dlabel">{c.game_label}</div>
            <h2 id="cc-game" className="display cc-dh">{c.game_h}</h2>
            <p className="cc-dlede">{c.game_lede}</p>
            <h3 className="mono cc-dlabel" style={{ marginTop: "clamp(38px,5vh,58px)" }}>{c.deck_label}</h3>
            <div className="cc-deck">
              {c.deck.map(([n, b, t], i) => (
                <div key={b}>
                  <div className="n" style={{ color: [T.marigold, T.leaf, T.sky, T.coral][i] }}>{n}</div>
                  <b>{b}</b>
                  <p>{t}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FOUR LINES — the thematic areas, told in the cards themselves */}
        <section aria-labelledby="cc-lines">
          <div className="cc-wrap" style={{ paddingTop: 0 }}>
            <div className="mono cc-dlabel">{c.themes_label}</div>
            <h2 id="cc-lines" className="display cc-dh">{c.themes_h}</h2>
            <p className="cc-dlede">{c.themes_lede}</p>
            <div className="cc-lines">
              {THEMES.map((line) => {
                const t = c.themes[line.key];
                const tint = hue(line.hue);
                return (
                  <article key={line.key} className="cc-line" style={{ borderLeftColor: tint }}>
                    <div className="cc-line-head">
                      <span className="cc-line-n" style={{ color: tint }}>{t.n}</span>
                      <h3>{t.name}</h3>
                    </div>
                    <p className="cc-line-blurb">{t.blurb}</p>
                    <CardRow cards={line.cards} more={c.themes_more} open={c.card_open} tint={tint} />
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        {/* THE CURRICULUM */}
        <section aria-labelledby="cc-curric">
          <div className="cc-wrap" style={{ paddingTop: 0 }}>
            <div className="mono cc-dlabel">{c.curric_label}</div>
            <h2 id="cc-curric" className="display cc-dh">{c.curric_h}</h2>
            <figure className="cc-plates">
              {DECK_PLATES.map(([k, alt]) => (
                <img key={k} src={`/art/cool-careers/stations/deck-${k}-450.webp`}
                     srcSet={`/art/cool-careers/stations/deck-${k}-450.webp 450w, /art/cool-careers/stations/deck-${k}-900.webp 900w`}
                     sizes="(max-width: 820px) 46vw, 240px" alt={alt}
                     width="900" height="502" loading="lazy" decoding="async" />
              ))}
            </figure>
            <ul className="cc-kit">
              {c.curric_items.map((b) => <li key={b}>{b}</li>)}
            </ul>
            <h3 className="cc-foot" style={{ color: T.cream, marginTop: "clamp(30px,4vh,44px)" }}>{c.tiers_h}</h3>
            <div className="cc-tiers">
              {c.tiers.map(([b, t]) => <div key={b} className="cc-tier"><b>{b}</b><span>{t}</span></div>)}
            </div>
            <p className="cc-path-foot">{c.tiers_foot}</p>
          </div>
        </section>

        {/* THE GREEN LINE */}
        <section aria-labelledby="cc-gl">
          <div className="cc-wrap" style={{ paddingTop: 0 }}>
            <div className="mono cc-dlabel">{c.gl_label}</div>
            <h2 id="cc-gl" className="display cc-dh">{c.gl_h}</h2>
            <p className="cc-dlede">{c.gl_lede}</p>
            <ol className="cc-stops">
              {c.gl_stops.map((stop, i) => (
                <li key={stop}>
                  {i > 0 && <em aria-hidden="true" />}
                  <span><i aria-hidden="true" />{stop}</span>
                </li>
              ))}
            </ol>
            <div className="cc-gl">
              <div>
                <h3>{c.gl_dict_h}</h3>
                <ul className="cc-dict">
                  {c.gl_dict.map(([k, v]) => <li key={k}><b>{k}</b><span>{v}</span></li>)}
                </ul>
              </div>
              <div>
                <h3>{c.gl_rides_h}</h3>
                <ul className="cc-rides">
                  {c.gl_rides.map(([b, t]) => <li key={b}><b>{b}</b><span>{t}</span></li>)}
                </ul>
              </div>
            </div>
            <p className="cc-gl-foot">{c.gl_foot}</p>
          </div>
        </section>

        {/* FROM SPARK TO PAYCHECK — the pathway, end to end */}
        <section aria-labelledby="cc-path">
          <div className="cc-wrap" style={{ paddingTop: 0 }}>
            <div className="mono cc-dlabel">{c.path_label}</div>
            <h2 id="cc-path" className="display cc-dh">{c.path_h}</h2>
            <p className="cc-dlede">{c.path_lede}</p>
            <div className="cc-path">
              {c.path.map(([n, h, tone, t]) => (
                <article key={n} className="cc-stage" style={{ borderTopColor: hue(tone) }}>
                  <div className="n" style={{ color: hue(tone) }}>{n}</div>
                  <h3>{h}</h3>
                  <p>{t}</p>
                </article>
              ))}
            </div>
            <div className="cc-nums">
              {c.path_nums.map(([n, b, t]) => (
                <div key={b} className="cc-num"><div className="n">{n}</div><b>{b}</b><span>{t}</span></div>
              ))}
            </div>
            <p className="cc-path-foot">{c.path_foot}</p>
          </div>
        </section>

        {/* PROGRAM OVERVIEW — the one-pager */}
        <section className="cc-paper" aria-labelledby="cc-why">
          <div className="cc-wrap">
            <h2 id="cc-why" className="mono cc-label">{c.why_label}</h2>
            <div className="cc-why">
              {c.why.map((w) => (
                <div key={w.n} className="cc-card cc-stat">
                  <div className="n" style={{ color: hue(w.hue) }}>{w.n}</div>
                  <p>{w.text}</p>
                  <small>Source: {w.src}</small>
                </div>
              ))}
            </div>

            {/* The way in, and the eagle facing it. The screenshot is the
                student home a visitor actually lands on, so the button is not
                asking anyone to click into the dark. */}
            <div className="cc-pipeline-row">
              <div className="cc-way-in">
                <a className="cc-portal-shot" href={LINKS.gamePortal} tabIndex={-1} aria-hidden="true">
                  <img src="/art/cool-careers/portal-preview-450.webp"
                       srcSet="/art/cool-careers/portal-preview-450.webp 450w, /art/cool-careers/portal-preview-900.webp 900w"
                       sizes="(max-width: 760px) 92vw, 540px" alt=""
                       width="900" height="753" loading="lazy" decoding="async" />
                </a>
                <a className="btn cc-portal-open" href={LINKS.gamePortal}>{c.portal_open} →</a>
              </div>
              <Eagle label={c.eagle_alt} />
            </div>

            <h2 className="mono cc-label">{c.std_label}</h2>
            <p className="cc-std-h">{c.std_h}</p>
            <div className="cc-std">
              {c.std.map(([h, tone, body, foot]) => {
                const tint = hue(tone);
                return (
                  <div key={h} style={{ borderTopColor: tint }}>
                    <h3 style={{ color: tint }}>{h}</h3>
                    <p>{body}</p>
                    <p>{foot}</p>
                  </div>
                );
              })}
            </div>

            <div className="cc-district">
              <h2 className="mono cc-label">{c.district_label}</h2>
              <ul>{c.district.map(([b, rest]) => <li key={b}><b>{b}</b>{rest}</li>)}</ul>
            </div>

            <div className="cc-pilot">
              <p>{c.pilot_title}<span>{c.pilot_hi}</span></p>
            </div>
          </div>
        </section>

        <section className="cc-cta">
          <div className="cc-wrap" style={{ paddingTop: 0 }}>
            <BusLoop caption={c.hero_caption} />
            <h2 className="display">{c.cta_head}</h2>
            <p>{c.cta_sub}</p>
            <a className="btn big" href={LINKS.contact}>{c.cta_btn}</a>
          </div>
        </section>
      </main>

      <footer>
        <div>{c.footer}</div>
        <p>{c.give} <a href={LINKS.donate} target="_blank" rel="noopener noreferrer">Tessa Foundation</a></p>
        <p><a href={LINKS.instagram} target="_blank" rel="noopener noreferrer">@allaboardearth</a></p>
      </footer>
    </div>
  );
}
