import Link from "next/link";
import Logo from "./Logo";
import { DesktopNav, MobileNav } from "./SiteNav";

export default function SiteHeader() {
  return (
    <header className="sticky top-0 z-30 border-b border-border/70 bg-background/85 backdrop-blur">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-6 px-6 py-3.5">
        <Link href="/" className="flex items-center gap-3">
          <Logo size={48} priority className="h-12 w-12 rounded-full ring-1 ring-border/70" />
          <span className="hidden flex-col leading-tight sm:flex">
            <span className="font-serif text-base text-brand-700">
              ONO BELLE
            </span>
            <span className="text-[10px] uppercase tracking-[0.22em] text-accent-600">
              Global Limited
            </span>
          </span>
        </Link>

        <DesktopNav />

        <Link
          href="/contact"
          className="bg-brand-900 px-5 py-2.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-white transition-colors hover:bg-brand-700"
        >
          Partner with us
        </Link>
      </div>

      <MobileNav />
    </header>
  );
}
