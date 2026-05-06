"use client";

import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import {
  ArrowBackRounded,
  VerifiedRounded,
  WorkRounded,
  GavelRounded,
} from "@mui/icons-material";
import { Button } from "@/components/ui/button";
import type { LawyerDetail } from "@/services/lawyers.service";
import { getCategoryLabel } from "@/lib/status";
import { useChatStore } from "@/store/chat.store";

interface LawyerProfileFeatureProps {
  lawyer: LawyerDetail;
  lawyerId: string;
}

export function LawyerProfileFeature({ lawyer, lawyerId }: LawyerProfileFeatureProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const chatStore = useChatStore();
  const caseId = searchParams.get("caseId") || chatStore.caseId || "";
  const reportId = chatStore.reportId || "";

  const handleContact = () => {
    const params = new URLSearchParams();
    if (caseId) params.set("caseId", caseId);
    if (reportId) params.set("reportId", reportId);
    const query = params.toString() ? `?${params.toString()}` : "";
    router.push(`/dashboard/advogados/${lawyerId}/enviar${query}`);
  };

  return (
    <div className="flex flex-col gap-6 w-full max-w-4xl mx-auto px-4 py-6 md:px-6 md:py-8">
      <header className="flex items-center gap-3">
        <button
          type="button"
          onClick={() => router.back()}
          aria-label="Voltar"
          className="flex items-center justify-center w-9 h-9 rounded-lg text-white/50 hover:text-white hover:bg-white/08 transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2585F4]"
        >
          <ArrowBackRounded fontSize="small" aria-hidden />
        </button>
        <h1 className="text-2xl font-bold text-white tracking-tight">
          Perfil do Especialista
        </h1>
      </header>

      <article className="bg-[#0d1526] border border-[#1B2233] rounded-3xl overflow-hidden">
        <header className="relative bg-linear-to-b from-[#2585F4]/10 to-transparent p-8">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
            {lawyer.avatar_image ? (
              <figure>
                <Image
                  src={lawyer.avatar_image}
                  alt={`Foto de ${lawyer.full_name}`}
                  width={120}
                  height={120}
                  className="w-28 h-28 md:w-32 md:h-32 rounded-2xl object-cover border-4 border-[#0d1526]"
                />
              </figure>
            ) : (
              <div
                className="flex items-center justify-center w-28 h-28 md:w-32 md:h-32 rounded-2xl bg-[#2585F4]/20 border-4 border-[#0d1526] text-4xl font-bold text-[#2585F4]"
                aria-hidden="true"
              >
                {lawyer.full_name[0]}
              </div>
            )}

            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <h2 className="text-2xl font-bold text-white">{lawyer.full_name}</h2>
                <VerifiedRounded className="text-[#2585F4]" sx={{ fontSize: 20 }} aria-label="Perfil verificado" />
              </div>

              {lawyer.bio && (
                <p className="text-sm text-white/70 mb-4">{lawyer.bio}</p>
              )}
            </div>
          </div>
        </header>

        <section className="p-8 space-y-6" aria-labelledby="lawyer-details-heading">
          <h3 id="lawyer-details-heading" className="sr-only">Informações detalhadas</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-start gap-3">
              <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-[#2585F4]/15 shrink-0">
                <WorkRounded fontSize="small" className="text-[#2585F4]" aria-hidden />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="text-xs font-semibold uppercase tracking-wide text-white/40 mb-1">Especialização</h4>
                <p className="text-sm font-medium text-white">{getCategoryLabel(lawyer.specialization)}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-green-500/15 shrink-0">
                <GavelRounded fontSize="small" className="text-green-400" aria-hidden />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="text-xs font-semibold uppercase tracking-wide text-white/40 mb-1">OAB</h4>
                <p className="text-sm font-medium text-white">
                  {lawyer.oab_number} — {lawyer.oab_state}
                </p>
              </div>
            </div>
          </div>
        </section>

        <footer className="border-t border-[#1B2233] p-8 bg-[#0a0f1a]/50">
          <Button variant="primary" size="lg" fullWidth onClick={handleContact}>
            Solicitar Atendimento
          </Button>
        </footer>
      </article>
    </div>
  );
}
