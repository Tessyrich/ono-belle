"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useAddToCart } from "@/hooks/useAddToCart";
import { type Product } from "@/data/products";

const WHATSAPP_NUMBER = "2348133035019";

function buildWhatsAppLink(product: Product) {
  const message = encodeURIComponent(
    `Hi Ono Belle! I'd like more information about ${product.name} (${product.size}). Is it currently available?`,
  );
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${message}`;
}

export default function ProductDetailActions({ product }: { product: Product }) {
  const addToCart = useAddToCart();
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  const decrement = () => setQty((q) => Math.max(1, q - 1));
  const increment = () => setQty((q) => Math.min(20, q + 1));

  const handleAdd = () => {
    const result = addToCart(product.id, qty);
    if (!result.ok) return; // redirected to login
    setAdded(true);
    window.setTimeout(() => setAdded(false), 2200);
  };

  const whatsapp = buildWhatsAppLink(product);

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <span className="text-[11px] font-semibold uppercase tracking-[0.22em] text-brand-700/70">
          Quantity
        </span>
        <div className="flex items-center border border-brand-900/20">
          <button
            type="button"
            onClick={decrement}
            aria-label="Decrease quantity"
            className="grid h-11 w-11 place-items-center text-brand-900 transition-colors hover:bg-muted/60"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              className="h-4 w-4"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14" />
            </svg>
          </button>
          <span className="grid h-11 w-12 place-items-center font-serif text-lg text-brand-900">
            {qty}
          </span>
          <button
            type="button"
            onClick={increment}
            aria-label="Increase quantity"
            className="grid h-11 w-11 place-items-center text-brand-900 transition-colors hover:bg-muted/60"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              className="h-4 w-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 5v14M5 12h14"
              />
            </svg>
          </button>
        </div>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-stretch">
        <button
          type="button"
          onClick={handleAdd}
          disabled={!product.inStock}
          className="group relative inline-flex flex-1 items-center justify-center gap-3 bg-brand-900 px-8 py-4 text-[11px] font-semibold uppercase tracking-[0.28em] text-white transition-colors hover:bg-brand-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <AnimatePresence mode="wait" initial={false}>
            {added ? (
              <motion.span
                key="added"
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.3 }}
                className="flex items-center gap-2"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2.5}
                  className="h-4 w-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                Added to cart
              </motion.span>
            ) : (
              <motion.span
                key="add"
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.3 }}
                className="flex items-center gap-2"
              >
                {product.inStock ? "Add to cart" : "Out of stock"}
                <span className="transition-transform group-hover:translate-x-1">
                  →
                </span>
              </motion.span>
            )}
          </AnimatePresence>
        </button>

        <a
          href={whatsapp}
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex items-center justify-center gap-3 border border-[#25D366] bg-white px-7 py-4 text-[11px] font-semibold uppercase tracking-[0.28em] text-[#1f9a4d] transition-colors hover:bg-[#25D366]/10"
        >
          <WhatsAppIcon />
          Chat on WhatsApp
        </a>
      </div>

      <p className="text-xs text-brand-900/55">
        Documents or product info you don&apos;t see here? Tap{" "}
        <span className="font-semibold text-brand-900">Chat on WhatsApp</span>{" "}
        and we&apos;ll send them over.
      </p>
    </div>
  );
}

function WhatsAppIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className="h-4 w-4"
      aria-hidden
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.464 3.488" />
    </svg>
  );
}
