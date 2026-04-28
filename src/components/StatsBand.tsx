"use client";

import { motion, useReducedMotion } from "motion/react";

const stats = [
  { value: "36", label: "States covered" },
  { value: "5+", label: "Distribution channels" },
  { value: "100%", label: "NAFDAC compliant" },
  { value: "1", label: "Local commercial partner" },
];

export default function StatsBand() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="relative overflow-hidden bg-brand-900 text-white">
      {/* subtle gold aura */}
      <motion.div
        aria-hidden
        animate={
          reduceMotion
            ? undefined
            : { opacity: [0.3, 0.5, 0.3], scale: [1, 1.1, 1] }
        }
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
        className="pointer-events-none absolute -left-20 top-1/2 h-72 w-72 -translate-y-1/2 rounded-full bg-accent-400/20 blur-3xl"
      />

      <div className="relative mx-auto w-full max-w-6xl px-6 py-20 sm:py-24">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="text-[11px] font-semibold uppercase tracking-[0.32em] text-accent-400">
              By the numbers
            </span>
            <h2 className="mt-4 max-w-md font-serif text-3xl leading-tight sm:text-5xl">
              Built for nationwide reach. Backed by compliance.
            </h2>
            <p className="mt-6 max-w-md text-base text-white/70">
              We connect global manufacturers to Nigerian retail through one
              structured, professional commercial layer.
            </p>
          </motion.div>

          <dl className="grid grid-cols-2 gap-px overflow-hidden bg-white/10">
            {stats.map((stat, idx) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{
                  duration: 0.7,
                  delay: reduceMotion ? 0 : idx * 0.08,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="bg-brand-900 p-8"
              >
                <dt className="text-[10px] uppercase tracking-[0.28em] text-white/55">
                  {stat.label}
                </dt>
                <dd className="mt-4 font-serif text-5xl text-white sm:text-6xl">
                  {stat.value}
                </dd>
              </motion.div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
