import type { Metadata } from "next";
import { DocumentAccessHistoryFeature } from "@/features/dashboard/settings/document-access-history-feature";

export const metadata: Metadata = {
  title: "Histórico de Acesso | Voz Justa",
  description: "Veja quem acessou este documento",
};

type Props = {
  params: Promise<{ id: string }>;
};

export default async function HistoricoAcessoPage({ params }: Props) {
  const { id } = await params;
  
  return <DocumentAccessHistoryFeature documentId={id} />;
}
