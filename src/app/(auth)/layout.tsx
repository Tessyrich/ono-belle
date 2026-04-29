import Link from "next/link";
import Logo from "@/components/Logo";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <header className="border-b border-border/70 bg-background/85 backdrop-blur">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-4">
          <Link href="/" className="flex items-center gap-3">
            <Logo
              size={44}
              className="h-11 w-11 rounded-full ring-1 ring-border/70"
            />
            <span className="hidden flex-col leading-tight sm:flex">
              <span className="font-serif text-base text-brand-700">
                ONO BELLE
              </span>
              <span className="text-[10px] uppercase tracking-[0.22em] text-accent-600">
                Global Limited
              </span>
            </span>
          </Link>
          <Link
            href="/"
            className="text-[11px] font-semibold uppercase tracking-[0.22em] text-brand-900/70 transition-colors hover:text-brand-900"
          >
            ← Back to site
          </Link>
        </div>
      </header>

      <main className="flex flex-1 items-center justify-center px-6 py-12">
        {children}
      </main>
    </div>
  );
}
