import type { CSSProperties } from "react";

export interface FaqItemProps {
  question: string;
  answer: string;
  defaultOpen?: boolean;
  className?: string;
  style?: CSSProperties;
}
