import type { Metadata } from "next";
import ProductGrid from "@/components/ProductGrid";

export const metadata: Metadata = {
  title: "Our Brands & Products",
  description:
    "Browse premium baby and family skincare products distributed by Ono Belle Global Limited — internationally certified, dermatologist-approved, NAFDAC compliant.",
};

export default function BrandsPage() {
  return (
    <>
      <section className="border-b border-border bg-linear-to-b from-brand-50 to-background">
        <div className="mx-auto w-full max-w-6xl px-6 py-16 sm:py-20">
          <span className="text-[11px] font-semibold uppercase tracking-[0.32em] text-accent-600">
            Shop the range
          </span>
          <h1 className="mt-3 max-w-3xl font-serif text-4xl text-brand-900 sm:text-5xl lg:text-6xl">
            Carefully selected. Built to be trusted by Nigerian families.
          </h1>
          <p className="mt-5 max-w-2xl text-base text-brand-900/75 sm:text-lg">
            Internationally certified baby and family skincare — dermatologist
            tested, NAFDAC compliant, ready to ship across Nigeria.
          </p>
        </div>
      </section>

      <section className="bg-background">
        <div className="mx-auto w-full max-w-6xl px-6 py-16">
          <ProductGrid />
        </div>
      </section>
    </>
  );
}
