/**
 * The deck, grouped the way a visitor asks about it.
 *
 * The platform's own spine is the 2024 National Career Clusters plus the seven
 * elements — that is what the cards carry and what the Standards Map reports.
 * These four groupings are a second reading of the same 40 career cards, for
 * the question a school actually opens with: *what fields does this cover?*
 * Counts here are the deck, not a claim about the clusters.
 *
 * Card names stay in English in both languages: they label real cards, printed
 * and drawn in English, and each one links into the Deck Explorer where that
 * English name is what you land on. Translating them would mislabel the card.
 *
 * `art: true` means the illustration is self-hosted in
 * /art/cool-careers/cards — see wixCardArt.js for where each original lives.
 */

export const THEMES = [
  {
    key: "energy",
    hue: "marigold",
    cards: [
      { slug: "photovoltaic-power-technician", name: "Photovoltaic Power Technician", art: true },
      { slug: "wind-power-technician", name: "Wind Power Technician", art: true },
      { slug: "geothermal-technician", name: "Geothermal Technician", art: true },
      { slug: "microgrid-designer", name: "Microgrid Designer", art: true },
      { slug: "energy-storage-developer", name: "Energy Storage Developer", art: true },
      { slug: "electric-vehicle-engineer", name: "Electric Vehicle Engineer", art: true },
      { slug: "hydropower-technician", name: "Hydropower Technician" },
      { slug: "tidal-power-technician", name: "Tidal Power Technician" },
      { slug: "hydrogen-fuel-cell-technician", name: "Hydrogen Fuel Cell Technician" },
      { slug: "energy-efficiency-technician", name: "Energy Efficiency Technician" },
      { slug: "biofuel-developer", name: "Biofuel Developer" },
      { slug: "refrigerant-engineer", name: "Refrigerant Engineer" },
    ],
  },
  {
    key: "land",
    hue: "leaf",
    cards: [
      { slug: "soil-microbiologist", name: "Soil Microbiologist", art: true },
      { slug: "permaculture-designer", name: "Permaculture Designer", art: true },
      { slug: "silvopasture-specialist", name: "Silvopasture Specialist", art: true },
      { slug: "3d-ocean-farmer", name: "3D Ocean Farmer", art: true },
      { slug: "fungi-biochemist", name: "Fungi Biochemist", art: true },
      { slug: "aquaponics-technician", name: "Aquaponics Technician", art: true },
      { slug: "restoration-ecologist", name: "Restoration Ecologist", art: true },
      { slug: "plant-geneticist", name: "Plant Geneticist" },
      { slug: "conservation-biologist", name: "Conservation Biologist" },
    ],
  },
  {
    key: "water",
    hue: "sky",
    cards: [
      { slug: "watershed-restoration-specialist", name: "Watershed Restoration Specialist", art: true },
      { slug: "drip-irrigation-technician", name: "Drip Irrigation Technician", art: true },
      { slug: "greywater-systems-engineer", name: "Greywater Systems Engineer", art: true },
      { slug: "stormwater-management-specialist", name: "Stormwater Management Specialist", art: true },
      { slug: "desalination-technician", name: "Desalination Technician", art: true },
      { slug: "bioremediation-specialist", name: "Bioremediation Specialist" },
      { slug: "composting-toilet-technician", name: "Composting Toilet Technician" },
    ],
  },
  {
    key: "circular",
    hue: "coral",
    cards: [
      { slug: "circular-supply-chain-specialist", name: "Circular Supply Chain Specialist", art: true },
      { slug: "e-waste-recycling-technician", name: "E-Waste Recycling Technician", art: true },
      { slug: "remanufacturing-specialist", name: "Remanufacturing Specialist", art: true },
      { slug: "circular-packaging-developer", name: "Circular Packaging Developer", art: true },
      { slug: "ecological-architect", name: "Ecological Architect", art: true },
      { slug: "recycling-technician", name: "Recycling Technician" },
      { slug: "food-waste-reduction-specialist", name: "Food Waste Reduction Specialist" },
      { slug: "building-materials-engineeer", name: "Building Materials Engineer" },
    ],
  },
];

/**
 * Four plates from four stations' teacher decks, one per thematic line, so the
 * strip reads as the range of the curriculum rather than four views of the same
 * card. They were all solar until 2026-09-29.
 *
 * Painted for their own station in the curriculum pipeline; derived into
 * /art/cool-careers/stations, originals untouched.
 */
export const DECK_PLATES = [
  ["hydropower-technician", "A hydropower technician at a turbine hall, water rushing past the housing."],
  ["agroforestry", "Rows of an agroforestry orchard, crops growing in the alleys between the trees."],
  ["beavers", "A beaver dam slowing a mountain stream into pools and wet meadow."],
  ["e-waste-recycling-technician", "A drawer of old phones and circuit boards, sorted for recovery."],
];
