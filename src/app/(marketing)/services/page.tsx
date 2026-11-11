import type { Metadata } from "next";
import ServicesHero from "@/components/services/ServicesHero";
import WhatWeOffer from "@/components/services/WhatWeOffer";
import HowWeWork from "@/components/services/HowWeWork";
import ServicesCTA from "@/components/services/ServicesCTA";

export const metadata: Metadata = {
  title: "Our Services",
  description:
    "Brand import & distribution services for international skincare and personal care brands entering Nigeria — NAFDAC compliance, logistics, warehousing, and retail placement.",
};

export default function ServicesPage() {
  return (
    <>
      <ServicesHero />
      <WhatWeOffer />
      <HowWeWork />
      <ServicesCTA />
    </>
  );
}
