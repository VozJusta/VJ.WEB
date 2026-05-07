'use client';

import { useState, useEffect } from 'react';
import { dashboardService, DetailsReport } from '@/services/dashboard.service';

export function useLawyerCaseDetail(caseId: string) {
  const [report, setReport] = useState<DetailsReport | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!caseId) return;
    setIsLoading(true);
    setError(null);
    dashboardService
      .getLawyerCaseDetail(caseId)
      .then(setReport)
      .catch((err) => setError(err instanceof Error ? err.message : 'Caso não encontrado'))
      .finally(() => setIsLoading(false));
  }, [caseId]);

  return { report, isLoading, error };
}
