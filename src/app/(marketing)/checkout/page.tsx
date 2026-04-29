import type { Metadata } from "next";
import CheckoutView from "@/components/CheckoutView";

export const metadata: Metadata = {
  title: "Checkout",
  description: "Complete your order with Ono Belle Global Limited.",
};

export default function CheckoutPage() {
  return <CheckoutView />;
}
