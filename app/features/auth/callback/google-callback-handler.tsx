'use client';

import { useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';

export function GoogleCallbackHandler() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { loginWithGoogle, setLoading, setError } = useAuth();

  useEffect(() => {
    const handleCallback = async () => {
      try {
        setLoading(true);

        const user = searchParams.get('user');
        const error = searchParams.get('error');

        if (error) {
          setError('Erro ao autenticar com Google');
          router.push('/auth');
          return;
        }

        if (!user) {
          setError('ID de usuário não encontrado');
          router.push('/auth');
          return;
        }

        const userData = await fetch(
          `/api/auth/user/${user}`
        ).then((res) => res.json());

        loginWithGoogle(userData);

        const role = userData.role;
        const dashboardUrl =
          role === 'lawyer' ? '/dashboard/lawyer' : '/dashboard/citizen';

        router.push(dashboardUrl);
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : 'Erro ao processar autenticação';
        setError(errorMessage);
        router.push('/auth');
      } finally {
        setLoading(false);
      }
    };

    handleCallback();
  }, [searchParams, router, loginWithGoogle, setLoading, setError]);

  return (
    <main className="flex min-h-screen items-center justify-center">
      <div className="text-center space-y-4">
        <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto" />
        <p className="text-gray-300">Finalizando autenticação...</p>
      </div>
    </main>
  );
}
