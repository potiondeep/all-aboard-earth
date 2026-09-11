import React, { useState, useEffect, useRef } from "react";

import { cardArt, CAREER_PAGE } from "./wixCardArt.js";
import sceneGreenCareers from "./assets/scenes/green-careers.webp";
import sceneEarthRests from "./assets/scenes/earth-rests.webp";
import sceneRaccoon from "./assets/scenes/felt-raccoon.webp";
import sceneWindMonkey from "./assets/scenes/felt-wind-monkey.webp";
import dividerA from "./assets/marks/divider-wave-mountain-a.webp";
import dividerB from "./assets/marks/divider-wave-mountain-b.webp";
import climbingTrainArt from "./assets/marks/climbing-train.webp";
import seedMarkArt from "./assets/marks/seed-mark.webp";

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

const T = {
  pine: "#0E2A1B",
  pineDeep: "#081D12",
  cream: "#FFF4DF",
  marigold: "#FFB53C",
  coral: "#FF5C39",
  sky: "#6FD3FF",
  leaf: "#3FA968",
};

// Phase 2: the pilot-demo CTAs now point at a real Wix Bookings service
// (School Performance, serviceId 9ef0367c-376f-46b3-8589-e68e6d58af21).
// Wix owns the calendar, confirmations and payments; this site stays static.
// The earlier /contact placeholder was a 404 — never point a CTA there again.
const LINKS = {
  coolCareers: "#cool-careers",
  booking: "https://www.allaboardearth.com/service-page/school-performance",
  grooves: "https://www.allaboardearth.com/grooves",
};

// Seat 4 — one hue per frequency cell (declared after T)
const FREQ_HUES = [T.marigold, T.coral, T.sky, T.leaf];

