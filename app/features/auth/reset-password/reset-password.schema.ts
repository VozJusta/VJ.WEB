import { z } from "zod";

export const resetPasswordSchema = z
  .object({
    password: z
      .string()
      .min(8, "Senha deve ter pelo menos 8 caracteres")
      .regex(/[A-ZÀ-Ý]/, "Senha deve conter pelo menos uma letra maiúscula")
      .regex(/[^\p{L}\p{N}\s]/u, "Senha deve conter pelo menos um símbolo"),
    
    confirmPassword: z
      .string()
      .min(1, "Confirmação de senha é obrigatória"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "As senhas não coincidem",
    path: ["confirmPassword"],
  });

export type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>;
