"use client";

import { useState } from "react";
import {
  createCustomer,
  deleteCustomer,
  getCustomer,
  listCustomers,
  updateCustomer,
  type CustomerInput,
} from "@/lib/api/admin";
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
  StatusBadge,
  TextInput,
  errorMessage,
  useAdminData,
} from "@/components/admin/ui";
import { orderStatusTone } from "@/components/admin/orderMeta";
import type { ApiCustomer } from "@/lib/api/types";

export default function AdminCustomersPage() {
  const { token } = useAuth();
  const { data, loading, error, reload } = useAdminData<ApiCustomer[]>((t) =>
    listCustomers(t).then((r) => r.data ?? []),
  );
  const [viewing, setViewing] = useState<ApiCustomer | null>(null);
  const [detail, setDetail] = useState<ApiCustomer | null>(null);
  const [detailErr, setDetailErr] = useState<string | null>(null);
  const [editing, setEditing] = useState<ApiCustomer | null>(null);
  const [creating, setCreating] = useState(false);

  const customers = data ?? [];

  const view = async (c: ApiCustomer) => {
    setViewing(c);
    setDetail(null);
    setDetailErr(null);
    if (!token) return;
    try {
      setDetail(await getCustomer(token, c.id));
    } catch (err) {
      setDetailErr(errorMessage(err));
    }
  };

  return (
    <AdminPage
      title="Customers"
      subtitle="People who have ordered from you."
      action={
        <PrimaryButton onClick={() => setCreating(true)}>
          + New customer
        </PrimaryButton>
      }
    >
      {loading ? (
        <LoadingState />
      ) : error ? (
        <ErrorState message={error} />
      ) : customers.length === 0 ? (
        <EmptyState message="No customers yet." />
      ) : (
        <Card className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-muted/40 text-left text-[10px] uppercase tracking-[0.2em] text-brand-700/70">
              <tr>
                <th className="px-5 py-3 font-semibold">Name</th>
                <th className="px-5 py-3 font-semibold">Email</th>
                <th className="px-5 py-3 font-semibold">Phone</th>
                <th className="px-5 py-3 font-semibold">Orders</th>
                <th className="px-5 py-3 text-right font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {customers.map((c) => (
                <tr key={c.id} className="text-brand-900/85">
                  <td className="px-5 py-4 font-semibold text-brand-900">
                    {c.name}
                  </td>
                  <td className="px-5 py-4 text-brand-900/65">{c.email}</td>
                  <td className="px-5 py-4 text-brand-900/65">{c.phone}</td>
                  <td className="px-5 py-4">{c.orders_count ?? "—"}</td>
                  <td className="px-5 py-4">
                    <div className="flex justify-end gap-2">
                      <GhostButton onClick={() => view(c)}>View</GhostButton>
                      <GhostButton onClick={() => setEditing(c)}>Edit</GhostButton>
                      <DeleteCustomerButton
                        token={token}
                        customer={c}
                        onDeleted={reload}
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      )}

      {(creating || editing) && (
        <CustomerModal
          token={token}
          customer={editing}
          onClose={() => {
            setCreating(false);
            setEditing(null);
          }}
          onSaved={() => {
            setCreating(false);
            setEditing(null);
            reload();
          }}
        />
      )}

      {viewing && (
        <Modal open onClose={() => setViewing(null)} title={viewing.name}>
          <div className="grid gap-4 text-sm">
            <div>
              <p className="text-brand-900/70">{viewing.email}</p>
              <p className="text-brand-900/70">{viewing.phone}</p>
            </div>

            <div className="border-t border-border pt-4">
              <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-brand-700">
                Orders
              </p>
              {detailErr ? (
                <p className="text-sm text-red-600">{detailErr}</p>
              ) : !detail ? (
                <p className="text-brand-900/55">Loading orders…</p>
              ) : detail.orders && detail.orders.length > 0 ? (
                <ul className="divide-y divide-border border-y border-border">
                  {detail.orders.map((o) => (
                    <li
                      key={o.id}
                      className="flex items-center justify-between gap-4 py-2.5"
                    >
                      <span className="font-semibold text-brand-900">
                        {o.reference}
                      </span>
                      <StatusBadge
                        label={o.status_label || o.status}
                        tone={orderStatusTone(o.status)}
                      />
                      <span className="font-semibold text-brand-900">
                        {formatPrice(o.total)}
                      </span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-brand-900/55">No orders.</p>
              )}
            </div>
          </div>
        </Modal>
      )}
    </AdminPage>
  );
}

function DeleteCustomerButton({
  token,
  customer,
  onDeleted,
}: {
  token: string | null;
  customer: ApiCustomer;
  onDeleted: () => void;
}) {
  const [busy, setBusy] = useState(false);
  const handle = async () => {
    if (!token) return;
    if (!window.confirm(`Delete customer "${customer.name}"?`)) return;
    setBusy(true);
    try {
      await deleteCustomer(token, customer.id);
      onDeleted();
    } catch (err) {
      window.alert(errorMessage(err));
    } finally {
      setBusy(false);
    }
  };
  return (
    <GhostButton onClick={handle} disabled={busy}>
      {busy ? "…" : "Delete"}
    </GhostButton>
  );
}

function CustomerModal({
  token,
  customer,
  onClose,
  onSaved,
}: {
  token: string | null;
  customer: ApiCustomer | null;
  onClose: () => void;
  onSaved: () => void;
}) {
  const isEdit = !!customer;
  const [name, setName] = useState(customer?.name ?? "");
  const [email, setEmail] = useState(customer?.email ?? "");
  const [phone, setPhone] = useState(customer?.phone ?? "");
  const [saving, setSaving] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  const handleSave = async () => {
    if (!token) return;
    setErr(null);
    setSaving(true);
    const body: CustomerInput = { name, email, phone: phone || null };
    try {
      if (isEdit && customer) await updateCustomer(token, customer.id, body);
      else await createCustomer(token, body);
      onSaved();
    } catch (error) {
      setErr(errorMessage(error));
    } finally {
      setSaving(false);
    }
  };

  return (
    <Modal open onClose={onClose} title={isEdit ? "Edit customer" : "New customer"}>
      <div className="grid gap-4">
        <TextInput id="name" label="Name" value={name} onChange={setName} required />
        <TextInput
          id="email"
          label="Email"
          type="email"
          value={email}
          onChange={setEmail}
          required
        />
        <TextInput
          id="phone"
          label="Phone"
          value={phone}
          onChange={setPhone}
        />
        <FormError message={err} />
        <div className="flex justify-end gap-3 pt-2">
          <GhostButton onClick={onClose}>Cancel</GhostButton>
          <PrimaryButton onClick={handleSave} disabled={saving}>
            {saving ? "Saving…" : isEdit ? "Save changes" : "Create customer"}
          </PrimaryButton>
        </div>
      </div>
    </Modal>
  );
}
