export const checkboxStyles = {
  container: "flex items-start gap-3",
  checkbox: `
    mt-0.5
    h-6
    w-6
    flex-none
    rounded-xl
    border-2
    border-[#1B2233]
    bg-[#1a2642]
    text-primary
    transition-all
    duration-200
    cursor-pointer
    checked:bg-primary
    checked:border-primary
    focus:ring-2
    focus:ring-primary/30
    focus:ring-offset-0
    focus:outline-none
    disabled:cursor-not-allowed
    disabled:opacity-50
    appearance-none
    relative
    before:content-['']
    before:absolute
    before:inset-0
    before:bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIHZpZXdCb3g9IjAgMCAxNiAxNiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNMTMuMzMzMyA0TDYgMTEuMzMzMyAyLjY2NjY3IDgiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIi8+PC9zdmc+')]
    before:bg-center
    before:bg-no-repeat
    before:opacity-0
    before:transition-opacity
    checked:before:opacity-100
  `,
  labelWrapper: "flex flex-col gap-1",
  label: "text-sm leading-relaxed text-white/55 cursor-pointer",
  error: "text-xs text-red-400",
  helperText: "text-xs text-white/45",
} as const;
