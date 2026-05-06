"use client";

import { use, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { DossierSentFeature } from "@/features/dashboard/lawyers/dossier-sent-feature";
import { useLawyerProfile } from "@/hooks/useLawyerProfile";
import { lawyersService } from "@/services/lawyers.service";
import { useChatStore } from "@/store/chat.store";

interface DossierSentPageProps {
  params: Promise<{ id: string }>;
}

export default function DossierSentPage({ params }: DossierSentPageProps) {
  const { id: lawyerId } = use(params);
  const searchParams = useSearchParams();
  const chatStore = useChatStore();
  const caseId = searchParams.get("caseId") || chatStore.caseId || "";
  const reportId = searchParams.get("reportId") || chatStore.reportId || "";
  const router = useRouter();

  const { lawyer, isLoading } = useLawyerProfile(lawyerId);
  const [isSending, setIsSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSend = async () => {
    if (!caseId) {
      setError("ID do caso não encontrado. Volte e tente novamente.");
      return;
    }
    setIsSending(true);
    setError(null);
    try {
      await lawyersService.sendRequest(caseId, lawyerId);
      setSent(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro ao enviar solicitação");
    } finally {
      setIsSending(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen px-4">
        <div className="h-8 w-48 animate-pulse rounded-lg bg-white/8" />
      </div>
    );
  }

  if (sent) {
    return (
      <DossierSentFeature
        lawyerName={lawyer?.full_name ?? "Advogado"}
        lawyerId={lawyerId}
        reportId={reportId || undefined}
      />
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen w-full px-4 py-12 gap-6">
      <h1 className="text-2xl font-bold text-white text-center">
        Enviar caso para {lawyer?.full_name ?? "advogado"}?
      </h1>
      <p className="text-sm text-white/60 text-center max-w-md">
        O advogado receberá seu dossiê técnico e poderá aceitar ou recusar o caso.
      </p>

      {error && <p className="text-sm text-red-400">{error}</p>}

      {!caseId && (
        <p className="text-sm text-yellow-400 text-center max-w-md">
          Nenhum caso selecionado. Volte para a análise do seu caso antes de enviar.
        </p>
      )}

      <div className="flex gap-3 w-full max-w-sm">
        <button
          type="button"
          onClick={() => router.back()}
          className="flex-1 rounded-xl border border-white/10 py-3 text-sm font-medium text-white/70 hover:text-white hover:bg-white/05 transition-all"
        >
          Cancelar
        </button>
        <button
          type="button"
          onClick={handleSend}
          disabled={isSending || !caseId}
          className="flex-1 rounded-xl bg-[#2585F4] py-3 text-sm font-semibold text-white hover:bg-[#1978E5] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSending ? "Enviando..." : "Confirmar Envio"}
        </button>
      </div>
    </div>
  );
}
