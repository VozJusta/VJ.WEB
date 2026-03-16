import type { Metadata } from "next";
import { StatCard } from "@/components/ui/stat-card";
import { ProductivityChart } from "@/components/ui/productivity-chart";
import { OperationalStatus } from "@/components/ui/operational-status";
import { PriorityRequestCard } from "@/components/ui/priority-request-card";
import type {
  StatCardData,
  ChartDataPoint,
  OperationalStatus as OperationalStatusType,
  PriorityRequest,
} from "@/types/dashboard.types";

export const metadata: Metadata = {
  title: "Dashboard - Advogado | Voz Justa",
  description: "Painel de gestão para advogados da plataforma Voz Justa",
};

const statsData: StatCardData[] = [
  {
    label: "SOLICITAÇÕES NO MÊS",
    value: 142,
    change: 12,
    isPositive: true,
  },
  {
    label: "CASOS ACEITOS",
    value: "89%",
    change: 2,
    isPositive: false,
  },
  {
    label: "MÉDIA DE RESPOSTA",
    value: 1.2,
    change: 15,
    isPositive: true,
    unit: "dias",
  },
];

const generateChartData = (): ChartDataPoint[] => {
  const data: ChartDataPoint[] = [];
  const baseValue = 40;

  for (let i = 1; i <= 30; i++) {
    const variation = Math.sin(i / 5) * 20 + Math.random() * 15;
    data.push({
      date: i.toString(),
      value: Math.round(baseValue + variation),
    });
  }

  return data;
};

const chartData = generateChartData();

const operationalStatuses: OperationalStatusType[] = [
  { label: "EM ANÁLISE", value: 24, color: "rgb(59, 130, 246)" },
  { label: "CONCLUÍDOS", value: 12, color: "rgb(34, 197, 94)" },
  { label: "NOVOS PEDIDOS", value: 5, color: "rgb(251, 146, 60)" },
];

const priorityRequests: PriorityRequest[] = [
  {
    id: "1",
    score: 95,
    title: "Despejo injusto - Família com 3 crianças",
    description:
      "Família está sendo despejada sem aviso prévio adequado, com crianças em idade escolar. Caso requer atenção imediata.",
    status: "pending",
    priority: "urgent",
    date: "2026-03-15",
    category: "Direito Imobiliário",
  },
  {
    id: "2",
    score: 88,
    title: "Demissão sem justa causa durante licença médica",
    description:
      "Trabalhador foi demitido durante afastamento por problema de saúde comprovado por atestado médico.",
    status: "in_progress",
    priority: "high",
    date: "2026-03-14",
    category: "Direito Trabalhista",
  },
  {
    id: "3",
    score: 82,
    title: "Negação de cobertura para cirurgia essencial",
    description:
      "Plano de saúde negou cobertura para procedimento cirúrgico prescrito por médico, alegando cláusula contratual.",
    status: "pending",
    priority: "high",
    date: "2026-03-13",
    category: "Direito do Consumidor",
  },
];

export default function LawyerDashboardPage() {
  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Dashboard
        </h1>
        <p className="mt-2 text-base text-foreground-muted">
          Visão geral da sua atividade profissional
        </p>
      </header>

      <section aria-labelledby="stats-heading">
        <h2 id="stats-heading" className="sr-only">
          Estatísticas do mês
        </h2>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {statsData.map((stat, index) => (
            <StatCard
              key={index}
              label={stat.label}
              value={stat.value}
              change={stat.change}
              isPositive={stat.isPositive}
              unit={stat.unit}
            />
          ))}
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
              Volume de casos processados nos últimos 30 dias
            </p>
          </header>

          <ProductivityChart data={chartData} className="h-80" />
        </section>

        <OperationalStatus statuses={operationalStatuses} progressPercent={60} />
      </div>

      <section aria-labelledby="priority-requests-heading">
        <header className="mb-6">
          <h2
            id="priority-requests-heading"
            className="text-2xl font-bold tracking-tight text-foreground"
          >
            Solicitações de Alta Relevância
          </h2>
          <p className="mt-2 text-base text-text-secondary">
            Casos que requerem sua atenção prioritária baseados em urgência e impacto social
          </p>
        </header>

        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 xl:grid-cols-3">
          {priorityRequests.map((request) => (
            <PriorityRequestCard key={request.id} request={request} />
          ))}
        </div>
      </section>
    </div>
  );
}

