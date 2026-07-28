import { API_BASE_URL } from "@/lib/config";
import type { ApiEnvelope, PaginationMeta } from "./types";

export class ApiError extends Error {
  status: number;
  /** Field-level validation errors keyed by field name (Laravel `errors` bag). */
  fieldErrors?: Record<string, string[]>;

  constructor(
    message: string,
    status: number,
    fieldErrors?: Record<string, string[]>,
  ) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.fieldErrors = fieldErrors;
  }
}

export type RequestOptions = {
  method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  /** JSON body — serialized automatically. */
  body?: unknown;
  /** Bearer token for authenticated (admin) endpoints. */
  token?: string | null;
  /** Query params; `undefined`/`null`/`""` entries are skipped. */
  query?: Record<string, string | number | boolean | undefined | null>;
  signal?: AbortSignal;
  /**
   * Next.js fetch caching. Defaults to `no-store` so storefront data is always
   * fresh. Pass `{ revalidate: n }` to cache for n seconds.
   */
  cache?: RequestCache;
  next?: { revalidate?: number; tags?: string[] };
};

function buildUrl(
  path: string,
  query?: RequestOptions["query"],
): string {
  const url = `${API_BASE_URL}${path.startsWith("/") ? path : `/${path}`}`;
  if (!query) return url;
  const params = new URLSearchParams();
  for (const [key, value] of Object.entries(query)) {
    if (value === undefined || value === null || value === "") continue;
    params.append(key, String(value));
  }
  const qs = params.toString();
  return qs ? `${url}?${qs}` : url;
}

/**
 * Low-level request that returns the full API envelope (data + meta).
 * Throws {@link ApiError} on non-2xx responses or transport failures.
 */
export async function apiRequestRaw<T>(
  path: string,
  options: RequestOptions = {},
): Promise<ApiEnvelope<T>> {
  const { method = "GET", body, token, query, signal, cache, next } = options;

  const headers: Record<string, string> = { Accept: "application/json" };
  if (body !== undefined) headers["Content-Type"] = "application/json";
  if (token) headers.Authorization = `Bearer ${token}`;

  let res: Response;
  try {
    res = await fetch(buildUrl(path, query), {
      method,
      headers,
      body: body !== undefined ? JSON.stringify(body) : undefined,
      signal,
      // Default to fresh data unless a caching strategy is provided.
      ...(next ? { next } : cache ? { cache } : { cache: "no-store" }),
    });
  } catch (err) {
    if (err instanceof DOMException && err.name === "AbortError") throw err;
    throw new ApiError(
      "Could not reach the server. Please check your connection and try again.",
      0,
    );
  }

  let json: unknown = null;
  const text = await res.text();
  if (text) {
    try {
      json = JSON.parse(text);
    } catch {
      json = null;
    }
  }

  if (!res.ok) {
    const payload = (json ?? {}) as {
      message?: string;
      errors?: Record<string, string[]>;
    };
    throw new ApiError(
      payload.message || `Request failed (${res.status}).`,
      res.status,
      payload.errors,
    );
  }

  return (json ?? { success: true, message: "", data: null }) as ApiEnvelope<T>;
}

/** Request that returns just the `data` payload. */
export async function apiRequest<T>(
  path: string,
  options: RequestOptions = {},
): Promise<T> {
  const env = await apiRequestRaw<T>(path, options);
  return env.data;
}

/**
 * Upload a file via multipart/form-data (the `/upload` endpoint).
 * The browser sets the multipart boundary, so we must not set Content-Type.
 */
export async function uploadFile(
  path: string,
  file: File,
  token: string,
): Promise<{ path: string; url: string }> {
  const form = new FormData();
  form.append("file", file);

  let res: Response;
  try {
    res = await fetch(buildUrl(path), {
      method: "POST",
      headers: { Accept: "application/json", Authorization: `Bearer ${token}` },
      body: form,
      cache: "no-store",
    });
  } catch {
    throw new ApiError("Could not reach the server for upload.", 0);
  }

  const text = await res.text();
  const json = text ? JSON.parse(text) : null;
  if (!res.ok) {
    const payload = (json ?? {}) as {
      message?: string;
      errors?: Record<string, string[]>;
    };
    throw new ApiError(
      payload.message || `Upload failed (${res.status}).`,
      res.status,
      payload.errors,
    );
  }
  return (json as { data: { path: string; url: string } }).data;
}

/** Request that returns `{ data, meta }` for paginated list endpoints. */
export async function apiRequestList<T>(
  path: string,
  options: RequestOptions = {},
): Promise<{ data: T; meta?: PaginationMeta }> {
  const env = await apiRequestRaw<T>(path, options);
  return { data: env.data, meta: env.meta };
}
