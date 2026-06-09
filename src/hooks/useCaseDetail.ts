'use client';

import { useState, useEffect } from 'react';
import { dashboardService, DetailsReport } from '@/services/dashboard.service';

export function useCaseDetail(reportId: string) {
  const [report, setReport] = useState<DetailsReport | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!reportId) return;
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsLoading(true);
    setError(null);
    dashboardService
      .getReportDetails(reportId)
      .then(setReport)
      .catch((err) => setError(err instanceof Error ? err.message : 'Relatório não encontrado'))
      .finally(() => setIsLoading(false));
  }, [reportId]);

  return { report, isLoading, error };
}
