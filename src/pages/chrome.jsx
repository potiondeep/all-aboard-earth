import React, { useEffect, useRef, useState } from "react";
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

/* The site is five separate HTML entries, so there is no router to ask where we
   are — the path is the only source of truth, and it arrives with or without a
   trailing slash depending on whether Vercel or the dev server served it. */
const PAGES = [
  { href: LINKS.home,        en: "Home",                     es: "Inicio" },
  { href: LINKS.coolCareers, en: "Cool Careers",             es: "Cool Careers",
    sub: { href: LINKS.gamePortal, en: "Open game portal", es: "Abre el portal del juego" } },
  { href: LINKS.edutainment, en: "Environmental Edutainment", es: "Edutenimiento Ambiental" },
  { href: LINKS.regenArt,    en: "Regenerative Art",         es: "Arte Regenerativo" },
  { href: LINKS.contact,     en: "Contact Us",               es: "Contáctanos" },
];
const MENU_TEXT = {
  en: { label: "Menu", here: "You are here" },
  es: { label: "Menú", here: "Estás aquí" },
};
/* Both sides through the same normaliser: stripping the trailing slash turns
   the home path into "" on one side and "/" on the other, and home stops
   matching itself. */
const norm = (path) => path.replace(/\/+$/, "") || "/";
const samePage = (href) =>
  typeof window !== "undefined" && norm(window.location.pathname) === norm(href);

/**
 * The page picker. A button that drops a list of every page, on every page.
 * Closes on Escape (focus goes back to the button), on a click outside, and on
 * a scroll — the nav is absolute over the hero on most pages, so a panel left
 * open would travel up the screen with it.
 */
export function PageMenu({ lang = "en" }) {
  const t = MENU_TEXT[lang] || MENU_TEXT.en;
  const [open, setOpen] = useState(false);
  const wrap = useRef(null);
  const btn = useRef(null);
  const here = PAGES.find((p) => samePage(p.href));

  useEffect(() => {
    if (!open) return;
    const onDown = (e) => { if (!wrap.current?.contains(e.target)) setOpen(false); };
    const onKey = (e) => {
      if (e.key === "Escape") { setOpen(false); btn.current?.focus(); return; }
      if (e.key !== "ArrowDown" && e.key !== "ArrowUp") return;
      const items = [...wrap.current.querySelectorAll(".pmenu-panel a")];
      const at = items.indexOf(document.activeElement);
      const next = e.key === "ArrowDown" ? at + 1 : at - 1;
      const target = items[(next + items.length) % items.length];
      if (target) { e.preventDefault(); target.focus(); }
    };
    const onScroll = () => setOpen(false);
    document.addEventListener("pointerdown", onDown);
    document.addEventListener("keydown", onKey);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      document.removeEventListener("pointerdown", onDown);
      document.removeEventListener("keydown", onKey);
      window.removeEventListener("scroll", onScroll);
    };
  }, [open]);

  return (
    <div className={"pmenu" + (open ? " open" : "")} ref={wrap}>
      <button ref={btn} className="pmenu-btn" aria-expanded={open} aria-haspopup="true"
              aria-controls="pmenu-panel"
              onClick={() => setOpen((v) => !v)}
              onKeyDown={(e) => {
                if (e.key !== "ArrowDown") return;
                e.preventDefault(); setOpen(true);
                requestAnimationFrame(() => wrap.current?.querySelector(".pmenu-panel a")?.focus());
              }}>
        <span className="pmenu-long">{here ? here[lang] || here.en : t.label}</span>
        <span className="pmenu-short">{t.label}</span>
        <i className="pmenu-chev" aria-hidden="true" />
      </button>
      <ul id="pmenu-panel" className="pmenu-panel" hidden={!open}>
        {PAGES.map((p) => {
          const on = here === p;
          return (
            <React.Fragment key={p.href}>
              <li>
                <a href={p.href} aria-current={on ? "page" : undefined} className={on ? "on" : ""}>
                  {p[lang] || p.en}
                  {on && <span className="sr-only"> — {t.here}</span>}
                </a>
              </li>
              {/* The portal belongs to Cool Careers, not to the site — it sits
                  indented under its page rather than adrift at the bottom. */}
              {p.sub && (
                <li className="pmenu-sub">
                  <a href={p.sub.href}>{p.sub[lang] || p.sub.en} <span aria-hidden="true">↗</span></a>
                </li>
              )}
            </React.Fragment>
          );
        })}
      </ul>
    </div>
  );
}

