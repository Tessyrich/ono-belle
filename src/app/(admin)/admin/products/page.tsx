"use client";

import { useCallback, useEffect, useState } from "react";
import {
  createProduct,
  deleteProduct,
  getProductInventoryLogs,
  listAdminCategories,
  listAdminProducts,
  updateProduct,
  updateProductStock,
  uploadImage,
  type ProductInput,
} from "@/lib/api/admin";
import { formatPrice } from "@/lib/product";
import { useAuth } from "@/context/auth";
import {
  AdminPage,
  Card,
  Checkbox,
  EmptyState,
  ErrorState,
  FormError,
  GhostButton,
  Label,
  LoadingState,
  Modal,
  PrimaryButton,
  SelectInput,
  StatusBadge,
  TextArea,
  TextInput,
  errorMessage,
  useAdminData,
} from "@/components/admin/ui";
import type {
  ApiCategory,
  ApiInventoryLog,
  ApiProduct,
} from "@/lib/api/types";

type FormState = {
  category_id: string;
  name: string;
  price: string;
  stock_quantity: string;
  short_description: string;
  full_description: string;
  images: string;
  is_active: boolean;
};

const emptyForm: FormState = {
  category_id: "",
  name: "",
  price: "",
  stock_quantity: "0",
  short_description: "",
  full_description: "",
  images: "",
  is_active: true,
};

