import { cva } from "class-variance-authority";

export const requestStatusBarVariants = cva(
  "absolute left-0 top-0 h-full w-1 rounded-l-2xl",
  {
    variants: {
      status: {
        pending: "bg-amber-400",
        accepted: "bg-emerald-400",
        rejected: "bg-red-400",
      },
    },
    defaultVariants: {
      status: "pending",
    },
  },
);

export const requestStatusBadgeVariants = cva(
  "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold uppercase tracking-wider",
  {
    variants: {
      status: {
        pending: "bg-amber-400/10 text-amber-400",
        accepted: "bg-emerald-400/10 text-emerald-400",
        rejected: "bg-red-400/10 text-red-400",
      },
    },
    defaultVariants: {
      status: "pending",
    },
  },
);

export const requestStatusDotVariants = cva("h-1.5 w-1.5 rounded-full", {
  variants: {
    status: {
      pending: "bg-amber-400",
      accepted: "bg-emerald-400",
      rejected: "bg-red-400",
    },
  },
  defaultVariants: {
    status: "pending",
  },
});
