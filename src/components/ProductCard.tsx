"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import { formatNaira, type Product } from "@/data/products";
import { useAddToCart } from "@/hooks/useAddToCart";

type Props = {
  product: Product;
  index?: number;
};

export default function ProductCard({ product, index = 0 }: Props) {
  const reduceMotion = useReducedMotion();
  const addToCart = useAddToCart();

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{
        duration: 0.6,
        delay: reduceMotion ? 0 : (index % 4) * 0.06,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="group flex flex-col overflow-hidden border border-border/70 bg-surface shadow-sm transition-shadow hover:shadow-xl"
    >
      <Link
        href={`/brands/${product.slug}`}
        className="relative block aspect-[4/5] w-full overflow-hidden bg-brand-50"
      >
        <motion.div
          initial={false}
          whileHover={reduceMotion ? undefined : { scale: 1.05 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="h-full w-full"
        >
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            className="object-cover"
          />
        </motion.div>

        {product.comparePrice && (
          <span className="absolute left-3 top-3 bg-accent-500 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-white">
            Sale
          </span>
        )}
      </Link>

      <div className="flex flex-1 flex-col gap-3 p-5">
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-accent-600">
            {product.brand}
          </p>
          <Link
            href={`/brands/${product.slug}`}
            className="mt-1 block font-serif text-lg leading-tight text-brand-900 transition-colors hover:text-brand-700"
          >
            {product.name}
          </Link>
          <p className="mt-1 text-xs text-brand-900/60">{product.size}</p>
        </div>

        <div className="mt-auto flex items-end justify-between gap-3">
          <div className="flex items-baseline gap-2">
            <span className="text-base font-semibold text-brand-900">
              {formatNaira(product.price)}
            </span>
            {product.comparePrice && (
              <span className="text-xs text-brand-900/40 line-through">
                {formatNaira(product.comparePrice)}
              </span>
            )}
          </div>
          <button
            type="button"
            onClick={() => addToCart(product.id)}
            aria-label={`Add ${product.name} to cart`}
            className="grid h-10 w-10 shrink-0 place-items-center bg-brand-900 text-white transition-colors hover:bg-brand-700"
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
    </motion.article>
  );
}
