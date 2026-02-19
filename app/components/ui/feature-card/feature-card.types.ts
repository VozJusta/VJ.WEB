import { type ReactNode } from "react";


export type FeatureCardVariant =
  | "default" 
  | "elevated" 
  | "flat" 
  | "outlined" 
  | "gradient"; 


export type FeatureCardAlignment =
  | "start" 
  | "center" 
  | "end"; 


export type FeatureCardSize =
  | "sm" 
  | "md" 
  | "lg"; 


export interface FeatureCardProps {
  icon?: ReactNode;
  title: string;
  description: string;
  variant?: FeatureCardVariant;
  alignment?: FeatureCardAlignment;
  size?: FeatureCardSize;
  animated?: boolean;
  className?: string;
  iconClassName?: string;
  titleClassName?: string;
  descriptionClassName?: string;
  onClick?: () => void;
  href?: string;
  external?: boolean;
  id?: string;
  ariaLabel?: string;
}

export interface FeatureCardWrapperProps {
  children: ReactNode;
  href?: string;
  external?: boolean;
  onClick?: () => void;
  className: string;
  id?: string;
  ariaLabel?: string;
}
