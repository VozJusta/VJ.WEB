import type { ReactNode } from "react";

export type AnalysisSectionVariant = "default" | "success" | "warning" | "danger";

export type AnalysisSectionProps = {
  title: string;
  icon?: ReactNode;
  variant?: AnalysisSectionVariant;
  children: ReactNode;
  className?: string;
};

export type AnalysisListProps = {
  items: string[];
  variant?: AnalysisSectionVariant;
  className?: string;
};
