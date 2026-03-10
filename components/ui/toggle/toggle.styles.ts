import { cva } from "class-variance-authority";

export const toggleTrack = cva(
  [
    "relative inline-flex shrink-0 cursor-pointer rounded-full",
    "transition-colors duration-200 ease-in-out",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2585F4] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0d1526]",
    "disabled:cursor-not-allowed disabled:opacity-40",
  ],
  {
    variants: {
      checked: {
        true: "bg-[#2585F4]",
        false: "bg-white/15",
      },
      size: {
        sm: "h-5 w-9",
        md: "h-6 w-11",
      },
    },
    defaultVariants: {
      checked: false,
      size: "md",
    },
  },
);

export const toggleThumb = cva(
  [
    "pointer-events-none inline-block rounded-full bg-white shadow-sm",
    "transition-transform duration-200 ease-in-out",
  ],
  {
    variants: {
      checked: {
        true: "",
        false: "",
      },
      size: {
        sm: "h-3.5 w-3.5 translate-y-[3px]",
        md: "h-4 w-4 translate-y-1",
      },
    },
    compoundVariants: [
      { size: "sm", checked: false, class: "translate-x-[3px]" },
      { size: "sm", checked: true, class: "translate-x-[19px]" },
      { size: "md", checked: false, class: "translate-x-1" },
      { size: "md", checked: true, class: "translate-x-6" },
    ],
    defaultVariants: {
      checked: false,
      size: "md",
    },
  },
);
