export const selectStyles = {
  container: "w-full",
  label: `
    block
    text-sm
    font-medium
    text-zinc-300
    mb-2
  `,
  selectWrapper: "relative",
  select: `
    w-full
    px-4
    py-3
    bg-zinc-900
    border
    border-[#1B2233]
    rounded-lg
    text-sm
    text-white
    placeholder:text-zinc-500
    focus:outline-none
    focus:ring-2
    focus:ring-primary
    focus:border-transparent
    transition-all
    duration-200
    disabled:opacity-50
    disabled:cursor-not-allowed
    appearance-none
    cursor-pointer
  `,
  selectError: `
    border-red-500
    focus:ring-red-500
  `,
  icon: `
    absolute
    right-3
    top-1/2
    -translate-y-1/2
    text-zinc-400
    pointer-events-none
  `,
  error: `
    mt-1.5
    text-xs
    text-red-400
  `,
  helperText: `
    mt-1.5
    text-xs
    text-zinc-500
  `,
} as const;
