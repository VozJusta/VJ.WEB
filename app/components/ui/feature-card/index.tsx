/**
 * FeatureCard Component
 *
 * Componente UI altamente reutilizável para apresentar funcionalidades/features.
 * Suporta múltiplas variantes, ícones customizáveis, e pode funcionar como:
 * - Card estático (Server Component)
 * - Card clicável com link (Server Component)
 * - Card interativo com onClick (Client Component)
 *
 * Arquitetura:
 * - Por padrão é Server Component
 * - Se onClick for fornecido, deve ser usado com 'use client'
 * - Usa composição para máxima flexibilidade
 * - Totalmente desacoplado e reutilizável
 *
 * Localização: components/ui/feature-card/
 *
 * @example
 * ```tsx
 * // Uso básico
 * <FeatureCard
 *   icon={<IconComponent />}
 *   title="Título da Feature"
 *   description="Descrição detalhada da funcionalidade"
 * />
 *
 * // Com link
 * <FeatureCard
 *   icon={<IconComponent />}
 *   title="Feature Clicável"
 *   description="Clique para saber mais"
 *   href="/features/details"
 * />
 *
 * // Variante elevated com animação
 * <FeatureCard
 *   icon={<IconComponent />}
 *   title="Feature Destacada"
 *   description="Com efeitos visuais"
 *   variant="elevated"
 *   animated
 * />
 *
 * // Centralizado, tamanho grande
 * <FeatureCard
 *   icon={<IconComponent />}
 *   title="Feature Grande"
 *   description="Centralizada e espaçosa"
 *   alignment="center"
 *   size="lg"
 * />
 * ```
 */

import Link from "next/link";
import {
  type FeatureCardProps,
  type FeatureCardWrapperProps,
} from "./feature-card.types";
import {
  getCardClasses,
  getTitleClasses,
  getDescriptionClasses,
  iconContainerClasses,
} from "./feature-card.styles";

/**
 * Componente interno para wrapper (Link ou article)
 * Aplica Link do Next.js quando href é fornecido, article caso contrário
 */
function FeatureCardWrapper({
  children,
  href,
  external,
  onClick,
  className,
  id,
  ariaLabel,
}: FeatureCardWrapperProps) {
  // Se tem href, usar Link do Next.js
  if (href) {
    return (
      <Link
        href={href}
        className={className}
        id={id}
        aria-label={ariaLabel}
        target={external ? "_blank" : undefined}
        rel={external ? "noopener noreferrer" : undefined}
      >
        {children}
      </Link>
    );
  }

  // Se tem onClick, usar article com handler
  if (onClick) {
    return (
      <article
        className={className}
        id={id}
        aria-label={ariaLabel}
        onClick={onClick}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            onClick();
          }
        }}
        role="button"
        tabIndex={0}
      >
        {children}
      </article>
    );
  }

  // Caso padrão: apenas article estático
  return (
    <article className={className} id={id} aria-label={ariaLabel}>
      {children}
    </article>
  );
}

/**
 * FeatureCard - Componente principal
 *
 * IMPORTANTE: Se usar onClick, adicione 'use client' no arquivo que importa
 */
export function FeatureCard({
  icon,
  title,
  description,
  variant = "default",
  alignment = "start",
  size = "md",
  animated = false,
  className,
  iconClassName,
  titleClassName,
  descriptionClassName,
  onClick,
  href,
  external = false,
  id,
  ariaLabel,
}: FeatureCardProps) {
  // Determina se o card é clicável (tem href ou onClick)
  const isClickable = Boolean(href || onClick);

  // Combina classes do card
  const cardClasses = getCardClasses(
    variant,
    alignment,
    size,
    animated,
    isClickable,
    className,
  );

  // Classes do título e descrição
  const titleClasses = getTitleClasses(size, titleClassName);
  const descriptionClasses = getDescriptionClasses(size, descriptionClassName);

  return (
    <FeatureCardWrapper
      href={href}
      external={external}
      onClick={onClick}
      className={cardClasses}
      id={id}
      ariaLabel={ariaLabel || `${title}: ${description}`}
    >
      {/* Ícone (se fornecido) */}
      {icon && (
        <div className={`${iconContainerClasses} ${iconClassName || ""}`}>
          {icon}
        </div>
      )}

      {/* Título */}
      <h3 className={titleClasses}>{title}</h3>

      {/* Descrição */}
      <p className={descriptionClasses}>{description}</p>
    </FeatureCardWrapper>
  );
}
