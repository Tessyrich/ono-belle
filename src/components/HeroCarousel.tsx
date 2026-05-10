"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";

type Word = { text: string; color: "white" | "gold" };
type EntryDirection = "left" | "scale" | "right";
type ShapeKey = "arch" | "plain" | "leaf";

type Slide = {
  parts: Word[];
  description: string;
  ctaLabel: string;
  ctaHref: string;
  image: string;
  imageAlt: string;
  entry: EntryDirection;
  shape: ShapeKey;
};

const slides: Slide[] = [
  {
    parts: [
      { text: "Give Your ", color: "white" },
      { text: "Little One ", color: "gold" },
      { text: "The ", color: "white" },
      { text: "Best Care", color: "gold" },
    ],
    description:
      "Safe, gentle, dermatologist-approved baby skincare — curated for Nigerian homes.",
    ctaLabel: "Shop Now",
    ctaHref: "/brands",
    image:
      "/assets/hero1.jpg",
    imageAlt: "Mother gently cradling her baby",
    entry: "left",
    shape: "arch",
  },
  {
    parts: [
      { text: "Safe. ", color: "gold" },
      { text: "Gentle. ", color: "white" },
      { text: "Trusted By ", color: "white" },
      { text: "Nigerian Mothers.", color: "gold" },
    ],
    description:
      "Internationally certified, NAFDAC-registered baby & family care — delivered nationwide.",
    ctaLabel: "Explore Brands",
    ctaHref: "/brands",
    image:
      "/assets/hero2.jpg",
    imageAlt: "Newborn baby resting in a soft white towel",
    entry: "scale",
    shape: "plain",
  },
  {
    parts: [
      { text: "Premium ", color: "white" },
      { text: "Baby & Family ", color: "gold" },
      { text: "Care, ", color: "white" },
      { text: "At Your Door.", color: "gold" },
    ],
    description:
      "From global manufacturers to Nigerian shelves — one trusted partner for every parent.",
    ctaLabel: "Become a Partner",
    ctaHref: "/contact",
    image:
      "https://images.unsplash.com/photo-1546015720-b8b30df5aa27?auto=format&fit=crop&w=1400&q=85",
    imageAlt: "Tiny baby hand resting in an adult's palm",
    entry: "right",
    shape: "leaf",
  },
];

const AUTOPLAY_MS = 7000;

const entryVariants: Record<
  EntryDirection,
  {
    initial: Record<string, number>;
    exit: Record<string, number>;
  }
> = {
  left: {
    initial: { opacity: 0, x: -80, scale: 0.94, rotate: -2 },
    exit: { opacity: 0, x: 80, scale: 0.94, rotate: 2 },
  },
  scale: {
    initial: { opacity: 0, scale: 0.82, rotate: -3 },
    exit: { opacity: 0, scale: 0.92, rotate: 3 },
  },
  right: {
    initial: { opacity: 0, x: 80, scale: 0.94, rotate: 2 },
    exit: { opacity: 0, x: -80, scale: 0.94, rotate: -2 },
  },
};

// Each slide's image silhouette
const shapeStyles: Record<ShapeKey, { borderRadius: string; rotate: string }> = {
  // Slide 1: flat top, half-circle bottom (a dome facing down)
  arch: { borderRadius: "0% 0% 50% 50% / 0% 0% 50% 50%", rotate: "0deg" },
  // Slide 2: clean rectangle with very subtle rounding
  plain: { borderRadius: "8px", rotate: "0deg" },
  // Slide 3: organic leaf/blob — asymmetric corners + slight tilt
  leaf: {
    borderRadius: "55% 45% 55% 45% / 55% 55% 45% 45%",
    rotate: "-6deg",
  },
};

