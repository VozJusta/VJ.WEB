import { apiFetch } from '@/lib/api-client';

export interface LawyerItem {
  id: string;
  full_name: string;
  specialization: string;
  avatar_image: string;
  rating: number;
}

export interface LawyerDetail extends LawyerItem {
  oab_number: string;
  oab_state: string;
  bio: string;
}

interface Pagination {
  page: number;
  pageSize: number;
  totalItems: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

export interface LawyersListResponse {
  data: LawyerItem[];
  pagination: Pagination;
}

export const lawyersService = {
  async getList(page = 1, pageSize = 10): Promise<LawyersListResponse> {
    const response = await apiFetch(`/citizen/lawyers?page=${page}&pageSize=${pageSize}`);
    if (!response.ok) throw new Error('Erro ao buscar advogados');
    return response.json();
  },

  async getById(lawyerId: string): Promise<LawyerDetail> {
    const response = await apiFetch(`/citizen/lawyers/${lawyerId}`);
    if (!response.ok) throw new Error('Advogado não encontrado');
    return response.json();
  },

  async sendRequest(caseId: string, lawyerId: string): Promise<void> {
    const response = await apiFetch(`/case/${caseId}/requests/${lawyerId}`, {
      method: 'POST',
    });
    if (!response.ok) {
      const err = await response.json().catch(() => ({}));
      const message = (err as Record<string, string>).message || 'Erro ao enviar solicitação';
      if (response.status === 409) {
        throw new Error(`409: ${message}`);
      }
      throw new Error(message);
    }
  },
};
