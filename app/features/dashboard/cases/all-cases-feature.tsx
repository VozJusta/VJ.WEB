"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowBackRounded, AddRounded } from "@mui/icons-material";
import { CaseCard } from "@/components/ui/case-card";
import { Button } from "@/components/ui/button";
import type { CaseCardProps } from "@/components/ui/case-card/case-card.types";

const ALL_CASES: Omit<CaseCardProps, "className">[] = [
  {
    id: "29384",
    title: "Ação Trabalhista - XPTO Tecnologia",
    status: "analysis",
    updatedLabel: "Atualizado há 2 horas",
    protocol: "#29384-BR",
    href: "/dashboard/casos/29384",
  },
  {
    id: "11045",
    title: "Indenização por Danos Morais - Voo Latam",
    status: "concluded",
    updatedLabel: "Finalizado em 15/05/2024",
    protocol: "#11045-BR",
    href: "/dashboard/casos/11045",
  },
  {
    id: "34521",
    title: "Divórcio Consensual",
    status: "pending",
    updatedLabel: "Iniciado em 10/06/2024",
    protocol: "#34521-BR",
    href: "/dashboard/casos/34521",
  },
  {
    id: "44912",
    title: "Revisão de Contrato Imobiliário",
    status: "analysis",
    updatedLabel: "Atualizado há 1 dia",
    protocol: "#44912-BR",
    href: "/dashboard/casos/44912",
  },
  {
    id: "18228",
    title: "Pensão Alimentícia",
    status: "concluded",
    updatedLabel: "Finalizado em 02/02/2024",
    protocol: "#18228-BR",
    href: "/dashboard/casos/18228",
  },
  {
    id: "55103",
    title: "Ação de Cobrança - Serviços Prestados",
    status: "analysis",
    updatedLabel: "Atualizado há 3 dias",
    protocol: "#55103-BR",
    href: "/dashboard/casos/55103",
  },
  {
    id: "62874",
    title: "Inventário e Partilha de Bens",
    status: "pending",
    updatedLabel: "Iniciado em 22/07/2024",
    protocol: "#62874-BR",
    href: "/dashboard/casos/62874",
  },
  {
    id: "71390",
    title: "Rescisão Contratual - Locação Comercial",
    status: "archived",
    updatedLabel: "Arquivado em 30/11/2023",
    protocol: "#71390-BR",
    href: "/dashboard/casos/71390",
  },
];

const PAGE_SIZE = 5;

export function AllCasesFeature() {
  const [visible, setVisible] = useState(PAGE_SIZE);
  const shown = ALL_CASES.slice(0, visible);
  const hasMore = visible < ALL_CASES.length;

  return (
    <main
      className="flex flex-col gap-6 w-full px-4 py-6 md:px-6 md:py-8"
      aria-label="Todos os casos"
    >
      {/* Header */}
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

      {/* Cases list */}
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

      {/* Load more */}
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
