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

function parseBool(value: string | null): boolean {
  if (value === null) return false;
  return value === 'true' || value === '1';
}

export function GoogleAuthHandler() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { login } = useAuth();

  useEffect(() => {
    const authDataParam = searchParams.get('authData');
    const securityTokenParam =
      searchParams.get('x-security-token') ||
      searchParams.get('token') ||
      searchParams.get('securityToken');
    const accessTokenParam = searchParams.get('access_token');

    let data: Partial<GoogleAuthResponse> | null = null;

    if (authDataParam) {
      try {
        data = JSON.parse(atob(authDataParam));
      } catch {
        router.replace('/login?error=invalid_auth_data');
        return;
      }
    } else if (securityTokenParam || accessTokenParam) {
      const registerCompleted = parseBool(searchParams.get('registerCompleted'));
      const role = parseRole(searchParams.get('role'));

      data = {
        validated: true,
        sub: searchParams.get('sub') ?? '',
        role,
        email: searchParams.get('email') ?? '',
        full_name: searchParams.get('full_name') ?? '',
        loggedWithGoogle: true,
        registerCompleted,
        securityToken: securityTokenParam ?? undefined,
        access_token: accessTokenParam ?? undefined,
        refresh_token: searchParams.get('refresh_token') ?? undefined,
      };
    }

    if (!data) return;

    try {
      const role = parseRole(data.role);
      authStorage.setUserRole(role);

      const securityToken = data.securityToken ?? '';
      const registerCompleted = data.registerCompleted ?? false;

      if (!registerCompleted) {
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

      if (data.access_token) {
        authStorage.setAccessToken(data.access_token);
        if (data.refresh_token) {
          authStorage.setRefreshToken(data.refresh_token);
        }
      } else if (securityToken) {
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
