"use client";

import { useState } from "react";
import {
  deleteContactMessage,
  listContactMessages,
  markContactMessageRead,
  replyToContactMessage,
} from "@/lib/api/admin";
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
  TextArea,
  errorMessage,
  useAdminData,
} from "@/components/admin/ui";
import type { ApiContactMessage } from "@/lib/api/types";

export default function AdminMessagesPage() {
  const { token } = useAuth();
  const { data, loading, error, reload } = useAdminData<ApiContactMessage[]>(
    (t) => listContactMessages(t).then((r) => r.data ?? []),
  );
  const [selected, setSelected] = useState<ApiContactMessage | null>(null);

  const messages = data ?? [];

  const open = async (m: ApiContactMessage) => {
    setSelected(m);
    if (token && m.is_read === false) {
      try {
        await markContactMessageRead(token, m.id);
        reload();
      } catch {
        // non-blocking
      }
    }
  };

  return (
    <AdminPage
      title="Messages"
      subtitle="Enquiries submitted through the contact form."
    >
      {loading ? (
        <LoadingState />
      ) : error ? (
        <ErrorState message={error} />
      ) : messages.length === 0 ? (
        <EmptyState message="No messages yet." />
      ) : (
        <Card className="divide-y divide-border">
          {messages.map((m) => (
            <button
              key={m.id}
              type="button"
              onClick={() => open(m)}
              className="flex w-full items-start justify-between gap-4 px-5 py-4 text-left transition-colors hover:bg-muted/40"
            >
              <div>
                <p className="font-semibold text-brand-900">
                  {m.subject || "(no subject)"}
                </p>
                <p className="text-sm text-brand-900/65">
                  {m.name} · {m.email}
                </p>
                <p className="mt-1 line-clamp-1 text-sm text-brand-900/55">
                  {m.message}
                </p>
              </div>
              {m.is_read === false && (
                <StatusBadge label="New" tone="pending" />
              )}
            </button>
          ))}
        </Card>
      )}

      {selected && (
        <MessageModal
          token={token}
          message={selected}
          onClose={() => setSelected(null)}
          onDeleted={() => {
            setSelected(null);
            reload();
          }}
        />
      )}
    </AdminPage>
  );
}

function MessageModal({
  token,
  message,
  onClose,
  onDeleted,
}: {
  token: string | null;
  message: ApiContactMessage;
  onClose: () => void;
  onDeleted: () => void;
}) {
  const [reply, setReply] = useState("");
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  const handleReply = async () => {
    if (!token || !reply.trim()) return;
    setErr(null);
    setSending(true);
    try {
      await replyToContactMessage(token, message.id, { message: reply });
      setSent(true);
      setReply("");
    } catch (error) {
      setErr(errorMessage(error));
    } finally {
      setSending(false);
    }
  };

  const handleDelete = async () => {
    if (!token) return;
    if (!window.confirm("Delete this message?")) return;
    try {
      await deleteContactMessage(token, message.id);
      onDeleted();
    } catch (error) {
      window.alert(errorMessage(error));
    }
  };

  return (
    <Modal open onClose={onClose} title={message.subject || "Message"}>
      <div className="grid gap-4">
        <div className="text-sm">
          <p className="font-semibold text-brand-900">{message.name}</p>
          <a
            href={`mailto:${message.email}`}
            className="text-brand-700 hover:underline"
          >
            {message.email}
          </a>
        </div>
        <p className="whitespace-pre-wrap border-y border-border py-4 text-sm text-brand-900/80">
          {message.message}
        </p>

        {sent ? (
          <p className="text-sm font-semibold text-brand-700">
            Reply sent ✓
          </p>
        ) : (
          <TextArea
            id="reply"
            label="Reply by email"
            value={reply}
            onChange={setReply}
            rows={4}
          />
        )}

        <FormError message={err} />
        <div className="flex justify-between gap-3 pt-2">
          <GhostButton onClick={handleDelete}>Delete</GhostButton>
          <div className="flex gap-3">
            <GhostButton onClick={onClose}>Close</GhostButton>
            {!sent && (
              <PrimaryButton onClick={handleReply} disabled={sending || !reply.trim()}>
                {sending ? "Sending…" : "Send reply"}
              </PrimaryButton>
            )}
          </div>
        </div>
      </div>
    </Modal>
  );
}
