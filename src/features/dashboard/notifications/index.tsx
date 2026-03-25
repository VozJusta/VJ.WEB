"use client";

import { useState } from "react";
import { DeleteOutline } from "@mui/icons-material";
import { EmptyState } from "@/components/ui/empty-state";
import { cn } from "@/lib/utils";
import type { Notification } from "@/types/notification.types";
import { NotificationCard } from "@/components/ui/notification-card";

interface NotificationsListProps {
  initialNotifications?: Notification[];
}

export function NotificationsList({
  initialNotifications = [],
}: NotificationsListProps) {
  const [notifications, setNotifications] = useState<Notification[]>(
    initialNotifications,
  );

  const hasNotifications = notifications.length > 0;
  const unreadCount = notifications.filter((n) => !n.read).length;

  const handleMarkAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((notification) =>
        notification.id === id
          ? { ...notification, read: true }
          : notification,
      ),
    );
  };

  const handleClearAll = () => {
    setNotifications([]);
  };

  if (!hasNotifications) {
    return (
      <EmptyState
        illustration="/illustrations/notification-illustration.png"
        illustrationAlt="Nenhuma notificação"
        title="Tudo limpo por aqui!"
        description="Você não tem nenhuma notificação nova no momento. Avisaremos assim que algo importante acontecer."
        action={{
          label: "Limpar tudo",
          onClick: handleClearAll,
          disabled: true,
        }}
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
              <strong className="font-semibold text-primary">
                {unreadCount}
              </strong>{" "}
              {unreadCount === 1
                ? "notificação não lida"
                : "notificações não lidas"}
            </p>
          )}
        </div>

        <button
          type="button"
          onClick={handleClearAll}
          className={cn(
            "flex items-center gap-2 rounded-xl border border-(--border-subtle) bg-white/5 px-4 py-2.5 text-sm font-semibold transition-all",
            "hover:border-(--border-default) hover:bg-white/10",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary",
          )}
          aria-label="Limpar todas as notificações"
        >
          <DeleteOutline fontSize="small" aria-hidden="true" />
          Limpar tudo
        </button>
      </header>

      <section
        className="flex flex-col gap-3"
        aria-label="Lista de notificações"
      >
        {notifications.map((notification) => (
          <NotificationCard
            key={notification.id}
            notification={notification}
            onMarkAsRead={handleMarkAsRead}
          />
        ))}
      </section>
    </div>
  );
}
