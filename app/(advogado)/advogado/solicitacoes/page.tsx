import type { Metadata } from "next";
import { AllRequestsFeature } from "@/features/lawyer-dashboard/requests/all-requests-feature";

export const metadata: Metadata = {
  title: "Solicitações | Voz Justa",
  description: "Gerencie as solicitações de casos enviadas por cidadãos",
};

export default function SolicitacoesPage() {
  return <AllRequestsFeature />;
}
