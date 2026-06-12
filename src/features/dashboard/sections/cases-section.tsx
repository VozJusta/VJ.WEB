"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { ListAltRounded, ChevronRightRounded } from "@mui/icons-material";
import { CaseCard } from "@/components/ui/case-card";
import { EmptyState } from "@/components/ui/empty-state";
import { useDashboardCitizen } from "@/hooks/useDashboardCitizen";
import { getCategoryLabel } from "@/lib/status";

const CasesSvg = (
  <svg viewBox="0 0 200 200" className="h-40 w-40 opacity-70" aria-hidden="true" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="100" cy="100" r="80" fill="#1B2233" />
    <rect x="55" y="58" width="90" height="110" rx="8" fill="#2585F4" opacity="0.15" stroke="#2585F4" strokeWidth="2" strokeOpacity="0.4"/>
    <rect x="68" y="76" width="64" height="6" rx="3" fill="#2585F4" opacity="0.5"/>
    <rect x="68" y="92" width="48" height="6" rx="3" fill="#2585F4" opacity="0.35"/>
    <rect x="68" y="108" width="56" height="6" rx="3" fill="#2585F4" opacity="0.35"/>
    <rect x="68" y="124" width="36" height="6" rx="3" fill="#2585F4" opacity="0.25"/>
    <rect x="72" y="44" width="56" height="24" rx="6" fill="#0C1326" stroke="#2585F4" strokeWidth="2" strokeOpacity="0.5"/>
    <rect x="84" y="51" width="32" height="5" rx="2.5" fill="#2585F4" opacity="0.6"/>
  </svg>
);

function statusMap(apiStatus: string): "analysis" | "concluded" | "pending" | "archived" {
  const s = apiStatus?.toLowerCase();
  if (s === "accepted") return "concluded";
  if (s === "refused" || s === "archived") return "archived";
  if (s === "pending") return "pending";
  return "analysis";
}

export function CasesSection() {
  const { reports, isLoading, error } = useDashboardCitizen();
  const router = useRouter();

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
        <div className="rounded-xl border border-red-500/20 bg-red-500/5 px-4 py-3">
          <p className="text-sm font-medium text-red-400">Não foi possível carregar seus casos</p>
          <p className="mt-0.5 text-xs text-red-400/70">Verifique sua conexão e tente recarregar a página.</p>
        </div>
      )}

      {!isLoading && !error && (reports ?? []).length === 0 && (
        <EmptyState
          illustrationSvg={CasesSvg}
          title="Você ainda não tem casos"
          description="Comece relatando seu primeiro problema jurídico. Nossa IA está pronta para te auxiliar."
          action={{ label: "Relatar Novo Caso", onClick: () => router.push("/dashboard/casos/novo") }}
        />
      )}

      {!isLoading && (reports ?? []).length > 0 && (
        <ul role="list" className="flex flex-col gap-3">
          {(reports ?? []).slice(0, 3).map((report) => (
            <li key={report.id}>
              <CaseCard
                id={report.id}
                title={report.title || getCategoryLabel(report.category_detected) || "Caso"}
                status={statusMap(report.status)}
                updatedLabel={new Date(report.created_at.includes('T') ? report.created_at : report.created_at + 'T12:00:00').toLocaleDateString('pt-BR')}
                protocol={`#${report.id.slice(0, 8).toUpperCase()}`}
                href={report.caseId ? `/dashboard/casos/${report.id}?caseId=${report.caseId}` : `/dashboard/casos/${report.id}`}
              />
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
