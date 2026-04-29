"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import { useCart } from "@/context/cart";
import { formatNaira, products } from "@/data/products";

const WHATSAPP_NUMBER = "2348133035019";

function buildCartWhatsAppLink(
  lines: { name: string; qty: number; price: number }[],
  subtotal: number,
) {
  const lineText = lines
    .map((l) => `• ${l.name} × ${l.qty} — ${formatNaira(l.price * l.qty)}`)
    .join("\n");
  const message = encodeURIComponent(
    `Hi Ono Belle! I'd like to order:\n\n${lineText}\n\nSubtotal: ${formatNaira(subtotal)}\n\nPlease confirm availability and delivery.`,
  );
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${message}`;
}

export default function CartView() {
  const { items, hydrated, subtotal, setQuantity, remove, clear } = useCart();

  // Hydration guard — prevents server/client mismatch from localStorage
  if (!hydrated) {
    return (
      <div className="mx-auto w-full max-w-6xl px-6 py-24">
        <p className="text-sm text-brand-900/60">Loading your cart…</p>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="mx-auto w-full max-w-3xl px-6 py-24 text-center">
        <span className="text-[11px] font-semibold uppercase tracking-[0.32em] text-accent-600">
          Your cart
        </span>
        <h1 className="mt-3 font-serif text-3xl text-brand-900 sm:text-5xl">
          Your cart is empty.
        </h1>
        <p className="mt-4 text-base text-brand-900/70">
          Browse our range of dermatologist-tested baby and family skincare.
        </p>
        <Link
          href="/brands"
          className="mt-10 inline-flex items-center gap-3 bg-brand-900 px-8 py-4 text-[11px] font-semibold uppercase tracking-[0.28em] text-white transition-colors hover:bg-brand-700"
        >
          Shop the range →
        </Link>
      </div>
    );
  }

  const lines = items.map((i) => {
    const p = products.find((p) => p.id === i.productId);
    return {
      id: i.productId,
      name: p?.name ?? "Unknown product",
      brand: p?.brand,
      slug: p?.slug,
      size: p?.size,
      image: p?.image,
      price: p?.price ?? 0,
      qty: i.quantity,
    };
  });

  const waLink = buildCartWhatsAppLink(
    lines.map((l) => ({ name: l.name, qty: l.qty, price: l.price })),
    subtotal,
  );

  return (
    <div className="mx-auto w-full max-w-6xl px-6 py-12 sm:py-16">
      <div className="mb-10 flex items-end justify-between gap-6">
        <div>
          <span className="text-[11px] font-semibold uppercase tracking-[0.32em] text-accent-600">
            Your cart
          </span>
          <h1 className="mt-2 font-serif text-3xl text-brand-900 sm:text-5xl">
            Review your selection
          </h1>
        </div>
        <button
          type="button"
          onClick={clear}
          className="text-[11px] font-semibold uppercase tracking-[0.22em] text-brand-900/60 hover:text-brand-900"
        >
          Clear cart
        </button>
      </div>

      <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr]">
        {/* Line items */}
        <ul className="divide-y divide-border border-y border-border">
          <AnimatePresence initial={false}>
            {lines.map((line) => (
              <motion.li
                key={line.id}
                layout
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                className="flex gap-4 py-6 sm:gap-6"
              >
                <Link
                  href={`/brands/${line.slug ?? ""}`}
                  className="relative aspect-square w-24 shrink-0 overflow-hidden border border-border bg-brand-50 sm:w-32"
                >
                  {line.image && (
                    <Image
                      src={line.image}
                      alt={line.name}
                      fill
                      sizes="128px"
                      className="object-cover"
                    />
                  )}
                </Link>

                <div className="flex flex-1 flex-col justify-between">
                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-accent-600">
                      {line.brand}
                    </p>
                    <Link
                      href={`/brands/${line.slug ?? ""}`}
                      className="mt-1 block font-serif text-lg text-brand-900 hover:text-brand-700"
                    >
                      {line.name}
                    </Link>
                    <p className="mt-1 text-xs text-brand-900/60">
                      {line.size}
                    </p>
                  </div>

                  <div className="mt-3 flex items-end justify-between gap-3">
                    <div className="flex items-center border border-brand-900/20">
                      <button
                        type="button"
                        onClick={() =>
                          setQuantity(line.id, Math.max(1, line.qty - 1))
                        }
                        aria-label="Decrease quantity"
                        className="grid h-9 w-9 place-items-center text-brand-900 hover:bg-muted/60"
                      >
                        −
                      </button>
                      <span className="grid h-9 w-10 place-items-center text-sm text-brand-900">
                        {line.qty}
                      </span>
                      <button
                        type="button"
                        onClick={() =>
                          setQuantity(line.id, Math.min(20, line.qty + 1))
                        }
                        aria-label="Increase quantity"
                        className="grid h-9 w-9 place-items-center text-brand-900 hover:bg-muted/60"
                      >
                        +
                      </button>
                    </div>

                    <div className="flex items-end gap-3 text-right">
                      <button
                        type="button"
                        onClick={() => remove(line.id)}
                        className="text-[10px] font-semibold uppercase tracking-[0.22em] text-brand-900/55 hover:text-brand-900"
                      >
                        Remove
                      </button>
                      <span className="font-semibold text-brand-900">
                        {formatNaira(line.price * line.qty)}
                      </span>
                    </div>
                  </div>
                </div>
              </motion.li>
            ))}
          </AnimatePresence>
        </ul>

        {/* Summary */}
        <aside className="sticky top-28 h-fit space-y-6 border border-border bg-surface p-7 shadow-sm">
          <h2 className="font-serif text-xl text-brand-900">Order summary</h2>

          <dl className="space-y-3 text-sm">
            <div className="flex justify-between text-brand-900/75">
              <dt>Subtotal</dt>
              <dd>{formatNaira(subtotal)}</dd>
            </div>
            <div className="flex justify-between text-brand-900/55">
              <dt>Shipping</dt>
              <dd>Calculated at checkout</dd>
            </div>
            <div className="flex justify-between border-t border-border pt-3 text-base font-semibold text-brand-900">
              <dt>Estimated total</dt>
              <dd>{formatNaira(subtotal)}</dd>
            </div>
          </dl>

          <Link
            href="/checkout"
            className="group inline-flex w-full items-center justify-center gap-3 bg-brand-900 px-6 py-4 text-[11px] font-semibold uppercase tracking-[0.28em] text-white transition-colors hover:bg-brand-700"
          >
            Continue to checkout
            <span className="transition-transform group-hover:translate-x-1">
              →
            </span>
          </Link>

          <a
            href={waLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex w-full items-center justify-center gap-3 border border-[#25D366] bg-white px-6 py-4 text-[11px] font-semibold uppercase tracking-[0.28em] text-[#1f9a4d] transition-colors hover:bg-[#25D366]/10"
          >
            <WhatsAppIcon />
            Order on WhatsApp
          </a>

          <p className="text-xs text-brand-900/55">
            Prefer to talk it through? Send your cart over WhatsApp and we&apos;ll
            confirm availability and delivery.
          </p>
        </aside>
      </div>
    </div>
  );
}

function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4" aria-hidden>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.464 3.488" />
    </svg>
  );
}
