import { PlanCardVariant } from "./plan-card.types";

interface VariantStyles {
  container: string;
  name: string;
  description: string;
  price: string;
  featureText: string;
  featureIcon: string;
  button: string;
}

export const planCardVariants: Record<PlanCardVariant, VariantStyles> = {
  dark: {
    container: `
      bg-slate-900
      border-slate-800
    `,
    name: "text-white",
    description: "text-slate-400",
    price: "text-white",
    featureText: "text-slate-300",
    featureIcon: "text-blue-500",
    button: "border-2 border-slate-700 text-white hover:bg-slate-800",
  },

  light: {
    container: `
      bg-gradient-to-br from-blue-50 to-blue-100
      border-blue-200
      shadow-[0_0_40px_rgba(37,133,244,0.3)]
    `,
    name: "text-slate-900",
    description: "text-slate-600",
    price: "text-blue-600",
    featureText: "text-slate-700",
    featureIcon: "text-blue-500",
    button:
      "bg-blue-600 text-white hover:bg-blue-700 shadow-lg shadow-blue-500/30",
  },
};

export const planCardBaseStyles = `
  relative
  rounded-3xl
  border-2
  p-8
  transition-all
  duration-300
  hover:scale-105
  hover:shadow-2xl
  flex flex-col
  gap-6
`;

export const recommendedBadgeStyles = `
  absolute
  -top-4
  left-1/2
  -translate-x-1/2
  px-4 py-1.5
  bg-blue-600
  text-white
  text-xs
  font-bold
  tracking-wider
  rounded-full
  uppercase
  shadow-lg
  whitespace-nowrap
`;
