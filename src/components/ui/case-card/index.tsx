import Link from "next/link";
import { DescriptionRounded, CheckCircleOutlineRounded, ChevronRightRounded, ShieldRounded, BalanceRounded } from "@mui/icons-material";
import { cn } from "@/src/lib/utils";
import { caseStatusBadgeVariants, caseStatusDotVariants } from "./case-card.styles";
import type { CaseCardProps, CaseStatus } from "./case-card.types";

const statusLabel: Record<CaseStatus, string> = {
  analysis: "Em Análise Jurídica",
  concluded: "Concluído",
  pending: "Aguardando Advogado",
  archived: "Arquivado",
};

const CaseIcon = ({ status }: { status: CaseStatus }) => {
  const baseClass = "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl";

  if (status === "concluded") {
    return (
      <span className={cn(baseClass, "bg-status-concluded-bg")}>
        <BalanceRounded
          fontSize="small"
          className="text-status-concluded"
          aria-hidden="true"
        />
      </span>
    );
  }

  if (status === "pending") {
    return (
      <span className={cn(baseClass, "bg-status-pending-bg")}>
        <ShieldRounded
          fontSize="small"
          className="text-status-pending"
          aria-hidden="true"
        />
      </span>
    );
  }

  if (status === "archived") {
    return (
      <span className={cn(baseClass, "bg-white/5")}>
        <CheckCircleOutlineRounded
          fontSize="small"
          className="text-text-muted"
          aria-hidden="true"
        />
      </span>
    );
  }

  return (
    <span className={cn(baseClass, "bg-status-analysis-bg")}>
      <DescriptionRounded
        fontSize="small"
        className="text-status-analysis"
        aria-hidden="true"
      />
    </span>
  );
};

export function CaseCard({
  title,
  status,
  updatedLabel,
  protocol,
  href,
  className,
}: CaseCardProps) {
  return (
    <article className={cn("group", className)}>
      <Link
        href={href}
        aria-label={`Ver detalhes do caso: ${title} — Protocolo ${protocol}`}
        className={cn(
          "flex items-center gap-4 rounded-2xl border border-(--border-subtle) bg-surface-elevated px-5 py-4",
          "transition-all duration-200",
          "hover:border-(--border-subtle-hover) hover:bg-surface-hover",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary",
        )}
      >
        <CaseIcon status={status} />

        <div className="flex flex-1 flex-col gap-1 min-w-0">
          <h3 className="truncate text-sm font-semibold text-foreground">
            {title}
          </h3>

          <div className="flex flex-wrap items-center gap-2">
            <span className={caseStatusBadgeVariants({ status })}>
              <span className={caseStatusDotVariants({ status })} aria-hidden="true" />
              {statusLabel[status]}
            </span>

            <span
              aria-hidden="true"
              className="h-1 w-1 rounded-full bg-text-muted"
            />

            <time className="text-xs text-text-secondary">
              {updatedLabel}
            </time>
          </div>
        </div>

        <div className="flex shrink-0 flex-col items-end gap-1">
          <span className="text-xs font-medium uppercase tracking-widest text-text-muted">
            Protocolo
          </span>
          <span className="text-sm font-semibold text-text-secondary">
            {protocol}
          </span>
        </div>

        <ChevronRightRounded
          fontSize="small"
          className="shrink-0 text-text-muted transition-transform duration-200 group-hover:translate-x-0.5 group-hover:text-text-secondary"
          aria-hidden="true"
        />
      </Link>
    </article>
  );
}
