import { apiFetch } from '@/lib/api-client';
import type {
  ApiNotification,
  NotificationsResponse,
  DeleteAllResponse,
  MarkReadResponse,
} from '@/types/notification.types';

export const notificationsService = {
  async getAll(page = 1, pageSize = 20): Promise<NotificationsResponse> {
    const response = await apiFetch(
      `/notifications?page=${page}&pageSize=${pageSize}`,
    );
    if (!response.ok) throw new Error('Erro ao buscar notificações');
    return response.json();
  },

  async markAsRead(notificationId: string): Promise<MarkReadResponse> {
    const response = await apiFetch(`/notifications/${notificationId}/read`, {
      method: 'PATCH',
    });
    if (!response.ok) throw new Error('Erro ao marcar notificação como lida');
    return response.json();
  },

  async markAllAsRead(): Promise<MarkReadResponse> {
    const response = await apiFetch('/notifications/read-all', {
      method: 'PATCH',
    });
    if (!response.ok) throw new Error('Erro ao marcar notificações como lidas');
    return response.json();
  },

  async deleteOne(notificationId: string): Promise<DeleteAllResponse> {
    const response = await apiFetch(`/notifications/${notificationId}`, {
      method: 'DELETE',
    });
    if (!response.ok) throw new Error('Erro ao remover notificação');
    return response.json();
  },

  async deleteAll(): Promise<DeleteAllResponse> {
    const response = await apiFetch('/notifications', {
      method: 'DELETE',
    });
    if (!response.ok) throw new Error('Erro ao remover notificações');
    return response.json();
  },
};
