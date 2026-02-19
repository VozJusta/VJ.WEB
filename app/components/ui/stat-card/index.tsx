"use client";

import { StatCardProps } from "./stat-card.types";
import {
  statCardBaseStyles,
  statValueStyles,
  statLabelStyles,
  glowEffectStyles,
} from "./stat-card.styles";

/**
 * StatCard Component
 *
 * Card de estatística reutilizável com:
 * - Background escuro com borda azul sutil
 * - Efeitos de hover (scale, glow, border)
 * - Animações suaves
 * - Totalmente customizável
 *
 * **Por que Client Component?**
 * - Animações e transições CSS dependem de estados visuais
 * - Hover effects precisam ser responsivos
 * - Performance não é impactada (componente leve)
 *
 * @example
 * ```tsx
 * <StatCard
 *   value="10h"
 *   label="Poupadas por semana"
 *   valueColor="text-blue-500"
 * />
 * ```
 *
 * @component
 */
export function StatCard({
  value,
  label,
  valueColor = "text-blue-500",
  labelColor = "text-slate-400",
  className = "flex items-center flex-col",
  animationDelay = 0,
}: StatCardProps) {
  return (
    <article
      className={`
        ${statCardBaseStyles}
        ${glowEffectStyles}
        ${className}
      `}
      style={{
        animationDelay: `${animationDelay}ms`,
      }}
      role="figure"
      aria-label={`${value} ${label}`}
    >
      <p className={`${statValueStyles} ${valueColor}`}>{value}</p>

      <p className={`${statLabelStyles} ${labelColor}`}>{label}</p>
    </article>
  );
}
