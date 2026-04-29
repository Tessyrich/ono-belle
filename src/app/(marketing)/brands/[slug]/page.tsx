import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import {
  formatNaira,
  getProduct,
  products,
  categories,
} from "@/data/products";
import ProductDetailActions from "@/components/ProductDetailActions";
import ProductCard from "@/components/ProductCard";

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata(
  props: PageProps<"/brands/[slug]">,
): Promise<Metadata> {
  const { slug } = await props.params;
  const product = getProduct(slug);
  if (!product) return { title: "Product not found" };
  return {
    title: `${product.name}`,
    description: product.description,
  };
}

export default async function ProductPage(props: PageProps<"/brands/[slug]">) {
  const { slug } = await props.params;
  const product = getProduct(slug);
  if (!product) notFound();

  const categoryLabel =
    categories.find((c) => c.slug === product.category)?.label ??
    product.category;

  const related = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

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
            {product.comparePrice && (
              <span className="absolute left-4 top-4 bg-accent-500 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.22em] text-white">
                Sale
              </span>
            )}
          </div>

          {/* Details */}
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.32em] text-accent-600">
              {product.brand} · {categoryLabel}
            </p>
            <h1 className="mt-4 font-serif text-4xl leading-tight text-brand-900 sm:text-5xl">
              {product.name}
            </h1>
            <p className="mt-3 text-sm text-brand-900/60">{product.size}</p>

            <div className="mt-8 flex items-baseline gap-3">
              <span className="font-serif text-4xl text-brand-900">
                {formatNaira(product.price)}
              </span>
              {product.comparePrice && (
                <span className="text-base text-brand-900/40 line-through">
                  {formatNaira(product.comparePrice)}
                </span>
              )}
            </div>

            <p className="mt-8 max-w-prose text-base leading-relaxed text-brand-900/75">
              {product.description}
            </p>

            <ul className="mt-8 grid gap-2 sm:grid-cols-2">
              {product.features.map((feature) => (
                <li
                  key={feature}
                  className="flex items-start gap-2 text-sm text-brand-900/85"
                >
                  <span
                    aria-hidden
                    className="mt-1 grid h-4 w-4 shrink-0 place-items-center rounded-full bg-brand-500 text-[10px] text-white"
                  >
                    ✓
                  </span>
                  {feature}
                </li>
              ))}
            </ul>

            <div className="mt-10 border-t border-border pt-8">
              <ProductDetailActions product={product} />
            </div>

            <div className="mt-10 grid gap-3 border-t border-border pt-8 text-xs text-brand-900/65 sm:grid-cols-3">
              <div>
                <p className="font-semibold uppercase tracking-[0.18em] text-brand-700/80">
                  NAFDAC
                </p>
                <p className="mt-1">Registered & compliant</p>
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
                <h2 className="mt-2 font-serif text-2xl text-brand-900 sm:text-3xl">
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
