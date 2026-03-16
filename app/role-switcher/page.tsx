"use client";

import { useAuth } from "@/contexts/auth-context";
import { useRouter } from "next/navigation";
import { PersonRounded, GavelRounded } from "@mui/icons-material";

export default function RoleSwitcherPage() {
  const { user, setRole } = useAuth();
  const router = useRouter();

  const handleSelectRole = (role: "citizen" | "lawyer") => {
    setRole(role);

    if (role === "lawyer") {
      router.push("/(lawyer)/dashboard");
    } else {
      router.push("/dashboard");
    }
  };

  return (
    <div className="layout-bg flex min-h-screen items-center justify-center p-4">
      <div className="w-full max-w-2xl space-y-8">
        <header className="text-center">
          <h1 className="text-4xl font-bold tracking-tight text-foreground">
            Selecione seu Perfil
          </h1>
          <p className="mt-3 text-lg text-text-secondary">
            Escolha como deseja acessar a plataforma
          </p>
        </header>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <button
            type="button"
            onClick={() => handleSelectRole("citizen")}
            className="group relative overflow-hidden rounded-2xl border border-(--border-subtle) bg-surface-elevated p-8 text-left transition-all duration-300 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/10"
          >
            <div className="relative z-10 flex flex-col items-center gap-6 text-center">
              <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-blue-500/10">
                <PersonRounded sx={{ fontSize: 40 }} className="text-primary" />
              </div>

              <div>
                <h2 className="text-2xl font-bold text-foreground">Cidadão</h2>
                <p className="mt-2 text-sm text-text-secondary">
                  Acesso para cidadãos em busca de atendimento jurídico
                </p>
              </div>
            </div>

            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 opacity-0 bg-gradient-to-br from-primary/5 to-transparent transition-opacity duration-300 group-hover:opacity-100"
            />
          </button>

          <button
            type="button"
            onClick={() => handleSelectRole("lawyer")}
            className="group relative overflow-hidden rounded-2xl border border-(--border-subtle) bg-surface-elevated p-8 text-left transition-all duration-300 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/10"
          >
            <div className="relative z-10 flex flex-col items-center gap-6 text-center">
              <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-purple-500/10">
                <GavelRounded sx={{ fontSize: 40 }} className="text-purple-400" />
              </div>

              <div>
                <h2 className="text-2xl font-bold text-foreground">Advogado</h2>
                <p className="mt-2 text-sm text-text-secondary">
                  Acesso para advogados prestadores de serviços
                </p>
              </div>
            </div>

            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 opacity-0 bg-gradient-to-br from-purple-500/5 to-transparent transition-opacity duration-300 group-hover:opacity-100"
            />
          </button>
        </div>

        <p className="text-center text-sm text-text-muted">
          Usuário atual: <span className="font-semibold text-foreground">{user.name}</span> ({user.role})
        </p>
      </div>
    </div>
  );
}
