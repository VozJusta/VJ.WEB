"use client";

import Link from "next/link";
import { formatDistanceToNow } from "date-fns/formatDistanceToNow";
import { ptBR } from "date-fns/locale/pt-BR";
import {
  InfoOutlined,
  CheckCircleOutline,
  WarningAmberOutlined,
  GavelOutlined,
} from "@mui/icons-material";
import { cn } from "@/src/lib/utils";
import type { Notification } from "@/src/types/notification.types";

interface NotificationCardProps {
  notification: Notification;
  onMarkAsRead?: (id: string) => void;
}

const iconMap = {
  info: InfoOutlined,
  success: CheckCircleOutline,
  warning: WarningAmberOutlined,
  "case-update": GavelOutlined,
};

const colorMap = {
  info: {
    icon: "text-blue-500",
    bg: "bg-blue-500/10",
    border: "border-blue-500/20",
  },
  success: {
    icon: "text-green-500",
    bg: "bg-green-500/10",
    border: "border-green-500/20",
  },
  warning: {
    icon: "text-amber-500",
    bg: "bg-amber-500/10",
    border: "border-amber-500/20",
  },
  "case-update": {
    icon: "text-primary",
    bg: "bg-primary/10",
    border: "border-primary/20",
  },
};

export function NotificationCard({
  notification,
  onMarkAsRead,
}: NotificationCardProps) {
  const Icon = iconMap[notification.type];
  const colors = colorMap[notification.type];

  const timeAgo = formatDistanceToNow(new Date(notification.timestamp), {
    addSuffix: true,
    locale: ptBR,
  });

  const handleClick = () => {
    if (!notification.read && onMarkAsRead) {
      onMarkAsRead(notification.id);
    }
  };

  const content = (
    <>
      <div
        className={cn(
          "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border",
          colors.bg,
          colors.border,
        )}
        aria-hidden="true"
      >
        <Icon className={cn("text-xl", colors.icon)} />
      </div>

      <div className="flex min-w-0 flex-1 flex-col gap-1">
        <header className="flex items-start justify-between gap-3">
          <h3 className="text-sm font-semibold leading-snug text-foreground">
            {notification.title}
          </h3>
          {!notification.read && (
            <span
              className="mt-1 h-2 w-2 shrink-0 rounded-full bg-primary"
              aria-label="Não lida"
            />
          )}
        </header>

        <p className="text-sm leading-relaxed text-text-secondary">
          {notification.message}
        </p>

        <footer className="mt-1 flex items-center gap-3">
          <time
            dateTime={new Date(notification.timestamp).toISOString()}
            className="text-xs text-text-muted"
          >
            {timeAgo}
          </time>
          {notification.actionLabel && notification.actionUrl && (
            <span
              className="text-xs font-semibold text-primary transition-colors hover:text-primary/80"
              aria-label={notification.actionLabel}
            >
              {notification.actionLabel}
            </span>
          )}
        </footer>
      </div>
    </>
  );

  if (notification.actionUrl) {
    return (
      <Link href={notification.actionUrl} onClick={handleClick}>
        <article
          className={cn(
            "group flex gap-3 rounded-xl border border-(--border-subtle) bg-white/5 p-4 transition-all",
            "hover:border-(--border-default) hover:bg-white/8",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary",
            !notification.read && "bg-primary/5",
          )}
          aria-label={`Notificação: ${notification.title}`}
        >
          {content}
        </article>
      </Link>
    );
  }

  return (
    <article
      className={cn(
        "flex gap-3 rounded-xl border border-(--border-subtle) bg-white/5 p-4",
        !notification.read && "bg-primary/5",
      )}
      aria-label={`Notificação: ${notification.title}`}
      onClick={handleClick}
    >
      {content}
    </article>
  );
}
