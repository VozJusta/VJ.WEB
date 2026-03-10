import { CasesList } from "./index";
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

export function AllCasesFeature() {
  return <CasesList initialCases={ALL_CASES} />;
}
