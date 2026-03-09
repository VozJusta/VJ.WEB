import Link from "next/link";
import {
  ArrowBackRounded,
  CheckCircleRounded,
  RadioButtonCheckedRounded,
  RadioButtonUncheckedRounded,
  PictureAsPdfRounded,
  ImageRounded,
  FileDownloadRounded,
  VisibilityRounded,
  SummarizeRounded,
} from "@mui/icons-material";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { CaseDetail, TimelineStep } from "./cases.data";
import type { CaseStatus } from "@/components/ui/case-card/case-card.types";

// ─── Status banner config ────────────────────────────────────────────────────

const bannerConfig: Record<
  CaseStatus,
  { dot: string; title: string; border: string; bg: string }
> = {
  analysis: {
    dot: "bg-[#2585F4]  animate-[analyzing-pulse_1.4s_ease-in-out_infinite]",
    title: "text-white",
    border: "border-[#2585F4]/40",
    bg: "bg-[#0d1a2e]",
  },
  concluded: {
    dot: "bg-green-400",
    title: "text-green-400",
    border: "border-green-500/30",
    bg: "bg-[#0b1f14]",
  },
  pending: {
    dot: "bg-blue-400 animate-[analyzing-pulse_1.4s_ease-in-out_infinite]",
    title: "text-blue-400",
    border: "border-blue-500/30",
    bg: "bg-[#0d1526]",
  },
  archived: {
    dot: "bg-white/30",
    title: "text-white/50",
    border: "border-white/10",
    bg: "bg-white/03",
  },
};

// ─── Timeline ────────────────────────────────────────────────────────────────

function TimelineItem({ step, isLast }: { step: TimelineStep; isLast: boolean }) {
  return (
    <li className="flex gap-4">
      {/* connector */}
      <div className="flex flex-col items-center">
        <span className="mt-0.5 shrink-0">
          {step.status === "done" && (
            <CheckCircleRounded
              fontSize="small"
              className="text-green-400"
              aria-hidden
            />
          )}
          {step.status === "active" && (
            <RadioButtonCheckedRounded
              fontSize="small"
              className="text-[#2585F4]"
              aria-hidden
            />
          )}
          {step.status === "pending" && (
            <RadioButtonUncheckedRounded
              fontSize="small"
              className="text-white/25"
              aria-hidden
            />
          )}
        </span>
        {!isLast && (
          <span
            className={cn(
              "w-px flex-1 mt-1",
              step.status === "done" ? "bg-green-400/30" : "bg-white/10",
            )}
            aria-hidden
          />
        )}
      </div>

      {/* content */}
      <div className="pb-5 min-w-0">
        <p
          className={cn(
            "text-sm font-semibold leading-tight",
            step.status === "pending" ? "text-white/35" : "text-white",
          )}
        >
          {step.title}
        </p>
        <p
          className={cn(
            "text-xs mt-0.5",
            step.status === "active"
              ? "text-[#2585F4]"
              : step.status === "pending"
                ? "text-white/25"
                : "text-white/45",
          )}
        >
          {step.subtitle}
        </p>
      </div>
    </li>
  );
}

// ─── Document card ────────────────────────────────────────────────────────────

function CaseDocCard({
  filename,
  meta,
  mimeType,
}: {
  filename: string;
  meta: string;
  mimeType: "application/pdf" | "image/jpeg" | "image/png";
}) {
  const isPdf = mimeType === "application/pdf";

  return (
    <div className="flex items-center gap-3 rounded-xl border border-[#1B2233] bg-[#111c30] px-4 py-3 hover:bg-[#152036] transition-colors duration-150">
      <span
        className={cn(
          "flex shrink-0 items-center justify-center w-9 h-9 rounded-lg",
          isPdf ? "bg-orange-500/15 text-orange-400" : "bg-blue-500/15 text-blue-400",
        )}
        aria-hidden
      >
        {isPdf ? (
          <PictureAsPdfRounded fontSize="small" />
        ) : (
          <ImageRounded fontSize="small" />
        )}
      </span>

      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-white truncate">{filename}</p>
        <p className="text-xs text-white/40">{meta}</p>
      </div>

      <button
        type="button"
        aria-label={isPdf ? `Baixar ${filename}` : `Visualizar ${filename}`}
        className="flex shrink-0 items-center justify-center w-8 h-8 rounded-lg text-white/35 hover:text-white hover:bg-white/08 transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2585F4]"
      >
        {isPdf ? (
          <FileDownloadRounded fontSize="small" aria-hidden />
        ) : (
          <VisibilityRounded fontSize="small" aria-hidden />
        )}
      </button>
    </div>
  );
}

