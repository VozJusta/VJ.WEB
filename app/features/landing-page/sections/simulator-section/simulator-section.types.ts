import { StaticImageData } from "next/image";
import { ReactNode } from "react";


export interface SimulatorFeature {
  id: string;
  icon: ReactNode;
  text: string;
  iconColor: string;
}

export interface SimulatorSectionProps {
  tag?: string;
  title?: string;
  titleHighlight?: string;
  description?: string;
  features?: SimulatorFeature[];
  ctaText?: string;
  ctaHref?: string;
  illustrationPath?: StaticImageData | string;
  className?: string;
}
