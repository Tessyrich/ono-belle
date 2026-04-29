"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

export type Role = "customer" | "admin";

export type AuthUser = {
  id: string;
  name: string;
  email: string;
  role: Role;
  createdAt: number;
};

type AuthContextValue = {
  user: AuthUser | null;
  hydrated: boolean;
  isAuthenticated: boolean;
  isAdmin: boolean;
  login: (
    email: string,
    password: string,
    role?: Role,
  ) => { ok: true } | { ok: false; error: string };
  register: (
    name: string,
    email: string,
    password: string,
  ) => { ok: true } | { ok: false; error: string };
  logout: () => void;
};

const AuthContext = createContext<AuthContextValue | null>(null);

const USER_KEY = "onobelle:auth:v1";
const USERS_KEY = "onobelle:users:v1";

// Static admin credentials (would be replaced by a real backend later)
const ADMIN_EMAIL = "admin@onobelle.com";
const ADMIN_PASSWORD = "OnoBelle2026";

type StoredUser = {
  id: string;
  name: string;
  email: string;
  password: string; // not for production — local-only
  role: Role;
  createdAt: number;
};

function readUsers(): StoredUser[] {
  try {
    const raw = window.localStorage.getItem(USERS_KEY);
    return raw ? (JSON.parse(raw) as StoredUser[]) : [];
  } catch {
    return [];
  }
}

function writeUsers(users: StoredUser[]) {
  try {
    window.localStorage.setItem(USERS_KEY, JSON.stringify(users));
  } catch {
    // ignore
  }
}

function publicUser(u: StoredUser): AuthUser {
  return {
    id: u.id,
    name: u.name,
    email: u.email,
    role: u.role,
    createdAt: u.createdAt,
  };
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(USER_KEY);
      if (stored) setUser(JSON.parse(stored));
    } catch {
      // ignore
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      if (user) {
        window.localStorage.setItem(USER_KEY, JSON.stringify(user));
      } else {
        window.localStorage.removeItem(USER_KEY);
      }
    } catch {
      // ignore
    }
  }, [user, hydrated]);

  const login = useCallback(
    (email: string, password: string, role: Role = "customer") => {
      const trimmedEmail = email.trim().toLowerCase();
      if (!trimmedEmail || !password) {
        return { ok: false as const, error: "Email and password are required." };
      }

      if (role === "admin") {
        if (
          trimmedEmail === ADMIN_EMAIL &&
          password === ADMIN_PASSWORD
        ) {
          setUser({
            id: "admin-001",
            name: "Ono Belle Admin",
            email: ADMIN_EMAIL,
            role: "admin",
            createdAt: Date.now(),
          });
          return { ok: true as const };
        }
        return { ok: false as const, error: "Invalid admin credentials." };
      }

      const users = readUsers();
      const found = users.find((u) => u.email === trimmedEmail);
      if (!found) {
        return { ok: false as const, error: "No account with that email." };
      }
      if (found.password !== password) {
        return { ok: false as const, error: "Incorrect password." };
      }
      setUser(publicUser(found));
      return { ok: true as const };
    },
    [],
  );

  const register = useCallback(
    (name: string, email: string, password: string) => {
      const trimmedEmail = email.trim().toLowerCase();
      const trimmedName = name.trim();
      if (!trimmedName || !trimmedEmail || !password) {
        return { ok: false as const, error: "All fields are required." };
      }
      if (password.length < 6) {
        return {
          ok: false as const,
          error: "Password must be at least 6 characters.",
        };
      }
      if (trimmedEmail === ADMIN_EMAIL) {
        return {
          ok: false as const,
          error: "That email is reserved. Please choose another.",
        };
      }
      const users = readUsers();
      if (users.some((u) => u.email === trimmedEmail)) {
        return {
          ok: false as const,
          error: "An account with that email already exists.",
        };
      }
      const newUser: StoredUser = {
        id: `cust-${Date.now()}`,
        name: trimmedName,
        email: trimmedEmail,
        password,
        role: "customer",
        createdAt: Date.now(),
      };
      writeUsers([...users, newUser]);
      setUser(publicUser(newUser));
      return { ok: true as const };
    },
    [],
  );

  const logout = useCallback(() => setUser(null), []);

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      hydrated,
      isAuthenticated: !!user,
      isAdmin: user?.role === "admin",
      login,
      register,
      logout,
    }),
    [user, hydrated, login, register, logout],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
}
