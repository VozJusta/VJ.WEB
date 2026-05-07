"use client";

import { CasesList } from "./index";
import { useDashboardCitizen } from "@/hooks/useDashboardCitizen";
import { getCategoryLabel } from "@/lib/status";
import type { CaseCardProps } from "@/components/ui/case-card/case-card.types";

function apiStatusToCard(status: string): CaseCardProps["status"] {
  const s = status?.toLowerCase();
  if (s === "accepted") return "concluded";
  if (s === "refused" || s === "archived") return "archived";
  if (s === "pending") return "pending";
  return "analysis";
}

export function AllCasesFeature() {
  const { reports, isLoading, error } = useDashboardCitizen();

  if (isLoading) {
    return (
      <main className="flex flex-col gap-6 w-full px-4 py-6 md:px-6 md:py-8" aria-label="Todos os casos">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-20 animate-pulse rounded-xl bg-surface-elevated" />
        ))}
      </main>
    );
  }

  if (error) {
    return (
      <main className="flex flex-col gap-6 w-full px-4 py-6 md:px-6 md:py-8" aria-label="Todos os casos">
        <p className="text-sm text-red-400">{error}</p>
      </main>
    );
  }

  const cases: Omit<CaseCardProps, "className">[] = reports.map((r) => ({
    id: r.id,
    title: getCategoryLabel(r.category_detected) || "Caso",
    status: apiStatusToCard(r.status),
    updatedLabel: new Date(r.created_at).toLocaleDateString("pt-BR"),
    protocol: `#${r.id.slice(0, 8).toUpperCase()}`,
    href: `/dashboard/casos/${r.id}`,
  }));

  return <CasesList initialCases={cases} />;
}
