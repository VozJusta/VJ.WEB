'use client';

import { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';

export function GoogleAuthHandler() {
  const searchParams = useSearchParams();
  const { loginWithGoogle, isAuthenticated } = useAuth();

  useEffect(() => {
    const authData = searchParams.get('authData');

    if (authData && !isAuthenticated) {
      try {
        const decodedData = JSON.parse(
          atob(authData)
        );
        loginWithGoogle(decodedData);
      } catch (error) {
        console.error('Failed to decode auth data:', error);
      }
    }
  }, [searchParams, loginWithGoogle, isAuthenticated]);

  return null;
}
