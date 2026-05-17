"use client";

import { FormEvent, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { ZodError } from "zod";
import {
  PersonOutline,
  Badge,
  Gavel,
  LockOutline,
  Visibility,
  VisibilityOff,
  CheckRounded,
  CloseRounded,
} from "@mui/icons-material";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/components/ui/toast/toast-provider";
import { cn } from "@/lib/utils";
import { authService, AuthServiceError } from "@/services/auth.service";
import { passwordChecks, brazilianStates, specializationOptions } from "./constants";
import { lawyerSignupSchema } from "./lawyer-signup.schema";
import { useRouter } from "next/navigation";

type LawyerSignupFormState = {
  fullName: string;
  cpf: string;
  email: string;
  phone: string;
  oabNumber: string;
  oabState: string;
  specialty: string;
  password: string;
  acceptedTerms: boolean;
};

const initialFormState: LawyerSignupFormState = {
  fullName: "",
  cpf: "",
  email: "",
  phone: "",
  oabNumber: "",
  oabState: "",
  specialty: "",
  password: "",
  acceptedTerms: false,
};

const formatPhone = (value: string) => {
  const digits = value.replace(/\D/g, "");
  if (digits.length <= 10) {
    return digits
      .replace(/(\d{2})(\d)/, "($1) $2")
      .replace(/(\d{4})(\d)/, "$1-$2")
      .slice(0, 14);
  }
  return digits
    .replace(/(\d{2})(\d)/, "($1) $2")
    .replace(/(\d{5})(\d)/, "$1-$2")
    .slice(0, 15);
};

const formatCpfCnpj = (value: string) => {
  const digits = value.replace(/\D/g, "");
  
  if (digits.length <= 11) {
    return digits
      .slice(0, 11)
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d{1,2})$/, "$1-$2");
  }
  
  return digits
    .slice(0, 14)
    .replace(/(\d{2})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d)/, "$1/$2")
    .replace(/(\d{4})(\d{1,2})$/, "$1-$2");
};

const formatOabNumber = (value: string) => {
  return value.replace(/\D/g, "").slice(0, 6);
};

