import React, { useEffect, useRef, useState } from "react";
import { T, LINKS } from "../theme.js";
import { ccCopy } from "./coolCareersCopy.js";

/* ============================================================
   🌱 COOL CAREERS — program overview · music video · game portal
   ============================================================ */

const YT_ID = "G1IOqfjphIw"; // "Cool Careers" music video, All Aboard Earth on YouTube (as embedded on the Wix page)

const reducedMotion = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/** The felt solar eagle. It keeps its white studio background, and the overview
 *  section is painted the same white so the two merge with no visible edge. */
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
        <video muted loop playsInline preload="auto" poster="/art/cool-careers/eagle-plain-poster.webp" width="560" height="546" aria-hidden="true">
          <source src="/art/cool-careers/eagle-plain.webm" type="video/webm" />
          <source src="/art/cool-careers/eagle-plain.mp4" type="video/mp4" />
        </video>
      ) : (
        <img src="/art/cool-careers/eagle-plain-poster.webp" alt="" width="560" height="546" loading="lazy" decoding="async" />
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
      <style>{`
        * { margin:0; padding:0; box-sizing:border-box; }
        html, body { background:${T.pine}; }
        .cc-page{
          --ease-settle: cubic-bezier(.22, 1, .36, 1);
          --ink:#12203A; --paper:#FDFDFD; --card:#F4EAD7; --tile:#EFE4C8; --tile-edge:#D9C68E;
          background:${T.pine}; color:${T.cream}; font-family:'Bricolage Grotesque', system-ui, sans-serif;
          min-height:100vh; overflow-x:hidden; -webkit-font-smoothing:antialiased;
        }
        .display{ font-family:'Anton', Impact, sans-serif; text-transform:uppercase; letter-spacing:.01em; line-height:.95; font-weight:400; }
        .mono{ font-family:'Space Mono', ui-monospace, monospace; }
        .cc-sr{ position:absolute; width:1px; height:1px; overflow:hidden; clip:rect(0 0 0 0); white-space:nowrap; }
        a{ color:inherit; }

        /* nav — same as the homepage, transparent over the hero */
        .cc-nav{ position:absolute; top:0; left:0; right:0; z-index:20; display:flex; align-items:center; justify-content:space-between; gap:12px;
          padding:20px clamp(16px,4vw,48px); }
        .brand{ font-family:'Anton'; font-size:18px; letter-spacing:.06em; text-decoration:none; color:${T.cream}; }
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
        .cc-top{ background:radial-gradient(120% 80% at 50% 0%, #17466B 0%, ${T.pine} 62%); text-align:center;
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
        .cc-buses{ position:relative; width:min(760px, 100%); aspect-ratio:16/9; margin:0 auto clamp(26px,4vh,36px); overflow:hidden;
          border:6px solid ${T.cream}; border-radius:18px; box-shadow:0 18px 40px #0008; transform:rotate(.6deg); background:${T.pineDeep}; }
        .cc-buses-media{ position:absolute; inset:0; width:100%; height:100%; object-fit:cover; display:block; }
        .cc-buses-vid{ opacity:0; }
        .cc-buses-vid.on{ opacity:1; }

        /* overview — the one-pager, on paper */
        .cc-paper{ background:var(--paper); color:var(--ink); }
        .cc-wrap{ max-width:1100px; margin:0 auto; padding:clamp(56px,9vh,100px) clamp(16px,4vw,48px); }
        .cc-label{ font-size:12px; letter-spacing:.22em; color:#1F6B3A; margin-bottom:14px; }
        .cc-grid{ display:grid; gap:clamp(28px,4vw,48px); grid-template-columns:1fr; }
        @media (min-width:900px){ .cc-grid{ grid-template-columns:1fr 1fr; } }
        .cc-card{ background:var(--card); border:2.5px solid var(--ink); border-radius:18px; box-shadow:6px 6px 0 #0000001a; }
        .cc-stat{ padding:18px 20px 14px; margin-bottom:14px; display:grid; grid-template-columns:auto 1fr; column-gap:16px; align-items:start; }
        .cc-stat .n{ font-family:'Anton'; font-size:clamp(46px,5.4vw,64px); line-height:.9; white-space:nowrap; }
        .cc-stat p{ font-weight:700; font-size:16px; line-height:1.3; padding-top:6px; }
        .cc-stat small{ grid-column:1 / -1; margin-top:10px; font-family:'Space Mono'; font-size:11px; color:#6B7280; }
        .cc-step{ padding:14px 18px; margin-bottom:12px; display:flex; align-items:center; gap:16px; font-size:16px; line-height:1.35; }
        .cc-step .num{ flex:none; width:34px; height:34px; border-radius:50%; background:var(--ink); color:${T.marigold}; display:grid; place-items:center; font-family:'Anton'; font-size:18px; }
        .cc-step .card-ico{ flex:none; width:36px; height:48px; border:2.5px solid var(--ink); border-radius:6px; transform:rotate(-4deg); }
        .cc-foot{ font-family:'Anton'; text-transform:none; font-size:clamp(20px,2.2vw,24px); letter-spacing:.01em; margin-top:8px; }
        .cc-pipeline{ font-family:'Anton'; font-size:clamp(24px,3vw,34px); margin:clamp(40px,6vh,64px) 0 22px; }
        .cc-tiles{ display:grid; gap:12px; grid-template-columns:repeat(2,1fr); }
        @media (min-width:700px){ .cc-tiles{ grid-template-columns:repeat(3,1fr); } }
        @media (min-width:1000px){ .cc-tiles{ grid-template-columns:repeat(6,1fr); } }
        .cc-tile{ background:var(--tile); border:2px solid var(--tile-edge); border-radius:14px; padding:16px 14px; }
        .cc-tile b{ display:block; font-family:'Anton'; font-weight:400; font-size:clamp(22px,2.2vw,28px); line-height:1; margin-bottom:10px; }
        .cc-tile span{ font-size:14px; font-weight:600; line-height:1.3; }
        .cc-district{ margin-top:clamp(32px,5vh,48px); border:3px solid #1F6B3A; border-radius:18px; background:var(--card); padding:22px clamp(18px,3vw,30px); box-shadow:6px 6px 0 #0000001a; }
        .cc-district ul{ list-style:none; display:grid; gap:10px 34px; grid-template-columns:1fr; }
        @media (min-width:800px){ .cc-district ul{ grid-template-columns:1fr 1fr; } }
        .cc-district li{ position:relative; padding-left:26px; font-size:15px; line-height:1.4; }
        .cc-district li::before{ content:"✓"; position:absolute; left:0; top:0; color:#1F6B3A; font-weight:800; }
        .cc-pilot{ margin-top:clamp(28px,4vh,40px); padding-top:24px; border-top:2px dashed #C9B58A; }
        .cc-pilot p{ font-weight:800; font-size:clamp(17px,2vw,21px); }
        .cc-pilot p span{ color:#1F6B3A; }

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

        /* game portal */
        .cc-portal{ display:grid; gap:clamp(24px,4vw,48px); align-items:center; grid-template-columns:1fr;
          background:${T.marigold}; color:${T.pineDeep}; border-radius:28px; padding:clamp(28px,5vw,56px); transform:rotate(.4deg); }
        @media (min-width:860px){ .cc-portal{ grid-template-columns:1.1fr .9fr; } }
        /* clear room between the paper overview and the tilted yellow box */
        .cc-portal-wrap{ padding-top:clamp(56px,9vh,96px); }
        /* the solar eagle fills the open space beside "This pipeline starts in class." */
        .cc-pipeline-row{ display:flex; align-items:flex-end; justify-content:space-between; gap:clamp(16px,3vw,40px);
          margin:clamp(40px,6vh,64px) 0 22px; }
        .cc-pipeline-row .cc-pipeline{ margin:0; }
        .cc-eagle{ flex:none; width:clamp(120px,18vw,230px); line-height:0; margin-bottom:-6px; }
        /* the clip's own white is a hair off the section's after compression, so melt its
           edges rather than chase an exact match */
        .cc-eagle video, .cc-eagle img{ width:100%; height:auto; display:block;
          -webkit-mask-image:linear-gradient(to right, transparent 0, #000 7%, #000 93%, transparent 100%),
                             linear-gradient(to bottom, transparent 0, #000 6%, #000 94%, transparent 100%);
          -webkit-mask-composite:source-in;
          mask-image:linear-gradient(to right, transparent 0, #000 7%, #000 93%, transparent 100%),
                     linear-gradient(to bottom, transparent 0, #000 6%, #000 94%, transparent 100%);
          mask-composite:intersect; }
        @media (max-width:560px){ .cc-eagle{ width:110px; } }
        .cc-portal .cc-label{ color:${T.pineDeep}; opacity:.75; }
        .cc-portal h2{ font-size:clamp(38px,5.4vw,68px); margin-bottom:14px; }
        .cc-portal p{ font-size:18px; line-height:1.45; font-weight:500; margin-bottom:22px; }
        .cc-portal .btn{ background:${T.pineDeep}; color:${T.cream}; }
        .cc-portal ol{ list-style:none; display:grid; gap:10px; counter-reset:step; }
        .cc-portal li{ counter-increment:step; background:${T.cream}; border:2.5px solid ${T.pineDeep}; border-radius:14px; padding:14px 16px 14px 56px;
          position:relative; font-weight:700; font-size:16px; }
        .cc-portal li::before{ content:counter(step); position:absolute; left:14px; top:50%; transform:translateY(-50%); width:28px; height:28px; border-radius:50%;
          background:${T.pineDeep}; color:${T.marigold}; display:grid; place-items:center; font-family:'Anton'; font-size:15px; }

        /* closing CTA + footer */
        .cc-cta{ text-align:center; }
        .cc-cta h2{ font-size:clamp(34px,5vw,60px); margin-bottom:12px; }
        .cc-cta p{ font-size:18px; color:${T.cream}cc; margin-bottom:24px; }
        footer{ text-align:center; padding:30px; font-family:'Space Mono'; font-size:12px; color:${T.cream}88; letter-spacing:.12em; }
        footer p{ margin-top:8px; } footer a{ color:${T.marigold}; }

        @media (prefers-reduced-motion: reduce){
          .btn, .cc-video-facade img, .cc-play{ transition:none !important; }
          .btn:hover, .cc-video-facade:hover img, .cc-video-facade:hover .cc-play{ transform:none !important; }
          .cc-video, .cc-portal, .cc-buses{ transform:none; }
        }
      `}</style>

      <nav className="cc-nav">
        <a className="brand" href={LINKS.home} aria-label={`All Aboard Earth — ${c.nav_home}`}>ALL ABOARD <b>EARTH</b></a>
        <div className="navr">
          <div className="lang" role="group" aria-label="Language">
            <button className={lang === "en" ? "on" : ""} aria-pressed={lang === "en"} onClick={() => setLang("en")}>EN</button>
            <button className={lang === "es" ? "on" : ""} aria-pressed={lang === "es"} onClick={() => setLang("es")}>ES</button>
          </div>
          <a className="btn" href={LINKS.bookDemo}>{c.nav_cta}</a>
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
            <a className="btn big" href={LINKS.gamePortal}>{c.hero_portal}</a>
          </div>
        </section>

        {/* PROGRAM OVERVIEW — the one-pager */}
        <section className="cc-paper" aria-labelledby="cc-why">
          <div className="cc-wrap">
            <div className="cc-grid">
              <div>
                <h2 id="cc-why" className="mono cc-label">{c.why_label}</h2>
                {c.why.map((w) => (
                  <div key={w.n} className="cc-card cc-stat">
                    <div className="n" style={{ color: w.hue === "leaf" ? "#1F6B3A" : w.hue === "sky" ? "#1C6A8A" : "#D2502C" }}>{w.n}</div>
                    <p>{w.text}</p>
                    <small>Source: {w.src}</small>
                  </div>
                ))}
              </div>
              <div>
                <h2 className="mono cc-label">{c.students_label}</h2>
                {c.students.map(([b, rest], i) => (
                  <div key={i} className="cc-card cc-step">
                    <span className="num">{i + 1}</span>
                    <span className="card-ico" style={{ background: ["#E9DFC2", "#CFE8F3", "#FBE3BF", "#D2E8DA"][i] }} aria-hidden="true" />
                    <span><b>{b}</b>{rest}</span>
                  </div>
                ))}
                <p className="cc-foot">{c.students_foot}</p>
              </div>
            </div>

            <div className="cc-pipeline-row">
              <p className="cc-pipeline">{c.pipeline}</p>
              <Eagle label={c.eagle_alt} />
            </div>
            <h2 className="mono cc-label">{c.teachers_label}</h2>
            <div className="cc-tiles">
              {c.teachers.map(([b, s, h]) => (
                <div key={b} className="cc-tile">
                  <b style={{ color: h === "leaf" ? "#1F6B3A" : h === "sky" ? "#1C6A8A" : h === "marigold" ? "#8A5300" : "#A8391A" }}>{b}</b>
                  <span>{s}</span>
                </div>
              ))}
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

        {/* GAME PORTAL */}
        <section aria-labelledby="cc-portal-title">
          <div className="cc-wrap cc-portal-wrap">
            <div className="cc-portal">
              <div>
                <div className="mono cc-label">{c.portal_label}</div>
                <h2 id="cc-portal-title" className="display">{c.portal_title}</h2>
                <p>{c.portal_sub}</p>
                <a className="btn big" href={LINKS.gamePortal}>{c.portal_btn} →</a>
              </div>
              <ol>{c.portal_points.map((pt) => <li key={pt}>{pt}</li>)}</ol>
            </div>
          </div>
        </section>

        <section className="cc-cta">
          <div className="cc-wrap" style={{ paddingTop: 0 }}>
            <BusLoop caption={c.hero_caption} />
            <h2 className="display">{c.cta_head}</h2>
            <p>{c.cta_sub}</p>
            <a className="btn big" href={LINKS.bookDemo}>{c.cta_btn}</a>
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
