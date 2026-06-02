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
    const accessToken = searchParams.get('access_token');
    const emailParam = searchParams.get('email') ?? '';
    const xSecurityToken = searchParams.get('x-security-token') || searchParams.get('token');

    let data: Partial<GoogleAuthResponse> & Record<string, unknown> | null = null;

    if (authData) {
      try {
        data = JSON.parse(atob(authData));
      } catch {
        // malformed base64 — ignore
      }
    } else if (accessToken) {
      data = {
        access_token: accessToken,
        refresh_token: searchParams.get('refresh_token') ?? '',
        role: parseRole(searchParams.get('role')),
        email: emailParam,
        full_name: searchParams.get('full_name') ?? '',
      };
    } else if (xSecurityToken) {
      data = { securityToken: xSecurityToken, role: parseRole(searchParams.get('role')), email: emailParam };
    }

    if (!data) return;

    try {
      const role = parseRole(data.role);
      authStorage.setUserRole(role);

      const accessTokenValue = (data.access_token as string | undefined)?.trim();
      const securityToken = (data.securityToken as string | undefined)?.trim();

      // Google user still needs email 2FA: no access token yet, only a security token.
      // Persist it where VerificationForm reads it and send the user to the code screen.
      if (!accessTokenValue && securityToken) {
        sessionStorage.setItem('pending_verification_token', securityToken);
        authStorage.setSecurityToken(securityToken);

        const email = (data.email as string) || emailParam;
        if (data.full_name) {
          sessionStorage.setItem('pending_user_name', data.full_name as string);
        }

        router.replace(
          `/verificacao/email?email=${encodeURIComponent(email)}&type=login&role=${role}`
        );
        return;
      }

      // Fully authenticated path — persist whatever tokens we received.
      if (accessTokenValue) {
        authStorage.setAccessToken(accessTokenValue);
      }
      if (data.refresh_token) {
        authStorage.setRefreshToken(data.refresh_token as string);
      }

      login(data as GoogleAuthResponse);

      const home = role === 'lawyer' ? '/advogado' : '/dashboard';
      router.replace(home);
    } catch {
      // malformed auth data — stay on current page
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  return null;
}
