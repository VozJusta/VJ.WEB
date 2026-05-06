'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { io, Socket } from 'socket.io-client';
import { notificationsService } from '@/services/notifications.service';
import { authStorage } from '@/lib/auth';
import type { ApiNotification } from '@/types/notification.types';

export function useNotifications() {
  const [notifications, setNotifications] = useState<ApiNotification[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const socketRef = useRef<Socket | null>(null);

  const fetchAll = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await notificationsService.getAll(1, 50);
      setNotifications(data.data ?? []);
    } catch (err) {
      // 404 means no notifications — treat as empty, not an error
      const msg = err instanceof Error ? err.message : '';
      if (!msg.includes('404') && !msg.includes('não encontrada')) {
        setError(msg || 'Erro ao carregar notificações');
      }
      setNotifications([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAll();
  }, [fetchAll]);

  // WebSocket
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

    socket.on('connect_error', () => {
      // socket connection failure is non-critical — REST data already loaded
    });

    return () => {
      socket.disconnect();
      socketRef.current = null;
    };
  }, []);

  const markAsRead = useCallback(async (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, is_read: true } : n)),
    );
    try {
      await notificationsService.markAsRead(id);
    } catch {
      // revert on failure
      setNotifications((prev) =>
        prev.map((n) => (n.id === id ? { ...n, is_read: false } : n)),
      );
    }
  }, []);

  const markAllAsRead = useCallback(async () => {
    const prev = notifications;
    setNotifications((ns) => ns.map((n) => ({ ...n, is_read: true })));
    try {
      await notificationsService.markAllAsRead();
    } catch {
      setNotifications(prev);
    }
  }, [notifications]);

  const deleteOne = useCallback(async (id: string) => {
    const prev = notifications;
    setNotifications((ns) => ns.filter((n) => n.id !== id));
    try {
      await notificationsService.deleteOne(id);
    } catch {
      setNotifications(prev);
    }
  }, [notifications]);

  const deleteAll = useCallback(async () => {
    const prev = notifications;
    setNotifications([]);
    try {
      await notificationsService.deleteAll();
    } catch {
      setNotifications(prev);
    }
  }, [notifications]);

  const unreadCount = notifications.filter((n) => !n.is_read).length;

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
