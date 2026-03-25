import { type GradientDividerProps } from "./gradient-divider.types";
import { generateGradient, defaultStops } from "./gradient-divider.utils";
import { cn } from "@/src/lib/utils";

export function GradientDivider({
  direction = "to-right",
  stops = defaultStops,
  height = "h-0.5",
  className,
}: GradientDividerProps) {
  const gradientStyle = generateGradient(direction, stops);

  return (
    <div
      className={cn("w-full", height, className)}
      style={{
        background: gradientStyle,
      }}
      role="presentation"
      aria-hidden="true"
    />
  );
}
