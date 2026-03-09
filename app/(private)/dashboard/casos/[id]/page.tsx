import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getCaseById } from "@/features/dashboard/cases/cases.data";
import { CaseDetailFeature } from "@/features/dashboard/cases/case-detail-feature";

type Props = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const caseData = getCaseById(id);
  if (!caseData) return { title: "Caso não encontrado | Voz Justa" };
  return {
    title: `${caseData.title} | Voz Justa`,
    description: `Protocolo ${caseData.protocol} — acompanhe a evolução do seu caso.`,
  };
}

export default async function CaseDetailPage({ params }: Props) {
  const { id } = await params;
  const caseData = getCaseById(id);

  if (!caseData) notFound();

  return <CaseDetailFeature caseData={caseData} />;
}
