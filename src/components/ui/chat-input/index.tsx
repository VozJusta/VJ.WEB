"use client";

import { useEffect, useRef, useState } from "react";
import { AddRounded, MicNoneRounded, SendRounded, StopRounded, AttachFileRounded } from "@mui/icons-material";
import { cn } from "@/lib/utils";
import type { ChatInputProps } from "./chat-input.types";

export function ChatInput({
  value,
  onChange,
  onSend,
  onVoiceRecord,
  onFileAttach,
  placeholder = "Digite sua resposta...",
  disabled = false,
  maxHeight = 200,
  isRecording = false,
  isTranscribing = false,
  isUploading = false,
}: ChatInputProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    textarea.style.height = "auto";
    const newHeight = Math.min(textarea.scrollHeight, maxHeight);
    textarea.style.height = `${newHeight}px`;
  }, [value, maxHeight]);

  // Close menu when clicking outside
  useEffect(() => {
    if (!menuOpen) return;
    const handler = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [menuOpen]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (value.trim() && !disabled) {
        onSend();
      }
    }
  };

  useEffect(() => {
    if (!disabled) {
      textareaRef.current?.focus();
    }
  }, [disabled]);

  const handleSend = () => {
    if (value.trim() && !disabled) {
      onSend();
      setTimeout(() => textareaRef.current?.focus(), 0);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && onFileAttach) {
      onFileAttach(file);
    }
    // Reset so the same file can be selected again
    e.target.value = "";
    setMenuOpen(false);
  };

  const handleAudioOption = () => {
    setMenuOpen(false);
    onVoiceRecord?.();
  };

  const handleFileOption = () => {
    setMenuOpen(false);
    fileInputRef.current?.click();
  };

  const hasAttachOptions = onVoiceRecord || onFileAttach;

  return (
    <>
      {isRecording && (
        <div className="mb-2 flex items-center gap-2 px-1">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-500 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-red-500" />
          </span>
          <span className="text-xs font-medium text-red-400">Gravando... clique no microfone para parar</span>
        </div>
      )}
      {isTranscribing && (
        <div className="mb-2 flex items-center gap-2 px-1">
          <span className="h-2 w-2 animate-pulse rounded-full bg-primary" />
          <span className="text-xs font-medium text-text-muted">Transcrevendo áudio...</span>
        </div>
      )}
      {isUploading && (
        <div className="mb-2 flex items-center gap-2 px-1">
          <span className="h-2 w-2 animate-pulse rounded-full bg-[#2585F4]" />
          <span className="text-xs font-medium text-text-muted">Enviando arquivo...</span>
        </div>
      )}

      <div
        className={cn(
          "flex items-end gap-3 rounded-2xl border bg-surface-elevated p-3 transition-all",
          isRecording
            ? "border-red-500/50 bg-red-500/5"
            : "border-(--border-subtle) focus-within:border-(--border-default) focus-within:bg-surface",
        )}
      >
        {/* Hidden file input */}
        {onFileAttach && (
          <input
            ref={fileInputRef}
            type="file"
            accept=".jpg,.jpeg,.png,.pdf"
            className="sr-only"
            onChange={handleFileChange}
            aria-hidden="true"
          />
        )}

        {/* Attach/record button with dropdown menu */}
        {hasAttachOptions && (
          <div className="relative" ref={menuRef}>
            {isRecording ? (
              // While recording, show Stop button directly
              <button
                type="button"
                onClick={onVoiceRecord}
                aria-label="Parar gravação"
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-red-500/20 text-red-400 hover:bg-red-500/30 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              >
                <StopRounded fontSize="small" aria-hidden="true" />
              </button>
            ) : (
              <button
                type="button"
                onClick={() => setMenuOpen((v) => !v)}
                disabled={(disabled && !isRecording) || isUploading || isTranscribing}
                aria-label="Opções de anexo"
                aria-expanded={menuOpen}
                aria-haspopup="menu"
                className={cn(
                  "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition-all",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary",
                  "text-text-secondary hover:bg-white/10 hover:text-foreground",
                  (isUploading || isTranscribing) && "cursor-not-allowed opacity-50",
                )}
              >
                {isUploading ? (
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-[#2585F4] border-t-transparent" />
                ) : (
                  <AddRounded fontSize="small" aria-hidden="true" />
                )}
              </button>
            )}

            {/* Dropdown menu */}
            {menuOpen && !isRecording && (
              <div
                role="menu"
                className="absolute bottom-12 left-0 z-20 flex flex-col gap-1 rounded-xl border border-[#1B2233] bg-[#111c30] p-1.5 shadow-lg min-w-[160px]"
              >
                {onVoiceRecord && (
                  <button
                    type="button"
                    role="menuitem"
                    onClick={handleAudioOption}
                    className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm text-white/80 hover:bg-white/08 transition-colors text-left"
                  >
                    <MicNoneRounded fontSize="small" aria-hidden="true" />
                    Áudio
                  </button>
                )}
                {onFileAttach && (
                  <button
                    type="button"
                    role="menuitem"
                    onClick={handleFileOption}
                    className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm text-white/80 hover:bg-white/08 transition-colors text-left"
                  >
                    <AttachFileRounded fontSize="small" aria-hidden="true" />
                    Arquivo
                  </button>
                )}
              </div>
            )}
          </div>
        )}

        <label htmlFor="chat-input" className="sr-only">
          Mensagem de chat
        </label>
        <textarea
          ref={textareaRef}
          id="chat-input"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={isTranscribing ? "Transcrevendo áudio..." : placeholder}
          disabled={disabled || isRecording || isTranscribing}
          rows={1}
          className={cn(
            "min-h-10 flex-1 resize-none bg-transparent py-2 text-sm text-foreground placeholder:text-text-muted",
            "focus:outline-none",
            "disabled:cursor-not-allowed disabled:opacity-50",
          )}
          style={{ maxHeight: `${maxHeight}px` }}
          aria-label="Campo de mensagem"
        />

        <button
          type="button"
          onClick={handleSend}
          disabled={!value.trim() || disabled || isRecording || isTranscribing}
          aria-label="Enviar mensagem"
          className={cn(
            "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary text-primary-foreground transition-all",
            "hover:bg-primary/90",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-surface",
            "disabled:cursor-not-allowed disabled:opacity-50",
          )}
        >
          <SendRounded fontSize="small" aria-hidden="true" />
        </button>
      </div>
    </>
  );
}
