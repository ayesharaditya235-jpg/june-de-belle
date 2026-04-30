import type { Product } from "./types";

export const PRODUCTS: Product[] = [
  {
    id: "totebag",
    name: "Tote Bag",
    nameId: "Totebag",
    price: "Rp 135.000",
    description:
      "Your perfect school companion. Spacious enough to carry everything you need — from textbooks to your tumbler — without breaking a sweat.",
    material: "Premium Canvas",
    dimensions: "34 × 40 × 12 cm",
    features: [
      "High-capacity interior fits textbooks, tumbler & more",
      "Interior zip pocket for valuables",
      "Separate laptop compartment (fits up to 16 inch)",
      "Outer pocket for easy access",
    ],
    variants: [
      {
        name: "Navy Rue",
        color: "#2B4A7A",
        productImage: "/products/Tote Bag Navy Rue → foto produk .png",
        modelImage: "/products/Tote Bag Navy Rue → foto model.png",
      },
      {
        name: "Pink Lou",
        color: "#F4B8CC",
        productImage: "/products/Tote Bag Pink Lou → foto produk.png",
        modelImage: "/products/Tote Bag Pink Lou →  foto model.png",
      },
    ],
    gradientFrom: "#FAEDF4",
    gradientTo: "#F5D5E6",
  },
  {
    id: "pencilcase",
    name: "Compact Pencil Case",
    nameId: "Tempat Pensil",
    price: "Rp 69.500",
    description:
      "A compact pencil case fit for everyday use. Fits your pens, erasers, and little things without feeling bulky.",
    material: "Faux Leather",
    dimensions: "7 × 19 × 1.5 cm",
    features: [
      "Compact & lightweight design",
      "Fits pens, erasers & small essentials",
      "Perfect for minimalists",
      "Heart-shaped zip opening",
    ],
    variants: [
      {
        name: "Sweet June",
        color: "#F9C5D1",
        productImage: "/products/Compact Pencil Case Sweet June → foto produk.png",
        modelImage: "/products/Compact Pencil Case Sweet June →  foto model.png",
      },
      {
        name: "Brown Bon",
        color: "#9C7059",
        productImage: "/products/Compact Pencil Case Brown Bon → foto produk.png",
        modelImage: "/products/Compact Pencil Case Brown Bon →foto model.png",
      },
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
