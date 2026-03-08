"use client";

import { useState } from "react";
import {
  ArrowForwardRounded,
  CheckRounded,
} from "@mui/icons-material";
import { Button } from "@/components/ui/button";

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
    <Button
      variant="primary"
      size="lg"
      fullWidth
      loading={isSaving}
      disabled={isSaving}
      aria-label="Salvar todos os documentos"
      aria-busy={isSaving}
      onClick={handleSave}
      rightIcon={isSaved ? <CheckRounded fontSize="small" aria-hidden /> : <ArrowForwardRounded fontSize="small" aria-hidden />}
      className={isSaved ? "bg-green-600 hover:bg-green-700 shadow-[0_4px_20px_rgba(34,197,94,0.35)] focus-visible:ring-green-500" : ""}
    >
      {isSaving ? "Salvando..." : isSaved ? "Documentos salvos!" : "Salvar todos os documentos"}
    </Button>
  );
}

