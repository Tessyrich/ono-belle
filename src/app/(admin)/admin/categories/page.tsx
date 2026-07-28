"use client";

import { useState } from "react";
import {
  createCategory,
  deleteCategory,
  listAdminCategories,
  updateCategory,
} from "@/lib/api/admin";
import { useAuth } from "@/context/auth";
import {
  AdminPage,
  Card,
  Checkbox,
  EmptyState,
  ErrorState,
  FormError,
  GhostButton,
  LoadingState,
  Modal,
  PrimaryButton,
  StatusBadge,
  TextArea,
  TextInput,
  errorMessage,
  useAdminData,
} from "@/components/admin/ui";
import type { ApiCategory } from "@/lib/api/types";

export default function AdminCategoriesPage() {
  const { token } = useAuth();
  const { data, loading, error, reload } = useAdminData<ApiCategory[]>((t) =>
    listAdminCategories(t).then((r) => r.data ?? []),
  );
  const [editing, setEditing] = useState<ApiCategory | null>(null);
  const [creating, setCreating] = useState(false);

  const categories = data ?? [];

  return (
    <AdminPage
      title="Categories"
      subtitle="Organise products into shoppable groups."
      action={
        <PrimaryButton onClick={() => setCreating(true)}>
          + New category
        </PrimaryButton>
      }
    >
      {loading ? (
        <LoadingState />
      ) : error ? (
        <ErrorState message={error} />
      ) : categories.length === 0 ? (
        <EmptyState message="No categories yet. Add your first one." />
      ) : (
        <Card className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-muted/40 text-left text-[10px] uppercase tracking-[0.2em] text-brand-700/70">
              <tr>
                <th className="px-5 py-3 font-semibold">Name</th>
                <th className="px-5 py-3 font-semibold">Slug</th>
                <th className="px-5 py-3 font-semibold">Status</th>
                <th className="px-5 py-3 text-right font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {categories.map((c) => (
                <tr key={c.id} className="text-brand-900/85">
                  <td className="px-5 py-4 font-semibold text-brand-900">
                    {c.name}
                  </td>
                  <td className="px-5 py-4 text-brand-900/60">{c.slug}</td>
                  <td className="px-5 py-4">
                    {c.is_active ? (
                      <StatusBadge label="Active" tone="success" />
                    ) : (
                      <StatusBadge label="Hidden" tone="neutral" />
                    )}
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex justify-end gap-2">
                      <GhostButton onClick={() => setEditing(c)}>Edit</GhostButton>
                      <DeleteCategoryButton
                        token={token}
                        category={c}
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
        <CategoryModal
          token={token}
          category={editing}
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
    </AdminPage>
  );
}

function DeleteCategoryButton({
  token,
  category,
  onDeleted,
}: {
  token: string | null;
  category: ApiCategory;
  onDeleted: () => void;
}) {
  const [busy, setBusy] = useState(false);
  const handle = async () => {
    if (!token) return;
    if (!window.confirm(`Delete category "${category.name}"?`)) return;
    setBusy(true);
    try {
      await deleteCategory(token, category.id);
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

function CategoryModal({
  token,
  category,
  onClose,
  onSaved,
}: {
  token: string | null;
  category: ApiCategory | null;
  onClose: () => void;
  onSaved: () => void;
}) {
  const isEdit = !!category;
  const [name, setName] = useState(category?.name ?? "");
  const [description, setDescription] = useState(category?.description ?? "");
  const [isActive, setIsActive] = useState(category?.is_active ?? true);
  const [saving, setSaving] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  const handleSave = async () => {
    if (!token) return;
    setErr(null);
    setSaving(true);
    try {
      if (isEdit && category) {
        await updateCategory(token, category.id, {
          name,
          description: description || null,
          is_active: isActive,
        });
      } else {
        await createCategory(token, { name, description: description || null });
      }
      onSaved();
    } catch (error) {
      setErr(errorMessage(error));
    } finally {
      setSaving(false);
    }
  };

  return (
    <Modal open onClose={onClose} title={isEdit ? "Edit category" : "New category"}>
      <div className="grid gap-4">
        <TextInput id="name" label="Name" value={name} onChange={setName} required />
        <TextArea
          id="description"
          label="Description"
          value={description}
          onChange={setDescription}
        />
        {isEdit && (
          <Checkbox
            id="active"
            label="Active (visible on storefront)"
            checked={isActive}
            onChange={setIsActive}
          />
        )}
        <FormError message={err} />
        <div className="flex justify-end gap-3 pt-2">
          <GhostButton onClick={onClose}>Cancel</GhostButton>
          <PrimaryButton onClick={handleSave} disabled={saving}>
            {saving ? "Saving…" : isEdit ? "Save changes" : "Create category"}
          </PrimaryButton>
        </div>
      </div>
    </Modal>
  );
}
