import type { Product } from "./types";

export const PRODUCTS: Product[] = [
  {
    id: "totebag",
    name: "Signature Tote Bag",
    nameId: "Totebag",
    price: "Rp 149.000",
    description:
      "Your perfect school companion. Roomy enough for textbooks, ergonomic enough for all-day comfort. Carry everything you love, in style.",
    material: "Premium Canvas",
    dimensions: "38 × 34 × 10 cm",
    features: [
      "Reinforced shoulder straps",
      "Inner zipper pocket",
      "Water-resistant lining",
      "Padded laptop sleeve",
    ],
    variants: [
      { name: "Blush Pink", color: "#F9B4C8" },
      { name: "Ivory White", color: "#F5F2EE" },
      { name: "Midnight Black", color: "#1A1A1A" },
    ],
    gradientFrom: "#FAEDF4",
    gradientTo: "#F5D5E6",
  },
  {
    id: "pencilcase",
    name: "Luxe Pencil Case",
    nameId: "Tempat Pensil",
    price: "Rp 79.000",
    description:
      "Keep your stationery perfectly organized. Compact, chic, and effortlessly accessible — because your desk deserves to look this good.",
    material: "Vegan PU Leather",
    dimensions: "22 × 7 × 7 cm",
    features: [
      "Double zipper closure",
      "Pen loops inside",
      "Soft velvet interior",
      "Detachable wrist strap",
    ],
    variants: [
      { name: "Blush Pink", color: "#F9B4C8" },
      { name: "Ivory White", color: "#F5F2EE" },
      { name: "Midnight Black", color: "#1A1A1A" },
      { name: "Lavender Dream", color: "#D8B4FE" },
    ],
    gradientFrom: "#F3E8FF",
    gradientTo: "#FAEDF4",
    badge: "Most Popular",
  },
  {
    id: "pouch",
    name: "Inner Bag Pouch",
    nameId: "Inner Bag Pouch Organizer",
    price: null,
    description:
      "The ultimate bag organizer. Everything in its place, accessible in seconds. Switch between bags without losing a single thing.",
    material: "Canvas + PU Lining",
    dimensions: "Coming soon",
    features: [
      "Multiple zippered compartments",
      "Card & ID slots",
      "Key ring hook",
      "Universal bag fit",
    ],
    variants: [
      { name: "Blush Pink", color: "#F9B4C8" },
      { name: "Ivory White", color: "#F5F2EE" },
    ],
    gradientFrom: "#FEF9C3",
    gradientTo: "#FAEDF4",
    badge: "Price TBD",
  },
];
