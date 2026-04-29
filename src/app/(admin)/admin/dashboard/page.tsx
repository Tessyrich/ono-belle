import type { Metadata } from "next";
import { products, formatNaira } from "@/data/products";

export const metadata: Metadata = {
  title: "Admin Dashboard",
  description: "Ono Belle admin dashboard.",
};

const stats = [
  { label: "Revenue (this month)", value: "₦4.82M", trend: "+12.4%" },
  { label: "Orders", value: "184", trend: "+8.1%" },
  { label: "Customers", value: "612", trend: "+24" },
  { label: "Avg. order value", value: "₦26,200", trend: "+₦1,400" },
];

const recentOrders = [
  {
    id: "ORD-1042",
    customer: "Adaeze Okafor",
    total: 24600,
    status: "Pending",
    channel: "WhatsApp",
    date: "29 Apr",
  },
  {
    id: "ORD-1041",
    customer: "Tolu Bakare",
    total: 18500,
    status: "Confirmed",
    channel: "Web",
    date: "29 Apr",
  },
  {
    id: "ORD-1040",
    customer: "Funmi Adeyemi",
    total: 9600,
    status: "Shipped",
    channel: "WhatsApp",
    date: "28 Apr",
  },
  {
    id: "ORD-1039",
    customer: "Ngozi Eze",
    total: 31400,
    status: "Confirmed",
    channel: "Web",
    date: "28 Apr",
  },
  {
    id: "ORD-1038",
    customer: "Ifeoma Nwosu",
    total: 14200,
    status: "Delivered",
    channel: "Web",
    date: "27 Apr",
  },
];

const statusColors: Record<string, string> = {
  Pending: "bg-accent-200 text-accent-600",
  Confirmed: "bg-brand-100 text-brand-700",
  Shipped: "bg-brand-200 text-brand-900",
  Delivered: "bg-brand-500/15 text-brand-700",
};

