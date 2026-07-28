/**
 * TypeScript shapes mirroring the Ono Belle backend API
 * (see https://projects.jadesdev.com.ng/onobelle-backend/docs/api).
 *
 * Every endpoint wraps its payload in an envelope: { success, message, data, meta? }.
 */

export type ApiEnvelope<T> = {
  success: boolean;
  message: string;
  data: T;
  meta?: PaginationMeta;
};

export type PaginationMeta = {
  total: number;
  limit: number;
  page: number;
  total_pages: number;
  has_next: boolean;
  has_previous: boolean;
};

export type ApiCategory = {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  image: string | null;
  is_active: boolean;
};

export type ApiProduct = {
  id: string;
  category_id: string;
  name: string;
  slug: string;
  short_description: string | null;
  full_description: string | null;
  price: string;
  stock_quantity: number;
  images: string[] | null;
  is_active: boolean;
  created_at: string | null;
  updated_at: string | null;
  category?: ApiCategory;
};

export type ApiFaq = {
  id: string;
  question: string;
  answer: string;
  is_active: boolean;
  order: number;
  created_at: string | null;
  updated_at: string | null;
  deleted_at?: string | null;
};

export type OrderStatus =
  | "pending"
  | "processing"
  | "shipped"
  | "delivered"
  | "cancelled";

export type PaymentStatus = "pending" | "paid" | "failed";

export type ApiOrderItem = {
  id?: string;
  product_id?: string;
  product_name: string;
  quantity: number;
  price: string;
  subtotal?: string;
};

export type ApiOrder = {
  id: string;
  reference: string;
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  address: string;
  city: string;
  state: string;
  notes: string | null;
  subtotal: string;
  total: string;
  status: OrderStatus | string;
  status_label: string;
  payment_status: PaymentStatus | string;
  payment_method: string | null;
  payment_reference: string | null;
  stock_deducted_at: string | null;
  items: ApiOrderItem[];
  created_at: string | null;
  updated_at: string | null;
};

export type ApiPublicOrder = {
  reference: string;
  customer_name: string;
  subtotal: string;
  total: string;
  status: string;
  status_label: string;
  payment_status: string;
  payment_method: string;
  items?: ApiOrderItem[];
  created_at: string;
  updated_at: string;
};

export type ApiCustomer = {
  id: string;
  name: string;
  email: string;
  phone: string;
  orders_count?: number;
  orders?: ApiOrder[];
  created_at: string;
  updated_at: string;
};

export type ApiContactMessage = {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  is_read?: boolean;
  read_at?: string | null;
  created_at: string | null;
  updated_at: string | null;
};

export type ApiUser = {
  id: string;
  name: string;
  email: string;
  role: string;
  created_at: string | null;
  updated_at: string | null;
};

export type ApiInventoryLog = {
  id: string;
  product_id: string;
  user_id: string;
  quantity: number;
  type: string;
  reason: string | null;
  reference: string | null;
  notes: string | null;
  created_at: string | null;
  updated_at: string | null;
};

// ----- Request payloads -----

export type CheckoutItem = { product_id: string; quantity: number };

export type CheckoutPayload = {
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  address: string;
  city: string;
  state: string;
  notes?: string | null;
  payment_method?: "whatsapp" | "paystack";
  items: CheckoutItem[];
};

export type CheckoutResult = {
  order: ApiOrder;
  whatsapp: { message: string; url: string | null };
};

export type ContactPayload = {
  name: string;
  email: string;
  subject: string;
  message: string;
};
