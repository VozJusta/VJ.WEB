"use client";

import Link from "next/link";
import { ListAltRounded, ChevronRightRounded } from "@mui/icons-material";
import { CaseCard } from "@/components/ui/case-card";
import { useDashboardCitizen } from "@/hooks/useDashboardCitizen";

function statusMap(apiStatus: string): "analysis" | "concluded" | "pending" | "rejected" {
  const s = apiStatus?.toLowerCase();
  if (s === "concluded" || s === "completed") return "concluded";
  if (s === "rejected") return "rejected";
  if (s === "pending") return "pending";
  return "analysis";
}

export function CasesSection() {
  const { reports, isLoading, error } = useDashboardCitizen();

  return (
    <section aria-labelledby="my-cases-heading">
      <header className="mb-5 flex items-center justify-between gap-4">
        <div className="flex items-center gap-2.5">
          <ListAltRounded fontSize="small" className="text-primary" aria-hidden="true" />
          <h2 id="my-cases-heading" className="text-lg font-bold text-foreground">
            Meus Casos
          </h2>
        </div>

        <Link
          href="/dashboard/casos"
          className="flex items-center gap-1 text-sm font-medium text-primary transition-opacity hover:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded"
        >
          Ver todos os casos
          <ChevronRightRounded fontSize="small" aria-hidden="true" />
        </Link>
      </header>

      {isLoading && (
        <ul role="list" className="flex flex-col gap-3">
          {[1, 2].map((i) => (
            <li key={i} className="h-20 animate-pulse rounded-xl bg-surface-elevated" />
          ))}
        </ul>
      )}

      {error && (
        <p className="text-sm text-red-400">{error}</p>
      )}

      {!isLoading && !error && reports.length === 0 && (
        <p className="text-sm text-text-muted">Nenhum caso encontrado.</p>
      )}

      {!isLoading && reports.length > 0 && (
        <ul role="list" className="flex flex-col gap-3">
          {reports.slice(0, 3).map((report) => (
            <li key={report.id}>
              <CaseCard
                id={report.id}
                title={report.title ?? report.category ?? 'Caso'}
                status={statusMap(report.status)}
                updatedLabel={new Date(report.created_at).toLocaleDateString('pt-BR')}
                protocol={`#${report.id.slice(0, 8).toUpperCase()}`}
                href={`/dashboard/casos/${report.id}`}
              />
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
