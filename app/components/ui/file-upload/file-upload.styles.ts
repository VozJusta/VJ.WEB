import { UploadState } from "./file-upload.types";

export const uploadZoneBase =
  "relative flex flex-col items-center justify-center w-full min-h-[220px] rounded-xl border-2 border-dashed transition-all duration-300 cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-[#2585F4] focus-visible:ring-offset-2";

export const uploadZoneVariants: Record<
  Extract<UploadState, "idle" | "dragging" | "success" | "error">,
  string
> = {
  idle: "border-[rgba(37,133,244,0.25)] bg-[rgba(37,133,244,0.04)] hover:border-[rgba(37,133,244,0.5)] hover:bg-[rgba(37,133,244,0.07)]",
  dragging:
    "border-[#2585F4] bg-[rgba(37,133,244,0.10)] scale-[1.01] shadow-[0_0_0_4px_rgba(37,133,244,0.15)]",
  success:
    "border-[rgba(34,197,94,0.45)] bg-[rgba(34,197,94,0.05)]",
  error:
    "border-[rgba(239,68,68,0.45)] bg-[rgba(239,68,68,0.05)]",
};

export const uploadTriggerButton =
  "flex items-center justify-center w-14 h-14 rounded-full bg-[#2585F4] text-white shadow-[0_4px_20px_rgba(37,133,244,0.45)] transition-all duration-300 hover:bg-[#1978E5] hover:scale-110 hover:shadow-[0_6px_28px_rgba(37,133,244,0.55)] active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#2585F4]";

export const progressBarTrack =
  "w-full h-1 rounded-full bg-[rgba(255,255,255,0.08)] overflow-hidden";

export const progressBarFill =
  "h-full rounded-full bg-gradient-to-r from-[#2585F4] to-[#1978E5] transition-[width] duration-300 ease-out";

export const filePreviewItem =
  "flex items-center gap-3 w-full max-w-xs px-3 py-2 rounded-lg bg-[rgba(255,255,255,0.06)] border border-[rgba(255,255,255,0.08)]";

export const removeButton =
  "ml-auto flex-shrink-0 p-1 rounded-full text-white/40 hover:text-white/80 hover:bg-white/10 transition-all duration-150";
