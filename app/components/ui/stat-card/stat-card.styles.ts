/**
 * Estilos base do StatCard
 * Background escuro com borda sutil blue
 */
export const statCardBaseStyles = `
  relative
  px-6 py-8
  rounded-2xl
  bg-slate-900/50
  border border-blue-500/20
  backdrop-blur-sm
  transition-all
  duration-300
  hover:border-blue-500/40
  hover:bg-slate-900/70
  hover:shadow-lg
  hover:shadow-blue-500/10
  hover:scale-105
  group
  overflow-hidden
`;

export const statValueStyles = `
  text-3xl
  sm:text-4xl
  lg:text-5xl
  font-bold
  mb-2
  transition-transform
  duration-300
  group-hover:scale-110
`;

/**
 * Estilos do label (texto descritivo)
 */
export const statLabelStyles = `
  text-xs
  sm:text-sm
  font-medium
  leading-relaxed
`;

/**
 * Efeito de brilho no hover (pseudo-elemento)
 */
export const glowEffectStyles = `
  before:absolute
  before:inset-0
  before:rounded-2xl
  before:bg-gradient-to-br
  before:from-blue-500/5
  before:to-transparent
  before:opacity-0
  before:transition-opacity
  before:duration-300
  hover:before:opacity-100
`;
