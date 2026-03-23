export const passwordChecks = [
  {
    id: "length",
    label: "8+ caracteres",
    test: (password: string) => password.length >= 8,
  },
  {
    id: "uppercase",
    label: "Maiúsculas",
    test: (password: string) => /[A-ZÀ-Ý]/.test(password),
  },
  {
    id: "symbol",
    label: "Símbolos",
    test: (password: string) => /[^\p{L}\p{N}\s]/u.test(password),
  },
  {
    id: "number",
    label: "Números",
    test: (password: string) => /\d/.test(password),
  },
];
