import type { Metadata } from "next";
import { Suspense } from "react";
import LoginForm from "@/components/auth/LoginForm";

export const metadata: Metadata = {
  title: "Sign in",
  description: "Sign in to your Ono Belle customer account.",
};

export default function CustomerLoginPage() {
  return (
    <Suspense>
      <LoginForm
        role="customer"
        title="Sign in to continue."
        subtitle="Use your email and password to access your account, cart and orders."
      />
    </Suspense>
  );
}
