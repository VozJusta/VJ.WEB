"use client";

import { CheckCircleOutlined } from "@mui/icons-material";
import { Button } from "@/components/ui/button";
import { PlanCardProps } from "./plan-card.types";
import {
  planCardVariants,
  planCardBaseStyles,
  recommendedBadgeStyles,
} from "./plan-card.styles";

export function PlanCard({
  name,
  description,
  price,
  features,
  ctaText,
  ctaHref,
  onCtaClick,
  ctaLoading = false,
  variant = "dark",
  recommended = false,
  recommendedText = "RECOMENDADO",
  className = "",
}: PlanCardProps) {
  const styles = planCardVariants[variant];

  return (
    <article
      className={`
        ${planCardBaseStyles}
        ${styles.container}
        ${className}
        min-h-107.5
      `}
      role="article"
      aria-label={`Plano ${name}`}
    >
      {recommended && (
        <span className={recommendedBadgeStyles} aria-label="Plano recomendado">
          {recommendedText}
        </span>
      )}

      <header className="space-y-3">
        <h3 className={`text-3xl font-bold ${styles.name}`}>{name}</h3>

        <p className={`text-sm ${styles.description}`}>{description}</p>
      </header>

      <div className={`text-4xl font-bold ${styles.price}`}>{price}</div>

      <ul className="space-y-3 flex-grow" role="list">
        {features.map((feature) => (
          <li key={feature.id} className="flex items-start gap-3 group">
            <div
              className={`
                flex-shrink-0
                transition-transform
                duration-200
                group-hover:scale-110
                ${styles.featureIcon}
              `}
              aria-hidden="true"
            >
              <CheckCircleOutlined sx={{ fontSize: 20 }} />
            </div>

            <p className={`text-sm leading-relaxed ${styles.featureText}`}>
              {feature.text}
            </p>
          </li>
        ))}
      </ul>

      <Button
        {...(onCtaClick ? { onClick: onCtaClick } : { href: ctaHref })}
        size="lg"
        loading={ctaLoading}
        className={`
          w-full
          rounded-full
          font-semibold
          transition-all
          duration-300
          ${styles.button}
        `}
        aria-label={`${ctaText} - ${name}`}
      >
        {ctaText}
      </Button>
    </article>
  );
}