export function LawyerSignupForm() {
  const router = useRouter();
  const isSubmittingRef = useRef(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formState, setFormState] = useState(initialFormState);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

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
  }[strengthScore] || { label: "", color: "text-white/45", barColor: "bg-white/10" };
  
  const hasPasswordInput = formState.password.length > 0;

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (isSubmittingRef.current) {
      return;
    }

    isSubmittingRef.current = true;
    setErrors({});
    setIsSubmitting(true);

    try {
      const validatedData = lawyerSignupSchema.parse(formState);
      
      const cleanPhone = validatedData.phone?.replace(/\D/g, "") || "";
      const formattedPhone = cleanPhone.replace(/^(\d{2})(\d{5})(\d{4})$/, "$1 $2-$3");

      const rawDigits = validatedData.cpf.replace(/\D/g, "");
      const isCnpj = rawDigits.length > 11;
      const signupData = {
        fullName: validatedData.fullName,
        ...(isCnpj ? { cnpj: validatedData.cpf } : { cpf: validatedData.cpf }),
        phone: formattedPhone,
        email: validatedData.email,
        password: validatedData.password,
        oabNumber: validatedData.oabNumber,
        oabState: validatedData.oabState,
        specialization: validatedData.specialty,
      };

      const signupResponse = await authService.signupLawyer(signupData);

      if (signupResponse.securityToken) {
        sessionStorage.setItem("pending_verification_token", signupResponse.securityToken);
      }
      
      const sendCodeResponse = await authService.sendEmailVerificationCode(
        validatedData.email,
        signupResponse.securityToken
      );

      if (sendCodeResponse.securityToken) {
        sessionStorage.setItem("pending_verification_token", sendCodeResponse.securityToken);
      }

      toast({
        title: "Cadastro realizado com sucesso!",
        description: "Enviamos um código para seu e-mail para concluir o acesso.",
        variant: "success",
      });
      
      setTimeout(() => {
        router.push(`/verificacao/email?email=${encodeURIComponent(validatedData.email)}&type=signup&role=lawyer`);
      }, 1500);
      
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
          title: "Erro no cadastro",
          description: "Verifique os campos destacados e tente novamente.",
          variant: "error",
        });
      } else if (error instanceof AuthServiceError) {
        toast({
          title: "Erro no cadastro",
          description: error.message,
          variant: "error",
        });
      } else {
        toast({
          title: "Erro no cadastro",
          description: "Ocorreu um erro inesperado. Tente novamente.",
          variant: "error",
        });
      }
    } finally {
      isSubmittingRef.current = false;
      setIsSubmitting(false);
    }
  };

  return (
    <section className="mx-auto w-full max-w-xl rounded-3xl border border-white/8 bg-[#071735]/80 p-6 shadow-[0_20px_80px_rgba(0,0,0,0.25)] backdrop-blur-sm sm:p-8 lg:mx-0">
      <div className="space-y-2">
        <h2 className="text-4xl font-bold tracking-tight text-white">Crie sua conta profissional</h2>
        <p className="text-base text-white/60">
          Preencha os dados da sua licença OAB para continuar.
        </p>
      </div>

      <form className="mt-8" onSubmit={handleSubmit} noValidate>
        <fieldset className="space-y-5">

          <Input
            id="fullName"
            name="fullName"
            autoComplete="name"
            value={formState.fullName}
            onChange={(event) =>
              setFormState((current) => ({
                ...current,
                fullName: event.target.value,
              }))
            }
            label="NOME COMPLETO (CONFORME OAB)"
            placeholder="Ex: Dr. Roberto Santos"
            leftIcon={<PersonOutline fontSize="small" aria-hidden="true" />}
            error={errors.fullName}
            containerClassName="space-y-2"
            className="h-12 rounded-xl border-white/10 bg-[#05112A] text-sm text-white placeholder:text-white/35 focus:ring-primary"
          />

          <Input
            id="cpf"
            name="cpf"
            autoComplete="off"
            inputMode="numeric"
            value={formState.cpf}
            onChange={(event) =>
              setFormState((current) => ({
                ...current,
                cpf: formatCpfCnpj(event.target.value),
              }))
            }
            label="CPF/CNPJ"
            placeholder="000.000.000-00"
            leftIcon={<Badge fontSize="small" aria-hidden="true" />}
            error={errors.cpf}
            containerClassName="space-y-2"
            className="h-12 rounded-xl border-white/10 bg-[#05112A] text-sm text-white placeholder:text-white/35 focus:ring-primary"
          />

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
            placeholder="roberto@advocacia.com.br"
            error={errors.email}
            containerClassName="space-y-2"
            className="h-12 rounded-xl border-white/10 bg-[#05112A] text-sm text-white placeholder:text-white/35 focus:ring-primary"
          />

          <Input
            id="phone"
            name="phone"
            autoComplete="tel"
            inputMode="numeric"
            value={formState.phone}
            onChange={(event) =>
              setFormState((current) => ({
                ...current,
                phone: formatPhone(event.target.value),
              }))
            }
            label="TELEFONE/CELULAR"
            placeholder="(11) 99999-9999"
            error={errors.phone}
            containerClassName="space-y-2"
            className="h-12 rounded-xl border-white/10 bg-[#05112A] text-sm text-white placeholder:text-white/35 focus:ring-primary"
          />

          <section className="flex flex-col lg:flex-row w-full gap-2">
            <Input
              id="oabNumber"
              name="oabNumber"
              autoComplete="off"
              inputMode="numeric"
              value={formState.oabNumber}
              onChange={(event) =>
                setFormState((current) => ({
                  ...current,
                  oabNumber: formatOabNumber(event.target.value),
                }))
              }
              label="NÚMERO OAB"
              placeholder="123456"
              leftIcon={<Gavel fontSize="small" aria-hidden="true" />}
              error={errors.oabNumber}
              containerClassName="space-y-2"
              className="h-12 rounded-xl border-white/10 bg-[#05112A] text-sm text-white placeholder:text-white/35 focus:ring-primary"
            />

            <Select
              id="oabState"
              name="oabState"
              value={formState.oabState}
              onChange={(event) =>
                setFormState((current) => ({
                  ...current,
                  oabState: event.target.value,
                }))
              }
              label="UF"
              options={[...brazilianStates]}
              placeholder="Selecione o estado"
              error={errors.oabState}
              containerClassName="space-y-2"
              className="h-12 rounded-xl w-full border-white/10 bg-[#05112A] text-sm text-white placeholder:text-white/35 focus:ring-primary"
            />
          </section>

          <Select
            id="specialty"
            name="specialty"
            value={formState.specialty}
            onChange={(event) =>
              setFormState((current) => ({
                ...current,
                specialty: event.target.value,
              }))
            }
            label="ESPECIALIDADE"
            options={[...specializationOptions]}
            placeholder="Selecione sua especialidade"
            error={errors.specialty}
            containerClassName="space-y-2"
            className="h-12 rounded-xl w-full border-white/10 bg-[#05112A] text-sm text-white placeholder:text-white/35 focus:ring-primary"
          />

          <Input
            id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              autoComplete="new-password"
              value={formState.password}
              onChange={(event) =>
                setFormState((current) => ({
                  ...current,
                  password: event.target.value,
                }))
              }
              label="SENHA DE ACESSO"
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

          {hasPasswordInput && (
              <section className="rounded-xl border border-white/10 bg-[#05112A] px-4 py-3">
                <header className="mb-2 flex items-center justify-between">
                  <h3 className="text-xs font-semibold uppercase tracking-[0.12em] text-white/55">
                    Segurança da senha
                  </h3>
                  <p className={cn("text-xs font-semibold", strengthConfig.color)}>
                    {strengthConfig.label}
                  </p>
                </header>

                <p className="h-1.5 rounded-full bg-white/10">
                  <span
                    aria-hidden="true"
                    className={cn(
                      "block h-full rounded-full transition-all duration-300",
                      strengthConfig.barColor,
                    )}
                    style={{ width: `${strengthPercent}%` }}
                  />
                </p>

                <ul className="mt-3 flex flex-wrap gap-x-4 gap-y-2">
                  {passwordChecks.map((check, index) => (
                    <li
                      key={check.id}
                      className={cn(
                        "flex items-center gap-1 text-xs",
                        checkResults[index] ? strengthConfig.color : "text-white/45",
                      )}
                    >
                      {checkResults[index]
                        ? <CheckRounded sx={{ fontSize: 12 }} aria-hidden />
                        : <CloseRounded sx={{ fontSize: 12 }} aria-hidden />
                      }
                      {check.label}
                    </li>
                  ))}
                </ul>
              </section>
            )}

          <Checkbox
            name="terms"
            checked={formState.acceptedTerms}
            onChange={(event) =>
              setFormState((current) => ({
                ...current,
                acceptedTerms: event.target.checked,
              }))
            }
            error={errors.acceptedTerms}
          >
            Li e concordo com os{" "}
            <Link href="/termos" className="text-primary underline hover:text-primary/80">
              Termos de Uso
            </Link>.
          </Checkbox>

          <Button
            type="submit"
            variant="primary"
            size="lg"
            fullWidth
            loading={isSubmitting}
            className="mt-2 rounded-xl"
          >
            Cadastrar
          </Button>

          <p className="text-center text-sm text-white/45">
            Já possui registro?{" "}
            <Link href="/login" className="font-semibold text-primary hover:text-primary/80">
              Fazer Login
            </Link>
          </p>
        </fieldset>
      </form>
    </section>
  );
}
