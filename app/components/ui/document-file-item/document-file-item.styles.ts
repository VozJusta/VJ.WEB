import { DocumentStatus } from "./document-file-item.types";

export const itemWrapper =
  "group relative flex items-center gap-4 w-full px-5 py-4 rounded-xl bg-[#161c26] border border-[rgba(255,255,255,0.07)] transition-all duration-200 hover:bg-[#1a2233] hover:border-[rgba(255,255,255,0.12)] hover:shadow-[0_4px_24px_rgba(0,0,0,0.25)]";

export const fileIconWrapper =
  "flex-shrink-0 flex items-center justify-center w-10 h-10 rounded-lg bg-[rgba(37,133,244,0.12)] text-[#2585F4]";

export const filenameClass =
  "text-sm font-semibold text-white leading-tight truncate max-w-[260px] md:max-w-xs";

export const metaClass = "text-xs text-white/40 leading-none tabular-nums";

export const statusConfig: Record<
  DocumentStatus,
  { label: string; bg: string; text: string; dot?: string }
> = {
  validated: {
    label: "Validado",
    bg: "bg-[#0d2318]",
    text: "text-green-400",
  },
  analyzing: {
    label: "Analisando",
    bg: "bg-[#2a1f06]",
    text: "text-amber-400",
    dot: "bg-amber-400",
  },
  rejected: {
    label: "Rejeitado",
    bg: "bg-[#2a0d0d]",
    text: "text-red-400",
  },
};

export const menuButtonClass =
  "flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-lg text-white/30 hover:text-white/70 hover:bg-white/08 transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2585F4]";

export const menuDropdownClass =
  "absolute right-0 top-full mt-1.5 z-20 min-w-[160px] rounded-xl bg-[#1e2735] border border-[rgba(255,255,255,0.10)] shadow-[0_8px_32px_rgba(0,0,0,0.45)] overflow-hidden animate-[file-enter_0.18s_ease-out]";

export const menuItemClass =
  "flex items-center gap-2.5 w-full px-4 py-2.5 text-sm text-white/70 hover:text-white hover:bg-white/07 transition-colors duration-100 text-left";

export const menuDividerClass = "h-px bg-[rgba(255,255,255,0.07)] mx-2";
