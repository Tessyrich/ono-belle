"use client";

import { motion, useReducedMotion } from "motion/react";

type ServiceItem = {
  no: string;
  title: string;
  body: string;
  accent: "brand" | "accent" | "coral";
};

const services: ServiceItem[] = [
  {
    no: "01",
    title: "NAFDAC Compliance",
    body: "Full dossier preparation, sample submission and follow-through with NAFDAC — so every product reaches Nigerian shelves the safe, legal way.",
    accent: "brand",
  },
  {
    no: "02",
    title: "Importation & Shipping",
    body: "Freight, customs documentation, port clearance and delivery to bonded warehousing — handled end-to-end by our Lagos team.",
    accent: "accent",
  },
  {
    no: "03",
    title: "Warehousing & Inventory",
    body: "Climate-aware storage with stock rotation, expiry tracking and transparent inventory reporting for every brand we represent.",
    accent: "coral",
  },
  {
    no: "04",
    title: "Wholesale & Retail",
    body: "A structured commercial network reaching modern trade, traditional trade and specialty channels across Nigeria.",
    accent: "accent",
  },
  {
    no: "05",
    title: "Pharmacy & Hospital",
    body: "Direct accounts with leading pharmacy chains, independent pharmacies, hospitals and clinics nationwide.",
    accent: "coral",
  },
  {
    no: "06",
    title: "E-Commerce Integration",
    body: "Listing, content, and fulfilment support across Nigeria's leading online marketplaces and brand storefronts.",
    accent: "brand",
  },
];

const accentClasses: Record<
  ServiceItem["accent"],
  { badge: string; ring: string }
> = {
  brand: { badge: "bg-brand-500 text-white", ring: "ring-brand-200" },
  accent: { badge: "bg-accent-400 text-brand-900", ring: "ring-accent-200" },
  coral: { badge: "bg-coral-500 text-white", ring: "ring-coral-100" },
};

export default function WhatWeOffer() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="relative overflow-hidden bg-background">
      <div className="relative mx-auto w-full max-w-6xl px-6 py-20 sm:py-28">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto mb-16 max-w-3xl text-center"
        >
          <span className="text-[11px] font-semibold uppercase tracking-[0.32em] text-accent-600">
            What we offer
          </span>
          <h2 className="mt-3 font-baby text-3xl uppercase text-brand-900 sm:text-4xl lg:text-5xl">
            Six things every brand owner
            <br className="hidden sm:block" /> shouldn&apos;t do alone.
          </h2>
        </motion.div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, idx) => {
            const accent = accentClasses[service.accent];
            return (
              <motion.article
                key={service.no}
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
                  {service.no}
                </div>

                <h3 className="mt-6 font-baby text-2xl text-brand-900 sm:text-3xl">
                  {service.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-brand-900/70">
                  {service.body}
                </p>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
