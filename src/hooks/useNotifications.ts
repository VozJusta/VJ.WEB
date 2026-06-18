'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { io, Socket } from 'socket.io-client';
import { notificationsService } from '@/services/notifications.service';
import { authStorage } from '@/lib/auth';
import { useNotificationsStore } from '@/store/notifications.store';
import type { ApiNotification } from '@/types/notification.types';

function unread(list: ApiNotification[]) {
  return list.filter((n) => !n.is_read).length;
}

export function useNotifications() {
  const [notifications, setNotificationsState] = useState<ApiNotification[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const socketRef = useRef<Socket | null>(null);
  const setUnreadCount = useNotificationsStore((s) => s.setUnreadCount);

  const setNotifications = useCallback(
    (updater: ApiNotification[] | ((prev: ApiNotification[]) => ApiNotification[])) => {
      setNotificationsState((prev) => {
        const next = typeof updater === 'function' ? updater(prev) : updater;
        setUnreadCount(unread(next));
        return next;
      });
    },
    [setUnreadCount],
  );

  const fetchAll = useCallback(async (silent = false) => {
    if (!silent) setIsLoading(true);
    setError(null);
    try {
      const data = await notificationsService.getAll(1, 50);
      setNotifications(data.data ?? []);
    } catch (err) {
      const msg = err instanceof Error ? err.message : '';
      if (!silent && !msg.includes('404') && !msg.includes('não encontrada')) {
        setError(msg || 'Erro ao carregar notificações');
      }
      if (!silent) setNotifications([]);
    } finally {
      if (!silent) setIsLoading(false);
    }
  }, [setNotifications]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchAll();
  }, [fetchAll]);

  useEffect(() => {
    const id = setInterval(() => fetchAll(true), 60_000);
    return () => clearInterval(id);
  }, [fetchAll]);

  useEffect(() => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    const token = authStorage.getAccessToken();
    if (!apiUrl || !token) return;

    const socket = io(`${apiUrl}/notifications`, {
      transports: ['websocket'],
      auth: { token },
    });

    socketRef.current = socket;

    socket.on('notification', (newNotif: ApiNotification) => {
      setNotifications((prev) => [newNotif, ...prev]);
    });

    socket.on('connect_error', () => {});

    return () => {
      socket.disconnect();
      socketRef.current = null;
    };
  }, [setNotifications]);

  const markAsRead = useCallback(async (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, is_read: true } : n)),
    );
    try {
      await notificationsService.markAsRead(id);
    } catch {
      setNotifications((prev) =>
        prev.map((n) => (n.id === id ? { ...n, is_read: false } : n)),
      );
    }
  }, [setNotifications]);

  const markAllAsRead = useCallback(async () => {
    const prev = notifications;
    setNotifications((ns) => ns.map((n) => ({ ...n, is_read: true })));
    try {
      await notificationsService.markAllAsRead();
    } catch {
      setNotifications(prev);
    }
  }, [notifications, setNotifications]);

  const deleteOne = useCallback(async (id: string) => {
    const prev = notifications;
    setNotifications((ns) => ns.filter((n) => n.id !== id));
    try {
      await notificationsService.deleteOne(id);
    } catch {
      setNotifications(prev);
    }
  }, [notifications, setNotifications]);

  const deleteAll = useCallback(async () => {
    const prev = notifications;
    setNotifications([]);
    try {
      await notificationsService.deleteAll();
    } catch {
      setNotifications(prev);
    }
  }, [notifications, setNotifications]);

  const unreadCount = unread(notifications);

  return {
    notifications,
    isLoading,
    error,
    unreadCount,
    markAsRead,
    markAllAsRead,
    deleteOne,
    deleteAll,
  };
}
