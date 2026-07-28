"use client";

import { listInventoryLogs, listAdminProducts } from "@/lib/api/admin";
import {
  AdminPage,
  Card,
  EmptyState,
  ErrorState,
  LoadingState,
  useAdminData,
} from "@/components/admin/ui";
import type { ApiInventoryLog, ApiProduct } from "@/lib/api/types";

function formatDate(value: string | null): string {
  if (!value) return "—";
  const d = new Date(value);
  return Number.isNaN(d.getTime()) ? "—" : d.toLocaleString();
}

export default function AdminInventoryPage() {
  const { data, loading, error } = useAdminData<{
    logs: ApiInventoryLog[];
    products: ApiProduct[];
  }>(async (t) => {
    const [logs, products] = await Promise.all([
      listInventoryLogs(t).then((r) => r.data ?? []),
      listAdminProducts(t)
        .then((r) => r.data ?? [])
        .catch(() => []),
    ]);
    return { logs, products };
  });

  const logs = data?.logs ?? [];
  const nameById = new Map((data?.products ?? []).map((p) => [p.id, p.name]));

  return (
    <AdminPage
      title="Inventory history"
      subtitle="Every stock movement across the catalogue."
    >
      {loading ? (
        <LoadingState />
      ) : error ? (
        <ErrorState message={error} />
      ) : logs.length === 0 ? (
        <EmptyState message="No stock movements recorded yet." />
      ) : (
        <Card className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-muted/40 text-left text-[10px] uppercase tracking-[0.2em] text-brand-700/70">
              <tr>
                <th className="px-5 py-3 font-semibold">Date</th>
                <th className="px-5 py-3 font-semibold">Product</th>
                <th className="px-5 py-3 font-semibold">Type</th>
                <th className="px-5 py-3 font-semibold">Reason</th>
                <th className="px-5 py-3 text-right font-semibold">Change</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {logs.map((log) => (
                <tr key={log.id} className="text-brand-900/85">
                  <td className="px-5 py-4 text-brand-900/65">
                    {formatDate(log.created_at)}
                  </td>
                  <td className="px-5 py-4 font-semibold text-brand-900">
                    {nameById.get(log.product_id) ?? log.product_id}
                  </td>
                  <td className="px-5 py-4 text-brand-900/70">{log.type}</td>
                  <td className="px-5 py-4 text-brand-900/60">
                    {log.reason ?? "—"}
                  </td>
                  <td
                    className={`px-5 py-4 text-right font-semibold ${
                      log.quantity < 0 ? "text-red-600" : "text-brand-700"
                    }`}
                  >
                    {log.quantity > 0 ? `+${log.quantity}` : log.quantity}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      )}
    </AdminPage>
  );
}
