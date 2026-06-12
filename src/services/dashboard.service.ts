import { apiFetch } from '@/lib/api-client';

// Citizens

export interface ReportCard {
  id: string;
  caseId?: string;
  title?: string;
  category_detected: string;
  status: string;
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

export interface GetReportsResponse {
  role: string;
  user: { data: ReportCard[] };
  pagination: Pagination;
}

export interface DetailsReport {
  id: string;
  caseId?: string;
  title?: string;
  transcription: string;
  simplified_explanation: string;
  legal_analysis: string;
  category_detected: string;
  status: string;
  evidence: string[];
  lawyer?: {
    full_name: string;
    bio: string;
    phone: string;
    email: string;
  };
  citizen?: {
    full_name: string;
    phone: string;
    email: string;
  };
}

// Lawyer dashboard

export interface AnalyticsResponse {
  data: Array<{ date: string; value: number }>;
}

export interface OperationalStatsResponse {
  pending: number;
  refused: number;
  accepted: number;
}

export interface HighRelevanceItem {
  id: string;
  title: string;
  status: string;
  confidence_score: number;
  category_detected: string;
  caseId?: string;
  reportId?: string;
}

export const dashboardService = {
  async getCitizenReports(page = 1, pageSize = 10): Promise<GetReportsResponse> {
    const response = await apiFetch(
      `/dashboard/citizens/me/reports?page=${page}&pageSize=${pageSize}`,
    );
    if (!response.ok) throw new Error('Falha ao buscar relatórios');
    const json = await response.json();
    if (Array.isArray(json?.user?.data)) {
      json.user.data = json.user.data.map((r: ReportCard & { case_id?: string }) => {
        if (!r.caseId && r.case_id) r.caseId = r.case_id;
        return r;
      });
    }
    return json;
  },

  async getReportDetails(reportId: string): Promise<DetailsReport> {
    const response = await apiFetch(`/dashboard/citizens/me/reports/${reportId}`);
    if (!response.ok) throw new Error('Falha ao buscar detalhes do relatório');
    const json = await response.json();
    const report = json?.user?.report ?? json;
    // Normalize snake_case field from backend
    if (!report.caseId && report.case_id) {
      report.caseId = report.case_id;
    }
    return report;
  },

  async downloadReportPdf(reportId: string): Promise<Blob> {
    const response = await apiFetch(`/report/pdf/${reportId}`, {
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

  async getLawyerHighRelevance(): Promise<HighRelevanceItem[]> {
    const response = await apiFetch('/dashboard/lawyer/high-relevance');
    if (!response.ok) throw new Error('Falha ao buscar casos de alta relevância');
    return response.json();
  },

  async getLawyerCaseDetail(caseId: string): Promise<DetailsReport> {
    const response = await apiFetch(`/lawyer/cases/${caseId}`);
    if (!response.ok) throw new Error('Caso não encontrado');
    const json = await response.json();
    return json?.user?.report ?? json;
  },
};
