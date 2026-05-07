'use client';

import { useState, useEffect, useCallback } from 'react';
import {
  lawyerRequestsService,
  LawyerRequestItem,
  RequestStatus,
} from '@/services/lawyer-requests.service';

export function useLawyerRequests(initialStatus?: RequestStatus) {
  const [requests, setRequests] = useState<LawyerRequestItem[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState<RequestStatus | undefined>(initialStatus);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchRequests = useCallback(
    async (p: number, status?: RequestStatus) => {
      setIsLoading(true);
      setError(null);
      try {
        const data = await lawyerRequestsService.getRequests(status, p, 10);
        setRequests(data.data ?? []);
        setTotal(data.pagination?.totalItems ?? 0);
        setPage(data.pagination?.page ?? p);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erro ao buscar solicitações');
      } finally {
        setIsLoading(false);
      }
    },
    [],
  );

  useEffect(() => {
    fetchRequests(1, statusFilter);
  }, [fetchRequests, statusFilter]);

  const accept = useCallback(async (requestId: string) => {
    await lawyerRequestsService.accept(requestId);
    setRequests((prev) =>
      prev.map((r) => (r.id === requestId ? { ...r, statusCase: 'Accepted' as RequestStatus } : r)),
    );
  }, []);

  const reject = useCallback(async (requestId: string) => {
    await lawyerRequestsService.reject(requestId);
    setRequests((prev) =>
      prev.map((r) => (r.id === requestId ? { ...r, statusCase: 'Refused' as RequestStatus } : r)),
    );
  }, []);

  return {
    requests,
    total,
    page,
    statusFilter,
    setStatusFilter,
    isLoading,
    error,
    fetchRequests,
    accept,
    reject,
  };
}
