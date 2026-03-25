import type { Metadata } from "next";
import { RequestDetailFeature } from "@/features/lawyer-dashboard/requests/request-detail-feature";

export const metadata: Metadata = {
  title: "Detalhes da Solicitação | Voz Justa",
  description: "Visualize os detalhes completos da solicitação de caso",
};

export default function RequestDetailPage() {
  return <RequestDetailFeature />;
}
