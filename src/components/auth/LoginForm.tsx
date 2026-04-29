"use client";

import { useState, useTransition, type FormEvent } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "motion/react";
import { useAuth, type Role } from "@/context/auth";

type Props = {
  role?: Role;
  title: string;
  subtitle?: string;
  redirectFallback?: string;
};

export default function LoginForm({
  role = "customer",
  title,
  subtitle,
  redirectFallback = "/",
}: Props) {
  const { login } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [pending, startTransition] = useTransition();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const isAdmin = role === "admin";

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    const result = login(email, password, role);
    if (!result.ok) {
      setError(result.error);
      return;
    }
    const redirect =
      searchParams.get("redirect") ??
      (isAdmin ? "/admin/dashboard" : redirectFallback);
    startTransition(() => {
      router.push(redirect);
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="w-full max-w-md"
    >
      <div className="border border-border bg-surface p-8 shadow-sm sm:p-10">
        <span className="text-[11px] font-semibold uppercase tracking-[0.32em] text-accent-600">
          {isAdmin ? "Admin access" : "Welcome back"}
        </span>
        <h1 className="mt-3 font-serif text-3xl text-brand-900 sm:text-4xl">
          {title}
        </h1>
        {subtitle && (
          <p className="mt-2 text-sm text-brand-900/65">{subtitle}</p>
        )}

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
              autoComplete={isAdmin ? "current-password" : "current-password"}
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
            disabled={pending}
            className="inline-flex w-full items-center justify-center gap-2 bg-brand-900 px-6 py-4 text-[11px] font-semibold uppercase tracking-[0.28em] text-white transition-colors hover:bg-brand-700 disabled:opacity-60"
          >
            {pending ? "Signing in…" : isAdmin ? "Enter dashboard" : "Sign in"}
            <span>→</span>
          </button>
        </form>

        {!isAdmin && (
          <div className="mt-8 space-y-3 border-t border-border pt-6 text-sm text-brand-900/70">
            <p>
              Don&apos;t have an account yet?{" "}
              <Link
                href="/register"
                className="font-semibold text-brand-900 hover:text-brand-700"
              >
                Create one
              </Link>
              .
            </p>
            <p className="text-xs text-brand-900/50">
              Are you the site administrator?{" "}
              <Link
                href="/admin/login"
                className="text-brand-700 hover:text-brand-900"
              >
                Admin login →
              </Link>
            </p>
          </div>
        )}

        {isAdmin && (
          <p className="mt-8 border-t border-border pt-6 text-xs text-brand-900/55">
            Looking for the customer login?{" "}
            <Link
              href="/login"
              className="font-semibold text-brand-900 hover:text-brand-700"
            >
              Sign in here
            </Link>
            .
          </p>
        )}
      </div>
    </motion.div>
  );
}
