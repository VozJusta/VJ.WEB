"use client";

import { FormEvent, useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { ZodError } from "zod";
import { LockOutline, Visibility, VisibilityOff, ArrowForward } from "@mui/icons-material";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/toast/toast-provider";
import { cn } from "@/lib/utils";
import { resetPasswordSchema } from "./reset-password.schema";
import { passwordChecks } from "./constants";

type ResetPasswordFormState = {
  password: string;
  confirmPassword: string;
};

const initialFormState: ResetPasswordFormState = {
  password: "",
  confirmPassword: "",
};

export function ResetPasswordForm() {
  const [formState, setFormState] = useState(initialFormState);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const { toast } = useToast();

  const email = searchParams.get("email") || "";

  const checkResults = useMemo(
    () => passwordChecks.map((check) => check.test(formState.password)),
    [formState.password],
  );

  const strengthScore = checkResults.filter(Boolean).length;
  const strengthPercent = (strengthScore / passwordChecks.length) * 100;
  
  const strengthConfig = {
    0: { label: "FRACA", color: "text-red-400", barColor: "bg-red-400" },
    1: { label: "FRACA", color: "text-red-400", barColor: "bg-red-400" },
    2: { label: "MÉDIA", color: "text-yellow-400", barColor: "bg-yellow-400" },
    3: { label: "FORTE", color: "text-emerald-400", barColor: "bg-emerald-400" },
    4: { label: "FORTE", color: "text-emerald-400", barColor: "bg-emerald-400" },
  }[strengthScore] || { label: "", color: "text-white/45", barColor: "bg-white/10" };
  
  const hasPasswordInput = formState.password.length > 0;

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrors({});
    setIsSubmitting(true);

    try {
      const validatedData = resetPasswordSchema.parse(formState);
      
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      toast({
        title: "Senha redefinida com sucesso!",
        description: "Você será redirecionado para o login.",
        variant: "success",
      });
      
      console.log("Senha redefinida:", validatedData);
      
      setTimeout(() => {
        router.push("/login");
      }, 2000);
      
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
          title: "Erro ao redefinir senha",
          description: "Verifique os campos destacados e tente novamente.",
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
            src="/logo/logo+name.svg"
            alt="VozJusta"
            width={165}
            height={34}
            priority
          />
        </div>

        <div className="rounded-2xl sm:rounded-3xl border border-white/8 bg-[#071735]/80 p-6 sm:p-8 shadow-[0_20px_80px_rgba(0,0,0,0.25)] backdrop-blur-sm">
          <div className="space-y-2 mb-6 sm:mb-8">
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
              Nova senha
            </h1>
            <p className="text-sm sm:text-base text-white/60">
              Crie uma nova senha forte para proteger sua conta.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <Input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              autoComplete="new-password"
              value={formState.password}
              onChange={(e) =>
                setFormState((current) => ({
                  ...current,
                  password: e.target.value,
                }))
              }
              label="NOVA SENHA"
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

            <Input
              id="confirmPassword"
              name="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              autoComplete="new-password"
              value={formState.confirmPassword}
              onChange={(e) =>
                setFormState((current) => ({
                  ...current,
                  confirmPassword: e.target.value,
                }))
              }
              label="CONFIRME A NOVA SENHA"
              placeholder="••••••••"
              leftIcon={<LockOutline fontSize="small" aria-hidden="true" />}
              rightIcon={
                <button
                  type="button"
                  aria-label={showConfirmPassword ? "Ocultar senha" : "Mostrar senha"}
                  aria-pressed={showConfirmPassword}
                  onClick={() => setShowConfirmPassword((current) => !current)}
                  className="inline-flex text-white/60 transition-colors hover:text-white"
                >
                  {showConfirmPassword ? (
                    <VisibilityOff fontSize="small" aria-hidden="true" />
                  ) : (
                    <Visibility fontSize="small" aria-hidden="true" />
                  )}
                </button>
              }
              error={errors.confirmPassword}
              containerClassName="space-y-2"
              className="h-12 rounded-xl border-white/10 bg-[#05112A] text-sm text-white placeholder:text-white/35 focus:ring-primary"
            />

            {hasPasswordInput && (
              <section className="rounded-xl border border-white/10 bg-[#05112A] px-4 py-3">
                <header className="mb-2 flex items-center justify-between">
                  <h3 className="text-xs font-semibold uppercase tracking-[0.12em] text-white/55">
                    Força da segurança
                  </h3>
                  <p className={cn("text-xs font-semibold", strengthConfig.color)}>
                    {strengthConfig.label}
                  </p>
                </header>

                <div className="h-1.5 rounded-full bg-white/10">
                  <div
                    aria-hidden="true"
                    className={cn(
                      "h-full rounded-full transition-all duration-300",
                      strengthConfig.barColor,
                    )}
                    style={{ width: `${strengthPercent}%` }}
                  />
                </div>

                <ul className="mt-3 grid grid-cols-2 gap-2">
                  {passwordChecks.map((check, index) => (
                    <li
                      key={check.id}
                      className={cn(
                        "text-xs flex items-center gap-1.5",
                        checkResults[index] ? strengthConfig.color : "text-white/45",
                      )}
                    >
                      <span className={cn(
                        "inline-flex h-4 w-4 items-center justify-center rounded-full text-[10px]",
                        checkResults[index] ? "bg-current/20" : "bg-white/5"
                      )}>
                        {checkResults[index] ? "✓" : "○"}
                      </span>
                      {check.label}
                    </li>
                  ))}
                </ul>
              </section>
            )}

            <Button
              type="submit"
              variant="primary"
              size="lg"
              fullWidth
              loading={isSubmitting}
              className="rounded-xl text-sm sm:text-base"
            >
              Redefinir senha
              <ArrowForward fontSize="small" className="ml-2" />
            </Button>

            <div className="text-center">
              <Link
                href="/login"
                className="text-xs sm:text-sm text-primary hover:text-primary/80 transition-colors"
              >
                Voltar para o login
              </Link>
            </div>
          </form>
        </div>
      </section>
    </main>
  );
}
