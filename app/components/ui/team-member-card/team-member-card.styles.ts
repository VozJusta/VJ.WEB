export const teamMemberCardStyles = {
  container: `
    group
    bg-zinc-900/30
    border
    border-zinc-800/50
    rounded-2xl
    p-6
    transition-all
    duration-300
    hover:border-primary/30
    hover:bg-zinc-900/50
    hover:transform
    hover:scale-[1.02]
  `,
  avatarWrapper: `
    w-20
    h-20
    mx-auto
    mb-4
    rounded-full
    overflow-hidden
    border-4
    border-zinc-800
    transition-all
    duration-300
    group-hover:border-primary/50
  `,
  avatar: `
    w-full
    h-full
    object-cover
  `,
  fallbackAvatar: `
    w-full
    h-full
    bg-gradient-to-br
    from-primary/20
    to-primary/5
    flex
    items-center
    justify-center
    text-2xl
    font-bold
    text-primary
  `,
  name: `
    text-lg
    font-bold
    text-white
    text-center
    mb-2
    transition-colors
    group-hover:text-primary
  `,
  role: `
    text-xs
    font-semibold
    text-primary
    text-center
    uppercase
    tracking-wider
    mb-3
  `,
  description: `
    text-sm
    text-zinc-400
    text-center
    leading-relaxed
  `,
} as const;
