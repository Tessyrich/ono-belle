export type ProductCategory =
  | "baby-skincare"
  | "newborn-sensitive"
  | "organic-vegan"
  | "dermatologist-tested"
  | "family-wellness"
  | "hygiene-essentials";

export const categories: { slug: ProductCategory; label: string }[] = [
  { slug: "baby-skincare", label: "Baby Skincare" },
  { slug: "newborn-sensitive", label: "Newborn & Sensitive" },
  { slug: "organic-vegan", label: "Organic & Vegan" },
  { slug: "dermatologist-tested", label: "Dermatologist-Tested" },
  { slug: "family-wellness", label: "Family Wellness" },
  { slug: "hygiene-essentials", label: "Hygiene Essentials" },
];

export type Product = {
  id: string;
  slug: string;
  name: string;
  brand: string;
  category: ProductCategory;
  price: number; // NGN
  comparePrice?: number; // NGN
  size: string;
  image: string;
  description: string;
  features: string[];
  inStock: boolean;
  featured?: boolean;
};

const u = (id: string, w = 1200) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

export const products: Product[] = [
  {
    id: "p-001",
    slug: "gentle-baby-wash",
    name: "Gentle Baby Wash",
    brand: "Belle Naturals",
    category: "baby-skincare",
    price: 8500,
    comparePrice: 9800,
    size: "200 ml",
    image: u("photo-1556228720-195a672e8a03"),
    description:
      "Tear-free, pH-balanced wash for delicate baby skin. Plant-based cleansers and chamomile extract leave skin soft and lightly scented.",
    features: [
      "Tear-free formulation",
      "pH-balanced for newborn skin",
      "Chamomile & oat extract",
      "Paraben & sulphate free",
    ],
    inStock: true,
    featured: true,
  },
  {
    id: "p-002",
    slug: "newborn-calming-lotion",
    name: "Newborn Calming Lotion",
    brand: "Petit Jardin",
    category: "newborn-sensitive",
    price: 11200,
    size: "150 ml",
    image: u("photo-1556228852-80b6e5eeff06"),
    description:
      "Hypoallergenic, fragrance-free lotion designed for newborn and reactive skin. Pediatrician tested.",
    features: [
      "Fragrance-free",
      "Hypoallergenic",
      "Pediatrician tested",
      "Suitable from day one",
    ],
    inStock: true,
    featured: true,
  },
  {
    id: "p-003",
    slug: "organic-diaper-balm",
    name: "Organic Diaper Balm",
    brand: "Verdant Baby",
    category: "organic-vegan",
    price: 7400,
    size: "75 g",
    image: u("photo-1611080626919-7cf5a9dbab5b"),
    description:
      "Plant-based diaper balm with shea butter, calendula and zinc oxide. Soothes and protects from the first sign of redness.",
    features: [
      "Certified organic",
      "Vegan formulation",
      "Calendula & zinc oxide",
      "No mineral oils",
    ],
    inStock: true,
    featured: true,
  },
  {
    id: "p-004",
    slug: "dermatologist-body-oil",
    name: "Dermatologist Body Oil",
    brand: "Clinique d'Enfant",
    category: "dermatologist-tested",
    price: 18900,
    size: "100 ml",
    image: u("photo-1571781926291-c477ebfd024b"),
    description:
      "Clinically reviewed body oil with sweet almond and vitamin E. Fortifies the skin barrier and locks in moisture.",
    features: [
      "Dermatologist tested",
      "Sweet almond + vitamin E",
      "Non-comedogenic",
      "Suitable for eczema-prone skin",
    ],
    inStock: true,
    featured: true,
  },
  {
    id: "p-005",
    slug: "family-hand-wash",
    name: "Family Hand Wash",
    brand: "Belle Naturals",
    category: "family-wellness",
    price: 5400,
    size: "250 ml",
    image: u("photo-1559518648-21ce7ff4d56a"),
    description:
      "A gentle daily hand wash the whole family can share. Formulated to clean without stripping moisture.",
    features: [
      "Glycerin-rich",
      "Soft fragrance",
      "Family-safe",
      "Recyclable bottle",
    ],
    inStock: true,
  },
  {
    id: "p-006",
    slug: "hypoallergenic-wipes",
    name: "Hypoallergenic Wipes",
    brand: "Petit Jardin",
    category: "hygiene-essentials",
    price: 4200,
    size: "80 ct",
    image: u("photo-1612817288484-6f916006741a"),
    description:
      "Soft, biodegradable wipes for sensitive skin. 99% purified water and aloe — no alcohol, no fragrance.",
    features: [
      "99% purified water",
      "Biodegradable cloth",
      "Alcohol-free",
      "Resealable pack",
    ],
    inStock: true,
  },
  {
    id: "p-007",
    slug: "bath-bubbles-baby",
    name: "Bath Bubbles for Babies",
    brand: "Verdant Baby",
    category: "baby-skincare",
    price: 9600,
    size: "300 ml",
    image: u("photo-1505740420928-5e560c06d30e"),
    description:
      "Foamy, gentle bubble bath that turns bath time into a soothing ritual without irritating delicate skin.",
    features: [
      "Soft foam",
      "Plant-based surfactants",
      "Lavender & oat",
      "Tear-free",
    ],
    inStock: true,
  },
  {
    id: "p-008",
    slug: "sensitive-skin-cream",
    name: "Sensitive Skin Cream",
    brand: "Clinique d'Enfant",
    category: "newborn-sensitive",
    price: 14200,
    size: "50 ml",
    image: u("photo-1620916566398-39f1143ab7be"),
    description:
      "Rich repair cream for very sensitive baby skin. Reinforces the barrier overnight.",
    features: [
      "Barrier-repair complex",
      "Steroid-free",
      "Suitable for face & body",
      "Allergy tested",
    ],
    inStock: true,
  },
  {
    id: "p-009",
    slug: "mother-baby-massage-oil",
    name: "Mother & Baby Massage Oil",
    brand: "Belle Naturals",
    category: "family-wellness",
    price: 12500,
    size: "100 ml",
    image: u("photo-1487412947147-5cebf100ffc2"),
    description:
      "A warming massage oil designed for mother and baby — almond, jojoba and a hint of vanilla.",
    features: [
      "Cold-pressed almond",
      "Jojoba + vanilla",
      "Suitable post-natal",
      "Lightly fragranced",
    ],
    inStock: true,
  },
  {
    id: "p-010",
    slug: "vegan-body-butter",
    name: "Vegan Body Butter",
    brand: "Verdant Baby",
    category: "organic-vegan",
    price: 13800,
    size: "100 g",
    image: u("photo-1522335789203-aaa6cb5c0bf6"),
    description:
      "Whipped shea and cocoa butter for daily nourishment. 100% vegan and rich enough for very dry skin.",
    features: [
      "100% vegan",
      "Shea + cocoa butter",
      "No palm oil",
      "Glass jar packaging",
    ],
    inStock: true,
  },
  {
    id: "p-011",
    slug: "hospital-grade-sanitizer",
    name: "Hospital-Grade Sanitizer",
    brand: "Clinique d'Enfant",
    category: "hygiene-essentials",
    price: 6800,
    size: "500 ml",
    image: u("photo-1583912267550-d6c2ac3196c0"),
    description:
      "70% ethanol hand sanitizer that meets clinical hygiene standards — gentle enough for repeated use.",
    features: [
      "70% ethanol",
      "Glycerin enriched",
      "Pump dispenser",
      "Hospital approved",
    ],
    inStock: true,
  },
  {
    id: "p-012",
    slug: "daily-hygiene-bundle",
    name: "Daily Hygiene Bundle",
    brand: "Belle Naturals",
    category: "hygiene-essentials",
    price: 18500,
    comparePrice: 22000,
    size: "Set of 3",
    image: u("photo-1612966809470-d6f5d3df5a40"),
    description:
      "A curated bundle: hand wash, wipes and sanitizer — everything a Nigerian household uses daily.",
    features: [
      "Save 15% vs. individual",
      "Hand wash 250ml",
      "Wipes 80ct",
      "Sanitizer 500ml",
    ],
    inStock: true,
    featured: true,
  },
];

export function getProduct(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getFeaturedProducts(): Product[] {
  return products.filter((p) => p.featured);
}

export function getProductsByCategory(category: ProductCategory): Product[] {
  return products.filter((p) => p.category === category);
}

export function formatNaira(amount: number): string {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    maximumFractionDigits: 0,
  }).format(amount);
}
