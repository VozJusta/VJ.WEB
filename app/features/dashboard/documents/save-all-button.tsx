"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

function ArrowRightIcon() {
  return (
    <svg
      aria-hidden="true"
      className="w-4 h-4"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="12,5 19,12 12,19" />
    </svg>
  );
}

function SpinnerIcon() {
  return (
    <svg
      aria-hidden="true"
      className="w-4 h-4 animate-spin"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg
      aria-hidden="true"
      className="w-4 h-4"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="20,6 9,17 4,12" />
    </svg>
  );
}

type SaveState = "idle" | "saving" | "saved";

export function SaveAllButton() {
  const [saveState, setSaveState] = useState<SaveState>("idle");

  const handleSave = async () => {
    if (saveState !== "idle") return;

    setSaveState("saving");

    await new Promise((resolve) => setTimeout(resolve, 1600));

    setSaveState("saved");
    setTimeout(() => setSaveState("idle"), 2500);
  };

  const isSaving = saveState === "saving";
  const isSaved = saveState === "saved";

  return (
    <button
      type="button"
      aria-label="Salvar todos os documentos"
      aria-busy={isSaving}
      disabled={isSaving}
      onClick={handleSave}
      className={cn(
        "w-full flex items-center justify-center gap-2.5",
        "px-6 py-4 rounded-xl",
        "text-sm font-semibold text-white",
        "transition-all duration-300",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2585F4] focus-visible:ring-offset-2",
        "disabled:cursor-not-allowed",
        isSaved
          ? "bg-green-600 shadow-[0_4px_20px_rgba(34,197,94,0.35)]"
          : "bg-[#2585F4] shadow-[0_4px_20px_rgba(37,133,244,0.4)] hover:bg-[#1978E5] hover:shadow-[0_6px_28px_rgba(37,133,244,0.5)] active:scale-[0.99]"
      )}
    >
      {isSaving && <SpinnerIcon />}
      {isSaved && <CheckIcon />}
      {!isSaving && !isSaved && (
        <span className="transition-transform duration-200 group-hover:translate-x-0.5">
          <ArrowRightIcon />
        </span>
      )}

      <span>
        {isSaving ? "Salvando..." : isSaved ? "Documentos salvos!" : "Salvar todos os documentos"}
      </span>
    </button>
  );
}
