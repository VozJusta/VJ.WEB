'use client';

import { useEffect, useRef } from 'react';
import { io } from 'socket.io-client';
import { notificationsService } from '@/services/notifications.service';
import { authStorage } from '@/lib/auth';
import { useNotificationsStore } from '@/store/notifications.store';
import type { ApiNotification } from '@/types/notification.types';

export function NotificationsInitializer() {
  const setUnreadCount = useNotificationsStore((s) => s.setUnreadCount);
  const initialized = useRef(false);

  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;

    notificationsService
      .getAll(1, 50)
      .then((data) => {
        const count = (data.data ?? []).filter((n: ApiNotification) => !n.is_read).length;
        setUnreadCount(count);
      })
      .catch(() => {});
  }, [setUnreadCount]);

  useEffect(() => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    const token = authStorage.getAccessToken();
    if (!apiUrl || !token) return;

    const socket = io(`${apiUrl}/notifications`, {
      transports: ['websocket'],
      auth: { token },
    });

    const handleNew = () => {
      useNotificationsStore.setState((s) => ({ unreadCount: s.unreadCount + 1 }));
    };

    socket.on('notification', handleNew);
    socket.on('notifications:new', handleNew);
    socket.on('connect_error', () => {});

    return () => {
      socket.disconnect();
    };
  }, []);

  return null;
}
