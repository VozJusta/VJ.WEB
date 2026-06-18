"use client";

import { FormEvent, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ZodError } from "zod";
import { Email, ArrowBack } from "@mui/icons-material";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/toast/toast-provider";
import { authService, AuthServiceError } from "@/services/auth.service";
import { forgotPasswordSchema } from "./forgot-password.schema";
import logo from "@/assets/logo/logo+name.svg";

export function ForgotPasswordForm() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      const validatedData = forgotPasswordSchema.parse({ email });
      await authService.sendForgotPasswordEmail({ email: validatedData.email });
      
      toast({
        title: "Código enviado!",
        description: "Verifique seu e-mail para continuar.",
        variant: "success",
      });

      router.push(`/verificacao/email?email=${encodeURIComponent(email)}&type=reset`);
      
    } catch (err) {
      if (err instanceof ZodError) {
        setError(err.issues[0].message);
        
        toast({
          title: "Erro no formulário",
          description: "Verifique o e-mail informado.",
          variant: "error",
        });
        return;
      }

      if (err instanceof AuthServiceError) {
        toast({
          title: "Falha ao enviar código",
          description: err.message,
          variant: "error",
        });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_15%_20%,rgba(37,133,244,0.22)_0%,rgba(4,10,27,1)_55%)] flex items-center justify-center px-4 py-8 sm:px-6 sm:py-12">
      <section className="w-full max-w-md">
        <div className="mb-8 flex justify-center">
          <Image
            src={logo}
            alt="VozJusta"
            width={165}
            height={34}
            priority
          />
        </div>

        <div className="rounded-2xl sm:rounded-3xl border border-white/8 bg-[#071735]/80 p-6 sm:p-8 shadow-[0_20px_80px_rgba(0,0,0,0.25)] backdrop-blur-sm">
          <Link
            href="/login"
            className="mb-4 sm:mb-6 inline-flex items-center gap-2 text-xs sm:text-sm text-white/60 transition-colors hover:text-white"
          >
            <ArrowBack fontSize="small" />
            Voltar
          </Link>

          <div className="space-y-2 mb-6 sm:mb-8">
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
              Esqueceu a Senha?
            </h1>
            <p className="text-sm sm:text-base text-white/60">
              Não se preocupe! Informe seu e-mail cadastrado para receber as instruções de recuperação.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <Input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              label="E-MAIL"
              placeholder="seu@email.com"
              leftIcon={<Email fontSize="small" aria-hidden="true" />}
              error={error}
              containerClassName="space-y-2"
              className="h-12 rounded-xl border-white/10 bg-[#05112A] text-sm text-white placeholder:text-white/35 focus:ring-primary"
            />

            <Button
              type="submit"
              variant="primary"
              size="lg"
              fullWidth
              loading={isSubmitting}
              className="rounded-xl text-sm sm:text-base"
            >
              Enviar Código
            </Button>

          </form>
        </div>
      </section>
    </main>
  );
}
