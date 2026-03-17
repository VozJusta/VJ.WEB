export interface Stat {
  id: string;
  value: string;
  label: string;
  valueColor?: string;
}

export interface CTASectionProps {
  title?: string;
  description?: string;
  ctaText?: string;
  ctaHref?: string;
  stats?: Stat[];
  className?: string;
}
