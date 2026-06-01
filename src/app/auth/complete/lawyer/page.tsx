import { Suspense } from "react";
import type { Metadata } from "next";
import { CompleteRegisterLawyerForm } from "@/features/auth/complete-register";

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
    <main className="flex min-h-screen items-center justify-center bg-[radial-gradient(circle_at_15%_20%,rgba(37,133,244,0.22)_0%,rgba(4,10,27,1)_55%)] px-6 py-12 sm:px-8 lg:px-12">
      <Suspense fallback={<FormSkeleton />}>
        <CompleteRegisterLawyerForm />
      </Suspense>
    </main>
  );
}
