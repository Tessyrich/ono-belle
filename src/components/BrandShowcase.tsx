"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { getFeaturedProducts } from "@/data/products";
import ProductCard from "./ProductCard";

export default function BrandShowcase() {
  const featured = getFeaturedProducts();

  return (
    <section className="bg-muted/40">
      <div className="mx-auto w-full max-w-6xl px-6 py-20 sm:py-28">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mb-12 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end"
        >
          <div>
            <span className="text-[11px] font-semibold uppercase tracking-[0.32em] text-accent-600">
              Featured products
            </span>
            <h2 className="mt-3 max-w-2xl font-serif text-3xl text-brand-900 sm:text-5xl">
              Premium baby & family care, in stock now.
            </h2>
          </div>
          <Link
            href="/brands"
            className="inline-flex items-center gap-2 border-b border-brand-900/30 pb-1 text-[11px] font-semibold uppercase tracking-[0.28em] text-brand-900 transition-colors hover:border-brand-900 hover:text-brand-700"
          >
            Shop all products →
          </Link>
        </motion.div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {featured.map((product, idx) => (
            <ProductCard key={product.id} product={product} index={idx} />
          ))}
        </div>
      </div>
    </section>
  );
}
