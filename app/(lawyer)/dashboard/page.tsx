import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard - Advogado | Voz Justa",
  description: "Painel de gestão para advogados da plataforma Voz Justa",
};

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
    </div>
  );
}
