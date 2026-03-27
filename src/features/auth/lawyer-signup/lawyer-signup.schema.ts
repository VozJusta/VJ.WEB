import { z } from "zod";

const cpfRegex = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/;
const cnpjRegex = /^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/;
const oabNumberRegex = /^\d{1,6}$/;

export const lawyerSignupSchema = z.object({
  fullName: z
    .string()
    .min(1, "Nome completo é obrigatório")
    .min(3, "Nome deve ter pelo menos 3 caracteres")
    .max(100, "Nome muito longo")
    .regex(/^[a-zA-ZÀ-ÿ\s]+$/, "Nome deve conter apenas letras"),
  
  cpf: z
    .string()
    .min(1, "CPF/CNPJ é obrigatório")
    .refine(
      (value) => cpfRegex.test(value) || cnpjRegex.test(value),
      "CPF/CNPJ inválido. Use o formato 000.000.000-00 ou 00.000.000/0000-00"
    ),

  email: z
    .string()
    .min(1, "E-mail é obrigatório")
    .email("E-mail inválido"),

  phone: z
    .string()
    .min(1, "Telefone é obrigatório")
    .min(14, "Telefone inválido")
    .max(15, "Telefone inválido"),
  
  oabNumber: z
    .string()
    .min(1, "Número OAB é obrigatório")
    .regex(oabNumberRegex, "Número OAB deve conter apenas dígitos"),
  
  oabState: z
    .string()
    .min(1, "UF é obrigatória")
    .length(2, "UF deve ter 2 caracteres"),
  
  specialty: z
    .string()
    .min(1, "Especialidade é obrigatória")
    .min(3, "Especialidade deve ter pelo menos 3 caracteres")
    .max(100, "Especialidade muito longa"),
  
  password: z
    .string()
    .min(8, "Senha deve ter pelo menos 8 caracteres")
    .regex(/[A-ZÀ-Ý]/, "Senha deve conter pelo menos uma letra maiúscula")
    .regex(/[^\p{L}\p{N}\s]/u, "Senha deve conter pelo menos um símbolo"),
  
  acceptedTerms: z
    .boolean()
    .refine((val) => val === true, "Você deve aceitar os termos de uso"),
});

export type LawyerSignupFormData = z.infer<typeof lawyerSignupSchema>;
