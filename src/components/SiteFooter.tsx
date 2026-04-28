import Link from "next/link";
import Logo from "./Logo";
import NewsletterSignup from "./NewsletterSignup";

export default function SiteFooter() {
  return (
    <footer className="border-t border-border bg-brand-900 text-brand-100">
      <div className="mx-auto grid w-full max-w-6xl gap-12 px-6 py-16 md:grid-cols-4">
        <div className="md:col-span-2">
          <div className="flex items-center gap-3">
            <Logo
              size={56}
              className="h-14 w-14 rounded-full ring-1 ring-white/10"
            />
            <div className="flex flex-col leading-tight">
              <span className="font-serif text-base text-white">
                ONO BELLE
              </span>
              <span className="text-[10px] uppercase tracking-[0.22em] text-accent-400">
                Global Limited
              </span>
            </div>
          </div>
          <p className="mt-5 max-w-sm text-sm text-brand-100/80">
            Premium baby & family skincare distribution for Nigeria. We connect
            internationally certified brands with pharmacies, hospitals, and
            specialty retailers across the country.
          </p>

          <div className="mt-8 max-w-sm">
            <h4 className="text-[10px] font-semibold uppercase tracking-[0.32em] text-accent-400">
              Stay in touch
            </h4>
            <p className="mt-2 text-sm text-brand-100/70">
              Partnership updates, new categories, market notes — straight to
              your inbox.
            </p>
            <NewsletterSignup />
          </div>
        </div>

        <div>
          <h4 className="text-[10px] font-semibold uppercase tracking-[0.32em] text-accent-400">
            Explore
          </h4>
          <ul className="mt-4 space-y-3 text-sm text-brand-100/80">
            <li>
              <Link href="/about" className="hover:text-white">
                About us
              </Link>
            </li>
            <li>
              <Link href="/services" className="hover:text-white">
                Services
              </Link>
            </li>
            <li>
              <Link href="/brands" className="hover:text-white">
                Our brands
              </Link>
            </li>
            <li>
              <Link href="/partners" className="hover:text-white">
                Who we work with
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-[10px] font-semibold uppercase tracking-[0.32em] text-accent-400">
            Contact
          </h4>
          <ul className="mt-4 space-y-3 text-sm text-brand-100/80">
            <li>
              Legacy Place, 1st Floor
              <br />
              Tino Electronic Floor
              <br />
              3rd Roundabout, Lekki Expressway
              <br />
              Lagos State, Nigeria
            </li>
            <li>
              <a
                href="mailto:onobelle@yahoo.co.uk"
                className="hover:text-white"
              >
                onobelle@yahoo.co.uk
              </a>
            </li>
            <li>
              <a href="tel:+2348133035019" className="hover:text-white">
                +234 813 303 5019
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex w-full max-w-6xl flex-col items-start justify-between gap-2 px-6 py-6 text-xs text-brand-100/60 sm:flex-row sm:items-center">
          <span>
            © {new Date().getFullYear()} Ono Belle Global Limited. All rights reserved.
          </span>
          <span>RC registered in Nigeria · Lagos</span>
        </div>
      </div>
    </footer>
  );
}
