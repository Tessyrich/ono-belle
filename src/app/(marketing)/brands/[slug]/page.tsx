import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { getProductBySlug, getProducts } from "@/lib/api/storefront";
import ProductDetailActions from "@/components/ProductDetailActions";
import ProductCard from "@/components/ProductCard";

// Product data is live — render at request time rather than prerendering.
export const dynamic = "force-dynamic";

export async function generateMetadata(
  props: PageProps<"/brands/[slug]">,
): Promise<Metadata> {
  const { slug } = await props.params;
  const product = await getProductBySlug(slug);
  if (!product) return { title: "Product not found" };
  return {
    title: product.name,
    description: product.shortDescription ?? product.fullDescription ?? undefined,
  };
}

export default async function ProductPage(props: PageProps<"/brands/[slug]">) {
  const { slug } = await props.params;
  const product = await getProductBySlug(slug);
  if (!product) notFound();

  const categoryLabel = product.categoryName ?? "Our range";

  const related = product.categorySlug
    ? (await getProducts({ category_slug: product.categorySlug })).products
        .filter((p) => p.id !== product.id)
        .slice(0, 4)
    : [];

  return (
    <>
      {/* Breadcrumb */}
      <div className="bg-muted/40">
        <div className="mx-auto w-full max-w-6xl px-6 py-4 text-xs text-brand-900/60">
          <Link href="/brands" className="hover:text-brand-900">
            Shop
          </Link>
          <span className="mx-2">/</span>
          <span className="text-brand-900">{product.name}</span>
        </div>
      </div>

      <section className="bg-background">
        <div className="mx-auto grid w-full max-w-6xl gap-12 px-6 py-12 sm:py-16 lg:grid-cols-2 lg:gap-16">
          {/* Image */}
          <div className="relative aspect-[4/5] w-full overflow-hidden border border-border bg-brand-50">
            <Image
              src={product.image}
              alt={product.name}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
            {!product.inStock && (
              <span className="absolute left-4 top-4 bg-brand-900/85 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.22em] text-white">
                Out of stock
              </span>
            )}
          </div>

          {/* Details */}
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.32em] text-accent-600">
              {categoryLabel}
            </p>
            <h1 className="mt-4 font-display text-4xl leading-tight text-brand-900 sm:text-5xl">
              {product.name}
            </h1>

            <div className="mt-8 flex items-baseline gap-3">
              <span className="font-display text-4xl text-brand-900">
                {product.priceLabel}
              </span>
              <span className="text-sm text-brand-900/55">
                {product.inStock
                  ? `${product.stock} in stock`
                  : "Currently unavailable"}
              </span>
            </div>

            {(product.fullDescription || product.shortDescription) && (
              <p className="mt-8 max-w-prose text-base leading-relaxed text-brand-900/75">
                {product.fullDescription ?? product.shortDescription}
              </p>
            )}

            <div className="mt-10 border-t border-border pt-8">
              <ProductDetailActions product={product} />
            </div>

            <div className="mt-10 grid gap-3 border-t border-border pt-8 text-xs text-brand-900/65 sm:grid-cols-3">
              <div>
                <p className="font-semibold uppercase tracking-[0.18em] text-brand-700/80">
                  NAFDAC
                </p>
                <p className="mt-1">Registered &amp; compliant</p>
              </div>
              <div>
                <p className="font-semibold uppercase tracking-[0.18em] text-brand-700/80">
                  Delivery
                </p>
                <p className="mt-1">Nationwide · 3–7 days</p>
              </div>
              <div>
                <p className="font-semibold uppercase tracking-[0.18em] text-brand-700/80">
                  Pay
                </p>
                <p className="mt-1">Bank transfer · WhatsApp</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {related.length > 0 && (
        <section className="border-t border-border bg-muted/40">
          <div className="mx-auto w-full max-w-6xl px-6 py-16 sm:py-20">
            <div className="mb-10 flex items-end justify-between gap-6">
              <div>
                <span className="text-[11px] font-semibold uppercase tracking-[0.32em] text-accent-600">
                  You might also like
                </span>
                <h2 className="mt-2 font-display text-2xl text-brand-900 sm:text-3xl">
                  More from {categoryLabel}
                </h2>
              </div>
              <Link
                href="/brands"
                className="hidden text-[11px] font-semibold uppercase tracking-[0.28em] text-brand-900 hover:text-brand-700 sm:inline-flex"
              >
                Shop all →
              </Link>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {related.map((p, idx) => (
                <ProductCard key={p.id} product={p} index={idx} />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
