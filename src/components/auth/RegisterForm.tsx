"use client";

import { useState, useTransition, type FormEvent } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "motion/react";
import { useAuth } from "@/context/auth";

export default function RegisterForm() {
  const { register } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [pending, startTransition] = useTransition();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    const result = register(name, email, password);
    if (!result.ok) {
      setError(result.error);
      return;
    }
    const redirect = searchParams.get("redirect") ?? "/";
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
          Create your account
        </span>
        <h1 className="mt-3 font-serif text-3xl text-brand-900 sm:text-4xl">
          Join Ono Belle.
        </h1>
        <p className="mt-2 text-sm text-brand-900/65">
          Build your wishlist, save addresses, and check out faster.
        </p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-5">
          <div className="grid gap-2">
            <label
              htmlFor="name"
              className="text-[11px] font-semibold uppercase tracking-[0.22em] text-brand-700"
            >
              Full name
            </label>
            <input
              id="name"
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              autoComplete="name"
              className="border border-border bg-background px-4 py-3 text-sm text-brand-900 outline-none transition-colors focus:border-brand-500"
            />
          </div>
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
              minLength={6}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="new-password"
              className="border border-border bg-background px-4 py-3 text-sm text-brand-900 outline-none transition-colors focus:border-brand-500"
            />
            <p className="text-[11px] text-brand-900/50">
              Minimum 6 characters.
            </p>
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
            {pending ? "Creating account…" : "Create account"}
            <span>→</span>
          </button>
        </form>

        <p className="mt-8 border-t border-border pt-6 text-sm text-brand-900/70">
          Already have an account?{" "}
          <Link
            href="/login"
            className="font-semibold text-brand-900 hover:text-brand-700"
          >
            Sign in
          </Link>
          .
        </p>
      </div>
    </motion.div>
  );
}
