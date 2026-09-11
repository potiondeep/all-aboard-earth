import React, { useState, useEffect, useRef } from "react";

import artPhotovoltaic from "./assets/careers/photovoltaic-tech.webp";
import artWatershed from "./assets/careers/watershed-specialist.webp";
import artFungi from "./assets/careers/fungi-biochemist.webp";
import artOceanFarmer from "./assets/careers/ocean-farmer.webp";
import sceneGreenCareers from "./assets/scenes/green-careers.webp";
import sceneEarthRests from "./assets/scenes/earth-rests.webp";

// Card art is language-independent, so it lives outside the copy object
// and is matched to cards by position.
const CARD_ART = [
  { src: artPhotovoltaic, alt: "Photovoltaic power technician standing on a solar array" },
  { src: artWatershed, alt: "Watershed restoration specialist at a mountain stream with a beaver" },
  { src: artFungi, alt: "Fungi biochemist examining cultivated mushrooms" },
  { src: artOceanFarmer, alt: "3D ocean farmer hauling kelp aboard a boat" },
];

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

// Swap these when the real destinations exist (Wix Bookings, etc.)
const LINKS = {
  coolCareers: "#cool-careers",
  contact: "https://www.allaboardearth.com/contact",
  grooves: "https://www.allaboardearth.com/grooves",
};

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
      { role: "PHOTOVOLTAIC TECH", stat: "SUN PWR", num: "07", flavor: "Catches daylight, feeds the grid.", hue: T.marigold },
      { role: "WATERSHED SPECIALIST", stat: "FLOW", num: "12", flavor: "Keeps the acequias singing.", hue: T.sky },
      { role: "FUNGI BIOCHEMIST", stat: "ROOTS", num: "03", flavor: "Reads the ground like liner notes.", hue: T.leaf },
      { role: "3D OCEAN FARMER", stat: "TIDE", num: "21", flavor: "Grows kelp forests between the tides.", hue: T.coral },
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
  },
  es: {
    nav_cta: "Reserva una demo",
    hero_eyebrow: "ALL ABOARD EARTH · UN MOVIMIENTO CON BANDA SONORA",
    hero_accent: "UP WE GO!",
    hero_line1: "¡ARRIBA",
    hero_line2: "VAMOS!",
    hero_sub:
      "Somos el equipo que convierte el cuidado de la Tierra en cultura — hip-hop, historias, juegos y productos que hacen subir al planeta (y a la gente). Toma asiento. La Tierra entera va a bordo.",
    hero_cta: "🚂 Súbete — estamos abordando",
    hero_cta2: "Siente la vibra →",
    marquee: "¡ARRIBA VAMOS! · UP WE GO! · ¡ARRIBA VAMOS! · UP WE GO! · ",
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
      { role: "TÉCNICA FOTOVOLTAICA", stat: "SOL", num: "07", flavor: "Atrapa la luz, alimenta la red.", hue: T.marigold },
      { role: "GUARDIANA DE CUENCAS", stat: "FLUJO", num: "12", flavor: "Mantiene cantando las acequias.", hue: T.sky },
      { role: "BIOQUÍMICA DE HONGOS", stat: "RAÍCES", num: "03", flavor: "Lee la tierra como un vinilo.", hue: T.leaf },
      { role: "GRANJERO OCEÁNICO 3D", stat: "MAREA", num: "21", flavor: "Cultiva algas entre las mareas.", hue: T.coral },
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
  },
};

/* ---------- scroll-reveal hook ---------- */
function useReveal(lang) {
  useEffect(() => {
    const els = document.querySelectorAll("[data-reveal]");
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
    return () => io.disconnect();
  }, [lang]);
}

/* ============================================================
   ☀️🎶 VINYL SUN — a record pressed from daylight
   ============================================================ */
