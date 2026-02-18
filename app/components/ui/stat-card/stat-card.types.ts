/**
 * Props do StatCard Component
 * Card de estatística com valor destacado e label
 */
export interface StatCardProps {
  /**
   * Valor principal da estatística
   * @example "10h" | "100%" | "+40%" | "Zero"
   */
  value: string;

  /**
   * Label descritivo abaixo do valor
   * @example "Poupadas por semana"
   */
  label: string;

  /**
   * Cor do valor (Tailwind class)
   * @default "text-blue-500"
   */
  valueColor?: string;

  /**
   * Cor do label (Tailwind class)
   * @default "text-slate-400"
   */
  labelColor?: string;

  /**
   * Classes CSS adicionais
   * @optional
   */
  className?: string;

  /**
   * Delay da animação de entrada (em ms)
   * Útil para efeito cascata em grids
   * @optional
   */
  animationDelay?: number;
}
