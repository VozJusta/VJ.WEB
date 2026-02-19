/**
 * Estilos do TestimonialCard
 * Design baseado em card escuro com borda sutil
 */

export const testimonialCardBaseStyles = `
  relative
  p-8
  rounded-2xl
  bg-slate-900/80
  border border-slate-800
  backdrop-blur-sm
  transition-all
  duration-300
  hover:border-slate-700
  hover:shadow-lg
  hover:shadow-slate-900/50
`;

/**
 * Estilos do quote (texto do depoimento)
 */
export const quoteStyles = `
  text-base
  lg:text-lg
  text-slate-300
  leading-relaxed
  mb-6
  before:content-['"']
  after:content-['"']
`;

/**
 * Estilos do avatar (iniciais)
 */
export const avatarStyles = `
  w-12
  h-12
  rounded-full
  bg-gradient-to-br
  from-slate-700
  to-slate-800
  flex
  items-center
  justify-center
  text-white
  font-bold
  text-lg
  flex-shrink-0
  border-2
  border-slate-700
`;

/**
 * Estilos do autor (nome e cargo)
 */
export const authorNameStyles = `
  text-white
  font-semibold
  text-base
`;

export const authorRoleStyles = `
  text-slate-500
  text-xs
  uppercase
  tracking-wider
  font-medium
`;
