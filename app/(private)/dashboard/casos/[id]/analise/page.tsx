import type { Metadata } from "next";
import { CaseAnalysisCompleteFeature } from "@/features/dashboard/cases/case-analysis-complete-feature";

export const metadata: Metadata = {
  title: "Análise Finalizada | Voz Justa",
  description: "Análise da IA finalizada com sucesso",
};

interface AnalisePageProps {
  params: {
    id: string;
  };
}

export default function AnalisePage({ params }: AnalisePageProps) {
  const referenceId = `AZ-${params.id}-2024`;

  return (
    <CaseAnalysisCompleteFeature
      caseId={params.id}
      category="Direito do Consumidor"
      viability="Alta Probabilidade"
      viabilityLevel="high"
      referenceId={referenceId}
    />
  );
}
