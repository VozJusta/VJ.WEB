import {
  type FeatureCardVariant,
  type FeatureCardAlignment,
  type FeatureCardSize,
} from "./feature-card.types";

export const baseCardClasses =
  "group relative overflow-hidden rounded-[var(--radius-default)] transition-all duration-300";

export const cardVariants: Record<FeatureCardVariant, string> = {
  default:
    "border border-foreground/10 bg-[#0F1319] hover:border-foreground/20",

  elevated:
    "bg-[#0F1319] shadow-sm hover:shadow-md border border-foreground/5",

  flat: "bg-foreground/5 hover:bg-foreground/10",

  outlined:
    "border-2 border-foreground/20 bg-transparent hover:border-primary hover:bg-primary/5",

  gradient:
    "border border-foreground/10 bg-gradient-to-br from-primary/5 to-transparent hover:from-primary/10",
};

export const alignmentClasses: Record<FeatureCardAlignment, string> = {
  start: "text-left items-start",
  center: "text-center items-center",
  end: "text-right items-end",
};

export const sizeClasses: Record<FeatureCardSize, string> = {
  sm: "p-4 gap-3 max-w-sm",
  md: "p-6 gap-4 max-w-md",
  lg: "p-8 gap-6 max-w-lg",
};

export const animationClasses =
  "hover:scale-[1.02] hover:-translate-y-1 active:scale-[0.98]";

export const iconContainerClasses =
  "flex-shrink-0 transition-transform duration-300 group-hover:scale-110";

export const titleBaseClasses =
  "font-semibold tracking-tight text-foreground transition-colors";

export const titleSizeClasses: Record<FeatureCardSize, string> = {
  sm: "text-base",
  md: "text-lg",
  lg: "text-xl",
};

export const descriptionBaseClasses =
  "text-foreground-muted leading-relaxed transition-colors";

export const descriptionSizeClasses: Record<FeatureCardSize, string> = {
  sm: "text-sm",
  md: "text-base",
  lg: "text-lg",
};

export const clickableClasses =
  "cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2";

export function getCardClasses(
  variant: FeatureCardVariant,
  alignment: FeatureCardAlignment,
  size: FeatureCardSize,
  animated: boolean,
  clickable: boolean,
  customClass?: string,
): string {
  const classes = [
    baseCardClasses,
    cardVariants[variant],
    alignmentClasses[alignment],
    sizeClasses[size],
    animated && animationClasses,
    clickable && clickableClasses,
    "flex flex-col",
    customClass,
  ];

  return classes.filter(Boolean).join(" ");
}

export function getTitleClasses(
  size: FeatureCardSize,
  customClass?: string,
): string {
  return [titleBaseClasses, titleSizeClasses[size], customClass]
    .filter(Boolean)
    .join(" ");
}

export function getDescriptionClasses(
  size: FeatureCardSize,
  customClass?: string,
): string {
  return [descriptionBaseClasses, descriptionSizeClasses[size], customClass]
    .filter(Boolean)
    .join(" ");
}