const copy = {
  en: {
    nav_cta: "Book a pilot demo",
    hero_eyebrow: "ALL ABOARD EARTH · A MOVEMENT WITH A SOUNDTRACK",
    hero_line1: "UP",
    hero_line2: "WE GO!",
    hero_accent: "¡ARRIBA VAMOS!",
    hero_sub:
      "A regenerative hip-hop movement — music that plants seeds, lifts communities, and puts the next generation on board for a thriving planet.",
    hero_cta: "🚂 Hop on — now boarding",
    hero_cta2: "Feel the vibe →",
    marquee: "UP WE GO! · UP WE GO! · ",
    marquee_phrase: "UP WE GO!",
    t1_label: "TRACK 01 · THE MOVEMENT",
    t1_head: "ONE MOVEMENT. FOUR FREQUENCIES.",
    t1_sub:
      "All Aboard Earth broadcasts the same signal through four channels — music, stories, play, and product. Different frequencies, one groove: heal the planet, lift the people.",
    freqs: [
      ["🎮", "Cool Careers", "Game-powered pathways into the green economy — the flagship, boarding now.", true],
      ["🎤", "Regenerative Hip-Hop", "Live shows that turn assemblies and arenas into anthems.", false],
      ["📺", "Animated Series", "Felt-world stories that make ecology unforgettable.", false],
      ["🧵", "Regen Product Line", "Regeneratively grown threads + woven felt characters.", false],
    ],
    boarding: "NOW BOARDING",
    t2_label: "TRACK 02 · NOW BOARDING",
    t2_head: "COOL CAREERS",
    t2_body:
      "The clean economy is opening millions of doors this decade — solar fields, watersheds, smart grids, living soil. Cool Careers is our game-powered journey that gives students the front-row seat and the backstage pass. First stop: your school.",
    t2_tags: ["CTE-aligned", "Middle + High School", "Bilingual EN/ES", "Game-based"],
    t3_label: "TRACK 03 · HOW IT PLAYS",
    t3_head: "PLAY. LEARN. LAUNCH.",
    t3_cards: [
      { n: "PLAY", d: "Students run story-driven missions — restore a watershed, power a block, grow a food forest. Real stakes, game energy." },
      { n: "LEARN", d: "Every mission maps to CTE standards and real green-career skills. The fun IS the curriculum, not a break from it." },
      { n: "LAUNCH", d: "Missions unlock pathways: certifications, mentors, and local partners. From controller to career." },
    ],
    t4_label: "TRACK 04 · MEET THE CREW",
    t4_head: "COLLECT YOUR FUTURE",
    t4_sub: "Every career is a character. Every character is a doorway. (Go ahead — pick them up.)",
    cards: [
      { role: "SOLAR TECHNICIAN", stat: "SUN PWR", num: "07", flavor: "Catches daylight, feeds the grid.", hue: T.marigold },
      { role: "WATERSHED SPECIALIST", stat: "FLOW", num: "12", flavor: "Keeps the acequias singing.", hue: T.sky },
      { role: "SOIL MICROBIOLOGIST", stat: "ROOTS", num: "03", flavor: "Reads the ground like liner notes.", hue: T.leaf },
      { role: "AQUAPONICS TECH", stat: "CYCLE", num: "15", flavor: "Fish feed the greens, greens clean the water.", hue: T.cream },
      { role: "WIND TECHNICIAN", stat: "LIFT", num: "21", flavor: "Climbs towers, harvests sky.", hue: T.coral },
    ],
    t5_label: "TRACK 05 · THE PROOF",
    t5_head: "BORN IN NEW MEXICO. READY FOR YOUR DISTRICT.",
    t5_points: [
      ["Pilot-ready", "Proposals in motion with Santa Fe & Albuquerque public schools for the coming academic year."],
      ["Standards-aligned", "Mapped to CTE pathways so it plugs into what you already teach — no bolt-on chaos."],
      ["Bilingual by design", "Full English / Spanish delivery, because the movement speaks both."],
      ["Culture included", "Live regenerative hip-hop assemblies turn launch day into the loudest field trip of the year."],
    ],
    cta_head: "PUT YOUR SCHOOL ON THE MAP.",
    cta_sub: "Thirty groovy minutes. One demo. Your students' new favorite class.",
    cta_btn: "Book a pilot demo",
    cta_alt: "or say hola: hello@allaboardearth.com",
    footer: "ALL ABOARD EARTH · UP WE GO! 🌱",
    give: "Donations are held for us by our fiscal sponsor,",
  },
  es: {
    nav_cta: "Reserva una demo",
    hero_eyebrow: "ALL ABOARD EARTH · UN MOVIMIENTO CON BANDA SONORA",
    hero_accent: "UP WE GO!",
    hero_line1: "¡ARRIBA",
    hero_line2: "VAMOS!",
    hero_sub:
      "Un movimiento de hip-hop regenerativo — música que siembra semillas, levanta comunidades y sube a la próxima generación a bordo rumbo a un planeta próspero.",
    hero_cta: "🚂 Súbete — estamos abordando",
    hero_cta2: "Siente la vibra →",
    marquee: "¡ARRIBA VAMOS! · UP WE GO! · ¡ARRIBA VAMOS! · UP WE GO! · ",
    marquee_phrase: "¡ARRIBA VAMOS!",
    t1_label: "PISTA 01 · EL MOVIMIENTO",
    t1_head: "UN MOVIMIENTO. CUATRO FRECUENCIAS.",
    t1_sub:
      "All Aboard Earth transmite la misma señal por cuatro canales — música, historias, juego y producto. Distintas frecuencias, un solo groove: sanar el planeta, elevar a la gente.",
    freqs: [
      ["🎮", "Cool Careers", "Rutas en modo videojuego hacia la economía verde — la nave insignia, abordando ahora.", true],
      ["🎤", "Hip-Hop Regenerativo", "Shows en vivo que convierten asambleas y arenas en himnos.", false],
      ["📺", "Serie Animada", "Historias de fieltro que hacen inolvidable la ecología.", false],
      ["🧵", "Línea Regenerativa", "Textiles regenerativos + personajes de fieltro tejido.", false],
    ],
    boarding: "ABORDANDO",
    t2_label: "PISTA 02 · ABORDANDO AHORA",
    t2_head: "COOL CAREERS",
    t2_body:
      "La economía limpia abre millones de puertas esta década — campos solares, cuencas, redes inteligentes, suelo vivo. Cool Careers es nuestro viaje en modo videojuego que da a tus estudiantes el asiento de primera fila y el pase tras bastidores. Primera parada: tu escuela.",
    t2_tags: ["Alineado con CTE", "Secundaria + Prepa", "Bilingüe EN/ES", "Basado en juego"],
    t3_label: "PISTA 03 · CÓMO SE JUEGA",
    t3_head: "JUEGA. APRENDE. DESPEGA.",
    t3_cards: [
      { n: "JUEGA", d: "Misiones con historia — restaurar una cuenca, energizar un barrio, cultivar un bosque comestible. Retos reales, energía de juego." },
      { n: "APRENDE", d: "Cada misión se alinea con estándares CTE y habilidades verdes reales. La diversión ES el currículo." },
      { n: "DESPEGA", d: "Las misiones abren caminos: certificaciones, mentores y aliados locales. Del control a la carrera." },
    ],
    t4_label: "PISTA 04 · CONOCE AL EQUIPO",
    t4_head: "COLECCIONA TU FUTURO",
    t4_sub: "Cada carrera es un personaje. Cada personaje, una puerta. (Anda — tómalas en tus manos.)",
    cards: [
      { role: "TÉCNICA SOLAR", stat: "SOL", num: "07", flavor: "Atrapa la luz, alimenta la red.", hue: T.marigold },
      { role: "GUARDIANA DE CUENCAS", stat: "FLUJO", num: "12", flavor: "Mantiene cantando las acequias.", hue: T.sky },
      { role: "MICROBIÓLOGA DE SUELOS", stat: "RAÍCES", num: "03", flavor: "Lee la tierra como un vinilo.", hue: T.leaf },
      { role: "TÉCNICA DE ACUAPONÍA", stat: "CICLO", num: "15", flavor: "Los peces nutren; las plantas limpian.", hue: T.cream },
      { role: "TÉCNICO EÓLICO", stat: "VUELO", num: "21", flavor: "Sube torres, cosecha cielo.", hue: T.coral },
    ],
    t5_label: "PISTA 05 · LA PRUEBA",
    t5_head: "NACIDO EN NUEVO MÉXICO. LISTO PARA TU DISTRITO.",
    t5_points: [
      ["Piloto en marcha", "Propuestas en curso con las escuelas públicas de Santa Fe y Albuquerque para el próximo año escolar."],
      ["Alineado a estándares", "Mapeado a rutas CTE para integrarse a lo que ya enseñas — sin caos añadido."],
      ["Bilingüe de raíz", "Entrega completa en inglés y español, porque el movimiento habla los dos."],
      ["Cultura incluida", "Conciertos de hip-hop regenerativo que convierten el lanzamiento en la excursión más sonora del año."],
    ],
    cta_head: "PON TU ESCUELA EN EL MAPA.",
    cta_sub: "Treinta minutos con groove. Una demo. La nueva clase favorita de tus estudiantes.",
    cta_btn: "Reserva una demo piloto",
    cta_alt: "o di hola: hello@allaboardearth.com",
    footer: "ALL ABOARD EARTH · ¡ARRIBA VAMOS! 🌱",
    give: "Las donaciones las administra nuestro patrocinador fiscal,",
  },
};

