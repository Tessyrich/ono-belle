import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Ono Belle Global Limited is a registered Nigerian import and distribution company focused on baby care, skincare, and family wellness products.",
};

const values = [
  {
    title: "Product safety & compliance",
    description:
      "Every brand we represent is fully NAFDAC-registered and meets international safety standards before it reaches a Nigerian shelf.",
  },
  {
    title: "Professional, transparent partnerships",
    description:
      "Clear contracts, honest reporting, and structured commercial relationships with global brands and local channels.",
  },
  {
    title: "Long-term brand building",
    description:
      "We invest in trade marketing, training and visibility — building category leaders, not one-off shipments.",
  },
  {
    title: "Consumer trust & quality",
    description:
      "Nigerian parents deserve products that are gentle, effective, and reliably available. Quality is non-negotiable.",
  },
  {
    title: "Ethical & responsible trade",
    description:
      "We operate as a local commercial partner with full regulatory, tax, and import compliance.",
  },
];

export default function AboutPage() {
  return (
    <>
      <section className="border-b border-border bg-linear-to-b from-brand-50 to-background">
        <div className="mx-auto w-full max-w-6xl px-6 py-20 sm:py-24">
          <span className="text-[11px] font-semibold uppercase tracking-[0.32em] text-accent-600">
            About us
          </span>
          <h1 className="mt-3 max-w-3xl font-serif text-4xl text-brand-900 sm:text-5xl lg:text-6xl">
            A registered Nigerian import & distribution company built on
            trust, compliance, and care.
          </h1>
          <p className="mt-6 max-w-2xl text-base text-brand-900/75 sm:text-lg">
            ONO BELLE GLOBAL LIMITED specialises in baby care, skincare, and
            family wellness products. We represent international brands and
            manage their full commercial entry into Nigeria.
          </p>
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-6 py-20">
        <div className="grid gap-12 lg:grid-cols-[1fr_1fr]">
          <div>
            <h2 className="font-serif text-3xl text-brand-900 sm:text-5xl">
              Who we are
            </h2>
            <div className="mt-6 space-y-4 text-base text-brand-900/75">
              <p>
                ONO BELLE GLOBAL LIMITED is a registered Nigerian import and
                distribution company focused on baby care, skincare, and family
                wellness products.
              </p>
              <p>
                We specialise in representing international brands and managing
                their full commercial entry into Nigeria — from regulatory
                approvals and logistics, to wholesale distribution, marketing,
                and retail partnerships.
              </p>
              <p>
                Our mission is to make world-class baby and family skincare
                products accessible to Nigerian families through safe,
                compliant, and professionally managed supply chains.
              </p>
            </div>
          </div>

          <div className="rounded-[2rem] border border-border bg-linear-to-br from-brand-100 via-brand-50 to-accent-200 p-8 shadow-sm">
            <span className="text-[11px] font-semibold uppercase tracking-[0.32em] text-accent-600">
              Our vision
            </span>
            <h3 className="mt-4 text-2xl font-semibold leading-tight text-brand-900 sm:text-3xl">
              To become Nigeria&apos;s leading distribution partner for
              premium, organic, and dermatologist-approved baby and family
              skincare brands.
            </h3>
            <div className="mt-8 grid grid-cols-2 gap-3">
              {[
                { k: "Focus", v: "Baby & family" },
                { k: "Approach", v: "Compliance-first" },
                { k: "Coverage", v: "Nationwide" },
                { k: "HQ", v: "Lagos, Nigeria" },
              ].map((item) => (
                <div
                  key={item.k}
                  className="rounded-2xl bg-white/80 p-4 backdrop-blur"
                >
                  <p className="text-[10px] uppercase tracking-[0.18em] text-brand-700/70">
                    {item.k}
                  </p>
                  <p className="mt-1 text-sm font-semibold text-brand-900">
                    {item.v}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-border bg-muted/60">
        <div className="mx-auto w-full max-w-6xl px-6 py-20">
          <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
            <div>
              <span className="text-[11px] font-semibold uppercase tracking-[0.32em] text-accent-600">
                Our values
              </span>
              <h2 className="mt-3 max-w-2xl font-serif text-3xl text-brand-900 sm:text-5xl">
                Principles that shape every partnership we take on.
              </h2>
            </div>
          </div>

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {values.map((value, idx) => (
              <article
                key={value.title}
                className="rounded-3xl border border-border bg-surface p-6"
              >
                <span className="text-xs font-semibold tracking-[0.2em] text-brand-500">
                  0{idx + 1}
                </span>
                <h3 className="mt-3 text-lg font-semibold text-brand-900">
                  {value.title}
                </h3>
                <p className="mt-2 text-sm text-brand-900/70">
                  {value.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-6 py-20">
        <div className="overflow-hidden rounded-[2.5rem] border border-border bg-linear-to-br from-brand-50 via-white to-accent-200/60 px-8 py-14 shadow-sm sm:px-14">
          <div className="flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-center">
            <div className="max-w-2xl">
              <h2 className="font-serif text-3xl text-brand-900 sm:text-5xl">
                Looking for a Nigerian distribution partner?
              </h2>
              <p className="mt-4 text-base text-brand-900/75">
                Tell us about your brand. We&apos;ll come back with a
                structured market-entry proposal.
              </p>
            </div>
            <Link
              href="/contact"
              className="bg-brand-900 px-8 py-4 text-[11px] font-semibold uppercase tracking-[0.28em] text-white transition-colors hover:bg-brand-700"
            >
              Get in touch
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
