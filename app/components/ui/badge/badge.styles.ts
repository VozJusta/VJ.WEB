import { BadgeVariant } from "./badge.types";

interface VariantStyles {
  bg: string;
  text: string;
  icon: string;
  rounded: string;
}

export const badgeVariants: Record<BadgeVariant, VariantStyles> = {
  blue: {
    bg: "bg-[#0D1A2B]",
    text: "text-blue-600",
    rounded: "rounded-full",
    icon: "text-blue-500",
  },

  green: {
    bg: "bg-green-50/80",
    text: "text-green-600",
    rounded: "rounded-full",
    icon: "text-green-500",
  },

  red: {
    bg: "bg-red-50/80",
    text: "text-red-600",
    rounded: "rounded-full",
    icon: "text-red-500",
  },
};

export const badgeBaseStyles = `
  inline-flex
  items-center
  gap-2
  px-3
  py-1.5
  rounded-full
  font-medium
  text-xs
  tracking-wide
  uppercase
  transition-all
  duration-200
  hover:shadow-lg
  select-none
`;

export const iconStyles = `
  w-4
  h-4
  flex-shrink-0
`;
