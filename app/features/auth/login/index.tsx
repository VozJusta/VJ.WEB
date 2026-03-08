import { Suspense } from "react";
import { LoginForm } from "./login-form";
import { LoginHero } from "./login-hero";

function LoginFormSkeleton() {
  return (
    <section
      aria-hidden="true"
      className="mx-auto h-180 w-full max-w-xl animate-pulse rounded-3xl border border-white/8 bg-[#071735]/50"
    />
  );
}

export function LoginFeature() {
  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_15%_20%,rgba(37,133,244,0.22)_0%,rgba(4,10,27,1)_55%)] px-6 py-12 sm:px-8 lg:px-12 flex justify-center items-center">
      <section className="mx-auto flex flex-col lg:flex-row w-full max-w-7xl gap-10 lg:grid-cols-[minmax(0,1fr)_440px] lg:items-center">
        <LoginHero />
        <Suspense fallback={<LoginFormSkeleton />}>
          <LoginForm />
        </Suspense>
      </section>
    </main>
  );
}
