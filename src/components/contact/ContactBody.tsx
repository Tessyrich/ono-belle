"use client";

import { motion, useReducedMotion } from "motion/react";

type InfoItem = {
  no: string;
  label: string;
  value: string;
  href?: string;
  accent: "brand" | "accent" | "coral";
};

const info: InfoItem[] = [
  {
    no: "01",
    label: "Email",
    value: "onobelle@yahoo.co.uk",
    href: "mailto:onobelle@yahoo.co.uk",
    accent: "brand",
  },
  {
    no: "02",
    label: "Phone",
    value: "+234 813 303 5019",
    href: "tel:+2348133035019",
    accent: "accent",
  },
  {
    no: "03",
    label: "WhatsApp",
    value: "Chat with our team",
    href: "https://wa.me/2348133035019",
    accent: "coral",
  },
];

const accentClasses: Record<InfoItem["accent"], { badge: string; ring: string }> = {
  brand: { badge: "bg-brand-500 text-white", ring: "ring-brand-200" },
  accent: { badge: "bg-accent-400 text-brand-900", ring: "ring-accent-200" },
  coral: { badge: "bg-coral-500 text-white", ring: "ring-coral-100" },
};

export default function ContactBody() {
  const reduceMotion = useReducedMotion();

  return (
    <section id="message" className="relative overflow-hidden bg-background">
      <div className="relative mx-auto w-full max-w-6xl px-6 py-20 sm:py-28">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
          {/* LEFT — info column */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="space-y-8"
          >
            <div>
              <span className="text-[11px] font-semibold uppercase tracking-[0.32em] text-accent-600">
                Our office
              </span>
              <h2 className="mt-3 font-baby text-3xl uppercase leading-tight text-brand-900 sm:text-4xl">
                <span className="text-brand-900">Find us in </span>
                <span className="text-coral-600">Lagos.</span>
              </h2>
              <address className="mt-5 not-italic text-base leading-relaxed text-brand-900/75">
                ONO BELLE GLOBAL LIMITED
                <br />
                Legacy Place, 1st Floor
                <br />
                Tino Electronic Floor
                <br />
                3rd Roundabout, Lekki Expressway
                <br />
                Lagos State, Nigeria
              </address>
            </div>

            <div className="space-y-3">
              {info.map((item, idx) => {
                const accent = accentClasses[item.accent];
                const Tag = item.href ? "a" : "div";
                const tagProps: Record<string, unknown> = item.href
                  ? {
                      href: item.href,
                      ...(item.href.startsWith("http")
                        ? { target: "_blank", rel: "noreferrer noopener" }
                        : {}),
                    }
                  : {};

                return (
                  <motion.div
                    key={item.no}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.4 }}
                    transition={{
                      duration: 0.6,
                      delay: reduceMotion ? 0 : 0.1 + idx * 0.08,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                  >
                    <Tag
                      {...tagProps}
                      className="group flex items-center gap-4 rounded-3xl border border-border bg-surface p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-lg"
                    >
                      <div
                        className={`grid h-12 w-12 shrink-0 place-items-center rounded-2xl font-baby text-base shadow-md ring-4 ${accent.badge} ${accent.ring}`}
                      >
                        {item.no}
                      </div>
                      <div className="flex-1">
                        <p className="text-[10px] uppercase tracking-[0.22em] text-brand-700/70">
                          {item.label}
                        </p>
                        <p className="mt-1 font-baby text-lg text-brand-900 sm:text-xl">
                          {item.value}
                        </p>
                      </div>
                      <span className="text-brand-900/40 transition-transform group-hover:translate-x-1">
                        →
                      </span>
                    </Tag>
                  </motion.div>
                );
              })}
            </div>

            <div className="rounded-3xl bg-linear-to-br from-brand-50 via-white to-accent-200/40 p-5 ring-1 ring-border">
              <p className="font-baby text-lg text-brand-900">Office hours</p>
              <p className="mt-1 text-sm text-brand-900/75">
                Monday – Friday · 9:00 AM – 5:00 PM (WAT)
              </p>
            </div>
          </motion.div>

          {/* RIGHT — form */}
          <motion.form
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            action="mailto:onobelle@yahoo.co.uk"
            method="post"
            encType="text/plain"
            className="relative overflow-hidden rounded-[2.5rem] border border-border bg-surface p-6 shadow-sm sm:p-10"
          >
            {/* Decor blobs */}
            <div
              aria-hidden
              className="pointer-events-none absolute -top-20 -right-20 h-56 w-56 rounded-full bg-accent-200/40 blur-3xl"
            />
            <div
              aria-hidden
              className="pointer-events-none absolute -bottom-20 -left-20 h-56 w-56 rounded-full bg-coral-200/40 blur-3xl"
            />

            <div className="relative">
              <span className="text-[11px] font-semibold uppercase tracking-[0.32em] text-accent-600">
                Send us a message
              </span>
              <h3 className="mt-3 font-baby text-3xl uppercase leading-tight text-brand-900 sm:text-4xl">
                <span className="text-brand-900">We reply within </span>
                <span className="text-accent-600">two business days.</span>
              </h3>

              <div className="mt-8 grid gap-5">
                <FormField
                  id="name"
                  label="Full name"
                  type="text"
                  required
                />

                <div className="grid gap-5 sm:grid-cols-2">
                  <FormField id="email" label="Email" type="email" required />
                  <FormField id="company" label="Company" type="text" />
                </div>

                <div className="grid gap-2">
                  <label
                    htmlFor="interest"
                    className="text-[10px] font-semibold uppercase tracking-[0.22em] text-brand-700"
                  >
                    I&apos;m interested in
                  </label>
                  <select
                    id="interest"
                    name="interest"
                    className="rounded-2xl border border-border bg-background px-4 py-3.5 text-sm text-brand-900 outline-none transition-colors focus:border-brand-500 focus:ring-2 focus:ring-brand-200"
                    defaultValue=""
                  >
                    <option value="" disabled>
                      Select an option
                    </option>
                    <option value="brand-partnership">
                      Brand partnership / distribution
                    </option>
                    <option value="retail-stocking">
                      Stocking products as a retailer
                    </option>
                    <option value="hospital-pharmacy">
                      Hospital / pharmacy supply
                    </option>
                    <option value="general">General enquiry</option>
                  </select>
                </div>

                <div className="grid gap-2">
                  <label
                    htmlFor="message"
                    className="text-[10px] font-semibold uppercase tracking-[0.22em] text-brand-700"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    required
                    className="rounded-2xl border border-border bg-background px-4 py-3.5 text-sm text-brand-900 outline-none transition-colors focus:border-brand-500 focus:ring-2 focus:ring-brand-200"
                  />
                </div>

                <motion.button
                  whileHover={reduceMotion ? undefined : { y: -2 }}
                  whileTap={reduceMotion ? undefined : { scale: 0.98 }}
                  type="submit"
                  className="group mt-2 inline-flex items-center justify-center gap-3 rounded-full bg-coral-500 px-8 py-4 text-sm font-bold uppercase tracking-wide text-white shadow-xl transition-colors hover:bg-coral-600"
                >
                  Send message
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
                </motion.button>
              </div>
            </div>
          </motion.form>
        </div>
      </div>
    </section>
  );
}

function FormField({
  id,
  label,
  type,
  required,
}: {
  id: string;
  label: string;
  type: string;
  required?: boolean;
}) {
  return (
    <div className="grid gap-2">
      <label
        htmlFor={id}
        className="text-[10px] font-semibold uppercase tracking-[0.22em] text-brand-700"
      >
        {label}
      </label>
      <input
        id={id}
        name={id}
        type={type}
        required={required}
        className="rounded-2xl border border-border bg-background px-4 py-3.5 text-sm text-brand-900 outline-none transition-colors focus:border-brand-500 focus:ring-2 focus:ring-brand-200"
      />
    </div>
  );
}
