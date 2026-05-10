"use client";

import { motion, useReducedMotion } from "motion/react";

type Partner = {
  no: string;
  title: string;
  tag: string;
  body: string;
  accent: "brand" | "accent" | "coral";
};

const partners: Partner[] = [
  {
    no: "01",
    title: "International baby & skincare brands",
    tag: "Brand owners",
    body: "Global manufacturers of premium baby care, skincare, and family wellness products.",
    accent: "brand",
  },
  {
    no: "02",
    title: "Pharmacies & healthcare retailers",
    tag: "Retail",
    body: "Pharmacy chains and independent pharmacies — modern and traditional trade, nationwide.",
    accent: "accent",
  },
  {
    no: "03",
    title: "Baby boutiques & supermarkets",
    tag: "Retail",
    body: "Specialty baby retailers and modern-trade supermarkets where parents shop.",
    accent: "coral",
  },
  {
    no: "04",
    title: "Hospitals & clinics",
    tag: "Clinical",
    body: "Maternity hospitals, paediatric clinics, and dermatology practices.",
    accent: "brand",
  },
  {
    no: "05",
    title: "Online retail platforms",
    tag: "E-commerce",
    body: "Nigeria's leading marketplaces and brand storefronts for digital-first parents.",
    accent: "accent",
  },
  {
    no: "06",
    title: "Trade marketing partners",
    tag: "Activation",
    body: "Agencies, sampling teams and field merchandisers that bring our brands to life.",
    accent: "coral",
  },
];

const accentClasses: Record<
  Partner["accent"],
  { badge: string; ring: string; tag: string }
> = {
  brand: {
    badge: "bg-brand-500 text-white",
    ring: "ring-brand-200",
    tag: "bg-brand-50 text-brand-700",
  },
  accent: {
    badge: "bg-accent-400 text-brand-900",
    ring: "ring-accent-200",
    tag: "bg-accent-100 text-accent-700",
  },
  coral: {
    badge: "bg-coral-500 text-white",
    ring: "ring-coral-100",
    tag: "bg-coral-50 text-coral-600",
  },
};

export default function WhoWeWorkWith() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="relative overflow-hidden bg-background">
      <div className="relative mx-auto w-full max-w-6xl px-6 py-20 sm:py-28">
        {/* Script watermark */}
        <span
          aria-hidden
          className="font-script pointer-events-none absolute -top-2 left-1/2 -translate-x-1/2 select-none whitespace-nowrap text-[7rem] leading-none text-brand-700/8 sm:text-[10rem]"
        >
          Our partners
        </span>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="relative mx-auto mb-16 max-w-3xl text-center"
        >
          <span className="text-[11px] font-semibold uppercase tracking-[0.32em] text-accent-600">
            Who we work with
          </span>
          <h2 className="mt-3 font-baby text-3xl uppercase text-brand-900 sm:text-4xl lg:text-5xl">
            One partner. Every channel
            <br className="hidden sm:block" /> that matters.
          </h2>
          <p className="mt-5 mx-auto max-w-xl text-base text-brand-900/70">
            International brands. Nigerian retail. Hospitals, pharmacies,
            supermarkets, boutiques and online marketplaces — all reached
            through one professional commercial layer.
          </p>
        </motion.div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {partners.map((partner, idx) => {
            const accent = accentClasses[partner.accent];
            return (
              <motion.article
                key={partner.no}
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
                <div className="flex items-start justify-between">
                  <div
                    className={`grid h-14 w-14 place-items-center rounded-2xl font-baby text-xl shadow-md ring-4 ${accent.badge} ${accent.ring}`}
                  >
                    {partner.no}
                  </div>
                  <span
                    className={`rounded-full px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] ${accent.tag}`}
                  >
                    {partner.tag}
                  </span>
                </div>

                <h3 className="mt-6 font-baby text-2xl text-brand-900 sm:text-3xl">
                  {partner.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-brand-900/70">
                  {partner.body}
                </p>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
