"use client";

import Link from "next/link";
import { listAdminOrders } from "@/lib/api/admin";
import { listAdminProducts } from "@/lib/api/admin";
import { listCustomers } from "@/lib/api/admin";
import { formatPrice, formatNaira } from "@/lib/product";
import {
  AdminPage,
  Card,
  ErrorState,
  LoadingState,
  StatusBadge,
  useAdminData,
} from "@/components/admin/ui";
import { orderStatusTone } from "@/components/admin/orderMeta";
import type { ApiCustomer, ApiOrder, ApiProduct } from "@/lib/api/types";

export default function AdminDashboardPage() {
  const { data, loading, error } = useAdminData<
    [ApiOrder[], ApiProduct[], ApiCustomer[]]
  >(async (token) => {
    const [orders, products, customers] = await Promise.all([
      listAdminOrders(token).then((r) => r.data ?? []),
      listAdminProducts(token).then((r) => r.data ?? []),
      listCustomers(token)
        .then((r) => r.data ?? [])
        .catch(() => []),
    ]);
    return [orders, products, customers];
  });

  if (loading) {
    return (
      <AdminPage title="Overview" subtitle="Welcome back.">
        <LoadingState />
      </AdminPage>
    );
  }
  if (error || !data) {
    return (
      <AdminPage title="Overview" subtitle="Welcome back.">
        <ErrorState message={error ?? "Could not load dashboard."} />
      </AdminPage>
    );
  }

  const [orders, products, customers] = data;
  const gross = orders.reduce((sum, o) => sum + Number(o.total || 0), 0);
  const pending = orders.filter((o) => o.status === "pending").length;
  const lowStock = products.filter((p) => p.stock_quantity <= 5).length;

  const stats = [
    { label: "Gross order value", value: formatNaira(gross) },
    { label: "Orders", value: String(orders.length), hint: `${pending} pending` },
    { label: "Products", value: String(products.length), hint: `${lowStock} low stock` },
    { label: "Customers", value: String(customers.length) },
  ];

  const recent = orders.slice(0, 6);

  return (
    <AdminPage title="Overview" subtitle="What's happening across the store today.">
      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.label} className="p-6">
            <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-brand-700/60">
              {stat.label}
            </p>
            <p className="mt-3 font-display text-3xl text-brand-900">
              {stat.value}
            </p>
            {stat.hint && (
              <p className="mt-2 text-xs font-semibold text-brand-500">
                {stat.hint}
              </p>
            )}
          </Card>
        ))}
      </section>

      <section className="mt-12">
        <div className="mb-5 flex items-end justify-between gap-4">
          <h2 className="font-display text-2xl text-brand-900">Recent orders</h2>
          <Link
            href="/admin/orders"
            className="text-[11px] font-semibold uppercase tracking-[0.22em] text-brand-900/60 hover:text-brand-900"
          >
            View all →
          </Link>
        </div>

        {recent.length === 0 ? (
          <Card className="p-10 text-center text-sm text-brand-900/55">
            No orders yet.
          </Card>
        ) : (
          <Card className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-muted/40 text-left text-[10px] uppercase tracking-[0.2em] text-brand-700/70">
                <tr>
                  <th className="px-5 py-3 font-semibold">Reference</th>
                  <th className="px-5 py-3 font-semibold">Customer</th>
                  <th className="px-5 py-3 font-semibold">Status</th>
                  <th className="px-5 py-3 font-semibold">Payment</th>
                  <th className="px-5 py-3 text-right font-semibold">Total</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {recent.map((order) => (
                  <tr key={order.id} className="text-brand-900/85">
                    <td className="px-5 py-4 font-semibold text-brand-900">
                      <Link
                        href="/admin/orders"
                        className="hover:text-brand-700"
                      >
                        {order.reference}
                      </Link>
                    </td>
                    <td className="px-5 py-4">{order.customer_name}</td>
                    <td className="px-5 py-4">
                      <StatusBadge
                        label={order.status_label || order.status}
                        tone={orderStatusTone(order.status)}
                      />
                    </td>
                    <td className="px-5 py-4 text-brand-900/65">
                      {order.payment_status}
                    </td>
                    <td className="px-5 py-4 text-right font-semibold text-brand-900">
                      {formatPrice(order.total)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Card>
        )}
      </section>
    </AdminPage>
  );
}
