"use client";

import { useRouter } from "next/navigation";
import {
  AssignmentTurnedInRounded,
  BarChartRounded,
  GroupsRounded,
  HomeRounded,
  DownloadingRounded,
} from "@mui/icons-material";
import { Button } from "@/components/ui/button";
import { useReportDownload } from "@/hooks/useReportDownload";
import type { DetailsReport } from "@/services/dashboard.service";

interface CaseAnalysisCompleteFeatureProps {
  caseId: string;
  reportId: string;
  report: DetailsReport | null;
  isLoading?: boolean;
}

export function CaseAnalysisCompleteFeature({
  caseId,
  reportId,
  report,
  isLoading,
}: CaseAnalysisCompleteFeatureProps) {
  const router = useRouter();
  const { downloadPdf, isDownloading } = useReportDownload();

  const category = report?.category_detected ?? "Analisando...";
  const referenceId = `#${reportId.slice(0, 8).toUpperCase()}`;

  const handleViewLawyers = () => {
    router.push(`/dashboard/advogados?caseId=${caseId}`);
  };

  return (
    <div className="flex flex-col min-h-screen w-full px-4 py-6 md:px-6 md:py-8">
      <header className="w-full max-w-3xl mx-auto mb-8" aria-label="Progresso da análise">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-[#2585F4]">
            Processamento IA
          </span>
          <span className="text-xs font-semibold text-[#2585F4]">100% Concluído</span>
        </div>
        <div
          className="h-1.5 w-full bg-[#1B2233] rounded-full overflow-hidden"
          role="progressbar"
          aria-valuenow={100}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label="Progresso da análise"
        >
          <div
            className="h-full bg-linear-to-r from-[#2585F4] to-[#4da3ff] rounded-full transition-all duration-500"
            style={{ width: "100%" }}
          />
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center py-8">
        <article
          className="w-full max-w-2xl bg-[#0d1526] border border-[#1B2233] rounded-3xl p-8 md:p-12"
          aria-labelledby="analysis-complete-title"
        >
          <header className="flex flex-col items-center text-center mb-8">
            <div
              className="flex items-center justify-center w-16 h-16 rounded-2xl bg-[#2585F4] mb-6"
              aria-hidden="true"
            >
              <AssignmentTurnedInRounded sx={{ fontSize: 32 }} className="text-white" />
            </div>

            <h1
              id="analysis-complete-title"
              className="text-2xl md:text-3xl font-bold text-white mb-3"
            >
              Análise da IA finalizada
            </h1>

            <p className="text-sm text-white/60 max-w-md leading-relaxed">
              Nossa IA processou seu relato e documentos com sucesso. Seu diagnóstico jurídico está
              pronto para visualização.
            </p>
          </header>

          {isLoading ? (
            <div className="flex flex-col gap-3 mb-8">
              <div className="h-16 animate-pulse rounded-xl bg-[#111c30]" />
              <div className="h-16 animate-pulse rounded-xl bg-[#111c30]" />
            </div>
          ) : (
            <section
              className="flex flex-col sm:flex-row gap-4 mb-8"
              aria-label="Resultados da análise"
            >
              <div className="flex-1 flex items-center gap-3 px-4 py-3 bg-[#111c30] border border-[#1B2233] rounded-xl">
                <div
                  className="flex items-center justify-center w-10 h-10 rounded-lg bg-blue-500/15"
                  aria-hidden="true"
                >
                  <BarChartRounded fontSize="small" className="text-blue-400" />
                </div>
                <div className="flex-1 min-w-0">
                  <h2 className="text-xs font-medium text-white/40 uppercase tracking-wide mb-0.5">
                    Categoria
                  </h2>
                  <p className="text-sm font-semibold text-white truncate">{category}</p>
                </div>
              </div>

              {report?.simplified_explanation && (
                <div className="flex-1 flex items-center gap-3 px-4 py-3 bg-[#111c30] border border-[#1B2233] rounded-xl">
                  <div
                    className="flex items-center justify-center w-10 h-10 rounded-lg bg-green-500/15"
                    aria-hidden="true"
                  >
                    <BarChartRounded fontSize="small" className="text-green-400" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h2 className="text-xs font-medium text-white/40 uppercase tracking-wide mb-0.5">
                      Status
                    </h2>
                    <p className="text-sm font-semibold text-white truncate">
                      {report.status ?? "Gerado"}
                    </p>
                  </div>
                </div>
              )}
            </section>
          )}

          <section className="flex flex-col gap-3" aria-label="Ações disponíveis">
            <Button
              variant="primary"
              size="lg"
              fullWidth
              onClick={() => downloadPdf(reportId)}
              disabled={isDownloading || !reportId}
              leftIcon={
                isDownloading ? (
                  <DownloadingRounded fontSize="small" aria-hidden />
                ) : (
                  <BarChartRounded fontSize="small" aria-hidden />
                )
              }
            >
              {isDownloading ? "Baixando..." : "Baixar Relatório Completo"}
            </Button>

            <Button
              variant="secondary"
              size="lg"
              fullWidth
              onClick={handleViewLawyers}
              leftIcon={<GroupsRounded fontSize="small" aria-hidden />}
            >
              Lista de advogados parceiros
            </Button>

            <Button
              variant="ghost"
              size="lg"
              fullWidth
              onClick={() => router.push("/dashboard")}
              leftIcon={<HomeRounded fontSize="small" aria-hidden />}
              className="border border-[#1B2233] text-white/70 hover:text-white hover:bg-white/05"
            >
              Ir para página inicial
            </Button>
          </section>
        </article>
      </main>

      <footer className="w-full max-w-3xl mx-auto mt-4">
        <p className="text-center text-xs text-white/25">
          Ref. ID: {referenceId} • A análise automatizada não substitui o acompanhamento legal
          humano.
        </p>
      </footer>
    </div>
  );
}