function VinylSun() {
  return (
    <svg className="vinyl-sun" viewBox="0 0 400 400" aria-hidden="true">
      <defs>
        <radialGradient id="sunGrad" cx="50%" cy="40%">
          <stop offset="0%" stopColor={T.marigold} />
          <stop offset="75%" stopColor={T.coral} />
        </radialGradient>
      </defs>
      {/* rotating rays */}
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
      {/* the record */}
      <circle cx="200" cy="200" r="148" fill="url(#sunGrad)" />
      {/* vinyl grooves */}
      {[132, 116, 100, 84, 68].map((r) => (
        <circle key={r} cx="200" cy="200" r={r} fill="none" stroke={T.pineDeep} strokeOpacity=".28" strokeWidth="2.5" />
      ))}
      {/* record label */}
      <circle cx="200" cy="200" r="46" fill={T.cream} />
      <circle cx="200" cy="200" r="6" fill={T.pineDeep} />
      <text x="200" y="182" textAnchor="middle" fontFamily="'Space Mono', monospace" fontSize="12" fontWeight="700" fill={T.pineDeep} letterSpacing="1">SIDE A</text>
      <text x="200" y="234" textAnchor="middle" fontFamily="'Space Mono', monospace" fontSize="10" fill={T.pineDeep} letterSpacing="1">33⅓ RPM</text>
    </svg>
  );
}

/* ============================================================
   🌊⛰️ SOUNDWAVE → MOUNTAIN DIVIDER
   the signal starts as water and rises into peaks
   ============================================================ */
function WaveMountainDivider({ flip }) {
  const wavePath =
    "M0,84 q18,-16 36,0 t36,0 t36,0 t36,0 t36,0 t36,0 " + // water grooves
    "L252,84 L310,46 L358,84 L430,22 L500,90 L570,14 L650,92 L724,34 L800,84 " + // rising peaks
    "q18,-16 36,0 t36,0 t36,0 t36,0 t36,0 t36,0 t36,0 t36,0 t36,0 t36,0"; // signal rides on
  return (
    <div className={"divider" + (flip ? " flip" : "")} data-reveal aria-hidden="true">
      <svg viewBox="0 0 1200 110" preserveAspectRatio="none">
        <path d={wavePath} fill="none" stroke={T.sky} strokeWidth="3" strokeLinecap="round" />
        <path d={wavePath} fill="none" stroke={T.marigold} strokeWidth="3" strokeLinecap="round" transform="translate(0,12)" opacity=".55" />
      </svg>
    </div>
  );
}

/* ============================================================
   🌱 ROOTS & SEED — what grounds each idea
   ============================================================ */
function RootsMark() {
  return (
    <svg className="roots" viewBox="0 0 220 110" aria-hidden="true" data-reveal>
      {/* ground line */}
      <line x1="0" y1="34" x2="220" y2="34" stroke={T.cream} strokeOpacity=".25" strokeWidth="2" strokeDasharray="2 7" />
      {/* sprout */}
      <path d="M110,34 L110,14" stroke={T.leaf} strokeWidth="3.5" strokeLinecap="round" fill="none" />
      <path d="M110,20 q-14,-12 -22,-4 q6,12 22,4" fill={T.leaf} />
      <path d="M110,14 q14,-12 22,-4 q-6,12 -22,4" fill={T.leaf} />
      {/* seed */}
      <ellipse cx="110" cy="42" rx="9" ry="7" fill={T.marigold} />
      {/* roots branching down */}
      <path d="M110,48 q0,14 -14,22 q-12,7 -14,20" stroke={T.marigold} strokeOpacity=".8" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      <path d="M110,48 q0,16 0,26 q0,12 6,22" stroke={T.marigold} strokeOpacity=".8" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      <path d="M110,48 q2,12 16,18 q14,7 16,22" stroke={T.marigold} strokeOpacity=".8" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      <path d="M96,70 q-8,4 -10,12" stroke={T.marigold} strokeOpacity=".5" strokeWidth="2" fill="none" strokeLinecap="round" />
      <path d="M126,66 q8,6 8,14" stroke={T.marigold} strokeOpacity=".5" strokeWidth="2" fill="none" strokeLinecap="round" />
    </svg>
  );
}

/* ============================================================
   🚂 CLIMBING TRAIN — rides the right rail as you scroll
   ============================================================ */
