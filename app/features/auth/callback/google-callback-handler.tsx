'use client';

import { useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';

export function GoogleAuthCallbackHandler() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { loginWithGoogle, setError, setLoading } = useAuth();

  useEffect(() => {
    const handleCallback = async () => {
      try {
        setLoading(true);

        const userId = searchParams.get('user');
        const email = searchParams.get('email');
        const fullName = searchParams.get('name');
        const error = searchParams.get('error');

        if (error) {
          setError('Erro ao autenticar com Google');
          router.push('/login');
          return;
        }

        if (!userId || !email || !fullName) {
          setError('Dados de autenticação incompletos');
          router.push('/login');
          return;
        }

        const authData = {
          validated: true,
          sub: userId,
          email,
          full_name: fullName,
          role: localStorage.getItem('auth-store')
            ? JSON.parse(localStorage.getItem('auth-store') as string).state
              ?.userRole || 'user'
            : 'user',
          loggedWithGoogle: true,
        };

        loginWithGoogle(authData);
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : 'Erro ao processar autenticação';
        setError(errorMessage);
        router.push('/login');
      } finally {
        setLoading(false);
      }
    };

    if (searchParams.toString()) {
      handleCallback();
    }
  }, [searchParams, router, loginWithGoogle, setError, setLoading]);

  return (
    <main className="flex min-h-screen items-center justify-center bg-[radial-gradient(circle_at_15%_20%,rgba(37,133,244,0.22)_0%,rgba(4,10,27,1)_55%)]">
      <div className="text-center space-y-4">
        <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto" />
        <p className="text-gray-300">Finalizando seu login...</p>
      </div>
    </main>
  );
}
