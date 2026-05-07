'use client';

import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { authStorage } from '@/lib/auth';

export function GoogleAuthHandler() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { login, isAuthenticated } = useAuth();

  useEffect(() => {
    const authData = searchParams.get('authData');

    if (authData && !isAuthenticated) {
      try {
        const decodedData = JSON.parse(atob(authData));
        login(decodedData);

        const rawRole = typeof decodedData.role === 'string'
          ? decodedData.role.split('|')[0].trim().toLowerCase()
          : 'citizen';
        const role = rawRole === 'lawyer' ? 'lawyer' : 'citizen';
        authStorage.setUserRole(role);

        // Replace URL to remove authData param, then go to correct dashboard
        const home = role === 'lawyer' ? '/advogado' : '/dashboard';
        router.replace(home);
      } catch {
        // malformed authData — stay on current page
      }
    }
  }, [searchParams, login, isAuthenticated, router]);

  return null;
}
