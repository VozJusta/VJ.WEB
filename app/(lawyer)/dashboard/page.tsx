import type { Metadata } from "next";
import { StatCard } from "@/components/ui/stat-card";
import type { StatCardData } from "@/types/dashboard.types";

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
    </div>
  );
}

