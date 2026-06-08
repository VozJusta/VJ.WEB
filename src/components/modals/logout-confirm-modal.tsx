"use client";

import { useEffect } from "react";
import { createPortal } from "react-dom";
import { LogoutRounded } from "@mui/icons-material";
import { Button } from "@/components/ui/button";

interface LogoutConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export function LogoutConfirmModal({ isOpen, onClose, onConfirm }: LogoutConfirmModalProps) {
  // Close on Escape while the modal is open.
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  // `isOpen` is always false on the server and initial client render, so the
  // portal only ever runs in the browser — no hydration mismatch.
  if (!isOpen || typeof document === "undefined") return null;

  return createPortal(
    <div
      className="fixed inset-0 z-60 flex items-center justify-center bg-black/70 px-4 backdrop-blur-sm cursor-pointer"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="logout-modal-title"
        aria-describedby="logout-modal-desc"
        className="flex w-full max-w-md flex-col gap-5 rounded-2xl border border-[#1B2233] bg-[#111c30] p-6"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex items-center gap-3">
          <span
            aria-hidden
            className="flex h-10 w-10 items-center justify-center rounded-full bg-red-500/15"
          >
            <LogoutRounded className="text-red-400" fontSize="small" />
          </span>
          <h2 id="logout-modal-title" className="text-lg font-bold text-white">
            Sair da conta
          </h2>
        </div>

        <p id="logout-modal-desc" className="text-sm leading-relaxed text-white/60">
          Tem certeza que deseja encerrar a sessão? Você precisará entrar novamente
          para acessar sua conta.
        </p>

        <div className="flex gap-3">
          <Button
            variant="ghost"
            size="md"
            fullWidth
            onClick={onClose}
            className="border border-[#1B2233] text-white/70 hover:bg-white/8 hover:text-white"
          >
            Cancelar
          </Button>
          <Button
            variant="danger"
            size="md"
            fullWidth
            onClick={onConfirm}
            className="bg-red-600 hover:bg-red-700"
          >
            Sair
          </Button>
        </div>
      </div>
    </div>,
    document.body,
  );
}
