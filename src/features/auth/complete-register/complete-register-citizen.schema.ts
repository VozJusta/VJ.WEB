import { z } from "zod";

const cpfRegex = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/;
const phoneRegex = /^\(\d{2}\) \d{5}-\d{4}$/;

export const completeRegisterCitizenSchema = z
  .object({
    cpf: z
      .string()
      .min(1, "CPF é obrigatório")
      .regex(cpfRegex, "CPF inválido. Use o formato 000.000.000-00"),

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

export type CompleteRegisterCitizenFormData = z.infer<
  typeof completeRegisterCitizenSchema
>;
