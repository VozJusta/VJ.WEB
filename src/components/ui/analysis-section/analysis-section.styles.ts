import { cva } from "class-variance-authority";

export const analysisSectionVariants = cva(
  "rounded-2xl border p-5",
  {
    variants: {
      variant: {
        default: "border-(--border-subtle) bg-surface-elevated",
        success: "border-emerald-500/20 bg-emerald-500/5",
        warning: "border-amber-500/20 bg-amber-500/5",
        danger: "border-red-500/20 bg-red-500/5",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

export const analysisTitleVariants = cva(
  "text-base font-semibold",
  {
    variants: {
      variant: {
        default: "text-white",
        success: "text-emerald-400",
        warning: "text-amber-400",
        danger: "text-red-400",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

export const analysisListItemVariants = cva(
  "flex items-start gap-2 text-sm leading-relaxed",
  {
    variants: {
      variant: {
        default: "text-text-secondary",
        success: "text-emerald-100/80",
        warning: "text-amber-100/80",
        danger: "text-red-100/80",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

export const analysisBulletVariants = cva(
  "mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full",
  {
    variants: {
      variant: {
        default: "bg-primary",
        success: "bg-emerald-400",
        warning: "bg-amber-400",
        danger: "bg-red-400",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);
