"use client";

import { useState, type ChangeEvent, type FormEvent } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "motion/react";
import { useCart } from "@/context/cart";
import { formatNaira } from "@/lib/product";
import { whatsappLink } from "@/lib/config";
import { placeOrder } from "@/lib/api/storefront";
import { ApiError } from "@/lib/api/client";
import type { ApiOrder } from "@/lib/api/types";

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

export default function CheckoutView() {
  const { items, hydrated, subtotal, clear } = useCart();
  const [details, setDetails] = useState<CustomerDetails>(initialDetails);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [placedOrder, setPlacedOrder] = useState<ApiOrder | null>(null);
  const [whatsappUrl, setWhatsappUrl] = useState<string | null>(null);

  if (!hydrated) {
    return (
      <div className="mx-auto w-full max-w-6xl px-6 py-24">
        <p className="text-sm text-brand-900/60">Loading checkout…</p>
      </div>
    );
  }

  if (items.length === 0 && !placedOrder) {
    return (
      <div className="mx-auto w-full max-w-3xl px-6 py-24 text-center">
        <h1 className="font-display text-3xl text-brand-900 sm:text-5xl">
          Nothing to checkout yet.
        </h1>
        <p className="mt-4 text-base text-brand-900/70">Your cart is empty.</p>
        <Link
          href="/brands"
          className="mt-10 inline-flex items-center gap-3 bg-coral-500 px-8 py-4 text-[11px] font-semibold uppercase tracking-[0.28em] text-white transition-colors hover:bg-coral-600"
        >
          Shop the range →
        </Link>
      </div>
    );
  }

  const handleChange =
    (field: keyof CustomerDetails) =>
    (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setDetails((prev) => ({ ...prev, [field]: e.target.value }));

  const handlePlaceOrder = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (submitting) return;
    setError(null);
    setSubmitting(true);
    try {
      const result = await placeOrder({
        customer_name: details.fullName,
        customer_email: details.email,
        customer_phone: details.phone,
        address: details.address,
        city: details.city,
        state: details.state,
        notes: details.notes || null,
        payment_method: "whatsapp",
        items: items.map((i) => ({
          product_id: i.productId,
          quantity: i.quantity,
        })),
      });

      // Backend builds the WhatsApp message; fall back to a local link.
      const url =
        result.whatsapp?.url ??
        whatsappLink(
          result.whatsapp?.message ??
            `Hi Ono Belle! I just placed order ${result.order.reference}.`,
        );
      setWhatsappUrl(url);

      // Best-effort auto-open — browsers often block popups after an await, so
      // the success screen also shows an explicit "Open WhatsApp" button.
      window.open(url, "_blank", "noopener,noreferrer");

      clear();
      setPlacedOrder(result.order);
    } catch (err) {
      if (err instanceof ApiError) {
        const first = err.fieldErrors
          ? Object.values(err.fieldErrors)[0]?.[0]
          : undefined;
        setError(first ?? err.message);
      } else {
        setError("Could not place your order. Please try again.");
      }
    } finally {
      setSubmitting(false);
    }
  };

  if (placedOrder) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="mx-auto w-full max-w-2xl px-6 py-24 text-center"
      >
        <span className="text-[11px] font-semibold uppercase tracking-[0.32em] text-accent-600">
          Order placed
        </span>
        <h1 className="mt-3 font-display text-3xl text-brand-900 sm:text-5xl">
          Thanks — your order is confirmed with us.
        </h1>
        <p className="mt-5 text-base text-brand-900/70">
          Your order reference is{" "}
          <span className="font-semibold text-brand-900">
            {placedOrder.reference}
          </span>
          . The last step is to send us your order on WhatsApp so we can confirm
          delivery and payment — tap the button below, then just hit send.
        </p>

        {whatsappUrl && (
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-flex items-center justify-center gap-3 bg-[#25D366] px-8 py-4 text-[11px] font-semibold uppercase tracking-[0.28em] text-white transition-colors hover:bg-[#1f9a4d]"
          >
            <WhatsAppIcon />
            Open WhatsApp to send your order
          </a>
        )}

        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <Link
            href="/track"
            className="inline-flex items-center gap-3 bg-brand-900 px-8 py-4 text-[11px] font-semibold uppercase tracking-[0.28em] text-white transition-colors hover:bg-brand-700"
          >
            Track this order
          </Link>
          <Link
            href="/brands"
            className="inline-flex items-center gap-3 border border-brand-900/20 bg-white px-8 py-4 text-[11px] font-semibold uppercase tracking-[0.28em] text-brand-900 transition-colors hover:border-brand-900"
          >
            Continue shopping
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
        <h1 className="mt-2 font-display text-3xl text-brand-900 sm:text-5xl">
          Your details
        </h1>
        <p className="mt-3 max-w-xl text-sm text-brand-900/65">
          We confirm every order through WhatsApp so we can sort availability,
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

          {/* Payment method */}
          <div className="grid gap-3">
            <span className="text-[11px] font-semibold uppercase tracking-[0.22em] text-brand-700">
              Payment method
            </span>
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="flex items-start gap-3 border border-brand-900 bg-brand-50/60 p-4">
                <span className="mt-0.5 grid h-4 w-4 place-items-center rounded-full border-[5px] border-brand-900" />
                <div>
                  <p className="text-sm font-semibold text-brand-900">
                    WhatsApp / bank transfer
                  </p>
                  <p className="mt-1 text-xs text-brand-900/60">
                    Confirm availability, delivery &amp; payment with our team on
                    WhatsApp.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3 border border-border bg-muted/40 p-4 opacity-70">
                <span className="mt-0.5 grid h-4 w-4 place-items-center rounded-full border border-brand-900/30" />
                <div>
                  <p className="text-sm font-semibold text-brand-900/70">
                    Pay with Paystack
                  </p>
                  <p className="mt-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-accent-600">
                    Coming soon
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <aside className="sticky top-28 h-fit space-y-5 border border-border bg-surface p-7 shadow-sm">
          <h2 className="font-display text-xl text-brand-900">Order summary</h2>

          <ul className="divide-y divide-border">
            {items.map((line) => (
              <li key={line.productId} className="flex gap-3 py-3">
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
                    <span>Qty {line.quantity}</span>
                    <span className="font-semibold text-brand-900">
                      {formatNaira(line.price * line.quantity)}
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

          {error && (
            <p className="text-xs text-red-600" role="alert">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={submitting}
            className="group inline-flex w-full items-center justify-center gap-3 bg-[#25D366] px-6 py-4 text-[11px] font-semibold uppercase tracking-[0.28em] text-white transition-colors hover:bg-[#1f9a4d] disabled:cursor-not-allowed disabled:opacity-60"
          >
            <WhatsAppIcon />
            {submitting ? "Placing order…" : "Place order via WhatsApp"}
          </button>

          <p className="text-xs text-brand-900/55">
            By placing this order you accept our terms. Payment is confirmed on
            WhatsApp via bank transfer (Paystack coming soon).
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
