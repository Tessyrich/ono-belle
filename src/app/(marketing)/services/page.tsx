import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Our Services",
  description:
    "Brand import & distribution services for international baby and skincare brands entering Nigeria — NAFDAC compliance, logistics, warehousing, and retail placement.",
};

const services = [
  {
    title: "Product registration & NAFDAC compliance",
    description:
      "Full dossier preparation, sample submission, and follow-through with the National Agency for Food and Drug Administration and Control.",
  },
  {
    title: "Importation & shipping coordination",
    description:
      "Freight, customs documentation, port clearance, and delivery to bonded warehousing — handled end-to-end.",
  },
  {
    title: "Warehousing & inventory management",
    description:
      "Climate-aware storage with stock rotation, expiry tracking, and transparent inventory reporting for partners.",
  },
  {
    title: "Wholesale & retail distribution",
    description:
      "A structured commercial network reaching modern trade, traditional trade, and specialty channels across Nigeria.",
  },
  {
    title: "Pharmacy & hospital placement",
    description:
      "Direct accounts with leading pharmacy chains, independent pharmacies, hospitals, and clinics nationwide.",
  },
  {
    title: "E-commerce integration",
    description:
      "Listing, content, and fulfilment support across Nigeria's leading online marketplaces and brand storefronts.",
  },
];

const process = [
  {
    step: "01",
    title: "Discovery",
    description:
      "We review your range, certifications, and target channels — and assess fit for the Nigerian market.",
  },
  {
    step: "02",
    title: "Compliance",
    description:
      "We handle NAFDAC product registration and any additional regulatory steps before importation.",
  },
  {
    step: "03",
    title: "Importation",
    description:
      "Shipping, customs clearance, and warehousing into our Lagos-based distribution network.",
  },
  {
    step: "04",
    title: "Distribution",
    description:
      "Commercial placement across pharmacies, hospitals, retailers, and online marketplaces.",
  },
  {
    step: "05",
    title: "Activation",
    description:
      "Trade marketing, sampling, training and continuous brand-building inside Nigerian retail.",
  },
];

export default function ServicesPage() {
  return (
    <>
      <section className="border-b border-border bg-linear-to-b from-brand-50 to-background">
        <div className="mx-auto w-full max-w-6xl px-6 py-20 sm:py-24">
          <span className="text-[11px] font-semibold uppercase tracking-[0.32em] text-accent-600">
            Our services
          </span>
          <h1 className="mt-3 max-w-3xl font-serif text-4xl text-brand-900 sm:text-5xl lg:text-6xl">
            Brand import & distribution, end-to-end.
          </h1>
          <p className="mt-6 max-w-2xl text-base text-brand-900/75 sm:text-lg">
            We provide full commercial support for international brands
            entering Nigeria. Not just a reseller — your local commercial
            partner.
          </p>
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-6 py-20">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, idx) => (
            <article
              key={service.title}
              className="rounded-3xl border border-border bg-surface p-6 transition-all hover:-translate-y-1 hover:border-brand-300 hover:shadow-lg"
            >
              <span className="text-xs font-semibold tracking-[0.2em] text-brand-500">
                0{idx + 1}
              </span>
              <h3 className="mt-3 text-lg font-semibold text-brand-900">
                {service.title}
              </h3>
              <p className="mt-2 text-sm text-brand-900/70">
                {service.description}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-brand-900 text-brand-100">
        <div className="mx-auto w-full max-w-6xl px-6 py-20">
          <div className="flex flex-col items-start gap-4">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-accent-400">
              How we work
            </span>
            <h2 className="max-w-2xl text-3xl font-semibold tracking-tight text-white sm:text-4xl">
              A predictable, structured path from international brand to
              Nigerian shelves.
            </h2>
          </div>

          <ol className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
            {process.map((item) => (
              <li
                key={item.step}
                className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur"
              >
                <span className="text-xs font-semibold tracking-[0.2em] text-accent-400">
                  {item.step}
                </span>
                <h3 className="mt-3 text-lg font-semibold text-white">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm text-brand-100/75">
                  {item.description}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-6 py-20">
        <div className="overflow-hidden rounded-[2.5rem] border border-border bg-linear-to-br from-brand-50 via-white to-accent-200/60 px-8 py-14 shadow-sm sm:px-14">
          <div className="flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-center">
            <div className="max-w-2xl">
              <h2 className="font-serif text-3xl text-brand-900 sm:text-5xl">
                Ready to talk distribution in Nigeria?
              </h2>
              <p className="mt-4 text-base text-brand-900/75">
                Share your product range and we&apos;ll come back with a
                clear, structured proposal.
              </p>
            </div>
            <Link
              href="/contact"
              className="bg-brand-900 px-8 py-4 text-[11px] font-semibold uppercase tracking-[0.28em] text-white transition-colors hover:bg-brand-700"
            >
              Contact us
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
