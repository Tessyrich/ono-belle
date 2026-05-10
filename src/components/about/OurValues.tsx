"use client";

import { motion, useReducedMotion } from "motion/react";

type Value = {
  no: string;
  title: string;
  body: string;
  accent: "brand" | "accent" | "coral";
};

const values: Value[] = [
  {
    no: "01",
    title: "Safety & compliance",
    body: "Every brand we represent is fully NAFDAC-registered and meets international safety standards before it reaches a Nigerian shelf.",
    accent: "brand",
  },
  {
    no: "02",
    title: "Transparent partnership",
    body: "Clear contracts, honest reporting, and structured commercial relationships with global brands and local channels.",
    accent: "accent",
  },
  {
    no: "03",
    title: "Long-term brand building",
    body: "We invest in trade marketing, training and visibility — building category leaders, not one-off shipments.",
    accent: "coral",
  },
  {
    no: "04",
    title: "Consumer trust",
    body: "Nigerian parents deserve products that are gentle, effective, and reliably available. Quality is non-negotiable.",
    accent: "accent",
  },
  {
    no: "05",
    title: "Ethical trade",
    body: "We operate as a local commercial partner with full regulatory, tax, and import compliance — no shortcuts.",
    accent: "coral",
  },
  {
    no: "06",
    title: "Care, end-to-end",
    body: "From dossier to doorstep, every step is handled by people who understand both global standards and the Nigerian market.",
    accent: "brand",
  },
];

const accentClasses: Record<Value["accent"], { badge: string; ring: string }> =
  {
    brand: { badge: "bg-brand-500 text-white", ring: "ring-brand-200" },
    accent: { badge: "bg-accent-400 text-brand-900", ring: "ring-accent-200" },
    coral: { badge: "bg-coral-500 text-white", ring: "ring-coral-100" },
  };

export default function OurValues() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="relative overflow-hidden bg-muted/40">
      <div className="relative mx-auto w-full max-w-6xl px-6 py-20 sm:py-28">
        {/* Script watermark */}
        <span
          aria-hidden
          className="font-script pointer-events-none absolute -top-4 left-1/2 -translate-x-1/2 select-none whitespace-nowrap text-[7rem] leading-none text-brand-700/8 sm:text-[10rem]"
        >
          Our values
        </span>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="relative mx-auto mb-16 max-w-3xl text-center"
        >
          <span className="text-[11px] font-semibold uppercase tracking-[0.32em] text-accent-600">
            Our values
          </span>
          <h2 className="mt-3 font-baby text-3xl uppercase text-brand-900 sm:text-4xl lg:text-5xl">
            Principles that shape every
            <br className="hidden sm:block" /> partnership we take on.
          </h2>
        </motion.div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {values.map((value, idx) => {
            const accent = accentClasses[value.accent];
            return (
              <motion.article
                key={value.no}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{
                  duration: 0.7,
                  delay: reduceMotion ? 0 : idx * 0.08,
                  ease: [0.22, 1, 0.36, 1],
                }}
                whileHover={reduceMotion ? undefined : { y: -6 }}
                className="group relative flex flex-col rounded-3xl border border-border bg-surface p-7 shadow-sm transition-shadow hover:shadow-xl"
              >
                <div
                  className={`grid h-14 w-14 place-items-center rounded-2xl font-baby text-xl shadow-md ring-4 ${accent.badge} ${accent.ring}`}
                >
                  {value.no}
                </div>

                <h3 className="mt-6 font-baby text-2xl text-brand-900 sm:text-3xl">
                  {value.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-brand-900/70">
                  {value.body}
                </p>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
