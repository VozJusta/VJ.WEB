import { cva, type VariantProps } from "class-variance-authority";

export const buttonVariants = cva(
  [
    "inline-flex items-center justify-center",
    "font-medium",
    "transition-all duration-200",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
    "disabled:pointer-events-none disabled:opacity-50",
    "rounded-lg",
  ],
  {
    variants: {
      variant: {
        primary: [
          "bg-[#2585F4] text-white",
          "hover:bg-[#1978E5]",
          "active:bg-[#1565C0]",
          "shadow-[0_4px_15px_rgba(19,91,236,0.4)]",
          "[box-shadow:0_4px_15px_rgba(19,91,236,0.4),inset_0_1px_1px_rgba(255,255,255,0.2)]",
          "hover:shadow-[0_6px_20px_rgba(19,91,236,0.5)]",
          "focus-visible:ring-[#2585F4]",
        ],

        secondary: [
          "bg-gray-600 text-white",
          "hover:bg-gray-700",
          "active:bg-gray-800",
          "shadow-sm",
          "focus-visible:ring-gray-500",
        ],

        outline: [
          "border-2 border-[#1978E5]",
          "bg-transparent",
          "text-[#1978E5]",
          "hover:bg-[#1978E5]/5",
          "active:bg-[#1978E5]/10",
          "focus-visible:ring-[#1978E5]",
        ],

        ghost: [
          "bg-transparent",
          "text-white/60",
          "hover:bg-white/8",
          "hover:text-white",
          "active:bg-white/12",
          "focus-visible:ring-white/30",
        ],

        danger: [
          "bg-red-600 text-white",
          "hover:bg-red-700",
          "active:bg-red-800",
          "shadow-sm",
          "focus-visible:ring-red-500",
        ],

        white: [
          "bg-white text-black",
          "hover:bg-white/90",
          "active:bg-white/80",
          "shadow-[0_4px_15px_rgba(255,255,255,0.15)]",
          "focus-visible:ring-white",
        ],
      },

      size: {
        sm: "h-9 px-4 text-sm",
        md: "h-11 px-6 text-base",
        lg: "h-13 px-8 text-lg",
      },

      fullWidth: {
        true: "w-full",
      },
    },

    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  },
);

export type ButtonVariantProps = VariantProps<typeof buttonVariants>;
