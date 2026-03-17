import type { Metadata } from "next";
import { CitizenSignupFeature } from "@/app/features/auth/citizen-signup";

export const metadata: Metadata = {
  title: "Cadastro do Cidadão | VozJusta",
  description:
    "Crie sua conta de cidadão na VozJusta para acompanhar orientações e serviços jurídicos.",
};

export default function OnboardingCidadaoPage() {
  return <CitizenSignupFeature />;
}
