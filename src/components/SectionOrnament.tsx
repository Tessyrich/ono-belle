"use client";

import { motion, useReducedMotion } from "motion/react";

type Props = {
  variant?: "default" | "muted" | "dark";
};

export default function SectionOrnament({ variant = "default" }: Props) {
  const reduceMotion = useReducedMotion();

  const colors = {
    default: { bg: "bg-background", line: "bg-brand-300/60", dot: "bg-accent-500" },
    muted: { bg: "bg-muted/40", line: "bg-brand-300/60", dot: "bg-accent-500" },
    dark: { bg: "bg-brand-900", line: "bg-white/20", dot: "bg-accent-400" },
  }[variant];

  return (
    <div className={`flex w-full items-center justify-center py-8 ${colors.bg}`}>
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="flex items-center gap-3"
      >
        <span className={`h-px w-12 ${colors.line}`} />
        <motion.span
          aria-hidden
          animate={
            reduceMotion ? undefined : { rotate: [0, 360] }
          }
          transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
          className="text-base"
        >
          <svg
            viewBox="0 0 24 24"
            className={`h-2.5 w-2.5 ${variant === "dark" ? "text-accent-400" : "text-accent-500"}`}
            fill="currentColor"
          >
            <path d="M12 2l1.6 6.4L20 10l-6.4 1.6L12 18l-1.6-6.4L4 10l6.4-1.6z" />
          </svg>
        </motion.span>
        <span className={`block h-1.5 w-1.5 rounded-full ${colors.dot}`} />
        <motion.span
          aria-hidden
          animate={
            reduceMotion ? undefined : { rotate: [360, 0] }
          }
          transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
          className="text-base"
        >
          <svg
            viewBox="0 0 24 24"
            className={`h-2.5 w-2.5 ${variant === "dark" ? "text-accent-400" : "text-accent-500"}`}
            fill="currentColor"
          >
            <path d="M12 2l1.6 6.4L20 10l-6.4 1.6L12 18l-1.6-6.4L4 10l6.4-1.6z" />
          </svg>
        </motion.span>
        <span className={`h-px w-12 ${colors.line}`} />
      </motion.div>
    </div>
  );
}