/* ---------- scroll-reveal hook ---------- */
/* Seat 1 — hero parallax: the sun drifts at 0.85x scroll, capped at +-40px.
   rAF-throttled and transform-only, so it never touches layout. */
function useSunParallax() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const hero = document.querySelector(".hero");
    if (!hero) return;
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const shift = Math.max(-40, Math.min(40, window.scrollY * 0.15));
        hero.style.setProperty("--sun-shift", `${shift.toFixed(1)}px`);
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
        alt=""
        width="640"
        height="640"
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
  return (
    <div className={"divider" + (flip ? " flip" : "")} data-reveal aria-hidden="true">
      <img
        className="divider-img"
        src={flip ? dividerB : dividerA}
        alt=""
        loading="lazy"
        decoding="async"
        width="1600"
        height="192"
      />
      {/* wipe: a pine curtain slides off to the right — transform-only, so the
          reveal stays on the compositor (clip-path would not) */}
      <span className="divider-wipe" />
    </div>
  );
}

/* Seat 2/4 — compact seed glyph. Stands in for seed-mark.png until the
   drawn asset lands; see MISSING_ART.md. */
function SeedGlyph({ className = "", hue }) {
  return (
    <svg className={"seed " + className} viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 20 V10" stroke={hue || "currentColor"} strokeWidth="2" strokeLinecap="round" fill="none" />
      <path d="M12 12 q-6,-5 -9,-2 q3,6 9,2" fill={hue || "currentColor"} />
      <path d="M12 10 q6,-5 9,-2 q-3,6 -9,2" fill={hue || "currentColor"} />
      <ellipse cx="12" cy="19" rx="4" ry="3.2" fill={hue || "currentColor"} opacity=".85" />
    </svg>
  );
}

/* ============================================================
   🌱 ROOTS & SEED — what grounds each idea
   ============================================================ */
