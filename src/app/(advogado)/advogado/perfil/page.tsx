import type { Metadata } from "next";
import { LawyerDashboardProfileFeature } from "@/features/advogado/profile";

export const metadata: Metadata = {
  title: "Perfil Profissional | Voz Justa",
  description: "Gerencie suas informações profissionais e preferências de segurança.",
};

export default function LawyerProfilePage() {
  return <LawyerDashboardProfileFeature />;
}