// ─── Main feature ─────────────────────────────────────────────────────────────

export function CaseDetailFeature({ caseData }: { caseData: CaseDetail }) {
  const banner = bannerConfig[caseData.status];

  return (
    <div className="relative flex flex-col gap-6 w-full max-w-3xl mx-auto px-4 py-6 md:px-6 md:py-8 pb-24">
      {/* Back + title */}
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
            {caseData.title}
          </h1>
          <p className="text-xs text-white/40 font-mono mt-0.5">
            Protocolo {caseData.protocol}
          </p>
        </div>
      </header>

      {/* Status banner */}
      <section
        aria-labelledby="status-heading"
        className={cn(
          "rounded-2xl border px-6 py-5",
          banner.bg,
          banner.border,
        )}
      >
        <p className="text-xs font-semibold tracking-widest uppercase text-white/45 mb-2">
          Status Atual
        </p>
        <div className="flex items-center gap-2.5 mb-1">
          <h2
            id="status-heading"
            className={cn("text-xl font-extrabold tracking-tight uppercase", banner.title)}
          >
            {caseData.statusBanner.label}
          </h2>
          <span className={cn("w-2.5 h-2.5 rounded-full shrink-0", banner.dot)} aria-hidden />
        </div>
        <p className="text-sm text-white/55">{caseData.statusBanner.description}</p>
      </section>

      {/* Timeline */}
      <section aria-labelledby="timeline-heading">
        <h2
          id="timeline-heading"
          className="text-xs font-semibold tracking-widest uppercase text-white/40 mb-4"
        >
          Evolução do Caso
        </h2>

        <div className="rounded-2xl border border-[#1B2233] bg-[#111c30] px-6 py-5">
          <ol aria-label="Etapas do processo">
            {caseData.timeline.map((step, i) => (
              <TimelineItem
                key={step.title}
                step={step}
                isLast={i === caseData.timeline.length - 1}
              />
            ))}
          </ol>
        </div>
      </section>

      {/* Report */}
      <section aria-labelledby="report-heading">
        <h2
          id="report-heading"
          className="text-xs font-semibold tracking-widest uppercase text-white/40 mb-4"
        >
          Resumo do Relato
        </h2>

        <blockquote className="rounded-2xl border border-[#1B2233] bg-[#111c30] px-6 py-5 text-sm text-white/75 leading-relaxed italic">
          {caseData.report}
        </blockquote>
      </section>

      {/* Documents */}
      <section aria-labelledby="docs-heading">
        <header className="flex items-center justify-between mb-4">
          <h2
            id="docs-heading"
            className="text-xs font-semibold tracking-widest uppercase text-white/40"
          >
            Documentos
          </h2>
          <span className="text-xs text-white/35">
            {caseData.documents.length} anexo{caseData.documents.length !== 1 ? "s" : ""}
          </span>
        </header>

        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {caseData.documents.map((doc) => (
            <li key={doc.id}>
              <CaseDocCard {...doc} />
            </li>
          ))}
        </ul>
      </section>

      {/* Sticky download report button */}
      <div className="fixed bottom-6 right-6 z-10">
        <Button
          variant="primary"
          size="md"
          leftIcon={<SummarizeRounded fontSize="small" aria-hidden />}
          className="shadow-[0_8px_32px_rgba(37,133,244,0.45)]"
        >
          Baixar Relatório
        </Button>
      </div>
    </div>
  );
}
