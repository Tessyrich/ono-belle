"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import { useAuth } from "@/context/auth";

export default function AccountMenu() {
  const { user, hydrated, isAdmin, logout } = useAuth();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (!ref.current) return;
      if (!ref.current.contains(e.target as Node)) setOpen(false);
    };
    window.addEventListener("mousedown", handler);
    return () => window.removeEventListener("mousedown", handler);
  }, [open]);

  if (!hydrated) {
    return <span className="h-10 w-10" aria-hidden />;
  }

  if (!user) {
    return (
      <Link
        href="/login"
        className="text-[11px] font-semibold uppercase tracking-[0.22em] text-brand-900/80 transition-colors hover:text-brand-900"
      >
        Sign in
      </Link>
    );
  }

  const initials = user.name
    .split(" ")
    .map((p) => p[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="menu"
        aria-expanded={open}
        className="grid h-10 w-10 place-items-center rounded-full bg-brand-900 text-[11px] font-semibold tracking-wider text-white transition-colors hover:bg-brand-700"
        title={user.name}
      >
        {initials || "OB"}
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 6, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 6, scale: 0.98 }}
            transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
            role="menu"
            className="absolute right-0 top-12 z-40 w-60 border border-border bg-surface p-3 shadow-xl"
          >
            <div className="border-b border-border pb-3">
              <p className="text-sm font-semibold text-brand-900">
                {user.name}
              </p>
              <p className="text-xs text-brand-900/55">{user.email}</p>
              <p className="mt-1 text-[10px] font-semibold uppercase tracking-[0.22em] text-accent-600">
                {isAdmin ? "Administrator" : "Customer"}
              </p>
            </div>

            <ul className="mt-2 flex flex-col gap-1 text-sm">
              {isAdmin ? (
                <li>
                  <Link
                    href="/admin/dashboard"
                    onClick={() => setOpen(false)}
                    className="block px-2 py-2 text-brand-900 hover:bg-muted/60"
                  >
                    Admin dashboard
                  </Link>
                </li>
              ) : (
                <>
                  <li>
                    <Link
                      href="/cart"
                      onClick={() => setOpen(false)}
                      className="block px-2 py-2 text-brand-900 hover:bg-muted/60"
                    >
                      My cart
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/checkout"
                      onClick={() => setOpen(false)}
                      className="block px-2 py-2 text-brand-900 hover:bg-muted/60"
                    >
                      Checkout
                    </Link>
                  </li>
                </>
              )}
              <li className="border-t border-border pt-2">
                <button
                  type="button"
                  onClick={() => {
                    logout();
                    setOpen(false);
                    router.push("/");
                  }}
                  className="block w-full px-2 py-2 text-left text-brand-900/70 hover:bg-muted/60 hover:text-brand-900"
                >
                  Sign out
                </button>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
