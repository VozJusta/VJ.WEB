import type { Metadata } from "next";
import { RequestDetailFeature } from "@/features/lawyer-dashboard/requests/request-detail-feature";

export const metadata: Metadata = {
  title: "Detalhes da Solicitação | Voz Justa",
  description: "Visualize os detalhes completos da solicitação de caso",
};

interface RequestDetailPageProps {
  params: Promise<{ id: string }>;
}

export default async function RequestDetailPage({ params }: RequestDetailPageProps) {
  const { id } = await params;
  return <RequestDetailFeature requestId={id} />;
}
