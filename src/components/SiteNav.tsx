"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "motion/react";

const navLinks = [
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/brands", label: "Our Brands" },
  { href: "/partners", label: "Who We Work With" },
  { href: "/contact", label: "Contact" },
];

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function DesktopNav() {
  const pathname = usePathname() ?? "/";

  return (
    <nav className="hidden items-center gap-7 text-sm text-brand-900/85 lg:flex">
      {navLinks.map((link) => {
        const active = isActive(pathname, link.href);
        return (
          <Link
            key={link.href}
            href={link.href}
            className={`relative py-1 transition-colors ${
              active ? "text-brand-900" : "hover:text-brand-600"
            }`}
          >
            {link.label}
            {active && (
              <motion.span
                layoutId="nav-active-underline"
                className="absolute -bottom-0.5 left-0 right-0 h-px bg-brand-900"
                transition={{
                  duration: 0.4,
                  ease: [0.22, 1, 0.36, 1],
                }}
              />
            )}
          </Link>
        );
      })}
    </nav>
  );
}

export function MobileNav() {
  const pathname = usePathname() ?? "/";

  return (
    <nav className="flex w-full justify-center gap-5 overflow-x-auto border-t border-border/60 px-4 py-2 text-xs font-medium text-brand-900/75 lg:hidden">
      {navLinks.map((link) => {
        const active = isActive(pathname, link.href);
        return (
          <Link
            key={link.href}
            href={link.href}
            className={`whitespace-nowrap pb-1 transition-colors ${
              active
                ? "border-b border-brand-900 text-brand-900"
                : "border-b border-transparent hover:text-brand-600"
            }`}
          >
            {link.label}
          </Link>
        );
      })}
    </nav>
  );
}
