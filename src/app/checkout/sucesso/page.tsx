"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSubscriptionStore } from "@/store/subscription.store";
import { useAuthStore } from "@/store/auth.store";

export default function CheckoutSucessoPage() {
  const router = useRouter();
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const { fetchSubscription, subscription, isLoading } = useSubscriptionStore();

  useEffect(() => {
    if (isAuthenticated) {
      fetchSubscription();
    }
  }, [isAuthenticated, fetchSubscription]);

  return (
    <main className="min-h-screen bg-slate-950 flex items-center justify-center px-6">
      <div className="max-w-md w-full text-center space-y-8">
        <div className="text-6xl">✅</div>

        <div className="space-y-3">
          <h1 className="text-3xl font-bold text-white">
            Assinatura confirmada!
          </h1>
          <p className="text-slate-400">
            {isLoading
              ? "Carregando seus dados..."
              : subscription
              ? `Você agora tem acesso ao plano ${subscription.plan.name}.`
              : "Seu pagamento foi processado com sucesso."}
          </p>
        </div>

        <div className="flex flex-col gap-3">
          <button
            onClick={() => router.push("/dashboard")}
            className="w-full py-3 px-6 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-full transition-colors"
          >
            Ir para o Dashboard
          </button>
          <button
            onClick={() => router.push("/minha-conta/assinatura")}
            className="w-full py-3 px-6 bg-slate-800 hover:bg-slate-700 text-white font-semibold rounded-full transition-colors"
          >
            Ver minha assinatura
          </button>
        </div>
      </div>
    </main>
  );
}