function ClimbingTrain() {
  const [p, setP] = useState(0);
  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const max = document.documentElement.scrollHeight - window.innerHeight;
        setP(max > 0 ? Math.min(1, window.scrollY / max) : 0);
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => { window.removeEventListener("scroll", onScroll); cancelAnimationFrame(raf); };
  }, []);
  return (
    <div className="rail" aria-hidden="true">
      <div className="rail-track" />
      <div className="rail-train" style={{ bottom: `calc(${(p * 100).toFixed(2)}% - ${(p * 84).toFixed(1)}px)` }}>
        <svg viewBox="0 0 44 84" width="34" height="66">
          {/* steam puffs */}
          <circle className="puff p1" cx="22" cy="10" r="4" fill={T.cream} opacity=".8" />
          <circle className="puff p2" cx="16" cy="6" r="3" fill={T.cream} opacity=".55" />
          <circle className="puff p3" cx="28" cy="4" r="2.5" fill={T.cream} opacity=".4" />
          {/* chimney (pointing up — we climb!) */}
          <rect x="17" y="14" width="10" height="8" rx="2" fill={T.coral} />
          {/* boiler */}
          <rect x="12" y="22" width="20" height="30" rx="7" fill={T.marigold} />
          <circle cx="22" cy="32" r="5" fill={T.pineDeep} />
          {/* cab */}
          <rect x="9" y="52" width="26" height="18" rx="3" fill={T.coral} />
          <rect x="15" y="56" width="14" height="7" rx="2" fill={T.cream} />
          {/* wheels */}
          <circle cx="10" cy="74" r="5" fill={T.cream} stroke={T.pineDeep} strokeWidth="2" />
          <circle cx="34" cy="74" r="5" fill={T.cream} stroke={T.pineDeep} strokeWidth="2" />
        </svg>
        <span className="rail-label mono">UP WE GO</span>
      </div>
    </div>
  );
}

/* ---------- tilting trading card ---------- */
function CareerCard({ c, i, art }) {
  const ref = useRef(null);
  const [t, setT] = useState({ rx: 0, ry: 0 });
  const move = (e) => {
    const r = ref.current.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    setT({ rx: -y * 14, ry: x * 14 });
  };
  return (
    <div
      ref={ref}
      data-reveal
      className="ccard"
      style={{ transitionDelay: `${i * 90}ms` }}
      onMouseMove={move}
      onMouseLeave={() => setT({ rx: 0, ry: 0 })}
    >
      <div
        className="ccard-inner"
        style={{ transform: `perspective(700px) rotateX(${t.rx}deg) rotateY(${t.ry}deg)` }}
      >
        <div className="ccard-top">
          <span className="mono">№ {c.num}</span>
          <span className="mono">{c.stat} ★★★★</span>
        </div>
        <div className="ccard-art" style={{ background: c.hue }}>
          {art ? (
            <img className="ccard-img" src={art.src} alt={art.alt} loading="lazy" decoding="async" width="520" height="735" />
          ) : (
          /* mini vinyl sun echo */
          <svg viewBox="0 0 100 100" className="ccard-svg">
            <circle cx="50" cy="26" r="15" fill={T.cream} />
            <circle cx="50" cy="26" r="10" fill="none" stroke={T.pineDeep} strokeOpacity=".3" strokeWidth="1.5" />
            <circle cx="50" cy="26" r="5" fill="none" stroke={T.pineDeep} strokeOpacity=".3" strokeWidth="1.5" />
            <path d="M-10,105 L20,66 L45,95 L70,58 L105,100 Z" fill={T.pineDeep} />
            <path d="M-10,110 Q15,98 35,104 T80,102 T115,106" fill="none" stroke={T.cream} strokeOpacity=".5" strokeWidth="2" />
          </svg>
          )}
        </div>
        <div className="ccard-role">{c.role}</div>
        <div className="ccard-flavor">{c.flavor}</div>
      </div>
    </div>
  );
}

