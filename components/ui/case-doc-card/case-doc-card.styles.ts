import { cva } from "class-variance-authority";

export const docCardIconWrapper = cva(
  "flex shrink-0 items-center justify-center w-9 h-9 rounded-lg",
  {
    variants: {
      mimeType: {
        pdf: "bg-orange-500/15 text-orange-400",
        image: "bg-blue-500/15 text-blue-400",
      },
    },
    defaultVariants: { mimeType: "pdf" },
  },
);

export const docCardWrapper =
  "flex items-center gap-3 rounded-xl border border-[#1B2233] bg-[#111c30] px-4 py-3 hover:bg-[#152036] transition-colors duration-150";

export const docCardAction =
  "flex shrink-0 items-center justify-center w-8 h-8 rounded-lg text-white/35 hover:text-white hover:bg-white/08 transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2585F4]";
