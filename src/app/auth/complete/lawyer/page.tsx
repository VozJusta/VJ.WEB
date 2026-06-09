import { Suspense } from "react";
import type { Metadata } from "next";
import {
  CompleteRegisterLawyerForm,
  CompleteRegisterLawyerHero,
} from "@/features/auth/complete-register";

export const metadata: Metadata = {
  title: "Completar Cadastro | VozJusta",
  description: "Finalize seu cadastro de advogado na VozJusta.",
};

function FormSkeleton() {
  return (
    <section
      aria-hidden="true"
      className="mx-auto h-96 w-full max-w-xl animate-pulse rounded-3xl border border-white/8 bg-[#071735]/50"
    />
  );
}

export default function CompleteRegisterLawyerPage() {
  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_15%_20%,rgba(37,133,244,0.22)_0%,rgba(4,10,27,1)_55%)] px-6 py-12 sm:px-8 lg:px-12 flex justify-center items-center">
      <section className="mx-auto flex flex-col lg:flex-row w-full max-w-7xl gap-10 lg:items-center">
        <CompleteRegisterLawyerHero />
        <Suspense fallback={<FormSkeleton />}>
          <CompleteRegisterLawyerForm />
        </Suspense>
      </section>
    </main>
  );
}
