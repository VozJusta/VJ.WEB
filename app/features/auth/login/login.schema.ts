import { z } from "zod";

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, "E-mail é obrigatório")
    .email("E-mail inválido")
    .max(100, "E-mail muito longo"),
  
  password: z
    .string()
    .min(1, "Senha é obrigatória"),
  
  rememberMe: z.boolean().optional(),
});

export type LoginFormData = z.infer<typeof loginSchema>;
