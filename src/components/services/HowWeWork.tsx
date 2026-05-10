"use client";

import { motion, useReducedMotion } from "motion/react";

type Shape = "polaroid-left" | "circle" | "polaroid-right" | "triangle" | "leaf";

type Step = {
  no: string;
  title: string;
  body: string;
  shape: Shape;
  color: "brand" | "accent" | "coral";
};

const steps: Step[] = [
  {
    no: "01",
    title: "Discovery",
    body: "We review your range, certifications, and target channels — and assess fit for the Nigerian market.",
    shape: "polaroid-left",
    color: "brand",
  },
  {
    no: "02",
    title: "Compliance",
    body: "NAFDAC product registration and any regulatory steps before importation.",
    shape: "circle",
    color: "accent",
  },
  {
    no: "03",
    title: "Importation",
    body: "Shipping, customs clearance, and warehousing into our Lagos-based distribution network.",
    shape: "polaroid-right",
    color: "coral",
  },
  {
    no: "04",
    title: "Distribution",
    body: "Commercial placement across pharmacies, hospitals, retailers and online marketplaces.",
    shape: "triangle",
    color: "brand",
  },
  {
    no: "05",
    title: "Activation",
    body: "Trade marketing, sampling, training and continuous brand-building inside Nigerian retail.",
    shape: "leaf",
    color: "accent",
  },
];

const colorMap = {
  brand: "bg-brand-600 text-white ring-brand-200",
  accent: "bg-accent-400 text-brand-900 ring-accent-200",
  coral: "bg-coral-500 text-white ring-coral-100",
};

export default function HowWeWork() {
  const reduceMotion = useReducedMotion();

  return (
    <section id="process" className="relative overflow-hidden bg-muted/40">
      <div className="relative mx-auto w-full max-w-6xl px-6 py-20 sm:py-28">
        {/* Soft script watermark */}
        <span
          aria-hidden
          className="font-script pointer-events-none absolute -top-4 left-1/2 -translate-x-1/2 select-none whitespace-nowrap text-[7rem] leading-none text-brand-700/8 sm:text-[10rem]"
        >
          How we work
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
            How we work
          </span>
          <h2 className="mt-3 font-baby text-3xl uppercase text-brand-900 sm:text-4xl lg:text-5xl">
            From global brand to Nigerian shelves
            <br className="hidden sm:block" /> in five structured steps.
          </h2>
        </motion.div>

        {/* Connecting dashed wave (desktop) */}
        <svg
          aria-hidden
          viewBox="0 0 1200 240"
          preserveAspectRatio="none"
          className="pointer-events-none absolute inset-x-0 top-[50%] hidden h-48 w-full lg:block"
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

        {/* 5-step grid */}
        <div className="relative grid grid-cols-1 gap-14 sm:grid-cols-2 sm:gap-x-10 sm:gap-y-16 lg:grid-cols-5 lg:gap-x-6">
          {steps.map((step, idx) => (
            <StepCard
              key={step.no}
              step={step}
              index={idx}
              reduceMotion={!!reduceMotion}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function StepCard({
  step,
  index,
  reduceMotion,
}: {
  step: Step;
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
        delay: reduceMotion ? 0 : index * 0.1,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="relative flex flex-col items-center text-center"
    >
      <ShapeBadge shape={step.shape} no={step.no} color={step.color} />

      <h3 className="mt-6 font-baby text-2xl text-brand-900 sm:text-3xl">
        {step.title}
      </h3>
      <p className="mt-3 max-w-[24ch] text-sm leading-relaxed text-brand-900/70">
        {step.body}
      </p>
    </motion.article>
  );
}

function ShapeBadge({
  shape,
  no,
  color,
}: {
  shape: Shape;
  no: string;
  color: Step["color"];
}) {
  const size = "h-32 w-32 sm:h-36 sm:w-36";
  const colors = colorMap[color];

  const numberEl = (
    <span className="font-baby text-3xl sm:text-4xl">{no}</span>
  );

  if (shape === "polaroid-left" || shape === "polaroid-right") {
    const tilt = shape === "polaroid-left" ? "-rotate-6" : "rotate-6";
    return (
      <div className={`relative mx-auto ${size}`}>
        <div
          className={`absolute inset-0 origin-center ${tilt} bg-white p-2 shadow-lg`}
          style={{ borderRadius: "4px" }}
        >
          <div
            className={`grid h-full w-full place-items-center ${colors}`}
            style={{ borderRadius: "2px" }}
          >
            {numberEl}
          </div>
        </div>
      </div>
    );
  }

  if (shape === "circle") {
    return (
      <div className={`relative mx-auto ${size}`}>
        <div
          className={`grid h-full w-full place-items-center rounded-full shadow-lg ring-4 ${colors}`}
        >
          {numberEl}
        </div>
      </div>
    );
  }

  if (shape === "triangle") {
    return (
      <div className={`relative mx-auto ${size}`}>
        <div
          className={`grid h-full w-full place-items-end justify-center pb-4 shadow-lg ${colors.replace("ring-", "")}`}
          style={{
            clipPath: "polygon(50% 0%, 100% 100%, 0% 100%)",
          }}
        >
          {numberEl}
        </div>
      </div>
    );
  }

  // leaf
  return (
    <div className={`relative mx-auto ${size}`}>
      <div
        className={`grid h-full w-full -rotate-6 place-items-center shadow-lg ring-4 ${colors}`}
        style={{
          borderRadius: "55% 45% 55% 45% / 55% 55% 45% 45%",
        }}
      >
        <span className="rotate-6 font-baby text-3xl sm:text-4xl">{no}</span>
      </div>
    </div>
  );
}
