import { apiRequest, apiRequestList, uploadFile } from "./client";
import type {
  ApiCategory,
  ApiContactMessage,
  ApiCustomer,
  ApiFaq,
  ApiInventoryLog,
  ApiOrder,
  ApiProduct,
  OrderStatus,
  PaginationMeta,
  PaymentStatus,
} from "./types";

/**
 * Admin API calls. Every function takes the bearer `token` obtained from
 * `/auth/login` (see the auth context).
 */

type List<T> = { data: T; meta?: PaginationMeta };

// ---- Products ----

export type ProductInput = {
  category_id: string;
  name: string;
  short_description?: string | null;
  full_description?: string | null;
  price: number;
  stock_quantity: number;
  images?: string[] | null;
  is_active?: boolean;
};

export function listAdminProducts(
  token: string,
  query?: Record<string, string | number | undefined>,
): Promise<List<ApiProduct[]>> {
  return apiRequestList<ApiProduct[]>("/admin/products", {
    token,
    query: { per_page: 100, ...query },
  });
}

export function getAdminProduct(token: string, id: string): Promise<ApiProduct> {
  return apiRequest<ApiProduct>(`/admin/products/${id}`, { token });
}

export function createProduct(
  token: string,
  body: ProductInput,
): Promise<ApiProduct> {
  return apiRequest<ApiProduct>("/admin/products", {
    method: "POST",
    token,
    body,
  });
}

export function updateProduct(
  token: string,
  id: string,
  body: Partial<ProductInput>,
): Promise<ApiProduct> {
  return apiRequest<ApiProduct>(`/admin/products/${id}`, {
    method: "PUT",
    token,
    body,
  });
}

export function deleteProduct(token: string, id: string): Promise<void> {
  return apiRequest<void>(`/admin/products/${id}`, { method: "DELETE", token });
}

/**
 * Adjust stock. `quantity` is a SIGNED delta (positive adds, negative removes),
 * and `type` categorises the movement (e.g. "addition", "reduction").
 */
export function updateProductStock(
  token: string,
  id: string,
  body: { quantity: number; type: string; reason?: string | null },
): Promise<ApiProduct> {
  return apiRequest<ApiProduct>(`/admin/products/${id}/update-stock`, {
    method: "POST",
    token,
    body,
  });
}

export function getProductInventoryLogs(
  token: string,
  id: string,
): Promise<ApiInventoryLog[]> {
  return apiRequest<ApiInventoryLog[]>(`/admin/products/${id}/inventory-logs`, {
    token,
  });
}

export function listInventoryLogs(
  token: string,
): Promise<{ data: ApiInventoryLog[]; meta?: PaginationMeta }> {
  return apiRequestList<ApiInventoryLog[]>("/admin/inventory-logs", {
    token,
    query: { per_page: 100 },
  });
}

/** Upload a product image; returns the hosted URL to store on the product. */
export function uploadImage(
  token: string,
  file: File,
): Promise<{ path: string; url: string }> {
  return uploadFile("/upload", file, token);
}

// ---- Categories ----

export type CategoryInput = { name: string; description?: string | null };

export function listAdminCategories(
  token: string,
): Promise<List<ApiCategory[]>> {
  return apiRequestList<ApiCategory[]>("/admin/categories", {
    token,
    query: { per_page: 100 },
  });
}

export function createCategory(
  token: string,
  body: CategoryInput,
): Promise<ApiCategory> {
  return apiRequest<ApiCategory>("/admin/categories", {
    method: "POST",
    token,
    body,
  });
}

export function updateCategory(
  token: string,
  id: string,
  body: Partial<CategoryInput> & { is_active?: boolean },
): Promise<ApiCategory> {
  return apiRequest<ApiCategory>(`/admin/categories/${id}`, {
    method: "PUT",
    token,
    body,
  });
}

export function deleteCategory(token: string, id: string): Promise<void> {
  return apiRequest<void>(`/admin/categories/${id}`, {
    method: "DELETE",
    token,
  });
}

// ---- Orders ----

