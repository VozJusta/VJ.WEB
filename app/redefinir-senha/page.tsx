import { Suspense } from "react";
import type { Metadata } from "next";
import { ResetPasswordForm } from "@/app/features/auth/reset-password";

export const metadata: Metadata = {
  title: "Redefinir Senha | VozJusta",
  description: "Crie uma nova senha forte para sua conta VozJusta.",
};

function ResetPasswordSkeleton() {
  return (
    <section
      aria-hidden="true"
      className="mx-auto h-180 w-full max-w-md animate-pulse rounded-3xl border border-white/8 bg-[#071735]/50"
    />
  );
}

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={<ResetPasswordSkeleton />}>
      <ResetPasswordForm />
    </Suspense>
  );
}
