import Link from "next/link";
import { ListAltRounded, ChevronRightRounded } from "@mui/icons-material";
import { CaseCard } from "@/components/ui/case-card";
import type { CaseCardProps } from "@/components/ui/case-card/case-card.types";

const RECENT_CASES: Omit<CaseCardProps, "className">[] = [
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
];

export function CasesSection() {
  return (
    <section aria-labelledby="my-cases-heading">
      <header className="mb-5 flex items-center justify-between gap-4">
        <div className="flex items-center gap-2.5">
          <ListAltRounded
            fontSize="small"
            className="text-primary"
            aria-hidden="true"
          />
          <h2
            id="my-cases-heading"
            className="text-lg font-bold text-foreground"
          >
            Meus Casos
          </h2>
        </div>

        <Link
          href="/dashboard/casos"
          className="flex items-center gap-1 text-sm font-medium text-primary transition-opacity hover:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded"
        >
          Ver todos os casos
          <ChevronRightRounded fontSize="small" aria-hidden="true" />
        </Link>
      </header>

      <ul role="list" className="flex flex-col gap-3">
        {RECENT_CASES.map((caseItem) => (
          <li key={caseItem.id}>
            <CaseCard {...caseItem} />
          </li>
        ))}
      </ul>
    </section>
  );
}
