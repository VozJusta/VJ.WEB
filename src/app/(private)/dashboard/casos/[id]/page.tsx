"use client";

import { use } from "react";
import { CaseDetailFeature } from "@/features/dashboard/cases/case-detail-feature";
import { useCaseDetail } from "@/hooks/useCaseDetail";

type Props = { params: Promise<{ id: string }> };

export default function CaseDetailPage({ params }: Props) {
  const { id } = use(params);
  const { report, isLoading, error } = useCaseDetail(id);

  if (isLoading) {
    return (
      <div className="flex flex-col gap-6 w-full mx-auto px-4 py-6 md:px-6 md:py-8">
        <div className="h-10 w-40 animate-pulse rounded-lg bg-white/8" />
        <div className="h-32 animate-pulse rounded-2xl bg-[#0d1526]" />
        <div className="h-48 animate-pulse rounded-2xl bg-[#0d1526]" />
      </div>
    );
  }

  if (error || !report) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen px-4">
        <p className="text-sm text-red-400">{error ?? "Caso não encontrado."}</p>
      </div>
    );
  }

  return <CaseDetailFeature report={report} reportId={id} />;
}
