"use client";

import { MOCK_REQUEST_DETAIL } from "./request-detail.data";
import Link from "next/link";
import {
  ArrowBackRounded,
  CheckRounded,
  CloseRounded,
  CheckCircleRounded,
  WarningRounded,
  TrendingUpRounded,
  DescriptionRounded,
} from "@mui/icons-material";
import { Button } from "@/components/ui/button";
import { ViabilityCard } from "@/components/ui/viability-card";
import { AnalysisSection, AnalysisList } from "@/components/ui/analysis-section";
import { ContactInfoCard } from "@/components/ui/contact-info-card";

export function RequestDetailFeature() {
  const data = MOCK_REQUEST_DETAIL;

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
            <h1 className="text-2xl font-bold tracking-tight text-white">
              {data.protocol}
            </h1>
            <p className="mt-1 text-sm text-text-secondary">{data.area}</p>
          </hgroup>
        </div>

        {data.status === "pending" && (
          <div className="flex gap-3">
            <Button
              variant="outline"
              size="md"
              leftIcon={<CloseRounded sx={{ fontSize: 20 }} aria-hidden />}
              className="flex-1 border-red-500/20 text-red-400 hover:border-red-500/40 hover:bg-red-500/10 sm:flex-none"
            >
              Recusar
            </Button>
            <Button
              variant="primary"
              size="md"
              leftIcon={<CheckRounded sx={{ fontSize: 20 }} aria-hidden />}
              className="flex-1 sm:flex-none"
            >
              Aceitar Caso
            </Button>
          </div>
        )}
      </header>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="flex flex-col gap-6 lg:col-span-2">
          <ViabilityCard
            matchPercentage={data.viability.matchPercentage}
            description={data.viability.description}
            priority={data.viability.priority}
          />

          <AnalysisSection
            title="Por que este caso combina com você"
            icon={
              <TrendingUpRounded
                sx={{ fontSize: 20 }}
                className="text-primary"
                aria-hidden
              />
            }
            variant="default"
          >
            <AnalysisList items={data.matchReasons} variant="default" />
          </AnalysisSection>

          <div className="grid gap-6 md:grid-cols-2">
            <AnalysisSection
              title="Pontos Fortes"
              icon={
                <CheckCircleRounded
                  sx={{ fontSize: 20 }}
                  className="text-emerald-400"
                  aria-hidden
                />
              }
              variant="success"
            >
              <AnalysisList items={data.strengths} variant="success" />
            </AnalysisSection>

            <AnalysisSection
              title="Riscos Identificados"
              icon={
                <WarningRounded
                  sx={{ fontSize: 20 }}
                  className="text-amber-400"
                  aria-hidden
                />
              }
              variant="warning"
            >
              <AnalysisList items={data.risks} variant="warning" />
            </AnalysisSection>
          </div>

          <AnalysisSection
            title="Documentos Anexados"
            icon={
              <DescriptionRounded
                sx={{ fontSize: 20 }}
                className="text-primary"
                aria-hidden
              />
            }
            variant="default"
          >
            <ul className="flex flex-col gap-2">
              {data.documents.map((doc) => (
                <li
                  key={doc.id}
                  className="flex items-center justify-between rounded-lg border border-(--border-subtle) bg-surface-hover p-3 transition-colors hover:bg-surface-elevated"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <DescriptionRounded
                      sx={{ fontSize: 20 }}
                      className="shrink-0 text-primary"
                      aria-hidden
                    />
                    <div className="min-w-0">
                      <p className="truncate text-sm font-medium text-white">
                        {doc.name}
                      </p>
                      <p className="text-xs text-text-muted">
                        {doc.size} • {doc.uploadedAt}
                      </p>
                    </div>
                  </div>
                  <button
                    type="button"
                    className="shrink-0 text-sm font-medium text-primary transition-colors hover:text-primary-hover focus-visible:outline-none focus-visible:underline"
                  >
                    Baixar
                  </button>
                </li>
              ))}
            </ul>
          </AnalysisSection>
        </div>

        <aside className="flex flex-col gap-6">
          <ContactInfoCard
            name={data.citizenName}
            phone={data.citizenPhone}
            email={data.citizenEmail}
          />
        </aside>
      </div>
    </section>
  );
}
