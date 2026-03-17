import type { Metadata } from "next";
import { ForgotPasswordForm } from "@/app/features/auth/forgot-password";

export const metadata: Metadata = {
  title: "Esqueceu a Senha? | VozJusta",
  description: "Recupere o acesso à sua conta VozJusta de forma rápida e segura.",
};

export default function ForgotPasswordPage() {
  return <ForgotPasswordForm />;
}
