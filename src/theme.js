// Color Crew — shared by every page so the palette has one source of truth.
export const T = {
  pine: "#0E2A1B",
  pineDeep: "#081D12",
  cream: "#FFF4DF",
  marigold: "#FFB53C",
  coral: "#FF5C39",
  sky: "#6FD3FF",
  leaf: "#3FA968",
};

// The band's Spotify artist page — the same one embedded on allaboardearth.com/grooves.
export const SPOTIFY_ARTIST_ID = "3PxV0vuP14pMfk7HJi1YFE";

// Where enquiries go. Shown as visible text as well as used in the mailto links,
// because mailto: is inert on a machine with no mail client registered.
export const BOOKING_EMAIL = "allaboardearth@gmail.com";
const mailTo = (subject) => `mailto:${BOOKING_EMAIL}?subject=${encodeURIComponent(subject)}`;

export const LINKS = {
  home: "/",
  coolCareers: "/cool-careers",
  edutainment: "/edutainment",
  regenArt: "/regenerative-art",
  gamePortal: "https://cool-careers.allaboardearth.com",
  // Phase 2: pilot-demo CTAs point at a real Wix Bookings service (School
  // Performance). The earlier /contact placeholder was a 404 — never point a CTA there.
  booking: "https://www.allaboardearth.com/service-page/school-performance",
  // Every CTA opens the visitor's own mail app, pre-addressed and pre-subjected,
  // rather than sending them through the Wix booking flow. One subject per ask,
  // so the inbox sorts itself.
  bookingMail: mailTo("All Aboard Earth Booking Request"),   // "Book a show"
  demoMail: mailTo("Cool Careers Demo"),                     // "Book a pilot demo"
  commissionMail: mailTo("Regenerative Art Opportunity"),    // "Commission a project"
  grooves: "https://www.allaboardearth.com/grooves",
  // "Hear the music" goes straight to the artist page, not the Wix grooves page.
  spotify: `https://open.spotify.com/artist/${SPOTIFY_ARTIST_ID}`,
  donate: "https://www.tessafoundation.org/donate",
  instagram: "https://www.instagram.com/allaboardearth",
};
