"use client";

import { InsightsRounded, QueryStatsRounded } from "@mui/icons-material";
import { StatCard } from "@/components/ui/stat-card";
import { ProductivityChart } from "@/components/ui/productivity-chart";
import { OperationalStatus } from "@/components/ui/operational-status";
import { PriorityRequestCard } from "@/components/ui/priority-request-card";
import { useDashboardLawyer } from "@/hooks/useDashboardLawyer";
import { getCategoryLabel } from "@/lib/status";

export default function LawyerDashboardPage() {
  const { analytics, operationalStats, highRelevance, isLoading } = useDashboardLawyer();

  const chartData = analytics?.data?.map((d) => ({
    date: d.date,
    value: d.value,
  })) ?? [];

  const operationalStatusItems = operationalStats
    ? [
        { label: "PENDENTES", value: operationalStats.pending, color: "rgb(251, 146, 60)" },
        { label: "ACEITOS", value: operationalStats.accepted, color: "rgb(34, 197, 94)" },
        { label: "RECUSADOS", value: operationalStats.refused, color: "rgb(239, 68, 68)" },
      ]
    : [];

  const total = operationalStats
    ? operationalStats.pending + operationalStats.accepted + operationalStats.refused
    : 0;

  const pendingPct  = total > 0 ? Math.round((operationalStats!.pending  / total) * 100) : 0;
  const acceptedPct = total > 0 ? Math.round((operationalStats!.accepted / total) * 100) : 0;
  const refusedPct  = total > 0 ? Math.round((operationalStats!.refused  / total) * 100) : 0;

  const progressPercent = acceptedPct;

  return (
    <div className="flex w-full flex-col gap-8">
      <header>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Dashboard
        </h1>
        <p className="mt-2 text-base text-foreground-muted">
          Visão geral da sua atividade profissional
        </p>
      </header>

      {isLoading && (
        <div className="flex flex-col gap-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-24 animate-pulse rounded-2xl bg-surface-elevated" />
          ))}
        </div>
      )}

      {!isLoading && (
        <>
          <section aria-labelledby="stats-heading">
            <h2 id="stats-heading" className="sr-only">Estatísticas</h2>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              <StatCard
                label="PENDENTES"
                value={operationalStats?.pending ?? 0}
                change={pendingPct}
                isPositive={false}
              />
              <StatCard
                label="ACEITOS"
                value={operationalStats?.accepted ?? 0}
                change={acceptedPct}
                isPositive
              />
              <StatCard
                label="RECUSADOS"
                value={operationalStats?.refused ?? 0}
                change={refusedPct}
                isPositive={false}
              />
            </div>
          </section>

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            <section
              aria-labelledby="productivity-heading"
              className="lg:col-span-2 rounded-2xl border border-(--border-subtle) bg-surface-elevated p-6"
            >
              <header className="mb-6">
                <h2
                  id="productivity-heading"
                  className="text-lg font-semibold tracking-tight text-foreground"
                >
                  Análise de Produtividade
                </h2>
                <p className="mt-1 text-sm text-text-secondary">
                  Volume de casos processados
                </p>
              </header>

              {chartData.length > 0 ? (
                <ProductivityChart data={chartData} className="h-80" />
              ) : (
                <div className="flex h-80 flex-col items-center justify-center gap-3 rounded-xl border border-dashed border-(--border-subtle) px-6 text-center">
                  <span
                    aria-hidden
                    className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10"
                  >
                    <InsightsRounded className="text-primary" sx={{ fontSize: 30 }} />
                  </span>
                  <p className="text-base font-semibold text-foreground">
                    Seus dados de produtividade aparecerão aqui
                  </p>
                  <p className="max-w-sm text-sm text-text-secondary">
                    Conforme você aceita e processa casos, o volume de atendimentos
                    será exibido neste gráfico.
                  </p>
                </div>
              )}
            </section>

            {operationalStatusItems.length > 0 ? (
              <OperationalStatus
                statuses={operationalStatusItems}
                progressPercent={progressPercent}
              />
            ) : (
              <article className="flex flex-col gap-6 rounded-2xl border border-(--border-subtle) bg-surface-elevated p-6">
                <header>
                  <h2 className="text-lg font-semibold tracking-tight text-foreground">
                    Status Operacional
                  </h2>
                  <p className="mt-1 text-sm text-text-secondary">
                    Visão geral dos casos em andamento
                  </p>
                </header>
                <div className="flex flex-1 flex-col items-center justify-center gap-3 rounded-xl border border-dashed border-(--border-subtle) px-6 py-10 text-center">
                  <span
                    aria-hidden
                    className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10"
                  >
                    <QueryStatsRounded className="text-primary" sx={{ fontSize: 30 }} />
                  </span>
                  <p className="text-base font-semibold text-foreground">
                    Sem dados por enquanto
                  </p>
                  <p className="text-sm text-text-secondary">
                    As porcentagens de casos aceitos e recusados aparecerão aqui.
                  </p>
                </div>
              </article>
            )}
          </div>

          {highRelevance.length > 0 && (
            <section aria-labelledby="priority-requests-heading">
              <header className="mb-6">
                <h2
                  id="priority-requests-heading"
                  className="text-2xl font-bold tracking-tight text-foreground"
                >
                  Solicitações de Alta Relevância
                </h2>
                <p className="mt-2 text-base text-text-secondary">
                  Casos que requerem sua atenção prioritária
                </p>
              </header>

              <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 xl:grid-cols-3">
                {highRelevance.map((item) => (
                  <PriorityRequestCard
                    key={item.id}
                    request={{
                      id: item.id,
                      score: Math.round(item.confidence_score * 100),
                      title: item.title,
                      description: getCategoryLabel(item.category_detected),
                      status: item.status === "Accepted" ? "in_progress" : "pending",
                      priority: item.confidence_score >= 0.9 ? "urgent" : "high",
                      date: new Date().toISOString().slice(0, 10),
                      category: getCategoryLabel(item.category_detected),
                    }}
                  />
                ))}
              </div>
            </section>
          )}
        </>
      )}
    </div>
  );
}
