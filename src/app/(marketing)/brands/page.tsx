import type { Metadata } from "next";
import ProductGrid from "@/components/ProductGrid";
import { getProducts, getCategories } from "@/lib/api/storefront";

// Catalogue is live data — render at request time.
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Our Brands & Products",
  description:
    "Browse premium baby and family skincare products distributed by Ono Belle Global Limited — internationally certified, dermatologist-approved, NAFDAC compliant.",
};

export default async function BrandsPage() {
  const [{ products }, categories] = await Promise.all([
    getProducts(),
    getCategories(),
  ]);

  return (
    <>
      <section className="border-b border-border bg-linear-to-b from-brand-50 to-background">
        <div className="mx-auto w-full max-w-6xl px-6 py-16 sm:py-20">
          <span className="text-[11px] font-semibold uppercase tracking-[0.32em] text-accent-600">
            Shop the range
          </span>
          <h1 className="mt-3 max-w-3xl font-display text-4xl text-brand-900 sm:text-5xl lg:text-6xl">
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
          {products.length > 0 ? (
            <ProductGrid products={products} categories={categories} />
          ) : (
            <p className="text-center text-sm text-brand-900/60">
              Our catalogue is being updated — please check back soon or reach
              us on WhatsApp for current availability.
            </p>
          )}
        </div>
      </section>
    </>
  );
}
