"use client";

import { ArrowUpwardRounded, ArrowDownwardRounded } from "@mui/icons-material";
import { cn } from "@/src/lib/utils";

type StatCardProps = {
  label: string;
  value: string | number;
  valueColor?: string;
  labelColor?: string;
  animationDelay?: number;
  change?: number;
  isPositive?: boolean;
  unit?: string;
  className?: string;
};

export function StatCard({
  label,
  value,
  valueColor,
  labelColor,
  animationDelay,
  change,
  isPositive,
  unit,
  className,
}: StatCardProps) {
  const hasChange = typeof change === "number" && typeof isPositive === "boolean";

  return (
    <article
      className={cn(
        "group relative overflow-hidden rounded-2xl",
        "bg-surface-elevated",
        "border border-(--border-subtle)",
        "px-6 py-5",
        "transition-all duration-300",
        "hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5",
        className,
      )}
      style={animationDelay ? { animationDelay: `${animationDelay}ms` } : undefined}
    >
      <div className="relative z-10 flex flex-col gap-3">
        <header>
          <h3
            className={cn(
              "text-xs font-medium uppercase tracking-wider",
              labelColor || "text-text-secondary",
            )}
          >
            {label}
          </h3>
        </header>

        <div className="flex items-end justify-between gap-4">
          <div className="flex items-baseline gap-1">
            <p
              className={cn(
                "text-3xl font-bold tracking-tight",
                valueColor || "text-foreground",
              )}
            >
              {value}
            </p>
            {unit && (
              <span className="text-sm font-medium text-text-muted">{unit}</span>
            )}
          </div>

          {hasChange && (
            <div
              className={cn(
                "flex items-center gap-1 rounded-lg px-2 py-1",
                "text-xs font-semibold",
                "transition-colors duration-200",
                isPositive
                  ? "bg-emerald-500/10 text-emerald-400"
                  : "bg-red-500/10 text-red-400",
              )}
              role="status"
              aria-label={`${isPositive ? "Aumento" : "Diminuição"} de ${Math.abs(change)}%`}
            >
              {isPositive ? (
                <ArrowUpwardRounded sx={{ fontSize: 14 }} aria-hidden="true" />
              ) : (
                <ArrowDownwardRounded sx={{ fontSize: 14 }} aria-hidden="true" />
              )}
              <span>{Math.abs(change)}%</span>
            </div>
          )}
        </div>
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
