import type { Metadata } from "next";
import { AllCasesFeature } from "@/features/dashboard/cases/all-cases-feature";

export const metadata: Metadata = {
  title: "Meus Casos | Voz Justa",
  description: "Todos os seus processos jurídicos em um só lugar",
};

export default function CasosPage() {
  return <AllCasesFeature />;
}
