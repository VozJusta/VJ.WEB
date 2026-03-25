import { Suspense } from "react";
import { LawyerSignupForm } from "./lawyer-signup-form";
import { LawyerSignupHero } from "./lawyer-signup-hero";

function LawyerSignupFormSkeleton() {
  return (
    <section
      aria-hidden="true"
      className="mx-auto h-180 w-full max-w-xl animate-pulse rounded-3xl border border-white/8 bg-[#071735]/50"
    />
  );
}

export function LawyerSignupFeature() {
  return (
    <main className="relative min-h-screen bg-[radial-gradient(circle_at_15%_20%,rgba(37,133,244,0.22)_0%,rgba(4,10,27,1)_55%)] px-6 py-10 sm:px-8 lg:px-12 flex items-center justify-center">
      <section className="mx-auto flex flex-col lg:flex-row w-full max-w-7xl gap-10 lg:grid-cols-[minmax(0,1fr)_440px] lg:items-center">
        <LawyerSignupHero />
        <Suspense fallback={<LawyerSignupFormSkeleton />}>
          <LawyerSignupForm />
        </Suspense>
      </section>
    </main>
  );
}
