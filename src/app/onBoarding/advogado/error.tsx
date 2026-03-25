"use client";

import { Button } from "@/src/components/ui/button";

type OnboardingAdvogadoErrorProps = {
  reset: () => void;
};

export default function OnboardingAdvogadoError({
  reset,
}: OnboardingAdvogadoErrorProps) {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[radial-gradient(circle_at_15%_20%,rgba(37,133,244,0.22)_0%,rgba(4,10,27,1)_55%)] px-6">
      <article className="w-full max-w-lg rounded-3xl border border-white/10 bg-[#071735]/80 p-8 text-center">
        <h1 className="text-2xl font-semibold text-white">Falha ao carregar cadastro</h1>
        <p className="mt-2 text-white/60">
          Não foi possível abrir esta etapa agora. Tente novamente.
        </p>
        <Button type="button" className="mt-6 rounded-xl" onClick={reset}>
          Recarregar
        </Button>
      </article>
    </main>
  );
}
