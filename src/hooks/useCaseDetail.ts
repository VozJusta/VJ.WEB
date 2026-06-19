'use client';

import { useState, useEffect } from 'react';
import { dashboardService, DetailsReport } from '@/services/dashboard.service';
import { useCaseMapStore } from '@/store/case-map.store';

export function useCaseDetail(reportId: string) {
  const [report, setReport] = useState<DetailsReport | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const caseMapStore = useCaseMapStore();

  useEffect(() => {
    if (!reportId) return;
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsLoading(true);
    setError(null);
    dashboardService
      .getReportDetails(reportId)
      .then((r) => {
        setReport(r);
        if (r.caseId) caseMapStore.set(reportId, r.caseId);
      })
      .catch((err) => setError(err instanceof Error ? err.message : 'Relatório não encontrado'))
      .finally(() => setIsLoading(false));
  }, [reportId, caseMapStore]);

  return { report, isLoading, error };
}
