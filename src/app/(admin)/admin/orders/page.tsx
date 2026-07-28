"use client";

import { useState } from "react";
import { listAdminOrders, updateOrder } from "@/lib/api/admin";
import { formatPrice } from "@/lib/product";
import { useAuth } from "@/context/auth";
import {
  AdminPage,
  Card,
  EmptyState,
  ErrorState,
  FormError,
  GhostButton,
  LoadingState,
  Modal,
  PrimaryButton,
  SelectInput,
  StatusBadge,
  errorMessage,
  useAdminData,
} from "@/components/admin/ui";
import {
  ORDER_STATUSES,
  PAYMENT_STATUSES,
  orderStatusTone,
  paymentStatusTone,
} from "@/components/admin/orderMeta";
import type { ApiOrder, OrderStatus, PaymentStatus } from "@/lib/api/types";

export default function AdminOrdersPage() {
  const { data, loading, error, reload } = useAdminData<ApiOrder[]>((t) =>
    listAdminOrders(t).then((r) => r.data ?? []),
  );
  const [selected, setSelected] = useState<ApiOrder | null>(null);

  const orders = data ?? [];

  return (
    <AdminPage title="Orders" subtitle="Track and fulfil customer orders.">
      {loading ? (
        <LoadingState />
      ) : error ? (
        <ErrorState message={error} />
      ) : orders.length === 0 ? (
        <EmptyState message="No orders yet." />
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
                <th className="px-5 py-3 text-right font-semibold">Manage</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {orders.map((o) => (
                <tr key={o.id} className="text-brand-900/85">
                  <td className="px-5 py-4 font-semibold text-brand-900">
                    {o.reference}
                  </td>
                  <td className="px-5 py-4">
                    <span className="block">{o.customer_name}</span>
                    <span className="text-xs text-brand-900/55">
                      {o.customer_phone}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <StatusBadge
                      label={o.status_label || o.status}
                      tone={orderStatusTone(o.status)}
                    />
                  </td>
                  <td className="px-5 py-4">
                    <StatusBadge
                      label={o.payment_status}
                      tone={paymentStatusTone(o.payment_status)}
                    />
                  </td>
                  <td className="px-5 py-4 text-right font-semibold text-brand-900">
                    {formatPrice(o.total)}
                  </td>
                  <td className="px-5 py-4 text-right">
                    <GhostButton onClick={() => setSelected(o)}>View</GhostButton>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      )}

      {selected && (
        <OrderModal
          order={selected}
          onClose={() => setSelected(null)}
          onSaved={() => {
            setSelected(null);
            reload();
          }}
        />
      )}
    </AdminPage>
  );
}

function OrderModal({
  order,
  onClose,
  onSaved,
}: {
  order: ApiOrder;
  onClose: () => void;
  onSaved: () => void;
}) {
  const { token } = useAuth();
  const [status, setStatus] = useState<string>(order.status);
  const [paymentStatus, setPaymentStatus] = useState<string>(
    order.payment_status,
  );
  const [saving, setSaving] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  const handleSave = async () => {
    if (!token) return;
    setErr(null);
    setSaving(true);
    try {
      await updateOrder(token, order.id, {
        status: status as OrderStatus,
        payment_status: paymentStatus as PaymentStatus,
      });
      onSaved();
    } catch (error) {
      setErr(errorMessage(error));
    } finally {
      setSaving(false);
    }
  };

  return (
    <Modal open onClose={onClose} title={`Order ${order.reference}`}>
      <div className="grid gap-5">
        <div className="grid gap-1 text-sm">
          <p className="font-semibold text-brand-900">{order.customer_name}</p>
          <p className="text-brand-900/70">{order.customer_email}</p>
          <p className="text-brand-900/70">{order.customer_phone}</p>
          <p className="mt-2 text-brand-900/70">
            {order.address}, {order.city}, {order.state}
          </p>
          {order.notes && (
            <p className="mt-2 text-brand-900/60">Notes: {order.notes}</p>
          )}
        </div>

        <div className="border-t border-border pt-4">
          <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-brand-700">
            Items
          </p>
          <ul className="divide-y divide-border border-y border-border">
            {order.items?.map((item, idx) => (
              <li
                key={idx}
                className="flex items-center justify-between gap-4 py-2.5 text-sm"
              >
                <span className="text-brand-900">
                  {item.product_name}{" "}
                  <span className="text-brand-900/55">× {item.quantity}</span>
                </span>
                <span className="font-semibold text-brand-900">
                  {formatPrice(item.subtotal ?? item.price)}
                </span>
              </li>
            ))}
          </ul>
          <div className="mt-3 flex justify-between text-base font-semibold text-brand-900">
            <span>Total</span>
            <span>{formatPrice(order.total)}</span>
          </div>
        </div>

        <div className="grid gap-4 border-t border-border pt-4 sm:grid-cols-2">
          <SelectInput
            id="status"
            label="Order status"
            value={status}
            onChange={setStatus}
            options={ORDER_STATUSES.map((s) => ({ value: s, label: s }))}
          />
          <SelectInput
            id="payment"
            label="Payment status"
            value={paymentStatus}
            onChange={setPaymentStatus}
            options={PAYMENT_STATUSES.map((s) => ({ value: s, label: s }))}
          />
        </div>

        <FormError message={err} />
        <div className="flex justify-end gap-3">
          <GhostButton onClick={onClose}>Close</GhostButton>
          <PrimaryButton onClick={handleSave} disabled={saving}>
            {saving ? "Saving…" : "Save changes"}
          </PrimaryButton>
        </div>
      </div>
    </Modal>
  );
}
