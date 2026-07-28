import type { Metadata } from "next";
import OrderTrackView from "@/components/OrderTrackView";

export const metadata: Metadata = {
  title: "Track your order",
  description:
    "Check the status of your Ono Belle order using your order reference and email.",
};

export default function TrackPage() {
  return (
    <section className="bg-background">
      <div className="mx-auto w-full max-w-3xl px-6 py-16 sm:py-20">
        <span className="text-[11px] font-semibold uppercase tracking-[0.32em] text-accent-600">
          Order tracking
        </span>
        <h1 className="mt-2 font-display text-3xl text-brand-900 sm:text-5xl">
          Where&apos;s my order?
        </h1>
        <p className="mt-3 max-w-xl text-sm text-brand-900/65">
          Enter the order reference we sent you along with the email you checked
          out with.
        </p>
        <div className="mt-10">
          <OrderTrackView />
        </div>
      </div>
    </section>
  );
}
