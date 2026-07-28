"use client";

import { useState, useTransition, type FormEvent } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "motion/react";
import { useAuth } from "@/context/auth";

type Props = {
  title: string;
  subtitle?: string;
  redirectFallback?: string;
};

export default function LoginForm({
  title,
  subtitle,
  redirectFallback = "/admin/dashboard",
}: Props) {
  const { login } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [pending, startTransition] = useTransition();
  const [submitting, setSubmitting] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    const result = await login(email, password);
    setSubmitting(false);
    if (!result.ok) {
      setError(result.error);
      return;
    }
    const redirect = searchParams.get("redirect") ?? redirectFallback;
    startTransition(() => {
      router.push(redirect);
    });
  };

  const busy = submitting || pending;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="w-full max-w-md"
    >
      <div className="border border-border bg-surface p-8 shadow-sm sm:p-10">
        <span className="text-[11px] font-semibold uppercase tracking-[0.32em] text-accent-600">
          Admin access
        </span>
        <h1 className="mt-3 font-display text-3xl text-brand-900 sm:text-4xl">
          {title}
        </h1>
        {subtitle && <p className="mt-2 text-sm text-brand-900/65">{subtitle}</p>}

        <form onSubmit={handleSubmit} className="mt-8 space-y-5">
          <div className="grid gap-2">
            <label
              htmlFor="email"
              className="text-[11px] font-semibold uppercase tracking-[0.22em] text-brand-700"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
              className="border border-border bg-background px-4 py-3 text-sm text-brand-900 outline-none transition-colors focus:border-brand-500"
            />
          </div>
          <div className="grid gap-2">
            <label
              htmlFor="password"
              className="text-[11px] font-semibold uppercase tracking-[0.22em] text-brand-700"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
              className="border border-border bg-background px-4 py-3 text-sm text-brand-900 outline-none transition-colors focus:border-brand-500"
            />
          </div>

          {error && (
            <p className="text-xs text-red-600" role="alert">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={busy}
            className="inline-flex w-full items-center justify-center gap-2 bg-coral-500 px-6 py-4 text-[11px] font-semibold uppercase tracking-[0.28em] text-white transition-colors hover:bg-coral-600 disabled:opacity-60"
          >
            {busy ? "Signing in…" : "Enter dashboard"}
            <span>→</span>
          </button>
        </form>
      </div>
    </motion.div>
  );
}
