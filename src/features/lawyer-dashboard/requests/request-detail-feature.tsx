"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  ArrowBackRounded,
  CheckRounded,
  CloseRounded,
  CheckCircleRounded,
  DescriptionRounded,
  DownloadingRounded,
} from "@mui/icons-material";
import { Button } from "@/components/ui/button";
import { ContactInfoCard } from "@/components/ui/contact-info-card";
import { useLawyerCaseDetail } from "@/hooks/useLawyerCaseDetail";
import { useLawyerRequests } from "@/hooks/useLawyerRequests";
import { useReportDownload } from "@/hooks/useReportDownload";

interface RequestDetailFeatureProps {
  requestId: string;
}

export function RequestDetailFeature({ requestId }: RequestDetailFeatureProps) {
  const searchParams = useSearchParams();
  const caseId = searchParams.get("caseId") ?? "";
  const reportId = searchParams.get("reportId") ?? "";
  const statusParam = searchParams.get("status") ?? "Pending";

  const { report, isLoading, error } = useLawyerCaseDetail(caseId);
  const { accept, reject } = useLawyerRequests();
  const { downloadPdf, isDownloading } = useReportDownload();

  const protocol = `#${requestId.slice(0, 8).toUpperCase()}`;
  const status = statusParam.toLowerCase();

  if (isLoading) {
    return (
      <section className="flex w-full flex-col gap-6">
        <div className="h-10 w-40 animate-pulse rounded-lg bg-white/8" />
        <div className="h-32 animate-pulse rounded-2xl bg-surface-elevated" />
        <div className="h-48 animate-pulse rounded-2xl bg-surface-elevated" />
      </section>
    );
  }

  if (error || !report) {
    return (
      <section className="flex flex-col items-center justify-center py-16 gap-4">
        <p className="text-sm text-red-400">{error ?? "Caso não encontrado."}</p>
        <Link href="/advogado/solicitacoes" className="text-sm text-primary hover:underline">
          Voltar para solicitações
        </Link>
      </section>
    );
  }

  return (
    <section className="flex w-full flex-col gap-6">
      <header className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex items-center gap-3">
          <Link
            href="/advogado/solicitacoes"
            aria-label="Voltar para solicitações"
            className="flex h-9 w-9 items-center justify-center rounded-lg text-white/50 transition-all duration-150 hover:bg-white/8 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          >
            <ArrowBackRounded fontSize="small" aria-hidden />
          </Link>
          <hgroup>
            <h1 className="text-2xl font-bold tracking-tight text-white">{protocol}</h1>
            <p className="mt-1 text-sm text-text-secondary">{report.category_detected}</p>
          </hgroup>
        </div>

        {status === "pending" ? (
          <div className="flex gap-3">
            <Button
              variant="outline"
              size="md"
              leftIcon={<CloseRounded sx={{ fontSize: 20 }} aria-hidden />}
              onClick={() => reject(requestId)}
              className="flex-1 border-red-500/20 text-red-400 hover:border-red-500/40 hover:bg-red-500/10 sm:flex-none"
            >
              Recusar
            </Button>
            <Button
              variant="primary"
              size="md"
              leftIcon={<CheckRounded sx={{ fontSize: 20 }} aria-hidden />}
              onClick={() => accept(requestId)}
              className="flex-1 sm:flex-none"
            >
              Aceitar Caso
            </Button>
          </div>
        ) : status === "accepted" ? (
          <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-400/10 px-3 py-1.5 text-sm font-semibold text-emerald-400">
            <CheckCircleRounded sx={{ fontSize: 16 }} aria-hidden />
            Caso Aceito
          </span>
        ) : (
          <span className="inline-flex items-center gap-1.5 rounded-full bg-red-400/10 px-3 py-1.5 text-sm font-semibold text-red-400">
            <CloseRounded sx={{ fontSize: 16 }} aria-hidden />
            Caso Recusado
          </span>
        )}
      </header>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="flex flex-col gap-6 lg:col-span-2">
          {report.simplified_explanation && (
            <div className="rounded-2xl border border-(--border-subtle) bg-surface-elevated p-6">
              <h2 className="text-xs font-semibold uppercase tracking-widest text-text-muted mb-3">
                Resumo Simplificado
              </h2>
              <p className="text-sm text-foreground leading-relaxed">{report.simplified_explanation}</p>
            </div>
          )}

          {report.legal_analysis && (
            <div className="rounded-2xl border border-(--border-subtle) bg-surface-elevated p-6">
              <h2 className="text-xs font-semibold uppercase tracking-widest text-text-muted mb-3">
                Análise Jurídica
              </h2>
              <p className="text-sm text-foreground leading-relaxed">{report.legal_analysis}</p>
            </div>
          )}

          {report.transcription && (
            <div className="rounded-2xl border border-(--border-subtle) bg-surface-elevated p-6">
              <h2 className="text-xs font-semibold uppercase tracking-widest text-text-muted mb-3">
                Relato do Cidadão
              </h2>
              <blockquote className="text-sm text-text-secondary leading-relaxed italic">
                {report.transcription}
              </blockquote>
            </div>
          )}

          {report.evidence && report.evidence.length > 0 && (
            <div className="rounded-2xl border border-(--border-subtle) bg-surface-elevated p-6">
              <h2 className="text-xs font-semibold uppercase tracking-widest text-text-muted mb-3 flex items-center gap-2">
                <DescriptionRounded sx={{ fontSize: 16 }} aria-hidden />
                Evidências Anexadas
              </h2>
              <ul className="flex flex-col gap-2">
                {report.evidence.map((url, i) => (
                  <li
                    key={i}
                    className="flex items-center justify-between rounded-lg border border-(--border-subtle) bg-surface-hover p-3"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <DescriptionRounded sx={{ fontSize: 20 }} className="shrink-0 text-primary" aria-hidden />
                      <span className="truncate text-sm font-medium text-white">
                        Evidência {i + 1}
                      </span>
                    </div>
                    <a
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="shrink-0 text-sm font-medium text-primary transition-colors hover:text-primary-hover"
                    >
                      Abrir
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {reportId && (
            <Button
              variant="primary"
              size="md"
              onClick={() => downloadPdf(reportId, `relatorio-${protocol}.pdf`)}
              disabled={isDownloading}
              leftIcon={
                isDownloading ? (
                  <DownloadingRounded fontSize="small" aria-hidden />
                ) : (
                  <DescriptionRounded fontSize="small" aria-hidden />
                )
              }
            >
              {isDownloading ? "Baixando..." : "Baixar Relatório PDF"}
            </Button>
          )}
        </div>

        <aside className="flex flex-col gap-6">
          {report.citizen && (
            <ContactInfoCard
              name={report.citizen.full_name}
              phone={report.citizen.phone}
              email={report.citizen.email}
            />
          )}
        </aside>
      </div>
    </section>
  );
}
