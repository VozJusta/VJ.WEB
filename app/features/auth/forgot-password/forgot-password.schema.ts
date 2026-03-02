import { z } from "zod";

export const forgotPasswordSchema = z.object({
  email: z
    .string()
    .min(1, "E-mail é obrigatório")
    .email("E-mail inválido")
    .max(100, "E-mail muito longo"),
});

export type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;
