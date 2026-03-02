import { RoleOption } from "./types";

export const ROLE_OPTIONS: RoleOption[] = [
  {
    id: "lawyer",
    title: "Advogado",
    description: "Gerencie processos, clientes e petições em um só lugar.",
    icon: "Gavel",
  },
  {
    id: "individual",
    title: "Pessoa Física",
    description: "Acompanhe seus processos e entenda seus direitos.",
    icon: "Person",
  },
  {
    id: "company",
    title: "Empresa",
    description: "Centralize o jurídico da sua organização.",
    icon: "Business",
  },
];

export const ONBOARDING_TOTAL_STEPS = 2;
