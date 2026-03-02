export type VerificationType = "email" | "phone";

export interface VerificationConfig {
  type: VerificationType;
  contact: string;
  expirationTime?: number; // em segundos, padrão 5 minutos
}

export const verificationMessages = {
  email: {
    title: "Verificação de E-mail",
    description: "Enviamos um código de 6 dígitos para seu e-mail",
    buttonText: "Verificar E-mail",
    successTitle: "E-mail verificado com sucesso!",
    successDescription: "Você será redirecionado em instantes.",
    errorTitle: "Código inválido",
    errorDescription: "Verifique o código e tente novamente.",
    resendMessage: "Não recebeu o código?",
  },
  phone: {
    title: "Verificação de Telefone",
    description: "Enviamos um código de 6 dígitos via SMS",
    buttonText: "Verificar Telefone",
    successTitle: "Telefone verificado com sucesso!",
    successDescription: "Você será redirecionado em instantes.",
    errorTitle: "Código inválido",
    errorDescription: "Verifique o código e tente novamente.",
    resendMessage: "Não recebeu o SMS?",
  },
};
