"use client";

import { FormEvent, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ZodError } from "zod";
import {
    AlternateEmail,
    Badge,
    PersonOutline,
    Phone,
    LockOutline,
    Visibility,
    VisibilityOff,
} from "@mui/icons-material";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/components/ui/toast/toast-provider";
import { cn } from "@/lib/utils";
import { passwordChecks } from "./constants";
import { citizenSignupSchema } from "./citizen-signup.schema";
import { authService, AuthServiceError } from "@/services/auth.service";
import { saveVerificationSecurityToken } from "@/features/auth/verification/verification-session";

type CitizenSignupFormState = {
    fullName: string;
    cpf: string;
    phone: string;
    email: string;
    password: string;
    acceptedTerms: boolean;
};

const initialFormState: CitizenSignupFormState = {
    fullName: "",
    cpf: "",
    phone: "",
    email: "",
    password: "",
    acceptedTerms: false,
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

const formatPhone = (value: string) => {
    const digits = value.replace(/\D/g, "").slice(0, 11);

    return digits
        .replace(/^(\d{2})(\d)/, "($1) $2")
        .replace(/(\d{5})(\d{1,4})$/, "$1-$2");
};

export function CitizenSignupForm() {
    const router = useRouter();
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
        setErrors({});
        setIsSubmitting(true);

        try {
            const validatedData = citizenSignupSchema.parse(formState);

            const cleanPhone = validatedData.phone.replace(/\D/g, "");
            const formattedPhone = cleanPhone.replace(/^(\d{2})(\d{5})(\d{4})$/, "$1 $2-$3");

            const signupData = {
                fullName: validatedData.fullName,
                cpf: validatedData.cpf,
                phone: formattedPhone,
                email: validatedData.email,
                password: validatedData.password,
            };

            const signupResponse = await authService.signupCitizen(signupData);

            if (signupResponse.securityToken) {
                saveVerificationSecurityToken(validatedData.email, "signup", signupResponse.securityToken);
            }

            const sendCodeResponse = await authService.sendEmailVerificationCode(
                validatedData.email,
                signupResponse.securityToken,
            );
            saveVerificationSecurityToken(validatedData.email, "signup", sendCodeResponse.securityToken);

            toast({
                title: "Cadastro realizado com sucesso!",
                description: "Enviamos um código para seu e-mail para concluir o acesso.",
                variant: "success",
            });

            setTimeout(() => {
                router.push(`/verificacao/email?email=${encodeURIComponent(validatedData.email)}&type=signup`);
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
            setIsSubmitting(false);
        }
    };

    return (
        <section className="mx-auto w-full max-w-xl rounded-3xl border border-white/8 bg-[#071735]/80 p-6 shadow-[0_20px_80px_rgba(0,0,0,0.25)] backdrop-blur-sm sm:p-8 lg:mx-0">
            <div className="space-y-2">
                <h2 className="text-4xl font-bold tracking-tight text-white">Crie sua conta</h2>
                <p className="text-base text-white/60">
                    Preencha seus dados para acessar a plataforma.
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
                        label="NOME COMPLETO"
                        placeholder="Ex: João Silva"
                        leftIcon={<PersonOutline fontSize="small" aria-hidden="true" />}
                        error={errors.fullName}
                        containerClassName="space-y-2"
                        className="h-12 rounded-xl border-white/10 bg-[#05112A] text-sm text-white placeholder:text-white/35 focus:ring-primary"
                    />

                    <section className="grid gap-4 sm:grid-cols-2">
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
                            id="phone"
                            name="phone"
                            autoComplete="tel-national"
                            inputMode="tel"
                            value={formState.phone}
                            onChange={(event) =>
                                setFormState((current) => ({
                                    ...current,
                                    phone: formatPhone(event.target.value),
                                }))
                            }
                            label="TELEFONE"
                            placeholder="(00) 00000-0000"
                            leftIcon={<Phone fontSize="small" aria-hidden="true" />}
                            error={errors.phone}
                            containerClassName="space-y-2"
                            className="h-12 rounded-xl border-white/10 bg-[#05112A] text-sm text-white placeholder:text-white/35 focus:ring-primary"
                        />
                    </section>

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
                        placeholder="email@exemplo.com.br"
                        leftIcon={<AlternateEmail fontSize="small" aria-hidden="true" />}
                        error={errors.email}
                        containerClassName="space-y-2"
                        className="h-12 rounded-xl border-white/10 bg-[#05112A] text-sm text-white placeholder:text-white/35 focus:ring-primary"
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
                                            "text-xs",
                                            checkResults[index] ? strengthConfig.color : "text-white/45",
                                        )}
                                    >
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
                        <Link href="/termos-de-uso" className="text-primary underline hover:text-primary/80">
                            Termos de Uso
                        </Link>{" "}
                        e a{" "}
                        <Link
                            href="/politica-de-privacidade"
                            className="text-primary underline hover:text-primary/80"
                        >
                            Política de Privacidade
                        </Link>
                        .
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
