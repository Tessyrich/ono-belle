import type { ApiProduct } from "@/lib/api/types";

/**
 * UI-facing product view model, derived from the API's {@link ApiProduct}.
 * The API does not return brand/size/features, so the storefront renders the
 * fields it does expose: name, descriptions, price, images, stock and category.
 */
export type Product = {
  id: string;
  slug: string;
  name: string;
  price: number;
  priceLabel: string;
  image: string;
  images: string[];
  shortDescription: string | null;
  fullDescription: string | null;
  stock: number;
  inStock: boolean;
  categoryId: string;
  categoryName: string | null;
  categorySlug: string | null;
};

/** Local placeholder shown when a product has no images. */
export const PRODUCT_PLACEHOLDER = "/product-placeholder.svg";

export function formatNaira(amount: number): string {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    maximumFractionDigits: 0,
  }).format(amount);
}

/** Format a numeric string price (e.g. "3800.00") as Naira. */
export function formatPrice(price: string | number): string {
  const value = typeof price === "number" ? price : Number(price);
  return formatNaira(Number.isFinite(value) ? value : 0);
}

export function mapProduct(p: ApiProduct): Product {
  const images = (p.images ?? []).filter(Boolean);
  const price = Number(p.price);
  return {
    id: p.id,
    slug: p.slug,
    name: p.name,
    price: Number.isFinite(price) ? price : 0,
    priceLabel: formatPrice(p.price),
    image: images[0] ?? PRODUCT_PLACEHOLDER,
    images: images.length ? images : [PRODUCT_PLACEHOLDER],
    shortDescription: p.short_description,
    fullDescription: p.full_description,
    stock: p.stock_quantity,
    inStock: p.stock_quantity > 0,
    categoryId: p.category_id,
    categoryName: p.category?.name ?? null,
    categorySlug: p.category?.slug ?? null,
  };
}
