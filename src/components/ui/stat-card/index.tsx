"use client";

import { StatCardProps } from "./stat-card.types";
import {
  statCardBaseStyles,
  statValueStyles,
  statLabelStyles,
  glowEffectStyles,
} from "./stat-card.styles";

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
