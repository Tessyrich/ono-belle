"use client";

import { motion, useReducedMotion } from "motion/react";

const quote = {
  author: "Ono Belle Global Limited",
  role: "Brand & Distribution",
};

export default function Testimonial() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="bg-background">
      <div className="mx-auto w-full max-w-5xl px-6 py-20 sm:py-28">
        <motion.figure
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="relative mx-auto max-w-3xl text-center"
        >
          {/* Big serif quotation mark */}
          <motion.span
            aria-hidden
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="block font-serif text-[8rem] leading-none text-accent-500/40 sm:text-[10rem]"
          >
            &ldquo;
          </motion.span>

          <blockquote className="-mt-10 font-serif text-2xl leading-snug text-brand-900 sm:text-3xl lg:text-4xl">
            International brand owners need one professional partner in Nigeria
            — for compliance, distribution, and trade marketing. That single
            point of contact is what we&apos;ve built Ono Belle to be.
          </blockquote>

          <motion.figcaption
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{
              duration: 0.7,
              delay: reduceMotion ? 0 : 0.2,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="mt-10 flex items-center justify-center gap-3"
          >
            <span className="h-px w-10 bg-brand-300" />
            <span className="text-[10px] font-semibold uppercase tracking-[0.32em] text-brand-700">
              {quote.author}
            </span>
            <span className="h-px w-10 bg-brand-300" />
          </motion.figcaption>
          <p className="mt-2 text-xs text-brand-700/60">{quote.role}</p>
        </motion.figure>
      </div>
    </section>
  );
}
