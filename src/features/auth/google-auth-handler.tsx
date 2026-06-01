'use client';

import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { authStorage } from '@/lib/auth';
import type { GoogleAuthResponse } from '@/types/auth.types';

function parseRole(roleStr: unknown): 'citizen' | 'lawyer' {
  if (typeof roleStr !== 'string') return 'citizen';
  const raw = roleStr.split('|')[0].trim().toLowerCase();
  return raw === 'lawyer' ? 'lawyer' : 'citizen';
}

export function GoogleAuthHandler() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { login } = useAuth();

  useEffect(() => {
    const authData = searchParams.get('authData');

    if (!authData) return;

    let data: Partial<GoogleAuthResponse> | null = null;

    try {
      data = JSON.parse(atob(authData));
    } catch {
      router.replace('/login?error=invalid_auth_data');
      return;
    }

    if (!data) {
      router.replace('/login?error=invalid_auth_data');
      return;
    }

    try {
      const role = parseRole(data.role);
      authStorage.setUserRole(role);

      const securityToken = data.securityToken ?? '';

      if (!data.registerCompleted) {
        if (securityToken) {
          authStorage.setSecurityToken(securityToken);
          sessionStorage.setItem('pending_google_token', securityToken);
          sessionStorage.setItem('pending_google_role', role);
          sessionStorage.setItem('pending_google_email', data.email ?? '');
          sessionStorage.setItem('pending_google_name', data.full_name ?? '');
        }
        router.replace(`/auth/complete/${role}`);
        return;
      }

      if (securityToken) {
        authStorage.setAccessToken(securityToken);
      }

      login(data as GoogleAuthResponse);

      const home = role === 'lawyer' ? '/advogado' : '/dashboard';
      router.replace(home);
    } catch {
      router.replace('/login?error=authentication_failed');
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  return null;
}
