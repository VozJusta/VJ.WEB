"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowBackRounded, LockResetRounded, Visibility, VisibilityOff } from "@mui/icons-material";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { userService } from "@/services/user.service";
import { useToast } from "@/components/ui/toast/toast-provider";
import { cn } from "@/lib/utils";

const passwordChecks = [
  { id: "length", label: "8+ chars", test: (v: string) => v.length >= 8 },
  { id: "uppercase", label: "Maiúscula", test: (v: string) => /[A-ZÀ-Ý]/.test(v) },
  { id: "lowercase", label: "Minúscula", test: (v: string) => /[a-zà-ÿ]/.test(v) },
  { id: "symbol", label: "Símbolo", test: (v: string) => /[^\p{L}\p{N}\s]/u.test(v) },
] as const;

export function ChangePasswordFeature() {
  const router = useRouter();
  const { toast } = useToast();
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const checkResults = useMemo(
    () => passwordChecks.map((c) => c.test(newPassword)),
    [newPassword],
  );
  const strengthScore = checkResults.filter(Boolean).length;
  const strengthPercent = (strengthScore / passwordChecks.length) * 100;
  const strengthConfig = {
    0: { label: "FRACA", color: "text-red-400", barColor: "bg-red-400" },
    1: { label: "FRACA", color: "text-red-400", barColor: "bg-red-400" },
    2: { label: "MÉDIA", color: "text-yellow-400", barColor: "bg-yellow-400" },
    3: { label: "FORTE", color: "text-emerald-400", barColor: "bg-emerald-400" },
    4: { label: "MUITO FORTE", color: "text-emerald-400", barColor: "bg-emerald-400" },
  }[strengthScore] ?? { label: "", color: "text-white/45", barColor: "bg-white/10" };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentPassword.trim() || !newPassword.trim()) return;
    if (strengthScore < 3) {
      toast({ title: "Senha fraca", description: "Sua nova senha não atende aos requisitos mínimos.", variant: "error" });
      return;
    }
    setIsSaving(true);
    try {
      await userService.changePassword(currentPassword, newPassword);
      toast({ title: "Senha alterada!", description: "Sua senha foi atualizada com sucesso.", variant: "success" });
      router.push("/dashboard/configuracoes");
    } catch (err) {
      toast({
        title: "Erro ao alterar senha",
        description: err instanceof Error ? err.message : "Verifique a senha atual e tente novamente.",
        variant: "error",
      });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="flex flex-col items-center gap-5 w-full max-w-2xl mx-auto px-4 py-6 md:px-0 md:py-8">
      <div className="w-full flex items-center gap-3">
        <button
          type="button"
          onClick={() => router.back()}
          aria-label="Voltar"
          className="flex items-center justify-center w-9 h-9 rounded-lg text-white/50 hover:text-white hover:bg-white/08 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2585F4]"
        >
          <ArrowBackRounded fontSize="small" aria-hidden />
        </button>
        <h1 className="text-xs font-semibold tracking-widest uppercase text-[#2585F4]">
          Alterar Senha
        </h1>
      </div>

      <form
        onSubmit={handleSubmit}
        className="w-full rounded-2xl bg-[#111c30] border-2 border-[#1B2233] p-6 flex flex-col gap-5"
      >
        <div className="flex items-center gap-3 mb-1">
          <span className="flex items-center justify-center w-10 h-10 rounded-xl bg-[#2585F4]/15">
            <LockResetRounded className="text-[#2585F4]" fontSize="small" />
          </span>
          <div>
            <p className="text-sm font-semibold text-white">Segurança da Conta</p>
            <p className="text-xs text-white/45">Defina uma nova senha segura</p>
          </div>
        </div>

        <Input
          id="current-password"
          type={showCurrent ? "text" : "password"}
          label="Senha Atual"
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
          placeholder="••••••••"
          rightIcon={
            <button
              type="button"
              onClick={() => setShowCurrent((v) => !v)}
              aria-label={showCurrent ? "Ocultar senha" : "Mostrar senha"}
              className="text-white/40 hover:text-white/70 transition-colors"
            >
              {showCurrent ? <VisibilityOff fontSize="small" /> : <Visibility fontSize="small" />}
            </button>
          }
        />

        <Input
          id="new-password"
          type={showNew ? "text" : "password"}
          label="Nova Senha"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          placeholder="••••••••"
          rightIcon={
            <button
              type="button"
              onClick={() => setShowNew((v) => !v)}
              aria-label={showNew ? "Ocultar senha" : "Mostrar senha"}
              className="text-white/40 hover:text-white/70 transition-colors"
            >
              {showNew ? <VisibilityOff fontSize="small" /> : <Visibility fontSize="small" />}
            </button>
          }
        />

        {newPassword.length > 0 && (
          <section className="rounded-xl border border-white/10 bg-[#0d1526] px-4 py-3">
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
                aria-hidden
                className={cn("block h-full rounded-full transition-all duration-300", strengthConfig.barColor)}
                style={{ width: `${strengthPercent}%` }}
              />
            </p>
            <ul className="mt-3 flex flex-wrap gap-x-4 gap-y-2">
              {passwordChecks.map((check, index) => (
                <li
                  key={check.id}
                  className={cn("text-xs", checkResults[index] ? strengthConfig.color : "text-white/45")}
                >
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
          loading={isSaving}
          disabled={!currentPassword.trim() || !newPassword.trim() || isSaving}
        >
          Salvar Nova Senha
        </Button>
      </form>
    </div>
  );
}
