export type GradientDirection = "to-right" | "to-left" | "to-top" | "to-bottom";

export interface GradientStop {
  position: number;
  color: string;
  opacity: number;
}

export interface GradientDividerProps {
  direction?: GradientDirection;
  stops?: GradientStop[];
  height?: string;
  className?: string;
}
