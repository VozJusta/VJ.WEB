"use client";

import { DeleteOutline, DoneAllRounded } from "@mui/icons-material";
import { EmptyState } from "@/components/ui/empty-state";
import { NotificationCard } from "@/components/ui/notification-card";
import { useNotifications } from "@/hooks/useNotifications";
import { cn } from "@/lib/utils";

export function NotificationsList() {
  const {
    notifications,
    isLoading,
    unreadCount,
    markAsRead,
    markAllAsRead,
    deleteOne,
    deleteAll,
  } = useNotifications();

  if (isLoading) {
    return (
      <div className="flex flex-col gap-3">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-20 animate-pulse rounded-xl bg-surface-elevated" />
        ))}
      </div>
    );
  }

  const NotificationSvg = (
    <svg viewBox="0 0 200 200" className="h-40 w-40 opacity-70" aria-hidden="true" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="100" cy="100" r="80" fill="#1B2233" />
      <path d="M100 50c-5.5 0-10 4.5-10 10v5.5C75.5 69.5 65 81.5 65 96v25l-10 10v5h90v-5l-10-10V96c0-14.5-10.5-26.5-25-30.5V60c0-5.5-4.5-10-10-10z" fill="#2585F4" opacity="0.6"/>
      <path d="M90 146c0 5.5 4.5 10 10 10s10-4.5 10-10H90z" fill="#2585F4" opacity="0.9"/>
    </svg>
  );

  if (notifications.length === 0) {
    return (
      <EmptyState
        illustrationSvg={NotificationSvg}
        title="Tudo limpo por aqui!"
        description="Você não tem nenhuma notificação nova no momento. Avisaremos assim que algo importante acontecer."
      />
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <header className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Notificações</h1>
          {unreadCount > 0 && (
            <p className="mt-1 text-sm text-text-secondary">
              Você tem{" "}
              <strong className="font-semibold text-primary">{unreadCount}</strong>{" "}
              {unreadCount === 1 ? "notificação não lida" : "notificações não lidas"}
            </p>
          )}
        </div>

        <div className="flex items-center gap-2">
          {unreadCount > 0 && (
            <button
              type="button"
              onClick={markAllAsRead}
              className={cn(
                "flex items-center gap-2 rounded-xl border border-(--border-subtle) bg-white/5 px-4 py-2.5 text-sm font-semibold transition-all",
                "hover:border-(--border-default) hover:bg-white/10",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary",
              )}
              aria-label="Marcar todas como lidas"
            >
              <DoneAllRounded fontSize="small" aria-hidden="true" />
              Marcar todas como lidas
            </button>
          )}

          <button
            type="button"
            onClick={deleteAll}
            className={cn(
              "flex items-center gap-2 rounded-xl border border-(--border-subtle) bg-white/5 px-4 py-2.5 text-sm font-semibold transition-all",
              "hover:border-red-400/30 hover:bg-red-400/5 hover:text-red-400",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary",
            )}
            aria-label="Limpar todas as notificações"
          >
            <DeleteOutline fontSize="small" aria-hidden="true" />
            Limpar tudo
          </button>
        </div>
      </header>

      <section className="flex flex-col gap-3" aria-label="Lista de notificações">
        {notifications.map((notification) => (
          <NotificationCard
            key={notification.id}
            notification={notification}
            onMarkAsRead={markAsRead}
            onDelete={deleteOne}
          />
        ))}
      </section>
    </div>
  );
}
