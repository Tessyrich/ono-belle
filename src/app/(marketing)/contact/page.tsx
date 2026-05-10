import type { Metadata } from "next";
import ContactHero from "@/components/contact/ContactHero";
import ContactBody from "@/components/contact/ContactBody";
import ContactCTA from "@/components/contact/ContactCTA";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Ono Belle Global Limited — premium baby & family skincare distribution for Nigeria. Lagos office, email and phone contact.",
};

export default function ContactPage() {
  return (
    <>
      <ContactHero />
      <ContactBody />
      <ContactCTA />
    </>
  );
}
