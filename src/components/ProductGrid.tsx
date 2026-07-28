"use client";

import { useMemo, useState } from "react";
import { motion } from "motion/react";
import type { Product } from "@/lib/product";
import type { ApiCategory } from "@/lib/api/types";
import ProductCard from "./ProductCard";

type Props = {
  products: Product[];
  categories: ApiCategory[];
};

export default function ProductGrid({ products, categories }: Props) {
  const [active, setActive] = useState<string>("all");

  const filtered = useMemo(() => {
    if (active === "all") return products;
    return products.filter((p) => p.categorySlug === active);
  }, [active, products]);

  // Only show category filters that actually have products.
  const usableCategories = useMemo(
    () =>
      categories.filter((c) =>
        products.some((p) => p.categorySlug === c.slug),
      ),
    [categories, products],
  );

  return (
    <div>
      <div className="mb-10 flex flex-wrap gap-2">
        <FilterPill
          active={active === "all"}
          onClick={() => setActive("all")}
          label={`All · ${products.length}`}
        />
        {usableCategories.map((cat) => {
          const count = products.filter(
            (p) => p.categorySlug === cat.slug,
          ).length;
          return (
            <FilterPill
              key={cat.id}
              active={active === cat.slug}
              onClick={() => setActive(cat.slug)}
              label={`${cat.name} · ${count}`}
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
