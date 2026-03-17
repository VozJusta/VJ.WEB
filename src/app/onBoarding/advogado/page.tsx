import type { Metadata } from "next";
import { LawyerSignupFeature } from "@/app/features/auth/lawyer-signup";

export const metadata: Metadata = {
  title: "Cadastro Profissional | VozJusta",
  description:
    "Crie sua conta profissional na VozJusta para gerenciar casos e conectar-se com clientes.",
};

export default function OnboardingAdvogadoPage() {
  return <LawyerSignupFeature />;
}
