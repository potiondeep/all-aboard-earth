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
    hero_portal: "Open the game portal",
    hero_demo: "Book a pilot demo",
    hero_caption: "Felt school buses charging up on sun and wind.",

    why_label: "WHY NOW",
    why: [
      { n: "3×", hue: "leaf", text: "Clean energy jobs grew 3× faster than the rest of the US economy last year — nearly 100,000 new jobs", src: "US DOE, USEER 2025" },
      { n: "7 in 8", hue: "sky", text: "workers worldwide lack even a single green skill — green hiring grows nearly 2× as fast as green talent", src: "LinkedIn Global Green Skills Report 2025" },
      { n: "1 in 3", hue: "coral", text: "new US energy jobs in recent years have gone to Latino/Hispanic workers — and 29% of the energy workforce is under 30", src: "US DOE, USEER 2025" },
    ],
    students_label: "WHAT STUDENTS DO",
    students: [
      ["Play", " a card game about real regenerative careers — solo, in pairs or in teams"],
      ["Tell", " their own nature-origin story"],
      ["Reveal", " the career avatar that story earns them"],
      ["Follow real pathways", " — videos, programs, internships and mentors on every card"],
    ],
    students_foot: "106 cards, mapped to the National Career Clusters.",
    pipeline: "This pipeline starts in class.",

    /* ---- how the game works ---- */
    game_label: "HOW THE GAME WORKS",
    game_h: "A deck, a story, and a line to ride.",
    game_lede: "Students open one URL on any browser — a phone, a Chromebook, the projector. No app store, no accounts, no student emails. The game is the front door; everything else hangs off the card in their hand.",
    game_steps: [
      ["Draw a hand", "Career cards, action cards and the seven elements — wind, water, solar, geothermal, soil, microbes and minerals. Actions need elements. Elements need trading."],
      ["Play the table", "Sprout for younger players, Standard for a normal period, Expedition when you want climate events like Storm Front in the mix. Solo, pairs or teams."],
      ["Tell your story", "A few lines about your own life outdoors, plus what you are good at. No names, no emails — a handle and a class code."],
      ["Meet your avatar", "The story comes back as a persona, then two or three career clusters with a plain-language reason each: why this one fits you."],
      ["Ride the line", "Every matched card opens onto its own Deep Dive — watch, read, quiz, and the real programs, internships and mentors behind it."],
    ],
    deck_label: "THE DECK",
    deck: [
      ["40", "career cards", "Real regenerative jobs, each one flipping to its training cost and its wages"],
      ["45", "action cards", "The work itself — fire ecology, passive solar design, degraded land restoration"],
      ["14", "Green Line cards", "The financial literacy suit, dealt into the same game"],
      ["7", "element cards", "Wind · water · solar · geothermal · soil · microbes · minerals"],
    ],
    deck_foot: "106 cards. The printed deck and the digital deck are the same deck — every card carries a QR that lands on its own station.",

    /* ---- the four thematic areas ---- */
    themes_label: "FOUR LINES OUT OF THE STATION",
    themes_h: "Where the careers actually live.",
    themes_lede: "Thirty-six of the forty career cards ride one of four lines. Each card opens into the Deck Explorer with its video, its education pathways, its internships and its mentors already attached.",
    themes: {
      energy: {
        n: "12",
        name: "Renewable Energy",
        blurb: "Making power without burning the future — and the storage, grids and vehicles that move it around.",
        curric: "Energy transfer and conservation, electrical systems, siting and grid design. The fastest-hiring line on the board.",
      },
      land: {
        n: "9",
        name: "Regenerative Agriculture",
        blurb: "Growing food in a way that leaves the soil deeper than you found it — from microbes up to ocean farms.",
        curric: "Living soil, carbon and nutrient cycles, ecosystem services, food systems. The line where biology class turns into a job.",
      },
      water: {
        n: "7",
        name: "Sustainable Water",
        blurb: "Catching it, cleaning it, moving it and keeping it — in the driest places, where it matters most.",
        curric: "Watersheds, hydrologic cycles, filtration and reuse, drought resilience. In New Mexico this line reads as local news.",
      },
      circular: {
        n: "8",
        name: "Circular Economy",
        blurb: "Designing waste out of the thing before it is ever made, and mining what we already threw away.",
        curric: "Materials, life-cycle thinking, supply chains, remanufacture and repair. Systems thinking with a paycheck attached.",
      },
    },
    themes_more: "Also on this line:",
    crosscut_h: "And four that ride every line.",
    crosscut_p: "Somebody has to argue the case, tell the story, film it and paint it. These cards belong to no single field — they attach to all of them.",
    card_open: "Open in the Deck Explorer",

    /* ---- the curriculum ---- */
    curric_label: "THE CURRICULUM",
    curric_h: "Every card is a lesson, already written.",
    curric_lede: "104 of the 106 cards have a published Station — the full teaching package behind that card, built for three grade bands and ready to print. 1,317 files, and a teacher never has to open more than one page of it.",
    curric_items: [
      ["Teacher deck", "A brand-passed PDF, built to present full-screen"],
      ["Infographic", "One page that explains the card at a glance"],
      ["3 lesson plans", "One per grade band, written to the period"],
      ["3 reading passages", "Levelled, in the app's own type and printable"],
      ["Flashcards", "Tap to flip, shuffle, progress dots"],
      ["Quizzes", "Elementary, middle and high — immediate feedback with a reason"],
      ["Performance task", "High school, with its rubric"],
      ["Print bundle", "One zip per grade band, because passing period is two minutes"],
    ],
    tiers_h: "Three tiers, one switch.",
    tiers: [["3–5", "Video, the reading, flashcards, a 3-question quiz"], ["6–8", "The reading, the infographic, a 5-question quiz"], ["9–12", "The infographic, the reading, a 5-question quiz, the performance task"]],
    tiers_foot: "A student picks a tier once; a teacher can pin one for the whole class.",

    /* ---- standards ---- */
    std_label: "THREE MANDATES, ONE PERIOD",
    std_h: "It counts for what you already have to teach.",
    std: [
      ["NGSS", "leaf", "Stations carry their standard codes, so a card is not a field trip from the science you owe. Energy transfer, matter cycling, human impact and Earth systems are the content, not the theme.", "The Standards Map shows a teacher exactly what a session covered — the view a district asks for first."],
      ["Financial literacy", "marigold", "The Green Line is a full personal-finance suit tagged to New Mexico's personal financial literacy strand — written against HB 171, which put financial literacy in the required social studies core and made a Next-Step Plan compulsory for every student.", "In Albuquerque Public Schools, Personal Financial Literacy is an outright graduation requirement."],
      ["Career & Technical Education", "sky", "Every card maps to a 2024 National Career Cluster and a program of study, so play generates documentation instead of costing you it.", "Perkins V and workforce-grant eligible. Fare & Return turns the Next-Step Plan conversation into something a 15-year-old will actually have."],
    ],

    /* ---- the green line ---- */
    gl_label: "THE GREEN LINE",
    gl_h: "Money is a flow, not a pile.",
    gl_lede: "Every career cluster is a line a student can ride. The Green Line crosses all of them — because money does. “Green” means cash and ecology at once, and the double meaning is the curriculum: students already speak ecosystem from the deck, so every personal-finance idea is taught through the land.",
    gl_stops: ["First Check", "Direct the Flow", "Plant Early", "Build Your Soil", "The Dollar Ride", "Where Money Sleeps", "The Commons", "Green Hustle"],
    gl_dict_h: "The translations do the teaching",
    gl_dict: [
      ["Compound interest", "A tree planted early — growth on growth"],
      ["Emergency fund", "A seed bank; a cistern for the dry season"],
      ["A budget", "An irrigation plan — you don't get more water, you direct it"],
      ["Credit", "Soil health — built slowly, invisible until you need it"],
      ["High-interest debt", "Erosion"],
      ["Insurance", "The firebreak — cut before the fire, not during it"],
    ],
    gl_rides_h: "Four rides students actually play",
    gl_rides: [
      ["First Paycheck", "Land the job on your card, read the paystub, feel the tax shock, then allocate what's left"],
      ["The Dollar Ride", "Route a dollar through your own town and watch it either loop or leave"],
      ["Money Forest", "Plant dollar-trees at different ages and see the forest at thirty"],
      ["Commons Fund", "The class allocates a mock community fund across real projects, argues, then votes"],
    ],
    gl_foot: "Anchored on the acequia — three centuries of community-governed water in New Mexico. Economics, civics and ecology in one living local institution.",

    /* ---- the pathway ---- */
    path_label: "FROM SPARK TO PAYCHECK",
    path_h: "Inspiration is the easy part.",
    path_lede: "Most career programs stop at the poster. This one is built as one vehicle that carries a student the whole way — from the assembly that lights them up to a job with a wage attached and somebody already in it who will pick up the phone.",
    path: [
      ["01", "Inspiration", "marigold", "The assembly, the music, the art, the game. A student who has never heard of a silvopasture specialist meets one on a card and wants to be them."],
      ["02", "Education", "leaf", "The Station behind the card, and 86 real education, training and certification routes into that work — degrees, certificates, apprenticeships, two-year programs."],
      ["03", "Connection", "sky", "340 mentors and 85 internships attached to the cards, so the next step is a person and a place rather than a search box."],
      ["04", "Realization", "coral", "Fare & Return: flip any career card to see what the training costs, how long it takes, and what it pays entering and mid-career. The reveal is that the highest wage is rarely the best deal."],
    ],
    path_nums: [
      ["102", "curated videos", "PBS, TED-Ed, NASA and NOAA — district-safe, and every link re-checked"],
      ["86", "education routes", "Degrees, certificates, apprenticeships and two-year programs"],
      ["85", "internships", "Real openings, tied to the card that sparked the interest"],
      ["340", "mentors", "People already doing the work, attached to the career they do"],
    ],
    path_foot: "Wages come from the Bureau of Labor Statistics OEWS. Nothing on a card is invented.",
    path_track: "Students keep their own My Path tracker — saved cards, saved opportunities, a progress map — synced across devices without ever storing a name.",

    teachers_label: "WHAT TEACHERS GET",
    teachers: [
      ["45·50·60·90", "auto-paced lesson plan for your period length", "leaf"],
      ["2 min", "projected join code — students in fast", "sky"],
      ["Run of Show", "pick the station the period is built around", "marigold"],
      ["One zip", "the whole station's print bundle, per grade band", "coral"],
      ["Map", "Standards Map shows what each session covers", "leaf"],
      ["Pre / post", "automatic reflection capture for your report", "sky"],
      ["QR sheet", "printable codes for the physical deck", "marigold"],
      ["Green Line Kit", "the financial literacy unit, ready to run", "coral"],
    ],
    district_label: "BUILT FOR DISTRICT APPROVAL",
    district: [
      ["Zero student PII", " — class code + nickname; no student emails or accounts"],
      ["FERPA / COPPA-friendly", " by design — essentially nothing to review"],
      ["District-safe curated resources", " — PBS, .gov, .edu prioritized; every link auto-checked"],
      ["WCAG 2.1 AA", " accessibility options — text size, high contrast, reduced motion"],
      ["National Career Clusters aligned", " — CTE program integration, Perkins V & workforce-grant eligible"],
      ["One code, one URL", " — a class is set up in the time it takes to write it on the board"],
    ],
    pilot_title: "Pilot free with one class period —",
    pilot_hi: " 2026–27 cohort now booking.",

    video_title: "Cool Careers",
    video_sub: "Workforce Development for Sustainability",
    video_play: "Play the Cool Careers music video",

    eagle_alt: "A felt eagle in a work harness holding a solar panel.",
    portal_label: "THE GAME PORTAL",
    portal_title: "Step inside the game.",
    portal_sub: "Students set up an explorer profile, link up with a classmate to play, meet their career avatar, and ride the Green Line — no accounts, no student data.",
    portal_points: ["Set up your explorer profile", "Play the Game", "Build Your Cool Career", "Ride the Green Line"],
    portal_btn: "Enter the game portal",

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
    hero_portal: "Abre el portal del juego",
    hero_demo: "Reserva una demo",
    hero_caption: "Autobuses escolares de fieltro cargándose con sol y viento.",

    why_label: "POR QUÉ AHORA",
    why: [
      { n: "3×", hue: "leaf", text: "Los empleos en energía limpia crecieron 3× más rápido que el resto de la economía de EE. UU. el año pasado — casi 100,000 empleos nuevos", src: "US DOE, USEER 2025" },
      { n: "7 de 8", hue: "sky", text: "trabajadores en el mundo no tienen ni una sola habilidad verde — la contratación verde crece casi 2× más rápido que el talento verde", src: "LinkedIn Global Green Skills Report 2025" },
      { n: "1 de 3", hue: "coral", text: "nuevos empleos energéticos en EE. UU. en años recientes fueron para trabajadores latinos/hispanos — y el 29% de la fuerza laboral energética tiene menos de 30 años", src: "US DOE, USEER 2025" },
    ],
    students_label: "LO QUE HACEN LOS ESTUDIANTES",
    students: [
      ["Juegan", " un juego de cartas sobre carreras regenerativas reales — solos, en parejas o en equipos"],
      ["Cuentan", " su propia historia de origen con la naturaleza"],
      ["Descubren", " el avatar de carrera que esa historia les gana"],
      ["Siguen rutas reales", " — videos, programas, pasantías y mentores en cada carta"],
    ],
    students_foot: "106 cartas, alineadas a los National Career Clusters.",
    pipeline: "Esta ruta empieza en el salón.",

    game_label: "CÓMO FUNCIONA EL JUEGO",
    game_h: "Una baraja, una historia y una línea que recorrer.",
    game_lede: "Los estudiantes abren una sola dirección en cualquier navegador — un teléfono, una Chromebook, el proyector. Sin tienda de apps, sin cuentas, sin correos estudiantiles. El juego es la puerta de entrada; todo lo demás cuelga de la carta que tienen en la mano.",
    game_steps: [
      ["Roba una mano", "Cartas de carrera, cartas de acción y los siete elementos — viento, agua, sol, geotermia, suelo, microbios y minerales. Las acciones necesitan elementos. Los elementos se negocian."],
      ["Juega la mesa", "Sprout para los más pequeños, Standard para una clase normal, Expedition cuando quieras eventos climáticos como Storm Front. Solo, en parejas o en equipos."],
      ["Cuenta tu historia", "Unas líneas sobre tu propia vida al aire libre y en qué eres bueno. Sin nombres ni correos — un apodo y un código de clase."],
      ["Conoce tu avatar", "La historia vuelve como un personaje, y luego dos o tres clusters de carreras con una razón clara en cada uno: por qué este va contigo."],
      ["Recorre la línea", "Cada carta emparejada abre su propia Inmersión — ver, leer, responder, y los programas, pasantías y mentores reales que hay detrás."],
    ],
    deck_label: "LA BARAJA",
    deck: [
      ["40", "cartas de carrera", "Empleos regenerativos reales; cada una se voltea para mostrar su costo de formación y su salario"],
      ["45", "cartas de acción", "El trabajo mismo — ecología del fuego, diseño solar pasivo, restauración de tierras degradadas"],
      ["14", "cartas de la Línea Verde", "El palo de educación financiera, repartido dentro del mismo juego"],
      ["7", "cartas de elemento", "Viento · agua · sol · geotermia · suelo · microbios · minerales"],
    ],
    deck_foot: "106 cartas. La baraja impresa y la digital son la misma baraja — cada carta lleva un QR que aterriza en su propia estación.",

    themes_label: "CUATRO LÍNEAS DESDE LA ESTACIÓN",
    themes_h: "Dónde viven realmente las carreras.",
    themes_lede: "Treinta y seis de las cuarenta cartas de carrera recorren una de cuatro líneas. Cada carta abre en el Explorador de Baraja con su video, sus rutas educativas, sus pasantías y sus mentores ya vinculados.",
    themes: {
      energy: {
        n: "12",
        name: "Energía Renovable",
        blurb: "Generar energía sin quemar el futuro — y el almacenamiento, las redes y los vehículos que la mueven.",
        curric: "Transferencia y conservación de energía, sistemas eléctricos, ubicación y diseño de redes. La línea que contrata más rápido.",
      },
      land: {
        n: "9",
        name: "Agricultura Regenerativa",
        blurb: "Cultivar alimento dejando el suelo más profundo de como lo encontraste — de los microbios a las granjas oceánicas.",
        curric: "Suelo vivo, ciclos de carbono y nutrientes, servicios ecosistémicos, sistemas alimentarios. Donde la clase de biología se vuelve un empleo.",
      },
      water: {
        n: "7",
        name: "Gestión Sostenible del Agua",
        blurb: "Captarla, limpiarla, moverla y conservarla — en los lugares más secos, donde más importa.",
        curric: "Cuencas, ciclos hidrológicos, filtración y reúso, resiliencia ante la sequía. En Nuevo México esta línea se lee como noticia local.",
      },
      circular: {
        n: "8",
        name: "Economía Circular",
        blurb: "Diseñar el desperdicio fuera del objeto antes de fabricarlo, y minar lo que ya tiramos.",
        curric: "Materiales, ciclo de vida, cadenas de suministro, remanufactura y reparación. Pensamiento sistémico con sueldo.",
      },
    },
    themes_more: "También en esta línea:",
    crosscut_h: "Y cuatro que recorren todas.",
    crosscut_p: "Alguien tiene que defender el caso, contar la historia, filmarla y pintarla. Estas cartas no pertenecen a un solo campo — se conectan con todos.",
    card_open: "Abrir en el Explorador de Baraja",

    curric_label: "EL CURRÍCULO",
    curric_h: "Cada carta es una lección, ya escrita.",
    curric_lede: "104 de las 106 cartas tienen una Estación publicada — el paquete docente completo detrás de esa carta, hecho para tres niveles y listo para imprimir. 1,317 archivos, y un maestro nunca tiene que abrir más de una página.",
    curric_items: [
      ["Presentación docente", "Un PDF con la marca, hecho para proyectar a pantalla completa"],
      ["Infografía", "Una página que explica la carta de un vistazo"],
      ["3 planes de clase", "Uno por nivel, escrito para el periodo"],
      ["3 lecturas", "Graduadas, en la tipografía de la app y listas para imprimir"],
      ["Tarjetas", "Toca para voltear, baraja, puntos de progreso"],
      ["Cuestionarios", "Primaria, secundaria y preparatoria — con retroalimentación y su razón"],
      ["Tarea de desempeño", "Preparatoria, con su rúbrica"],
      ["Paquete de impresión", "Un zip por nivel, porque el cambio de clase dura dos minutos"],
    ],
    tiers_h: "Tres niveles, un interruptor.",
    tiers: [["3–5", "Video, la lectura, tarjetas, un cuestionario de 3 preguntas"], ["6–8", "La lectura, la infografía, un cuestionario de 5 preguntas"], ["9–12", "La infografía, la lectura, un cuestionario de 5 preguntas, la tarea de desempeño"]],
    tiers_foot: "El estudiante elige nivel una vez; el maestro puede fijar uno para toda la clase.",

    std_label: "TRES MANDATOS, UNA CLASE",
    std_h: "Cuenta para lo que ya tienes que enseñar.",
    std: [
      ["NGSS", "leaf", "Las estaciones llevan sus códigos de estándar, así que una carta no es una excursión lejos de la ciencia que debes cubrir. Transferencia de energía, ciclos de la materia, impacto humano y sistemas terrestres son el contenido, no el tema.", "El Mapa de Estándares le muestra al maestro exactamente qué cubrió la sesión — la vista que un distrito pide primero."],
      ["Educación financiera", "marigold", "La Línea Verde es un palo completo de finanzas personales etiquetado a la línea de educación financiera de Nuevo México — escrito contra la HB 171, que puso la educación financiera en el núcleo obligatorio de estudios sociales e hizo obligatorio un Next-Step Plan para cada estudiante.", "En Albuquerque Public Schools, Educación Financiera Personal es un requisito de graduación."],
      ["Educación Técnica y Profesional", "sky", "Cada carta se mapea a un National Career Cluster 2024 y a un programa de estudios, así que jugar genera documentación en vez de costarla.", "Elegible para Perkins V y fondos laborales. Fare & Return convierte la charla del Next-Step Plan en algo que un joven de 15 años sí va a tener."],
    ],

    gl_label: "LA LÍNEA VERDE",
    gl_h: "El dinero es un flujo, no un montón.",
    gl_lede: "Cada cluster de carreras es una línea que un estudiante puede recorrer. La Línea Verde cruza todas — porque el dinero lo hace. “Verde” significa efectivo y ecología a la vez, y ese doble sentido es el currículo: los estudiantes ya hablan ecosistema gracias a la baraja, así que cada idea financiera se enseña a través de la tierra.",
    gl_stops: ["Primer Cheque", "Dirige el Flujo", "Siembra Temprano", "Construye tu Suelo", "El Viaje del Dólar", "Dónde Duerme el Dinero", "El Común", "Green Hustle"],
    gl_dict_h: "Las traducciones son la enseñanza",
    gl_dict: [
      ["Interés compuesto", "Un árbol sembrado temprano — crecimiento sobre crecimiento"],
      ["Fondo de emergencia", "Un banco de semillas; una cisterna para la seca"],
      ["Un presupuesto", "Un plan de riego — no tienes más agua, la diriges"],
      ["Crédito", "Salud del suelo — se construye lento, invisible hasta que lo necesitas"],
      ["Deuda de alto interés", "Erosión"],
      ["Seguro", "El cortafuegos — se corta antes del incendio, no durante"],
    ],
    gl_rides_h: "Cuatro trayectos que los estudiantes sí juegan",
    gl_rides: [
      ["Primer Cheque", "Consigue el empleo de tu carta, lee el recibo, siente el golpe de impuestos y reparte lo que queda"],
      ["El Viaje del Dólar", "Recorre un dólar por tu propio pueblo y ve si da vueltas o se va"],
      ["Bosque de Dinero", "Siembra árboles-dólar a distintas edades y mira el bosque a los treinta"],
      ["Fondo Común", "La clase reparte un fondo comunitario simulado entre proyectos reales, discute y vota"],
    ],
    gl_foot: "Anclada en la acequia — tres siglos de agua gobernada por la comunidad en Nuevo México. Economía, civismo y ecología en una institución local viva.",

    path_label: "DE LA CHISPA AL SUELDO",
    path_h: "Inspirar es la parte fácil.",
    path_lede: "Casi todos los programas de carreras se detienen en el póster. Este es un solo vehículo que lleva al estudiante todo el camino — del asamblea que lo enciende a un empleo con un salario y alguien que ya lo hace y contestará el teléfono.",
    path: [
      ["01", "Inspiración", "marigold", "La asamblea, la música, el arte, el juego. Un estudiante que nunca oyó de un especialista en silvopastura conoce a uno en una carta y quiere ser eso."],
      ["02", "Educación", "leaf", "La Estación detrás de la carta, y 86 rutas reales de educación, formación y certificación hacia ese trabajo — títulos, certificados, aprendizajes, programas de dos años."],
      ["03", "Conexión", "sky", "340 mentores y 85 pasantías vinculadas a las cartas, para que el siguiente paso sea una persona y un lugar en vez de un buscador."],
      ["04", "Realización", "coral", "Fare & Return: voltea cualquier carta de carrera y ve cuánto cuesta la formación, cuánto tarda y cuánto paga al entrar y a media carrera. La revelación: el sueldo más alto casi nunca es el mejor trato."],
    ],
    path_nums: [
      ["102", "videos curados", "PBS, TED-Ed, NASA y NOAA — seguros para el distrito, y cada enlace revisado"],
      ["86", "rutas educativas", "Títulos, certificados, aprendizajes y programas de dos años"],
      ["85", "pasantías", "Vacantes reales, ligadas a la carta que encendió el interés"],
      ["340", "mentores", "Gente que ya hace el trabajo, junto a la carrera que ejerce"],
    ],
    path_foot: "Los salarios vienen del OEWS del Bureau of Labor Statistics. Nada en una carta es inventado.",
    path_track: "Cada estudiante lleva su propio rastreador My Path — cartas guardadas, oportunidades guardadas, un mapa de progreso — sincronizado entre dispositivos sin guardar jamás un nombre.",

    teachers_label: "LO QUE RECIBEN LOS MAESTROS",
    teachers: [
      ["45·50·60·90", "plan de clase con ritmo automático para la duración de tu periodo", "leaf"],
      ["2 min", "código de acceso proyectado — los estudiantes entran rápido", "sky"],
      ["Run of Show", "elige la estación sobre la que se arma el periodo", "marigold"],
      ["Un zip", "el paquete de impresión completo de la estación, por nivel", "coral"],
      ["Mapa", "el Mapa de Estándares muestra qué cubre cada sesión", "leaf"],
      ["Pre / post", "captura automática de reflexiones para tu informe", "sky"],
      ["Hoja de QR", "códigos imprimibles para la baraja física", "marigold"],
      ["Kit Línea Verde", "la unidad de educación financiera, lista para correr", "coral"],
    ],
    district_label: "HECHO PARA LA APROBACIÓN DEL DISTRITO",
    district: [
      ["Cero datos personales", " — código de clase + apodo; sin correos ni cuentas de estudiantes"],
      ["Compatible con FERPA / COPPA", " desde el diseño — prácticamente nada que revisar"],
      ["Recursos curados y seguros", " — prioridad a PBS, .gov y .edu; cada enlace se revisa automáticamente"],
      ["WCAG 2.1 AA", " opciones de accesibilidad — tamaño de texto, alto contraste, movimiento reducido"],
      ["Alineado a National Career Clusters", " — integración con programas CTE, elegible para Perkins V y fondos laborales"],
      ["Un código, una dirección", " — una clase queda lista en lo que tardas en escribirla en el pizarrón"],
    ],
    pilot_title: "Piloto gratis con una sola clase —",
    pilot_hi: " inscripciones abiertas para 2026–27.",

    video_title: "Cool Careers",
    video_sub: "Desarrollo laboral para la sostenibilidad",
    video_play: "Reproducir el video musical de Cool Careers",

    eagle_alt: "Un águila de fieltro con arnés de trabajo sosteniendo un panel solar.",
    portal_label: "EL PORTAL DEL JUEGO",
    portal_title: "Entra al juego.",
    portal_sub: "Los estudiantes crean su perfil de explorador, se conectan con un compañero para jugar, conocen su avatar de carrera y viajan en la Línea Verde — sin cuentas, sin datos estudiantiles.",
    portal_points: ["Crea tu perfil de explorador", "Juega", "Construye tu Cool Career", "Viaja en la Línea Verde"],
    portal_btn: "Entra al portal del juego",

    cta_head: "Lleva Cool Careers a tu escuela.",
    cta_sub: "Una clase. Cero datos estudiantiles. Una ruta que empieza en el salón.",
    cta_btn: "Reserva una demo",
    footer: "ALL ABOARD EARTH · ¡ARRIBA VAMOS! 🌱",
    give: "Las donaciones las administra nuestro patrocinador fiscal,",
  },
};
