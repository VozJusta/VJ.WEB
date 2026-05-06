import { apiFetch } from '@/lib/api-client';

export interface ReportCard {
  id: string;
  title: string;
  status: string;
  created_at: string;
  category?: string;
}

export interface GetReportsResponse {
  data: ReportCard[];
  total: number;
  page: number;
  pageSize: number;
}

export interface DetailsReport {
  id: string;
  title: string;
  description: string;
  status: string;
  created_at: string;
  category: string;
  viability?: string;
}

export interface AnalyticsResponse {
  totalCases: number;
  activeCases: number;
  resolvedCases: number;
  pendingCases: number;
  chartData: Array<{ date: string; value: number }>;
}

export interface OperationalStatsResponse {
  items: Array<{ label: string; value: number; color: string }>;
}

export interface HighRelevanceResponse {
  items: Array<{
    id: string;
    title: string;
    description: string;
    status: string;
    priority: string;
    date: string;
    category: string;
    score: number;
  }>;
}

export const dashboardService = {
  async getCitizenReports(page = 1, pageSize = 10): Promise<GetReportsResponse> {
    const response = await apiFetch(
      `/dashboard/citizens/me/reports?page=${page}&pageSize=${pageSize}`,
    );
    if (!response.ok) throw new Error('Falha ao buscar relatórios');
    return response.json();
  },

  async getReportDetails(reportId: string): Promise<DetailsReport> {
    const response = await apiFetch(`/dashboard/citizens/me/reports/${reportId}`);
    if (!response.ok) throw new Error('Falha ao buscar detalhes do relatório');
    return response.json();
  },

  async downloadReportPdf(reportId: string): Promise<Blob> {
    const response = await apiFetch(`/dashboard/citizens/me/reports/${reportId}/pdf`, {
      headers: { Accept: 'application/pdf' },
    });
    if (!response.ok) throw new Error('Falha ao baixar PDF');
    return response.blob();
  },

  async getLawyerAnalytics(): Promise<AnalyticsResponse> {
    const response = await apiFetch('/dashboard/lawyer/analytics');
    if (!response.ok) throw new Error('Falha ao buscar analytics');
    return response.json();
  },

  async getLawyerOperationalStats(): Promise<OperationalStatsResponse> {
    const response = await apiFetch('/dashboard/lawyer/operational-status');
    if (!response.ok) throw new Error('Falha ao buscar estatísticas');
    return response.json();
  },

  async getLawyerHighRelevance(): Promise<HighRelevanceResponse> {
    const response = await apiFetch('/dashboard/lawyer/high-relevance');
    if (!response.ok) throw new Error('Falha ao buscar casos de alta relevância');
    return response.json();
  },
};
