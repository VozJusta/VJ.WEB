export type PriorityLevel = "low" | "medium" | "high";

export type ViabilityCardProps = {
  matchPercentage: number;
  description: string;
  priority: PriorityLevel;
  className?: string;
};
