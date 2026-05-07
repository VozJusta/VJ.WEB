'use client';

import { useState, useCallback } from 'react';
import { dashboardService } from '@/services/dashboard.service';

export function useReportDownload() {
  const [isDownloading, setIsDownloading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const downloadPdf = useCallback(async (reportId: string, filename = 'relatorio-voz-justa.pdf') => {
    if (!reportId) return;
    setIsDownloading(true);
    setError(null);
    try {
      const blob = await dashboardService.downloadReportPdf(reportId);
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao baixar relatório');
    } finally {
      setIsDownloading(false);
    }
  }, []);

  return { downloadPdf, isDownloading, error };
}
