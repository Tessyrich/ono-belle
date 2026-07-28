"use client";

import { useState } from "react";
import {
  createFaq,
  deleteFaq,
  listAdminFaqs,
  updateFaq,
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
import type { ApiFaq } from "@/lib/api/types";

export default function AdminFaqsPage() {
  const { token } = useAuth();
  const { data, loading, error, reload } = useAdminData<ApiFaq[]>((t) =>
    listAdminFaqs(t).then((r) => r.data ?? []),
  );
  const [editing, setEditing] = useState<ApiFaq | null>(null);
  const [creating, setCreating] = useState(false);

  const faqs = (data ?? []).slice().sort((a, b) => a.order - b.order);

  return (
    <AdminPage
      title="FAQs"
      subtitle="Questions shown on the storefront."
      action={
        <PrimaryButton onClick={() => setCreating(true)}>+ New FAQ</PrimaryButton>
      }
    >
      {loading ? (
        <LoadingState />
      ) : error ? (
        <ErrorState message={error} />
      ) : faqs.length === 0 ? (
        <EmptyState message="No FAQs yet. Add your first one." />
      ) : (
        <div className="space-y-3">
          {faqs.map((f) => (
            <Card key={f.id} className="p-5">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="font-display text-lg text-brand-900">
                    {f.question}
                  </p>
                  <p className="mt-1 text-sm text-brand-900/70">{f.answer}</p>
                </div>
                <div className="flex shrink-0 flex-col items-end gap-2">
                  {f.is_active ? (
                    <StatusBadge label="Active" tone="success" />
                  ) : (
                    <StatusBadge label="Hidden" tone="neutral" />
                  )}
                  <div className="flex gap-2">
                    <GhostButton onClick={() => setEditing(f)}>Edit</GhostButton>
                    <DeleteFaqButton token={token} faq={f} onDeleted={reload} />
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      {(creating || editing) && (
        <FaqModal
          token={token}
          faq={editing}
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

function DeleteFaqButton({
  token,
  faq,
  onDeleted,
}: {
  token: string | null;
  faq: ApiFaq;
  onDeleted: () => void;
}) {
  const [busy, setBusy] = useState(false);
  const handle = async () => {
    if (!token) return;
    if (!window.confirm("Delete this FAQ?")) return;
    setBusy(true);
    try {
      await deleteFaq(token, faq.id);
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

function FaqModal({
  token,
  faq,
  onClose,
  onSaved,
}: {
  token: string | null;
  faq: ApiFaq | null;
  onClose: () => void;
  onSaved: () => void;
}) {
  const isEdit = !!faq;
  const [question, setQuestion] = useState(faq?.question ?? "");
  const [answer, setAnswer] = useState(faq?.answer ?? "");
  const [order, setOrder] = useState(String(faq?.order ?? 0));
  const [isActive, setIsActive] = useState(faq?.is_active ?? true);
  const [saving, setSaving] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  const handleSave = async () => {
    if (!token) return;
    setErr(null);
    setSaving(true);
    const body = {
      question,
      answer,
      is_active: isActive,
      order: order === "" ? null : Number(order),
    };
    try {
      if (isEdit && faq) await updateFaq(token, faq.id, body);
      else await createFaq(token, body);
      onSaved();
    } catch (error) {
      setErr(errorMessage(error));
    } finally {
      setSaving(false);
    }
  };

  return (
    <Modal open onClose={onClose} title={isEdit ? "Edit FAQ" : "New FAQ"}>
      <div className="grid gap-4">
        <TextInput
          id="question"
          label="Question"
          value={question}
          onChange={setQuestion}
          required
        />
        <TextArea
          id="answer"
          label="Answer"
          value={answer}
          onChange={setAnswer}
          required
        />
        <TextInput
          id="order"
          label="Sort order"
          type="number"
          value={order}
          onChange={setOrder}
        />
        <Checkbox
          id="active"
          label="Active (visible on storefront)"
          checked={isActive}
          onChange={setIsActive}
        />
        <FormError message={err} />
        <div className="flex justify-end gap-3 pt-2">
          <GhostButton onClick={onClose}>Cancel</GhostButton>
          <PrimaryButton onClick={handleSave} disabled={saving}>
            {saving ? "Saving…" : isEdit ? "Save changes" : "Create FAQ"}
          </PrimaryButton>
        </div>
      </div>
    </Modal>
  );
}
