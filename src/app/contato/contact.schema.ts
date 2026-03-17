import { z } from "zod";

export const contactSchema = z.object({
  name: z
    .string()
    .min(3, "Nome deve ter no mínimo 3 caracteres")
    .max(100, "Nome deve ter no máximo 100 caracteres"),
  email: z.string().email("E-mail inválido").min(1, "E-mail é obrigatório"),
  subject: z
    .string()
    .min(5, "Assunto deve ter no mínimo 5 caracteres")
    .max(200, "Assunto deve ter no máximo 200 caracteres"),
  message: z
    .string()
    .min(20, "Mensagem deve ter no mínimo 20 caracteres")
    .max(1000, "Mensagem deve ter no máximo 1000 caracteres"),
});

export type ContactFormData = z.infer<typeof contactSchema>;
