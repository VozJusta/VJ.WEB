import { z } from "zod";

const cpfRegex = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/;
const cnpjRegex = /^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/;
const phoneRegex = /^\(\d{2}\) \d{5}-\d{4}$/;

export const citizenSignupSchema = z.object({
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
  
  phone: z
    .string()
    .min(1, "Telefone é obrigatório")
    .regex(phoneRegex, "Telefone inválido. Use o formato (00) 00000-0000"),
  
  email: z
    .string()
    .min(1, "E-mail é obrigatório")
    .email("Formato de e-mail inválido")
    .max(100, "E-mail muito longo"),
  
  password: z
    .string()
    .min(8, "Senha deve ter pelo menos 8 caracteres")
    .regex(/[A-ZÀ-Ý]/, "Senha deve conter pelo menos uma letra maiúscula")
    .regex(/[^\p{L}\p{N}\s]/u, "Senha deve conter pelo menos um símbolo"),
  
  acceptedTerms: z
    .boolean()
    .refine((val) => val === true, "Você deve aceitar os termos de uso"),
});

export type CitizenSignupFormData = z.infer<typeof citizenSignupSchema>;
