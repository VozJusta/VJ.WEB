"use client";

import { useRouter } from "next/navigation";

export default function CheckoutCanceladoPage() {
  const router = useRouter();

  return (
    <main className="min-h-screen bg-slate-950 flex items-center justify-center px-6">
      <div className="max-w-md w-full text-center space-y-8">
        <div className="text-6xl">↩️</div>

        <div className="space-y-3">
          <h1 className="text-3xl font-bold text-white">
            Pagamento cancelado
          </h1>
          <p className="text-slate-400">
            Você cancelou o processo de assinatura. Nenhuma cobrança foi
            realizada.
          </p>
        </div>

        <div className="flex flex-col gap-3">
          <button
            onClick={() => router.push("/#plans-section")}
            className="w-full py-3 px-6 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-full transition-colors"
          >
            Ver planos novamente
          </button>
          <button
            onClick={() => router.push("/")}
            className="w-full py-3 px-6 bg-slate-800 hover:bg-slate-700 text-white font-semibold rounded-full transition-colors"
          >
            Voltar para início
          </button>
        </div>
      </div>
    </main>
  );
}
