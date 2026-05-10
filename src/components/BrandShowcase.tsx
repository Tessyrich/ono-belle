"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { products } from "@/data/products";
import ProductCard from "./ProductCard";

const PAGE_SIZE = 4;

export default function BrandShowcase() {
  const reduceMotion = useReducedMotion();
  const [page, setPage] = useState(0);
  const [direction, setDirection] = useState(1);

  const totalPages = Math.ceil(products.length / PAGE_SIZE);

  const currentItems = useMemo(() => {
    const start = page * PAGE_SIZE;
    return products.slice(start, start + PAGE_SIZE);
  }, [page]);

  const goPrev = () => {
    setDirection(-1);
    setPage((p) => (p - 1 + totalPages) % totalPages);
  };
  const goNext = () => {
    setDirection(1);
    setPage((p) => (p + 1) % totalPages);
  };
  const goTo = (i: number) => {
    setDirection(i > page ? 1 : -1);
    setPage(i);
  };

  return (
    <section className="relative overflow-hidden bg-muted/40">
      <div className="mx-auto w-full max-w-6xl px-6 py-20 sm:py-28">
        {/* Header */}
        <div className="mb-12 flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="text-[11px] font-semibold uppercase tracking-[0.32em] text-accent-600">
              Featured products
            </span>
            <h2 className="mt-3 max-w-2xl font-baby text-3xl uppercase text-brand-900 sm:text-4xl lg:text-5xl">
              Premium baby & family care,
              <br className="hidden sm:block" /> in stock now.
            </h2>
          </motion.div>

          {/* Pagination controls (header) */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={goPrev}
              aria-label="Previous page"
              className="grid h-11 w-11 place-items-center rounded-full border border-brand-900/15 bg-surface text-brand-900 transition-all hover:scale-105 hover:border-brand-700 hover:bg-brand-50"
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
                  d="M15 6l-6 6 6 6"
                />
              </svg>
            </button>
            <button
              type="button"
              onClick={goNext}
              aria-label="Next page"
              className="grid h-11 w-11 place-items-center rounded-full border border-brand-900/15 bg-surface text-brand-900 transition-all hover:scale-105 hover:border-brand-700 hover:bg-brand-50"
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
                  d="M9 6l6 6-6 6"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Animated paged grid */}
        <div className="relative min-h-[440px]">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={page}
              custom={direction}
              initial={
                reduceMotion
                  ? { opacity: 0 }
                  : { opacity: 0, x: direction * 40 }
              }
              animate={{ opacity: 1, x: 0 }}
              exit={
                reduceMotion
                  ? { opacity: 0 }
                  : { opacity: 0, x: direction * -40 }
              }
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
            >
              {currentItems.map((product, idx) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  index={idx}
                />
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Footer: page dots + view all */}
        <div className="mt-12 flex flex-col items-center gap-8 sm:flex-row sm:justify-between">
          {/* Page dots */}
          <div className="flex items-center gap-2.5">
            {Array.from({ length: totalPages }).map((_, i) => (
              <button
                key={i}
                type="button"
                aria-label={`Go to page ${i + 1}`}
                onClick={() => goTo(i)}
                className={`h-2.5 transition-all ${
                  page === i
                    ? "w-9 rounded-full bg-brand-700"
                    : "w-2.5 rounded-full bg-brand-900/20 hover:bg-brand-900/40"
                }`}
              />
            ))}
            <span className="ml-3 text-xs font-medium text-brand-900/55">
              Page {page + 1} of {totalPages}
            </span>
          </div>

          {/* View all CTA */}
          <Link
            href="/brands"
            className="group inline-flex items-center gap-3 rounded-full bg-coral-500 px-8 py-4 text-sm font-bold uppercase tracking-wide text-white shadow-xl transition-colors hover:bg-coral-600"
          >
            View All Products
            <motion.span
              animate={
                reduceMotion ? undefined : { x: [0, 5, 0] }
              }
              transition={{
                duration: 1.6,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              aria-hidden
            >
              →
            </motion.span>
          </Link>
        </div>
      </div>
    </section>
  );
}
