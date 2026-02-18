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

function FeatureCardWrapper({
  children,
  href,
  external,
  onClick,
  className,
  id,
  ariaLabel,
}: FeatureCardWrapperProps) {
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

  return (
    <article className={className} id={id} aria-label={ariaLabel}>
      {children}
    </article>
  );
}

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
  const isClickable = Boolean(href || onClick);

  const cardClasses = getCardClasses(
    variant,
    alignment,
    size,
    animated,
    isClickable,
    className,
  );

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
      {icon && (
        <div className={`${iconContainerClasses} ${iconClassName || ""} w-14 h-14 flex items-center justify-center rounded-2xl border-1 border-foreground/10 bg-foreground/5`}>
          {icon}
        </div>
      )}

      <h3 className={titleClasses}>{title}</h3>

      <p className={descriptionClasses}>{description}</p>
    </FeatureCardWrapper>
  );
}
