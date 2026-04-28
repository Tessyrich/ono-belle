"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";

const faqs = [
  {
    q: "Are you NAFDAC registered?",
    a: "Yes. We handle full NAFDAC product registration and ongoing compliance for every brand we represent. No product reaches a Nigerian shelf without it.",
  },
  {
    q: "Who handles import duties and customs?",
    a: "We do — end-to-end. Freight, customs documentation, port clearance and delivery into bonded warehousing are all coordinated by our Lagos team.",
  },
  {
    q: "What channels do you cover?",
    a: "Pharmacy chains, independent pharmacies, hospitals and clinics, baby boutiques, modern-trade supermarkets, and Nigeria's leading e-commerce marketplaces.",
  },
  {
    q: "What's a typical lead time from agreement to first shipment?",
    a: "It varies by product category, but a structured product range can typically reach Nigerian shelves within 8–14 weeks of signing — including NAFDAC clearance.",
  },
  {
    q: "Do you take exclusive distribution rights?",
    a: "We work both ways. For most premium brands we take exclusivity to invest properly in trade marketing and category building. We're happy to discuss the right structure for your range.",
  },
  {
    q: "Can pharmacies and hospitals stock your brands directly?",
    a: "Yes. Retailers, pharmacies and clinical buyers can contact us directly through the contact form to discuss listing and supply terms.",
  },
];

export default function FAQ() {
  const reduceMotion = useReducedMotion();
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="bg-muted/40">
      <div className="mx-auto w-full max-w-5xl px-6 py-20 sm:py-28">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mb-12 max-w-2xl"
        >
          <span className="text-[11px] font-semibold uppercase tracking-[0.32em] text-accent-600">
            Frequently asked
          </span>
          <h2 className="mt-3 font-serif text-3xl text-brand-900 sm:text-5xl">
            The questions brand owners ask us first.
          </h2>
        </motion.div>

        <ul className="border-t border-brand-900/15">
          {faqs.map((faq, idx) => {
            const isOpen = open === idx;
            return (
              <motion.li
                key={faq.q}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{
                  duration: 0.6,
                  delay: reduceMotion ? 0 : idx * 0.05,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="border-b border-brand-900/15"
              >
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : idx)}
                  aria-expanded={isOpen}
                  className="group flex w-full items-center justify-between gap-6 py-6 text-left transition-colors hover:text-brand-700"
                >
                  <span className="font-serif text-lg text-brand-900 sm:text-xl">
                    {faq.q}
                  </span>
                  <motion.span
                    animate={{ rotate: isOpen ? 45 : 0 }}
                    transition={{
                      duration: 0.35,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    aria-hidden
                    className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-brand-900/20 text-brand-900 transition-colors group-hover:border-brand-700 group-hover:text-brand-700"
                  >
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                      className="h-4 w-4"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 5v14M5 12h14"
                      />
                    </svg>
                  </motion.span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="content"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{
                        duration: 0.45,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                      className="overflow-hidden"
                    >
                      <p className="max-w-2xl pb-6 pr-12 text-base leading-relaxed text-brand-900/70">
                        {faq.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
