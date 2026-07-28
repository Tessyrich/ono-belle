"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { apiRequest } from "@/lib/api/client";
import { ApiError } from "@/lib/api/client";
import type { ApiUser } from "@/lib/api/types";

export type AuthUser = {
  id: string;
  name: string;
  email: string;
  role: string;
};

type LoginResult = { ok: true } | { ok: false; error: string };

type AuthContextValue = {
  user: AuthUser | null;
  token: string | null;
  hydrated: boolean;
  isAuthenticated: boolean;
  isAdmin: boolean;
  login: (email: string, password: string) => Promise<LoginResult>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | null>(null);

const TOKEN_KEY = "onobelle:token:v1";
const USER_KEY = "onobelle:user:v1";

function toAuthUser(u: ApiUser): AuthUser {
  return { id: u.id, name: u.name, email: u.email, role: u.role };
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [hydrated, setHydrated] = useState(false);

  const persist = useCallback((nextToken: string | null, nextUser: AuthUser | null) => {
    setToken(nextToken);
    setUser(nextUser);
    try {
      if (nextToken) window.localStorage.setItem(TOKEN_KEY, nextToken);
      else window.localStorage.removeItem(TOKEN_KEY);
      if (nextUser) window.localStorage.setItem(USER_KEY, JSON.stringify(nextUser));
      else window.localStorage.removeItem(USER_KEY);
    } catch {
      // ignore
    }
  }, []);

  const login = useCallback(
    async (email: string, password: string): Promise<LoginResult> => {
      const trimmed = email.trim().toLowerCase();
      if (!trimmed || !password) {
        return { ok: false, error: "Email and password are required." };
      }
      try {
        const data = await apiRequest<{ user: ApiUser; token: string }>(
          "/auth/login",
          { method: "POST", body: { email: trimmed, password } },
        );
        persist(data.token, toAuthUser(data.user));
        return { ok: true };
      } catch (err) {
        if (err instanceof ApiError) {
          return {
            ok: false,
            error:
              err.status === 401 || err.status === 422
                ? "Invalid email or password."
                : err.message,
          };
        }
        return { ok: false, error: "Something went wrong. Please try again." };
      }
    },
    [persist],
  );

  /** Renew the token; returns the new token or null if the session is invalid. */
  const refresh = useCallback(
    async (currentToken: string): Promise<string | null> => {
      try {
        const data = await apiRequest<{ user: ApiUser; token: string }>(
          "/auth/refresh-token",
          { method: "POST", token: currentToken },
        );
        persist(data.token, toAuthUser(data.user));
        return data.token;
      } catch {
        return null;
      }
    },
    [persist],
  );

  // Restore session from localStorage, then validate it against the API.
  useEffect(() => {
    let storedToken: string | null = null;
    let storedUser: AuthUser | null = null;
    try {
      storedToken = window.localStorage.getItem(TOKEN_KEY);
      const raw = window.localStorage.getItem(USER_KEY);
      storedUser = raw ? (JSON.parse(raw) as AuthUser) : null;
    } catch {
      // ignore
    }
    if (storedToken) setToken(storedToken);
    if (storedUser) setUser(storedUser);
    setHydrated(true);

    if (!storedToken) return;
    // Validate the restored session; refresh once on 401, else sign out.
    (async () => {
      try {
        const u = await apiRequest<ApiUser>("/auth/user", { token: storedToken });
        persist(storedToken, toAuthUser(u));
      } catch (err) {
        if (err instanceof ApiError && err.status === 401) {
          const renewed = await refresh(storedToken);
          if (!renewed) persist(null, null);
        }
        // On network/other errors keep the stored session as-is.
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Keep the session warm while an admin is working.
  useEffect(() => {
    if (!token) return;
    const id = window.setInterval(
      () => {
        void refresh(token);
      },
      20 * 60 * 1000,
    );
    return () => window.clearInterval(id);
  }, [token, refresh]);

  const logout = useCallback(async () => {
    const current = token;
    persist(null, null);
    if (current) {
      try {
        await apiRequest("/auth/logout", { method: "POST", token: current });
      } catch {
        // best-effort; session already cleared locally
      }
    }
  }, [token, persist]);

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      token,
      hydrated,
      isAuthenticated: !!token,
      isAdmin: !!user && user.role === "admin",
      login,
      logout,
    }),
    [user, token, hydrated, login, logout],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
}
