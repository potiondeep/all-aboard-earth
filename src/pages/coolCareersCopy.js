// Cool Careers page copy.
//
// The numbers here are the platform's own, taken from PROJECT_BRIEF.md in the
// cool-careers repo (the deck, the station library, the access model) and from
// the Wix CMS resource exports (videos, programs, internships, mentors). When
// the platform changes, re-check them there rather than editing by feel.
//
// Two claims are deliberately NOT made, because the repo says they are not true
// yet: that every station has a video (6 of 104 branded reels have landed), and
// that the curriculum is cryptographically locked (the two migrations that close
// the storage bucket are written but not applied). The page describes the code
// as how a class gets set up, not as a security boundary.
//
// Spanish is an unofficial rendering — see CONTENT_NEEDED.md. Career card names
// stay in English in both: see the note in coolCareersDeck.js.
export const ccCopy = {
  en: {
    nav_home: "Home",
    nav_cta: "Book a pilot demo",
    hero_title: "Play a game. Find a future.",
    hero_title_b: "One class period.",
    hero_band: [["Standards-aligned", "marigold"], [", ", null], ["zero-student-data", "sky"], [", ", null], ["CTE-funded", "leaf"], [" career exploration that plugs into an existing class period.", null]],
    hero_caption: "Felt school buses charging up on sun and wind.",

    why_label: "WHY IT'S IMPORTANT",
    why: [
      { n: "3×", hue: "leaf", text: "Clean energy jobs grew 3× faster than the rest of the US economy last year — nearly 100,000 new jobs", src: "US DOE, USEER 2025" },
      { n: "7 in 8", hue: "sky", text: "workers worldwide lack even a single green skill — green hiring grows nearly 2× as fast as green talent", src: "LinkedIn Global Green Skills Report 2025" },
      { n: "1 in 3", hue: "coral", text: "new US energy jobs in recent years have gone to Latino/Hispanic workers — and 29% of the energy workforce is under 30", src: "US DOE, USEER 2025" },
    ],

    /* ---- how the game works ---- */

    /* ---- the four thematic areas ---- */
    themes_label: "FOUR LINES OUT OF THE STATION",
    themes_h: "The careers.",
    themes_lede: "Thirty-six of the forty career cards ride one of four lines. Open any card for its video, programs, internships and mentors.",
    themes: {
      energy: {
        n: "12",
        name: "Renewable Energy",
        blurb: "Power without burning the future — and the storage, grids and vehicles that move it.",
      },
      land: {
        n: "9",
        name: "Regenerative Agriculture",
        blurb: "Food grown so the soil ends up deeper than you found it. Microbes to ocean farms.",
      },
      water: {
        n: "7",
        name: "Sustainable Water",
        blurb: "Catch it, clean it, move it, keep it — in the driest places, where it counts.",
      },
      circular: {
        n: "8",
        name: "Circular Economy",
        blurb: "Designing waste out before a thing is made, and mining what we already threw away.",
      },
    },
    themes_more: "Also here:",
    card_open: "Open in the Deck Explorer",

    /* ---- the curriculum ---- */
    curric_label: "THE CURRICULUM",
    curric_h: "Every card is a lesson, already written.",
    curric_items: ["Teacher deck", "Infographic", "3 lesson plans", "3 reading passages", "Flashcards", "Quizzes, all three bands", "Performance task + rubric", "One-zip print bundle"],
    tiers_h: "Three grade tiers.",
    tiers: [["3–5", "Video, the reading, flashcards, a 3-question quiz"], ["6–8", "The reading, the infographic, a 5-question quiz"], ["9–12", "The infographic, the reading, a 5-question quiz, the performance task"]],
    tiers_foot: "A student picks a tier once; a teacher can pin one for the whole class.",

    /* ---- standards ---- */
    std_label: "THREE MANDATES, ONE PERIOD",
    std_h: "It counts for what you already have to teach.",
    std: [
      ["NGSS", "leaf", "Energy transfer, matter cycling, human impact and Earth systems are the content, not the theme. Stations carry their codes.", "The Standards Map shows what a session covered — the view a district asks for first."],
      ["Financial literacy", "marigold", "The Green Line is a full personal-finance suit, tagged to New Mexico's PFL strand and written against HB 171.", "In Albuquerque Public Schools, Personal Financial Literacy is a graduation requirement."],
      ["Career & Technical Education", "sky", "Every card maps to a 2024 National Career Cluster and a program of study, so play generates documentation instead of costing it.", "Perkins V and workforce-grant eligible."],
    ],

    /* ---- the green line ---- */
    gl_label: "THE GREEN LINE",
    gl_h: "Money is a flow, not a pile.",
    gl_lede: "The Green Line crosses every other line, because money does. Students already speak ecosystem from the deck, so every money idea is taught through the land.",
    gl_from: "My money",
    gl_to: "Our money",
    gl_art_alt: "The Green Line pulling out of a mountain town, its route glowing green through the valley below.",
    gl_stops: ["First Check", "Direct the Flow", "Plant Early", "Build Your Soil", "The Dollar Ride", "Where Money Sleeps", "The Commons", "Green Hustle"],
    gl_dict_h: "The translations do the teaching",
    gl_dict: [
      ["Compound interest", "A tree planted early — growth on growth"],
      ["Emergency fund", "A seed bank; a cistern for the dry season"],
      ["A budget", "An irrigation plan — you don't get more water, you direct it strategically"],
      ["Credit", "Soil health — built slowly, invisible until you need it — adds fertility to grow your future"],
      ["High-interest debt", "Erosion — the kind that destroys financial stability"],
      ["Insurance", "The firebreak — cut before the fire, not during it, to stop one disaster from ruining your whole financial landscape"],
    ],

    /* ---- the pathway ---- */
    path_label: "FROM SPARK TO PAYCHECK",
    path_h: "Inspiration is the easy part.",
    path_lede: "Most career programs stop at the poster. This one carries a student to a wage, and to somebody already doing the work who will pick up the phone.",
    path_nums: [
      ["102", "curated videos", "PBS, TED-Ed, NASA and NOAA — district-safe, and every link re-checked"],
      ["86", "education routes", "Degrees, certificates, apprenticeships and two-year programs"],
      ["85", "internships", "Real openings, tied to the card that sparked the interest"],
      ["340", "mentors", "People already doing the work, attached to the career they do"],
    ],
    path_foot: "Wages from the Bureau of Labor Statistics OEWS. Nothing on a card is invented.",
    portal_open: "Open the Cool Careers Portal",

    district_label: "BUILT FOR DISTRICT APPROVAL",
    district: [
      ["Zero student PII", " — class code + nickname; no student emails or accounts"],
      ["FERPA / COPPA-friendly", " by design — essentially nothing to review"],
      ["District-safe curated resources", " — PBS, .gov, .edu prioritized; every link auto-checked"],
      ["WCAG 2.1 AA", " accessibility options — text size, high contrast, reduced motion"],
      ["National Career Clusters aligned", " — CTE program integration, Perkins V & workforce-grant eligible"],
      ["One code, one URL", " — a class is set up in the time it takes to write it on the board"],
      ["Curriculum actually protected", " — station rows and files are gated at the database and the file store, not just hidden in the interface"],
    ],
    video_title: "Cool Careers",
    video_sub: "Workforce Development for Sustainability",
    video_play: "Play the Cool Careers music video",

    eagle_alt: "A felt eagle in a work harness holding a solar panel.",
    cta_head: "Bring Cool Careers to your school.",
    cta_sub: "One class period. Zero student data. A pipeline that starts in class.",
    cta_btn: "Book a pilot demo",
    footer: "ALL ABOARD EARTH · UP WE GO! 🌱",
    give: "Donations are held for us by our fiscal sponsor,",
  },

  es: {
    nav_home: "Inicio",
    nav_cta: "Reserva una demo",
    hero_title: "Juega. Encuentra un futuro.",
    hero_title_b: "Una sola clase.",
    hero_band: [["Alineado a estándares", "marigold"], [", ", null], ["cero datos estudiantiles", "sky"], [", ", null], ["financiable por CTE", "leaf"], [": exploración de carreras que se integra a una clase existente.", null]],
    hero_caption: "Autobuses escolares de fieltro cargándose con sol y viento.",

    why_label: "POR QUÉ IMPORTA",
    why: [
      { n: "3×", hue: "leaf", text: "Los empleos en energía limpia crecieron 3× más rápido que el resto de la economía de EE. UU. el año pasado — casi 100,000 empleos nuevos", src: "US DOE, USEER 2025" },
      { n: "7 de 8", hue: "sky", text: "trabajadores en el mundo no tienen ni una sola habilidad verde — la contratación verde crece casi 2× más rápido que el talento verde", src: "LinkedIn Global Green Skills Report 2025" },
      { n: "1 de 3", hue: "coral", text: "nuevos empleos energéticos en EE. UU. en años recientes fueron para trabajadores latinos/hispanos — y el 29% de la fuerza laboral energética tiene menos de 30 años", src: "US DOE, USEER 2025" },
    ],


    themes_label: "CUATRO LÍNEAS DESDE LA ESTACIÓN",
    themes_h: "Las carreras.",
    themes_lede: "Treinta y seis de las cuarenta cartas de carrera recorren una de cuatro líneas. Abre cualquiera para ver su video, programas, pasantías y mentores.",
    themes: {
      energy: {
        n: "12",
        name: "Energía Renovable",
        blurb: "Energía sin quemar el futuro — y el almacenamiento, las redes y los vehículos que la mueven.",
      },
      land: {
        n: "9",
        name: "Agricultura Regenerativa",
        blurb: "Alimento cultivado dejando el suelo más profundo de como lo encontraste. De los microbios al mar.",
      },
      water: {
        n: "7",
        name: "Gestión Sostenible del Agua",
        blurb: "Captarla, limpiarla, moverla y conservarla — donde más seco está y más importa.",
      },
      circular: {
        n: "8",
        name: "Economía Circular",
        blurb: "Diseñar el desperdicio fuera del objeto antes de fabricarlo, y minar lo que ya tiramos.",
      },
    },
    themes_more: "También aquí:",
    card_open: "Abrir en el Explorador de Baraja",

    curric_label: "EL CURRÍCULO",
    curric_h: "Cada carta es una lección, ya escrita.",
    curric_items: ["Presentación docente", "Infografía", "3 planes de clase", "3 lecturas", "Tarjetas", "Cuestionarios, los tres niveles", "Tarea de desempeño + rúbrica", "Paquete de impresión en un zip"],
    tiers_h: "Tres niveles de grado.",
    tiers: [["3–5", "Video, la lectura, tarjetas, un cuestionario de 3 preguntas"], ["6–8", "La lectura, la infografía, un cuestionario de 5 preguntas"], ["9–12", "La infografía, la lectura, un cuestionario de 5 preguntas, la tarea de desempeño"]],
    tiers_foot: "El estudiante elige nivel una vez; el maestro puede fijar uno para toda la clase.",

    std_label: "TRES MANDATOS, UNA CLASE",
    std_h: "Cuenta para lo que ya tienes que enseñar.",
    std: [
      ["NGSS", "leaf", "Transferencia de energía, ciclos de la materia, impacto humano y sistemas terrestres son el contenido, no el tema. Las estaciones llevan sus códigos.", "El Mapa de Estándares muestra qué cubrió la sesión — la vista que un distrito pide primero."],
      ["Educación financiera", "marigold", "La Línea Verde es un palo completo de finanzas personales, etiquetado a la línea PFL de Nuevo México y escrito contra la HB 171.", "En Albuquerque Public Schools, Educación Financiera Personal es un requisito de graduación."],
      ["Educación Técnica y Profesional", "sky", "Cada carta se mapea a un National Career Cluster 2024 y a un programa de estudios, así que jugar genera documentación en vez de costarla.", "Elegible para Perkins V y fondos laborales."],
    ],

    gl_label: "LA LÍNEA VERDE",
    gl_h: "El dinero es un flujo, no un montón.",
    gl_lede: "La Línea Verde cruza todas las demás, porque el dinero lo hace. Los estudiantes ya hablan ecosistema gracias a la baraja, así que cada idea financiera se enseña a través de la tierra.",
    gl_from: "Mi dinero",
    gl_to: "Nuestro dinero",
    gl_art_alt: "La Línea Verde saliendo de un pueblo de montaña, su ruta brillando en verde por el valle.",
    gl_stops: ["Primer Cheque", "Dirige el Flujo", "Siembra Temprano", "Construye tu Suelo", "El Viaje del Dólar", "Dónde Duerme el Dinero", "El Común", "Green Hustle"],
    gl_dict_h: "Las traducciones son la enseñanza",
    gl_dict: [
      ["Interés compuesto", "Un árbol sembrado temprano — crecimiento sobre crecimiento"],
      ["Fondo de emergencia", "Un banco de semillas; una cisterna para la seca"],
      ["Un presupuesto", "Un plan de riego — no tienes más agua, la diriges estratégicamente"],
      ["Crédito", "Salud del suelo — se construye lento, invisible hasta que lo necesitas — aporta fertilidad para cultivar tu futuro"],
      ["Deuda de alto interés", "Erosión — la que destruye la estabilidad financiera"],
      ["Seguro", "El cortafuegos — se corta antes del incendio, no durante, para evitar que un solo desastre arruine todo tu paisaje financiero"],
    ],

    path_label: "DE LA CHISPA AL SUELDO",
    path_h: "Inspirar es la parte fácil.",
    path_lede: "Casi todos los programas de carreras se detienen en el póster. Este lleva al estudiante a un sueldo, y a alguien que ya hace el trabajo y contestará el teléfono.",
    path_nums: [
      ["102", "videos curados", "PBS, TED-Ed, NASA y NOAA — seguros para el distrito, y cada enlace revisado"],
      ["86", "rutas educativas", "Títulos, certificados, aprendizajes y programas de dos años"],
      ["85", "pasantías", "Vacantes reales, ligadas a la carta que encendió el interés"],
      ["340", "mentores", "Gente que ya hace el trabajo, junto a la carrera que ejerce"],
    ],
    path_foot: "Salarios del OEWS del Bureau of Labor Statistics. Nada en una carta es inventado.",
    portal_open: "Abre el Portal de Cool Careers",

    district_label: "HECHO PARA LA APROBACIÓN DEL DISTRITO",
    district: [
      ["Cero datos personales", " — código de clase + apodo; sin correos ni cuentas de estudiantes"],
      ["Compatible con FERPA / COPPA", " desde el diseño — prácticamente nada que revisar"],
      ["Recursos curados y seguros", " — prioridad a PBS, .gov y .edu; cada enlace se revisa automáticamente"],
      ["WCAG 2.1 AA", " opciones de accesibilidad — tamaño de texto, alto contraste, movimiento reducido"],
      ["Alineado a National Career Clusters", " — integración con programas CTE, elegible para Perkins V y fondos laborales"],
      ["Un código, una dirección", " — una clase queda lista en lo que tardas en escribirla en el pizarrón"],
      ["Currículo realmente protegido", " — las filas y los archivos de estación están restringidos en la base de datos y en el almacenamiento, no solo ocultos en la interfaz"],
    ],
    video_title: "Cool Careers",
    video_sub: "Desarrollo laboral para la sostenibilidad",
    video_play: "Reproducir el video musical de Cool Careers",

    eagle_alt: "Un águila de fieltro con arnés de trabajo sosteniendo un panel solar.",
    cta_head: "Lleva Cool Careers a tu escuela.",
    cta_sub: "Una clase. Cero datos estudiantiles. Una ruta que empieza en el salón.",
    cta_btn: "Reserva una demo",
    footer: "ALL ABOARD EARTH · ¡ARRIBA VAMOS! 🌱",
    give: "Las donaciones las administra nuestro patrocinador fiscal,",
  },
};
