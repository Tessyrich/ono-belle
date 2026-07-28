import { apiRequest, apiRequestList } from "./client";
import type {
  ApiCategory,
  ApiFaq,
  ApiProduct,
  ApiPublicOrder,
  CheckoutPayload,
  CheckoutResult,
  ContactPayload,
  PaginationMeta,
} from "./types";
import { mapProduct, type Product } from "@/lib/product";

export type ProductQuery = {
  search?: string;
  category_id?: string;
  category_slug?: string;
  per_page?: number;
};

/** List active storefront products (mapped to the UI view model). */
export async function getProducts(
  query: ProductQuery = {},
): Promise<{ products: Product[]; meta?: PaginationMeta }> {
  try {
    const { data, meta } = await apiRequestList<ApiProduct[]>("/products", {
      query: { per_page: 100, ...query },
    });
    return { products: (data ?? []).map(mapProduct), meta };
  } catch {
    // Storefront stays up even if the catalogue service is unreachable.
    return { products: [], meta: undefined };
  }
}

/** Single active product by slug; returns null when not found. */
export async function getProductBySlug(slug: string): Promise<Product | null> {
  try {
    const data = await apiRequest<ApiProduct>(
      `/products/${encodeURIComponent(slug)}`,
    );
    return data ? mapProduct(data) : null;
  } catch {
    return null;
  }
}

export async function getCategories(): Promise<ApiCategory[]> {
  try {
    const data = await apiRequest<ApiCategory[]>("/categories", {
      query: { per_page: 100 },
    });
    return data ?? [];
  } catch {
    return [];
  }
}

export async function getFaqs(): Promise<ApiFaq[]> {
  try {
    const data = await apiRequest<ApiFaq[]>("/faqs");
    return data ?? [];
  } catch {
    return [];
  }
}

/** Place an order from the storefront cart (public, guest checkout). */
export async function placeOrder(
  payload: CheckoutPayload,
  signal?: AbortSignal,
): Promise<CheckoutResult> {
  return apiRequest<CheckoutResult>("/checkout", {
    method: "POST",
    body: payload,
    signal,
  });
}

/** Track an order by reference + customer email. */
export async function trackOrder(
  reference: string,
  email: string,
  signal?: AbortSignal,
): Promise<ApiPublicOrder> {
  return apiRequest<ApiPublicOrder>("/orders/track", {
    query: { reference, email },
    signal,
  });
}

/** Submit a public contact message. */
export async function submitContactMessage(
  payload: ContactPayload,
  signal?: AbortSignal,
): Promise<void> {
  await apiRequest("/contact-messages", {
    method: "POST",
    body: payload,
    signal,
  });
}