export function listAdminOrders(
  token: string,
  query?: Record<string, string | number | undefined>,
): Promise<List<ApiOrder[]>> {
  return apiRequestList<ApiOrder[]>("/admin/orders", {
    token,
    query: { per_page: 100, ...query },
  });
}

export function getAdminOrder(token: string, id: string): Promise<ApiOrder> {
  return apiRequest<ApiOrder>(`/admin/orders/${id}`, { token });
}

export function updateOrder(
  token: string,
  id: string,
  body: {
    status?: OrderStatus;
    payment_status?: PaymentStatus;
    payment_reference?: string | null;
  },
): Promise<ApiOrder> {
  return apiRequest<ApiOrder>(`/admin/orders/${id}`, {
    method: "PATCH",
    token,
    body,
  });
}

// ---- FAQs ----

export type FaqInput = {
  question: string;
  answer: string;
  is_active?: boolean;
  order?: number | null;
};

export function listAdminFaqs(token: string): Promise<List<ApiFaq[]>> {
  return apiRequestList<ApiFaq[]>("/admin/faqs", {
    token,
    query: { per_page: 100 },
  });
}

export function createFaq(token: string, body: FaqInput): Promise<ApiFaq> {
  return apiRequest<ApiFaq>("/admin/faqs", { method: "POST", token, body });
}

export function updateFaq(
  token: string,
  id: string,
  body: Partial<FaqInput>,
): Promise<ApiFaq> {
  return apiRequest<ApiFaq>(`/admin/faqs/${id}`, {
    method: "PUT",
    token,
    body,
  });
}

export function deleteFaq(token: string, id: string): Promise<void> {
  return apiRequest<void>(`/admin/faqs/${id}`, { method: "DELETE", token });
}

// ---- Contact messages ----

export function listContactMessages(
  token: string,
): Promise<List<ApiContactMessage[]>> {
  return apiRequestList<ApiContactMessage[]>("/admin/contact-messages", {
    token,
    query: { per_page: 100 },
  });
}

export function getContactMessage(
  token: string,
  id: string,
): Promise<ApiContactMessage> {
  return apiRequest<ApiContactMessage>(`/admin/contact-messages/${id}`, {
    token,
  });
}

export function deleteContactMessage(token: string, id: string): Promise<void> {
  return apiRequest<void>(`/admin/contact-messages/${id}`, {
    method: "DELETE",
    token,
  });
}

export function markContactMessageRead(
  token: string,
  id: string,
): Promise<ApiContactMessage> {
  return apiRequest<ApiContactMessage>(
    `/admin/contact-messages/${id}/mark-as-read`,
    { method: "POST", token },
  );
}

export function replyToContactMessage(
  token: string,
  id: string,
  body: { message: string },
): Promise<void> {
  return apiRequest<void>(`/admin/contact-messages/${id}/reply`, {
    method: "POST",
    token,
    body,
  });
}

// ---- Customers ----

export function listCustomers(token: string): Promise<List<ApiCustomer[]>> {
  return apiRequestList<ApiCustomer[]>("/admin/customers", {
    token,
    query: { per_page: 100 },
  });
}

export function getCustomer(token: string, id: string): Promise<ApiCustomer> {
  return apiRequest<ApiCustomer>(`/admin/customers/${id}`, { token });
}

export type CustomerInput = {
  name: string;
  email: string;
  phone?: string | null;
};

export function createCustomer(
  token: string,
  body: CustomerInput,
): Promise<ApiCustomer> {
  return apiRequest<ApiCustomer>("/admin/customers", {
    method: "POST",
    token,
    body,
  });
}

export function updateCustomer(
  token: string,
  id: string,
  body: Partial<CustomerInput>,
): Promise<ApiCustomer> {
  return apiRequest<ApiCustomer>(`/admin/customers/${id}`, {
    method: "PUT",
    token,
    body,
  });
}

export function deleteCustomer(token: string, id: string): Promise<void> {
  return apiRequest<void>(`/admin/customers/${id}`, {
    method: "DELETE",
    token,
  });
}
