export const faqItemStyles = {
  container: `
    group
    border border-zinc-800/50 
    rounded-xl 
    bg-[#0E141C]
    backdrop-blur-sm
    transition-all 
    duration-300
    hover:border-zinc-700/70
    hover:bg-zinc-900/50
  `,
  button: `
    w-full 
    flex 
    items-center 
    justify-between 
    gap-4 
    p-6 
    text-left
    cursor-pointer
    focus:outline-none
    focus-visible:ring-2
    focus-visible:ring-violet-500
    focus-visible:ring-offset-2
    focus-visible:ring-offset-zinc-950
    rounded-xl
  `,
  question: `
    text-lg 
    font-semibold 
    text-zinc-100
    transition-colors
    duration-200
    group-hover:text-white
  `,
  icon: `
    flex-shrink-0 
    w-5 
    h-5 
    text-zinc-400
    transition-all 
    duration-300
    ease-in-out
    group-hover:text-zinc-300
  `,
  iconOpen: `
    rotate-180
  `,
  content: `
    overflow-hidden
    transition-all
    duration-300
    ease-in-out
  `,
  answer: `
    px-6 
    pb-6 
    text-zinc-400 
    leading-relaxed
  `,
} as const;
