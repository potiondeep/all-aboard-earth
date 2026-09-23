/**
 * Cool Careers card art, served from the Wix CMS.
 *
 * Each media id was taken from that career's own page at
 * https://www.allaboardearth.com/coolcareers/<slug>, so the homepage and the
 * Wix site stay in sync: replace the image on the CMS item and this updates too.
 *
 * Note on the URL shape: Wix keeps the ORIGINAL upload filename as the final
 * path segment, and for these items that stale name is "Image-empty-state.png".
 * It is a display name only — the media id resolves to the real full-resolution
 * illustration (1856x2624 for the ones spot-checked). Do NOT read that filename
 * as "no image set"; fetch the bytes before concluding anything.
 *
 * Wix's CDN handles resizing, so we request exactly the size the seat needs and
 * let `enc_auto` negotiate AVIF/WebP from the browser's Accept header.
 */

const MEDIA = {
  "artist": "d0e664_639afd54f6a940e08d2af4744547c093~mv2.png",
  "fungi-biochemist": "d0e664_7d046fc17a704fab932bd0d64ef47dd6~mv2.png",
  "recycling-technician": "d0e664_cbbe890db0624c9f9b2d0f2ad283e6e6~mv2.png",
  "hydropower-technician": "d0e664_ba231b0fb38b419990ae594393f2834c~mv2.png",
  "watershed-restoration-specialist": "d0e664_c3e93956831041c4909b84798b83a348~mv2.png",
  "plant-geneticist": "d0e664_ceb51577b7b14278bc80dbcc60367cba~mv2.png",
  "composting-toilet-technician": "d0e664_9448f9bb379d46d2ac8cd523c437403e~mv2.png",
  "stormwater-management-specialist": "d0e664_d93a15cdfcf74c138388755ac7fc560b~mv2.png",
  "greywater-systems-engineer": "d0e664_0d52d089254c44008531a058b43c641a~mv2.png",
  "refrigerant-engineer": "d0e664_b19fbdedddd34691b86a3c51f556aa34~mv2.png",
  "3d-ocean-farmer": "d0e664_e5b1097c5a2d4275a8d597f0307698bf~mv2.png",
  "photovoltaic-power-technician": "d0e664_124d719b3cf34a5eb9654d4dfbdacf1d~mv2.png",
  "microgrid-designer": "d0e664_368cf8d0a62e43ac9915f1d284237c28~mv2.png",
  "wind-power-technician": "d0e664_221faf4b6ff847b1be6c48099149911d~mv2.png",
  "conservation-biologist": "d0e664_68743519929b4c9ab47f545bcf183ca3~mv2.png",
  "remanufacturing-specialist": "d0e664_af24461b55c14159922a97c7891e643e~mv2.png",
  "tidal-power-technician": "d0e664_12ae842e34714b24a276d81f15eaec00~mv2.png",
  "desalination-technician": "d0e664_8bc5b8a08e134bc183e0ca70b7faf186~mv2.png",
  "silvopasture-specialist": "d0e664_37208d88adc24f5ca704c22169041bbe~mv2.png",
  "environmental-journalist": "d0e664_2321dfddf0b74df888e18c7994c9ca0b~mv2.png",
  "energy-efficiency-technician": "d0e664_3c1e54d1cea248e284cba4a4705c7e38~mv2.png",
  "electric-vehicle-engineer": "d0e664_552dd3978bb74d47922a9d1bb4fc4203~mv2.png",
  "ecological-architect": "d0e664_357b1977d645469db53ea6abb15d698c~mv2.png",
  "food-waste-reduction-specialist": "d0e664_05c5722ed96f4cbf99c0b75fb28293da~mv2.png",
  "biofuel-developer": "d0e664_e2e48053763b4da0b2cc287a25e33d55~mv2.png",
  "soil-microbiologist": "d0e664_4d529fe1434d4db0ac40d77947d3639e~mv2.png",
  "circular-supply-chain-specialist": "d0e664_83a46a53ccb5462fad62619d0213aca3~mv2.png",
  "geothermal-technician": "d0e664_231cfceff40941539626257d1052c592~mv2.png",
  "content-creator": "d0e664_69a4e9e87882435187ff0b0fcf13161c~mv2.png",
  "hydrogen-fuel-cell-technician": "d0e664_61ff38b7ce654bf194b46576dcc6ed7e~mv2.png",
  "permaculture-designer": "d0e664_88536360e1ce418899f9e2fe3067e780~mv2.png",
  "building-materials-engineeer": "d0e664_d3ff3f8a3fd14146a7747b1fcc1d53e2~mv2.png",
  "bioremediation-specialist": "d0e664_ab4942ae23684c5da5f76d2d9b2d6030~mv2.png",
  "restoration-ecologist": "d0e664_1ca051fc1dbf4e138d6391a04ba67bd8~mv2.png",
  "environmental-lawyer": "d0e664_a30c84973baa4dbdb26d0518302d5e6f~mv2.png",
  "e-waste-recycling-technician": "d0e664_8565cfb3f5ed42688ca5989424ea0097~mv2.png",
  "aquaponics-technician": "d0e664_4dbca1406aec4bb29eb1157633c0ed8b~mv2.png",
  "energy-storage-developer": "d0e664_6aca7aa464a745b99b173a9139ad6cc5~mv2.png",
  "drip-irrigation-technician": "d0e664_e51b49e6c0b448698aba1756cc31c79f~mv2.png",
  "circular-packaging-developer": "d0e664_ec464a43b8d24319b0d3f7efcb073ce2~mv2.png",
};

/**
 * The card's own entry in the game platform's Deck Explorer. That screen reads
 * ?card=<slug> and opens the matching card, matching on the same slug the art
 * is keyed by here — verified against all five on the live deck.
 * (The Wix career page, https://www.allaboardearth.com/coolcareers/<slug>, is
 * the other home for these; the cards used to point there.)
 */
export const DECK_CARD = (slug) =>
  `https://cool-careers.allaboardearth.com/s/explore?card=${slug}`;

/**
 * Card art, self-hosted.
 *
 * These were pulled from the Wix CMS at full size and re-encoded into
 * /art/cool-careers/cards. The site no longer fetches anything from
 * static.wixstatic.com at runtime, so it does not depend on the Wix site
 * staying up. The MEDIA map above is kept as the record of where each
 * card's original lives, for re-pulling art if a card is redrawn.
 */
export function cardArt(slug) {
  return `/art/cool-careers/cards/${slug}-600.webp`;
}

/* No 2x tier: the card fills a ~200px slot, so the 600px file is already 3x —
   a 1200 file was never the candidate the browser picked. */
