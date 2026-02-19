
export type PlanCardVariant = "dark" | "light";

export interface PlanFeature {
  id: string;
  text: string;
  included?: boolean;
}

export interface PlanCardProps {
  name: string;
  description: string;
  price: string;
  features: PlanFeature[];
  ctaText: string;
  ctaHref: string;
  variant?: PlanCardVariant;
  recommended?: boolean;
  recommendedText?: string;
  className?: string;
}
