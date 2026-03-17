import { cva } from "class-variance-authority";

export const actionCardVariants = cva(
  [
    "relative flex flex-col justify-between gap-8 overflow-hidden",
    "rounded-2xl border p-6",
    "transition-all duration-300",
  ],
  {
    variants: {
      variant: {
        primary: [
          "border-[var(--border-subtle)]",
          "bg-[var(--surface-elevated)]",
          "hover:border-[var(--primary)]/30",
          "hover:bg-[var(--surface-hover)]",
        ],
        secondary: [
          "border-[var(--border-subtle)]",
          "bg-[var(--surface-elevated)]",
          "hover:border-[var(--border-subtle-hover)]",
          "hover:bg-[var(--surface-hover)]",
        ],
      },
    },
    defaultVariants: {
      variant: "primary",
    },
  },
);

export const actionCardButtonVariants = cva(
  [
    "inline-flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold",
    "transition-all duration-200",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
  ],
  {
    variants: {
      variant: {
        primary: [
          "bg-[var(--primary)] text-white",
          "shadow-[0_4px_20px_rgba(37,133,244,0.4)]",
          "hover:bg-[var(--brand-blue)]",
          "hover:shadow-[0_6px_24px_rgba(37,133,244,0.5)]",
          "focus-visible:ring-[var(--primary)]",
        ],
        secondary: [
          "border border-white/20 bg-white/5 text-[var(--foreground)]",
          "hover:bg-white/10 hover:border-white/30",
          "focus-visible:ring-white/40",
        ],
      },
    },
    defaultVariants: {
      variant: "primary",
    },
  },
);