export default function HeroCarousel() {
  const reduceMotion = useReducedMotion();
  const [selected, setSelected] = useState(0);
  const [paused, setPaused] = useState(false);

  const goTo = useCallback((i: number) => {
    setSelected(((i % slides.length) + slides.length) % slides.length);
  }, []);
  const next = useCallback(
    () => setSelected((s) => (s + 1) % slides.length),
    [],
  );
  const prev = useCallback(
    () => setSelected((s) => (s - 1 + slides.length) % slides.length),
    [],
  );

  useEffect(() => {
    if (paused) return;
    const id = window.setInterval(next, AUTOPLAY_MS);
    return () => window.clearInterval(id);
  }, [next, paused, selected]);

  const slide = slides[selected];
  const variant = entryVariants[slide.entry];
  const shapeStyle = shapeStyles[slide.shape];

  return (
    <section
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      className="relative isolate w-full overflow-hidden bg-linear-to-r from-brand-500 via-brand-700 to-brand-900"
    >
      {/* Script watermark — anchored to the right, behind text */}
      <span
        aria-hidden
        className="font-script pointer-events-none absolute -right-12 top-1/2 z-0 -translate-y-1/2 -rotate-12 select-none whitespace-nowrap text-[15rem] leading-none text-white/8 sm:text-[20rem] lg:text-[26rem]"
      >
        Ono Belle
      </span>

      {/* Floating decoration dots */}
      <FloatingDecor reduceMotion={!!reduceMotion} />

      <div className="relative z-10 mx-auto grid w-full max-w-[1500px] grid-cols-1 items-center gap-8 px-6 py-12 sm:gap-10 sm:px-10 sm:py-16 lg:grid-cols-[1fr_2fr] lg:gap-12 lg:px-12 lg:py-24 xl:px-20">
        {/* LEFT — image (1/3) */}
        <div className="relative flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={selected}
              initial={
                reduceMotion
                  ? { opacity: 0 }
                  : {
                      ...variant.initial,
                      rotate: parseFloat(shapeStyle.rotate) - 4,
                    }
              }
              animate={{
                opacity: 1,
                x: 0,
                scale: 1,
                rotate: parseFloat(shapeStyle.rotate),
              }}
              exit={reduceMotion ? { opacity: 0 } : variant.exit}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              style={{
                borderRadius: shapeStyle.borderRadius,
              }}
              className="relative aspect-[4/5] w-[78%] max-w-[360px] overflow-hidden bg-brand-100 shadow-2xl ring-1 ring-white/30"
            >
              <Image
                src={slide.image}
                alt={slide.imageAlt}
                fill
                priority
                sizes="(max-width: 1024px) 70vw, 33vw"
                className="object-cover"
              />
            </motion.div>
          </AnimatePresence>

          {/* Soft sparkles around image */}
          <Sparkle
            className="absolute left-[6%] top-[12%] h-6 w-6 text-white/80"
            reduceMotion={!!reduceMotion}
            delay={0}
          />
          <Sparkle
            className="absolute right-[8%] bottom-[10%] h-7 w-7 text-accent-200"
            reduceMotion={!!reduceMotion}
            delay={1.5}
          />
        </div>

        {/* RIGHT — text (2/3) */}
        <div className="relative max-w-3xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={selected}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            >
              <h1 className="font-baby text-4xl uppercase leading-[1.05] sm:text-5xl lg:text-6xl xl:text-7xl">
                {slide.parts.map((part, i) => (
                  <span
                    key={i}
                    className={
                      part.color === "gold"
                        ? "text-accent-200"
                        : "text-white"
                    }
                  >
                    {part.text}
                  </span>
                ))}
              </h1>

              <p className="mt-6 max-w-md text-base text-white/85 sm:text-lg">
                {slide.description}
              </p>

              <div className="mt-9">
                <Link
                  href={slide.ctaHref}
                  className="group inline-flex items-center gap-3 rounded-full bg-accent-200 px-8 py-4 text-sm font-bold uppercase tracking-wide text-brand-900 shadow-xl transition-colors hover:bg-white"
                >
                  {slide.ctaLabel}
                  <span className="transition-transform group-hover:translate-x-1">
                    →
                  </span>
                </Link>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Controls */}
          <div className="mt-12 flex items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              {slides.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  aria-label={`Go to slide ${i + 1}`}
                  onClick={() => goTo(i)}
                  className="relative h-[3px] overflow-hidden bg-white/30 transition-all"
                  style={{ width: selected === i ? 56 : 22 }}
                >
                  <motion.span
                    key={`prog-${selected}-${i}-${paused}`}
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: selected === i ? 1 : 0 }}
                    transition={{
                      duration:
                        selected === i && !paused ? AUTOPLAY_MS / 1000 : 0,
                      ease: "linear",
                    }}
                    style={{ transformOrigin: "left" }}
                    className="absolute inset-0 bg-white"
                  />
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={prev}
                aria-label="Previous slide"
                className="grid h-11 w-11 place-items-center rounded-full border border-white/30 bg-white/10 text-white backdrop-blur transition-all hover:scale-105 hover:bg-white/20"
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
                onClick={next}
                aria-label="Next slide"
                className="grid h-11 w-11 place-items-center rounded-full border border-white/30 bg-white/10 text-white backdrop-blur transition-all hover:scale-105 hover:bg-white/20"
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
          </div>
        </div>
      </div>
    </section>
  );
}

function Sparkle({
  className,
  reduceMotion,
  delay = 0,
}: {
  className?: string;
  reduceMotion: boolean;
  delay?: number;
}) {
  return (
    <motion.svg
      aria-hidden
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      animate={
        reduceMotion
          ? undefined
          : { rotate: [0, 360], scale: [0.85, 1.1, 0.85] }
      }
      transition={{
        duration: 8 + delay,
        repeat: Infinity,
        ease: "easeInOut",
        delay,
      }}
    >
      <path d="M12 2l1.6 6.4L20 10l-6.4 1.6L12 18l-1.6-6.4L4 10l6.4-1.6z" />
    </motion.svg>
  );
}

function FloatingDecor({ reduceMotion }: { reduceMotion: boolean }) {
  const dots = [
    { size: 10, top: "12%", left: "6%", delay: 0 },
    { size: 16, top: "78%", left: "10%", delay: 1.2 },
    { size: 8, top: "40%", left: "44%", delay: 0.6 },
    { size: 12, top: "22%", right: "14%", delay: 1.6 },
    { size: 10, top: "70%", right: "20%", delay: 2.4 },
    { size: 18, top: "55%", right: "6%", delay: 0.8 },
  ];

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 z-0">
      {dots.map((d, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0.4 }}
          animate={
            reduceMotion
              ? undefined
              : {
                  y: [0, -10, 0, 10, 0],
                  opacity: [0.3, 0.55, 0.4, 0.6, 0.3],
                }
          }
          transition={{
            duration: 7 + (i % 3),
            repeat: Infinity,
            ease: "easeInOut",
            delay: d.delay,
          }}
          style={{
            width: d.size,
            height: d.size,
            top: d.top,
            left: d.left,
            right: d.right,
          }}
          className="absolute rounded-full bg-white/25"
        />
      ))}
    </div>
  );
}
