import { z } from "zod";

const cpfRegex = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/;
const cnpjRegex = /^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/;
const oabNumberRegex = /^\d{4,6}$/;

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
    .superRefine((value, ctx) => {
      const digits = value.replace(/\D/g, "");
      const isCnpj = digits.length > 11;
      if (isCnpj) {
        if (!cnpjRegex.test(value)) {
          ctx.addIssue({ code: z.ZodIssueCode.custom, message: "CNPJ inválido" });
        }
      } else {
        if (!cpfRegex.test(value)) {
          ctx.addIssue({ code: z.ZodIssueCode.custom, message: "CPF inválido" });
        }
      }
    }),

  email: z
    .string()
    .min(1, "E-mail é obrigatório")
    .email("Formato de e-mail inválido"),

  phone: z
    .string()
    .min(1, "Telefone é obrigatório")
    .min(14, "Telefone inválido")
    .max(15, "Telefone inválido"),
  
  oabNumber: z
    .string()
    .min(1, "Número OAB é obrigatório")
    .regex(oabNumberRegex, "Número OAB deve ter entre 4 e 6 dígitos"),
  
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
