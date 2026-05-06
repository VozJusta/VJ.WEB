import { apiFetch } from '@/lib/api-client';

export type RequestStatus = 'Pending' | 'Accepted' | 'Rejected' | 'Concluded';

export interface LawyerRequestItem {
  id: string;
  citizen: {
    id: string;
    full_name: string;
    email: string;
    phone?: string;
  };
  message: string;
  status: RequestStatus;
  created_at: string;
  report?: {
    id: string;
    title: string;
    category: string;
  };
}

export interface LawyerRequestsResponse {
  data: LawyerRequestItem[];
  total: number;
  page: number;
  pageSize: number;
}

export const lawyerRequestsService = {
  async getRequests(
    status?: RequestStatus,
    page = 1,
    pageSize = 10,
  ): Promise<LawyerRequestsResponse> {
    const params = new URLSearchParams({ page: String(page), pageSize: String(pageSize) });
    if (status) params.set('status', status);

    const response = await apiFetch(`/lawyer/requests?${params}`);
    if (!response.ok) throw new Error('Erro ao buscar solicitações');
    return response.json();
  },

  async getById(requestId: string): Promise<LawyerRequestItem> {
    const response = await apiFetch(`/lawyer/requests/${requestId}`);
    if (!response.ok) throw new Error('Solicitação não encontrada');
    return response.json();
  },

  async accept(requestId: string): Promise<void> {
    const response = await apiFetch(`/lawyer/requests/${requestId}/accept`, {
      method: 'PATCH',
    });
    if (!response.ok) throw new Error('Erro ao aceitar solicitação');
  },

  async reject(requestId: string): Promise<void> {
    const response = await apiFetch(`/lawyer/requests/${requestId}/reject`, {
      method: 'PATCH',
    });
    if (!response.ok) throw new Error('Erro ao rejeitar solicitação');
  },
};
