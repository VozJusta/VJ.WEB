"use client";

import { useState } from "react";
import {
  ArrowForwardRounded,
  AutorenewRounded,
  CheckRounded,
} from "@mui/icons-material";
import { cn } from "@/lib/utils";

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
      {isSaving && <AutorenewRounded aria-hidden fontSize="small" className="animate-spin" />}
      {isSaved && <CheckRounded aria-hidden fontSize="small" />}
      {!isSaving && !isSaved && (
        <ArrowForwardRounded aria-hidden fontSize="small" />
      )}

      <span>
        {isSaving ? "Salvando..." : isSaved ? "Documentos salvos!" : "Salvar todos os documentos"}
      </span>
    </button>
  );
}
