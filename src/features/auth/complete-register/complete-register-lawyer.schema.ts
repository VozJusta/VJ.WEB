import { z } from "zod";

const cpfRegex = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/;
const phoneRegex = /^\(\d{2}\) \d{5}-\d{4}$/;
const oabNumberRegex = /^\d{4,6}$/;

const OAB_STATES = [
  "AC", "AL", "AM", "AP", "BA", "CE", "DF", "ES", "GO",
  "MA", "MG", "MS", "MT", "PA", "PB", "PE", "PI", "PR",
  "RJ", "RN", "RO", "RR", "RS", "SC", "SE", "SP", "TO",
] as const;

export const completeRegisterLawyerSchema = z
  .object({
    cpf: z
      .string()
      .min(1, "CPF é obrigatório")
      .regex(cpfRegex, "CPF inválido. Use o formato 000.000.000-00"),

    oabNumber: z
      .string()
      .min(1, "Número OAB é obrigatório")
      .regex(oabNumberRegex, "Número OAB deve ter entre 4 e 6 dígitos"),

    oabState: z
      .string()
      .min(1, "UF é obrigatória")
      .refine((val) => OAB_STATES.includes(val as typeof OAB_STATES[number]), "UF inválida"),

    specialization: z
      .string()
      .min(1, "Especialidade é obrigatória")
      .min(3, "Especialidade deve ter pelo menos 3 caracteres")
      .max(100, "Especialidade muito longa"),

    phone: z
      .string()
      .min(1, "Telefone é obrigatório")
      .regex(phoneRegex, "Telefone inválido. Use o formato (00) 00000-0000"),

    password: z
      .string()
      .min(8, "Senha deve ter pelo menos 8 caracteres")
      .regex(/[A-ZÀ-Ý]/, "Senha deve conter pelo menos uma letra maiúscula")
      .regex(/[^\p{L}\p{N}\s]/u, "Senha deve conter pelo menos um símbolo"),

    confirmPassword: z.string().min(1, "Confirmação de senha é obrigatória"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "As senhas não coincidem",
    path: ["confirmPassword"],
  });

export type CompleteRegisterLawyerFormData = z.infer<
  typeof completeRegisterLawyerSchema
>;

export { OAB_STATES };
