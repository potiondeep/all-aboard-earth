import React, { useEffect, useState } from "react";
import { T, LINKS } from "../theme.js";

/* Shared furniture for the sub pages: nav, footer, and the CSS both need.
   The homepage keeps its own copy — it has a starfield behind the nav. */

export function useLang() {
  const [lang, setLang] = useState(() => {
    try { return localStorage.getItem("aae-lang") === "es" ? "es" : "en"; } catch { return "en"; }
  });
  useEffect(() => {
    document.documentElement.lang = lang;
    try { localStorage.setItem("aae-lang", lang); } catch {}
  }, [lang]);
  return [lang, setLang];
}

export const reducedMotion = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/** Plays only while on screen; fetches nothing until it is close. */
export function useLoopVideo(ref, { reduced }) {
  const [ready, setReady] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (reduced || !el) return;
    const near = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setReady(true); near.disconnect(); } }, { rootMargin: "700px 0px" });
    near.observe(el);
    const play = new IntersectionObserver(([e]) => {
      const v = el.querySelector("video");
      if (v) e.isIntersecting ? v.play().catch(() => {}) : v.pause();
    }, { threshold: 0.15 });
    play.observe(el);
    return () => { near.disconnect(); play.disconnect(); };
  }, [ref, reduced]);
  useEffect(() => { if (ready) ref.current?.querySelector("video")?.play().catch(() => {}); }, [ready, ref]);
  return ready;
}

export function SiteNav({ lang, setLang, cta, ctaHref = LINKS.bookDemo }) {
  return (
    <nav className="pg-nav">
      <a className="brand" href={LINKS.home}>ALL ABOARD <b>EARTH</b></a>
      <div className="navr">
        <div className="lang" role="group" aria-label="Language">
          <button className={lang === "en" ? "on" : ""} aria-pressed={lang === "en"} onClick={() => setLang("en")}>EN</button>
          <button className={lang === "es" ? "on" : ""} aria-pressed={lang === "es"} onClick={() => setLang("es")}>ES</button>
        </div>
        <a className="btn" href={ctaHref}>{cta}</a>
      </div>
    </nav>
  );
}

export function SiteFooter({ footer, give }) {
  return (
    <footer>
      <div>{footer}</div>
      <p>{give} <a href={LINKS.donate} target="_blank" rel="noopener noreferrer">Tessa Foundation</a></p>
      <p><a href={LINKS.instagram} target="_blank" rel="noopener noreferrer">@allaboardearth</a></p>
    </footer>
  );
}

/** Base CSS shared by the sub pages — palette, type, nav, buttons, footer. */
export const chromeCss = `
  * { margin:0; padding:0; box-sizing:border-box; }
  html, body { background:${T.pine}; }
  .pg{
    --ease-settle: cubic-bezier(.22, 1, .36, 1);
    background:${T.pine}; color:${T.cream}; font-family:'Bricolage Grotesque', system-ui, sans-serif;
    min-height:100vh; overflow-x:hidden; -webkit-font-smoothing:antialiased;
  }
  .display{ font-family:'Anton', Impact, sans-serif; text-transform:uppercase; letter-spacing:.01em; line-height:.95; font-weight:400; }
  .mono{ font-family:'Space Mono', ui-monospace, monospace; }
  .sr-only{ position:absolute; width:1px; height:1px; overflow:hidden; clip:rect(0 0 0 0); white-space:nowrap; }
  a{ color:inherit; }
  .pg-nav{ position:absolute; top:0; left:0; right:0; z-index:20; display:flex; align-items:center; justify-content:space-between; gap:12px;
    padding:20px clamp(16px,4vw,48px); }
  .brand{ font-family:'Anton'; font-size:18px; letter-spacing:.06em; text-decoration:none; color:${T.cream}; }
  .brand b{ color:${T.marigold}; font-weight:400; }
  .navr{ display:flex; gap:12px; align-items:center; }
  .lang{ display:flex; border:2px solid ${T.cream}44; border-radius:999px; overflow:hidden; }
  .lang button{ background:none; border:none; color:${T.cream}; font-family:'Space Mono'; font-size:12px; padding:6px 12px; cursor:pointer; }
  .lang button.on{ background:${T.marigold}; color:${T.pineDeep}; font-weight:700; }
  .btn{ display:inline-block; background:${T.coral}; color:${T.pineDeep}; border:none; border-radius:999px; padding:12px 22px;
    font-family:'Bricolage Grotesque'; font-weight:700; font-size:15px; cursor:pointer; text-decoration:none;
    transition:transform .2s var(--ease-settle), box-shadow .2s var(--ease-settle); }
  .btn:hover{ transform:translateY(-3px) rotate(-1deg); box-shadow:0 10px 24px ${T.coral}55; }
  .btn.big{ padding:17px 30px; font-size:17px; }
  .btn.ghost{ background:transparent; color:${T.cream}; border:2px solid ${T.cream}66; }
  .btn.ghost:hover{ border-color:${T.marigold}; color:${T.marigold}; box-shadow:none; }
  .btn:focus-visible, .lang button:focus-visible, button:focus-visible{ outline:3px solid ${T.sky}; outline-offset:3px; }
  @media (max-width:560px){ .brand{ font-size:15px; } .navr .btn{ display:none; } }

  .pg-top{ text-align:center; background:radial-gradient(120% 80% at 50% 0%, #163A26 0%, ${T.pine} 62%);
    padding:calc(clamp(84px,11vh,112px) + 12px) clamp(16px,4vw,48px) clamp(34px,5vh,56px); }
  .pg-top h1{ font-size:clamp(46px,8.4vw,116px); color:${T.cream}; }
  .pg-tagline{ margin:14px auto 0; max-width:760px; font-size:clamp(17px,2vw,22px); line-height:1.45; color:${T.cream}d9; font-weight:500; }
  .pg-wrap{ max-width:1100px; margin:0 auto; padding:clamp(52px,8vh,92px) clamp(16px,4vw,48px); }
  .pg-label{ font-family:'Space Mono', ui-monospace, monospace; font-size:12px; letter-spacing:.22em; color:${T.marigold}; margin-bottom:14px; }
  .pg-h2{ font-size:clamp(34px,5.2vw,64px); margin-bottom:16px; }
  .pg-lede{ font-size:18px; line-height:1.5; color:${T.cream}cc; max-width:680px; }
  footer{ text-align:center; padding:30px; font-family:'Space Mono'; font-size:12px; color:${T.cream}88; letter-spacing:.12em; }
  footer p{ margin-top:8px; } footer a{ color:${T.marigold}; }

  @media (prefers-reduced-motion: reduce){
    .btn{ transition:none !important; } .btn:hover{ transform:none !important; }
  }
`;
