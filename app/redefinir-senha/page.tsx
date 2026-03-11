import type { Metadata } from "next";
import { Suspense } from "react";
import { ResetPasswordForm } from "@/app/features/auth/reset-password";

export const metadata: Metadata = {
  title: "Redefinir Senha | VozJusta",
  description: "Crie uma nova senha forte para sua conta VozJusta.",
};

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[radial-gradient(circle_at_15%_20%,rgba(37,133,244,0.22)_0%,rgba(4,10,27,1)_55%)] flex items-center justify-center"><div className="animate-pulse text-white">Carregando...</div></div>}>
      <ResetPasswordForm />
    </Suspense>
  );
}
