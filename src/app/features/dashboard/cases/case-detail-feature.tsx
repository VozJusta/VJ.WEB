import Link from "next/link";
import {
  ArrowBackRounded,
  SummarizeRounded,
} from "@mui/icons-material";
import { Button } from "@/src/components/ui/button";
import { TimelineItem } from "@/src/components/ui/timeline-item";
import { CaseDocCard } from "@/src/components/ui/case-doc-card";
import { cn } from "@/src/lib/utils";
import type { CaseDetail } from "./cases.data";
import type { CaseStatus } from "@/src/components/ui/case-card/case-card.types";


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



export function CaseDetailFeature({ caseData }: { caseData: CaseDetail }) {
  const banner = bannerConfig[caseData.status];

  return (
    <div className="relative flex flex-col gap-6 w-full  mx-auto px-4 py-6 md:px-6 md:py-8 pb-24">
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
                {...step}
                isLast={i === caseData.timeline.length - 1}
              />
            ))}
          </ol>
        </div>
      </section>

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
              <CaseDocCard
                filename={doc.filename}
                meta={doc.meta}
                mimeType={doc.mimeType}
              />
            </li>
          ))}
        </ul>
      </section>

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
