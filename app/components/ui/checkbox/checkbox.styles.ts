export const checkboxStyles = {
  container: "flex items-start gap-3",
  checkbox: `
    mt-0.5
    h-5
    w-5
    flex-none
    rounded
    border
    border-white/20
    bg-transparent
    text-primary
    transition-colors
    focus:ring-2
    focus:ring-primary
    focus:ring-offset-0
    disabled:cursor-not-allowed
    disabled:opacity-50
  `,
  labelWrapper: "flex flex-col gap-1",
  label: "text-sm leading-relaxed text-white/55 cursor-pointer",
  error: "text-xs text-red-400",
  helperText: "text-xs text-white/45",
} as const;
