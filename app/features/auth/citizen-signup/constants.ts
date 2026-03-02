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
    title: "Segurança Jurídica",
    description:
      "Processos acompanhados com transparência total e criptografia de ponta.",
  },
  {
    title: "Agilidade Digital",
    description:
      "Resolva pendências jurídicas com a velocidade que o mundo moderno exige.",
  },
] as const;