export function SiteNav({ lang, setLang, cta, ctaHref = LINKS.contact }) {
  return (
    <nav className="pg-nav">
      <a className="brand" href={LINKS.home}>ALL ABOARD <b>EARTH</b></a>
      <div className="navr">
        <div className="lang" role="group" aria-label="Language">
          <button className={lang === "en" ? "on" : ""} aria-pressed={lang === "en"} onClick={() => setLang("en")}>EN</button>
          <button className={lang === "es" ? "on" : ""} aria-pressed={lang === "es"} onClick={() => setLang("es")}>ES</button>
        </div>
        <PageMenu lang={lang} />
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

/** The page picker's styles. Exported separately because the homepage and Cool
    Careers carry their own nav and their own <style>, and neither uses chromeCss. */
export const menuCss = `
  .pmenu .sr-only{ position:absolute; width:1px; height:1px; overflow:hidden; clip:rect(0 0 0 0); white-space:nowrap; }
  .pmenu{ position:relative; }
  .pmenu-btn{ display:flex; align-items:center; gap:8px; background:none; cursor:pointer;
    border:2px solid ${T.cream}44; border-radius:999px; color:${T.cream};
    font-family:'Space Mono', ui-monospace, monospace; font-size:12px; letter-spacing:.06em;
    padding:6px 14px; max-width:46vw; }
  .pmenu-btn span{ overflow:hidden; text-overflow:ellipsis; white-space:nowrap; }
  .pmenu-short{ display:none; }
  /* Narrow, the page's own name is too long to sit beside the wordmark without
     wrapping it — the panel still marks where you are. */
  @media (max-width:620px){
    .pmenu-long{ display:none; } .pmenu-short{ display:inline; }
    .pmenu-panel{ min-width:min(78vw, 280px); }
  }
  .pmenu-btn:hover{ border-color:${T.marigold}; color:${T.marigold}; }
  .pmenu-chev{ flex:none; width:7px; height:7px; border-right:2px solid currentColor; border-bottom:2px solid currentColor;
    transform:translateY(-2px) rotate(45deg); transition:transform .18s var(--ease-settle, ease); }
  .pmenu.open .pmenu-chev{ transform:translateY(1px) rotate(-135deg); }
  .pmenu.open .pmenu-btn{ border-color:${T.marigold}; color:${T.marigold}; }
  .pmenu-panel{ position:absolute; right:0; top:calc(100% + 10px); z-index:60; min-width:250px;
    list-style:none; margin:0; padding:6px; background:${T.pineDeep};
    border:2px solid ${T.cream}2e; border-radius:14px; box-shadow:0 18px 40px #00000066; }
  .pmenu-panel[hidden]{ display:none; }
  .pmenu-panel a{ display:block; padding:10px 14px; border-radius:9px; text-decoration:none;
    color:${T.cream}; font-family:'Bricolage Grotesque', system-ui, sans-serif; font-size:15px; font-weight:600; }
  .pmenu-panel a:hover{ background:${T.cream}14; }
  .pmenu-panel a.on{ color:${T.marigold}; }
  .pmenu-panel a:focus-visible{ outline:3px solid ${T.sky}; outline-offset:-3px; }
  .pmenu-sub a{ padding-left:28px; font-family:'Space Mono', ui-monospace, monospace; font-size:12px;
    letter-spacing:.06em; color:${T.sky}; }
  .pmenu-sub a::before{ content:""; position:absolute; margin-left:-16px; margin-top:8px;
    width:8px; height:8px; border-left:1.5px solid ${T.sky}66; border-bottom:1.5px solid ${T.sky}66;
    border-bottom-left-radius:3px; }
  .pmenu-sub{ position:relative; }
  @media (prefers-reduced-motion: reduce){ .pmenu-chev{ transition:none; } }
`;

/** Base CSS shared by the sub pages — palette, type, nav, buttons, footer. */
export const chromeCss = menuCss + `
  * { margin:0; padding:0; box-sizing:border-box; }
  html, body { background:${T.pine}; }
  .pg{
    --ease-settle: cubic-bezier(.22, 1, .36, 1);
    /* cyanotype paper: the tone, with the fibre texture blended into it */
    background:${T.pine} url('/art/paper-cyanotype.webp') repeat top center / 1400px auto;
    background-blend-mode:soft-light;
    color:${T.cream}; font-family:'Bricolage Grotesque', system-ui, sans-serif;
    min-height:100vh; overflow-x:hidden; -webkit-font-smoothing:antialiased;
  }
  .display{ font-family:'Anton', Impact, sans-serif; text-transform:uppercase; letter-spacing:.01em; line-height:.95; font-weight:400; }
  .mono{ font-family:'Space Mono', ui-monospace, monospace; }
  .sr-only{ position:absolute; width:1px; height:1px; overflow:hidden; clip:rect(0 0 0 0); white-space:nowrap; }
  a{ color:inherit; }
  .pg-nav{ position:absolute; top:0; left:0; right:0; z-index:20; display:flex; align-items:center; justify-content:space-between; gap:12px;
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
