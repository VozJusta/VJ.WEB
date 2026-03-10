import { cva } from "class-variance-authority";

export const caseStatusBadgeVariants = cva(
  "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold uppercase tracking-wider",
  {
    variants: {
      status: {
        analysis: "bg-[var(--status-analysis-bg)] text-[var(--status-analysis)]",
        concluded: "bg-[var(--status-concluded-bg)] text-[var(--status-concluded)]",
        pending: "bg-[var(--status-pending-bg)] text-[var(--status-pending)]",
        archived: "bg-white/5 text-[var(--text-muted)]",
      },
    },
    defaultVariants: {
      status: "analysis",
    },
  },
);

export const caseStatusDotVariants = cva("h-1.5 w-1.5 rounded-full", {
  variants: {
    status: {
      analysis: "bg-[var(--status-analysis)]",
      concluded: "bg-[var(--status-concluded)]",
      pending: "bg-[var(--status-pending)]",
      archived: "bg-[var(--text-muted)]",
    },
  },
  defaultVariants: {
    status: "analysis",
  },
});
