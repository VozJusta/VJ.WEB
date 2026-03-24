"use client";

import {
  CheckRounded,
  CloseRounded,
  DescriptionRounded,
  CalendarTodayRounded,
  PersonRounded,
} from "@mui/icons-material";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  requestStatusBarVariants,
  requestStatusBadgeVariants,
  requestStatusDotVariants,
} from "./request-card.styles";
import type { RequestCardProps, RequestStatus } from "./request-card.types";

const STATUS_LABELS: Record<RequestStatus, string> = {
  pending: "Pendente",
  accepted: "Aceita",
  rejected: "Recusada",
};

function CitizenAvatar({
  name,
  initials,
}: {
  name: string;
  initials?: string;
}) {
  const displayInitials =
    initials ||
    name
      .split(" ")
      .slice(0, 2)
      .map((n) => n[0])
      .join("")
      .toUpperCase();

  return (
    <figure
      className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#2585F4] to-[#1565C0]"
      aria-hidden="true"
    >
      <span className="text-xs font-bold text-white select-none">
        {displayInitials}
      </span>
    </figure>
  );
}

export function RequestCard({
  id,
  protocol,
  citizenName,
  citizenInitials,
  area,
  status,
  createdAt,
  onClick,
  onAccept,
  onReject,
  onViewDossier,
  className,
}: RequestCardProps) {
  return (
    <article
      onClick={() => onClick?.(id)}
      className={cn(
        "relative overflow-hidden rounded-2xl border border-(--border-subtle) bg-surface-elevated",
        "transition-all duration-200",
        "hover:border-(--border-subtle-hover) hover:bg-surface-hover",
        onClick && "cursor-pointer",
        className,
      )}
    >
      <span
        className={requestStatusBarVariants({ status })}
        aria-hidden="true"
      />

      <section className="flex flex-col gap-4 p-5 pl-6">
        <header className="flex items-start justify-between gap-4">
          <hgroup className="flex flex-col gap-1">
            <span className="text-xs font-bold uppercase tracking-wider text-primary">
              {area}
            </span>
            <h3 className="text-sm font-medium text-text-secondary">
              {protocol}
            </h3>
          </hgroup>

          <span className={requestStatusBadgeVariants({ status })}>
            <span
              className={requestStatusDotVariants({ status })}
              aria-hidden="true"
            />
            {STATUS_LABELS[status]}
          </span>
        </header>

        <dl className="flex flex-wrap items-center gap-x-6 gap-y-2">
          <div className="flex items-center gap-2">
            <dt className="sr-only">Cliente</dt>
            <CitizenAvatar name={citizenName} initials={citizenInitials} />
            <dd className="flex items-center gap-1.5 text-sm text-foreground">
              <PersonRounded
                sx={{ fontSize: 16 }}
                className="text-text-muted"
                aria-hidden="true"
              />
              {citizenName}
            </dd>
          </div>

          <div className="flex items-center gap-1.5">
            <dt className="sr-only">Data de criação</dt>
            <CalendarTodayRounded
              sx={{ fontSize: 16 }}
              className="text-text-muted"
              aria-hidden="true"
            />
            <dd className="text-sm text-text-secondary">
              <time dateTime={createdAt}>{createdAt}</time>
            </dd>
          </div>
        </dl>

        <footer className="flex items-center gap-3 pt-1">
          {status === "pending" && (
            <>
              <Button
                variant="primary"
                size="sm"
                leftIcon={<CheckRounded sx={{ fontSize: 18 }} aria-hidden />}
                onClick={(e) => {
                  e.stopPropagation();
                  onAccept?.(id);
                }}
                className="flex-1"
              >
                Aceitar
              </Button>
              <Button
                variant="outline"
                size="sm"
                leftIcon={<CloseRounded sx={{ fontSize: 18 }} aria-hidden />}
                onClick={(e) => {
                  e.stopPropagation();
                  onReject?.(id);
                }}
                className="flex-1 border-red-500/20 text-red-400 hover:bg-red-500/10 hover:border-red-500/40"
              >
                Recusar
              </Button>
            </>
          )}

          {status === "accepted" && (
            <Button
              variant="outline"
              size="sm"
              leftIcon={
                <DescriptionRounded sx={{ fontSize: 18 }} aria-hidden />
              }
              onClick={(e) => {
                e.stopPropagation();
                onViewDossier?.(id);
              }}
              className="w-full"
            >
              Ver Dossiê
            </Button>
          )}

          {status === "rejected" && (
            <p className="text-xs text-text-muted italic">
              Solicitação recusada
            </p>
          )}
        </footer>
      </section>
    </article>
  );
}

export type { RequestCardProps, RequestStatus } from "./request-card.types";
