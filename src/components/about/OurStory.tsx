"use client";

import Image from "next/image";
import { motion } from "motion/react";

const stats = [
  { k: "Focus", v: "Baby & family" },
  { k: "Approach", v: "Compliance-first" },
  { k: "Coverage", v: "Nationwide" },
  { k: "HQ", v: "Lagos, Nigeria" },
];

export default function OurStory() {
  return (
    <section id="story" className="relative overflow-hidden bg-background">
      <div className="mx-auto w-full max-w-6xl px-6 py-20 sm:py-28">
        <div className="grid items-center gap-14 lg:grid-cols-[1fr_1fr] lg:gap-20">
          {/* LEFT — text */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="text-[11px] font-semibold uppercase tracking-[0.32em] text-accent-600">
              Who we are
            </span>
            <h2 className="mt-3 font-baby text-3xl uppercase leading-tight text-brand-900 sm:text-4xl lg:text-5xl">
              <span className="text-brand-900">A registered </span>
              <span className="text-coral-600">Nigerian </span>
              <span className="text-brand-900">distributor — </span>
              <span className="text-accent-600">built on care.</span>
            </h2>
            <div className="mt-6 space-y-4 text-base leading-relaxed text-brand-900/75">
              <p>
                ONO BELLE GLOBAL LIMITED is a registered Nigerian import and
                distribution company focused on baby care, skincare, and family
                wellness products.
              </p>
              <p>
                We specialise in representing international brands and managing
                their full commercial entry into Nigeria — from regulatory
                approvals and logistics, to wholesale distribution, marketing,
                and retail partnerships.
              </p>
              <p>
                Our mission is to make world-class baby and family skincare
                products accessible to Nigerian families through safe,
                compliant, and professionally managed supply chains.
              </p>
            </div>
          </motion.div>

          {/* RIGHT — image + stats overlay */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            <div
              className="relative aspect-[4/5] w-full overflow-hidden bg-brand-100 shadow-2xl ring-2 ring-accent-200/40"
              style={{
                borderRadius: "55% 45% 55% 45% / 55% 55% 45% 45%",
              }}
            >
              <Image
                src="/assets/hero1.jpg"
                alt="Ono Belle baby & family skincare"
                fill
                sizes="(max-width: 1024px) 90vw, 45vw"
                className="object-cover"
              />
            </div>

            {/* Floating stat card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{
                duration: 0.8,
                delay: 0.25,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="absolute -bottom-8 -left-4 grid grid-cols-2 gap-2 rounded-3xl border border-border bg-surface p-4 shadow-xl sm:-left-10 sm:gap-3 sm:p-5"
            >
              {stats.map((item) => (
                <div
                  key={item.k}
                  className="rounded-2xl bg-brand-50 px-3 py-2 sm:px-4 sm:py-3"
                >
                  <p className="text-[10px] uppercase tracking-[0.18em] text-brand-700/70">
                    {item.k}
                  </p>
                  <p className="mt-1 font-baby text-sm text-brand-900 sm:text-base">
                    {item.v}
                  </p>
                </div>
              ))}
            </motion.div>

            {/* Script tag */}
            <span
              aria-hidden
              className="font-script pointer-events-none absolute -right-2 -top-6 -rotate-6 select-none whitespace-nowrap text-5xl text-accent-500/70 sm:-right-6 sm:-top-8 sm:text-6xl"
            >
              since 2024
            </span>
          </motion.div>
        </div>

        {/* Vision card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="mt-24 overflow-hidden rounded-[2.5rem] bg-linear-to-br from-brand-50 via-white to-accent-200/60 px-8 py-12 shadow-sm ring-1 ring-border sm:px-14 sm:py-16"
        >
          <div className="grid items-center gap-10 lg:grid-cols-[0.45fr_0.55fr]">
            <div>
              <span className="text-[11px] font-semibold uppercase tracking-[0.32em] text-accent-600">
                Our vision
              </span>
              <h3 className="mt-3 font-baby text-3xl leading-tight text-brand-900 sm:text-4xl">
                Nigeria&apos;s most trusted home for premium baby & family
                skincare brands.
              </h3>
            </div>
            <p className="text-base leading-relaxed text-brand-900/75 sm:text-lg">
              We want every Nigerian parent to have easy, reliable access to
              dermatologist-approved, NAFDAC-compliant, internationally loved
              brands — and we want every global brand to have one professional
              partner who can take them there.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
