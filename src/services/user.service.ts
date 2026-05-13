import { apiFetch } from '@/lib/api-client';
import { authStorage } from '@/lib/auth';

export interface MeResponse {
  id: string;
  full_name: string;
  session_id: string;
  subscription: {
    plan: { type: 'FREE' | 'PREMIUM' | 'MEDIUM' | null } | null;
  } | null;
}

export const userService = {
  async getMe(): Promise<MeResponse> {
    const response = await apiFetch('/auth/me', {
      method: 'GET',
      headers: { Accept: 'application/json' },
    });
    if (!response.ok) throw new Error('Falha ao obter dados do usuário');
    return response.json();
  },

  async logout(): Promise<void> {
    try {
      await apiFetch('/auth/logout', { method: 'POST' });
    } finally {
      authStorage.logout();
    }
  },

  async deleteAccount(password: string): Promise<void> {
    const response = await apiFetch('/auth/terminate-account', {
      method: 'DELETE',
      body: JSON.stringify({ password }),
    });
    if (!response.ok) throw new Error('Falha ao excluir conta');
    authStorage.logout();
  },

  async changePassword(currentPassword: string, newPassword: string): Promise<void> {
    const response = await apiFetch('/auth/change-password', {
      method: 'PATCH',
      body: JSON.stringify({ currentPassword, newPassword }),
    });
    if (!response.ok) {
      const data = await response.json().catch(() => ({}));
      throw new Error((data as Record<string, string>).message || 'Falha ao alterar senha');
    }
  },
};
