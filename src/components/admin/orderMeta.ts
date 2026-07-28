import type { OrderStatus, PaymentStatus } from "@/lib/api/types";

type Tone = "neutral" | "pending" | "info" | "success" | "danger";

export const ORDER_STATUSES: OrderStatus[] = [
  "pending",
  "processing",
  "shipped",
  "delivered",
  "cancelled",
];

export const PAYMENT_STATUSES: PaymentStatus[] = ["pending", "paid", "failed"];

export function orderStatusTone(status: string): Tone {
  switch (status) {
    case "pending":
      return "pending";
    case "processing":
      return "info";
    case "shipped":
      return "info";
    case "delivered":
      return "success";
    case "cancelled":
      return "danger";
    default:
      return "neutral";
  }
}

export function paymentStatusTone(status: string): Tone {
  switch (status) {
    case "paid":
      return "success";
    case "failed":
      return "danger";
    default:
      return "pending";
  }
}
