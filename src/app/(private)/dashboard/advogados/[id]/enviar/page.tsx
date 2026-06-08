"use client";

import { use, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { WarningAmberRounded, TaskAltRounded } from "@mui/icons-material";
import { DossierSentFeature } from "@/features/dashboard/lawyers/dossier-sent-feature";
import { useLawyerProfile } from "@/hooks/useLawyerProfile";
import { lawyersService } from "@/services/lawyers.service";
import { useToast } from "@/components/ui/toast/toast-provider";
import { Button } from "@/components/ui/button";

interface DossierSentPageProps {
  params: Promise<{ id: string }>;
}

export default function DossierSentPage({ params }: DossierSentPageProps) {
  const { id: lawyerId } = use(params);
  const searchParams = useSearchParams();
  // Only use URL params — never fall back to chat store, which may hold a different case
  const caseId = searchParams.get("caseId") ?? "";
  const reportId = searchParams.get("reportId") ?? "";
  const router = useRouter();
  const { toast } = useToast();

  const { lawyer, isLoading } = useLawyerProfile(lawyerId);
  const [isSending, setIsSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [showModal, setShowModal] = useState(true);

  const handleSend = async () => {
    if (!caseId) return;
    setIsSending(true);
    try {
      await lawyersService.sendRequest(caseId, lawyerId);
      setSent(true);
      setShowModal(false);
    } catch (err) {
      const message = err instanceof Error ? err.message : "Erro ao enviar solicitação";
      const isDuplicate =
        message.toLowerCase().includes("já existe") ||
        message.toLowerCase().includes("conflict") ||
        message.includes("409");

      if (isDuplicate) {
        toast({
          title: "Solicitação já enviada",
          description: "Já existe uma solicitação para este advogado neste caso.",
          variant: "error",
        });
        setShowModal(false);
        router.back();
      } else {
        toast({
          title: "Erro ao enviar",
          description: message,
          variant: "error",
        });
      }
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
    <>
      {showModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm px-4 cursor-pointer"
          onClick={() => router.back()}
        >
          <div
            className="w-full max-w-md rounded-2xl bg-[#111c30] border border-[#1B2233] p-6 flex flex-col gap-5"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-3">
              <span className="flex items-center justify-center w-10 h-10 rounded-full bg-[#2585F4]/15">
                <TaskAltRounded className="text-[#2585F4]" />
              </span>
              <h2 className="text-lg font-bold text-white">Enviar Caso</h2>
            </div>

            <p className="text-sm text-white/60 leading-relaxed">
              Deseja enviar seu dossiê técnico para{" "}
              <strong className="text-white">{lawyer?.full_name ?? "este advogado"}</strong>?
              O advogado receberá o caso e poderá aceitar ou recusar.
            </p>

            {!caseId && (
              <div className="flex items-start gap-2 rounded-lg bg-yellow-500/10 border border-yellow-500/30 px-4 py-3">
                <WarningAmberRounded className="text-yellow-400 shrink-0 mt-0.5" fontSize="small" />
                <p className="text-sm text-yellow-400">
                  Nenhum caso selecionado. Volte para a análise do seu caso antes de enviar.
                </p>
              </div>
            )}

            <div className="flex gap-3">
              <Button
                variant="ghost"
                size="md"
                fullWidth
                onClick={() => router.back()}
                disabled={isSending}
                className="border border-[#1B2233] text-white/70 hover:text-white hover:bg-white/8"
              >
                Cancelar
              </Button>
              <Button
                variant="primary"
                size="md"
                fullWidth
                loading={isSending}
                disabled={isSending || !caseId}
                onClick={handleSend}
              >
                Confirmar Envio
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
