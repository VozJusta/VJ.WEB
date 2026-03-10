import { cva } from "class-variance-authority";

export const timelineTitle = cva("text-sm font-semibold leading-tight", {
  variants: {
    status: {
      done: "text-white",
      active: "text-white",
      pending: "text-white/35",
    },
  },
  defaultVariants: { status: "done" },
});

export const timelineSubtitle = cva("text-xs mt-0.5", {
  variants: {
    status: {
      done: "text-white/45",
      active: "text-[#2585F4]",
      pending: "text-white/25",
    },
  },
  defaultVariants: { status: "done" },
});

export const timelineConnector = cva("w-px flex-1 mt-1", {
  variants: {
    status: {
      done: "bg-green-400/30",
      active: "bg-white/10",
      pending: "bg-white/10",
    },
  },
  defaultVariants: { status: "done" },
});
