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

export const LINKS = {
  home: "/",
  coolCareers: "/cool-careers",
  edutainment: "/edutainment",
  regenArt: "/regenerative-art",
  gamePortal: "https://cool-careers.allaboardearth.com",
  // Phase 2: pilot-demo CTAs point at a real Wix Bookings service (School
  // Performance). The earlier /contact placeholder was a 404 — never point a CTA there.
  booking: "https://www.allaboardearth.com/service-page/school-performance",
  // "Book a show" opens the visitor's own mail app with the request pre-addressed,
  // rather than sending them through the Wix booking flow.
  bookingMail: `mailto:allaboardearth@gmail.com?subject=${encodeURIComponent("All Aboard Earth Booking Request")}`,
  grooves: "https://www.allaboardearth.com/grooves",
  // "Hear the music" goes straight to the artist page, not the Wix grooves page.
  spotify: `https://open.spotify.com/artist/${SPOTIFY_ARTIST_ID}`,
  donate: "https://www.tessafoundation.org/donate",
  instagram: "https://www.instagram.com/allaboardearth",
};
