"use client";

import { useState, type ChangeEvent, type FormEvent } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "motion/react";
import { useCart } from "@/context/cart";
import { formatNaira, products } from "@/data/products";

const WHATSAPP_NUMBER = "2348133035019";

type CustomerDetails = {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  notes: string;
};

const initialDetails: CustomerDetails = {
  fullName: "",
  email: "",
  phone: "",
  address: "",
  city: "",
  state: "",
  notes: "",
};

function buildOrderMessage(
  details: CustomerDetails,
  lines: { name: string; qty: number; price: number }[],
  subtotal: number,
) {
  const lineText = lines
    .map((l) => `• ${l.name} × ${l.qty} — ${formatNaira(l.price * l.qty)}`)
    .join("\n");

  return `Hi Ono Belle! New order:

CUSTOMER
Name: ${details.fullName}
Email: ${details.email}
Phone: ${details.phone}

DELIVERY
${details.address}
${details.city}, ${details.state}

ORDER
${lineText}

Subtotal: ${formatNaira(subtotal)}

${details.notes ? `Notes: ${details.notes}` : ""}`.trim();
}

export default function CheckoutView() {
  const { items, hydrated, subtotal, clear } = useCart();
  const [details, setDetails] = useState<CustomerDetails>(initialDetails);
  const [submitted, setSubmitted] = useState(false);

  if (!hydrated) {
    return (
      <div className="mx-auto w-full max-w-6xl px-6 py-24">
        <p className="text-sm text-brand-900/60">Loading checkout…</p>
      </div>
    );
  }

  if (items.length === 0 && !submitted) {
    return (
      <div className="mx-auto w-full max-w-3xl px-6 py-24 text-center">
        <h1 className="font-serif text-3xl text-brand-900 sm:text-5xl">
          Nothing to checkout yet.
        </h1>
        <p className="mt-4 text-base text-brand-900/70">
          Your cart is empty.
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
      name: p?.name ?? "Unknown",
      brand: p?.brand,
      slug: p?.slug,
      size: p?.size,
      image: p?.image,
      price: p?.price ?? 0,
      qty: i.quantity,
    };
  });

  const handleChange =
    (field: keyof CustomerDetails) =>
    (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setDetails((prev) => ({ ...prev, [field]: e.target.value }));

  const handlePlaceOrder = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const message = buildOrderMessage(
      details,
      lines.map((l) => ({ name: l.name, qty: l.qty, price: l.price })),
      subtotal,
    );
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank", "noopener,noreferrer");
    clear();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="mx-auto w-full max-w-2xl px-6 py-24 text-center"
      >
        <span className="text-[11px] font-semibold uppercase tracking-[0.32em] text-accent-600">
          Order sent
        </span>
        <h1 className="mt-3 font-serif text-3xl text-brand-900 sm:text-5xl">
          Thanks — your order is on its way to us.
        </h1>
        <p className="mt-5 text-base text-brand-900/70">
          We&apos;ve opened WhatsApp with your order details. Just hit send and
          our team will confirm availability, delivery cost and payment within
          the next few hours.
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <Link
            href="/brands"
            className="inline-flex items-center gap-3 bg-brand-900 px-8 py-4 text-[11px] font-semibold uppercase tracking-[0.28em] text-white transition-colors hover:bg-brand-700"
          >
            Continue shopping
          </Link>
          <Link
            href="/"
            className="inline-flex items-center gap-3 border border-brand-900/20 bg-white px-8 py-4 text-[11px] font-semibold uppercase tracking-[0.28em] text-brand-900 transition-colors hover:border-brand-900"
          >
            Back to home
          </Link>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-6xl px-6 py-12 sm:py-16">
      <div className="mb-10">
        <span className="text-[11px] font-semibold uppercase tracking-[0.32em] text-accent-600">
          Checkout
        </span>
        <h1 className="mt-2 font-serif text-3xl text-brand-900 sm:text-5xl">
          Your details
        </h1>
        <p className="mt-3 max-w-xl text-sm text-brand-900/65">
          We send every order through WhatsApp so we can confirm availability,
          delivery cost and payment instructions in real time.
        </p>
      </div>

      <form
        onSubmit={handlePlaceOrder}
        className="grid gap-12 lg:grid-cols-[1.4fr_1fr]"
      >
        <div className="space-y-6">
          <FormField
            id="fullName"
            label="Full name"
            value={details.fullName}
            onChange={handleChange("fullName")}
            required
          />
          <div className="grid gap-6 sm:grid-cols-2">
            <FormField
              id="email"
              label="Email"
              type="email"
              value={details.email}
              onChange={handleChange("email")}
              required
            />
            <FormField
              id="phone"
              label="Phone"
              type="tel"
              value={details.phone}
              onChange={handleChange("phone")}
              required
            />
          </div>
          <FormField
            id="address"
            label="Delivery address"
            value={details.address}
            onChange={handleChange("address")}
            required
          />
          <div className="grid gap-6 sm:grid-cols-2">
            <FormField
              id="city"
              label="City"
              value={details.city}
              onChange={handleChange("city")}
              required
            />
            <FormField
              id="state"
              label="State"
              value={details.state}
              onChange={handleChange("state")}
              required
            />
          </div>
          <div className="grid gap-2">
            <label
              htmlFor="notes"
              className="text-[11px] font-semibold uppercase tracking-[0.22em] text-brand-700"
            >
              Order notes (optional)
            </label>
            <textarea
              id="notes"
              rows={4}
              value={details.notes}
              onChange={handleChange("notes")}
              placeholder="Delivery instructions, gift message, etc."
              className="border border-border bg-surface px-4 py-3 text-sm text-brand-900 outline-none transition-colors focus:border-brand-500"
            />
          </div>
        </div>

        <aside className="sticky top-28 h-fit space-y-5 border border-border bg-surface p-7 shadow-sm">
          <h2 className="font-serif text-xl text-brand-900">Order summary</h2>

          <ul className="divide-y divide-border">
            {lines.map((line) => (
              <li key={line.id} className="flex gap-3 py-3">
                <div className="relative aspect-square w-14 shrink-0 overflow-hidden border border-border bg-brand-50">
                  {line.image && (
                    <Image
                      src={line.image}
                      alt={line.name}
                      fill
                      sizes="56px"
                      className="object-cover"
                    />
                  )}
                </div>
                <div className="flex flex-1 flex-col justify-between">
                  <p className="text-sm leading-tight text-brand-900">
                    {line.name}
                  </p>
                  <div className="flex items-center justify-between text-xs text-brand-900/60">
                    <span>Qty {line.qty}</span>
                    <span className="font-semibold text-brand-900">
                      {formatNaira(line.price * line.qty)}
                    </span>
                  </div>
                </div>
              </li>
            ))}
          </ul>

          <dl className="space-y-2 border-t border-border pt-4 text-sm">
            <div className="flex justify-between text-brand-900/75">
              <dt>Subtotal</dt>
              <dd>{formatNaira(subtotal)}</dd>
            </div>
            <div className="flex justify-between text-brand-900/55">
              <dt>Shipping</dt>
              <dd>Calculated on WhatsApp</dd>
            </div>
            <div className="flex justify-between border-t border-border pt-3 text-base font-semibold text-brand-900">
              <dt>Estimated total</dt>
              <dd>{formatNaira(subtotal)}</dd>
            </div>
          </dl>

          <button
            type="submit"
            className="group inline-flex w-full items-center justify-center gap-3 bg-[#25D366] px-6 py-4 text-[11px] font-semibold uppercase tracking-[0.28em] text-white transition-colors hover:bg-[#1f9a4d]"
          >
            <WhatsAppIcon />
            Send order via WhatsApp
          </button>

          <p className="text-xs text-brand-900/55">
            By placing this order you accept our terms. Payment is confirmed on
            WhatsApp via bank transfer or Paystack link.
          </p>
        </aside>
      </form>
    </div>
  );
}

function FormField({
  id,
  label,
  value,
  onChange,
  type = "text",
  required,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  required?: boolean;
}) {
  return (
    <div className="grid gap-2">
      <label
        htmlFor={id}
        className="text-[11px] font-semibold uppercase tracking-[0.22em] text-brand-700"
      >
        {label}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        required={required}
        className="border border-border bg-surface px-4 py-3 text-sm text-brand-900 outline-none transition-colors focus:border-brand-500"
      />
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