export default function App() {
  const [lang, setLang] = useState("en");
  const c = copy[lang];
  useReveal(lang);

  return (
    <div className="page">
      <style>{`

        * { margin:0; padding:0; box-sizing:border-box; }
        .page {
          background:${T.pine}; color:${T.cream};
          font-family:'Bricolage Grotesque', sans-serif;
          overflow-x:hidden; min-height:100vh;
        }
        .mono { font-family:'Space Mono', monospace; font-size:12px; letter-spacing:.08em; }
        .display { font-family:'Anton', sans-serif; text-transform:uppercase; line-height:.92; }

        /* reveal */
        [data-reveal]{ opacity:0; transform:translateY(34px); transition:opacity .7s ease, transform .7s cubic-bezier(.2,.8,.2,1); }
        [data-reveal].in{ opacity:1; transform:translateY(0); }
        @media (prefers-reduced-motion: reduce){
          [data-reveal]{ opacity:1; transform:none; transition:none; }
          .hero-word span{ animation:none !important; transform:none !important; opacity:1 !important; }
          .marquee-inner{ animation:none !important; }
          .vinyl-sun{ animation:none !important; }
          .sun-rays{ animation:none !important; }
          .puff{ animation:none !important; }
        }

        /* nav */
        nav{ display:flex; align-items:center; justify-content:space-between; padding:20px clamp(16px,4vw,48px); position:sticky; top:0; z-index:50; background:linear-gradient(${T.pine} 70%, transparent); }
        .brand{ font-family:'Anton'; font-size:18px; letter-spacing:.06em; }
        .brand b{ color:${T.marigold}; }
        .navr{ display:flex; gap:12px; align-items:center; }
        .lang{ display:flex; border:2px solid ${T.cream}44; border-radius:999px; overflow:hidden; }
        .lang button{ background:none; border:none; color:${T.cream}; font-family:'Space Mono'; font-size:12px; padding:6px 12px; cursor:pointer; }
        .lang button.on{ background:${T.marigold}; color:${T.pineDeep}; font-weight:700; }
        .btn{ display:inline-block; background:${T.coral}; color:${T.cream}; border:none; border-radius:999px; padding:12px 22px; font-family:'Bricolage Grotesque'; font-weight:700; font-size:15px; cursor:pointer; transition:transform .2s, box-shadow .2s; box-shadow:0 0 0 0 ${T.coral}55; }
        .btn:hover{ transform:translateY(-3px) rotate(-1deg); box-shadow:0 10px 24px ${T.coral}55; }
        .btn.big{ padding:18px 34px; font-size:18px; }
        .btn.ghost{ background:transparent; border:2px solid ${T.cream}55; box-shadow:none; }
        .btn.ghost:hover{ border-color:${T.marigold}; color:${T.marigold}; }
        a.btn{ text-decoration:none; }
        .hero-accent{ position:relative; z-index:2; font-family:'Anton'; color:${T.marigold}; font-size:clamp(14px,2.2vw,20px); letter-spacing:.14em; margin-top:10px; }

        /* hero + vinyl sun */
        .hero{ position:relative; padding:clamp(40px,8vh,90px) clamp(16px,4vw,48px) 0; text-align:center; }
        .vinyl-sun{ position:absolute; left:50%; top:56%; width:min(74vw,580px); transform:translateX(-50%);
          z-index:0; animation:rise 1.6s cubic-bezier(.2,.8,.2,1) both; }
        @keyframes rise{ from{ top:95%; opacity:0; } to{ top:56%; opacity:1; } }
        .sun-rays{ transform-origin:200px 200px; animation:spin 60s linear infinite; }
        @keyframes spin{ to{ transform:rotate(360deg); } }
        .hero-eyebrow{ position:relative; z-index:2; color:${T.marigold}; margin-bottom:14px; }
        .hero-word{ position:relative; z-index:2; font-size:clamp(64px,17vw,220px); color:${T.cream}; }
        .hero-word span{ display:inline-block; animation:pop .8s cubic-bezier(.2,.9,.3,1.3) both; }
        .hero-word.l2 span{ animation-delay:.15s; color:${T.pineDeep}; -webkit-text-stroke:2px ${T.cream}; text-stroke:2px ${T.cream}; }
        @keyframes pop{ from{ transform:translateY(60px) scale(.9); opacity:0; } to{ transform:none; opacity:1; } }
        .hero-sub{ position:relative; z-index:2; max-width:580px; margin:22px auto 26px; font-size:17px; line-height:1.55; color:${T.cream}dd; }
        .hero-ctas{ position:relative; z-index:2; display:flex; gap:14px; justify-content:center; flex-wrap:wrap; padding-bottom:70px; }

        /* marquee */
        .marquee{ background:${T.marigold}; color:${T.pineDeep}; overflow:hidden; transform:rotate(-1.5deg) scale(1.02); padding:10px 0; }
        .marquee-inner{ display:inline-block; white-space:nowrap; font-family:'Anton'; font-size:22px; letter-spacing:.1em; animation:slide 18s linear infinite; }
        @keyframes slide{ from{ transform:translateX(0); } to{ transform:translateX(-50%); } }

        /* wave→mountain dividers */
        .divider{ max-width:1100px; margin:0 auto; padding:0 clamp(16px,4vw,48px); }
        .divider svg{ width:100%; height:64px; display:block; }
        .divider.flip svg{ transform:scaleX(-1); }

        /* roots mark */
        .roots{ display:block; width:180px; margin:44px auto 0; }

        /* climbing train rail */
        .rail{ position:fixed; right:14px; top:80px; bottom:20px; width:44px; z-index:40; pointer-events:none; }
        .rail-track{ position:absolute; left:50%; top:0; bottom:0; width:0; border-left:3px dashed ${T.cream}33; transform:translateX(-50%); }
        .rail-train{ position:absolute; left:50%; transform:translateX(-50%); display:flex; flex-direction:column; align-items:center; transition:bottom .15s linear; }
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
        .freq h4{ font-family:'Anton'; font-size:18px; margin:10px 0 6px; letter-spacing:.03em; }
        .freq p{ font-size:14px; line-height:1.5; color:${T.cream}bb; }
        .boarding-badge{ position:absolute; top:-12px; right:14px; background:${T.coral}; color:${T.cream}; font-family:'Space Mono'; font-size:10px; letter-spacing:.12em; padding:5px 10px; border-radius:999px; animation:blink 1.6s ease-in-out infinite; }
        @keyframes blink{ 0%,100%{ opacity:1; } 50%{ opacity:.55; } }
        .boarding-strip{ display:flex; align-items:center; gap:12px; margin-bottom:8px; }
        .signal{ width:12px; height:12px; border-radius:50%; background:${T.coral}; animation:blink 1.6s ease-in-out infinite; }

        /* comic panels */
        .panels{ display:grid; grid-template-columns:repeat(auto-fit,minmax(240px,1fr)); gap:18px; margin-top:36px; }
        .panel{ background:${T.cream}; color:${T.pineDeep}; border-radius:18px; padding:26px 22px; border:3px solid ${T.pineDeep}; box-shadow:8px 8px 0 ${T.coral}; transition:transform .25s, box-shadow .25s; }
        .panel:hover{ transform:translate(-4px,-4px) rotate(-.5deg); box-shadow:14px 14px 0 ${T.coral}; }
        .panel h3{ font-family:'Anton'; font-size:30px; margin-bottom:10px; }
        .panel:nth-child(2){ box-shadow:8px 8px 0 ${T.marigold}; }
        .panel:nth-child(2):hover{ box-shadow:14px 14px 0 ${T.marigold}; }
        .panel:nth-child(3){ box-shadow:8px 8px 0 ${T.sky}; }
        .panel:nth-child(3):hover{ box-shadow:14px 14px 0 ${T.sky}; }
        .panel p{ line-height:1.55; font-size:15px; }

        /* trading cards */
        .cards{ display:grid; grid-template-columns:repeat(auto-fit,minmax(210px,1fr)); gap:22px; margin-top:40px; }
        .ccard-inner{ background:${T.cream}; color:${T.pineDeep}; border-radius:16px; padding:14px; border:3px solid ${T.pineDeep}; transition:transform .15s ease-out; will-change:transform; }
        .ccard-top{ display:flex; justify-content:space-between; margin-bottom:10px; font-weight:700; }
        .ccard-art{ position:relative; border-radius:10px; height:150px; overflow:hidden; border:2px solid ${T.pineDeep}; }
        .ccard-svg{ position:absolute; inset:0; width:100%; height:100%; }
        .ccard-img{ position:absolute; inset:0; width:100%; height:100%; object-fit:cover; object-position:50% 22%; display:block; }
        .scene{ margin-top:30px; border:3px solid ${T.pineDeep}; border-radius:16px; overflow:hidden; line-height:0; box-shadow:0 18px 40px #0006; }
        .scene img{ width:100%; height:clamp(180px,30vw,340px); object-fit:cover; display:block; }
        .ccard-role{ font-family:'Anton'; font-size:21px; margin-top:12px; }
        .ccard-flavor{ font-size:13.5px; margin-top:6px; opacity:.8; line-height:1.4; }

        /* proof */
        .proof{ display:grid; grid-template-columns:repeat(auto-fit,minmax(240px,1fr)); gap:2px; margin-top:36px; border:2px solid ${T.cream}33; border-radius:18px; overflow:hidden; }
        .proof > div{ background:${T.pineDeep}; padding:26px 22px; }
        .proof h4{ font-family:'Anton'; font-size:19px; color:${T.marigold}; margin-bottom:8px; letter-spacing:.03em; }
        .proof p{ font-size:14.5px; line-height:1.55; color:${T.cream}cc; }

        /* CTA */
        .ctaband{ background:${T.marigold}; color:${T.pineDeep}; text-align:center; border-radius:26px; max-width:1100px; margin:0 auto 80px; padding:clamp(50px,8vh,90px) 24px; transform:rotate(-.6deg); }
        .ctaband h2{ font-size:clamp(34px,6vw,66px); }
        .ctaband p{ margin:16px 0 26px; font-size:17px; font-weight:600; }
        .ctaband .mono{ display:block; margin-top:16px; opacity:.75; }
        .ctaband .btn{ background:${T.pineDeep}; }

        footer{ text-align:center; padding:30px; font-family:'Space Mono'; font-size:12px; color:${T.cream}88; letter-spacing:.12em; }
      `}</style>

      <ClimbingTrain />

      <nav>
        <div className="brand">ALL ABOARD <b>EARTH</b></div>
        <div className="navr">
          <div className="lang">
            <button className={lang === "en" ? "on" : ""} onClick={() => setLang("en")}>EN</button>
            <button className={lang === "es" ? "on" : ""} onClick={() => setLang("es")}>ES</button>
          </div>
          <a className="btn" href={LINKS.contact}>{c.nav_cta}</a>
        </div>
      </nav>

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
        <div className="marquee-inner">{c.marquee + c.marquee + c.marquee}</div>
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
              <h4>{h}</h4>
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
        <h2 className="display" data-reveal>{c.t2_head}</h2>
        <p className="lede" data-reveal>{c.t2_body}</p>
        <div className="tags" data-reveal>
          {c.t2_tags.map((t) => <span className="tag" key={t}>{t}</span>)}
        </div>
        <div className="scene" data-reveal>
          <img src={sceneGreenCareers} alt="A felt roadrunner racing past a desert solar array" loading="lazy" decoding="async" width="1400" height="785" />
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
            <div key={h}><h4>{h}</h4><p>{p}</p></div>
          ))}
        </div>
        <div className="scene" data-reveal>
          <img src={sceneEarthRests} alt="A felt Earth character resting on a green hillside under felt clouds" loading="lazy" decoding="async" width="1400" height="785" />
        </div>
        <RootsMark />
      </section>

      {/* CTA */}
      <div style={{ padding: "0 16px" }}>
        <div className="ctaband" data-reveal>
          <h2 className="display">{c.cta_head}</h2>
          <p>{c.cta_sub}</p>
          <a className="btn big" href={LINKS.contact}>{c.cta_btn}</a>
          <span className="mono">{c.cta_alt}</span>
        </div>
      </div>

      <footer>{c.footer}</footer>
    </div>
  );
}
