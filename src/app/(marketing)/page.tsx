import HeroCarousel from "@/components/HeroCarousel";
import TrustStrip from "@/components/TrustStrip";
import ServicesPreview from "@/components/ServicesPreview";
import BrandShowcase from "@/components/BrandShowcase";
import StatsBand from "@/components/StatsBand";
import Testimonial from "@/components/Testimonial";
import SectionOrnament from "@/components/SectionOrnament";
import FAQ from "@/components/FAQ";
import HomeCTA from "@/components/HomeCTA";
import { getProducts, getFaqs } from "@/lib/api/storefront";

// Storefront reads live data from the API, so render at request time.
export const dynamic = "force-dynamic";

export default async function Home() {
  const [{ products }, faqs] = await Promise.all([
    getProducts({ per_page: 12 }),
    getFaqs(),
  ]);

  return (
    <>
      <HeroCarousel />
      <TrustStrip />
      <ServicesPreview />
      {products.length > 0 && <BrandShowcase products={products} />}
      <StatsBand />
      <Testimonial />
      <SectionOrnament variant="muted" />
      <FAQ
        items={faqs.map((f) => ({ q: f.question, a: f.answer }))}
      />
      <HomeCTA />
    </>
  );
}
