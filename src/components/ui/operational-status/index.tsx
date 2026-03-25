"use client";

import { cn } from "@/lib/utils";
import { ProgressRing } from "@/components/ui/progress-ring";
import type { OperationalStatus as OperationalStatusType } from "@/types/dashboard.types";

type OperationalStatusProps = {
  statuses: OperationalStatusType[];
  progressPercent: number;
  className?: string;
};

export function OperationalStatus({
  statuses,
  progressPercent,
  className,
}: OperationalStatusProps) {
  return (
    <article
      className={cn(
        "flex flex-col gap-6 rounded-2xl",
        "border border-(--border-subtle) bg-surface-elevated",
        "p-6",
        className,
      )}
    >
      <header>
        <h2 className="text-lg font-semibold tracking-tight text-foreground">
          Status Operacional
        </h2>
        <p className="mt-1 text-sm text-text-secondary">
          Visão geral dos casos em andamento
        </p>
      </header>

      <div className="flex flex-col items-center gap-6">
        <ProgressRing progress={progressPercent} />

        <ul className="w-full space-y-3" role="list">
          {statuses.map((status, index) => (
            <li key={index}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span
                    className="h-2 w-2 rounded-full"
                    style={{ backgroundColor: status.color }}
                    aria-hidden="true"
                  />
                  <span className="text-sm font-medium text-text-secondary">
                    {status.label}
                  </span>
                </div>
                <span className="text-base font-bold text-foreground">
                  {status.value.toString().padStart(2, "0")}
                </span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}
