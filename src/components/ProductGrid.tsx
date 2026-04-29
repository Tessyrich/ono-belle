"use client";

import { useMemo, useState } from "react";
import { motion } from "motion/react";
import {
  categories,
  products as allProducts,
  type ProductCategory,
} from "@/data/products";
import ProductCard from "./ProductCard";

export default function ProductGrid() {
  const [active, setActive] = useState<ProductCategory | "all">("all");

  const filtered = useMemo(() => {
    if (active === "all") return allProducts;
    return allProducts.filter((p) => p.category === active);
  }, [active]);

  return (
    <div>
      <div className="mb-10 flex flex-wrap gap-2">
        <FilterPill
          active={active === "all"}
          onClick={() => setActive("all")}
          label={`All · ${allProducts.length}`}
        />
        {categories.map((cat) => {
          const count = allProducts.filter(
            (p) => p.category === cat.slug,
          ).length;
          return (
            <FilterPill
              key={cat.slug}
              active={active === cat.slug}
              onClick={() => setActive(cat.slug)}
              label={`${cat.label} · ${count}`}
            />
          );
        })}
      </div>

      <motion.div
        layout
        className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
      >
        {filtered.map((product, idx) => (
          <ProductCard key={product.id} product={product} index={idx} />
        ))}
      </motion.div>

      {filtered.length === 0 && (
        <p className="mt-16 text-center text-sm text-brand-900/60">
          No products in this category yet — check back soon.
        </p>
      )}
    </div>
  );
}

function FilterPill({
  active,
  onClick,
  label,
}: {
  active: boolean;
  onClick: () => void;
  label: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.22em] transition-colors ${
        active
          ? "bg-brand-900 text-white"
          : "border border-brand-900/20 bg-surface text-brand-900/80 hover:border-brand-900 hover:text-brand-900"
      }`}
    >
      {label}
    </button>
  );
}
