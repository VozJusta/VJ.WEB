"use client";

import { use } from "react";
import { useSearchParams } from "next/navigation";
import { CaseAnalysisCompleteFeature } from "@/features/dashboard/cases/case-analysis-complete-feature";
import { useCaseDetail } from "@/hooks/useCaseDetail";

interface AnalisePageProps {
  params: Promise<{ id: string }>;
}

export default function AnalisePage({ params }: AnalisePageProps) {
  const { id: caseId } = use(params);
  const searchParams = useSearchParams();
  const reportId = searchParams.get("reportId") ?? caseId;

  const { report, isLoading } = useCaseDetail(reportId);

  return (
    <CaseAnalysisCompleteFeature
      caseId={caseId}
      reportId={reportId}
      report={report}
      isLoading={isLoading}
    />
  );
}
