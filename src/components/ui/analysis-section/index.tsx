import { cn } from "@/lib/utils";
import {
  analysisSectionVariants,
  analysisTitleVariants,
  analysisListItemVariants,
  analysisBulletVariants,
} from "./analysis-section.styles";
import type {
  AnalysisSectionProps,
  AnalysisListProps,
} from "./analysis-section.types";

export function AnalysisSection({
  title,
  icon,
  variant = "default",
  children,
  className,
}: AnalysisSectionProps) {
  return (
    <section className={cn(analysisSectionVariants({ variant }), className)}>
      <header className="mb-3 flex items-center gap-2">
        {icon}
        <h3 className={analysisTitleVariants({ variant })}>{title}</h3>
      </header>
      {children}
    </section>
  );
}

export function AnalysisList({
  items,
  variant = "default",
  className,
}: AnalysisListProps) {
  return (
    <ul className={cn("flex flex-col gap-2", className)}>
      {items.map((item, index) => (
        <li key={index} className={analysisListItemVariants({ variant })}>
          <span
            className={analysisBulletVariants({ variant })}
            aria-hidden="true"
          />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

export type {
  AnalysisSectionProps,
  AnalysisListProps,
  AnalysisSectionVariant,
} from "./analysis-section.types";
