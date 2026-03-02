import type { Metadata } from "next";
import { ResetPasswordForm } from "@/app/features/auth/reset-password";

export const metadata: Metadata = {
  title: "Redefinir Senha | VozJusta",
  description: "Crie uma nova senha forte para sua conta VozJusta.",
};

export default function ResetPasswordPage() {
  return <ResetPasswordForm />;
}
