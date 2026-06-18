'use client';

import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { authStorage } from '@/lib/auth';
import { authService } from '@/services/auth.service';
import type { GoogleAuthResponse } from '@/types/auth.types';

function parseRole(roleStr: unknown): 'citizen' | 'lawyer' {
  if (typeof roleStr !== 'string') return 'citizen';
  const raw = roleStr.split('|')[0].trim().toLowerCase();
  return raw === 'lawyer' ? 'lawyer' : 'citizen';
}

export function GoogleAuthHandler() {
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const errorParam = searchParams.get('error');
    if (errorParam) {
      router.replace(`/login?error=${errorParam}`);
      return;
    }

    const authDataParam = searchParams.get('authData');
    if (!authDataParam) return;

    const handle = async () => {
      let data: Partial<GoogleAuthResponse> | null = null;

      try {
        data = JSON.parse(atob(authDataParam));
      } catch {
        router.replace('/login?error=invalid_auth_data');
        return;
      }

      if (!data) return;

      try {
        const role = parseRole(data.role);
        const securityToken = data.securityToken ?? '';
        const email = data.email ?? '';
        const registerCompleted = data.registerCompleted ?? false;

        authStorage.setUserRole(role);

        if (!registerCompleted) {
          // Novo usuário: salva contexto e vai para completar cadastro
          if (securityToken) {
            authStorage.setSecurityToken(securityToken);
            sessionStorage.setItem('pending_google_token', securityToken);
            sessionStorage.setItem('pending_google_role', role);
            sessionStorage.setItem('pending_google_email', email);
            sessionStorage.setItem('pending_google_name', data.full_name ?? '');
          }
          router.replace(`/auth/complete/${role}`);
          return;
        }

        // Usuário existente: envia código e vai para verificação
        if (data.full_name) {
          sessionStorage.setItem('pending_user_name', data.full_name);
        }

        // Persiste o token OAuth no localStorage como fallback (espelha authenticate()).
        // Sem isso, se o header x-security-token da resposta do send for bloqueado por CORS,
        // a página de verificação fica sem nenhum token e falha com "Sessão de verificação inválida".
        if (securityToken) {
          authStorage.setSecurityToken(securityToken);
        }

        const sendResponse = await authService.sendEmailVerificationCode(email, securityToken);
        // Usa o token rotacionado da resposta, ou cai de volta no token OAuth original.
        const verificationToken = sendResponse.securityToken || securityToken;
        if (verificationToken) {
          sessionStorage.setItem('pending_verification_token', verificationToken);
        }

        router.replace(
          `/verificacao/email?email=${encodeURIComponent(email)}&type=login&role=${role}`
        );
      } catch {
        router.replace('/login?error=authentication_failed');
      }
    };

    handle();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  return null;
}
