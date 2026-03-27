'use client';

import { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';

export function GoogleAuthHandler() {
  const searchParams = useSearchParams();
  const { login, isAuthenticated } = useAuth();

  useEffect(() => {
    const authData = searchParams.get('authData');

    if (authData && !isAuthenticated) {
      try {
        const decodedData = JSON.parse(
          atob(authData)
        );
        login(decodedData);
      } catch (error) {
      }
    }
  }, [searchParams, login, isAuthenticated]);

  return null;
}
