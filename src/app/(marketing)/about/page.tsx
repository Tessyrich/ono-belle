import type { Metadata } from "next";
import AboutHero from "@/components/about/AboutHero";
import OurStory from "@/components/about/OurStory";
import WhoWeWorkWith from "@/components/about/WhoWeWorkWith";
import OurValues from "@/components/about/OurValues";
import AboutCTA from "@/components/about/AboutCTA";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Ono Belle Global Limited is a registered Nigerian import and distribution company focused on skincare, personal care, and wellness products for every age.",
};

export default function AboutPage() {
  return (
    <>
      <AboutHero />
      <OurStory />
      <WhoWeWorkWith />
      <OurValues />
      <AboutCTA />
    </>
  );
}
