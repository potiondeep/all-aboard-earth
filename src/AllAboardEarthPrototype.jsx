import React, { useState, useEffect, useRef } from "react";
import { T, LINKS } from "./theme.js";

import { cardArt, CAREER_PAGE } from "./wixCardArt.js";
import Seed from "./ornaments/Seed.jsx";
import Divider from "./ornaments/Divider.jsx";
import CtaCrossing from "./ornaments/CtaCrossing.jsx";
import FeltLoop from "./ornaments/FeltLoop.jsx";
import Train, { useScrollMotion } from "./ornaments/Train.jsx";
import seedMarkArt from "./assets/marks/seed-mark.webp";

// Felt animations under the meditating Earth. The roadrunner and raccoon play
// forward and fade back to their first frame (reversed motion reads wrong for
// them); the wind monkey ping-pongs. Other characters will live on other pages.
const FELT_WALL = [
  { name: "felt-9", h: 404, mode: "fade" }, // roadrunner, solar farm
  { name: "felt-1", h: 298, mode: "fade" }, // raccoon, tractor
  { name: "felt-11", h: 404 },              // monkey, wind turbine
];

// Card art is language-independent, so it lives outside the copy object and is
// matched to cards by position. Art streams from the Wix CMS, so replacing the
// image on a Cool Careers item updates this homepage too — no redeploy needed.
const CARD_ART = [
  {
    slug: "photovoltaic-power-technician",
    alt: "Solar Technician — designs and installs photovoltaic power systems",
  },
  {
    slug: "watershed-restoration-specialist",
    alt: "Watershed Restoration Specialist — restores riverbanks, aquifers and beaver habitat",
  },
  {
    slug: "soil-microbiologist",
    alt: "Soil Microbiologist — studies the living soil that feeds everything above it",
  },
  {
    slug: "aquaponics-technician",
    alt: "Aquaponics Technician — runs closed-loop systems where fish and plants feed each other",
  },
  {
    slug: "wind-power-technician",
    alt: "Wind Technician — installs and maintains wind turbines",
  },
].map((c) => ({ ...c, src: cardArt(c.slug), href: CAREER_PAGE(c.slug) }));

/* ============================================================
   ALL ABOARD EARTH — "UP WE GO!" HOMEPAGE PROTOTYPE v3
   Symbol systems woven in:
   ☀️🎶 Vinyl-groove sun (hero, spinning like a record)
   🌊⛰️ Soundwave→mountain dividers between tracks
   🌱 Roots & seeds grounding sections
   🚂 Scroll-climbing train on the right rail
   ============================================================ */

// the three engines each have their own page now
const ENGINE_LINKS = [LINKS.coolCareers, LINKS.edutainment, LINKS.regenArt];

