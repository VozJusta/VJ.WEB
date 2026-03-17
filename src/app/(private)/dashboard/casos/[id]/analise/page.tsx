import type { Metadata } from "next";
import { CaseAnalysisCompleteFeature } from "@/app/features/dashboard/cases/case-analysis-complete-feature";

export const metadata: Metadata = {
  title: "Análise Finalizada | Voz Justa",
  description: "Análise da IA finalizada com sucesso",
};

interface AnalisePageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function AnalisePage({ params }: AnalisePageProps) {
  const { id } = await params;
  const referenceId = `AZ-${id}-2024`;

  return (
    <CaseAnalysisCompleteFeature
      caseId={id}
      category="Direito do Consumidor"
      viability="Alta Probabilidade"
      viabilityLevel="high"
      referenceId={referenceId}
    />
  );
}
