import { apiFetch } from '@/lib/api-client';

export type RequestStatus = 'Pending' | 'Accepted' | 'Refused';

export interface LawyerRequestItem {
  id: string;
  title: string;
  clientName: string;
  category_detected: string;
  statusCase: RequestStatus;
  caseId: string;
  reportId: string;
  created_at: string;
}

interface Pagination {
  page: number;
  pageSize: number;
  totalItems: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

export interface LawyerRequestsResponse {
  data: LawyerRequestItem[];
  pagination: Pagination;
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
