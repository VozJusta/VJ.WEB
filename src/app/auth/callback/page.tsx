import { Suspense } from 'react';
import { GoogleAuthHandler } from '@/features/auth/google-auth-handler';

export default function AuthCallbackPage() {
  return (
    <Suspense>
      <GoogleAuthHandler />
      <div className="flex min-h-screen items-center justify-center bg-[#0a0e14]">
        <div className="flex flex-col items-center gap-4">
          <span className="h-8 w-8 animate-spin rounded-full border-2 border-[#2585F4] border-t-transparent" />
          <p className="text-sm text-white/50">Autenticando...</p>
        </div>
      </div>
    </Suspense>
  );
}
