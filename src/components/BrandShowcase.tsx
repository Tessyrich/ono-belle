"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";

const categories = [
  {
    name: "Baby Skincare",
    description: "Lotions, washes, creams and balms.",
    bg: "linear-gradient(160deg,#dde9d6,#f5efe3)",
  },
  {
    name: "Newborn & Sensitive",
    description: "Hypoallergenic, fragrance-free.",
    bg: "linear-gradient(160deg,#f4ead0,#fffaf0)",
  },
  {
    name: "Organic & Vegan",
    description: "Plant-based, certified organic.",
    bg: "linear-gradient(160deg,#b9d2b6,#eef4ea)",
  },
  {
    name: "Dermatologist-Tested",
    description: "Clinically reviewed and trusted.",
    bg: "linear-gradient(160deg,#ecdcb1,#f5efe3)",
  },
  {
    name: "Family Wellness",
    description: "For mother, baby, and the home.",
    bg: "linear-gradient(160deg,#dde9d6,#f4ead0)",
  },
  {
    name: "Hygiene Essentials",
    description: "Daily staples pharmacies trust.",
    bg: "linear-gradient(160deg,#f5efe3,#b9d2b6)",
  },
];

export default function BrandShowcase() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="bg-muted/40">
      <div className="mx-auto w-full max-w-6xl px-6 py-20 sm:py-28">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mb-14 flex flex-col items-start gap-3 text-left"
        >
          <span className="text-[11px] font-semibold uppercase tracking-[0.32em] text-accent-600">
            Featured categories
          </span>
          <h2 className="max-w-2xl font-serif text-3xl text-brand-900 sm:text-5xl">
            Carefully selected. Built to be trusted.
          </h2>
        </motion.div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((cat, idx) => (
            <motion.div
              key={cat.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{
                duration: 0.6,
                delay: reduceMotion ? 0 : idx * 0.06,
                ease: [0.22, 1, 0.36, 1],
              }}
              whileHover={reduceMotion ? undefined : { y: -4 }}
              className="group relative aspect-[4/3] overflow-hidden border border-border/70 shadow-sm"
              style={{ background: cat.bg }}
            >
              <motion.div
                aria-hidden
                animate={
                  reduceMotion
                    ? undefined
                    : { y: [0, 6, 0], opacity: [0.5, 0.75, 0.5] }
                }
                transition={{
                  duration: 7 + idx,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute -right-12 -bottom-12 h-44 w-44 rounded-full bg-white/45 blur-2xl"
              />

              <div className="relative flex h-full flex-col justify-between p-7">
                <span className="text-[10px] font-semibold uppercase tracking-[0.32em] text-brand-700/70">
                  0{idx + 1}
                </span>
                <div>
                  <h3 className="font-serif text-2xl leading-tight text-brand-900 sm:text-3xl">
                    {cat.name}
                  </h3>
                  <p className="mt-2 max-w-[24ch] text-sm text-brand-900/65">
                    {cat.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-12 flex justify-center">
          <Link
            href="/brands"
            className="inline-flex items-center gap-3 bg-brand-900 px-8 py-4 text-[11px] font-semibold uppercase tracking-[0.28em] text-white transition-colors hover:bg-brand-700"
          >
            View all categories
            <span>→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
