"use client";

import { FormEvent, useMemo, useRef, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ZodError } from "zod";
import {
  Badge,
  Phone,
  LockOutline,
  Visibility,
  VisibilityOff,
  CheckRounded,
  CloseRounded,
  Gavel,
  LocationOn,
  WorkOutline,
} from "@mui/icons-material";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/toast/toast-provider";
import { cn } from "@/lib/utils";
import { authService, AuthServiceError } from "@/services/auth.service";
import { authStorage } from "@/lib/auth";
import {
  completeRegisterLawyerSchema,
  OAB_STATES,
  SPECIALIZATIONS,
  type CompleteRegisterLawyerFormData,
} from "./complete-register-lawyer.schema";

const PASSWORD_CHECKS = [
  { id: "length", label: "8+ caracteres", test: (p: string) => p.length >= 8 },
  { id: "upper", label: "Maiúscula", test: (p: string) => /[A-ZÀ-Ý]/.test(p) },
  { id: "symbol", label: "Símbolo", test: (p: string) => /[^\p{L}\p{N}\s]/u.test(p) },
];

const formatCpf = (value: string) => {
  const digits = value.replace(/\D/g, "").slice(0, 11);
  return digits
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d{1,2})$/, "$1-$2");
};

const formatPhone = (value: string) => {
  const digits = value.replace(/\D/g, "").slice(0, 11);
  return digits
    .replace(/^(\d{2})(\d)/, "($1) $2")
    .replace(/(\d{5})(\d{1,4})$/, "$1-$2");
};

type FormState = CompleteRegisterLawyerFormData;

const initialState: FormState = {
  cpf: "",
  oabNumber: "",
  oabState: "",
  specialization: "",
  phone: "",
  password: "",
  confirmPassword: "",
};

