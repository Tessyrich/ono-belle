"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";

export default function ServicesCTA() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="relative overflow-hidden bg-background">
      <div className="mx-auto w-full max-w-6xl px-6 py-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="relative overflow-hidden rounded-[2.5rem] bg-linear-to-br from-brand-600 via-brand-700 to-brand-900 px-8 py-14 text-center text-white shadow-2xl sm:px-14 sm:py-20"
        >
          {/* Decor blobs */}
          <motion.div
            aria-hidden
            animate={
              reduceMotion
                ? undefined
                : { scale: [1, 1.2, 1], opacity: [0.35, 0.6, 0.35] }
            }
            transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
            className="pointer-events-none absolute -top-24 -left-24 h-72 w-72 rounded-full bg-accent-400/30 blur-3xl"
          />
          <motion.div
            aria-hidden
            animate={
              reduceMotion
                ? undefined
                : { scale: [1, 1.15, 1], opacity: [0.3, 0.55, 0.3] }
            }
            transition={{
              duration: 11,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1.2,
            }}
            className="pointer-events-none absolute -bottom-24 -right-16 h-72 w-72 rounded-full bg-coral-500/30 blur-3xl"
          />

          {/* Script watermark */}
          <span
            aria-hidden
            className="font-script pointer-events-none absolute right-4 top-2 -rotate-6 select-none whitespace-nowrap text-[7rem] leading-none text-white/10 sm:right-10 sm:top-6 sm:text-[10rem]"
          >
            partner
          </span>

          <div className="relative">
            <span className="text-[11px] font-semibold uppercase tracking-[0.32em] text-accent-200">
              Ready to start
            </span>
            <h2 className="mt-4 font-baby text-3xl uppercase leading-tight sm:text-4xl lg:text-5xl">
              Let&apos;s bring your brand to
              <br className="hidden sm:block" /> Nigerian families.
            </h2>
            <p className="mt-5 mx-auto max-w-xl text-base text-white/85">
              Tell us about your product range and we&apos;ll come back with a
              structured, channel-specific market-entry proposal within two
              business days.
            </p>

            <div className="mt-9 flex flex-wrap justify-center gap-4">
              <Link
                href="/contact"
                className="group inline-flex items-center gap-3 rounded-full bg-coral-500 px-8 py-4 text-sm font-bold uppercase tracking-wide text-white shadow-xl transition-colors hover:bg-coral-600"
              >
                Contact us
                <motion.span
                  animate={reduceMotion ? undefined : { x: [0, 5, 0] }}
                  transition={{
                    duration: 1.6,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  aria-hidden
                >
                  →
                </motion.span>
              </Link>
              <a
                href="mailto:onobelle@yahoo.co.uk"
                className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/5 px-8 py-4 text-sm font-bold uppercase tracking-wide text-white transition-colors hover:border-white hover:bg-white/15"
              >
                onobelle@yahoo.co.uk
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
