"use client";

import { motion, useReducedMotion } from "motion/react";

const channels = [
  "Pharmacies",
  "Hospitals",
  "Baby Boutiques",
  "Supermarkets",
  "Online Retail",
];

export default function TrustStrip() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="border-y border-border/70 bg-muted/40">
      <div className="mx-auto w-full max-w-6xl px-6 py-10">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col items-center gap-5 sm:flex-row sm:justify-between"
        >
          <p className="text-[10px] font-semibold uppercase tracking-[0.32em] text-brand-700/70">
            Trusted across Nigeria&apos;s leading channels
          </p>
          <ul className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
            {channels.map((channel, i) => (
              <motion.li
                key={channel}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{
                  duration: 0.6,
                  delay: reduceMotion ? 0 : i * 0.06,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="font-serif text-base text-brand-900/80 sm:text-lg"
              >
                {channel}
              </motion.li>
            ))}
          </ul>
        </motion.div>
      </div>
    </section>
  );
}
