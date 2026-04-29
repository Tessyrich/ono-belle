import HeroCarousel from "@/components/HeroCarousel";
import TrustStrip from "@/components/TrustStrip";
import ServicesPreview from "@/components/ServicesPreview";
import BrandShowcase from "@/components/BrandShowcase";
import ProcessTimeline from "@/components/ProcessTimeline";
import StatsBand from "@/components/StatsBand";
import Testimonial from "@/components/Testimonial";
import SectionOrnament from "@/components/SectionOrnament";
import FAQ from "@/components/FAQ";
import HomeCTA from "@/components/HomeCTA";

export default function Home() {
  return (
    <>
      <HeroCarousel />
      <TrustStrip />
      <ServicesPreview />
      <BrandShowcase />
      <ProcessTimeline />
      <StatsBand />
      <Testimonial />
      <SectionOrnament variant="muted" />
      <FAQ />
      <HomeCTA />
    </>
  );
}
