import type { ToastVariant } from "./toast.types";

export const toastStyles = {
  container: `
    pointer-events-auto
    w-full
    max-w-md
    overflow-hidden
    rounded-xl
    border
    shadow-2xl
    backdrop-blur-sm
    transition-all
    duration-300
  `,
  variants: {
    success: `
      bg-green-950/90
      border-green-500/50
    `,
    error: `
      bg-red-950/90
      border-red-500/50
    `,
    warning: `
      bg-yellow-950/90
      border-yellow-500/50
    `,
    info: `
      bg-blue-950/90
      border-blue-500/50
    `,
  },
  content: `
    flex
    items-start
    gap-3
    p-4
  `,
  iconWrapper: `
    flex-shrink-0
    w-10
    h-10
    rounded-lg
    flex
    items-center
    justify-center
  `,
  iconVariants: {
    success: "bg-green-500/20 text-green-400",
    error: "bg-red-500/20 text-red-400",
    warning: "bg-yellow-500/20 text-yellow-400",
    info: "bg-blue-500/20 text-blue-400",
  },
  textContainer: `
    flex-1
    min-w-0
  `,
  title: `
    text-sm
    font-semibold
    text-white
    mb-1
  `,
  description: `
    text-sm
    text-zinc-400
    leading-relaxed
  `,
  closeButton: `
    flex-shrink-0
    w-8
    h-8
    rounded-lg
    flex
    items-center
    justify-center
    text-zinc-400
    hover:text-white
    hover:bg-zinc-800/50
    transition-colors
    duration-200
  `,
} as const;

export const getToastVariantStyles = (variant: ToastVariant): string => {
  return toastStyles.variants[variant];
};

export const getIconVariantStyles = (variant: ToastVariant): string => {
  return toastStyles.iconVariants[variant];
};
