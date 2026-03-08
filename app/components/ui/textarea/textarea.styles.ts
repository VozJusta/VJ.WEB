export const textareaStyles = {
  container: "w-full",
  label: `
    block
    text-sm
    font-medium
    text-zinc-300
    mb-2
  `,
  textareaWrapper: "relative",
  textarea: `
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
    resize-none
    disabled:opacity-50
    disabled:cursor-not-allowed
  `,
  textareaError: `
    border-red-500
    focus:ring-red-500
  `,
  footer: `
    flex
    items-center
    justify-between
    mt-1.5
  `,
  error: `
    text-xs
    text-red-400
  `,
  helperText: `
    text-xs
    text-zinc-500
  `,
  charCount: `
    text-xs
    text-zinc-500
  `,
} as const;
