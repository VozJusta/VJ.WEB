"use client";

import { useAuthStore } from "@/store/auth.store";
import { QuickActionsSection } from "./sections/quick-actions-section";
import { CasesSection } from "./sections/cases-section";

export function DashboardFeature() {
  const user = useAuthStore((s) => s.user);
  const firstName = user?.fullName?.split(' ')[0] || 'Usuário';

  return (
    <>
      <div className="flex flex-col gap-1">
        <h1 className="text-3xl font-bold text-foreground">Olá, {firstName}!</h1>
        <p className="text-sm text-text-secondary">
          Bem-vindo ao seu painel jurídico. Como podemos ajudar hoje?
        </p>
      </div>

      <QuickActionsSection />

      <CasesSection />
    </>
  );
}
