"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";

export default function NewsletterSignup() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (!email.trim()) return;
        setSubmitted(true);
      }}
      className="mt-5 flex flex-col gap-2 sm:flex-row"
    >
      <AnimatePresence mode="wait">
        {!submitted ? (
          <motion.div
            key="form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="flex w-full flex-col gap-2 sm:flex-row"
          >
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@brand.com"
              aria-label="Email address"
              className="flex-1 border border-white/15 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/40 outline-none transition-colors focus:border-accent-400"
            />
            <button
              type="submit"
              className="bg-accent-400 px-5 py-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-brand-900 transition-colors hover:bg-accent-200"
            >
              Subscribe
            </button>
          </motion.div>
        ) : (
          <motion.p
            key="thanks"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="text-sm text-accent-200"
          >
            Thanks — we&apos;ll keep you posted.
          </motion.p>
        )}
      </AnimatePresence>
    </form>
  );
}
