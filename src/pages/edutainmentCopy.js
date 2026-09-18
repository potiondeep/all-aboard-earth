// Environmental Edutainment page copy. Spanish is an unofficial rendering — see CONTENT_NEEDED.md.
export const edCopy = {
  en: {
    nav_cta: "Book a show",
    title: "Environmental Edutainment",
    tagline: "Inspiring a new generation of ecological geniuses through live performance and music production.",
    cta_book: "Book a show",
    cta_listen: "Hear the music",

    live_label: "LIVE PERFORMANCE",
    live_h: "The show walks on stage as a zebra, a giraffe and a bee.",
    live_p: "Costumed characters, call-and-response hooks and a table of real food: assemblies, festivals, farmers markets and street corners. Kids meet the ecosystem as characters they can talk back to — and leave singing the science.",
    news_label: "ON THE NEWS",
    news_title: "KRQE Environmental Activism",
    news_play: "Play the KRQE news segment about All Aboard Earth",
    gallery_label: "ON STAGE",
    gallery_cap: "Live sets across New Mexico — hover to hold a frame.",

    music_label: "MUSIC PRODUCTION",
    music_h: "Songs that teach without sounding like a lesson.",
    music_p: "Original conscious hip hop written around ecological ideas — soil, water, solar, pollinators, green careers — produced in-house and released as singles, videos and classroom-ready tracks. The music earns the room; the science rides the groove.",
    music_points: [
      ["Original tracks", "Written, recorded and mixed in-house, in English and Spanish."],
      ["Music videos", "Every song becomes a video the classroom can play."],
      ["Classroom-ready", "Tracks and visuals that plug straight into a lesson."],
    ],
    boombox_cap: "The Earth boombox — where the garden meets the speaker.",
    bus_alt: "The All Aboard Earth bus painted as the Earth, animals riding along",


    lb_open: "Click to view large.",
    lb_prev: "Previous",
    lb_next: "Next",
    lb_close: "Close",
    listen_label: "LISTEN & WATCH",
    spotify_title: "All Aboard Earth on Spotify",
    yt_title: "All Aboard Earth on YouTube",
    yt_go: "Watch the channel →",
    booking_point: ["School assemblies & community events", "One class period or a whole cafeteria; a festival stage, a plaza, a farmers market or a block party."],
    cta_head: "Bring the show to your stage.",
    cta_sub: "Assemblies, festivals, markets and community events — bilingual, all ages.",
    footer: "ALL ABOARD EARTH · UP WE GO! 🌱",
    give: "Donations are held for us by our fiscal sponsor,",
  },
  es: {
    nav_cta: "Reserva un show",
    title: "Edutenimiento Ambiental",
    tagline: "Inspirando a una nueva generación de genios ecológicos a través de la presentación en vivo y la producción musical.",
    cta_book: "Reserva un show",
    cta_listen: "Escucha la música",

    live_label: "PRESENTACIÓN EN VIVO",
    live_h: "El show sube al escenario como cebra, jirafa y abeja.",
    live_p: "Personajes con vestuario, coros de llamada y respuesta y una mesa con comida real: asambleas escolares, festivales, mercados de agricultores y esquinas. Los niños conocen el ecosistema como personajes que les responden — y se van cantando la ciencia.",
    news_label: "EN LAS NOTICIAS",
    news_title: "KRQE Environmental Activism",
    news_play: "Reproducir el reportaje de KRQE sobre All Aboard Earth",
    gallery_label: "EN ESCENA",
    gallery_cap: "Presentaciones en vivo por todo Nuevo México — pasa el cursor para detener una imagen.",

    music_label: "PRODUCCIÓN MUSICAL",
    music_h: "Canciones que enseñan sin sonar a clase.",
    music_p: "Hip hop consciente original escrito alrededor de ideas ecológicas — suelo, agua, energía solar, polinizadores, carreras verdes — producido en casa y publicado como sencillos, videos y pistas listas para el salón. La música gana la sala; la ciencia viaja en el groove.",
    music_points: [
      ["Pistas originales", "Escritas, grabadas y mezcladas en casa, en inglés y español."],
      ["Videos musicales", "Cada canción se convierte en un video que el salón puede reproducir."],
      ["Listas para el salón", "Pistas y visuales que se integran directo a una lección."],
    ],
    boombox_cap: "El boombox de la Tierra — donde el jardín se encuentra con la bocina.",
    bus_alt: "El autobús All Aboard Earth pintado como la Tierra, con animales viajando",


    lb_open: "Haz clic para verlo en grande.",
    lb_prev: "Anterior",
    lb_next: "Siguiente",
    lb_close: "Cerrar",
    listen_label: "ESCUCHA Y MIRA",
    spotify_title: "All Aboard Earth en Spotify",
    yt_title: "All Aboard Earth en YouTube",
    yt_go: "Ve el canal →",
    booking_point: ["Asambleas escolares y eventos comunitarios", "Una clase o toda la cafetería; un escenario de festival, una plaza, un mercado de agricultores o una fiesta de barrio."],
    cta_head: "Lleva el show a tu escenario.",
    cta_sub: "Asambleas, festivales, mercados y eventos comunitarios — bilingüe, todas las edades.",
    footer: "ALL ABOARD EARTH · ¡ARRIBA VAMOS! 🌱",
    give: "Las donaciones las administra nuestro patrocinador fiscal,",
  },
};