export default function AdminProductsPage() {
  const { token } = useAuth();
  const { data, loading, error, reload } = useAdminData<{
    products: ApiProduct[];
    categories: ApiCategory[];
  }>(async (t) => {
    const [products, categories] = await Promise.all([
      listAdminProducts(t).then((r) => r.data ?? []),
      listAdminCategories(t).then((r) => r.data ?? []),
    ]);
    return { products, categories };
  });

  const [editing, setEditing] = useState<ApiProduct | null>(null);
  const [creating, setCreating] = useState(false);
  const [stockFor, setStockFor] = useState<ApiProduct | null>(null);

  const products = data?.products ?? [];
  const categories = data?.categories ?? [];

  return (
    <AdminPage
      title="Products"
      subtitle="Manage your storefront catalogue."
      action={
        <PrimaryButton
          onClick={() => setCreating(true)}
          disabled={categories.length === 0}
        >
          + New product
        </PrimaryButton>
      }
    >
      {loading ? (
        <LoadingState />
      ) : error ? (
        <ErrorState message={error} />
      ) : products.length === 0 ? (
        <EmptyState
          message={
            categories.length === 0
              ? "Create a category first, then add products."
              : "No products yet. Add your first one."
          }
        />
      ) : (
        <Card className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-muted/40 text-left text-[10px] uppercase tracking-[0.2em] text-brand-700/70">
              <tr>
                <th className="px-5 py-3 font-semibold">Product</th>
                <th className="px-5 py-3 font-semibold">Category</th>
                <th className="px-5 py-3 font-semibold">Stock</th>
                <th className="px-5 py-3 font-semibold">Status</th>
                <th className="px-5 py-3 font-semibold">Price</th>
                <th className="px-5 py-3 text-right font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {products.map((p) => (
                <tr key={p.id} className="text-brand-900/85">
                  <td className="px-5 py-4 font-semibold text-brand-900">
                    <div className="flex items-center gap-3">
                      <Thumb src={p.images?.[0]} alt={p.name} />
                      {p.name}
                    </div>
                  </td>
                  <td className="px-5 py-4 text-brand-900/65">
                    {p.category?.name ?? "—"}
                  </td>
                  <td className="px-5 py-4">
                    <button
                      type="button"
                      onClick={() => setStockFor(p)}
                      className="underline-offset-2 hover:underline"
                    >
                      {p.stock_quantity}
                    </button>
                  </td>
                  <td className="px-5 py-4">
                    {p.is_active ? (
                      <StatusBadge label="Active" tone="success" />
                    ) : (
                      <StatusBadge label="Hidden" tone="neutral" />
                    )}
                  </td>
                  <td className="px-5 py-4 font-semibold text-brand-900">
                    {formatPrice(p.price)}
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex justify-end gap-2">
                      <GhostButton onClick={() => setEditing(p)}>Edit</GhostButton>
                      <DeleteButton
                        token={token}
                        product={p}
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
        <ProductFormModal
          token={token}
          categories={categories}
          product={editing}
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

      {stockFor && (
        <StockModal
          token={token}
          product={stockFor}
          onClose={() => setStockFor(null)}
          onSaved={() => {
            setStockFor(null);
            reload();
          }}
        />
      )}
    </AdminPage>
  );
}

function DeleteButton({
  token,
  product,
  onDeleted,
}: {
  token: string | null;
  product: ApiProduct;
  onDeleted: () => void;
}) {
  const [busy, setBusy] = useState(false);
  const handle = async () => {
    if (!token) return;
    if (!window.confirm(`Delete "${product.name}"? This cannot be undone.`))
      return;
    setBusy(true);
    try {
      await deleteProduct(token, product.id);
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

function ProductFormModal({
  token,
  categories,
  product,
  onClose,
  onSaved,
}: {
  token: string | null;
  categories: ApiCategory[];
  product: ApiProduct | null;
  onClose: () => void;
  onSaved: () => void;
}) {
  const isEdit = !!product;
  const [form, setForm] = useState<FormState>(
    product
      ? {
          category_id: product.category_id,
          name: product.name,
          price: String(Number(product.price)),
          stock_quantity: String(product.stock_quantity),
          short_description: product.short_description ?? "",
          full_description: product.full_description ?? "",
          images: (product.images ?? []).join("\n"),
          is_active: product.is_active,
        }
      : { ...emptyForm, category_id: categories[0]?.id ?? "" },
  );
  const [saving, setSaving] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  const set = (k: keyof FormState, v: string | boolean) =>
    setForm((f) => ({ ...f, [k]: v }));

  const handleSave = async () => {
    if (!token) return;
    setErr(null);
    setSaving(true);
    const images = form.images
      .split(/[\n,]/)
      .map((s) => s.trim())
      .filter(Boolean);
    try {
      if (isEdit && product) {
        const body: Partial<ProductInput> = {
          category_id: form.category_id,
          name: form.name,
          price: Number(form.price),
          short_description: form.short_description || null,
          full_description: form.full_description || null,
          images: images.length ? images : null,
          is_active: form.is_active,
        };
        await updateProduct(token, product.id, body);
      } else {
        const body: ProductInput = {
          category_id: form.category_id,
          name: form.name,
          price: Number(form.price),
          stock_quantity: Number(form.stock_quantity),
          short_description: form.short_description || null,
          full_description: form.full_description || null,
          images: images.length ? images : null,
        };
        await createProduct(token, body);
      }
      onSaved();
    } catch (error) {
      setErr(errorMessage(error));
    } finally {
      setSaving(false);
    }
  };

  return (
    <Modal open onClose={onClose} title={isEdit ? "Edit product" : "New product"}>
      <div className="grid gap-4">
        <SelectInput
          id="category"
          label="Category"
          value={form.category_id}
          onChange={(v) => set("category_id", v)}
          options={categories.map((c) => ({ value: c.id, label: c.name }))}
        />
        <TextInput
          id="name"
          label="Name"
          value={form.name}
          onChange={(v) => set("name", v)}
          required
        />
        <div className="grid gap-4 sm:grid-cols-2">
          <TextInput
            id="price"
            label="Price (₦)"
            type="number"
            value={form.price}
            onChange={(v) => set("price", v)}
            required
          />
          {!isEdit && (
            <TextInput
              id="stock"
              label="Initial stock"
              type="number"
              value={form.stock_quantity}
              onChange={(v) => set("stock_quantity", v)}
              required
            />
          )}
        </div>
        <TextInput
          id="short"
          label="Short description"
          value={form.short_description}
          onChange={(v) => set("short_description", v)}
        />
        <TextArea
          id="full"
          label="Full description"
          value={form.full_description}
          onChange={(v) => set("full_description", v)}
        />
        <div className="grid gap-2">
          <ImageUploader
            token={token}
            onUploaded={(url) =>
              set("images", form.images ? `${form.images}\n${url}` : url)
            }
          />
          <ImagePreviews
            urls={parseImages(form.images)}
            onRemove={(url) =>
              set(
                "images",
                parseImages(form.images)
                  .filter((u) => u !== url)
                  .join("\n"),
              )
            }
          />
          <TextArea
            id="images"
            label="Image URLs (one per line)"
            rows={3}
            value={form.images}
            onChange={(v) => set("images", v)}
          />
        </div>
        {isEdit && (
          <Checkbox
            id="active"
            label="Active (visible on storefront)"
            checked={form.is_active}
            onChange={(v) => set("is_active", v)}
          />
        )}
        <FormError message={err} />
        <div className="flex justify-end gap-3 pt-2">
          <GhostButton onClick={onClose}>Cancel</GhostButton>
          <PrimaryButton onClick={handleSave} disabled={saving}>
            {saving ? "Saving…" : isEdit ? "Save changes" : "Create product"}
          </PrimaryButton>
        </div>
      </div>
    </Modal>
  );
}

function StockModal({
  token,
  product,
  onClose,
  onSaved,
}: {
  token: string | null;
  product: ApiProduct;
  onClose: () => void;
  onSaved: () => void;
}) {
  const [amount, setAmount] = useState("");
  const [type, setType] = useState("addition");
  const [reason, setReason] = useState("");
  const [saving, setSaving] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const [logs, setLogs] = useState<ApiInventoryLog[] | null>(null);

  const loadLogs = useCallback(async () => {
    if (!token) return;
    try {
      setLogs(await getProductInventoryLogs(token, product.id));
    } catch {
      setLogs([]);
    }
  }, [token, product.id]);

  useEffect(() => {
    void loadLogs();
  }, [loadLogs]);

  const handleSave = async () => {
    if (!token) return;
    const raw = Number(amount);
    if (!raw) {
      setErr("Enter a non-zero quantity.");
      return;
    }
    // Positive amount adds stock, negative removes it — matched to the type.
    const delta = type === "reduction" ? -Math.abs(raw) : Math.abs(raw);
    setErr(null);
    setSaving(true);
    try {
      await updateProductStock(token, product.id, {
        quantity: delta,
        type,
        reason: reason || null,
      });
      onSaved();
    } catch (error) {
      setErr(errorMessage(error));
    } finally {
      setSaving(false);
    }
  };

  return (
    <Modal open onClose={onClose} title={`Stock — ${product.name}`}>
      <div className="grid gap-4">
        <p className="text-sm text-brand-900/70">
          Current stock:{" "}
          <span className="font-semibold text-brand-900">
            {product.stock_quantity}
          </span>
        </p>
        <div className="grid gap-4 sm:grid-cols-2">
          <TextInput
            id="amount"
            label="Quantity"
            type="number"
            value={amount}
            onChange={setAmount}
            placeholder="e.g. 20"
            required
          />
          <SelectInput
            id="type"
            label="Movement"
            value={type}
            onChange={setType}
            options={[
              { value: "addition", label: "Add stock" },
              { value: "reduction", label: "Remove stock" },
            ]}
          />
        </div>
        <TextInput
          id="reason"
          label="Reason (optional)"
          value={reason}
          onChange={setReason}
          placeholder="Restock, correction, damaged, etc."
        />
        <FormError message={err} />
        <div className="flex justify-end gap-3">
          <GhostButton onClick={onClose}>Cancel</GhostButton>
          <PrimaryButton onClick={handleSave} disabled={saving}>
            {saving ? "Saving…" : "Apply"}
          </PrimaryButton>
        </div>

        <div className="border-t border-border pt-4">
          <Label>Recent movements</Label>
          {logs === null ? (
            <p className="mt-2 text-sm text-brand-900/55">Loading history…</p>
          ) : logs.length === 0 ? (
            <p className="mt-2 text-sm text-brand-900/55">No movements yet.</p>
          ) : (
            <ul className="mt-2 divide-y divide-border border-y border-border">
              {logs.slice(0, 8).map((log) => (
                <li
                  key={log.id}
                  className="flex items-center justify-between gap-3 py-2 text-sm"
                >
                  <span className="text-brand-900/70">
                    {log.type}
                    {log.reason ? ` · ${log.reason}` : ""}
                  </span>
                  <span
                    className={`font-semibold ${
                      log.quantity < 0 ? "text-red-600" : "text-brand-700"
                    }`}
                  >
                    {log.quantity > 0 ? `+${log.quantity}` : log.quantity}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </Modal>
  );
}

function ImageUploader({
  token,
  onUploaded,
}: {
  token: string | null;
  onUploaded: (url: string) => void;
}) {
  const [uploading, setUploading] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  const handleFile = async (file: File | undefined) => {
    if (!file || !token) return;
    setErr(null);
    setUploading(true);
    try {
      const { url } = await uploadImage(token, file);
      onUploaded(url);
    } catch (error) {
      setErr(errorMessage(error));
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="grid gap-1">
      <label className="inline-flex w-fit cursor-pointer items-center gap-2 border border-brand-900/20 bg-surface px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-brand-900/80 transition-colors hover:border-brand-900 hover:text-brand-900">
        {uploading ? "Uploading…" : "Upload image"}
        <input
          type="file"
          accept="image/*"
          className="hidden"
          disabled={uploading}
          onChange={(e) => handleFile(e.target.files?.[0])}
        />
      </label>
      <FormError message={err} />
    </div>
  );
}

function parseImages(value: string): string[] {
  return value
    .split(/[\n,]/)
    .map((s) => s.trim())
    .filter(Boolean);
}

// Plain <img> (not next/image) so admins can preview any image host without
// needing it whitelisted in next.config.
function Thumb({ src, alt }: { src?: string; alt: string }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src || "/product-placeholder.svg"}
      alt={alt}
      className="h-10 w-10 shrink-0 rounded border border-border object-cover"
    />
  );
}

function ImagePreviews({
  urls,
  onRemove,
}: {
  urls: string[];
  onRemove: (url: string) => void;
}) {
  if (urls.length === 0) return null;
  return (
    <div className="flex flex-wrap gap-3">
      {urls.map((url) => (
        <div key={url} className="group relative">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={url}
            alt="Product"
            className="h-20 w-20 rounded border border-border object-cover"
          />
          <button
            type="button"
            onClick={() => onRemove(url)}
            aria-label="Remove image"
            className="absolute -right-2 -top-2 grid h-5 w-5 place-items-center rounded-full bg-brand-900 text-[11px] text-white shadow"
          >
            ✕
          </button>
        </div>
      ))}
    </div>
  );
}
