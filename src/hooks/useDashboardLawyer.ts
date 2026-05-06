'use client';

import { useState, useEffect } from 'react';
import { dashboardService } from '@/services/dashboard.service';
import type {
  AnalyticsResponse,
  OperationalStatsResponse,
  HighRelevanceItem,
} from '@/services/dashboard.service';

export function useDashboardLawyer() {
  const [analytics, setAnalytics] = useState<AnalyticsResponse | null>(null);
  const [operationalStats, setOperationalStats] = useState<OperationalStatsResponse | null>(null);
  const [highRelevance, setHighRelevance] = useState<HighRelevanceItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      setIsLoading(true);
      setError(null);
      try {
        const [analyticsData, statsData, highData] = await Promise.allSettled([
          dashboardService.getLawyerAnalytics(),
          dashboardService.getLawyerOperationalStats(),
          dashboardService.getLawyerHighRelevance(),
        ]);

        if (analyticsData.status === 'fulfilled') setAnalytics(analyticsData.value);
        if (statsData.status === 'fulfilled') setOperationalStats(statsData.value);
        if (highData.status === 'fulfilled') setHighRelevance(highData.value);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erro ao carregar dashboard');
      } finally {
        setIsLoading(false);
      }
    }

    load();
  }, []);

  return { analytics, operationalStats, highRelevance, isLoading, error };
}
