import { ReactNode } from "react";

export type BadgeVariant = "blue" | "green" | "red";

export interface BadgeProps {
  text: string;
  icon?: ReactNode;
  variant?: BadgeVariant;
  rounded?: string;
  className?: string;
  ariaLabel?: string;
}
