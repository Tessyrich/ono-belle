"use client";

import { useState, type FormEvent } from "react";
import { motion } from "motion/react";
import { trackOrder } from "@/lib/api/storefront";
import { ApiError } from "@/lib/api/client";
import { formatPrice } from "@/lib/product";
import type { ApiPublicOrder } from "@/lib/api/types";

const statusStyles: Record<string, string> = {
  pending: "bg-accent-200 text-accent-600",
  processing: "bg-brand-100 text-brand-700",
  shipped: "bg-brand-200 text-brand-900",
  delivered: "bg-brand-500/15 text-brand-700",
  cancelled: "bg-red-100 text-red-700",
};

const paymentStyles: Record<string, string> = {
  pending: "bg-accent-200 text-accent-600",
  paid: "bg-brand-500/15 text-brand-700",
  failed: "bg-red-100 text-red-700",
};

export default function OrderTrackView() {
  const [reference, setReference] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [order, setOrder] = useState<ApiPublicOrder | null>(null);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (loading) return;
    setLoading(true);
    setError(null);
    setOrder(null);
    try {
      const result = await trackOrder(reference.trim(), email.trim());
      setOrder(result);
    } catch (err) {
      setError(
        err instanceof ApiError && err.status === 404
          ? "No order found with that reference and email."
          : err instanceof ApiError
            ? err.message
            : "Could not look up your order. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      <form
        onSubmit={handleSubmit}
        className="grid gap-5 border border-border bg-surface p-7 shadow-sm sm:grid-cols-[1.2fr_1.2fr_auto] sm:items-end"
      >
        <div className="grid gap-2">
          <label
            htmlFor="reference"
            className="text-[11px] font-semibold uppercase tracking-[0.22em] text-brand-700"
          >
            Order reference
          </label>
          <input
            id="reference"
            required
            value={reference}
            onChange={(e) => setReference(e.target.value)}
            placeholder="ORD-XXXXXX"
            className="border border-border bg-background px-4 py-3 text-sm text-brand-900 outline-none transition-colors focus:border-brand-500"
          />
        </div>
        <div className="grid gap-2">
          <label
            htmlFor="email"
            className="text-[11px] font-semibold uppercase tracking-[0.22em] text-brand-700"
          >
            Email
          </label>
          <input
            id="email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            className="border border-border bg-background px-4 py-3 text-sm text-brand-900 outline-none transition-colors focus:border-brand-500"
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="inline-flex items-center justify-center gap-2 bg-brand-900 px-6 py-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-white transition-colors hover:bg-brand-700 disabled:opacity-60"
        >
          {loading ? "Checking…" : "Track"}
        </button>
      </form>

      {error && (
        <p className="text-sm text-red-600" role="alert">
          {error}
        </p>
      )}

      {order && (
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="border border-border bg-surface p-7 shadow-sm"
        >
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-brand-700/60">
                Reference
              </p>
              <p className="mt-1 font-display text-2xl text-brand-900">
                {order.reference}
              </p>
              <p className="mt-1 text-sm text-brand-900/60">
                {order.customer_name}
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <span
                className={`inline-flex px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] ${
                  statusStyles[order.status] ?? "bg-muted text-brand-900"
                }`}
              >
                {order.status_label || order.status}
              </span>
              <span
                className={`inline-flex px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] ${
                  paymentStyles[order.payment_status] ??
                  "bg-muted text-brand-900"
                }`}
              >
                {order.payment_status}
              </span>
            </div>
          </div>

          {order.items && order.items.length > 0 && (
            <ul className="mt-6 divide-y divide-border border-t border-border">
              {order.items.map((item, idx) => (
                <li
                  key={idx}
                  className="flex items-center justify-between gap-4 py-3 text-sm"
                >
                  <span className="text-brand-900">
                    {item.product_name}{" "}
                    <span className="text-brand-900/55">× {item.quantity}</span>
                  </span>
                  <span className="font-semibold text-brand-900">
                    {formatPrice(item.subtotal ?? item.price)}
                  </span>
                </li>
              ))}
            </ul>
          )}

          <dl className="mt-6 space-y-2 border-t border-border pt-4 text-sm">
            <div className="flex justify-between text-brand-900/75">
              <dt>Subtotal</dt>
              <dd>{formatPrice(order.subtotal)}</dd>
            </div>
            <div className="flex justify-between border-t border-border pt-2 text-base font-semibold text-brand-900">
              <dt>Total</dt>
              <dd>{formatPrice(order.total)}</dd>
            </div>
          </dl>
        </motion.div>
      )}
    </div>
  );
}