// Seat 4 — one hue per frequency cell (declared after T)
/** YouTube facade: local poster and a play button; the player loads on click. */
function YouTubeFacade({ id, title, label, poster }) {
  const [on, setOn] = useState(false);
  return (
    <div className="ytframe">
      {on ? (
        <iframe src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`} title={title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen />
      ) : (
        <button className="ytfacade" onClick={() => setOn(true)} aria-label={label}>
          <img src={poster} alt="" width="1280" height="720" loading="lazy" decoding="async" />
          <span className="ytplay" aria-hidden="true">▶</span>
        </button>
      )}
    </div>
  );
}

const FREQ_HUES = [T.marigold, T.coral, T.sky, T.leaf];

const copy = {
  en: {
    nav_cta: "Book a pilot demo",
    hero_eyebrow: "ALL ABOARD EARTH · SIDE A · 33⅓ RPM",
    hero_line1: "THE EARTH NEEDS DREAMERS",
    hero_line2: "WHO GOT THE SKILLS TO PAY THE BILLS!",
    hero_accent: "¡Arriba vamos!",
    hero_sub:
      "All Aboard Earth is a movement igniting the visionary willpower of humanity to foster ecological health through green career pathways, environmental edutainment and regenerative art.",
    marquee: "UP WE GO! · UP WE GO! · ",
    marquee_phrase: "UP WE GO!",
    t1_label: "TRACK 01 · THE MOVEMENT",
    t1_head: "ONE MOVEMENT. THREE ENGINES.",
    t1_sub:
      "Three engines drive the same mission — igniting the visionary willpower to foster ecological health.",
    freqs: [
      ["🚂", "Green Career Pathways", "School programs making green futures the coolest gig in town.", true],
      ["🎵", "Environmental Edutainment", "Music, shows and workshops that turn ecology into anthems.", false],
      ["🎨", "Regenerative Art", "Murals, campaigns and card-game worlds that mobilize communities.", false],
    ],
    boarding: "NOW BOARDING",
    t2_label: "TRACK 02 · NOW BOARDING",
    t2_head: "COOL CAREERS",
    t2_body:
      "The clean economy is opening millions of doors this decade — solar fields, watersheds, smart grids, living soil. Cool Careers is our game-powered journey that gives students the front-row seat and the backstage pass. First stop: your school.",
    t2_tags: ["CTE-aligned", "Middle + High School", "Bilingual EN/ES", "Game-based"],
    cc_btn: "Explore Cool Careers",
    t3_label: "HOW IT PLAYS",
    t3_head: "PLAY. LEARN. LAUNCH.",
    t3_cards: [
      { n: "PLAY", d: "Students run story-driven missions — restore a watershed, power a block, grow a food forest. Real stakes, game energy." },
      { n: "LEARN", d: "Every mission maps to CTE standards and real green-career skills. The fun IS the curriculum, not a break from it." },
      { n: "LAUNCH", d: "Missions unlock pathways: certifications, mentors, and local partners. From controller to career." },
    ],
    t4_label: "MEET THE CREW",
    t4_head: "COLLECT YOUR FUTURE",
    t4_sub: "Every career is a character. Every character is a doorway. (Go ahead — pick them up.)",
    cards: [
      { role: "SOLAR TECHNICIAN", stat: "SUN PWR", num: "07", flavor: "Catches daylight, feeds the grid.", hue: T.marigold },
      { role: "WATERSHED SPECIALIST", stat: "FLOW", num: "12", flavor: "Keeps the acequias singing.", hue: T.sky },
      { role: "SOIL MICROBIOLOGIST", stat: "ROOTS", num: "03", flavor: "Reads the ground like liner notes.", hue: T.leaf },
      { role: "AQUAPONICS TECH", stat: "CYCLE", num: "15", flavor: "Fish feed the greens, greens clean the water.", hue: T.cream },
      { role: "WIND TECHNICIAN", stat: "LIFT", num: "21", flavor: "Climbs towers, harvests sky.", hue: T.coral },
    ],
    ed_label: "TRACK 03 · ON STAGE",
    ed_head: "ENVIRONMENTAL EDUTAINMENT",
    ed_sub: "Inspiring a new generation of ecological geniuses through live performance and music production.",
    ed_video: "Up We Go: Education & Activism",
    ed_play: "Play Up We Go: Education & Activism",
    ed_btn: "Explore Edutainment",
    ra_label: "TRACK 04 · ON THE WALLS",
    ra_head: "REGENERATIVE ART",
    ra_sub: "Healing communities and the land with art — heralding a renaissance of planetary stewardship.",
    ra_alt: "A community mural in progress, painted with the neighbourhood",
    ra_caption: "Handmade heroes. Real classrooms.",
    ra_btn: "Explore Regenerative Art",
    t5_label: "TRACK 05 · THE PROOF",
    t5_head: "BORN IN NEW MEXICO. READY FOR YOUR DISTRICT.",
    t5_points: [
      ["Pilot-ready", "Proposals in motion with Santa Fe & Albuquerque public schools for the coming academic year."],
      ["Standards-aligned", "Mapped to CTE pathways so it plugs into what you already teach — no bolt-on chaos."],
      ["Bilingual by design", "Full English / Spanish delivery, because the movement speaks both."],
      ["Culture included", "Live regenerative hip-hop assemblies turn launch day into the loudest field trip of the year."],
    ],
    cta_stamp: "UP WE GO!",
    cta_head: "LET'S COLLABORATE!",
    cta_sub: "Meet with our team to see how we can empower your community with a new vision of sustainability and regeneration!",
    cta_btn: "Book a pilot demo",
    cta_alt: "or say hola: allaboardearth@gmail.com",
    footer: "ALL ABOARD EARTH · UP WE GO! 🌱",
    give: "Donations are held for us by our fiscal sponsor,",
  },
  es: {
    nav_cta: "Reserva una demo",
    hero_eyebrow: "ALL ABOARD EARTH · LADO A · 33⅓ RPM",
    hero_line1: "LA TIERRA NECESITA SOÑADORES",
    hero_line2: "¡CON EL TALENTO PARA LOGRARLO!",
    hero_accent: "Up we go!",
    hero_sub:
      "All Aboard Earth es un movimiento que enciende la voluntad visionaria de la humanidad para fomentar la salud ecológica mediante rutas de carreras verdes, edutenimiento ambiental y arte regenerativo.",
    marquee: "¡ARRIBA VAMOS! · UP WE GO! · ¡ARRIBA VAMOS! · UP WE GO! · ",
    marquee_phrase: "¡ARRIBA VAMOS!",
    t1_label: "PISTA 01 · EL MOVIMIENTO",
    t1_head: "UN MOVIMIENTO. TRES MOTORES.",
    t1_sub:
      "Tres motores impulsan la misma misión — encender la voluntad visionaria para fomentar la salud ecológica.",
    freqs: [
      ["🚂", "Carreras Verdes", "Programas escolares que hacen del futuro verde el mejor oficio del barrio.", true],
      ["🎵", "Edutenimiento Ambiental", "Música, shows y talleres que convierten la ecología en himnos.", false],
      ["🎨", "Arte Regenerativo", "Murales, campañas y mundos de cartas que movilizan comunidades.", false],
    ],
    boarding: "ABORDANDO",
    t2_label: "PISTA 02 · ABORDANDO AHORA",
    t2_head: "COOL CAREERS",
    t2_body:
      "La economía limpia abre millones de puertas esta década — campos solares, cuencas, redes inteligentes, suelo vivo. Cool Careers es nuestro viaje en modo videojuego que da a tus estudiantes el asiento de primera fila y el pase tras bastidores. Primera parada: tu escuela.",
    t2_tags: ["Alineado con CTE", "Secundaria + Prepa", "Bilingüe EN/ES", "Basado en juego"],
    cc_btn: "Explora Cool Careers",
    t3_label: "CÓMO SE JUEGA",
    t3_head: "JUEGA. APRENDE. DESPEGA.",
    t3_cards: [
      { n: "JUEGA", d: "Misiones con historia — restaurar una cuenca, energizar un barrio, cultivar un bosque comestible. Retos reales, energía de juego." },
      { n: "APRENDE", d: "Cada misión se alinea con estándares CTE y habilidades verdes reales. La diversión ES el currículo." },
      { n: "DESPEGA", d: "Las misiones abren caminos: certificaciones, mentores y aliados locales. Del control a la carrera." },
    ],
    t4_label: "CONOCE AL EQUIPO",
    t4_head: "COLECCIONA TU FUTURO",
    t4_sub: "Cada carrera es un personaje. Cada personaje, una puerta. (Anda — tómalas en tus manos.)",
    cards: [
      { role: "TÉCNICA SOLAR", stat: "SOL", num: "07", flavor: "Atrapa la luz, alimenta la red.", hue: T.marigold },
      { role: "GUARDIANA DE CUENCAS", stat: "FLUJO", num: "12", flavor: "Mantiene cantando las acequias.", hue: T.sky },
      { role: "MICROBIÓLOGA DE SUELOS", stat: "RAÍCES", num: "03", flavor: "Lee la tierra como un vinilo.", hue: T.leaf },
      { role: "TÉCNICA DE ACUAPONÍA", stat: "CICLO", num: "15", flavor: "Los peces nutren; las plantas limpian.", hue: T.cream },
      { role: "TÉCNICO EÓLICO", stat: "VUELO", num: "21", flavor: "Sube torres, cosecha cielo.", hue: T.coral },
    ],
    ed_label: "PISTA 03 · EN ESCENA",
    ed_head: "EDUTAINMENT AMBIENTAL",
    ed_sub: "Inspirando a una nueva generación de genios ecológicos a través de la presentación en vivo y la producción musical.",
    ed_video: "Up We Go: Education & Activism",
    ed_play: "Reproducir Up We Go: Education & Activism",
    ed_btn: "Explora Edutainment",
    ra_label: "PISTA 04 · EN LOS MUROS",
    ra_head: "ARTE REGENERATIVO",
    ra_sub: "Sanando comunidades y la tierra con arte — anunciando un renacimiento de la custodia planetaria.",
    ra_alt: "Un mural comunitario en proceso, pintado con el vecindario",
    ra_caption: "Héroes hechos a mano. Aulas reales.",
    ra_btn: "Explora Arte Regenerativo",
    t5_label: "PISTA 05 · LA PRUEBA",
    t5_head: "NACIDO EN NUEVO MÉXICO. LISTO PARA TU DISTRITO.",
    t5_points: [
      ["Piloto en marcha", "Propuestas en curso con las escuelas públicas de Santa Fe y Albuquerque para el próximo año escolar."],
      ["Alineado a estándares", "Mapeado a rutas CTE para integrarse a lo que ya enseñas — sin caos añadido."],
      ["Bilingüe de raíz", "Entrega completa en inglés y español, porque el movimiento habla los dos."],
      ["Cultura incluida", "Conciertos de hip-hop regenerativo que convierten el lanzamiento en la excursión más sonora del año."],
    ],
    cta_stamp: "¡ARRIBA VAMOS!",
    cta_head: "¡COLABOREMOS!",
    cta_sub: "Reúnete con nuestro equipo para ver cómo podemos potenciar a tu comunidad con una nueva visión de sostenibilidad y regeneración.",
    cta_btn: "Reserva una demo piloto",
    cta_alt: "o di hola: allaboardearth@gmail.com",
    footer: "ALL ABOARD EARTH · ¡ARRIBA VAMOS! 🌱",
    give: "Las donaciones las administra nuestro patrocinador fiscal,",
  },
};

/* ---------- scroll-reveal hook ---------- */
/* Seat B — hero parallax: Earth and starfield move at different rates, so the
   depth is real rather than painted. rAF-throttled and transform-only. */
function useSunParallax() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const hero = document.querySelector(".hero");
    if (!hero) return;
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const y = window.scrollY;
        // independent layers: the Earth trails scroll slightly more than the stars
        hero.style.setProperty("--earth-shift", `${Math.max(-60, Math.min(60, y * 0.10)).toFixed(1)}px`);
        hero.style.setProperty("--star-shift", `${Math.max(-40, Math.min(40, y * 0.20)).toFixed(1)}px`);
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => { window.removeEventListener("scroll", onScroll); cancelAnimationFrame(raf); };
  }, []);
}

function useReveal(lang) {
  useEffect(() => {
    const els = Array.from(document.querySelectorAll("[data-reveal]"));
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        }),
      { threshold: 0.15 }
    );
    els.forEach((el) => io.observe(el));

    // Safety net: IntersectionObserver callbacks do not run while the tab is
    // hidden, so a page loaded in a background tab can sit fully transparent.
    // Sweep anything already on screen whenever we become visible.
    const sweep = () => {
      if (document.visibilityState !== "visible") return;
      for (const el of els) {
        if (el.classList.contains("in")) continue;
        const r = el.getBoundingClientRect();
        if (r.top < window.innerHeight && r.bottom > 0) {
          el.classList.add("in");
          io.unobserve(el);
        }
      }
    };
    sweep();
    document.addEventListener("visibilitychange", sweep);
    return () => {
      io.disconnect();
      document.removeEventListener("visibilitychange", sweep);
    };
  }, [lang]);
}

/* ============================================================
   ☀️🎶 VINYL SUN — a record pressed from daylight
   ============================================================ */
/* Seat B — the felt Earth in space.
   The clip is a ~quarter turn, not a full revolution, so its two ends show
   different longitudes and any forward-only loop has a visible seam. It plays
   ping-pong instead: the file holds the frames forward then reversed, so both
   ends are the same frame and the native loop is seamless. Chosen 2026-09-13
   over crossfade, trim and glow variants after comparing them live.
   Sources are ordered HEVC-alpha first (Safari) then VP9-alpha (Chrome/Firefox);
   each browser takes the first it can decode, so only one file is ever fetched. */
function FeltEarth() {
  const vidRef = useRef(null);
  // The poster carries first paint; the clip only starts after load, so it
  // never competes with the hero copy (which is the LCP element).
  const [videoReady, setVideoReady] = useState(false);
  const [playing, setPlaying] = useState(false);
  const reduced =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  useEffect(() => {
    if (reduced) return;
    // At the doubled size the clip is the page's largest paint, so the sooner it
    // arrives the sooner LCP settles: start it at load rather than waiting for idle.
    const arm = () => setVideoReady(true);
    if (document.readyState === "complete") arm();
    else {
      window.addEventListener("load", arm, { once: true });
      return () => window.removeEventListener("load", arm);
    }
  }, [reduced]);

  useEffect(() => {
    if (videoReady) vidRef.current?.play().catch(() => {});
  }, [videoReady]);

  return (
    <div className={"earth-wrap" + (playing ? " playing" : "")} aria-hidden="true">
        {/* The globe's weight and atmosphere. A plain circle, because the clip's
            globe drifts ~25px across the loop: hung off the still's alpha instead,
            the shadow would sit still while the globe moved out from under it. */}
        <div className="earth-glow" />
        {/* first paint, and the backdrop until the clip is actually running */}
        <img
          className="earth-still"
          src="/art/felt-earth-poster.webp"
          srcSet="/art/felt-earth-poster-400.webp 450w, /art/felt-earth-poster.webp 900w"
          sizes="min(86vw, 644px)"
          alt=""
          width="900"
          height="900"
          fetchPriority="high"
          decoding="async"
        />
        {videoReady && !reduced && (
          <div className="earth-media">
            {/* the poster is frame one, so revealing on "playing" has no jump */}
            <video
              ref={vidRef}
              className={"earth-vid" + (playing ? " on" : "")}
              muted
              playsInline
              loop
              preload="auto"
              aria-hidden="true"
              onPlaying={() => setPlaying(true)}
            >
              <source media="(max-width: 700px)" src="/art/felt-earth-pingpong-sm-hevc.mov" type="video/quicktime" />
              <source media="(max-width: 700px)" src="/art/felt-earth-pingpong-sm.webm" type="video/webm" />
              <source src="/art/felt-earth-pingpong-hevc.mov" type="video/quicktime" />
              <source src="/art/felt-earth-pingpong.webm" type="video/webm" />
            </video>
          </div>
      )}
    </div>
  );
}

function Starfield() {
  return (
    <div className="starfield" aria-hidden="true">
      <div className="stars stars-far" />
      <div className="stars stars-near" />
    </div>
  );
}

/* Kinetic headline — one span per word so the line lands word by word.
   --i drives the stagger; the Marigold line adds a 150ms head start offset. */
function KineticLine({ text, className = "" }) {
  const words = text.split(" ");
  return (
    <h1 className={"display hero-word " + className}>
      {words.map((w, i) => (
        <span key={`${w}-${i}`} style={{ "--i": i }}>
          {w}
          {i < words.length - 1 ? "\u00A0" : ""}
        </span>
      ))}
    </h1>
  );
}

function VinylSun() {
  return (
    <div className="vinyl-wrap" aria-hidden="true">
      <svg className="vinyl-sun" viewBox="0 0 400 400">
        <g className="sun-rays">
          {Array.from({ length: 16 }).map((_, i) => (
            <rect
              key={i}
              x="196" y="8" width="8" height="34" rx="4"
              fill={T.marigold}
              transform={`rotate(${i * 22.5} 200 200)`}
            />
          ))}
        </g>
      </svg>
      {/* the record itself — real art, turning as one piece */}
      <img
        className="vinyl-disc"
        src="/art/vinyl-sun.webp"
        srcSet="/art/vinyl-sun.webp 740w, /art/vinyl-sun-1040.webp 1040w"
        sizes="(max-width: 783px) 64vw, 499px"
        alt=""
        width="740"
        height="740"
        fetchPriority="high"
        decoding="async"
      />
    </div>
  );
}

/* ============================================================
   🌊⛰️ SOUNDWAVE → MOUNTAIN DIVIDER
   the signal starts as water and rises into peaks
   ============================================================ */
function WaveMountainDivider({ flip }) {
  return <Divider flip={flip} />;
}

/* ============================================================
   🌱 ROOTS & SEED — what grounds each idea
   ============================================================ */
function RootsMark() {
  return <Seed className="roots" variant="mark" />;
}

/* ============================================================
   🚂 CLIMBING TRAIN — rides the right rail as you scroll
   ============================================================ */
function ClimbingTrain() {
  const [p, setP] = useState(0);
  const [settling, setSettling] = useState(false);
  const { moving } = useScrollMotion();
  const [travel, setTravel] = useState(0);
  const trainRef = useRef(null);

  // translateY needs pixels (percentages resolve against the element, not the rail)
  useEffect(() => {
    const measure = () => {
      const rail = trainRef.current?.parentElement;
      if (rail) setTravel(Math.max(0, rail.clientHeight - trainRef.current.offsetHeight));
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);
  useEffect(() => {
    let raf = 0;
    let stopTimer = 0;
    let last = window.scrollY;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const max = document.documentElement.scrollHeight - window.innerHeight;
        setP(max > 0 ? Math.min(1, window.scrollY / max) : 0);
        // climb angle follows scroll direction; settles back when scrolling stops
        const dir = window.scrollY - last;
        last = window.scrollY;
        if (Math.abs(dir) > 0.5) {
          setSettling(false);
          clearTimeout(stopTimer);
          stopTimer = setTimeout(() => setSettling(true), 120);
        }
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => { window.removeEventListener("scroll", onScroll); cancelAnimationFrame(raf); };
  }, []);
  return (
    <div className="rail" aria-hidden="true">
      <div className="rail-track" />
      <div
        ref={trainRef}
        className={"rail-train" + (settling ? " settling" : "") + (moving ? " moving" : "")}
        style={{ "--y": `${travel * (1 - p)}px`, "--climb": `${(-6 - p * 6).toFixed(1)}deg` }}
      >
        <Train variant="rail" />
        <span className="rail-label mono">UP WE GO</span>
      </div>
    </div>
  );
}

/* ---------- Seat 7: tilting trading card ----------
   Tilt is driven by rAF writing CSS custom properties straight to the node, so
   pointer movement never triggers a React re-render and we stay on the
   compositor (transform + opacity only). */
function CareerCard({ c, i, art }) {
  const ref = useRef(null);
  const raf = useRef(0);
  const pending = useRef(null);

  const apply = () => {
    raf.current = 0;
    const el = ref.current;
    if (!el || !pending.current) return;
    const { rx, ry, gx, gy, on } = pending.current;
    el.style.setProperty("--rx", `${rx.toFixed(2)}deg`);
    el.style.setProperty("--ry", `${ry.toFixed(2)}deg`);
    el.style.setProperty("--gx", `${gx.toFixed(1)}%`);
    el.style.setProperty("--gy", `${gy.toFixed(1)}%`);
    el.style.setProperty("--glare", on ? ".18" : "0");
  };

  const schedule = (next) => {
    pending.current = next;
    if (!raf.current) raf.current = requestAnimationFrame(apply);
  };

  const move = (e) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    schedule({
      rx: -y * 20, // +-10deg at the edges
      ry: x * 20,
      gx: (x + 0.5) * 100,
      gy: (y + 0.5) * 100,
      on: true,
    });
  };

  const leave = () => schedule({ rx: 0, ry: 0, gx: 50, gy: 50, on: false });

  useEffect(() => () => cancelAnimationFrame(raf.current), []);

  return (
    <div
      ref={ref}
      data-reveal
      className="ccard"
      style={{ transitionDelay: `${i * 110}ms`, animationDelay: `${i * 700}ms` }}
      onMouseMove={move}
      onMouseLeave={leave}
    >
      <div className="ccard-inner">
        {art && art.src ? (
          <a className="ccard-link" href={art.href} target="_blank" rel="noopener noreferrer">
            <img className="ccard-img" src={art.src} alt={art.alt} loading="lazy" decoding="async" width="600" height="840" />
          </a>
        ) : (
          /* placeholder until this career's art lands — see MISSING_ART.md */
          <div className="ccard-fallback" style={{ background: c.hue }} aria-hidden="true">
            <svg viewBox="0 0 100 100" className="ccard-svg">
              <circle cx="50" cy="26" r="15" fill={T.cream} />
              <circle cx="50" cy="26" r="10" fill="none" stroke={T.pineDeep} strokeOpacity=".3" strokeWidth="1.5" />
              <path d="M-10,105 L20,66 L45,95 L70,58 L105,100 Z" fill={T.pineDeep} />
            </svg>
          </div>
        )}

        <span className="ccard-glare" aria-hidden="true" />

        <div className="ccard-top mono">
          <span>&#8470; {c.num}</span>
          <span>{c.stat} &#9733;&#9733;&#9733;&#9733;</span>
        </div>

        <div className="ccard-plate" style={{ "--hue": c.hue }}>
          <div className="ccard-role">{c.role}</div>
          <div className="ccard-flavor">{c.flavor}</div>
        </div>
      </div>
    </div>
  );
}

/**
 * The felt mark lands big over the globe and shrinks away as the page scrolls.
 * Scale only, written straight to the node from one rAF, so scrolling never
 * re-renders React and nothing under the mark ever moves: its layout box keeps
 * the size the boot paint reserved for it.
 * MARK_LAND is the scale it starts at; the CSS pop opens from 1/MARK_LAND, which
 * is exactly where first paint drew it, so the pop grows out of the painted
 * frame rather than jumping off it.
 */
const MARK_LAND = 1.7;              // scale at the top of the page
const MARK_REST = 0.85;             // scale once you've scrolled past the hero
const MARK_RUN = 560;               // px of scroll it takes to get there

function useMarkShrink(ref) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    // reduced motion: one fixed size, no pop, no scroll response
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.style.transform = `scale(${MARK_REST})`;
      return;
    }

    let raf = 0;
    let live = true;
    let last = -1;

    const draw = () => {
      raf = 0;
      const p = Math.min(1, Math.max(0, window.scrollY / MARK_RUN));
      const eased = p * p * (3 - 2 * p);          // smoothstep: leaves the big pose gently
      const s = MARK_LAND + (MARK_REST - MARK_LAND) * eased;
      if (Math.abs(s - last) > 0.001) {
        el.style.transform = `scale(${s.toFixed(4)})`;
        last = s;
      }
    };
    const onScroll = () => { if (live && !raf) raf = requestAnimationFrame(draw); };

    // stop reading scroll once the mark is gone from the screen
    const io = new IntersectionObserver(([e]) => {
      live = e.isIntersecting;
      if (live) onScroll();
    }, { threshold: 0 });
    io.observe(el);

    draw();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      io.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [ref]);
}

export default function App() {
  // language choice is shared with the sub pages
  const [lang, setLang] = useState(() => {
    try { return localStorage.getItem("aae-lang") === "es" ? "es" : "en"; } catch { return "en"; }
  });
  useEffect(() => {
    document.documentElement.lang = lang;
    try { localStorage.setItem("aae-lang", lang); } catch {}
  }, [lang]);
  const c = copy[lang];
  useReveal(lang);
  useSunParallax();
  const logoRef = useRef(null);
  useMarkShrink(logoRef);

  return (
    <div className="page">
      <style>{`

        * { margin:0; padding:0; box-sizing:border-box; }
        .page {
          /* organic easing tokens — nothing in this page snaps */
          --ease-settle: cubic-bezier(.22, 1, .36, 1);   /* things land like leaves */
          --ease-drift:  cubic-bezier(.45, 0, .55, 1);   /* loops */
          background:${T.pine}; color:${T.cream};
          font-family:'Bricolage Grotesque', sans-serif;
          overflow-x:hidden; min-height:100vh;
        }

        /* paper-grain overlay: kills the flat-vector feel, costs one layer */
        .grain{
          position:fixed; inset:0; z-index:9999; pointer-events:none;
          opacity:.07; mix-blend-mode:overlay;
          background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.82' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
          background-repeat:repeat;
        }
        /* Seat 3 — dividers draw themselves on as they enter view */
        .draw-on{ stroke-dasharray:2400; stroke-dashoffset:2400; transition:stroke-dashoffset 1.4s var(--ease-settle); }
        .draw-on-b{ transition-delay:.18s; }
        [data-reveal].in .draw-on{ stroke-dashoffset:0; }

        /* Seat 4/11 — the seed mark grows rather than fades */
        .seed-grow{ transform-origin:50% 30%; }
        [data-reveal].divider{ opacity:1; transform:none; }
        [data-reveal].seed-grow{ transform:translateY(24px) scale(.72); }
        [data-reveal].seed-grow.in{ transform:translateY(0) scale(1); }
        .mono { font-family:'Space Mono', monospace; font-size:12px; letter-spacing:.08em; line-height:1.5; }
        .display { font-family:'Anton', sans-serif; text-transform:uppercase; line-height:.92; }

        /* reveal */
        [data-reveal]{ opacity:0; transform:translateY(24px); transition:opacity .78s var(--ease-settle), transform .78s var(--ease-settle); }
        [data-reveal].in{ opacity:1; transform:translateY(0); }
        @media (prefers-reduced-motion: reduce){
          [data-reveal]{ opacity:1; transform:none; transition:none; }
          .hero-word span{ animation:none !important; transform:none !important; opacity:1 !important; }
          .marquee-inner{ animation:none !important; }
          .vinyl-sun{ animation:none !important; }
          .sun-rays{ animation:none !important; }
          .puff{ animation:none !important; }
          /* remaster seats */
          .grain{ display:none; }
          .stars{ animation:none !important; }
          .starfield{ transform:none !important; }
          .earth-vid, .earth-still{ transform:none !important; transition:none !important; }
          .hero-logo-pop{ animation:none !important; transform:none !important; }
          .ccard-inner, .rail-train, .cta-train{ transition:none !important; animation:none !important; transform:none !important; }
          .cta-train{ left:auto !important; right:0 !important; }
          .draw-on{ stroke-dasharray:none !important; stroke-dashoffset:0 !important; transition:none !important; }
          .seed-grow{ opacity:1 !important; transform:none !important; }
          .dv-layer, .dv-tide, .dv-tide-inner{ transform:none !important; }
          .dv-region{ opacity:1 !important; }
          .sm-roots, .sm-pod{ transform:scaleY(1) !important; transition:none !important; }
          .seed-leaves{ transform:none !important; opacity:1 !important; transition:none !important; }
          .seed-sway, .seed-leaves{ animation:none !important; }
          .photoprint, .poster, .panel{ animation:none !important; }
          .cta-train{ animation:none !important; transform:translateX(0) !important; left:auto !important; right:8px !important; }
          .train-puff{ animation:none !important; opacity:0 !important; }
          .train--rail, .cta-train .train{ animation:none !important; }
          /* the record and the pulsing badges stop too */
          .vinyl-disc{ animation:none !important; }
          .boarding-badge, .signal{ animation:none !important; opacity:1 !important; }
          .ccard-glare{ display:none !important; }
        }

        /* nav */
        /* no backing: the nav sits over the hero's starfield, and a bar here cut a line through the
           planet's space. (It scrolls away with the page — .page's overflow keeps sticky from pinning it.) */
        nav{ display:flex; align-items:center; justify-content:space-between; padding:20px clamp(16px,4vw,48px); position:sticky; top:0; z-index:50; background:transparent; }
        /* the hero runs up behind the nav: pulled up 120px (more than the nav is ever tall)
           and given the same 120px back as padding, so nothing below moves */
        main{ margin-top:-120px; }
        .brand{ font-family:'Anton'; font-size:18px; letter-spacing:.06em; }
        .brand b{ color:${T.marigold}; }
        .navr{ display:flex; gap:12px; align-items:center; }
        .lang{ display:flex; border:2px solid ${T.cream}44; border-radius:999px; overflow:hidden; }
        .lang button{ background:none; border:none; color:${T.cream}; font-family:'Space Mono'; font-size:12px; padding:6px 12px; cursor:pointer; }
        .lang button.on{ background:${T.marigold}; color:${T.pineDeep}; font-weight:700; }
        .btn{ display:inline-block; background:${T.coral}; color:${T.pineDeep}; border:none; border-radius:999px; padding:12px 22px; font-family:'Bricolage Grotesque'; font-weight:700; font-size:15px; cursor:pointer; transition:transform .2s var(--ease-settle); box-shadow:0 0 0 0 ${T.coral}55; }
        .btn:hover{ transform:translateY(-3px) rotate(-1deg); box-shadow:0 10px 24px ${T.coral}55; }
        .btn.big{ padding:18px 34px; font-size:18px; }
        .btn.ghost{ background:transparent; color:${T.cream}; border:2px solid ${T.cream}55; box-shadow:none; }
        .btn.ghost:hover{ border-color:${T.marigold}; color:${T.marigold}; }
        a.btn{ text-decoration:none; }
        .hero-accent{ position:relative; z-index:3; font-family:'Anton'; color:${T.marigold}; font-size:clamp(14px,2.2vw,20px); letter-spacing:.14em; margin-top:10px; line-height:26px; min-height:26px; }

        /* hero + vinyl sun */
        .hero{ position:relative; padding:calc(clamp(110px,26vh,250px) + 120px) clamp(16px,4vw,48px) 0; text-align:center;
          background:${T.pine}; overflow:hidden; }
        /* Seat B — starfield behind everything in the hero */
        .starfield{
          position:absolute; inset:0; z-index:0; pointer-events:none; overflow:hidden;
          transform:translate3d(0, var(--star-shift, 0px), 0); will-change:transform;
        }
        .stars{ position:absolute; inset:-25%; background-repeat:repeat; }
        .stars-far{
          opacity:.30;
          background-image:radial-gradient(circle, ${T.cream} 0 1px, transparent 1.4px);
          background-size:132px 132px;
          animation:drift-far 160s linear infinite;
        }
        .stars-near{
          opacity:.42;
          background-image:radial-gradient(circle, ${T.cream} 0 1.5px, transparent 2px);
          background-size:207px 207px;
          animation:drift-near 110s linear infinite;
        }
        @keyframes drift-far{ from{ transform:translate3d(0,0,0); } to{ transform:translate3d(-132px,132px,0); } }
        @keyframes drift-near{ from{ transform:translate3d(0,0,0); } to{ transform:translate3d(207px,207px,0); } }

        /* the mark block: Earth directly behind, extruded logo in front, shared centre */
        .hero-mark{
          position:relative; z-index:4;
          width:min(43vw,248px); aspect-ratio:3908/3556;
          /* bottom margin clears the globe's overhang so it never sits on the kicker */
          margin:0 auto clamp(120px,34vw,258px);
        }
        .earth-wrap{
          position:absolute; left:50%; top:50%;
          width:min(86vw,644px); aspect-ratio:1; z-index:0;
          transform:translate(-50%,-50%) translate3d(0, var(--earth-shift, 0px), 0);
          will-change:transform;
        }
        .earth-vid, .earth-still, .earth-media{
          position:absolute; inset:0; width:100%; height:100%; object-fit:contain; display:block;
        }
        /* Static shadows: a dark contact shadow for weight, cyan for atmosphere.
           Never animated. They sit on their own circle — sized and centred on the
           globe as measured off the poster's alpha (88% across, centre 48.4/50.3)
           — so nothing paints a filter on the <video> or on anything containing
           it. iOS Safari computes such a filter from the rectangle rather than
           the alpha and paints a tinted square behind the transparent corners.
           Painted as gradients rather than a box-shadow: a shadow is clipped hard
           at the edge of the box casting it, and the clip line shows as a drawn
           arc wherever the globe sits inside that box — which it does, since it
           drifts and breathes. A gradient has no edge to expose. */
        .earth-glow{
          position:absolute; inset:0; pointer-events:none;
          background:
            radial-gradient(ellipse 30% 7% at 50% 95%, rgba(0,0,0,.55), rgba(0,0,0,0) 72%),
            radial-gradient(circle at 48.4% 50.3%,
              rgba(111,211,255,0) 0 44%,
              rgba(111,211,255,.52) 47%,
              rgba(111,211,255,.24) 51%,
              rgba(111,211,255,.09) 58%,
              rgba(111,211,255,0) 68%);
        }
        /* The still is frame one and the clip's globe drifts away from it, so once
           the clip is genuinely running the still has to go or its frozen rim and
           halo show along the edge. */
        .earth-still{ transition:opacity .45s ease; }
        .earth-wrap.playing .earth-still{ opacity:0; }
        .earth-vid{ opacity:0; }
        .earth-vid.on{ opacity:1; }

        /* Seat C — the felt mark, in front of the Earth.
           Two nested transforms on purpose: the wrapper plays the landing pop
           once, the image carries the scroll scale from useMarkShrink. Kept apart
           because a running animation outranks an inline style, so sharing one
           node would have the pop freeze the scroll scale at its end value.
           The pop opens at 1/MARK_LAND — the size the boot paint drew — so it
           grows out of first paint instead of snapping to a new size. */
        .hero-logo-pop{
          position:relative; z-index:2; display:block; will-change:transform;
          animation:mark-land 1.05s cubic-bezier(.22,1.08,.36,1) both;
        }
        @keyframes mark-land{
          from{ transform:scale(${(1 / MARK_LAND).toFixed(3)}); }
          to  { transform:none; }
        }
        .hero-logo{ width:100%; height:auto; display:block;
          will-change:transform; filter:drop-shadow(0 10px 22px rgba(0,0,0,.55)); }
          50%    { transform:rotateX(9deg) rotateY(7deg)  translateZ(calc(var(--d) * 2px)) translateY(2px); }
        }

        .hero-eyebrow{ position:relative; z-index:3; color:${T.marigold}; margin-bottom:14px; line-height:18px; min-height:18px; }
        .hero-word{ position:relative; z-index:3; font-size:clamp(32px,6.4vw,86px); color:${T.cream}; max-width:16ch; margin:0 auto; }
        .hero-word.l2{ font-size:clamp(24px,4.6vw,62px); color:${T.marigold}; max-width:22ch; }
        .hero-word span{ display:inline-block; animation:pop .8s cubic-bezier(.2,.9,.3,1.3) both; animation-delay:calc(var(--i, 0) * 70ms); }
        .hero-word.l2 span{ animation-delay:calc(150ms + var(--i, 0) * 70ms); }
        @keyframes pop{ from{ transform:translateY(60px) scale(.9); opacity:0; } to{ transform:none; opacity:1; } }
        .hero-sub{ position:relative; z-index:3; max-width:580px; margin:16px auto 60px; font-size:17px; line-height:1.55; color:${T.cream}dd; }

        /* marquee */
        .marquee{ background:${T.marigold}; color:${T.pineDeep}; overflow:hidden; transform:rotate(-1.5deg) scale(1.02); padding:10px 0; height:56px; }
        .marquee-inner{ display:inline-block; white-space:nowrap; font-family:'Anton'; font-size:22px; line-height:36px; letter-spacing:.1em; animation:slide 35s linear infinite; }
        .marquee:hover .marquee-inner{ animation-play-state:paused; }
        .marquee-unit{ display:inline-flex; align-items:center; }
        .seed-sep{ width:26px; height:31px; margin:0 .5em; flex:none; vertical-align:-6px; }
        .seed-ico{ width:38px; height:38px; }
        /* Seat 4 — seeds grow rather than fade, staggered across the grid */
        [data-reveal].freq .seed-ico{ transform:scale(.6); opacity:0; transition:transform .8s var(--ease-settle), opacity .8s var(--ease-settle); }
        [data-reveal].freq.in .seed-ico{ transform:scale(1); opacity:1; }
        @keyframes slide{ from{ transform:translateX(0); } to{ transform:translateX(-50%); } }

        /* wave→mountain dividers — static, no motion or filters (they read as fuzz) */
        .divider{ position:relative; width:100%; height:clamp(84px,11vw,150px); margin:0 auto; overflow:hidden; line-height:0; }
        /* section bleed: the banner's top and bottom edges fade into whatever section sits beside it */
        .dv-bleed{ position:absolute; inset:0;
          -webkit-mask-image:linear-gradient(to bottom, transparent 0, #000 18%, #000 82%, transparent 100%);
                  mask-image:linear-gradient(to bottom, transparent 0, #000 18%, #000 82%, transparent 100%); }
        .dv-region, .dv-layer, .dv-bob{ position:absolute; inset:0; }
        .dv-layer{ will-change:transform; }
        .dv-img{ position:absolute; inset:0; width:100%; height:100%; object-fit:fill; display:block; }
        /* horizon dissolve: static feathered masks; only the regions' opacity changes on scroll.
           The land region sits underneath and is fully opaque wherever the wave feather thins,
           so at rest the two recombine into the whole painting. */
        .dv-region{ will-change:opacity; }
        .dv-mask-left{ -webkit-mask-image:linear-gradient(to right, #000 41.5%, transparent 56.5%); mask-image:linear-gradient(to right, #000 41.5%, transparent 56.5%); }
        .dv-mask-right-cover{ -webkit-mask-image:linear-gradient(to right, transparent 26.5%, #000 41.5%); mask-image:linear-gradient(to right, transparent 26.5%, #000 41.5%); }
        .dv-mask-right{ -webkit-mask-image:linear-gradient(to right, transparent 43.5%, #000 58.5%); mask-image:linear-gradient(to right, transparent 43.5%, #000 58.5%); }
        .dv-mask-left-cover{ -webkit-mask-image:linear-gradient(to right, #000 58.5%, transparent 73.5%); mask-image:linear-gradient(to right, #000 58.5%, transparent 73.5%); }
        /* tide wipe: a 115%-wide clip with a feathered right edge slides in; its content counter-slides */
        .dv-tide{ position:absolute; top:0; bottom:0; left:0; width:115%; overflow:hidden; will-change:transform;
          -webkit-mask-image:linear-gradient(to right, #000 86.96%, transparent 100%); mask-image:linear-gradient(to right, #000 86.96%, transparent 100%); }
        .dv-tide-inner{ position:absolute; top:0; bottom:0; left:0; width:86.9565%; will-change:transform; }

        /* roots mark */
        .roots{ display:block; width:96px; height:auto; margin:40px auto 0; }

        /* 🌱 germination — the felt art, revealed by scaling mask rects.
           scaleY is a transform, so growth stays on the compositor. */
        .seed{ overflow:visible; }
        .sm-roots, .sm-pod{
          transform-box:fill-box; transform:scaleY(0);
          transition:transform 900ms var(--ease-settle);
        }
        .sm-roots{ transform-origin:50% 0%; }               /* grows downward */
        .sm-pod{ transform-origin:50% 100%; transition-duration:600ms; transition-delay:300ms; }
        .seed.is-grown .sm-roots,
        .seed.is-grown .sm-pod{ transform:scaleY(1); }

        .seed-leaves{
          transform-box:fill-box; transform-origin:50% 100%;
          transform:scale(.4) rotate(-12deg); opacity:0;
          transition:transform 700ms cubic-bezier(.34,1.56,.64,1) 760ms, opacity 300ms linear 760ms;
        }
        .seed.is-grown .seed-leaves{ transform:scale(1) rotate(0deg); opacity:1; }

        /* idle life, once grown */
        .seed.is-grown .seed-sway{
          transform-box:fill-box; transform-origin:50% 100%;
          animation:seed-sway 6s var(--ease-drift) infinite;
        }
        .seed.is-grown .seed-leaves{ animation:leaf-drift 5s var(--ease-drift) infinite 1.6s; }
        @keyframes seed-sway{ 0%,100%{ transform:rotate(-1.5deg); } 50%{ transform:rotate(1.5deg); } }
        @keyframes leaf-drift{ 0%,100%{ transform:rotate(-2deg); } 50%{ transform:rotate(2deg); } }

        /* bullet glyphs germinate in ~450ms */
        .seed--glyph .sm-roots{ transition-duration:200ms; }
        .seed--glyph .sm-pod{ transition-duration:170ms; transition-delay:120ms; }
        .seed--glyph .seed-leaves{ transition-delay:250ms; transition-duration:220ms; }

        /* hover perk */
        .seed:hover .seed-leaves{ animation:leaf-perk 400ms var(--ease-settle); }
        @keyframes leaf-perk{ 50%{ transform:scale(1.04) rotate(4deg); } }

        .seed-sep{ width:20px; height:26px; margin:0 .55em; color:${T.pineDeep}; flex:none; }
        .seed-ico{ width:38px; height:38px; }
        /* Seat 4 — seeds grow rather than fade, staggered across the grid */
        [data-reveal].freq .seed-ico{ transform:scale(.6); opacity:0; transition:transform .8s var(--ease-settle), opacity .8s var(--ease-settle); }
        [data-reveal].freq.in .seed-ico{ transform:scale(1); opacity:1; }
        @keyframes slide{ from{ transform:translateX(0); } to{ transform:translateX(-50%); } }


        /* roots mark */
        .roots{ display:block; width:104px; height:auto; margin:40px auto 0; color:${T.marigold}; }

        /* 🌱 germination — roots down, stem overlapping, leaves last */
        .seed{ overflow:visible; }
        .seed-roots path{
          stroke-dasharray:var(--len,60); stroke-dashoffset:var(--len,60);
          transition:stroke-dashoffset var(--rootMs,900ms) var(--ease-settle);
        }
        #seed-root-1{ --len:34; transition-delay:0ms; }
        #seed-root-2{ --len:42; transition-delay:120ms; }
        #seed-root-3{ --len:32; transition-delay:240ms; }
        .seed.is-grown .seed-roots path{ stroke-dashoffset:0; }

        #seed-hull{ transform-box:fill-box; transform-origin:50% 50%; transform:scale(0); transition:transform 420ms var(--ease-settle); }
        .seed.is-grown #seed-hull{ transform:scale(1); }

        #seed-stem{
          stroke-dasharray:40; stroke-dashoffset:40;
          transition:stroke-dashoffset var(--stemMs,600ms) var(--ease-settle);
          transition-delay:var(--stemDelay,300ms);
        }
        .seed.is-grown #seed-stem{ stroke-dashoffset:0; }

        .seed-leaf{
          transform-box:fill-box; transform-origin:0% 100%;
          transform:scale(.4) rotate(-12deg); opacity:0;
          transition:transform var(--leafMs,700ms) cubic-bezier(.34,1.56,.64,1), opacity 260ms linear;
        }
        #seed-leaf-l{ transition-delay:var(--leafDelay,760ms); }
        #seed-leaf-r{ transform-origin:100% 100%; transition-delay:calc(var(--leafDelay,760ms) + 80ms); }
        .seed.is-grown .seed-leaf{ transform:scale(1) rotate(0deg); opacity:1; }

        /* idle life, only once grown — sway from the base, leaves desynced */
        .seed.is-grown .seed-sway{ transform-box:fill-box; transform-origin:50% 100%; animation:seed-sway 6s var(--ease-drift) infinite; }
        .seed.is-grown #seed-leaf-l{ animation:leaf-l 5s var(--ease-drift) infinite 1.6s; }
        .seed.is-grown #seed-leaf-r{ animation:leaf-r 7s var(--ease-drift) infinite 1.6s; }
        @keyframes seed-sway{ 0%,100%{ transform:rotate(-1.5deg); } 50%{ transform:rotate(1.5deg); } }
        @keyframes leaf-l{ 0%,100%{ transform:rotate(-2deg); } 50%{ transform:rotate(2deg); } }
        @keyframes leaf-r{ 0%,100%{ transform:rotate(2deg); } 50%{ transform:rotate(-2deg); } }

        /* bullet glyphs germinate in 450ms total */
        .seed--glyph{ --rootMs:200ms; --stemMs:160ms; --stemDelay:120ms; --leafMs:220ms; --leafDelay:230ms; }

        /* hover perk */
        .freq:hover .seed-leaf, .seed:hover .seed-leaf{ animation:leaf-perk 400ms var(--ease-settle); }
        @keyframes leaf-perk{ 50%{ transform:scale(1) rotate(4deg); } }

        /* climbing train rail */
        /* the rail rides the right gutter; the train grows with the space it has, never onto content */
        .rail{ --railW:clamp(56px, calc((100vw - 1100px) / 2 - 28px), 132px);
          position:fixed; right:max(14px, calc(((100vw - 1100px) / 2 - var(--railW)) / 2)); top:80px; bottom:20px;
          width:var(--railW); z-index:40; pointer-events:none; }
        .rail-track{ position:absolute; left:50%; top:0; bottom:0; width:0; border-left:3px dashed ${T.cream}33; transform:translateX(-50%); }
        .rail-train{ position:absolute; left:50%; top:0; display:flex; flex-direction:column; align-items:center;
          transform:translateX(-50%) translateY(var(--y, 0px)) rotate(var(--climb, 0deg));
          transition:transform .3s var(--ease-settle); will-change:transform; }
        .rail-train.settling{ transform:translateX(-50%) translateY(var(--y, 0px)) rotate(calc(var(--climb, 0deg) * .4)); }
        /* 🚂 shared train layers */
        .train{ position:relative; display:block; line-height:0; }
        /* the art faces left and every variant travels right/up, so the whole stack is mirrored */
        .train-stack{ position:relative; transform:scaleX(-1); }
        /* shadows sit on each layer, not on the stack: a filter on a transformed stack whose
           children are composited gets clipped to a hard rectangle in Chrome */
        .train-body, .train-wheel{ filter:drop-shadow(0 3px 7px #0009); }
        .train-body{ width:100%; height:auto; display:block; }
        .train-wheel{ position:absolute; height:auto; aspect-ratio:1; }
        .train-steam{ position:absolute; inset:0; width:100%; height:100%; overflow:visible; pointer-events:none; }
        .train-puff{
          fill:${T.cream}; opacity:0; transform-box:fill-box; transform-origin:50% 50%;
          transform:scale(.6); will-change:transform, opacity;
        }
        .train.is-steaming .train-puff{
          animation:train-puff var(--puffCycle,1s) linear infinite;
          animation-delay:calc(var(--i) * (var(--puffCycle,1s) / 5));
        }
        @keyframes train-puff{
          0%   { opacity:0;   transform:translate(0,0) scale(.6); }
          22%  { opacity:.8;  }
          100% { opacity:0;   transform:translate(30px,-60px) scale(1.4); }
        }

        /* rail companion */
        .train--rail{ width:var(--railW, 56px); }
        .rail-train.moving .train--rail{ animation:chug .125s steps(2,end) infinite; }
        @keyframes chug{ 0%,100%{ transform:translateY(-1px); } 50%{ transform:translateY(1px); } }
        .rail-train.settling .train--rail{ animation:none; }
        .train--rail.is-arrived{ animation:arrive-bob 1.1s var(--ease-settle) 1; }
        @keyframes arrive-bob{ 0%,100%{ transform:translateY(0); } 40%{ transform:translateY(-5px); } }

        /* CTA crossing */
        /* steam stays inside the marigold band */
        .train--crossing.is-steaming .train-puff{ animation-name:train-puff-short; }
        @keyframes train-puff-short{
          0%   { opacity:0;   transform:translate(0,0) scale(.6); }
          22%  { opacity:.8;  }
          100% { opacity:0;   transform:translate(22px,-34px) scale(1.3); }
        }
        .train--crossing{ width:clamp(140px, 22vw, 250px); }

        .rail-label{ writing-mode:vertical-rl; font-size:9px; color:${T.marigold}; margin-top:6px; letter-spacing:.2em; }
        .puff{ animation:puff 2.2s ease-in-out infinite; transform-origin:center; }
        .puff.p2{ animation-delay:.4s; } .puff.p3{ animation-delay:.9s; }
        @keyframes puff{ 0%{ transform:translateY(0) scale(1); opacity:.8; } 100%{ transform:translateY(-10px) scale(1.5); opacity:0; } }
        @media (max-width: 900px){ .rail{ display:none; } }

        /* sections */
        section{ padding:clamp(60px,10vh,110px) clamp(16px,4vw,48px); max-width:1100px; margin:0 auto; }
        .label{ color:${T.marigold}; margin-bottom:14px; display:block; }
        h2.display{ font-size:clamp(34px,6vw,72px); margin-bottom:20px; }
        .lede{ font-size:18px; line-height:1.6; max-width:640px; color:${T.cream}dd; }
        .tags{ display:flex; gap:10px; flex-wrap:wrap; margin-top:26px; }
        /* the lede runs the full measure where a section has no column beside it */
        .lede.wide{ max-width:900px; }
        /* a subhead inside a section: quieter than the section's own h2 */
        .subhead{ margin-top:clamp(46px,7vh,78px); }
        .subhead h3.display{ font-size:clamp(26px,3.6vw,42px); margin-bottom:14px; }
        .subhead .label{ margin-bottom:10px; }
        .section-cta{ margin-top:clamp(28px,4vh,42px); }
        /* the visual that carries an engine section */
        .engine-art{ margin:clamp(28px,4vh,44px) 0 0; }
        .engine-art img{ width:100%; height:auto; aspect-ratio:16/9; object-fit:cover; display:block; border-radius:20px;
          border:6px solid ${T.cream}; box-shadow:0 22px 50px #0009; transform:rotate(-.5deg); }
        .ytframe{ position:relative; aspect-ratio:16/9; border-radius:20px; overflow:hidden;
          border:6px solid ${T.cream}; box-shadow:0 22px 50px #0009; background:#000; transform:rotate(-.4deg); }
        .ytframe iframe, .ytfacade, .ytfacade img{ position:absolute; inset:0; width:100%; height:100%; border:0; display:block; }
        .ytfacade{ cursor:pointer; background:#000; padding:0; }
        .ytfacade img{ object-fit:cover; transition:transform .5s var(--ease-settle), filter .5s; }
        .ytfacade:hover img{ transform:scale(1.03); filter:brightness(.85); }
        .ytplay{ position:absolute; left:50%; top:50%; width:92px; height:92px; margin:-46px 0 0 -46px; border-radius:50%;
          background:${T.coral}; color:${T.pineDeep}; font-size:34px; display:grid; place-items:center; padding-left:6px; box-shadow:0 10px 30px #0008; }
        @media (max-width:560px){ .ytplay{ width:60px; height:60px; margin:-30px 0 0 -30px; font-size:22px; } .ytframe{ border-width:4px; } }
        .tag{ border:1.5px solid ${T.marigold}88; color:${T.marigold}; border-radius:999px; padding:7px 14px; font-family:'Space Mono'; font-size:12px; }

        /* frequencies */
        .freqs{ display:grid; grid-template-columns:repeat(auto-fit,minmax(220px,1fr)); gap:16px; margin-top:36px; }
        .freq{ position:relative; display:block; text-decoration:none; color:inherit; border:2px solid ${T.cream}2b; border-radius:16px; padding:22px; transition:border-color .25s, transform .25s; }
        .freq:focus-visible{ outline:3px solid ${T.sky}; outline-offset:3px; }
        .freq:hover{ border-color:${T.marigold}; transform:translateY(-4px); }
        .freq.lead{ border-color:${T.marigold}; background:${T.marigold}14; }
        .freq .ico{ font-size:30px; }
        .freq h3{ font-family:'Anton'; font-size:18px; margin:10px 0 6px; letter-spacing:.03em; }
        .freq p{ font-size:14px; line-height:1.5; color:${T.cream}bb; }
        .boarding-badge{ position:absolute; top:-12px; right:14px; background:${T.coral}; color:${T.cream}; font-family:'Space Mono'; font-size:10px; letter-spacing:.12em; padding:5px 10px; border-radius:999px; animation:blink 1.6s ease-in-out infinite; }
        @keyframes blink{ 0%,100%{ opacity:1; } 50%{ opacity:.55; } }
        .boarding-strip{ display:flex; align-items:center; gap:12px; margin-bottom:8px; }
        .signal{ width:12px; height:12px; border-radius:50%; background:${T.coral}; animation:blink 1.6s ease-in-out infinite; }

        /* comic panels */
        .panels{ display:grid; grid-template-columns:repeat(auto-fit,minmax(240px,1fr)); gap:18px; margin-top:24px; }
        /* Seat 6 — deal the panels in like comic pages */
        .panel{ position:relative; transition:transform .5s var(--ease-settle); will-change:transform; }
        .panel::before{
          content:""; position:absolute; inset:0; pointer-events:none; opacity:.07; border-radius:inherit;
          background-image:radial-gradient(currentColor 1px, transparent 1.1px);
          background-size:6px 6px;
        }
        .panel:nth-child(1){ transform:rotate(-1.5deg); }
        .panel:nth-child(2){ transform:rotate(.8deg); }
        .panel:nth-child(3){ transform:rotate(-.6deg); }
        [data-reveal].panel{ transform:translateY(24px) rotate(4deg); }
        [data-reveal].panel.in:nth-child(1){ transform:translateY(0) rotate(-1.5deg); }
        [data-reveal].panel.in:nth-child(2){ transform:translateY(0) rotate(.8deg); }
        [data-reveal].panel.in:nth-child(3){ transform:translateY(0) rotate(-.6deg); }
        .panel{ background:${T.cream}; color:${T.pineDeep}; border-radius:18px; padding:26px 22px; border:3px solid ${T.pineDeep}; box-shadow:8px 8px 0 ${T.coral}; transition:transform .25s var(--ease-settle); }
        .panel:hover{ transform:translate(-4px,-10px) rotate(-.5deg); box-shadow:14px 14px 0 ${T.coral}; }
        .panel h3{ font-family:'Anton'; font-size:30px; margin-bottom:10px; }
        .panel:nth-child(2){ box-shadow:8px 8px 0 ${T.marigold}; }
        .panel:nth-child(2):hover{ box-shadow:14px 14px 0 ${T.marigold}; }
        .panel:nth-child(3){ box-shadow:8px 8px 0 ${T.sky}; }
        .panel:nth-child(3):hover{ box-shadow:14px 14px 0 ${T.sky}; }
        .panel p{ line-height:1.55; font-size:15px; }

        /* trading cards */
        .cards{ display:grid; grid-template-columns:repeat(auto-fit,minmax(170px,1fr)); gap:18px; margin-top:28px; }
        /* five careers deal as one row on desktop rather than 4 + an orphan */
        @media (min-width:1000px){ .cards{ grid-template-columns:repeat(5,1fr); } }
        .ccard{ perspective:900px; }
        .ccard-inner{
          position:relative; aspect-ratio:2 / 2.8; border-radius:18px; overflow:hidden;
          border:2px solid ${T.marigold}; background:${T.pineDeep};
          transform:rotateX(var(--rx,0deg)) rotateY(var(--ry,0deg));
          transition:transform .5s var(--ease-settle); will-change:transform;
          box-shadow:0 14px 34px #0007;
        }
        .ccard:hover .ccard-inner{ transition:transform .08s linear; }
        .ccard-link{ position:absolute; inset:0; display:block; }
        .ccard-img{ position:absolute; inset:0; width:100%; height:100%; object-fit:cover; object-position:50% 18%; display:block; }
        .ccard-fallback{ position:absolute; inset:0; }
        .ccard-svg{ position:absolute; inset:0; width:100%; height:100%; }

        /* glare sweep — position tracks the tilt, capped at .18 */
        .ccard-glare{
          position:absolute; inset:0; pointer-events:none; opacity:var(--glare,0);
          transition:opacity .4s var(--ease-drift);
          background:radial-gradient(circle at var(--gx,50%) var(--gy,50%), #fff 0%, #fff6 28%, transparent 62%);
          mix-blend-mode:screen;
        }

        .ccard-top{
          position:absolute; top:0; left:0; right:0; display:flex; justify-content:space-between;
          padding:9px 11px; font-weight:700; color:${T.cream}; font-size:11px;
          background:linear-gradient(${T.pineDeep}cc, transparent); pointer-events:none;
        }
        .ccard-plate{
          position:absolute; left:0; right:0; bottom:0; padding:14px 13px 13px;
          background:linear-gradient(transparent, ${T.pineDeep}e8 34%, ${T.pineDeep});
          border-top:2px solid var(--hue, ${T.marigold}); pointer-events:none;
        }
        .ccard-role{ font-family:'Anton'; font-size:19px; line-height:1.05; color:${T.cream}; }
        .ccard-flavor{ font-size:12.5px; margin-top:5px; opacity:.82; line-height:1.35; color:${T.cream}; }

        /* entrance: cards fan out of a 12px overlap into final spacing */
        [data-reveal].ccard{ transform:translateY(24px) translateX(-12px) rotate(-3deg); }
        [data-reveal].ccard.in{ transform:translateY(0) translateX(0) rotate(0deg); }

        /* touch devices get a slow idle float instead of cursor tilt */
        @media (hover:none){
          .ccard-inner{ animation:cardfloat 6s var(--ease-drift) infinite; }
          .ccard-glare{ display:none; }
        }
        @keyframes cardfloat{ 0%,100%{ transform:translateY(-4px); } 50%{ transform:translateY(4px); } }

        /* Seat 5 — pitch copy beside pinned-poster feature art */
        .feature{ display:grid; grid-template-columns:1fr; gap:30px; align-items:start; }
        @media (min-width:860px){ .feature{ grid-template-columns:55% 45%; gap:38px; } }
        .poster{
          background:${T.cream}; padding:12px 12px 14px; border-radius:6px;
          transform:rotate(2deg) scale(var(--poster-scale,1));
          box-shadow:0 20px 44px #0008; line-height:0;
          transition:transform .9s var(--ease-settle);
          will-change:transform;
        }
        [data-reveal].poster{ --poster-scale:1.05; }
        [data-reveal].poster.in{ --poster-scale:1; }
        .poster img{ width:100%; height:auto; display:block; border-radius:3px; }

        /* Seat 8 — the felt raccoon, framed like a photo print */
        .photoprint{ margin-top:clamp(16px,2.5vh,26px);
          margin-top:34px; background:${T.cream}; padding:14px 14px 10px; border-radius:8px;
          transform:rotate(-1deg); box-shadow:0 18px 40px #0007;
          animation:printfloat 7s var(--ease-drift) infinite; will-change:transform;
        }
        .photoprint img, .photoprint video{ width:100%; height:clamp(180px,26vw,300px); object-fit:cover; display:block; border-radius:4px; }
        .photoprint figcaption{ color:${T.pineDeep}; text-align:center; padding-top:10px; font-size:11px; letter-spacing:.1em; }
        @keyframes printfloat{ 0%,100%{ transform:rotate(-1deg) translateY(-3px); } 50%{ transform:rotate(-1deg) translateY(3px); } }

        .collage{ display:grid; grid-template-columns:repeat(3,1fr); gap:10px; margin-top:clamp(34px,5vh,56px); }
        .polaroid{
          position:relative; line-height:0; overflow:hidden;
          background:${T.cream}; border:7px solid ${T.cream}; border-bottom-width:20px; border-radius:3px;
          box-shadow:0 10px 22px #0007;
        }
        .polaroid video, .polaroid img{ width:100%; height:clamp(90px,13vw,150px); object-fit:cover; display:block; }
        .polaroid:nth-child(1){ transform:rotate(-3deg); }
        .polaroid:nth-child(2){ transform:rotate(1.5deg); }
        .polaroid:nth-child(3){ transform:rotate(-1deg); }
        /* fade mode: the first frame fades in over the clip's tail, then drops instantly */
        .felt-fade{ position:absolute; inset:0; width:100%; height:100%; object-fit:cover; opacity:0; pointer-events:none; }
        .felt-fade.on{ opacity:1; transition:opacity 1s linear; }
        .sr-only{ position:absolute; width:1px; height:1px; overflow:hidden; clip:rect(0 0 0 0); white-space:nowrap; }

        /* Seat 9 — the train crosses the CTA band once, on first reveal */
        /* clip only sideways (the train enters and leaves off the band's edges); steam and
           shadow may rise above the strip. Browsers without overflow:clip fall back to hidden. */
        .crossing{ position:relative; height:clamp(112px, 17vw, 192px); margin:0 0 18px; overflow:hidden; overflow-x:clip; overflow-y:visible; }
        .crossing-track{ position:absolute; left:0; right:0; bottom:6px; width:100%; height:4px; }
        /* position is written by CtaCrossing from scroll; parked off the left edge until then */
        .cta-train{ position:absolute; bottom:6px; left:0; line-height:0; will-change:transform; transform:translate3d(-110%,0,0); }
        /* it faces its direction of travel; the turn is a quick flip through its axis */
        .cta-face{ display:block; transition:transform .22s var(--ease-settle); }
        .cta-face.is-reversed{ transform:scaleX(-1); }
        .cta-train.is-moving .cta-face > .train{ animation:chug .125s steps(2,end) infinite; }
        /* idling when the page stops: a gentle rock, and the steam keeps puffing */
        .cta-train .train{ transform-origin:50% 90%; animation:rock 1.2s ease-in-out infinite; }
        @keyframes rock{ 0%,100%{ transform:rotate(-1.5deg); } 50%{ transform:rotate(1.5deg); } }


        /* proof */
        .proof{ display:grid; grid-template-columns:repeat(auto-fit,minmax(240px,1fr)); gap:2px; margin-top:36px; border:2px solid ${T.cream}33; border-radius:18px; overflow:hidden; }
        .proof > div{ background:${T.pineDeep}; padding:26px 22px; }
        .proof h3{ font-family:'Anton'; font-size:19px; color:${T.marigold}; margin-bottom:8px; letter-spacing:.03em; }
        .proof p{ font-size:14.5px; line-height:1.55; color:${T.cream}cc; }

        /* CTA */
        .ctaband{ background:${T.marigold}; color:${T.pineDeep}; text-align:center; border-radius:26px; max-width:1100px; margin:0 auto 80px; padding:clamp(50px,8vh,90px) 24px; transform:rotate(-.6deg); }
        .ctaband h2{ font-size:clamp(34px,6vw,66px); }
        .ctaband p{ margin:16px 0 26px; font-size:17px; font-weight:600; }
        .ctaband .mono{ display:block; margin-top:16px; opacity:.75; }
        .ctaband .btn{ background:${T.pineDeep}; color:${T.cream}; }
        .cta-stamp{ font-size:clamp(20px,3.4vw,34px); color:${T.pineDeep}; letter-spacing:.06em; margin-bottom:6px; opacity:.9; }

        footer .roots{ width:56px; margin:0 auto 10px; }
        .footer-give{ margin-top:10px; }
        .footer-social{ margin-top:6px; }
        footer a{ color:${T.marigold}; text-decoration:none; border-bottom:1px solid ${T.marigold}66; }
        footer a:hover{ border-bottom-color:${T.marigold}; }
        footer{ text-align:center; padding:30px; font-family:'Space Mono'; font-size:12px; color:${T.cream}88; letter-spacing:.12em; }
      `}</style>

      <div className="grain" aria-hidden="true" />

      <ClimbingTrain />

      <nav>
        <div className="brand">ALL ABOARD <b>EARTH</b></div>
        <div className="navr">
          <div className="lang">
            <button className={lang === "en" ? "on" : ""} onClick={() => setLang("en")}>EN</button>
            <button className={lang === "es" ? "on" : ""} onClick={() => setLang("es")}>ES</button>
          </div>
          <a className="btn" href={LINKS.demoMail}>{c.nav_cta}</a>
        </div>
      </nav>

      <main>
      {/* HERO — THE MOVEMENT */}
      <header className="hero">
        <Starfield />
        <div className="hero-mark">
          <FeltEarth />
          <div className="hero-logo-pop">
            <img
              ref={logoRef}
              className="hero-logo"
              src="/art/felt-logo-1200.webp"
              srcSet="/art/felt-logo-600.webp 600w, /art/felt-logo-900.webp 900w, /art/felt-logo-1200.webp 1200w"
              sizes="min(73vw, 422px)"
              alt="All Aboard Earth"
              width="1200"
              height="1092"
              fetchPriority="high"
              decoding="async"
            />
          </div>
        </div>
        <div className="mono hero-eyebrow">{c.hero_eyebrow}</div>
        <KineticLine text={c.hero_line1} />
        <KineticLine text={c.hero_line2} className="l2" />
        <div className="hero-accent">{c.hero_accent}</div>
        <p className="hero-sub">{c.hero_sub}</p>
      </header>

      <div className="marquee">
        <div className="marquee-inner">
          {Array.from({ length: 6 }).map((_, i) => (
            <span key={i} className="marquee-unit">
              {c.marquee_phrase}
              <Seed className="seed-sep" variant="glyph" />
            </span>
          ))}
        </div>
      </div>

      {/* TRACK 01 — THE MOVEMENT */}
      <section>
        <span className="mono label" data-reveal>{c.t1_label}</span>
        <h2 className="display" data-reveal>{c.t1_head}</h2>
        <p className="lede" data-reveal>{c.t1_sub}</p>
        <div className="freqs">
          {c.freqs.map(([ico, h, p, lead], i) => (
            <a className={"freq" + (lead ? " lead" : "")} href={ENGINE_LINKS[i]} data-reveal key={h} style={{ transitionDelay: `${i * 90}ms` }}>
              {lead && <span className="boarding-badge">{c.boarding}</span>}
              <div className="ico">{ico}</div>
              <h3>{h}</h3>
              <p>{p}</p>
            </a>
          ))}
        </div>
        <RootsMark />
      </section>

      <WaveMountainDivider />

      {/* COOL CAREERS — one unified section: the pitch, the cards, how it plays,
          the felt crew, and the way in. Runs full width; no poster beside it. */}
      <section id="cool-careers">
        <div className="boarding-strip" data-reveal>
          <span className="signal" />
          <span className="mono label" style={{ marginBottom: 0 }}>{c.t2_label}</span>
        </div>
        <h2 className="display" data-reveal>{c.t2_head}</h2>
        <p className="lede wide" data-reveal>{c.t2_body}</p>
        <div className="tags" data-reveal>
          {c.t2_tags.map((t) => <span className="tag" key={t}>{t}</span>)}
        </div>

        {/* collect your future */}
        <div className="subhead" data-reveal>
          <span className="mono label">{c.t4_label}</span>
          <h3 className="display">{c.t4_head}</h3>
          <p className="lede wide">{c.t4_sub}</p>
        </div>
        <div className="cards">
          {c.cards.map((card, i) => <CareerCard c={card} i={i} art={CARD_ART[i]} key={card.role} />)}
        </div>

        {/* play. learn. launch. */}
        <div className="subhead" data-reveal>
          <span className="mono label">{c.t3_label}</span>
          <h3 className="display">{c.t3_head}</h3>
        </div>
        <div className="panels">
          {c.t3_cards.map((p, i) => (
            <div className="panel" data-reveal key={p.n} style={{ transitionDelay: `${i * 100}ms` }}>
              <h3>{p.n}</h3>
              <p>{p.d}</p>
            </div>
          ))}
        </div>

        {/* the felt crew, then the way in */}
        <div className="collage" data-reveal aria-hidden="true">
          {FELT_WALL.map((f) => (
            <FeltLoop key={f.name} className="polaroid" name={f.name} width="520" height={f.h} mode={f.mode} />
          ))}
        </div>
        <div className="section-cta" data-reveal>
          <a className="btn big" href={LINKS.gamePortal}>{c.cc_btn}</a>
        </div>
        <RootsMark />
      </section>

      <WaveMountainDivider flip />

      {/* ENVIRONMENTAL EDUTAINMENT */}
      <section id="edutainment">
        <span className="mono label" data-reveal>{c.ed_label}</span>
        <h2 className="display" data-reveal>{c.ed_head}</h2>
        <p className="lede wide" data-reveal>{c.ed_sub}</p>
        <div className="engine-art" data-reveal>
          <YouTubeFacade id="LYdnsE1jmn0" title={c.ed_video} label={c.ed_play} poster="/art/edutainment/upwego-video.webp" />
        </div>
        <div className="section-cta" data-reveal>
          <a className="btn big" href={LINKS.edutainment}>{c.ed_btn}</a>
        </div>
        <RootsMark />
      </section>

      <WaveMountainDivider />

      {/* REGENERATIVE ART */}
      <section id="regenerative-art">
        <span className="mono label" data-reveal>{c.ra_label}</span>
        <h2 className="display" data-reveal>{c.ra_head}</h2>
        <p className="lede wide" data-reveal>{c.ra_sub}</p>
        <figure className="engine-art" data-reveal>
          <img src="/art/regen-art/mural-2-1400.webp" srcSet="/art/regen-art/mural-2-700.webp 700w, /art/regen-art/mural-2-1400.webp 1200w"
               sizes="(max-width: 1100px) 100vw, 1000px" alt={c.ra_alt} loading="lazy" decoding="async" width="1200" height="800" />
        </figure>
        <figure className="photoprint" data-reveal>
          {/* the meditating Earth, ping-pong looped; phones get the lighter encode */}
          <FeltLoop name="felt-8" dir="frame" sm width="1600" height="800" alt="A felt Earth meditating on a flowering island beneath soft felt clouds" />
          <figcaption className="mono">{c.ra_caption}</figcaption>
        </figure>
        <div className="section-cta" data-reveal>
          <a className="btn big" href={LINKS.regenArt}>{c.ra_btn}</a>
        </div>
        <RootsMark />
      </section>

      <WaveMountainDivider flip />

      {/* TRACK 05 — THE PROOF */}
      <section>
        <span className="mono label" data-reveal>{c.t5_label}</span>
        <h2 className="display" data-reveal>{c.t5_head}</h2>
        <div className="proof" data-reveal>
          {c.t5_points.map(([h, p]) => (
            <div key={h}><h3>{h}</h3><p>{p}</p></div>
          ))}
        </div>
        <RootsMark />
      </section>

      {/* CTA */}
      <div style={{ padding: "0 16px" }}>
        <div className="ctaband" data-reveal>
          <CtaCrossing trackColor={T.pineDeep} />
          <div className="cta-stamp display">{c.cta_stamp}</div>
          <h2 className="display">{c.cta_head}</h2>
          <p>{c.cta_sub}</p>
          <a className="btn big" href={LINKS.demoMail}>{c.cta_btn}</a>
          <span className="mono">{c.cta_alt}</span>
        </div>
      </div>

      </main>

      <footer>
        <RootsMark />
        <div>{c.footer}</div>
        <p className="footer-give">
          {c.give}{" "}
          <a href="https://www.tessafoundation.org/donate" target="_blank" rel="noopener noreferrer">
            Tessa Foundation
          </a>
        </p>
        <p className="footer-social">
          <a href="https://www.instagram.com/allaboardearth" target="_blank" rel="noopener noreferrer">@allaboardearth</a>
        </p>
      </footer>
    </div>
  );
}
