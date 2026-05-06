import { apiFetch } from '@/lib/api-client';

export interface LawyerItem {
  id: string;
  full_name: string;
  oab: string;
  uf: string;
  specialty: string;
  email: string;
  phone?: string;
  avatar?: string;
  rating?: number;
  totalReviews?: number;
  isOnline?: boolean;
  yearsOfExperience?: number;
  description?: string;
  tags?: string[];
}

export interface LawyersListResponse {
  data: LawyerItem[];
  total: number;
  page: number;
  pageSize: number;
}

export interface LawyerDetailsResponse extends LawyerItem {
  cases?: number;
  successRate?: number;
}

export interface SendRequestBody {
  lawyerId: string;
  message: string;
  reportId?: string;
}

export const lawyersService = {
  async getList(page = 1, pageSize = 10): Promise<LawyersListResponse> {
    const response = await apiFetch(`/lawyers?page=${page}&pageSize=${pageSize}`);
    if (!response.ok) throw new Error('Erro ao buscar advogados');
    return response.json();
  },

  async getById(lawyerId: string): Promise<LawyerDetailsResponse> {
    const response = await apiFetch(`/lawyers/${lawyerId}`);
    if (!response.ok) throw new Error('Advogado não encontrado');
    return response.json();
  },

  async sendRequest(body: SendRequestBody): Promise<void> {
    const response = await apiFetch('/citizens/requests', {
      method: 'POST',
      body: JSON.stringify(body),
    });
    if (!response.ok) {
      const err = await response.json().catch(() => ({}));
      throw new Error(err.message || 'Erro ao enviar solicitação');
    }
  },
};
