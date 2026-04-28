"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";

import logoMark from "../../public/assets/logo1.jpg.jpeg";

type Slide = {
  eyebrow: string;
  title: string;
  description: string;
  ctaLabel: string;
  ctaHref: string;
  pill: string;
  notification: { title: string; meta: string };
};

const slides: Slide[] = [
  {
    eyebrow: "Premium Distribution",
    title: "Baby & Family Skincare for Nigerian Homes.",
    description:
      "We bring internationally certified, dermatologist-approved brands into Nigerian pharmacies, hospitals and homes — with full NAFDAC compliance.",
    ctaLabel: "Become a partner",
    ctaHref: "/contact",
    pill: "Lagos · Nigeria",
    notification: {
      title: "NAFDAC registered supply",
      meta: "Compliant import & distribution",
    },
  },
  {
    eyebrow: "Gentle by Design",
    title: "Carefully Selected. Clinically Trusted.",
    description:
      "Organic, vegan and dermatologist-tested ranges — chosen for the safety expectations of pharmacies, hospitals and Nigerian parents.",
    ctaLabel: "Explore brands",
    ctaHref: "/brands",
    pill: "Dermatologist tested",
    notification: {
      title: "Curated brand portfolio",
      meta: "6 focus categories",
    },
  },
  {
    eyebrow: "For Retail Partners",
    title: "Stock Brands Parents Already Ask For.",
    description:
      "Direct supply to pharmacies, hospitals, baby boutiques and online marketplaces — backed by structured trade marketing.",
    ctaLabel: "Talk to our team",
    ctaHref: "/contact",
    pill: "Modern & traditional trade",
    notification: {
      title: "Nationwide distribution",
      meta: "5+ channels · 36 states",
    },
  },
];

