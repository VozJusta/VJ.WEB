'use client';

import { useState, useEffect, useCallback } from 'react';
import { dashboardService, ReportCard } from '@/services/dashboard.service';

export function useDashboardCitizen() {
  const [reports, setReports] = useState<ReportCard[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchReports = useCallback(async (p: number) => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await dashboardService.getCitizenReports(p, 10);
      const raw = data as unknown;
      const list: ReportCard[] =
        Array.isArray(raw)
          ? raw
          : Array.isArray((raw as { data?: ReportCard[] }).data)
            ? (raw as { data: ReportCard[] }).data
            : Array.isArray((raw as { reports?: ReportCard[] }).reports)
              ? (raw as { reports: ReportCard[] }).reports
              : Array.isArray((raw as { items?: ReportCard[] }).items)
                ? (raw as { items: ReportCard[] }).items
                : [];
      const envelope = raw as Partial<import('@/services/dashboard.service').GetReportsResponse>;
      setReports(list);
      setTotal(envelope.total ?? list.length);
      setPage(envelope.page ?? p);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao carregar relatórios');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchReports(1);
  }, [fetchReports]);

  return { reports, total, page, isLoading, error, fetchReports };
}
