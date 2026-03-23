"use client";

import { FormEvent, useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { ZodError } from "zod";
import { VerifiedUserOutlined, ArrowBack } from "@mui/icons-material";
import { Button } from "@/components/ui/button";
import { OtpInput } from "@/components/ui/otp-input";
import { useToast } from "@/components/ui/toast/toast-provider";
import { authService, AuthServiceError } from "@/services/auth.service";
import {
  getVerificationSecurityToken,
  saveVerificationSecurityToken,
} from "./verification-session";
import { verificationSchema } from "./verification.schema";
import { verificationMessages, type VerificationConfig } from "./verification.types";

interface VerificationFormProps {
  config: VerificationConfig;
  onVerified?: () => void;
  onBack?: () => void;
}

export function VerificationForm({ config, onVerified, onBack }: VerificationFormProps) {
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [securityToken, setSecurityToken] = useState("");
  const [isSendingCode, setIsSendingCode] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [timeLeft, setTimeLeft] = useState(config.expirationTime || 300); 
  const [canResend, setCanResend] = useState(false);
  const { toast } = useToast();

  const messages = verificationMessages[config.type];
  const flowType = config.flowType || "signup";

  const sendCode = useCallback(async () => {
    setIsSendingCode(true);

    try {
      const currentToken = securityToken || getVerificationSecurityToken(config.contact, flowType) || "";
      const response = await authService.sendEmailVerificationCode(config.contact, currentToken);

      if (!response.securityToken) {
        throw new AuthServiceError("Não foi possível iniciar a validação. Tente reenviar o código.");
      }

      saveVerificationSecurityToken(config.contact, flowType, response.securityToken);
      setSecurityToken(response.securityToken);
      setCanResend(false);
      setTimeLeft(config.expirationTime || 900);
      return true;
    } catch (sendError) {
      const description = sendError instanceof AuthServiceError
        ? sendError.message
        : "Não foi possível enviar o código. Tente novamente.";

      toast({
        title: "Erro no envio",
        description,
        variant: "error",
      });
      setCanResend(true);
      return false;
    } finally {
      setIsSendingCode(false);
    }
  }, [config.contact, config.expirationTime, flowType, toast]);

  useEffect(() => {
    const storedToken = getVerificationSecurityToken(config.contact, flowType);
    if (storedToken) {
      setSecurityToken(storedToken);
      return;
    }

    void sendCode();
  }, [config.contact, flowType, sendCode]);

  useEffect(() => {
    if (timeLeft <= 0) {
      setCanResend(true);
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  const formatTime = useCallback((seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  }, []);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      const validatedData = verificationSchema.parse({ code });

      if (!securityToken) {
        throw new AuthServiceError("Sessão de verificação inválida. Reenvie o código para continuar.");
      }

      const tokens = await authService.validateEmailVerificationCode(
        {
          email: config.contact,
          code: validatedData.code,
        },
        securityToken,
      );

      localStorage.setItem("access_token", tokens.access_token);
      localStorage.setItem("refresh_token", tokens.refresh_token);
      
      toast({
        title: messages.successTitle,
        description: messages.successDescription,
        variant: "success",
      });

      if (onVerified) {
        onVerified();
      }

    } catch (err) {
      if (err instanceof ZodError) {
        setError(err.issues[0].message);
        
        toast({
          title: messages.errorTitle,
          description: messages.errorDescription,
          variant: "error",
        });
        return;
      }

      const description = err instanceof AuthServiceError
        ? err.message
        : "Não foi possível validar o código. Tente novamente.";

      setError("Código inválido ou expirado");
      toast({
        title: messages.errorTitle,
        description,
        variant: "error",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResend = async () => {
    setCode("");
    setError("");
    
    const sent = await sendCode();

    if (sent) {
      toast({
        title: "Código reenviado",
        description: `Um novo código foi enviado para ${config.contact}`,
        variant: "success",
      });
    }
  };

  return (
    <section className="mx-auto flex min-h-screen w-full max-w-lg items-center justify-center px-4 py-8 sm:px-6 sm:py-12">
      <div className="w-full rounded-2xl sm:rounded-3xl border border-white/8 bg-[#071735]/80 p-6 sm:p-8 shadow-[0_20px_80px_rgba(0,0,0,0.25)] backdrop-blur-sm">
        {onBack && (
          <button
            type="button"
            onClick={onBack}
            className="mb-4 sm:mb-6 inline-flex items-center gap-2 text-xs sm:text-sm text-white/60 transition-colors hover:text-white cursor-pointer"
            aria-label="Voltar"
          >
            <ArrowBack fontSize="small" />
            Voltar
          </button>
        )}

        <div className="flex flex-col items-center space-y-4 sm:space-y-6">
          <div className="inline-flex h-16 w-16 sm:h-20 sm:w-20 items-center justify-center rounded-full border-2 border-primary/20 bg-primary/10">
            <VerifiedUserOutlined 
              className="text-primary" 
              style={{ fontSize: 32 }}
              sx={{ fontSize: { xs: 32, sm: 40 } }}
              aria-hidden="true"
            />
          </div>

          <div className="space-y-1.5 sm:space-y-2 text-center px-2">
            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight text-white">
              {messages.title}
            </h1>
            <p className="text-sm sm:text-base text-white/60">
              {messages.description}
            </p>
            <p className="text-xs sm:text-sm font-medium text-white/80 break-all">
              para {config.contact}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="w-full space-y-4 sm:space-y-6">
            <OtpInput
              length={6}
              value={code}
              onChange={setCode}
              error={error}
              disabled={isSubmitting || timeLeft <= 0}
              autoFocus
            />

            <p className="text-center text-xs sm:text-sm text-white/60">
              O código expira em{" "}
              <span className="font-semibold text-primary">
                {formatTime(timeLeft)}
              </span>
            </p>

            <Button
              type="submit"
              variant="primary"
              size="lg"
              fullWidth
              loading={isSubmitting}
              disabled={code.length !== 6 || timeLeft <= 0 || isSendingCode || !securityToken}
              className="rounded-xl text-sm sm:text-base"
            >
              {messages.buttonText}
            </Button>

            <div className="text-center">
              <p className="text-xs sm:text-sm text-white/45 px-2">
                {messages.resendMessage}{" "}
                {canResend ? (
                  <button
                    type="button"
                    onClick={handleResend}
                    disabled={isSendingCode}
                    className="font-semibold text-primary hover:text-primary/80 transition-colors disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {isSendingCode ? "Enviando..." : "Reenviar"}
                  </button>
                ) : (
                  <span className="font-semibold text-white/30">
                    Aguarde {formatTime(timeLeft)}
                  </span>
                )}
              </p>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
