"use client";

import { useCart, type CartProduct } from "@/context/cart";

/**
 * Add-to-cart helper. Checkout is guest-based (per the API), so there is no
 * login requirement — anyone can add items and check out.
 */
export function useAddToCart() {
  const { add } = useCart();

  return function addToCart(product: CartProduct, qty: number = 1) {
    add(product, qty);
    return { ok: true as const };
  };
}
