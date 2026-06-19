'use client';

import { useState, useEffect, useCallback } from 'react';
import { dashboardService, ReportCard } from '@/services/dashboard.service';
import { useCaseMapStore } from '@/store/case-map.store';

export function useDashboardCitizen() {
  const [reports, setReports] = useState<ReportCard[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const caseMapStore = useCaseMapStore();

  const fetchReports = useCallback(async (p: number) => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await dashboardService.getCitizenReports(p, 10);
      const items = data.user?.data ?? [];
      setReports(items);
      setTotal(data.pagination?.totalItems ?? 0);
      setPage(data.pagination?.page ?? p);
      items.forEach((r) => {
        if (r.id && r.caseId) caseMapStore.set(r.id, r.caseId);
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao carregar relatórios');
    } finally {
      setIsLoading(false);
    }
  }, [caseMapStore]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchReports(1);
  }, [fetchReports]);

  return { reports, total, page, isLoading, error, fetchReports };
}
