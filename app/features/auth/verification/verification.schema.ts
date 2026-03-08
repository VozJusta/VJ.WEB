import { z } from "zod";

export const verificationSchema = z.object({
  code: z
    .string()
    .length(6, "O código deve ter 6 dígitos")
    .regex(/^\d{6}$/, "O código deve conter apenas números"),
});

export type VerificationFormData = z.infer<typeof verificationSchema>;
