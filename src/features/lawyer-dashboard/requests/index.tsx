"use client";

import { useState, useMemo } from "react";
import { RequestCard } from "@/components/ui/request-card";
import { FilterTabs } from "@/components/ui/filter-tabs";
import { EmptyState } from "@/components/ui/empty-state";
import type { RequestStatus } from "@/components/ui/request-card/request-card.types";
import type { FilterTabItem } from "@/components/ui/filter-tabs/filter-tabs.types";
import { useLawyerRequests } from "@/hooks/useLawyerRequests";

type FilterValue = "all" | RequestStatus;

const PAGE_SIZE = 6;

function apiStatusToUi(status: string): RequestStatus {
  if (status === "Accepted") return "accepted";
  if (status === "Rejected") return "rejected";
  return "pending";
}

export function RequestsList() {
  const { requests: rawRequests, isLoading, error, accept, reject } = useLawyerRequests();
  const [activeFilter, setActiveFilter] = useState<FilterValue>("all");
  const [visible, setVisible] = useState(PAGE_SIZE);

  const requests = rawRequests.map((r) => ({
    id: r.id,
    protocol: `#${r.id.slice(0, 8).toUpperCase()}`,
    citizenName: r.citizen.full_name,
    citizenInitials: r.citizen.full_name.split(' ').slice(0, 2).map((n) => n[0]).join(''),
    area: r.report?.category ?? 'Geral',
    status: apiStatusToUi(r.status),
    createdAt: new Date(r.created_at).toLocaleDateString('pt-BR'),
  }));

  const counts = useMemo(() => ({
    all: requests.length,
    pending: requests.filter((r) => r.status === "pending").length,
    accepted: requests.filter((r) => r.status === "accepted").length,
    rejected: requests.filter((r) => r.status === "rejected").length,
  }), [requests]);

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

  const handleAccept = async (id: string) => {
    await accept(id);
  };

  const handleReject = async (id: string) => {
    await reject(id);
  };

  const handleViewDossier = (id: string) => {
    window.location.href = `/advogado/solicitacoes/${id}`;
  };

  const handleCardClick = (id: string) => {
    window.location.href = `/advogado/solicitacoes/${id}`;
  };

  const handleFilterChange = (value: FilterValue) => {
    setActiveFilter(value);
    setVisible(PAGE_SIZE);
  };

  if (requests.length === 0) {
  if (isLoading) {
    return (
      <section className="w-full flex flex-col gap-4" aria-label="Carregando solicitações">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-24 animate-pulse rounded-xl bg-surface-elevated" />
        ))}
      </section>
    );
  }

  if (error) {
    return <p className="text-sm text-red-400">{error}</p>;
  }

  if (requests.length === 0) {
    return (
      <section className="w-full" aria-label="Solicitações">
        <EmptyState
          illustration="/illustrations/empty-cases-illustration.png"
          illustrationAlt="Nenhuma solicitação encontrada"
          title="Você ainda não tem solicitações"
          description="Quando cidadãos enviarem propostas de casos, elas aparecerão aqui para você revisar."
        />
      </section>
    );
  }

  return (
    <section className="flex w-full flex-col gap-6" aria-label="Solicitações">
      <FilterTabs
        tabs={filterTabs}
        activeTab={activeFilter}
        onTabChange={handleFilterChange}
        ariaLabel="Filtrar solicitações por status"
      />

      {filteredRequests.length === 0 ? (
        <article
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
        </article>
      ) : (
        <article
          role="tabpanel"
          id={`tabpanel-${activeFilter}`}
          aria-label={`Solicitações ${activeFilter === "all" ? "todas" : activeFilter}`}
          className="w-full"
        >
          <ul role="list" className="flex w-full flex-col gap-4">
            {shownRequests.map((request) => (
              <li key={request.id}>
                <RequestCard
                  {...request}
                  onClick={handleCardClick}
                  onAccept={handleAccept}
                  onReject={handleReject}
                  onViewDossier={handleViewDossier}
                />
              </li>
            ))}
          </ul>

          {hasMore && (
            <footer className="flex justify-center pt-6">
              <button
                type="button"
                onClick={() => setVisible((v) => v + PAGE_SIZE)}
                className="px-8 py-2.5 rounded-full border border-(--border-subtle) text-sm font-medium text-text-secondary hover:text-foreground hover:bg-surface-hover transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              >
                Ver Mais Solicitações
              </button>
            </footer>
          )}
        </article>
      )}
    </section>
  );
}