// Events. Several shows have more than one photo or clip: those tiles cycle and
// stop on whichever frame the pointer lands on. Single-media events stay still.
export const EVENTS = [
  { id: "market", label: "Farmers market, April 2019", items: [
    ["img", "stage-3", "Two performers in zebra and giraffe costumes with arms raised", null, "50% 4%"],
    ["img", "stage-4", "Performers behind a rainbow table loaded with fresh produce", null, "50% 8%"],
    ["img", "stage-5", "The giraffe character greeting the crowd across the table", null, "50% 24%"],
    ["img", "stage-6", "Both performers mid-song with arms wide"],
    ["img", "stage-7", "The zebra character leaning into the microphone"],
    ["img", "stage-8", "The pair dancing behind the produce table", null, "50% 8%"],
    ["img", "stage-9", "A performer in a giraffe hood behind a keyboard and vegetables"],
    ["img", "stage-10", "Wide shot of the set with the crowd on the grass", null, "50% 26%"],
    ["img", "stage-2", "A small child shaking hands with a costumed performer", null, "50% 22%"],
  ]},
  { id: "school", label: "School workshop on the court", items: [
    ["img", "ev-school-1", "A zebra-suited performer leading kids seated on a basketball court", 1200],
    ["img", "ev-school-2", "Kids jumping up to join the dance", 1200],
    ["img", "ev-school-3", "The performer mid-step with the circle of children", 1200],
    ["img", "ev-school-4", "Children with arms in the air copying the moves", 1200],
  ]},
  { id: "electrify", label: "Electrify — sun puppet on the plaza", items: [
    ["video", "ev-electrify", "A performer sings beside a giant orange sun puppet"],
  ]},
  { id: "sail", label: "Summer stage under the sail", items: [
    ["video", "ev-sailstage", "Two performers on an outdoor stage under a white shade sail"],
  ]},
  { id: "earthday", label: "Earth Day", items: [
    ["video", "ev-earthday", "Costumed performers behind a decorated table on an outdoor stage"],
  ]},
  { id: "crowd", label: "Festival stage", items: [
    ["img", "stage-11", "Costumed performers and a circle of kids singing together"],
  ]},
  { id: "lowrider", label: "Plaza, 2017", items: [
    ["img", "stage-13", "A butterfly-winged character on a lowrider at a plaza"],
  ]},
  { id: "shade", label: "Shaded stage", items: [
    ["img", "stage-1", "The band on a shaded outdoor stage with a puppet character"],
  ]},
  { id: "earthsuit", label: "Adobe plaza", items: [
    ["img", "stage-12", "A performer in a blue Earth suit dancing outside an adobe building"],
  ]},
  { id: "scaffold", label: "Stage rig, 2025", items: [
    ["img", "ev-scaffold", "Looking up at a performer on stage through the rigging"],
  ]},
  { id: "meadow", label: "Meadow set, 2017", items: [
    ["img", "ev-meadow", "Three costumed performers playing in a green meadow"],
  ]},
  { id: "solarface", label: "Solar panel", items: [
    ["video", "ev-solardance", "A performer dancing behind a solar panel in the desert", null, "50% 26%"],
  ]},
];
