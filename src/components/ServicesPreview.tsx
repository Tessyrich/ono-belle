"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";

type Shape = "polaroid-left" | "circle" | "polaroid-right" | "triangle";

type Feature = {
  title: string;
  body: string;
  image: string;
  imageAlt: string;
  shape: Shape;
};

const features: Feature[] = [
  {
    title: "NAFDAC Approved",
    body: "Every brand we represent is fully registered with NAFDAC — only safe, compliant baby & family care reaches Nigerian shelves.",
    image:
      "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=900&q=85",
    imageAlt: "Clean skincare arrangement",
    shape: "polaroid-left",
  },
  {
    title: "Dermatologist Tested",
    body: "We curate clinically-reviewed products that meet the safety expectations of paediatricians, pharmacies and hospitals.",
    image:
      "https://images.unsplash.com/photo-1530229540764-0a06aaa6b8cd?auto=format&fit=crop&w=900&q=85",
    imageAlt: "Newborn baby resting in a soft towel",
    shape: "circle",
  },
  {
    title: "Nationwide Delivery",
    body: "Lagos to Kano — our structured distribution network gets premium baby care to your door, fast and tracked.",
    image:
      "https://images.unsplash.com/photo-1607619056574-7b8d3ee536b2?auto=format&fit=crop&w=900&q=85",
    imageAlt: "Curated product packaging arrangement",
    shape: "polaroid-right",
  },
  {
    title: "Family Pricing",
    body: "Premium imports without the premium markup — we believe gentle, world-class baby care should reach every Nigerian home.",
    image:
      "https://images.unsplash.com/photo-1611080626919-7cf5a9dbab5b?auto=format&fit=crop&w=900&q=85",
    imageAlt: "Natural botanical baby product",
    shape: "triangle",
  },
];

export default function ServicesPreview() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="relative overflow-hidden bg-background">
      <div className="relative mx-auto w-full max-w-6xl px-6 py-20 sm:py-28">
        {/* Soft script watermark behind everything */}
        <span
          aria-hidden
          className="font-script pointer-events-none absolute -top-6 left-1/2 -translate-x-1/2 select-none whitespace-nowrap text-[7rem] leading-none text-brand-700/8 sm:text-[10rem]"
        >
          Ono Belle
        </span>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="relative mx-auto mb-20 max-w-3xl text-center"
        >
          <span className="text-[11px] font-semibold uppercase tracking-[0.32em] text-accent-600">
            What we do
          </span>
          <h2 className="mt-3 font-baby text-3xl uppercase text-brand-900 sm:text-4xl lg:text-5xl">
            Built with the well-being of your babies
            <br className="hidden sm:block" /> and kids of all ages in mind.
          </h2>
        </motion.div>

        {/* Connecting dashed wave (desktop only) */}
        <svg
          aria-hidden
          viewBox="0 0 1200 240"
          preserveAspectRatio="none"
          className="pointer-events-none absolute inset-x-0 top-[55%] hidden h-44 w-full lg:block"
        >
          <motion.path
            d="M 60 140 Q 200 30 360 140 T 660 140 T 960 140 T 1140 140"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeDasharray="6 10"
            fill="none"
            className="text-brand-300/60"
            initial={{ pathLength: 0, opacity: 0 }}
            whileInView={{ pathLength: 1, opacity: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 1.8, ease: [0.22, 1, 0.36, 1] }}
          />
        </svg>

        {/* 4-feature grid */}
        <div className="relative grid grid-cols-1 gap-14 sm:grid-cols-2 sm:gap-x-10 sm:gap-y-16 lg:grid-cols-4 lg:gap-x-6">
          {features.map((feature, idx) => (
            <FeatureCard
              key={feature.title}
              feature={feature}
              index={idx}
              reduceMotion={!!reduceMotion}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function FeatureCard({
  feature,
  index,
  reduceMotion,
}: {
  feature: Feature;
  index: number;
  reduceMotion: boolean;
}) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{
        duration: 0.7,
        delay: reduceMotion ? 0 : index * 0.12,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="relative flex flex-col items-center text-center"
    >
      <ShapedImage feature={feature} />

      <h3 className="mt-6 font-baby text-2xl text-brand-900 sm:text-3xl">
        {feature.title}
      </h3>
      <p className="mt-3 max-w-[28ch] text-sm leading-relaxed text-brand-900/70">
        {feature.body}
      </p>
    </motion.article>
  );
}

function ShapedImage({ feature }: { feature: Feature }) {
  const size = "h-44 w-44 sm:h-48 sm:w-48";

  if (feature.shape === "polaroid-left" || feature.shape === "polaroid-right") {
    const tilt =
      feature.shape === "polaroid-left" ? "-rotate-6" : "rotate-6";
    return (
      <div className={`relative mx-auto ${size}`}>
        <div
          className={`absolute inset-0 origin-center ${tilt} bg-white p-2 shadow-xl`}
          style={{ borderRadius: "4px" }}
        >
          <div className="relative h-full w-full overflow-hidden">
            <Image
              src={feature.image}
              alt={feature.imageAlt}
              fill
              sizes="200px"
              className="object-cover"
            />
          </div>
        </div>
      </div>
    );
  }

  if (feature.shape === "circle") {
    return (
      <div className={`relative mx-auto ${size}`}>
        <div className="absolute inset-0 overflow-hidden rounded-full shadow-xl ring-4 ring-brand-100">
          <Image
            src={feature.image}
            alt={feature.imageAlt}
            fill
            sizes="200px"
            className="object-cover"
          />
        </div>
      </div>
    );
  }

  // triangle
  return (
    <div className={`relative mx-auto ${size}`}>
      <div
        className="absolute inset-0 overflow-hidden shadow-xl"
        style={{
          clipPath: "polygon(50% 0%, 100% 100%, 0% 100%)",
        }}
      >
        <Image
          src={feature.image}
          alt={feature.imageAlt}
          fill
          sizes="200px"
          className="object-cover"
        />
      </div>
    </div>
  );
}
