'use client';

import { useState, useEffect, useCallback } from 'react';
import { lawyersService, LawyerItem } from '@/services/lawyers.service';

export function useLawyersList() {
  const [lawyers, setLawyers] = useState<LawyerItem[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchLawyers = useCallback(async (p: number) => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await lawyersService.getList(p, 10);
      setLawyers(data.data ?? []);
      setTotal(data.pagination?.totalItems ?? 0);
      setPage(data.pagination?.page ?? p);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao buscar advogados');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchLawyers(1);
  }, [fetchLawyers]);

  return { lawyers, total, page, isLoading, error, fetchLawyers };
}
