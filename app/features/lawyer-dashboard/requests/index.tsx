"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { ArrowBackRounded } from "@mui/icons-material";
import { RequestCard } from "@/components/ui/request-card";
import { FilterTabs } from "@/components/ui/filter-tabs";
import { EmptyState } from "@/components/ui/empty-state";
import type { RequestCardProps, RequestStatus } from "@/components/ui/request-card/request-card.types";
import type { FilterTabItem } from "@/components/ui/filter-tabs/filter-tabs.types";

type FilterValue = "all" | RequestStatus;

interface RequestsListProps {
  initialRequests?: Omit<RequestCardProps, "onAccept" | "onReject" | "onViewDossier" | "className">[];
}

const PAGE_SIZE = 6;

export function RequestsList({ initialRequests = [] }: RequestsListProps) {
  const [requests, setRequests] = useState(initialRequests);
  const [activeFilter, setActiveFilter] = useState<FilterValue>("all");
  const [visible, setVisible] = useState(PAGE_SIZE);

  const counts = useMemo(() => {
    return {
      all: requests.length,
      pending: requests.filter((r) => r.status === "pending").length,
      accepted: requests.filter((r) => r.status === "accepted").length,
      rejected: requests.filter((r) => r.status === "rejected").length,
    };
  }, [requests]);

  const filterTabs: FilterTabItem<FilterValue>[] = [
    { value: "all", label: "Todas", count: counts.all },
    { value: "accepted", label: "Aceitas", count: counts.accepted },
    { value: "pending", label: "Pendentes", count: counts.pending },
    { value: "rejected", label: "Recusadas", count: counts.rejected },
  ];

  const filteredRequests = useMemo(() => {
    if (activeFilter === "all") return requests;
    return requests.filter((r) => r.status === activeFilter);
  }, [requests, activeFilter]);

  const shownRequests = filteredRequests.slice(0, visible);
  const hasMore = visible < filteredRequests.length;

  const handleAccept = (id: string) => {
    setRequests((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status: "accepted" as const } : r)),
    );
  };

  const handleReject = (id: string) => {
    setRequests((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status: "rejected" as const } : r)),
    );
  };

  const handleViewDossier = (id: string) => {
    window.location.href = `/advogado/solicitacoes/${id}/dossier`;
  };

  const handleFilterChange = (value: FilterValue) => {
    setActiveFilter(value);
    setVisible(PAGE_SIZE);
  };

  if (requests.length === 0) {
    return (
      <main aria-label="Solicitações">
        <header className="flex items-center gap-3 mb-6">
          <Link
            href="/advogado"
            aria-label="Voltar para o dashboard"
            className="flex items-center justify-center w-9 h-9 rounded-lg text-white/50 hover:text-white hover:bg-white/8 transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          >
            <ArrowBackRounded fontSize="small" aria-hidden />
          </Link>
          <h1 className="text-2xl font-bold text-white tracking-tight">
            Solicitações
          </h1>
        </header>

        <EmptyState
          illustration="/illustrations/empty-cases-illustration.png"
          illustrationAlt="Nenhuma solicitação encontrada"
          title="Você ainda não tem solicitações"
          description="Quando cidadãos enviarem propostas de casos, elas aparecerão aqui para você revisar."
        />
      </main>
    );
  }

  return (
    <main aria-label="Solicitações">
      <header className="flex flex-col gap-4 mb-6">
        <div className="flex items-center gap-3">
          <Link
            href="/advogado"
            aria-label="Voltar para o dashboard"
            className="flex items-center justify-center w-9 h-9 rounded-lg text-white/50 hover:text-white hover:bg-white/8 transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          >
            <ArrowBackRounded fontSize="small" aria-hidden />
          </Link>
          <h1 className="text-2xl font-bold text-white tracking-tight">
            Solicitações
          </h1>
        </div>

        <FilterTabs
          tabs={filterTabs}
          activeTab={activeFilter}
          onTabChange={handleFilterChange}
          ariaLabel="Filtrar solicitações por status"
        />
      </header>

      {filteredRequests.length === 0 ? (
        <section
          role="tabpanel"
          id={`tabpanel-${activeFilter}`}
          aria-label={`Solicitações ${activeFilter === "all" ? "todas" : activeFilter}`}
        >
          <EmptyState
            illustration="/illustrations/empty-cases-illustration.png"
            illustrationAlt="Nenhuma solicitação encontrada"
            title={`Nenhuma solicitação ${activeFilter === "pending" ? "pendente" : activeFilter === "accepted" ? "aceita" : "recusada"}`}
            description="Não há solicitações nesta categoria no momento."
          />
        </section>
      ) : (
        <section
          role="tabpanel"
          id={`tabpanel-${activeFilter}`}
          aria-label={`Solicitações ${activeFilter === "all" ? "todas" : activeFilter}`}
        >
          <ul role="list" className="flex flex-col gap-4">
            {shownRequests.map((request) => (
              <li key={request.id}>
                <RequestCard
                  {...request}
                  onAccept={handleAccept}
                  onReject={handleReject}
                  onViewDossier={handleViewDossier}
                />
              </li>
            ))}
          </ul>

          {hasMore && (
            <div className="flex justify-center pt-6">
              <button
                type="button"
                onClick={() => setVisible((v) => v + PAGE_SIZE)}
                className="px-8 py-2.5 rounded-full border border-(--border-subtle) text-sm font-medium text-text-secondary hover:text-foreground hover:bg-surface-hover transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              >
                Ver Mais Solicitações
              </button>
            </div>
          )}
        </section>
      )}
    </main>
  );
}
