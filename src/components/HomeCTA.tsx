"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";

export default function HomeCTA() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="bg-muted/40">
      <div className="mx-auto w-full max-w-6xl px-6 py-24">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]"
        >
          <div>
            <span className="text-[11px] font-semibold uppercase tracking-[0.32em] text-accent-600">
              Partner with Ono Belle
            </span>
            <h2 className="mt-4 max-w-xl font-serif text-3xl leading-tight text-brand-900 sm:text-5xl">
              Let&apos;s build your brand in Nigeria.
            </h2>
            <p className="mt-5 max-w-md text-base text-brand-900/70">
              Tell us about your product range. We&apos;ll come back with a
              structured market-entry proposal within two business days.
            </p>
          </div>

          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-end lg:flex-col lg:items-stretch">
            <Link
              href="/contact"
              className="group inline-flex items-center justify-center gap-3 bg-brand-900 px-8 py-4 text-[11px] font-semibold uppercase tracking-[0.28em] text-white transition-colors hover:bg-brand-700"
            >
              Start a conversation
              <motion.span
                animate={
                  reduceMotion ? undefined : { x: [0, 4, 0] }
                }
                transition={{
                  duration: 1.6,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                →
              </motion.span>
            </Link>
            <a
              href="mailto:onobelle@yahoo.co.uk"
              className="inline-flex items-center justify-center gap-2 border border-brand-900/20 bg-white px-8 py-4 text-[11px] font-semibold uppercase tracking-[0.28em] text-brand-900 transition-colors hover:border-brand-900 hover:bg-background"
            >
              onobelle@yahoo.co.uk
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
