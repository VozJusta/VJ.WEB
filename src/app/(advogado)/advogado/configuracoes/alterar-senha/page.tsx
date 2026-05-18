import type { Metadata } from "next";
import { ChangePasswordFeature } from "@/features/dashboard/settings/change-password-feature";

export const metadata: Metadata = {
  title: "Alterar Senha | Voz Justa",
  description: "Defina uma nova senha para sua conta",
};

export default function LawyerAlterarSenhaPage() {
  return <ChangePasswordFeature basePath="/advogado/configuracoes" />;
}
