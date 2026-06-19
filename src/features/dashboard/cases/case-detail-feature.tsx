"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useTranslation } from "react-i18next";
import { ArrowBackRounded, SummarizeRounded, DownloadingRounded, GavelRounded } from "@mui/icons-material";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useReportDownload } from "@/hooks/useReportDownload";
import { useChatStore } from "@/store/chat.store";
import { useCaseMapStore } from "@/store/case-map.store";
import { useToast } from "@/components/ui/toast/toast-provider";
import type { DetailsReport } from "@/services/dashboard.service";
import type { CaseStatus } from "@/components/ui/case-card/case-card.types";
import { getCategoryLabel } from "@/lib/status";

function apiStatusToCaseStatus(status: string): CaseStatus {
  const s = status?.toLowerCase();
  if (s === "concluded" || s === "completed" || s === "accepted") return "concluded";
  if (s === "rejected" || s === "archived" || s === "refused") return "archived";
  if (s === "pending") return "pending";
  return "analysis";
}

interface CaseDetailFeatureProps {
  report: DetailsReport;
  reportId: string;
}

export function CaseDetailFeature({ report, reportId }: CaseDetailFeatureProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const chatStore = useChatStore();
  const caseMapStore = useCaseMapStore();
  const { toast } = useToast();
  const { t } = useTranslation();
  const caseStatus = apiStatusToCaseStatus(report.status);

  const bannerConfig: Record<CaseStatus, { dot: string; title: string; border: string; bg: string; label: string }> = {
    analysis: {
      dot: "bg-[#2585F4] animate-[analyzing-pulse_1.4s_ease-in-out_infinite]",
      title: "text-white",
      border: "border-[#2585F4]/40",
      bg: "bg-[#0d1a2e]",
      label: t("caseDetail.status.inAnalysis"),
    },
    concluded: {
      dot: "bg-green-400",
      title: "text-green-400",
      border: "border-green-500/30",
      bg: "bg-[#0b1f14]",
      label: t("caseDetail.status.completed"),
    },
    pending: {
      dot: "bg-blue-400 animate-[analyzing-pulse_1.4s_ease-in-out_infinite]",
      title: "text-blue-400",
      border: "border-blue-500/30",
      bg: "bg-[#0d1526]",
      label: t("caseDetail.status.pending"),
    },
    archived: {
      dot: "bg-white/30",
      title: "text-white/50",
      border: "border-white/10",
      bg: "bg-white/03",
      label: t("caseDetail.status.archived"),
    },
  };

  const banner = bannerConfig[caseStatus];
  const { downloadPdf, isDownloading } = useReportDownload();

  const caseId =
    report.caseId ||
    searchParams.get("caseId") ||
    caseMapStore.get(reportId) ||
    (chatStore.reportId === reportId ? chatStore.caseId : "") ||
    "";

  // Show the button whenever case is sendable — caseId validation happens on click
  const canSendToLawyer = !report.lawyer && caseStatus !== "archived";

  const handleSendToLawyer = () => {
    if (!caseId) {
      toast({
        title: "Caso não identificado",
        description: "Não foi possível identificar este caso. Acesse-o novamente pela lista de Meus Casos.",
        variant: "error",
      });
      return;
    }
    const params = new URLSearchParams({ reportId, caseId });
    router.push(`/dashboard/advogados?${params.toString()}`);
  };

  const protocol = `#${reportId.slice(0, 8).toUpperCase()}`;

  return (
    <div className="relative flex flex-col gap-6 w-full mx-auto px-4 py-6 md:px-6 md:py-8 pb-28">
      <header className="flex items-center gap-3">
        <Link
          href="/dashboard/casos"
          aria-label="Voltar para Meus Casos"
          className="flex items-center justify-center w-9 h-9 rounded-lg text-white/50 hover:text-white hover:bg-white/08 transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2585F4]"
        >
          <ArrowBackRounded fontSize="small" aria-hidden />
        </Link>
        <div className="min-w-0">
          <h1 className="text-xl font-bold text-white tracking-tight truncate">
            {report.title || getCategoryLabel(report.category_detected) || "Caso"}
          </h1>
          <p className="text-xs text-white/40 font-mono mt-0.5">Protocolo {protocol}</p>
        </div>
      </header>

      <section
        aria-labelledby="status-heading"
        className={cn("rounded-2xl border px-6 py-5", banner.bg, banner.border)}
      >
        <p className="text-xs font-semibold tracking-widest uppercase text-white/45 mb-2">
          Status Atual
        </p>
        <div className="flex items-center gap-2.5 mb-1">
          <h2
            id="status-heading"
            className={cn("text-xl font-extrabold tracking-tight uppercase", banner.title)}
          >
            {banner.label}
          </h2>
          <span className={cn("w-2.5 h-2.5 rounded-full shrink-0", banner.dot)} aria-hidden />
        </div>
      </section>

      {report.simplified_explanation && (
        <section aria-labelledby="summary-heading">
          <h2
            id="summary-heading"
            className="text-xs font-semibold tracking-widest uppercase text-white/40 mb-4"
          >
            Resumo Simplificado
          </h2>
          <p className="rounded-2xl border border-[#1B2233] bg-[#111c30] px-6 py-5 text-sm text-white/75 leading-relaxed whitespace-pre-wrap">
            {report.simplified_explanation}
          </p>
        </section>
      )}

      {report.legal_analysis && (
        <section aria-labelledby="legal-heading">
          <h2
            id="legal-heading"
            className="text-xs font-semibold tracking-widest uppercase text-white/40 mb-4"
          >
            Análise Jurídica
          </h2>
          <p className="rounded-2xl border border-[#1B2233] bg-[#111c30] px-6 py-5 text-sm text-white/75 leading-relaxed whitespace-pre-wrap">
            {report.legal_analysis}
          </p>
        </section>
      )}

      {report.transcription && (
        <section aria-labelledby="transcription-heading">
          <h2
            id="transcription-heading"
            className="text-xs font-semibold tracking-widest uppercase text-white/40 mb-4"
          >
            Relato Original
          </h2>
          <blockquote className="rounded-2xl border border-[#1B2233] bg-[#111c30] px-6 py-5 text-sm text-white/75 leading-relaxed italic whitespace-pre-wrap">
            {report.transcription}
          </blockquote>
        </section>
      )}

      {report.evidence && report.evidence.length > 0 && (
        <section aria-labelledby="docs-heading">
          <header className="flex items-center justify-between mb-4">
            <h2
              id="docs-heading"
              className="text-xs font-semibold tracking-widest uppercase text-white/40"
            >
              Evidências
            </h2>
            <span className="text-xs text-white/35">
              {report.evidence.length} arquivo{report.evidence.length !== 1 ? "s" : ""}
            </span>
          </header>
          <ul className="flex flex-col gap-2">
            {report.evidence.map((url, i) => (
              <li key={i}>
                <a
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 rounded-xl border border-[#1B2233] bg-[#111c30] px-4 py-3 text-sm text-[#2585F4] hover:bg-[#0d1526] transition-colors"
                >
                  <SummarizeRounded fontSize="small" aria-hidden />
                  Evidência {i + 1}
                </a>
              </li>
            ))}
          </ul>
        </section>
      )}

      {report.lawyer && (
        <section
          aria-labelledby="lawyer-heading"
          className="rounded-2xl border border-[#1B2233] bg-[#111c30] px-6 py-5"
        >
          <h2
            id="lawyer-heading"
            className="text-xs font-semibold tracking-widest uppercase text-white/40 mb-3"
          >
            Advogado Responsável
          </h2>
          <p className="text-sm font-semibold text-white mb-2">{report.lawyer.full_name}</p>
          {report.lawyer.bio && (
            <p className="text-xs text-white/55 leading-relaxed mb-2">{report.lawyer.bio}</p>
          )}
          {report.lawyer.email && (
            <div className="flex items-baseline gap-1.5 mt-1">
              <span className="text-xs font-semibold text-white/40 uppercase tracking-wide shrink-0">E-mail:</span>
              <a
                href={`mailto:${report.lawyer.email}`}
                className="text-sm text-[#2585F4] hover:underline truncate"
              >
                {report.lawyer.email}
              </a>
            </div>
          )}
          {report.lawyer.phone && (
            <div className="flex items-baseline gap-1.5 mt-1">
              <span className="text-xs font-semibold text-white/40 uppercase tracking-wide shrink-0">Telefone:</span>
              <a
                href={`tel:${report.lawyer.phone}`}
                className="text-sm text-[#2585F4] hover:underline"
              >
                {report.lawyer.phone}
              </a>
            </div>
          )}
        </section>
      )}

      <div className="fixed bottom-0 left-0 right-0 lg:left-60 z-10 flex flex-row items-center justify-end gap-3 border-t border-[#1B2233] bg-[#080f1c]/95 backdrop-blur-sm px-4 py-3">
        {canSendToLawyer && (
          <Button
            variant="outline"
            size="md"
            leftIcon={<GavelRounded fontSize="small" aria-hidden />}
            onClick={handleSendToLawyer}
            className="border-[#2585F4]/40 text-[#2585F4] hover:bg-[#2585F4]/10"
          >
            Enviar para Advogado
          </Button>
        )}
        <Button
          variant="primary"
          size="md"
          leftIcon={
            isDownloading ? (
              <DownloadingRounded fontSize="small" aria-hidden />
            ) : (
              <SummarizeRounded fontSize="small" aria-hidden />
            )
          }
          onClick={() => downloadPdf(reportId)}
          disabled={isDownloading}
        >
          {isDownloading ? "Baixando..." : "Baixar Relatório"}
        </Button>
      </div>
    </div>
  );
}
