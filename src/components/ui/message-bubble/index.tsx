"use client";

import { formatDistanceToNow } from "date-fns/formatDistanceToNow";
import { ptBR } from "date-fns/locale/pt-BR";
import { AutoAwesomeRounded } from "@mui/icons-material";
import { cn } from "@/lib/utils";
import type { MessageBubbleProps } from "./message-bubble.types";

export function MessageBubble({
  role,
  content,
  timestamp,
  quickActions,
  onQuickAction,
}: MessageBubbleProps) {
  const isAssistant = role === "assistant";
  
  const timeAgo = formatDistanceToNow(new Date(timestamp), {
    addSuffix: false,
    locale: ptBR,
  });

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
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/20"
          aria-label="Avatar Voz Justa AI"
        >
          <AutoAwesomeRounded
            fontSize="small"
            className="text-primary"
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
