'use client';

import { useState, useEffect } from 'react';
import { lawyersService, LawyerDetail } from '@/services/lawyers.service';

export function useLawyerProfile(lawyerId: string) {
  const [lawyer, setLawyer] = useState<LawyerDetail | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!lawyerId) return;
    setIsLoading(true);
    setError(null);
    lawyersService
      .getById(lawyerId)
      .then(setLawyer)
      .catch((err) => setError(err instanceof Error ? err.message : 'Advogado não encontrado'))
      .finally(() => setIsLoading(false));
  }, [lawyerId]);

  return { lawyer, isLoading, error };
}
