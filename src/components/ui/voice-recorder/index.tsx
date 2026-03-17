"use client";

import { MicRounded, StopRounded } from "@mui/icons-material";
import type { VoiceRecorderProps } from "./voice-recorder.types";

const BAR_DELAYS = [0, 0.1, 0.2, 0.35, 0.15, 0.3, 0.05, 0.25, 0.1, 0.2, 0.3, 0.15];
const BAR_HEIGHTS = [32, 48, 56, 40, 64, 52, 44, 60, 36, 56, 48, 40];

function formatTime(seconds: number) {
  const m = String(Math.floor(seconds / 60)).padStart(2, "0");
  const s = String(seconds % 60).padStart(2, "0");
  return `${m}:${s}`;
}

export function VoiceRecorder({ isRecording, elapsedSeconds, onStart, onStop }: VoiceRecorderProps) {
  if (isRecording) {
    return (
      <div className="relative flex flex-col items-center justify-center gap-4 w-full min-h-[220px] rounded-xl border border-[#1B2233] bg-[#0d1526]">
        <div className="flex items-end justify-center gap-1 h-16" aria-hidden>
          {BAR_HEIGHTS.map((h, i) => (
            <span
              key={i}
              style={{
                height: h,
                animationDelay: `${BAR_DELAYS[i]}s`,
                animationDuration: "0.8s",
              }}
              className="w-1.5 rounded-full bg-[#2585F4] origin-bottom animate-[wave-bar_0.8s_ease-in-out_infinite]"
            />
          ))}
        </div>

        <div className="flex flex-col items-center gap-1">
          <p className="text-base font-semibold text-[#2585F4]">Gravando áudio...</p>
          <time className="text-sm tabular-nums text-white/50">{formatTime(elapsedSeconds)}</time>
        </div>

        <button
          type="button"
          onClick={onStop}
          aria-label="Parar gravação"
          className="absolute bottom-4 right-4 flex items-center justify-center w-11 h-11 rounded-full bg-red-500 hover:bg-red-600 text-white shadow-[0_4px_16px_rgba(239,68,68,0.45)] transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-400"
        >
          <StopRounded fontSize="small" aria-hidden />
        </button>
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={onStart}
      aria-label="Gravar áudio"
      className="absolute bottom-3 right-3 flex items-center justify-center w-10 h-10 rounded-full bg-[#2585F4] hover:bg-[#1978E5] text-white shadow-[0_4px_16px_rgba(37,133,244,0.45)] transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2585F4]"
    >
      <MicRounded fontSize="small" aria-hidden />
    </button>
  );
}
