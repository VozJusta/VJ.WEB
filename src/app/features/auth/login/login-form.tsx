"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { ZodError } from "zod";
import { Email, LockOutline, Visibility, VisibilityOff } from "@mui/icons-material";
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { Checkbox } from "@/src/components/ui/checkbox";
import { useToast } from "@/src/components/ui/toast/toast-provider";
import { loginSchema } from "./login.schema";

type LoginFormState = {
  email: string;
  password: string;
  rememberMe: boolean;
};

const initialFormState: LoginFormState = {
  email: "",
  password: "",
  rememberMe: false,
};

export function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [formState, setFormState] = useState(initialFormState);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrors({});
    setIsSubmitting(true);

    try {
      const validatedData = loginSchema.parse(formState);
      
      toast({
        title: "Login realizado com sucesso!",
        description: "Você será redirecionado em instantes.",
        variant: "success",
      });
      
      console.log("Formulário válido:", validatedData);
      
    } catch (error) {
      if (error instanceof ZodError) {
        const fieldErrors: Record<string, string> = {};
        error.issues.forEach((err) => {
          if (err.path[0]) {
            fieldErrors[err.path[0].toString()] = err.message;
          }
        });
        setErrors(fieldErrors);
        
        toast({
          title: "Erro no login",
          description: "Verifique os campos destacados e tente novamente.",
          variant: "error",
        });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGoogleLogin = () => {
    toast({
      title: "Login com Google",
      description: "Funcionalidade em desenvolvimento.",
      variant: "info",
    });
  };

  return (
    <section className="mx-auto w-full max-w-xl rounded-3xl border border-white/8 bg-[#071735]/80 p-6 shadow-[0_20px_80px_rgba(0,0,0,0.25)] backdrop-blur-sm sm:p-8 lg:mx-0">
      <div className="space-y-2">
        <h2 className="text-4xl font-bold tracking-tight text-white">Entrar no VozJusta</h2>
        <p className="text-base text-white/60">
          Acesse sua conta para continuar
        </p>
      </div>

      <form className="mt-8" onSubmit={handleSubmit} noValidate>
        <fieldset className="space-y-5">

          <Input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            value={formState.email}
            onChange={(event) =>
              setFormState((current) => ({
                ...current,
                email: event.target.value,
              }))
            }
            label="E-MAIL"
            placeholder="seu@email.com"
            leftIcon={<Email fontSize="small" aria-hidden="true" />}
            error={errors.email}
            containerClassName="space-y-2"
            className="h-12 rounded-xl border-white/10 bg-[#05112A] text-sm text-white placeholder:text-white/35 focus:ring-primary"
          />

          <Input
            id="password"
            name="password"
            type={showPassword ? "text" : "password"}
            autoComplete="current-password"
            value={formState.password}
            onChange={(event) =>
              setFormState((current) => ({
                ...current,
                password: event.target.value,
              }))
            }
            label="SENHA"
            placeholder="••••••••"
            leftIcon={<LockOutline fontSize="small" aria-hidden="true" />}
            rightIcon={
              <button
                type="button"
                aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
                aria-pressed={showPassword}
                onClick={() => setShowPassword((current) => !current)}
                className="inline-flex text-white/60 transition-colors hover:text-white"
              >
                {showPassword ? (
                  <VisibilityOff fontSize="small" aria-hidden="true" />
                ) : (
                  <Visibility fontSize="small" aria-hidden="true" />
                )}
              </button>
            }
            error={errors.password}
            containerClassName="space-y-2"
            className="h-12 rounded-xl border-white/10 bg-[#05112A] text-sm text-white placeholder:text-white/35 focus:ring-primary"
          />

          <div className="flex items-center justify-between">
            <Checkbox
              name="rememberMe"
              checked={formState.rememberMe}
              onChange={(event) =>
                setFormState((current) => ({
                  ...current,
                  rememberMe: event.target.checked,
                }))
              }
            >
              Lembrar-me
            </Checkbox>

            <Link 
              href="/esqueci-minha-senha" 
              className="text-sm font-semibold text-primary hover:text-primary/80"
            >
              Esqueci minha senha
            </Link>
          </div>

          <Button
            type="submit"
            variant="primary"
            size="lg"
            fullWidth
            loading={isSubmitting}
            className="mt-2 rounded-xl"
          >
            Entrar
          </Button>

          <div className="relative">
            <div className="absolute inset-0 flex items-center" aria-hidden="true">
              <div className="w-full border-t border-white/10" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="bg-[#071735] px-4 text-white/45 uppercase tracking-wide">
                Ou entre com
              </span>
            </div>
          </div>

          <Button
            type="button"
            variant="white"
            size="lg"
            fullWidth
            onClick={handleGoogleLogin}
            className="rounded-xl"
          >
            <svg className="mr-2 h-5 w-5" viewBox="0 0 24 24" aria-hidden="true">
              <path
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                fill="#4285F4"
              />
              <path
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                fill="#34A853"
              />
              <path
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                fill="#FBBC05"
              />
              <path
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                fill="#EA4335"
              />
            </svg>
            Google
          </Button>

          <p className="text-center text-sm text-white/45">
            Ainda não tem conta?{" "}
            <Link href="/onBoarding/perfil" className="font-semibold text-primary hover:text-primary/80">
              Cadastre-se
            </Link>
          </p>
        </fieldset>
      </form>
    </section>
  );
}
