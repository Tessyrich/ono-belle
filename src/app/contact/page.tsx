import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Ono Belle Global Limited — premium baby & family skincare distribution for Nigeria. Lagos office, email and phone contact.",
};

const contacts = [
  {
    label: "Email",
    value: "onobelle@yahoo.co.uk",
    href: "mailto:onobelle@yahoo.co.uk",
  },
  {
    label: "Phone",
    value: "+234 813 303 5019",
    href: "tel:+2348133035019",
  },
];

export default function ContactPage() {
  return (
    <>
      <section className="border-b border-border bg-linear-to-b from-brand-50 to-background">
        <div className="mx-auto w-full max-w-6xl px-6 py-20 sm:py-24">
          <span className="text-[11px] font-semibold uppercase tracking-[0.32em] text-accent-600">
            Contact
          </span>
          <h1 className="mt-3 max-w-3xl font-serif text-4xl text-brand-900 sm:text-5xl lg:text-6xl">
            Talk to our team about distribution in Nigeria.
          </h1>
          <p className="mt-6 max-w-2xl text-base text-brand-900/75 sm:text-lg">
            Whether you&apos;re a brand exploring the Nigerian market, or a
            retailer interested in stocking our partner brands — we&apos;d
            love to hear from you.
          </p>
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-6 py-20">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="space-y-8">
            <div>
              <h2 className="text-[11px] font-semibold uppercase tracking-[0.32em] text-accent-600">
                Office address
              </h2>
              <address className="mt-3 not-italic text-base leading-relaxed text-brand-900/85">
                ONO BELLE GLOBAL LIMITED
                <br />
                Legacy Place, 1st Floor
                <br />
                Tino Electronic Floor
                <br />
                3rd Roundabout, Lekki Expressway
                <br />
                Lagos State, Nigeria
              </address>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              {contacts.map((c) => (
                <a
                  key={c.label}
                  href={c.href}
                  className="rounded-2xl border border-border bg-surface p-5 transition-colors hover:border-brand-300"
                >
                  <p className="text-[10px] uppercase tracking-[0.2em] text-brand-700/70">
                    {c.label}
                  </p>
                  <p className="mt-2 text-base font-semibold text-brand-900">
                    {c.value}
                  </p>
                </a>
              ))}
            </div>

            <div className="rounded-2xl border border-border bg-muted/50 p-5 text-sm text-brand-900/75">
              <p className="font-semibold text-brand-900">Office hours</p>
              <p className="mt-1">Monday – Friday · 9:00 AM – 5:00 PM (WAT)</p>
            </div>
          </div>

          <form
            action="mailto:onobelle@yahoo.co.uk"
            method="post"
            encType="text/plain"
            className="rounded-3xl border border-border bg-surface p-6 shadow-sm sm:p-8"
          >
            <h2 className="text-xl font-semibold text-brand-900">
              Send us a message
            </h2>
            <p className="mt-2 text-sm text-brand-900/70">
              Fill in your details and we&apos;ll respond within two business
              days.
            </p>

            <div className="mt-6 grid gap-5">
              <div className="grid gap-2">
                <label
                  htmlFor="name"
                  className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-700"
                >
                  Full name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  className="rounded-xl border border-border bg-background px-4 py-3 text-sm text-brand-900 outline-none transition-colors focus:border-brand-500"
                />
              </div>

              <div className="grid gap-2 sm:grid-cols-2">
                <div className="grid gap-2">
                  <label
                    htmlFor="email"
                    className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-700"
                  >
                    Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    className="rounded-xl border border-border bg-background px-4 py-3 text-sm text-brand-900 outline-none transition-colors focus:border-brand-500"
                  />
                </div>
                <div className="grid gap-2">
                  <label
                    htmlFor="company"
                    className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-700"
                  >
                    Company
                  </label>
                  <input
                    id="company"
                    name="company"
                    type="text"
                    className="rounded-xl border border-border bg-background px-4 py-3 text-sm text-brand-900 outline-none transition-colors focus:border-brand-500"
                  />
                </div>
              </div>

              <div className="grid gap-2">
                <label
                  htmlFor="interest"
                  className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-700"
                >
                  I&apos;m interested in
                </label>
                <select
                  id="interest"
                  name="interest"
                  className="rounded-xl border border-border bg-background px-4 py-3 text-sm text-brand-900 outline-none transition-colors focus:border-brand-500"
                  defaultValue=""
                >
                  <option value="" disabled>
                    Select an option
                  </option>
                  <option value="brand-partnership">
                    Brand partnership / distribution
                  </option>
                  <option value="retail-stocking">
                    Stocking products as a retailer
                  </option>
                  <option value="hospital-pharmacy">
                    Hospital / pharmacy supply
                  </option>
                  <option value="general">General enquiry</option>
                </select>
              </div>

              <div className="grid gap-2">
                <label
                  htmlFor="message"
                  className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-700"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  required
                  className="rounded-xl border border-border bg-background px-4 py-3 text-sm text-brand-900 outline-none transition-colors focus:border-brand-500"
                />
              </div>

              <button
                type="submit"
                className="mt-2 inline-flex items-center justify-center bg-brand-900 px-8 py-4 text-[11px] font-semibold uppercase tracking-[0.28em] text-white transition-colors hover:bg-brand-700"
              >
                Send message
              </button>
            </div>
          </form>
        </div>
      </section>
    </>
  );
}