function RootsMark() {
  return (
    <img
      className="roots seed-grow"
      src={seedMarkArt}
      alt=""
      width="520"
      height="624"
      loading="lazy"
      decoding="async"
      data-reveal
    />
  );
}

/* ============================================================
   🚂 CLIMBING TRAIN — rides the right rail as you scroll
   ============================================================ */
function ClimbingTrain() {
  const [p, setP] = useState(0);
  const [settling, setSettling] = useState(false);
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
        className={"rail-train" + (settling ? " settling" : "")}
        style={{ "--y": `${travel * (1 - p)}px`, "--climb": `${(-6 - p * 6).toFixed(1)}deg` }}
      >
        <img className="rail-train-img" src={climbingTrainArt} alt="" width="760" height="672" loading="lazy" decoding="async" />
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

export default function App() {
  const [lang, setLang] = useState("en");
  const c = copy[lang];
  useReveal(lang);
  useSunParallax();

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
        /* wobble is applied statically to line art — never animated, never on text */
        .wobble{ filter:url(#wobble); }

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
          .ccard-inner, .rail-train, .cta-train{ transition:none !important; animation:none !important; transform:none !important; }
          .cta-train{ left:auto !important; right:0 !important; }
          .draw-on{ stroke-dasharray:none !important; stroke-dashoffset:0 !important; transition:none !important; }
          .divider-wipe{ transform:translateX(101%) !important; transition:none !important; }
          .seed-grow{ opacity:1 !important; transform:none !important; }
          .photoprint, .poster, .panel{ animation:none !important; }
          .cta-train{ animation:none !important; transform:translateX(0) !important; left:auto !important; right:8px !important; }
          .cta-train-img{ animation:none !important; }
          /* the record and the pulsing badges stop too */
          .vinyl-disc{ animation:none !important; }
          .boarding-badge, .signal{ animation:none !important; opacity:1 !important; }
          .ccard-glare{ display:none !important; }
        }

        /* nav */
        nav{ display:flex; align-items:center; justify-content:space-between; padding:20px clamp(16px,4vw,48px); position:sticky; top:0; z-index:50; background:linear-gradient(${T.pine} 70%, transparent); }
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
        .hero-accent{ position:relative; z-index:2; font-family:'Anton'; color:${T.marigold}; font-size:clamp(14px,2.2vw,20px); letter-spacing:.14em; margin-top:10px; line-height:26px; min-height:26px; }

        /* hero + vinyl sun */
        .hero{ position:relative; padding:clamp(40px,8vh,90px) clamp(16px,4vw,48px) 0; text-align:center; }
        /* The record art is light tan, so cream copy laid over it loses contrast.
           A soft pine scrim sits between the art (z 0) and the type (z 2). */
        .hero::after{
          content:""; position:absolute; left:50%; top:38%; width:min(92vw,900px); height:62%;
          transform:translateX(-50%); z-index:1; pointer-events:none;
          background:radial-gradient(ellipse at 50% 45%, ${T.pine}e6 0%, ${T.pine}c4 42%, ${T.pine}00 72%);
        }
        /* wrapper owns position + entrance; svg owns parallax. Both transform-only. */
        .vinyl-wrap{ position:absolute; aspect-ratio:1; left:50%; top:56%; width:min(74vw,580px);
          z-index:0; transform:translateX(-50%); animation:rise 1.6s var(--ease-settle) both; will-change:transform; }
        .vinyl-sun{ display:block; width:100%; position:absolute; inset:0;
          transform:translate3d(0, var(--sun-shift, 0px), 0); will-change:transform; }
        .vinyl-disc{ position:relative; display:block; width:86%; margin:7% auto;
          transform:translate3d(0, var(--sun-shift, 0px), 0) rotate(0deg); will-change:transform; }
        @keyframes rise{ from{ transform:translateX(-50%) translateY(70vh); opacity:0; } to{ transform:translateX(-50%) translateY(0); opacity:1; } }
        /* the whole record turns, 45s/rev; hover spins it up like a turntable */
        .vinyl-disc{ animation:spin 45s linear infinite; }
        .hero:hover .vinyl-disc{ animation-duration:22s; }
        .sun-rays{ transform-origin:200px 200px; animation:spin 60s linear infinite; }
        @keyframes spin{ to{ transform:rotate(360deg); } }
        .hero-eyebrow{ position:relative; z-index:2; color:${T.marigold}; margin-bottom:14px; line-height:18px; min-height:18px; }
        .hero-word{ position:relative; z-index:2; font-size:clamp(64px,17vw,220px); color:${T.cream}; }
        .hero-word span{ display:inline-block; animation:pop .8s cubic-bezier(.2,.9,.3,1.3) both; }
        .hero-word.l2 span{ animation-delay:.15s; color:${T.pineDeep}; -webkit-text-stroke:2px ${T.cream}; text-stroke:2px ${T.cream}; }
        @keyframes pop{ from{ transform:translateY(60px) scale(.9); opacity:0; } to{ transform:none; opacity:1; } }
        .hero-sub{ position:relative; z-index:2; max-width:580px; margin:22px auto 26px; font-size:17px; line-height:1.55; color:${T.cream}dd; }
        .hero-ctas{ position:relative; z-index:2; display:flex; gap:14px; justify-content:center; flex-wrap:wrap; padding-bottom:70px; }

        /* marquee */
        .marquee{ background:${T.marigold}; color:${T.pineDeep}; overflow:hidden; transform:rotate(-1.5deg) scale(1.02); padding:10px 0; height:56px; }
        .marquee-inner{ display:inline-block; white-space:nowrap; font-family:'Anton'; font-size:22px; line-height:36px; letter-spacing:.1em; animation:slide 35s linear infinite; }
        .marquee:hover .marquee-inner{ animation-play-state:paused; }
        .marquee-unit{ display:inline-flex; align-items:center; }
        .seed-sep{ width:22px; height:22px; margin:0 .55em; color:${T.pineDeep}; flex:none; }
        .seed-ico{ width:38px; height:38px; }
        /* Seat 4 — seeds grow rather than fade, staggered across the grid */
        [data-reveal].freq .seed-ico{ transform:scale(.6); opacity:0; transition:transform .8s var(--ease-settle), opacity .8s var(--ease-settle); }
        [data-reveal].freq.in .seed-ico{ transform:scale(1); opacity:1; }
        @keyframes slide{ from{ transform:translateX(0); } to{ transform:translateX(-50%); } }

        /* wave→mountain dividers */
        .divider{ position:relative; width:100%; margin:0 auto; overflow:hidden; line-height:0; }
        .divider-img{ width:100%; height:clamp(84px,11vw,150px); object-fit:cover; display:block; }
        .divider-wipe{
          position:absolute; inset:0; background:${T.pine}; pointer-events:none;
          transform:translateX(0); transition:transform 1.4s var(--ease-settle); will-change:transform;
        }
        [data-reveal].in .divider-wipe{ transform:translateX(101%); }

        /* roots mark */
        .roots{ display:block; width:104px; height:auto; margin:40px auto 0; }

        /* climbing train rail */
        .rail{ position:fixed; right:14px; top:80px; bottom:20px; width:44px; z-index:40; pointer-events:none; }
        .rail-track{ position:absolute; left:50%; top:0; bottom:0; width:0; border-left:3px dashed ${T.cream}33; transform:translateX(-50%); }
        .rail-train{ position:absolute; left:50%; top:0; display:flex; flex-direction:column; align-items:center;
          transform:translateX(-50%) translateY(var(--y, 0px)) rotate(var(--climb, 0deg));
          transition:transform .3s var(--ease-settle); will-change:transform; }
        .rail-train.settling{ transform:translateX(-50%) translateY(var(--y, 0px)) rotate(calc(var(--climb, 0deg) * .4)); }
        .rail-train-img{ width:52px; height:auto; display:block; filter:drop-shadow(0 3px 6px #0008); }
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
        .tag{ border:1.5px solid ${T.marigold}88; color:${T.marigold}; border-radius:999px; padding:7px 14px; font-family:'Space Mono'; font-size:12px; }

        /* frequencies */
        .freqs{ display:grid; grid-template-columns:repeat(auto-fit,minmax(220px,1fr)); gap:16px; margin-top:36px; }
        .freq{ position:relative; border:2px solid ${T.cream}2b; border-radius:16px; padding:22px; transition:border-color .25s, transform .25s; }
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
        .panels{ display:grid; grid-template-columns:repeat(auto-fit,minmax(240px,1fr)); gap:18px; margin-top:36px; }
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
        .cards{ display:grid; grid-template-columns:repeat(auto-fit,minmax(170px,1fr)); gap:18px; margin-top:40px; }
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
        .photoprint{
          margin-top:34px; background:${T.cream}; padding:14px 14px 10px; border-radius:8px;
          transform:rotate(-1deg); box-shadow:0 18px 40px #0007;
          animation:printfloat 7s var(--ease-drift) infinite; will-change:transform;
        }
        .photoprint img{ width:100%; height:clamp(180px,26vw,300px); object-fit:cover; display:block; border-radius:4px; }
        .photoprint figcaption{ color:${T.pineDeep}; text-align:center; padding-top:10px; font-size:11px; letter-spacing:.1em; }
        @keyframes printfloat{ 0%,100%{ transform:rotate(-1deg) translateY(-3px); } 50%{ transform:rotate(-1deg) translateY(3px); } }

        .collage{ display:grid; grid-template-columns:repeat(3,1fr); gap:10px; margin-top:22px; }
        .collage img{
          width:100%; height:clamp(90px,13vw,150px); object-fit:cover; display:block;
          background:${T.cream}; border:7px solid ${T.cream}; border-bottom-width:20px; border-radius:3px;
          box-shadow:0 10px 22px #0007;
        }
        .collage img:nth-child(1){ transform:rotate(-3deg); }
        .collage img:nth-child(2){ transform:rotate(1.5deg); }
        .collage img:nth-child(3){ transform:rotate(-1deg); }

        /* Seat 9 — the train crosses the CTA band once, on first reveal */
        .crossing{ position:relative; height:74px; margin:0 0 18px; overflow:hidden; }
        .crossing-track{ position:absolute; left:0; right:0; bottom:6px; width:100%; height:4px; }
        .cta-train{ position:absolute; bottom:6px; left:0; line-height:0; will-change:transform; transform:translateX(-20vw); }
        .cta-train-img{ display:block; width:78px; height:auto; transform:scaleX(-1); will-change:transform; }
        [data-reveal].ctaband.in .cta-train{ animation:cross 7s var(--ease-drift) both; }
        [data-reveal].ctaband.in .cta-train-img{ animation:rock 1.1s ease-in-out infinite; }
        @keyframes cross{ from{ transform:translateX(-20vw); } to{ transform:translateX(120vw); } }
        @keyframes rock{ 0%,100%{ transform:scaleX(-1) rotate(-1.5deg); } 50%{ transform:scaleX(-1) rotate(1.5deg); } }


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

        footer .roots{ width:78px; margin:0 auto 10px; }
        .footer-give{ margin-top:10px; }
        .footer-social{ margin-top:6px; }
        footer a{ color:${T.marigold}; text-decoration:none; border-bottom:1px solid ${T.marigold}66; }
        footer a:hover{ border-bottom-color:${T.marigold}; }
        footer{ text-align:center; padding:30px; font-family:'Space Mono'; font-size:12px; color:${T.cream}88; letter-spacing:.12em; }
      `}</style>

      <div className="grain" aria-hidden="true" />

      {/* shared hand-drawn edge wobble, used statically by line art */}
      <svg width="0" height="0" aria-hidden="true" style={{ position: "absolute" }}>
        <defs>
          <filter id="wobble">
            <feTurbulence type="fractalNoise" baseFrequency="0.02" numOctaves="2" seed="7" result="n" />
            <feDisplacementMap in="SourceGraphic" in2="n" scale="2.2" xChannelSelector="R" yChannelSelector="G" />
          </filter>
        </defs>
      </svg>

      <ClimbingTrain />

      <nav>
        <div className="brand">ALL ABOARD <b>EARTH</b></div>
        <div className="navr">
          <div className="lang">
            <button className={lang === "en" ? "on" : ""} onClick={() => setLang("en")}>EN</button>
            <button className={lang === "es" ? "on" : ""} onClick={() => setLang("es")}>ES</button>
          </div>
          <a className="btn" href={LINKS.booking}>{c.nav_cta}</a>
        </div>
      </nav>

      <main>
      {/* HERO — THE MOVEMENT */}
      <header className="hero">
        <VinylSun />
        <div className="mono hero-eyebrow">{c.hero_eyebrow}</div>
        <h1 className="display hero-word"><span>{c.hero_line1}</span></h1>
        <h1 className="display hero-word l2"><span>{c.hero_line2}</span></h1>
        <div className="hero-accent">{c.hero_accent}</div>
        <p className="hero-sub">{c.hero_sub}</p>
        <div className="hero-ctas">
          <a className="btn big" href={LINKS.coolCareers}>{c.hero_cta}</a>
          <a className="btn big ghost" href={LINKS.grooves}>{c.hero_cta2}</a>
        </div>
      </header>

      <div className="marquee">
        <div className="marquee-inner">
          {Array.from({ length: 6 }).map((_, i) => (
            <span key={i} className="marquee-unit">
              {c.marquee_phrase}
              <SeedGlyph className="seed-sep wobble" />
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
            <div className={"freq" + (lead ? " lead" : "")} data-reveal key={h} style={{ transitionDelay: `${i * 90}ms` }}>
              {lead && <span className="boarding-badge">{c.boarding}</span>}
              <div className="ico">{ico}</div>
              <h3>{h}</h3>
              <p>{p}</p>
            </div>
          ))}
        </div>
        <RootsMark />
      </section>

      <WaveMountainDivider />

      {/* TRACK 02 — NOW BOARDING */}
      <section id="cool-careers">
        <div className="boarding-strip" data-reveal>
          <span className="signal" />
          <span className="mono label" style={{ marginBottom: 0 }}>{c.t2_label}</span>
        </div>
        <div className="feature">
          <div>
            <h2 className="display" data-reveal>{c.t2_head}</h2>
            <p className="lede" data-reveal>{c.t2_body}</p>
        <div className="tags" data-reveal>
          {c.t2_tags.map((t) => <span className="tag" key={t}>{t}</span>)}
        </div>
          </div>
          <figure className="poster" data-reveal>
            <img
              src={cardArt("3d-ocean-farmer", 760, 1064)}
              alt="3D Ocean Farmer — grows seaweed and shellfish in layered ocean habitats"
              loading="lazy" decoding="async" width="760" height="1064"
            />
          </figure>
        </div>
      </section>

      <WaveMountainDivider flip />

      {/* TRACK 03 — HOW IT PLAYS */}
      <section>
        <span className="mono label" data-reveal>{c.t3_label}</span>
        <h2 className="display" data-reveal>{c.t3_head}</h2>
        <div className="panels">
          {c.t3_cards.map((p, i) => (
            <div className="panel" data-reveal key={p.n} style={{ transitionDelay: `${i * 100}ms` }}>
              <h3>{p.n}</h3>
              <p>{p.d}</p>
            </div>
          ))}
        </div>
        <RootsMark />
      </section>

      <WaveMountainDivider />

      {/* TRACK 04 — MEET THE CREW */}
      <section>
        <span className="mono label" data-reveal>{c.t4_label}</span>
        <h2 className="display" data-reveal>{c.t4_head}</h2>
        <p className="lede" data-reveal>{c.t4_sub}</p>
        <div className="cards">
          {c.cards.map((card, i) => <CareerCard c={card} i={i} art={CARD_ART[i]} key={card.role} />)}
        </div>
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
        <figure className="photoprint" data-reveal>
          <img src={sceneRaccoon} alt="A felt raccoon farmer driving a tractor through a solar-powered vegetable field" loading="lazy" decoding="async" width="1100" height="457" />
          <figcaption className="mono">Handmade heroes. Real classrooms.</figcaption>
        </figure>
        <div className="collage" data-reveal aria-hidden="true">
          <img src={sceneGreenCareers} alt="" loading="lazy" decoding="async" width="1400" height="785" />
          <img src={sceneEarthRests} alt="" loading="lazy" decoding="async" width="1400" height="785" />
          <img src={sceneWindMonkey} alt="" loading="lazy" decoding="async" width="760" height="426" />
        </div>
        <RootsMark />
      </section>

      {/* CTA */}
      <div style={{ padding: "0 16px" }}>
        <div className="ctaband" data-reveal>
          <div className="crossing" aria-hidden="true">
            <svg className="crossing-track" viewBox="0 0 1200 4" preserveAspectRatio="none">
              <line className="draw-on" x1="0" y1="2" x2="1200" y2="2" stroke={T.pineDeep} strokeOpacity=".45" strokeWidth="3" strokeDasharray="10 12" />
            </svg>
            <span className="cta-train"><img className="cta-train-img" src={climbingTrainArt} alt="" width="760" height="672" loading="lazy" decoding="async" /></span>
          </div>
          <h2 className="display">{c.cta_head}</h2>
          <p>{c.cta_sub}</p>
          <a className="btn big" href={LINKS.booking}>{c.cta_btn}</a>
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
