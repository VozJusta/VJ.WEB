export const PASSWORD_MIN_LENGTH = 8;

export const passwordChecks = [
  {
    id: "length",
    label: "8+ chars",
    test: (value: string) => value.length >= PASSWORD_MIN_LENGTH,
  },
  {
    id: "uppercase",
    label: "Maiúscula",
    test: (value: string) => /[A-ZÀ-Ý]/.test(value),
  },
  {
    id: "symbol",
    label: "Símbolo",
    test: (value: string) => /[^\p{L}\p{N}\s]/u.test(value),
  },
] as const;

export const heroHighlights = [
  {
    title: "Novas Oportunidades",
    description:
      "Acesso direto a demandas qualificadas e aumente significativo do seu networking profissional.",
  },
  {
    title: "Agilidade Digital",
    description:
      "Resolva pendências jurídicas com a velocidade que o mundo moderno exige.",
  },
] as const;

export { SPECIALIZATION_OPTIONS as specializationOptions } from "@/lib/status";

export const brazilianStates = [
  { value: "AC", label: "AC" },
  { value: "AL", label: "AL" },
  { value: "AP", label: "AP" },
  { value: "AM", label: "AM" },
  { value: "BA", label: "BA" },
  { value: "CE", label: "CE" },
  { value: "DF", label: "DF" },
  { value: "ES", label: "ES" },
  { value: "GO", label: "GO" },
  { value: "MA", label: "MA" },
  { value: "MT", label: "MT" },
  { value: "MS", label: "MS" },
  { value: "MG", label: "MG" },
  { value: "PA", label: "PA" },
  { value: "PB", label: "PB" },
  { value: "PR", label: "PR" },
  { value: "PE", label: "PE" },
  { value: "PI", label: "PI" },
  { value: "RJ", label: "RJ" },
  { value: "RN", label: "RN" },
  { value: "RS", label: "RS" },
  { value: "RO", label: "RO" },
  { value: "RR", label: "RR" },
  { value: "SC", label: "SC" },
  { value: "SP", label: "SP" },
  { value: "SE", label: "SE" },
  { value: "TO", label: "TO" },
] as const;
