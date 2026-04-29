"use client";

import { useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { motion } from "motion/react";
import Logo from "@/components/Logo";
import { useAuth } from "@/context/auth";

const navLinks = [
  { href: "/admin/dashboard", label: "Overview" },
  { href: "/admin/dashboard#orders", label: "Orders" },
  { href: "/admin/dashboard#products", label: "Products" },
  { href: "/admin/dashboard#customers", label: "Customers" },
  { href: "/admin/dashboard#settings", label: "Settings" },
];

export default function AdminShell({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, hydrated, isAdmin, logout } = useAuth();
  const router = useRouter();
  const pathname = usePathname() ?? "";

  useEffect(() => {
    if (!hydrated) return;
    if (!isAdmin) {
      router.replace("/admin/login");
    }
  }, [hydrated, isAdmin, router]);

  if (!hydrated) {
    return (
      <div className="grid min-h-screen place-items-center bg-background">
        <p className="text-sm text-brand-900/60">Loading…</p>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="grid min-h-screen place-items-center bg-background">
        <p className="text-sm text-brand-900/60">Redirecting to login…</p>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col bg-background lg:flex-row">
      {/* Sidebar */}
      <aside className="border-b border-border bg-brand-900 text-brand-100 lg:w-64 lg:border-b-0 lg:border-r">
        <div className="flex items-center justify-between gap-3 px-6 py-5 lg:flex-col lg:items-start lg:gap-8 lg:py-8">
          <Link href="/admin/dashboard" className="flex items-center gap-3">
            <Logo
              size={40}
              className="h-10 w-10 rounded-full ring-1 ring-white/20"
            />
            <span className="flex flex-col leading-tight">
              <span className="font-serif text-base text-white">
                ONO BELLE
              </span>
              <span className="text-[10px] uppercase tracking-[0.22em] text-accent-400">
                Admin Console
              </span>
            </span>
          </Link>

          <nav className="flex w-full overflow-x-auto lg:flex-col lg:gap-1">
            {navLinks.map((link) => {
              const active =
                pathname === link.href ||
                (link.href === "/admin/dashboard" &&
                  pathname.startsWith("/admin/dashboard"));
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`whitespace-nowrap px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.22em] transition-colors lg:px-3 lg:py-2.5 ${
                    active
                      ? "bg-white/10 text-white"
                      : "text-brand-100/70 hover:bg-white/5 hover:text-white"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="hidden border-t border-white/10 px-6 py-5 lg:block">
          <p className="text-[10px] uppercase tracking-[0.22em] text-brand-100/50">
            Signed in as
          </p>
          <p className="mt-1 text-sm font-semibold text-white">
            {user?.name ?? "Admin"}
          </p>
          <p className="text-[11px] text-brand-100/60">{user?.email}</p>
          <div className="mt-4 flex flex-col gap-2">
            <Link
              href="/"
              className="text-[11px] font-semibold uppercase tracking-[0.22em] text-brand-100/70 hover:text-white"
            >
              ← View site
            </Link>
            <button
              type="button"
              onClick={() => {
                logout();
                router.push("/admin/login");
              }}
              className="self-start text-[11px] font-semibold uppercase tracking-[0.22em] text-accent-400 hover:text-accent-200"
            >
              Sign out
            </button>
          </div>
        </div>
      </aside>

      {/* Main */}
      <motion.main
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="flex-1 overflow-y-auto"
      >
        {children}
      </motion.main>
    </div>
  );
}
