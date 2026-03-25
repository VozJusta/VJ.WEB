import { cva } from "class-variance-authority";

export const priorityBadgeVariants = cva(
  "inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wider",
  {
    variants: {
      priority: {
        low: "bg-emerald-400/10 text-emerald-400",
        medium: "bg-amber-400/10 text-amber-400",
        high: "bg-red-400/10 text-red-400",
      },
    },
    defaultVariants: {
      priority: "medium",
    },
  },
);
