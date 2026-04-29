import type { Metadata } from "next";
import { Suspense } from "react";
import RegisterForm from "@/components/auth/RegisterForm";

export const metadata: Metadata = {
  title: "Create account",
  description: "Create an Ono Belle customer account to save your cart and orders.",
};

export default function RegisterPage() {
  return (
    <Suspense>
      <RegisterForm />
    </Suspense>
  );
}
