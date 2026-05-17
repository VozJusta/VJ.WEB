'use client';

import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { authStorage } from '@/lib/auth';

export function GoogleAuthHandler() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { login } = useAuth();

  useEffect(() => {
    const authData = searchParams.get('authData');
    if (!authData) return;

    try {
      const decodedData = JSON.parse(atob(authData));

      if (decodedData.access_token && decodedData.refresh_token) {
        authStorage.setTokens(decodedData.access_token, decodedData.refresh_token);
      }

      login(decodedData);

      const rawRole = typeof decodedData.role === 'string'
        ? decodedData.role.split('|')[0].trim().toLowerCase()
        : 'citizen';
      const role = rawRole === 'lawyer' ? 'lawyer' : 'citizen';
      authStorage.setUserRole(role);

      const home = role === 'lawyer' ? '/advogado' : '/dashboard';
      router.replace(home);
    } catch {
      // malformed authData — stay on current page
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  return null;
}
