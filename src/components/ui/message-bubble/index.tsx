"use client";

import { AutoAwesomeRounded, PictureAsPdfRounded, ImageRounded } from "@mui/icons-material";
import { cn } from "@/lib/utils";
import type { MessageBubbleProps } from "./message-bubble.types";

export function MessageBubble({
  role,
  content,
  timestamp,
  attachment,
  quickActions,
  onQuickAction,
}: MessageBubbleProps) {
  const isAssistant = role === "assistant";
  
  const formattedTime = `Hoje, ${new Date(timestamp).toLocaleTimeString("pt-BR", {
    hour: "2-digit",
    minute: "2-digit",
  })}`;

  return (
    <article
      className={cn(
        "flex gap-3",
        isAssistant ? "flex-row" : "flex-row-reverse",
      )}
      aria-label={`Mensagem de ${isAssistant ? "Voz Justa AI" : "você"}`}
    >
      {isAssistant && (
        <figure
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/20"
          aria-label="Avatar Voz Justa AI"
        >
          <AutoAwesomeRounded
            className="text-primary"
            sx={{ fontSize: 24 }}
            aria-hidden="true"
          />
        </figure>
      )}

      <div
        className={cn(
          "flex min-w-0 max-w-3xl flex-col gap-2",
          isAssistant ? "items-start" : "items-end",
        )}
      >
        <header className="flex items-center gap-2">
          <span
            className={cn(
              "text-xs font-semibold uppercase tracking-widest",
              isAssistant ? "text-primary" : "text-text-muted",
            )}
          >
            {isAssistant ? "Voz Justa AI" : "Você"}
          </span>
          <time
            dateTime={new Date(timestamp).toISOString()}
            className="text-xs text-text-muted"
          >
            {formattedTime}
          </time>
        </header>

        <div
          className={cn(
            "rounded-2xl px-4 py-3",
            isAssistant
              ? "bg-surface-elevated text-foreground"
              : "bg-primary text-primary-foreground",
          )}
        >
          {attachment && (
            <div className="mb-3 flex items-center gap-2 rounded-xl border border-white/20 bg-white/10 px-3 py-2">
              {attachment.type === 'pdf' ? (
                <PictureAsPdfRounded sx={{ fontSize: 18 }} aria-hidden="true" className="shrink-0 opacity-80" />
              ) : (attachment.previewUrl ?? attachment.url) ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={attachment.previewUrl ?? attachment.url}
                  alt={attachment.name}
                  className="h-8 w-8 shrink-0 rounded-md object-cover"
                />
              ) : (
                <ImageRounded sx={{ fontSize: 18 }} aria-hidden="true" className="shrink-0 opacity-80" />
              )}
              <span className="truncate text-xs font-medium opacity-90">{attachment.name}</span>
            </div>
          )}
          <p className="text-sm leading-relaxed whitespace-pre-wrap">
            {content}
          </p>
        </div>

        {quickActions && quickActions.length > 0 && (
          <nav
            className="flex flex-wrap gap-2"
            aria-label="Ações rápidas sugeridas"
          >
            {quickActions.map((action) => (
              <button
                key={action.id}
                type="button"
                onClick={() => onQuickAction?.(action)}
                className={cn(
                  "rounded-xl border border-(--border-subtle) bg-white/5 px-4 py-2 text-sm font-medium text-foreground transition-all",
                  "hover:border-(--border-default) hover:bg-white/10",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary",
                )}
              >
                {action.label}
              </button>
            ))}
          </nav>
        )}
      </div>
    </article>
  );
}
