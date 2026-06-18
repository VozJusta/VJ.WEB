import {
  PlanCardVariant,
  PlanFeature,
} from "@/components/ui/plan-card/plan-card.types";

export type PlanAudience = "citizen" | "lawyer";

export interface Plan {
  id: string;
  name: string;
  description: string;
  price: string;
  features: PlanFeature[];
  ctaText: string;
  ctaHref: string;
  planType?: string;
  variant: PlanCardVariant;
  recommended?: boolean;
  audience: PlanAudience;
}

export interface PricingSectionProps {
  title?: string;
  subtitle?: string;
  className?: string;
}
