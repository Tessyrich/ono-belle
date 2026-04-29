import type { Metadata } from "next";
import { Suspense } from "react";
import LoginForm from "@/components/auth/LoginForm";

export const metadata: Metadata = {
  title: "Admin sign in",
  description: "Restricted access for Ono Belle administrators.",
};

export default function AdminLoginPage() {
  return (
    <Suspense>
      <LoginForm
        role="admin"
        title="Restricted area."
        subtitle="Use your administrator credentials to access the dashboard."
        redirectFallback="/admin/dashboard"
      />
    </Suspense>
  );
}
