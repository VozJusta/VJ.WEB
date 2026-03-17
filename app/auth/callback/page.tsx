import { Suspense } from 'react';
import { GoogleCallbackHandler } from '@/app/features/auth/callback/google-callback-handler';

export default function AuthCallbackPage() {
  return (
    <Suspense
      fallback={
        <main className="flex min-h-screen items-center justify-center">
          <div className="text-center space-y-4">
            <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto" />
            <p className="text-gray-300">Carregando...</p>
          </div>
        </main>
      }
    >
      <GoogleCallbackHandler />
    </Suspense>
  );
}
