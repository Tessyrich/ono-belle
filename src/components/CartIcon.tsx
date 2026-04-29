"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { useCart } from "@/context/cart";

export default function CartIcon() {
  const { count, hydrated } = useCart();

  return (
    <Link
      href="/cart"
      aria-label={`Cart, ${count} items`}
      className="relative grid h-10 w-10 place-items-center text-brand-900 transition-colors hover:text-brand-700"
    >
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.6}
        className="h-5 w-5"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M6 6h15l-1.5 9h-12zM6 6l-.75-3H3M9 21a1 1 0 100-2 1 1 0 000 2zm10 0a1 1 0 100-2 1 1 0 000 2z"
        />
      </svg>

      <AnimatePresence>
        {hydrated && count > 0 && (
          <motion.span
            key={count}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="absolute -right-1 -top-1 grid h-5 min-w-5 place-items-center rounded-full bg-accent-500 px-1 text-[10px] font-semibold text-white"
          >
            {count}
          </motion.span>
        )}
      </AnimatePresence>
    </Link>
  );
}
