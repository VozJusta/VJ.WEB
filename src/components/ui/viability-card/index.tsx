import { cn } from "@/src/lib/utils";
import { AutoAwesomeRounded } from "@mui/icons-material";
import { priorityBadgeVariants } from "./viability-card.styles";
import type { ViabilityCardProps, PriorityLevel } from "./viability-card.types";

const PRIORITY_LABELS: Record<PriorityLevel, string> = {
  low: "Baixa",
  medium: "Média",
  high: "Alta",
};

function MatchCircle({ percentage }: { percentage: number }) {
  const circumference = 2 * Math.PI * 45;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <figure className="relative flex h-28 w-28 shrink-0 items-center justify-center">
      <svg
        className="absolute inset-0 -rotate-90"
        viewBox="0 0 100 100"
        aria-hidden="true"
      >
        <circle
          cx="50"
          cy="50"
          r="45"
          fill="none"
          stroke="currentColor"
          strokeWidth="8"
          className="text-white/10"
        />
        <circle
          cx="50"
          cy="50"
          r="45"
          fill="none"
          stroke="url(#gradient)"
          strokeWidth="8"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          className="transition-all duration-700 ease-out"
        />
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#2585F4" />
            <stop offset="100%" stopColor="#60a5fa" />
          </linearGradient>
        </defs>
      </svg>
      <figcaption className="flex flex-col items-center">
        <span className="text-2xl font-bold text-white">{percentage}%</span>
        <span className="text-xs text-text-secondary uppercase tracking-wider">
          Match
        </span>
      </figcaption>
    </figure>
  );
}

export function ViabilityCard({
  matchPercentage,
  description,
  priority,
  className,
}: ViabilityCardProps) {
  return (
    <article
      className={cn(
        "rounded-2xl border border-(--border-subtle) bg-surface-elevated p-6",
        className,
      )}
    >
      <header className="mb-4 flex items-center gap-2">
        <AutoAwesomeRounded
          sx={{ fontSize: 20 }}
          className="text-primary"
          aria-hidden
        />
        <h2 className="text-lg font-semibold text-white">
          Relatório de Viabilidade IA
        </h2>
      </header>

      <section className="flex gap-6">
        <MatchCircle percentage={matchPercentage} />

        <div className="flex flex-1 flex-col gap-3">
          <p className="text-sm text-text-secondary leading-relaxed">
            {description}
          </p>

          <footer className="flex items-center gap-2">
            <span className="text-xs text-text-muted">Prioridade:</span>
            <span className={priorityBadgeVariants({ priority })}>
              {PRIORITY_LABELS[priority]}
            </span>
          </footer>
        </div>
      </section>
    </article>
  );
}

export type { ViabilityCardProps, PriorityLevel } from "./viability-card.types";
