"use client";

import { useRouter } from "next/navigation";
import { formatDistanceToNow } from "date-fns/formatDistanceToNow";
import { ptBR } from "date-fns/locale/pt-BR";
import {
  InfoOutlined,
  CheckCircleOutline,
  WarningAmberOutlined,
  GavelOutlined,
  PersonAddAltRounded,
  MessageRounded,
} from "@mui/icons-material";
import { cn } from "@/lib/utils";
import { useAuthStore } from "@/store/auth.store";
import type { ApiNotification } from "@/types/notification.types";

interface NotificationCardProps {
  notification: ApiNotification;
  onMarkAsRead?: (id: string) => void;
  onDelete?: (id: string) => void;
}

type IconKey = "CASE_UPDATED" | "CASE_ACCEPTED" | "CASE_REFUSED" | "NEW_REQUEST" | "MESSAGE" | "default";

const iconMap: Record<IconKey, React.ElementType> = {
  CASE_UPDATED: GavelOutlined,
  CASE_ACCEPTED: CheckCircleOutline,
  CASE_REFUSED: WarningAmberOutlined,
  NEW_REQUEST: PersonAddAltRounded,
  MESSAGE: MessageRounded,
  default: InfoOutlined,
};

const colorMap: Record<IconKey, { icon: string; bg: string; border: string }> = {
  CASE_UPDATED: { icon: "text-primary", bg: "bg-primary/10", border: "border-primary/20" },
  CASE_ACCEPTED: { icon: "text-emerald-500", bg: "bg-emerald-500/10", border: "border-emerald-500/20" },
  CASE_REFUSED: { icon: "text-red-400", bg: "bg-red-400/10", border: "border-red-400/20" },
  NEW_REQUEST: { icon: "text-amber-400", bg: "bg-amber-400/10", border: "border-amber-400/20" },
  MESSAGE: { icon: "text-blue-400", bg: "bg-blue-400/10", border: "border-blue-400/20" },
  default: { icon: "text-white/50", bg: "bg-white/5", border: "border-white/10" },
};

function resolveKey(type: string): IconKey {
  if (type in iconMap) return type as IconKey;
  return "default";
}

const NOTIFICATION_REDIRECT: Partial<Record<IconKey, { lawyer: string; citizen: string }>> = {
  NEW_REQUEST: { lawyer: "/advogado/solicitacoes", citizen: "/dashboard/casos" },
  CASE_ACCEPTED: { lawyer: "/advogado/solicitacoes", citizen: "/dashboard/casos" },
  CASE_REFUSED: { lawyer: "/advogado/solicitacoes", citizen: "/dashboard/casos" },
  CASE_UPDATED: { lawyer: "/advogado/solicitacoes", citizen: "/dashboard/casos" },
  MESSAGE: { lawyer: "/advogado/solicitacoes", citizen: "/dashboard/casos" },
};

export function NotificationCard({ notification, onMarkAsRead, onDelete }: NotificationCardProps) {
  const router = useRouter();
  const key = resolveKey(notification.type);
  const Icon = iconMap[key];
  const colors = colorMap[key];
  const userRole = useAuthStore((s) => s.userRole);

  const timeAgo = formatDistanceToNow(new Date(notification.created_at), {
    addSuffix: true,
    locale: ptBR,
  });

  const handleClick = () => {
    if (!notification.is_read && onMarkAsRead) {
      onMarkAsRead(notification.id);
    }
    const redirectMap = NOTIFICATION_REDIRECT[key];
    if (redirectMap) {
      const url = userRole === "lawyer" ? redirectMap.lawyer : redirectMap.citizen;
      router.push(url);
    }
  };

  return (
    <article
      onClick={handleClick}
      className={cn(
        "group flex gap-3 rounded-xl border border-(--border-subtle) bg-white/5 p-4 transition-all cursor-pointer",
        "hover:border-(--border-default) hover:bg-white/8",
        !notification.is_read && "bg-primary/5 border-primary/15",
      )}
      aria-label={`Notificação: ${notification.title}`}
    >
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
          <div className="flex items-center gap-2 shrink-0">
            {!notification.is_read && (
              <span className="h-2 w-2 rounded-full bg-primary" aria-label="Não lida" />
            )}
            {onDelete && (
              <button
                type="button"
                onClick={(e) => { e.stopPropagation(); onDelete(notification.id); }}
                className="opacity-0 group-hover:opacity-100 text-white/30 hover:text-red-400 transition-all text-xs"
                aria-label="Remover notificação"
              >
                ✕
              </button>
            )}
          </div>
        </header>

        <p className="text-sm leading-relaxed text-text-secondary">
          {notification.body}
        </p>

        <footer className="mt-1">
          <time
            dateTime={notification.created_at}
            className="text-xs text-text-muted"
          >
            {timeAgo}
          </time>
        </footer>
      </div>
    </article>
  );
}
