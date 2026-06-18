"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSubscriptionStore } from "@/store/subscription.store";
import { useAuthStore } from "@/store/auth.store";
import { createBillingPortal } from "@/services/payment.service";

const STATUS_LABEL: Record<string, string> = {
  active: "Ativa",
  past_due: "Pagamento pendente",
  canceled: "Cancelada",
  unpaid: "Não paga",
  inactive: "Inativa",
};

const STATUS_COLOR: Record<string, string> = {
  active: "text-green-400",
  past_due: "text-yellow-400",
  canceled: "text-red-400",
  unpaid: "text-red-400",
  inactive: "text-slate-400",
};

export default function AssinaturaPage() {
  const router = useRouter();
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const { subscription, isLoading, error, fetchSubscription } =
    useSubscriptionStore();
  const [portalLoading, setPortalLoading] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) {
      router.replace("/login");
      return;
    }
    fetchSubscription();
  }, [isAuthenticated, fetchSubscription, router]);

  async function handleBillingPortal() {
    setPortalLoading(true);
    try {
      const { url } = await createBillingPortal();
      router.push(url);
    } catch {
      alert("Erro ao abrir portal de assinatura. Tente novamente.");
    } finally {
      setPortalLoading(false);
    }
  }

  if (isLoading) {
    return (
      <main className="min-h-screen bg-slate-950 flex items-center justify-center">
        <p className="text-slate-400">Carregando assinatura...</p>
      </main>
    );
  }

  if (error || !subscription) {
    return (
      <main className="min-h-screen bg-slate-950 flex items-center justify-center px-6">
        <div className="max-w-md w-full text-center space-y-6">
          <h1 className="text-2xl font-bold text-white">Sem assinatura ativa</h1>
          <p className="text-slate-400">
            Você ainda não possui um plano ativo. Escolha um plano para começar.
          </p>
          <button
            onClick={() => router.push("/#plans-section")}
            className="w-full py-3 px-6 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-full transition-colors"
          >
            Ver Planos
          </button>
        </div>
      </main>
    );
  }

  const statusLabel = STATUS_LABEL[subscription.status] ?? subscription.status;
  const statusColor = STATUS_COLOR[subscription.status] ?? "text-slate-400";
  const renewalDate = new Date(subscription.currentPeriodEnd).toLocaleDateString(
    "pt-BR",
    { day: "2-digit", month: "long", year: "numeric" }
  );

  return (
    <main className="min-h-screen bg-slate-950 py-16 px-6">
      <div className="max-w-2xl mx-auto space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-white">Minha Assinatura</h1>
          <p className="text-slate-400 mt-1">Gerencie seu plano e faturamento</p>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-400 mb-1">Plano atual</p>
              <p className="text-xl font-bold text-white">{subscription.plan.name}</p>
            </div>
            <span className={`text-sm font-semibold ${statusColor}`}>
              {statusLabel}
            </span>
          </div>

          {subscription.plan.billingType === "Monthly" && (
            <div className="text-sm text-slate-400">
              Próxima renovação:{" "}
              <span className="text-white font-medium">{renewalDate}</span>
            </div>
          )}

          <div className="grid grid-cols-3 gap-4 pt-4 border-t border-slate-800">
            {subscription.plan.maxInterviews !== 0 && (
              <div className="text-center">
                <p className="text-lg font-bold text-white">
                  {subscription.interviewsUsed}
                  {subscription.plan.maxInterviews > 0
                    ? ` / ${subscription.plan.maxInterviews}`
                    : ""}
                </p>
                <p className="text-xs text-slate-400 mt-1">Diagnósticos usados</p>
              </div>
            )}
            {subscription.plan.maxSimulation !== 0 && (
              <div className="text-center">
                <p className="text-lg font-bold text-white">
                  {subscription.simulationsUsed}
                  {subscription.plan.maxSimulation > 0
                    ? ` / ${subscription.plan.maxSimulation}`
                    : ""}
                </p>
                <p className="text-xs text-slate-400 mt-1">Simulações usadas</p>
              </div>
            )}
            {subscription.plan.maxLeads !== 0 && (
              <div className="text-center">
                <p className="text-lg font-bold text-white">
                  {subscription.leadsUsed}
                  {subscription.plan.maxLeads > 0
                    ? ` / ${subscription.plan.maxLeads}`
                    : ""}
                </p>
                <p className="text-xs text-slate-400 mt-1">Leads usados</p>
              </div>
            )}
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <button
            onClick={handleBillingPortal}
            disabled={portalLoading}
            className="w-full py-3 px-6 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-semibold rounded-full transition-colors"
          >
            {portalLoading ? "Abrindo portal..." : "Gerenciar Assinatura"}
          </button>
          <button
            onClick={() => router.push("/#plans-section")}
            className="w-full py-3 px-6 bg-slate-800 hover:bg-slate-700 text-white font-semibold rounded-full transition-colors"
          >
            Fazer Upgrade
          </button>
        </div>
      </div>
    </main>
  );
}
