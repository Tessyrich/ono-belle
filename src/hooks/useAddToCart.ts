"use client";

import { usePathname, useRouter } from "next/navigation";
import { useCart } from "@/context/cart";
import { useAuth } from "@/context/auth";

export function useAddToCart() {
  const { add } = useCart();
  const { isAuthenticated } = useAuth();
  const router = useRouter();
  const pathname = usePathname() ?? "/";

  return function addToCart(productId: string, qty: number = 1) {
    if (!isAuthenticated) {
      const redirect = encodeURIComponent(pathname);
      router.push(`/login?redirect=${redirect}`);
      return { ok: false as const, requiresAuth: true as const };
    }
    add(productId, qty);
    return { ok: true as const };
  };
}
