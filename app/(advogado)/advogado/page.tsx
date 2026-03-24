import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard do Advogado | Voz Justa",
  description: "Painel principal do advogado para gerenciar casos e solicitações",
};

export default function LawyerDashboardPage() {
  return (
    <section aria-label="Dashboard do Advogado">
      <h1 className="text-2xl font-bold text-white tracking-tight mb-6">
        Dashboard
      </h1>
      <p className="text-text-secondary">
        Bem-vindo ao painel do advogado. Use o menu lateral para gerenciar suas solicitações e casos.
      </p>
    </section>
  );
}
