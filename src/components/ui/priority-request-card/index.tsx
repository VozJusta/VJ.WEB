"use client";

import { cn } from "@/src/lib/utils";
import { ErrorOutlineRounded } from "@mui/icons-material";
import type { PriorityRequest, PriorityLevel, RequestStatus } from "@/src/types/dashboard.types";

type PriorityRequestCardProps = {
  request: PriorityRequest;
  className?: string;
};

const priorityConfig: Record<
  PriorityLevel,
  { label: string; color: string; bgColor: string }
> = {
  urgent: {
    label: "URGENTE",
    color: "rgb(239, 68, 68)",
    bgColor: "rgba(239, 68, 68, 0.1)",
  },
  high: {
    label: "ALTA",
    color: "rgb(251, 146, 60)",
    bgColor: "rgba(251, 146, 60, 0.1)",
  },
  medium: {
    label: "MÉDIA",
    color: "rgb(234, 179, 8)",
    bgColor: "rgba(234, 179, 8, 0.1)",
  },
  low: {
    label: "BAIXA",
    color: "rgb(34, 197, 94)",
    bgColor: "rgba(34, 197, 94, 0.1)",
  },
};

const statusConfig: Record<
  RequestStatus,
  { label: string; color: string; bgColor: string }
> = {
  pending: {
    label: "Pendente",
    color: "rgb(148, 163, 184)",
    bgColor: "rgba(148, 163, 184, 0.1)",
  },
  in_progress: {
    label: "Em análise",
    color: "rgb(59, 130, 246)",
    bgColor: "rgba(59, 130, 246, 0.1)",
  },
  completed: {
    label: "Concluído",
    color: "rgb(34, 197, 94)",
    bgColor: "rgba(34, 197, 94, 0.1)",
  },
  rejected: {
    label: "Rejeitado",
    color: "rgb(239, 68, 68)",
    bgColor: "rgba(239, 68, 68, 0.1)",
  },
};

export function PriorityRequestCard({ request, className }: PriorityRequestCardProps) {
  const priority = priorityConfig[request.priority];
  const status = statusConfig[request.status];

  return (
    <article
      className={cn(
        "group relative overflow-hidden rounded-2xl",
        "border border-(--border-subtle) bg-surface-elevated",
        "p-6",
        "transition-all duration-300",
        "hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5",
        className,
      )}
    >
      <div className="relative z-10 flex flex-col gap-4">
        <header className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-3">
            <div
              className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl"
              style={{ backgroundColor: priority.bgColor }}
            >
              <span
                className="text-lg font-bold"
                style={{ color: priority.color }}
              >
                {request.score}
              </span>
            </div>

            <div className="flex-1 min-w-0">
              <h3 className="text-base font-semibold text-foreground line-clamp-1">
                {request.title}
              </h3>
              <p className="mt-1 text-sm text-text-secondary line-clamp-2">
                {request.description}
              </p>
            </div>
          </div>

          <div className="flex shrink-0 items-start gap-2">
            <span
              className="rounded-lg px-2 py-1 text-xs font-semibold"
              style={{
                color: priority.color,
                backgroundColor: priority.bgColor,
              }}
              role="status"
            >
              {priority.label}
            </span>
          </div>
        </header>

        <footer className="flex items-center justify-between gap-4 pt-2 border-t border-(--border-subtle)">
          <div className="flex items-center gap-3">
            <span
              className="rounded-lg px-3 py-1.5 text-xs font-medium"
              style={{
                color: status.color,
                backgroundColor: status.bgColor,
              }}
            >
              {status.label}
            </span>

            <span className="rounded-lg bg-surface-hover px-3 py-1.5 text-xs font-medium text-text-secondary">
              {request.category}
            </span>
          </div>

          <time
            dateTime={request.date}
            className="text-xs font-medium text-text-muted"
          >
            {new Date(request.date).toLocaleDateString("pt-BR", {
              day: "2-digit",
              month: "short",
              year: "numeric",
            })}
          </time>
        </footer>
      </div>

      <div
        aria-hidden="true"
        className={cn(
          "pointer-events-none absolute inset-0 opacity-0",
          "bg-gradient-to-br from-primary/5 to-transparent",
          "transition-opacity duration-300",
          "group-hover:opacity-100",
        )}
      />
    </article>
  );
}