export function CompleteRegisterLawyerForm() {
  const router = useRouter();
  const { toast } = useToast();
  const isSubmittingRef = useRef(false);
  const [formState, setFormState] = useState<FormState>(initialState);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [securityToken, setSecurityToken] = useState("");
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const token =
      sessionStorage.getItem("pending_google_token") ||
      authStorage.getSecurityToken() ||
      "";
    const name = sessionStorage.getItem("pending_google_name") || "";

    if (!token) {
      router.replace("/login?error=session_expired");
      return;
    }

    // eslint-disable-next-line react-hooks/set-state-in-effect
    setSecurityToken(token);
    setUserName(name);
  }, [router]);

  const checkResults = useMemo(
    () => PASSWORD_CHECKS.map((c) => c.test(formState.password)),
    [formState.password]
  );

  const strengthScore = checkResults.filter(Boolean).length;
  const strengthPercent = (strengthScore / PASSWORD_CHECKS.length) * 100;
  const strengthConfig =
    ({
      0: { label: "Fraca", color: "text-red-400", barColor: "bg-red-400" },
      1: { label: "Fraca", color: "text-red-400", barColor: "bg-red-400" },
      2: { label: "Média", color: "text-yellow-400", barColor: "bg-yellow-400" },
      3: { label: "Forte", color: "text-emerald-400", barColor: "bg-emerald-400" },
    } as Record<number, { label: string; color: string; barColor: string }>)[strengthScore] ??
    { label: "", color: "text-white/45", barColor: "bg-white/10" };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (isSubmittingRef.current) return;
    isSubmittingRef.current = true;
    setErrors({});
    setIsSubmitting(true);

    try {
      const validated = completeRegisterLawyerSchema.parse(formState);

      const cleanPhone = validated.phone.replace(/\D/g, "");
      const formattedPhone = cleanPhone.replace(/^(\d{2})(\d{5})(\d{4})$/, "$1 $2-$3");

      await authService.completeRegistrationLawyer(
        {
          cpf: validated.cpf,
          oabNumber: validated.oabNumber,
          oabState: validated.oabState,
          specialization: validated.specialization,
          phone: formattedPhone,
          password: validated.password,
        },
        securityToken
      );

      const email = sessionStorage.getItem("pending_google_email") ?? "";
      const role = sessionStorage.getItem("pending_google_role") ?? "lawyer";

      sessionStorage.removeItem("pending_google_token");
      sessionStorage.removeItem("pending_google_role");
      sessionStorage.removeItem("pending_google_email");
      sessionStorage.removeItem("pending_google_name");

      const sendResponse = await authService.sendEmailVerificationCode(email, securityToken);
      // Usa o token rotacionado da resposta, ou cai de volta no token OAuth original.
      const verificationToken = sendResponse.securityToken || securityToken;
      if (verificationToken) {
        sessionStorage.setItem("pending_verification_token", verificationToken);
      }

      router.replace(
        `/verificacao/email?email=${encodeURIComponent(email)}&type=login&role=${role}`
      );
    } catch (error) {
      if (error instanceof ZodError) {
        const fieldErrors: Record<string, string> = {};
        error.issues.forEach((e) => {
          if (e.path[0]) fieldErrors[e.path[0].toString()] = e.message;
        });
        setErrors(fieldErrors);

        toast({
          title: "Erro no formulário",
          description: "Verifique os campos destacados e tente novamente.",
          variant: "error",
        });
      } else if (error instanceof AuthServiceError) {
        toast({
          title: "Erro ao concluir cadastro",
          description: error.message,
          variant: "error",
        });
      } else {
        toast({
          title: "Erro inesperado",
          description: "Não foi possível concluir o cadastro. Tente novamente.",
          variant: "error",
        });
      }
    } finally {
      isSubmittingRef.current = false;
      setIsSubmitting(false);
    }
  };

  const set = (field: keyof FormState) => (value: string) =>
    setFormState((prev) => ({ ...prev, [field]: value }));

  return (
    <section className="mx-auto w-full max-w-xl rounded-3xl border border-white/8 bg-[#071735]/80 p-6 shadow-[0_20px_80px_rgba(0,0,0,0.25)] backdrop-blur-sm sm:p-8 lg:mx-0">
      <div className="space-y-2">
        <h2 className="text-4xl font-bold tracking-tight text-white">
          Complete seu cadastro
        </h2>
        <p className="text-base text-white/60">
          {userName ? `Olá, ${userName}! ` : ""}Precisamos de mais algumas informações para finalizar sua conta de advogado.
        </p>
      </div>

      <form className="mt-8" onSubmit={handleSubmit} noValidate>
        <fieldset className="space-y-5">
          <Input
            id="cpf"
            name="cpf"
            autoComplete="off"
            inputMode="numeric"
            value={formState.cpf}
            onChange={(e) => set("cpf")(formatCpf(e.target.value))}
            label="CPF"
            placeholder="000.000.000-00"
            leftIcon={<Badge fontSize="small" aria-hidden="true" />}
            error={errors.cpf}
            containerClassName="space-y-2"
            className="h-12 rounded-xl border-white/10 bg-[#05112A] text-sm text-white placeholder:text-white/35 focus:ring-primary"
          />

          <section className="grid gap-4 sm:grid-cols-2">
            <Input
              id="oabNumber"
              name="oabNumber"
              autoComplete="off"
              inputMode="numeric"
              value={formState.oabNumber}
              onChange={(e) =>
                set("oabNumber")(e.target.value.replace(/\D/g, "").slice(0, 6))
              }
              label="NÚMERO OAB"
              placeholder="123456"
              leftIcon={<Gavel fontSize="small" aria-hidden="true" />}
              error={errors.oabNumber}
              containerClassName="space-y-2"
              className="h-12 rounded-xl border-white/10 bg-[#05112A] text-sm text-white placeholder:text-white/35 focus:ring-primary"
            />

            <div className="space-y-2">
              <label
                htmlFor="oabState"
                className="block text-xs font-semibold uppercase tracking-[0.12em] text-white/70"
              >
                UF OAB
              </label>
              <div className="relative flex h-12 items-center rounded-xl border border-white/10 bg-[#05112A] px-3 focus-within:ring-2 focus-within:ring-primary">
                <LocationOn
                  fontSize="small"
                  className="mr-2 shrink-0 text-white/40"
                  aria-hidden="true"
                />
                <select
                  id="oabState"
                  name="oabState"
                  value={formState.oabState}
                  onChange={(e) => set("oabState")(e.target.value)}
                  className="w-full bg-transparent text-sm text-white outline-none placeholder:text-white/35 [&>option]:bg-[#071735]"
                >
                  <option value="">Selecione</option>
                  {OAB_STATES.map((uf) => (
                    <option key={uf} value={uf}>
                      {uf}
                    </option>
                  ))}
                </select>
              </div>
              {errors.oabState && (
                <p className="text-xs text-red-400">{errors.oabState}</p>
              )}
            </div>
          </section>

          <div className="space-y-2">
            <label
              htmlFor="specialization"
              className="block text-xs font-semibold uppercase tracking-[0.12em] text-white/70"
            >
              ESPECIALIDADE
            </label>
            <div className="relative flex h-12 items-center rounded-xl border border-white/10 bg-[#05112A] px-3 focus-within:ring-2 focus-within:ring-primary">
              <WorkOutline
                fontSize="small"
                className="mr-2 shrink-0 text-white/40"
                aria-hidden="true"
              />
              <select
                id="specialization"
                name="specialization"
                value={formState.specialization}
                onChange={(e) => set("specialization")(e.target.value)}
                className="w-full bg-transparent text-sm text-white outline-none [&>option]:bg-[#071735]"
              >
                <option value="">Selecione</option>
                {SPECIALIZATIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>
            {errors.specialization && (
              <p className="text-xs text-red-400">{errors.specialization}</p>
            )}
          </div>

          <Input
            id="phone"
            name="phone"
            autoComplete="tel-national"
            inputMode="tel"
            value={formState.phone}
            onChange={(e) => set("phone")(formatPhone(e.target.value))}
            label="TELEFONE"
            placeholder="(00) 00000-0000"
            leftIcon={<Phone fontSize="small" aria-hidden="true" />}
            error={errors.phone}
            containerClassName="space-y-2"
            className="h-12 rounded-xl border-white/10 bg-[#05112A] text-sm text-white placeholder:text-white/35 focus:ring-primary"
          />

          <Input
            id="password"
            name="password"
            type={showPassword ? "text" : "password"}
            autoComplete="new-password"
            value={formState.password}
            onChange={(e) => set("password")(e.target.value)}
            label="SENHA"
            placeholder="••••••••"
            leftIcon={<LockOutline fontSize="small" aria-hidden="true" />}
            rightIcon={
              <button
                type="button"
                aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
                aria-pressed={showPassword}
                onClick={() => setShowPassword((v) => !v)}
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

          {formState.password.length > 0 && (
            <section className="rounded-xl border border-white/10 bg-[#05112A] px-4 py-3">
              <header className="mb-2 flex items-center justify-between">
                <h3 className="text-xs font-semibold uppercase tracking-[0.12em] text-white/55">
                  Força da senha
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
                    strengthConfig.barColor
                  )}
                  style={{ width: `${strengthPercent}%` }}
                />
              </p>
              <ul className="mt-3 flex flex-wrap gap-x-4 gap-y-2">
                {PASSWORD_CHECKS.map((check, i) => (
                  <li
                    key={check.id}
                    className={cn(
                      "flex items-center gap-1 text-xs",
                      checkResults[i] ? strengthConfig.color : "text-white/45"
                    )}
                  >
                    {checkResults[i] ? (
                      <CheckRounded sx={{ fontSize: 12 }} aria-hidden />
                    ) : (
                      <CloseRounded sx={{ fontSize: 12 }} aria-hidden />
                    )}
                    {check.label}
                  </li>
                ))}
              </ul>
            </section>
          )}

          <Input
            id="confirmPassword"
            name="confirmPassword"
            type={showConfirm ? "text" : "password"}
            autoComplete="new-password"
            value={formState.confirmPassword}
            onChange={(e) => set("confirmPassword")(e.target.value)}
            label="CONFIRMAR SENHA"
            placeholder="••••••••"
            leftIcon={<LockOutline fontSize="small" aria-hidden="true" />}
            rightIcon={
              <button
                type="button"
                aria-label={showConfirm ? "Ocultar senha" : "Mostrar senha"}
                aria-pressed={showConfirm}
                onClick={() => setShowConfirm((v) => !v)}
                className="inline-flex text-white/60 transition-colors hover:text-white"
              >
                {showConfirm ? (
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

          <Button
            type="submit"
            variant="primary"
            size="lg"
            fullWidth
            loading={isSubmitting}
            className="mt-2 rounded-xl"
          >
            Concluir cadastro
          </Button>
        </fieldset>
      </form>
    </section>
  );
}
