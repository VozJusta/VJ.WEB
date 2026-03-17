import { Suspense } from 'react';
import { GoogleAuthCallbackHandler } from '@/app/features/auth/callback/google-callback-handler';

export default function AuthCallbackPage() {
  return (
    <Suspense
      fallback={
        <main className="flex min-h-screen items-center justify-center bg-[radial-gradient(circle_at_15%_20%,rgba(37,133,244,0.22)_0%,rgba(4,10,27,1)_55%)]">
          <div className="text-center space-y-4">
            <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto" />
            <p className="text-gray-300">Carregando...</p>
          </div>
        </main>
      }
    >
      <GoogleAuthCallbackHandler />
    </Suspense>
  );
}
