"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowBackRounded, AddRounded } from "@mui/icons-material";
import { CaseCard } from "@/src/components/ui/case-card";
import { Button } from "@/src/components/ui/button";
import { EmptyState } from "@/src/components/ui/empty-state";
import type { CaseCardProps } from "@/src/components/ui/case-card/case-card.types";

interface CasesListProps {
  initialCases?: Omit<CaseCardProps, "className">[];
}

const PAGE_SIZE = 5;

export function CasesList({ initialCases = [] }: CasesListProps) {
  const [visible, setVisible] = useState(PAGE_SIZE);
  const hasCases = initialCases.length > 0;
  const shown = initialCases.slice(0, visible);
  const hasMore = visible < initialCases.length;

  if (!hasCases) {
    return (
      <main
        className="flex flex-col gap-6 w-full px-4 py-6 md:px-6 md:py-8"
        aria-label="Todos os casos"
      >
        <header className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Link
              href="/dashboard"
              aria-label="Voltar para o dashboard"
              className="flex items-center justify-center w-9 h-9 rounded-lg text-white/50 hover:text-white hover:bg-white/08 transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2585F4]"
            >
              <ArrowBackRounded fontSize="small" aria-hidden />
            </Link>
            <h1 className="text-2xl font-bold text-white tracking-tight">
              Meus Casos
            </h1>
          </div>

          <Button
            variant="primary"
            size="md"
            leftIcon={<AddRounded fontSize="small" aria-hidden />}
            href="/dashboard/casos/novo"
          >
            Novo Caso
          </Button>
        </header>

        <EmptyState
          illustration="/illustrations/empty-cases-illustration.png"
          illustrationAlt="Nenhum caso encontrado"
          title="Você ainda não tem casos cadastrados"
          description="Comece criando seu primeiro caso jurídico. Nossa equipe de inteligência artificial está pronta para te auxiliar em todo o processo."
          action={{
            label: "Criar Primeiro Caso",
            onClick: () => (window.location.href = "/dashboard/casos/novo"),
          }}
        />
      </main>
    );
  }

  return (
    <main
      className="flex flex-col gap-6 w-full px-4 py-6 md:px-6 md:py-8"
      aria-label="Todos os casos"
    >
      <header className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Link
            href="/dashboard"
            aria-label="Voltar para o dashboard"
            className="flex items-center justify-center w-9 h-9 rounded-lg text-white/50 hover:text-white hover:bg-white/08 transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2585F4]"
          >
            <ArrowBackRounded fontSize="small" aria-hidden />
          </Link>
          <h1 className="text-2xl font-bold text-white tracking-tight">
            Meus Casos
          </h1>
        </div>

        <Button
          variant="primary"
          size="md"
          leftIcon={<AddRounded fontSize="small" aria-hidden />}
          href="/dashboard/casos/novo"
        >
          Novo Caso
        </Button>
      </header>

      <section aria-labelledby="all-cases-heading">
        <h2 id="all-cases-heading" className="sr-only">
          Lista de casos
        </h2>

        <ul role="list" className="flex flex-col gap-3">
          {shown.map((c) => (
            <li key={c.id}>
              <CaseCard {...c} />
            </li>
          ))}
        </ul>
      </section>

      {hasMore && (
        <div className="flex justify-center pt-2">
          <Button
            variant="ghost"
            size="md"
            onClick={() => setVisible((v) => v + PAGE_SIZE)}
            className="border border-[#1B2233] text-white/70 hover:text-white hover:bg-white/05 px-8"
          >
            Ver Mais Casos
          </Button>
        </div>
      )}
    </main>
  );
}
