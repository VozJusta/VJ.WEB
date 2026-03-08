export const inputStyles = {
  container: "w-full",
  label: `
    block
    text-sm
    font-medium
    text-zinc-300
    mb-2
  `,
  inputWrapper: "relative",
  input: `
    w-full
    px-4
    py-3
    bg-zinc-900
    border
    border-zinc-800
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
  `,
  inputError: `
    border-red-500
    focus:ring-red-500
  `,
  leftIcon: `
    absolute
    text-zinc-400
    left-3
    top-2.5
  `,
  rightIcon: `
    absolute
    place-items-center
    right-3
    top-3.5
    text-zinc-400
  `,
  inputWithLeftIcon: "pl-10",
  inputWithRightIcon: "pr-10",
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