export default function HeroCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, duration: 30 });
  const [selected, setSelected] = useState(0);
  const reduceMotion = useReducedMotion();

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);
  const scrollTo = useCallback(
    (i: number) => emblaApi?.scrollTo(i),
    [emblaApi],
  );

  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setSelected(emblaApi.selectedScrollSnap());
    onSelect();
    emblaApi.on("select", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    const id = window.setInterval(() => emblaApi.scrollNext(), 7000);
    return () => window.clearInterval(id);
  }, [emblaApi]);

  return (
    <section className="relative isolate bg-background">
      {/* Sage panel — bleeds to left edge of viewport, ends ~middle */}
      <div
        aria-hidden
        className="absolute inset-y-0 left-0 right-0 lg:right-[42%] bg-brand-200/55"
      />

      <div className="relative mx-auto w-full max-w-6xl px-6 py-14 sm:py-20 lg:py-24">
        <div ref={emblaRef} className="overflow-hidden">
          <div className="flex">
            {slides.map((slide, idx) => (
              <div
                key={slide.title}
                className="relative min-w-0 flex-[0_0_100%]"
              >
                <div className="grid items-center gap-10 lg:grid-cols-[0.95fr_1fr] lg:gap-14">
                  {/* Visual panel */}
                  <div className="relative">
                    <motion.div
                      initial={false}
                      animate={
                        selected === idx
                          ? { opacity: 1, scale: 1 }
                          : { opacity: 0.55, scale: reduceMotion ? 1 : 0.98 }
                      }
                      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                      className="relative mx-auto aspect-[5/6] w-full max-w-md overflow-hidden rounded-sm bg-white shadow-2xl ring-1 ring-border/60"
                    >
                      {/* subtle inner gradient */}
                      <div
                        aria-hidden
                        className="absolute inset-0 bg-linear-to-br from-brand-50 via-background to-accent-100"
                      />

                      {/* logo gently breathing */}
                      <motion.div
                        animate={
                          reduceMotion
                            ? undefined
                            : { y: [0, -8, 0], scale: [1, 1.02, 1] }
                        }
                        transition={{
                          duration: 7,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                        className="absolute inset-0 grid place-items-center"
                      >
                        <Image
                          src={logoMark}
                          alt="Ono Belle"
                          priority={idx === 0}
                          className="h-auto w-[62%] max-w-[300px] mix-blend-multiply"
                          style={{ width: "min(60%, 300px)" }}
                        />
                      </motion.div>

                      {/* soft drop accents */}
                      <motion.div
                        aria-hidden
                        animate={reduceMotion ? undefined : { y: [0, 10, 0] }}
                        transition={{
                          duration: 8,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                        className="absolute right-8 top-12 h-3 w-3 rounded-full bg-brand-300/70"
                      />
                      <motion.div
                        aria-hidden
                        animate={reduceMotion ? undefined : { y: [0, -8, 0] }}
                        transition={{
                          duration: 6,
                          repeat: Infinity,
                          ease: "easeInOut",
                          delay: 1,
                        }}
                        className="absolute right-16 top-20 h-2 w-2 rounded-full bg-brand-300/50"
                      />
                      <motion.div
                        aria-hidden
                        animate={reduceMotion ? undefined : { y: [0, 6, 0] }}
                        transition={{
                          duration: 7,
                          repeat: Infinity,
                          ease: "easeInOut",
                          delay: 0.5,
                        }}
                        className="absolute left-10 bottom-16 h-2.5 w-2.5 rounded-full bg-accent-400/60"
                      />

                      {/* corner pill */}
                      <span className="absolute left-5 top-5 rounded-full bg-white/90 px-3 py-1 text-[10px] font-medium uppercase tracking-[0.22em] text-brand-700 shadow-sm">
                        {slide.pill}
                      </span>
                    </motion.div>

                    {/* Floating notification */}
                    <AnimatePresence mode="wait">
                      {selected === idx && (
                        <motion.div
                          key={`notif-${idx}`}
                          initial={{ opacity: 0, x: -30, y: 20 }}
                          animate={{ opacity: 1, x: 0, y: 0 }}
                          exit={{ opacity: 0, x: -16 }}
                          transition={{
                            delay: 0.35,
                            duration: 0.6,
                            ease: [0.22, 1, 0.36, 1],
                          }}
                          className="absolute -bottom-5 -left-3 flex max-w-[18rem] items-center gap-3 rounded-sm border border-border bg-white p-3.5 shadow-xl sm:-left-6"
                        >
                          <div className="grid h-9 w-9 shrink-0 place-items-center rounded-sm bg-brand-50 text-brand-700">
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
                                d="M5 13l4 4L19 7"
                              />
                            </svg>
                          </div>
                          <div className="min-w-0">
                            <p className="text-[10px] uppercase tracking-[0.18em] text-brand-700/70">
                              {slide.notification.meta}
                            </p>
                            <p className="truncate text-sm font-semibold text-brand-900">
                              {slide.notification.title}
                            </p>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Copy panel */}
                  <div className="relative">
                    <AnimatePresence mode="wait">
                      {selected === idx && (
                        <motion.div
                          key={`copy-${idx}`}
                          initial={{ opacity: 0, y: 24 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -16 }}
                          transition={{
                            duration: 0.7,
                            ease: [0.22, 1, 0.36, 1],
                          }}
                        >
                          <span className="text-[11px] font-semibold uppercase tracking-[0.32em] text-accent-600">
                            {slide.eyebrow}
                          </span>

                          <h1 className="mt-5 font-serif text-4xl leading-[1.08] text-brand-900 sm:text-5xl lg:text-6xl">
                            {slide.title}
                          </h1>

                          <p className="mt-6 max-w-md text-base text-brand-900/70 sm:text-[17px]">
                            {slide.description}
                          </p>

                          <div className="mt-10">
                            <Link
                              href={slide.ctaHref}
                              className="group inline-flex items-center gap-3 bg-brand-900 px-8 py-4 text-[11px] font-semibold uppercase tracking-[0.28em] text-white transition-colors hover:bg-brand-700"
                            >
                              {slide.ctaLabel}
                              <span className="transition-transform group-hover:translate-x-1">
                                →
                              </span>
                            </Link>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Arrows */}
        <div className="pointer-events-none absolute inset-y-0 left-2 right-2 hidden items-center justify-between lg:flex">
          <button
            type="button"
            onClick={scrollPrev}
            aria-label="Previous slide"
            className="pointer-events-auto grid h-11 w-11 place-items-center rounded-full bg-brand-900 text-white shadow-md transition-transform hover:scale-110"
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
                d="M15 6l-6 6 6 6"
              />
            </svg>
          </button>
          <button
            type="button"
            onClick={scrollNext}
            aria-label="Next slide"
            className="pointer-events-auto grid h-11 w-11 place-items-center rounded-full bg-brand-900 text-white shadow-md transition-transform hover:scale-110"
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
                d="M9 6l6 6-6 6"
              />
            </svg>
          </button>
        </div>

        {/* Dots */}
        <div className="mt-12 flex items-center justify-center gap-3">
          {slides.map((s, i) => (
            <button
              key={s.title}
              type="button"
              aria-label={`Go to slide ${i + 1}`}
              onClick={() => scrollTo(i)}
              className="relative h-[3px] overflow-hidden bg-brand-300/50 transition-all"
              style={{ width: selected === i ? 44 : 18 }}
            >
              <span
                className={`absolute inset-0 origin-left bg-brand-900 transition-transform duration-700 ${
                  selected === i ? "scale-x-100" : "scale-x-0"
                }`}
              />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
