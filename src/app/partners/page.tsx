import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Who We Work With",
  description:
    "We work with international baby and skincare brands, pharmacies, baby boutiques, supermarkets, hospitals, clinics, and online retailers across Nigeria.",
};

const partners = [
  {
    title: "International baby & skincare brands",
    description:
      "Global manufacturers of premium baby care, skincare, and family wellness products seeking a structured Nigerian commercial partner.",
    tag: "Brand owners",
  },
  {
    title: "Pharmacies & healthcare retailers",
    description:
      "Pharmacy chains and independent pharmacies — modern trade and traditional, serving every region of Nigeria.",
    tag: "Retail",
  },
  {
    title: "Baby boutiques & supermarkets",
    description:
      "Specialty baby retailers and modern-trade supermarkets where parents shop for trusted skincare brands.",
    tag: "Retail",
  },
  {
    title: "Hospitals & clinics",
    description:
      "Maternity hospitals, paediatric clinics, and dermatology practices recommending and stocking our brands.",
    tag: "Clinical",
  },
  {
    title: "Online retail platforms",
    description:
      "Nigeria's leading e-commerce marketplaces and brand storefronts for digital-first parents.",
    tag: "E-commerce",
  },
];

export default function PartnersPage() {
  return (
    <>
      <section className="border-b border-border bg-linear-to-b from-brand-50 to-background">
        <div className="mx-auto w-full max-w-6xl px-6 py-20 sm:py-24">
          <span className="text-[11px] font-semibold uppercase tracking-[0.32em] text-accent-600">
            Who we work with
          </span>
          <h1 className="mt-3 max-w-3xl font-serif text-4xl text-brand-900 sm:text-5xl lg:text-6xl">
            One distribution partner. Every channel that matters.
          </h1>
          <p className="mt-6 max-w-2xl text-base text-brand-900/75 sm:text-lg">
            We bridge international brands and Nigerian retail — across
            pharmacies, hospitals, supermarkets, boutiques, and online
            marketplaces.
          </p>
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-6 py-20">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {partners.map((partner, idx) => (
            <article
              key={partner.title}
              className="flex h-full flex-col rounded-3xl border border-border bg-surface p-6 transition-all hover:-translate-y-1 hover:border-brand-300 hover:shadow-lg"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold tracking-[0.2em] text-brand-500">
                  0{idx + 1}
                </span>
                <span className="rounded-full bg-brand-50 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-brand-700">
                  {partner.tag}
                </span>
              </div>
              <h3 className="mt-4 text-lg font-semibold text-brand-900">
                {partner.title}
              </h3>
              <p className="mt-2 text-sm text-brand-900/70">
                {partner.description}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-brand-900 text-brand-100">
        <div className="mx-auto grid w-full max-w-6xl gap-12 px-6 py-20 lg:grid-cols-2 lg:items-center">
          <div>
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-accent-400">
              Your single gateway
            </span>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
              We act as the local commercial layer between global brands and
              Nigerian retail.
            </h2>
            <p className="mt-6 max-w-xl text-base text-brand-100/80">
              International partners get one professional counterparty in
              Nigeria. Local channels get vetted, compliant, premium product.
              Parents get safer choices.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {[
              { k: "Brand owners", v: "Single counterparty" },
              { k: "Pharmacies", v: "Direct accounts" },
              { k: "Hospitals", v: "Clinical channel" },
              { k: "Online", v: "Marketplace listings" },
            ].map((item) => (
              <div
                key={item.k}
                className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur"
              >
                <p className="text-xs uppercase tracking-[0.18em] text-brand-100/60">
                  {item.k}
                </p>
                <p className="mt-3 text-base font-semibold text-white">
                  {item.v}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-6 py-20">
        <div className="overflow-hidden rounded-[2.5rem] border border-border bg-linear-to-br from-brand-50 via-white to-accent-200/60 px-8 py-14 shadow-sm sm:px-14">
          <div className="flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-center">
            <div className="max-w-2xl">
              <h2 className="font-serif text-3xl text-brand-900 sm:text-5xl">
                Stock our brands or partner with us.
              </h2>
              <p className="mt-4 text-base text-brand-900/75">
                Pharmacies, hospitals, retailers and online platforms — get in
                touch to discuss listing and supply.
              </p>
            </div>
            <Link
              href="/contact"
              className="bg-brand-900 px-8 py-4 text-[11px] font-semibold uppercase tracking-[0.28em] text-white transition-colors hover:bg-brand-700"
            >
              Talk to our team
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
