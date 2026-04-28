"use client";

import { motion, useReducedMotion } from "motion/react";

const steps = [
  {
    no: "01",
    title: "Discovery",
    body: "We review your range, certifications, and target channels.",
  },
  {
    no: "02",
    title: "Compliance",
    body: "NAFDAC product registration & regulatory clearance.",
  },
  {
    no: "03",
    title: "Importation",
    body: "Shipping, customs, and warehousing into Lagos.",
  },
  {
    no: "04",
    title: "Distribution",
    body: "Pharmacies, hospitals, retailers, online marketplaces.",
  },
  {
    no: "05",
    title: "Activation",
    body: "Trade marketing, sampling, and continuous brand-building.",
  },
];

export default function ProcessTimeline() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="bg-background">
      <div className="mx-auto w-full max-w-6xl px-6 py-20 sm:py-28">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mb-16 max-w-2xl"
        >
          <span className="text-[11px] font-semibold uppercase tracking-[0.32em] text-accent-600">
            How we work
          </span>
          <h2 className="mt-3 font-serif text-3xl text-brand-900 sm:text-5xl">
            From global brand to Nigerian shelves — in five structured steps.
          </h2>
        </motion.div>

        <div className="relative">
          {/* Connector line */}
          <motion.div
            aria-hidden
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
            style={{ transformOrigin: "left" }}
            className="pointer-events-none absolute left-0 right-0 top-6 hidden h-px bg-linear-to-r from-brand-300/40 via-brand-500/70 to-brand-300/40 md:block"
          />

          <ol className="grid gap-10 md:grid-cols-5 md:gap-6">
            {steps.map((step, idx) => (
              <motion.li
                key={step.no}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{
                  duration: 0.7,
                  delay: reduceMotion ? 0 : idx * 0.12,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="relative"
              >
                <motion.div
                  initial={{ scale: 0.6, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true, amount: 0.5 }}
                  transition={{
                    duration: 0.6,
                    delay: reduceMotion ? 0 : idx * 0.12 + 0.2,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="grid h-12 w-12 place-items-center rounded-full border border-brand-300 bg-background text-[11px] font-semibold tracking-[0.18em] text-brand-700 shadow-sm"
                >
                  {step.no}
                </motion.div>
                <h3 className="mt-5 font-serif text-xl text-brand-900 sm:text-2xl">
                  {step.title}
                </h3>
                <p className="mt-2 max-w-[26ch] text-sm leading-relaxed text-brand-900/65">
                  {step.body}
                </p>
              </motion.li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
