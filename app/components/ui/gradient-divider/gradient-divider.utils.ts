import {
  type GradientStop,
  type GradientDirection,
} from "./gradient-divider.types";

const directionMap: Record<GradientDirection, string> = {
  "to-right": "to right",
  "to-left": "to left",
  "to-top": "to top",
  "to-bottom": "to bottom",
};


export function generateGradient(
  direction: GradientDirection,
  stops: GradientStop[],
): string {
  const cssDirection = directionMap[direction];

  const stopsString = stops
    .map((stop) => {
      const alpha = stop.opacity / 100;
      const colorValue = stop.color.startsWith("#")
        ? stop.color.slice(1)
        : stop.color;

      return `color-mix(in srgb, ${stop.color} ${stop.opacity}%, transparent) ${stop.position}%`;
    })
    .join(", ");

  return `linear-gradient(${cssDirection}, ${stopsString})`;
}

export const defaultStops: GradientStop[] = [
  { position: 0, color: "#1978E5", opacity: 0 },
  { position: 50, color: "#1978E5", opacity: 100 },
  { position: 100, color: "#1978E5", opacity: 0 },
];
