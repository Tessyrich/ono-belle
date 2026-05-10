"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";

export default function ServicesHero() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="relative isolate w-full overflow-hidden bg-linear-to-r from-brand-500 via-brand-700 to-brand-900">
      {/* Script watermark */}
      <span
        aria-hidden
        className="font-script pointer-events-none absolute -right-12 top-1/2 z-0 -translate-y-1/2 -rotate-12 select-none whitespace-nowrap text-[14rem] leading-none text-white/8 sm:text-[18rem] lg:text-[24rem]"
      >
        Services
      </span>

      {/* Floating dots */}
      <div className="pointer-events-none absolute inset-0 z-0">
        <motion.span
          aria-hidden
          animate={reduceMotion ? undefined : { y: [0, -10, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
          className="absolute left-[8%] top-[20%] h-3 w-3 rounded-full bg-white/30"
        />
        <motion.span
          aria-hidden
          animate={reduceMotion ? undefined : { y: [0, 10, 0] }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1.5,
          }}
          className="absolute right-[18%] top-[28%] h-4 w-4 rounded-full bg-accent-200/60"
        />
        <motion.span
          aria-hidden
          animate={reduceMotion ? undefined : { y: [0, -6, 0] }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.8,
          }}
          className="absolute bottom-[18%] left-[20%] h-2.5 w-2.5 rounded-full bg-white/40"
        />
      </div>

      <div className="relative z-10 mx-auto grid w-full max-w-[1500px] grid-cols-1 items-center gap-10 px-6 py-16 sm:gap-12 sm:px-10 sm:py-20 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16 lg:px-12 lg:py-28 xl:px-20">
        {/* LEFT — text */}
        <div className="relative max-w-2xl">
          <motion.span
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.6,
              delay: 0.1,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="inline-flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.32em] text-accent-200"
          >
            <span className="h-px w-10 bg-accent-200" />
            Our services
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.9,
              delay: 0.2,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="mt-5 font-baby text-4xl uppercase leading-[1.05] text-white sm:text-5xl lg:text-6xl xl:text-7xl"
          >
            <span className="text-white">Brand </span>
            <span className="text-accent-200">Import </span>
            <span className="text-white">& </span>
            <span className="text-accent-200">Distribution, </span>
            <span className="text-white">End-To-End.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.8,
              delay: 0.3,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="mt-6 max-w-lg text-base text-white/85 sm:text-lg"
          >
            We provide full commercial support for international baby & family
            brands entering Nigeria. Not just a reseller — your local commercial
            partner.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.8,
              delay: 0.4,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="mt-9 flex flex-wrap items-center gap-5"
          >
            <Link
              href="/contact"
              className="group inline-flex items-center gap-3 rounded-full bg-accent-200 px-8 py-4 text-sm font-bold uppercase tracking-wide text-brand-900 shadow-xl transition-colors hover:bg-white"
            >
              Become a Partner
              <span className="transition-transform group-hover:translate-x-1">
                →
              </span>
            </Link>
            <Link
              href="#process"
              className="text-[11px] font-semibold uppercase tracking-[0.28em] text-white/85 underline-offset-8 transition-colors hover:text-white hover:underline"
            >
              See how we work
            </Link>
          </motion.div>
        </div>

        {/* RIGHT — image */}
        <div className="relative flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9, rotate: -4 }}
            animate={{ opacity: 1, scale: 1, rotate: -3 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="relative aspect-[4/5] w-[80%] max-w-[420px] overflow-hidden bg-brand-100 shadow-2xl ring-2 ring-white/30"
            style={{
              borderRadius: "55% 45% 55% 45% / 55% 55% 45% 45%",
            }}
          >
            <Image
              src="/assets/hero1.jpg"
              alt="Baby & family skincare brand distribution"
              fill
              priority
              sizes="(max-width: 1024px) 80vw, 40vw"
              className="object-cover"
            />
          </motion.div>

          {/* Sparkles */}
          <motion.svg
            aria-hidden
            viewBox="0 0 24 24"
            fill="currentColor"
            animate={
              reduceMotion ? undefined : { rotate: [0, 360], scale: [0.85, 1.1, 0.85] }
            }
            transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -left-2 top-[18%] h-7 w-7 text-accent-200"
          >
            <path d="M12 2l1.6 6.4L20 10l-6.4 1.6L12 18l-1.6-6.4L4 10l6.4-1.6z" />
          </motion.svg>
          <motion.svg
            aria-hidden
            viewBox="0 0 24 24"
            fill="currentColor"
            animate={
              reduceMotion ? undefined : { rotate: [360, 0], scale: [0.9, 1.05, 0.9] }
            }
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1.5,
            }}
            className="absolute -right-2 bottom-[14%] h-8 w-8 text-white/80"
          >
            <path d="M12 2l1.6 6.4L20 10l-6.4 1.6L12 18l-1.6-6.4L4 10l6.4-1.6z" />
          </motion.svg>
        </div>
      </div>
    </section>
  );
}
