"use client";

import {
  useCallback,
  useEffect,
  useState,
  type ReactNode,
  type ChangeEvent,
} from "react";
import { useAuth } from "@/context/auth";
import { ApiError } from "@/lib/api/client";

/* ----------------------------- data loading ----------------------------- */

type AdminData<T> = {
  data: T | null;
  loading: boolean;
  error: string | null;
  reload: () => void;
  token: string | null;
};

/** Loads admin data once the auth session is hydrated, with reload support. */
export function useAdminData<T>(
  loader: (token: string) => Promise<T>,
  deps: unknown[] = [],
): AdminData<T> {
  const { token, hydrated } = useAuth();
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [nonce, setNonce] = useState(0);

  const reload = useCallback(() => setNonce((n) => n + 1), []);

  useEffect(() => {
    if (!hydrated) return;
    if (!token) {
      setLoading(false);
      return;
    }
    let active = true;
    setLoading(true);
    setError(null);
    loader(token)
      .then((result) => {
        if (active) setData(result);
      })
      .catch((err) => {
        if (active) setError(errorMessage(err));
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token, hydrated, nonce, ...deps]);

  return { data, loading, error, reload, token };
}

export function errorMessage(err: unknown): string {
  if (err instanceof ApiError) {
    if (err.fieldErrors) {
      const first = Object.values(err.fieldErrors)[0]?.[0];
      if (first) return first;
    }
    return err.message;
  }
  return "Something went wrong. Please try again.";
}

/* ------------------------------- layout -------------------------------- */

export function AdminPage({
  eyebrow = "Admin",
  title,
  subtitle,
  action,
  children,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  action?: ReactNode;
  children: ReactNode;
}) {
  return (
    <div className="mx-auto w-full max-w-6xl px-6 py-10 sm:py-14">
      <header className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <span className="text-[11px] font-semibold uppercase tracking-[0.32em] text-accent-600">
            {eyebrow}
          </span>
          <h1 className="mt-2 font-display text-3xl text-brand-900 sm:text-4xl">
            {title}
          </h1>
          {subtitle && (
            <p className="mt-2 text-sm text-brand-900/65">{subtitle}</p>
          )}
        </div>
        {action}
      </header>
      {children}
    </div>
  );
}

export function Card({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div className={`border border-border bg-surface shadow-sm ${className}`}>
      {children}
    </div>
  );
}

export function LoadingState({ label = "Loading…" }: { label?: string }) {
  return <p className="py-16 text-center text-sm text-brand-900/55">{label}</p>;
}

export function ErrorState({ message }: { message: string }) {
  return (
    <div className="border border-red-200 bg-red-50 p-6 text-sm text-red-700">
      {message}
    </div>
  );
}

export function EmptyState({ message }: { message: string }) {
  return (
    <p className="border border-dashed border-border py-16 text-center text-sm text-brand-900/55">
      {message}
    </p>
  );
}

export function StatusBadge({
  label,
  tone = "neutral",
}: {
  label: string;
  tone?: "neutral" | "pending" | "info" | "success" | "danger";
}) {
  const tones: Record<string, string> = {
    neutral: "bg-muted text-brand-900",
    pending: "bg-accent-200 text-accent-600",
    info: "bg-brand-100 text-brand-700",
    success: "bg-brand-500/15 text-brand-700",
    danger: "bg-red-100 text-red-700",
  };
  return (
    <span
      className={`inline-flex px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] ${tones[tone]}`}
    >
      {label}
    </span>
  );
}

/* ------------------------------- buttons -------------------------------- */

export function PrimaryButton({
  children,
  onClick,
  type = "button",
  disabled,
  className = "",
}: {
  children: ReactNode;
  onClick?: () => void;
  type?: "button" | "submit";
  disabled?: boolean;
  className?: string;
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`inline-flex items-center justify-center gap-2 bg-brand-900 px-5 py-2.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-white transition-colors hover:bg-brand-700 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
    >
      {children}
    </button>
  );
}

export function GhostButton({
  children,
  onClick,
  disabled,
  className = "",
}: {
  children: ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`inline-flex items-center justify-center gap-2 border border-brand-900/20 bg-surface px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-brand-900/80 transition-colors hover:border-brand-900 hover:text-brand-900 disabled:opacity-50 ${className}`}
    >
      {children}
    </button>
  );
}

/* -------------------------------- modal --------------------------------- */

export function Modal({
  open,
  onClose,
  title,
  children,
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
}) {
  if (!open) return null;
  return (
    <div
      className="fixed inset-0 z-50 grid place-items-center bg-brand-900/40 p-4"
      onMouseDown={onClose}
    >
      <div
        className="max-h-[90vh] w-full max-w-lg overflow-y-auto border border-border bg-surface shadow-2xl"
        onMouseDown={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-border px-6 py-4">
          <h2 className="font-display text-xl text-brand-900">{title}</h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="grid h-8 w-8 place-items-center text-brand-900/60 hover:text-brand-900"
          >
            ✕
          </button>
        </div>
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
}

/* ---------------------------- form controls ----------------------------- */

export function Label({ htmlFor, children }: { htmlFor?: string; children: ReactNode }) {
  return (
    <label
      htmlFor={htmlFor}
      className="text-[11px] font-semibold uppercase tracking-[0.22em] text-brand-700"
    >
      {children}
    </label>
  );
}

const fieldClass =
  "w-full border border-border bg-background px-4 py-2.5 text-sm text-brand-900 outline-none transition-colors focus:border-brand-500";

export function TextInput({
  id,
  label,
  value,
  onChange,
  type = "text",
  required,
  placeholder,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  required?: boolean;
  placeholder?: string;
}) {
  return (
    <div className="grid gap-2">
      <Label htmlFor={id}>{label}</Label>
      <input
        id={id}
        type={type}
        required={required}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={fieldClass}
      />
    </div>
  );
}

export function TextArea({
  id,
  label,
  value,
  onChange,
  rows = 4,
  required,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  rows?: number;
  required?: boolean;
}) {
  return (
    <div className="grid gap-2">
      <Label htmlFor={id}>{label}</Label>
      <textarea
        id={id}
        rows={rows}
        required={required}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={fieldClass}
      />
    </div>
  );
}

export function SelectInput({
  id,
  label,
  value,
  onChange,
  options,
  required,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: { value: string; label: string }[];
  required?: boolean;
}) {
  return (
    <div className="grid gap-2">
      <Label htmlFor={id}>{label}</Label>
      <select
        id={id}
        required={required}
        value={value}
        onChange={(e: ChangeEvent<HTMLSelectElement>) => onChange(e.target.value)}
        className={fieldClass}
      >
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </div>
  );
}

export function Checkbox({
  id,
  label,
  checked,
  onChange,
}: {
  id: string;
  label: string;
  checked: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <label htmlFor={id} className="flex items-center gap-3 text-sm text-brand-900">
      <input
        id={id}
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="h-4 w-4 accent-brand-700"
      />
      {label}
    </label>
  );
}

export function FormError({ message }: { message: string | null }) {
  if (!message) return null;
  return (
    <p className="text-xs text-red-600" role="alert">
      {message}
    </p>
  );
}
