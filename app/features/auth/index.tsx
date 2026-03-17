import { Suspense } from 'react';
import { RoleSelection } from './role-selection';
import { GoogleAuthButton } from './google/google-auth-button';

function GoogleAuthSkeleton() {
  return (
    <div className="h-10 w-full animate-pulse rounded-lg bg-white/10" />
  );
}

export function AuthFeature() {
  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_15%_20%,rgba(37,133,244,0.22)_0%,rgba(4,10,27,1)_55%)] px-6 py-12 sm:px-8 lg:px-12 flex justify-center items-center">
      <section className="mx-auto w-full max-w-md space-y-8 rounded-3xl border border-white/10 bg-[#071735]/50 p-8 backdrop-blur-md">
        <RoleSelection />

        <Suspense fallback={<GoogleAuthSkeleton />}>
          <GoogleAuthButton />
        </Suspense>

        <p className="text-center text-xs text-gray-500">
          Ao continuar, você concorda com nossos{' '}
          <a href="#" className="underline hover:text-gray-400">
            Termos de Serviço
          </a>{' '}
          e{' '}
          <a href="#" className="underline hover:text-gray-400">
            Política de Privacidade
          </a>
        </p>
      </section>
    </main>
  );
}
