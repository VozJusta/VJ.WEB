import { ReactNode } from "react";
import { BadgeVariant } from "@/components/ui/badge/badge.types";

export interface SecurityBadge {
  id: string;
  text: string;
  icon?: ReactNode;
  variant: BadgeVariant;
}

export interface Testimonial {
  id: string;
  quote: string;
  authorName: string;
  authorRole: string;
  authorInitials: string;
}

export interface PrivacySectionProps {
  title?: string;
  description?: string;
  badges?: SecurityBadge[];
  testimonial?: Testimonial;
  className?: string;
}
