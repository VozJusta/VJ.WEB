"use client";

import { useEffect, useRef } from "react";
import { MicNoneRounded, SendRounded, StopRounded } from "@mui/icons-material";
import { cn } from "@/lib/utils";
import type { ChatInputProps } from "./chat-input.types";

export function ChatInput({
  value,
  onChange,
  onSend,
  onVoiceRecord,
  placeholder = "Digite sua resposta...",
  disabled = false,
  maxHeight = 200,
  isRecording = false,
  isTranscribing = false,
}: ChatInputProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    textarea.style.height = "auto";
    const newHeight = Math.min(textarea.scrollHeight, maxHeight);
    textarea.style.height = `${newHeight}px`;
  }, [value, maxHeight]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (value.trim() && !disabled) {
        onSend();
      }
    }
  };

  const handleSend = () => {
    if (value.trim() && !disabled) {
      onSend();
    }
  };

  return (
    <div
      className={cn(
        "sticky bottom-0 border-t border-(--border-subtle) bg-surface/95 backdrop-blur-sm",
        "px-6 py-4",
      )}
    >
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

      <div
        className={cn(
          "flex items-end gap-3 rounded-2xl border bg-surface-elevated p-3 transition-all",
          isRecording
            ? "border-red-500/50 bg-red-500/5"
            : "border-(--border-subtle) focus-within:border-(--border-default) focus-within:bg-surface",
        )}
      >
        {onVoiceRecord && (
          <button
            type="button"
            onClick={onVoiceRecord}
            disabled={disabled && !isRecording}
            aria-label={isRecording ? "Parar gravação" : "Gravar mensagem de voz"}
            className={cn(
              "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition-all",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary",
              isRecording
                ? "bg-red-500/20 text-red-400 hover:bg-red-500/30"
                : "text-text-secondary hover:bg-white/10 hover:text-foreground",
              isTranscribing && "cursor-not-allowed opacity-50",
            )}
          >
            {isRecording
              ? <StopRounded fontSize="small" aria-hidden="true" />
              : <MicNoneRounded fontSize="small" aria-hidden="true" />
            }
          </button>
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
    </div>
  );
}
