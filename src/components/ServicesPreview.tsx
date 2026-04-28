"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";

type Card = {
  eyebrow: string;
  title: string;
  href: string;
  cta: string;
  bg: string;
  accent: string;
};

const cards: Card[] = [
  {
    eyebrow: "Brand Import",
    title: "International brands, into Nigeria.",
    href: "/services",
    cta: "How we import",
    bg: "linear-gradient(150deg,#dde9d6,#f5efe3 65%,#ecdcb1)",
    accent: "#4d7a5e",
  },
  {
    eyebrow: "Compliance",
    title: "NAFDAC-registered, end-to-end.",
    href: "/services",
    cta: "Our process",
    bg: "linear-gradient(150deg,#f4ead0,#ffffff 60%,#b9d2b6)",
    accent: "#94783f",
  },
  {
    eyebrow: "Distribution",
    title: "Pharmacies, hospitals, online.",
    href: "/partners",
    cta: "Where we play",
    bg: "linear-gradient(150deg,#b9d2b6,#f5efe3 60%,#f4ead0)",
    accent: "#3d6248",
  },
];

export default function ServicesPreview() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="bg-white">
      <div className="mx-auto w-full max-w-6xl px-6 py-20 sm:py-28">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mb-14 flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end"
        >
          <div>
            <span className="text-[11px] font-semibold uppercase tracking-[0.32em] text-accent-600">
              What we do
            </span>
            <h2 className="mt-3 max-w-xl font-serif text-3xl text-brand-900 sm:text-5xl">
              A single, professional gateway into Nigeria.
            </h2>
          </div>
          <p className="max-w-sm text-sm text-brand-900/70">
            Three pillars — handled together, so brand owners don&apos;t have
            to assemble a Nigerian go-to-market alone.
          </p>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-3">
          {cards.map((card, idx) => (
            <motion.article
              key={card.title}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{
                duration: 0.7,
                delay: reduceMotion ? 0 : idx * 0.1,
                ease: [0.22, 1, 0.36, 1],
              }}
              whileHover={reduceMotion ? undefined : { y: -6 }}
              className="group relative flex flex-col overflow-hidden border border-border/70 bg-surface shadow-sm"
            >
              <div
                className="relative aspect-[4/3] w-full overflow-hidden"
                style={{ background: card.bg }}
              >
                {/* Animated decor */}
                <motion.div
                  aria-hidden
                  animate={
                    reduceMotion
                      ? undefined
                      : { scale: [1, 1.1, 1], opacity: [0.4, 0.7, 0.4] }
                  }
                  transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: idx * 0.4,
                  }}
                  className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/45 blur-2xl"
                />
                <span
                  className="absolute left-6 top-6 text-[10px] font-semibold uppercase tracking-[0.32em]"
                  style={{ color: card.accent }}
                >
                  0{idx + 1} · {card.eyebrow}
                </span>
                {/* Big number watermark */}
                <span
                  aria-hidden
                  className="absolute -bottom-6 right-4 font-serif text-[12rem] leading-none text-white/30 select-none"
                >
                  {idx + 1}
                </span>
              </div>

              <div className="flex flex-1 flex-col justify-between gap-6 p-7">
                <h3 className="max-w-[20ch] font-serif text-2xl leading-tight text-brand-900 sm:text-3xl">
                  {card.title}
                </h3>
                <Link
                  href={card.href}
                  className="inline-flex w-fit items-center gap-2 border-b border-brand-900/30 pb-1 text-[11px] font-semibold uppercase tracking-[0.28em] text-brand-900 transition-colors hover:border-brand-900 hover:text-brand-700"
                >
                  {card.cta}
                  <span className="transition-transform group-hover:translate-x-1">
                    →
                  </span>
                </Link>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
