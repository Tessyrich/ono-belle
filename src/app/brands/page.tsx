import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Our Brands",
  description:
    "Ono Belle Global Limited partners with carefully selected international brands meeting the highest standards of safety, quality and clinical trust.",
};

const focusAreas = [
  {
    title: "Baby skincare",
    description:
      "Lotions, washes, oils, creams and balms — formulated specifically for delicate baby skin.",
  },
  {
    title: "Newborn & sensitive-skin",
    description:
      "Hypoallergenic, fragrance-free, and pediatrician-tested formulations for the most fragile skin.",
  },
  {
    title: "Organic & vegan formulations",
    description:
      "Plant-based, certified organic, and vegan ranges that meet international ethical standards.",
  },
  {
    title: "Dermatologist-tested",
    description:
      "Clinically reviewed products with proven safety, tolerance, and skin-barrier support.",
  },
  {
    title: "Family wellness",
    description:
      "Gentle wellness essentials trusted by parents — for mother, baby, and the whole family.",
  },
  {
    title: "Hygiene essentials",
    description:
      "Daily hygiene staples that match the safety expectations of pharmacies and hospitals.",
  },
];

const criteria = [
  "Internationally certified manufacturing",
  "Dermatologist-approved formulations",
  "Transparent ingredient sourcing",
  "Long-term commercial commitment",
];

export default function BrandsPage() {
  return (
    <>
      <section className="border-b border-border bg-linear-to-b from-brand-50 to-background">
        <div className="mx-auto w-full max-w-6xl px-6 py-20 sm:py-24">
          <span className="text-[11px] font-semibold uppercase tracking-[0.32em] text-accent-600">
            Our brands
          </span>
          <h1 className="mt-3 max-w-3xl font-serif text-4xl text-brand-900 sm:text-5xl lg:text-6xl">
            Internationally certified. Carefully selected. Built to be trusted
            by Nigerian families.
          </h1>
          <p className="mt-6 max-w-2xl text-base text-brand-900/75 sm:text-lg">
            We partner with carefully selected international brands that meet
            the highest standards of safety, quality, and clinical trust.
          </p>
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-6 py-20">
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <div>
            <span className="text-[11px] font-semibold uppercase tracking-[0.32em] text-accent-600">
              Focus areas
            </span>
            <h2 className="mt-3 max-w-2xl font-serif text-3xl text-brand-900 sm:text-5xl">
              Categories we represent in Nigeria.
            </h2>
          </div>
          <p className="max-w-md text-sm text-brand-900/70">
            Each category is matched to channels where it performs best —
            pharmacies, hospitals, baby boutiques and online.
          </p>
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {focusAreas.map((area, idx) => (
            <article
              key={area.title}
              className="group relative overflow-hidden rounded-3xl border border-border bg-surface p-6 transition-all hover:-translate-y-1 hover:border-brand-300 hover:shadow-lg"
            >
              <div
                aria-hidden
                className="absolute right-4 top-4 grid h-10 w-10 place-items-center rounded-full bg-brand-50 text-brand-600 transition-colors group-hover:bg-brand-100"
              >
                <span className="text-xs font-semibold tracking-wide">
                  0{idx + 1}
                </span>
              </div>
              <h3 className="mt-2 max-w-[80%] text-lg font-semibold text-brand-900">
                {area.title}
              </h3>
              <p className="mt-2 text-sm text-brand-900/70">
                {area.description}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="border-y border-border bg-muted/60">
        <div className="mx-auto grid w-full max-w-6xl gap-12 px-6 py-20 lg:grid-cols-[1fr_1fr] lg:items-center">
          <div>
            <span className="text-[11px] font-semibold uppercase tracking-[0.32em] text-accent-600">
              Selection criteria
            </span>
            <h2 className="mt-3 font-serif text-3xl text-brand-900 sm:text-5xl">
              How we choose the brands we represent.
            </h2>
            <p className="mt-6 max-w-xl text-base text-brand-900/75">
              We are intentionally selective. We only take on brands we can
              build for the long term — that match our compliance posture and
              the trust expectations of Nigerian parents and pharmacists.
            </p>
          </div>
          <ul className="grid gap-3 sm:grid-cols-2">
            {criteria.map((point) => (
              <li
                key={point}
                className="flex items-start gap-3 rounded-2xl border border-border bg-surface p-5"
              >
                <span
                  aria-hidden
                  className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-brand-500 text-xs font-bold text-white"
                >
                  ✓
                </span>
                <span className="text-sm font-medium text-brand-900">
                  {point}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-6 py-20">
        <div className="overflow-hidden rounded-[2.5rem] border border-border bg-linear-to-br from-brand-50 via-white to-accent-200/60 px-8 py-14 shadow-sm sm:px-14">
          <div className="flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-center">
            <div className="max-w-2xl">
              <h2 className="font-serif text-3xl text-brand-900 sm:text-5xl">
                Are you a brand looking at the Nigerian market?
              </h2>
              <p className="mt-4 text-base text-brand-900/75">
                We&apos;d love to hear from you. Send us your product range
                and we&apos;ll respond with a structured proposal.
              </p>
            </div>
            <Link
              href="/contact"
              className="bg-brand-900 px-8 py-4 text-[11px] font-semibold uppercase tracking-[0.28em] text-white transition-colors hover:bg-brand-700"
            >
              Become a partner brand
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
