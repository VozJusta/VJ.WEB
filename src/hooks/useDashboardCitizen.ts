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
      setReports(data.user?.data ?? []);
      setTotal(data.pagination?.totalItems ?? 0);
      setPage(data.pagination?.page ?? p);
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
