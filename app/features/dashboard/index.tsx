import { QuickActionsSection } from "./sections/quick-actions-section";
import { CasesSection } from "./sections/cases-section";

type DashboardFeatureProps = {
  userName: string;
};

export function DashboardFeature({ userName }: DashboardFeatureProps) {
  return (
    <>
      <div className="flex flex-col gap-1">
        <h1 className="text-3xl font-bold text-[var(--foreground)]">
          Olá, {userName}!
        </h1>
        <p className="text-sm text-[var(--text-secondary)]">
          Bem-vindo ao seu painel jurídico. Como podemos ajudar hoje?
        </p>
      </div>

      <QuickActionsSection />

      <CasesSection />
    </>
  );
}