export default function AdminDashboardPage() {
  const top = products.slice(0, 5);

  return (
    <div className="mx-auto w-full max-w-6xl px-6 py-10 sm:py-14">
      <header className="mb-10">
        <span className="text-[11px] font-semibold uppercase tracking-[0.32em] text-accent-600">
          Overview
        </span>
        <h1 className="mt-2 font-serif text-3xl text-brand-900 sm:text-4xl">
          Welcome back.
        </h1>
        <p className="mt-2 text-sm text-brand-900/65">
          Here&apos;s what&apos;s happening across distribution today.
        </p>
      </header>

      {/* Stats */}
      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="border border-border bg-surface p-6 shadow-sm"
          >
            <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-brand-700/60">
              {stat.label}
            </p>
            <p className="mt-3 font-serif text-3xl text-brand-900">
              {stat.value}
            </p>
            <p className="mt-2 text-xs font-semibold text-brand-500">
              {stat.trend}
            </p>
          </div>
        ))}
      </section>

      {/* Recent orders */}
      <section id="orders" className="mt-12 scroll-mt-20">
        <div className="mb-5 flex items-end justify-between gap-4">
          <h2 className="font-serif text-2xl text-brand-900">Recent orders</h2>
          <button
            type="button"
            className="text-[11px] font-semibold uppercase tracking-[0.22em] text-brand-900/60 hover:text-brand-900"
          >
            View all →
          </button>
        </div>

        <div className="overflow-x-auto border border-border bg-surface shadow-sm">
          <table className="w-full text-sm">
            <thead className="bg-muted/40 text-left text-[10px] uppercase tracking-[0.2em] text-brand-700/70">
              <tr>
                <th className="px-5 py-3 font-semibold">Order</th>
                <th className="px-5 py-3 font-semibold">Customer</th>
                <th className="px-5 py-3 font-semibold">Channel</th>
                <th className="px-5 py-3 font-semibold">Status</th>
                <th className="px-5 py-3 font-semibold">Date</th>
                <th className="px-5 py-3 text-right font-semibold">Total</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {recentOrders.map((order) => (
                <tr key={order.id} className="text-brand-900/85">
                  <td className="px-5 py-4 font-semibold text-brand-900">
                    {order.id}
                  </td>
                  <td className="px-5 py-4">{order.customer}</td>
                  <td className="px-5 py-4 text-brand-900/65">
                    {order.channel}
                  </td>
                  <td className="px-5 py-4">
                    <span
                      className={`inline-flex px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] ${
                        statusColors[order.status] ??
                        "bg-muted text-brand-900"
                      }`}
                    >
                      {order.status}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-brand-900/65">{order.date}</td>
                  <td className="px-5 py-4 text-right font-semibold text-brand-900">
                    {formatNaira(order.total)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Top products + Customers grid */}
      <section className="mt-12 grid gap-6 lg:grid-cols-[1.4fr_1fr]">
        <div id="products" className="scroll-mt-20">
          <div className="mb-5 flex items-end justify-between gap-4">
            <h2 className="font-serif text-2xl text-brand-900">Top products</h2>
            <button
              type="button"
              className="text-[11px] font-semibold uppercase tracking-[0.22em] text-brand-900/60 hover:text-brand-900"
            >
              Manage products →
            </button>
          </div>

          <ul className="divide-y divide-border border border-border bg-surface shadow-sm">
            {top.map((p, idx) => (
              <li
                key={p.id}
                className="flex items-center justify-between gap-4 px-5 py-4"
              >
                <div className="flex items-center gap-4">
                  <span className="grid h-8 w-8 place-items-center bg-muted/60 font-serif text-sm text-brand-900">
                    {idx + 1}
                  </span>
                  <div>
                    <p className="font-semibold text-brand-900">{p.name}</p>
                    <p className="text-xs text-brand-900/55">
                      {p.brand} · {p.size}
                    </p>
                  </div>
                </div>
                <p className="text-sm font-semibold text-brand-900">
                  {formatNaira(p.price)}
                </p>
              </li>
            ))}
          </ul>
        </div>

        <div id="customers" className="scroll-mt-20">
          <div className="mb-5 flex items-end justify-between gap-4">
            <h2 className="font-serif text-2xl text-brand-900">Customers</h2>
          </div>

          <div className="space-y-4">
            <div className="border border-border bg-surface p-6 shadow-sm">
              <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-brand-700/60">
                New this week
              </p>
              <p className="mt-3 font-serif text-3xl text-brand-900">42</p>
              <p className="mt-1 text-xs text-brand-500">+18% vs. last week</p>
            </div>
            <div className="border border-border bg-surface p-6 shadow-sm">
              <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-brand-700/60">
                Repeat purchase rate
              </p>
              <p className="mt-3 font-serif text-3xl text-brand-900">38%</p>
              <p className="mt-1 text-xs text-brand-500">+4 pp this quarter</p>
            </div>
            <div className="border border-border bg-surface p-6 shadow-sm">
              <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-brand-700/60">
                NPS
              </p>
              <p className="mt-3 font-serif text-3xl text-brand-900">71</p>
              <p className="mt-1 text-xs text-brand-500">Excellent</p>
            </div>
          </div>
        </div>
      </section>

      {/* Settings stub */}
      <section
        id="settings"
        className="mt-12 scroll-mt-20 border border-border bg-surface p-7 shadow-sm"
      >
        <h2 className="font-serif text-2xl text-brand-900">Quick settings</h2>
        <p className="mt-2 text-sm text-brand-900/65">
          A real backend will replace these stubs. For now this page is static.
        </p>
        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          <div className="border border-border p-5">
            <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-brand-700/60">
              Store status
            </p>
            <p className="mt-2 text-base font-semibold text-brand-900">Open</p>
          </div>
          <div className="border border-border p-5">
            <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-brand-700/60">
              Payment
            </p>
            <p className="mt-2 text-base font-semibold text-brand-900">
              WhatsApp + bank transfer
            </p>
          </div>
          <div className="border border-border p-5">
            <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-brand-700/60">
              Delivery
            </p>
            <p className="mt-2 text-base font-semibold text-brand-900">
              Nationwide · 3–7 days
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
