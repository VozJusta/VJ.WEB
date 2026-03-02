import { z } from "zod";

const cpfRegex = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/;
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
    .min(1, "CPF é obrigatório")
    .regex(cpfRegex, "CPF inválido. Use o formato 000.000.000-00"),
  
  phone: z
    .string()
    .min(1, "Telefone é obrigatório")
    .regex(phoneRegex, "Telefone inválido. Use o formato (00) 00000-0000"),
  
  email: z
    .string()
    .min(1, "E-mail é obrigatório")
    .email("E-mail inválido")
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
