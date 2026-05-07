"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import {
  EditRounded,
  LocationOnRounded,
  CalendarTodayRounded,
  StarRounded,
  VerifiedRounded,
  DiamondOutlined,
  CheckCircleOutlined,
  ShieldRounded,
  VisibilityRounded,
  LockRounded,
} from "@mui/icons-material";
import { Badge } from "@/components/ui/badge";
import { Toggle } from "@/components/ui/toggle";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/auth-context";
import { useAuthStore } from "@/store/auth.store";

const DEFAULT_AVATAR =
  "data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%20width='128'%20height='128'%3E%3Crect%20width='128'%20height='128'%20rx='24'%20fill='%23111c30'/%3E%3Cpath%20d='M64%2066c11.05%200%2020-8.95%2020-20S75.05%2026%2064%2026%2044%2034.95%2044%2046s8.95%2020%2020%2020Zm0%2010c-16.57%200-30%209.4-30%2021v5h60v-5c0-11.6-13.43-21-30-21Z'%20fill='%23ffffff'%20fill-opacity='.55'/%3E%3C/svg%3E";

export function LawyerDashboardProfileFeature() {
  const { user } = useAuth();
  const storeUser = useAuthStore((s) => s.user);

  const [twoFactorEnabled, setTwoFactorEnabled] = useState(true);
  const [profileVisible, setProfileVisible] = useState(true);

  const profile = useMemo(() => {
    return {
      name: storeUser?.fullName || user.name || "Advogado",
      headline:
        "Especialista em Direito Civil e do Consumidor com foco em resoluções ágeis. Advocacia digital humanizada.",
      location: "São Paulo, SP",
      yearsOfExperience: 12,
      rating: 4.9,
      totalReviews: 124,
      availabilityLabel: "DISPONÍVEL",
      oab: {
        number: "OAB/SP 432.109",
        section: "São Paulo (SP)",
        status: "Regular - Ativo",
        validatedLabel: "VALIDADO",
      },
      practiceAreas: [
        "Direito Civil",
        "Direito do Consumidor",
        "Direito Digital",
        "Família e Sucessões",
      ],
      languages: ["Português", "Inglês (Jurídico)"],
      plan: {
        name: "Plano Expert",
        status: "PRO",
        benefits: [
          "Destaque nas buscas regionais",
          "Acesso ilimitado a leads qualificados",
          "Ferramenta de IA Generativa para Petições",
        ],
        renewal: "15/09/2024",
      },
    };
  }, [user.name]);

  const initials = profile.name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Perfil Profissional
        </h1>
        <p className="mt-2 text-base text-foreground-muted">
          Gerencie suas informações e preferências do perfil.
        </p>
      </header>

      <section className="rounded-3xl border border-(--border-subtle) bg-surface-elevated p-6 md:p-8">
        <div className="flex flex-col gap-6 md:flex-row md:items-center">
          <div className="flex items-start gap-5">
            <div className="relative">
              <div className="h-18 w-18 md:h-22 md:w-22 overflow-hidden rounded-full border border-(--border-subtle) bg-foreground/5">
                {user.avatarUrl ? (
                  <Image
                    src={user.avatarUrl}
                    alt={`Foto de ${profile.name}`}
                    width={96}
                    height={96}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center">
                    <span className="text-lg font-bold text-foreground">
                      {initials}
                    </span>
                  </div>
                )}
              </div>

              <button
                type="button"
                aria-label="Editar foto do perfil"
                className="absolute -bottom-1 -right-1 inline-flex h-8 w-8 items-center justify-center rounded-full border border-(--border-subtle) bg-surface text-text-secondary hover:bg-foreground/5"
              >
                <EditRounded sx={{ fontSize: 16 }} aria-hidden />
              </button>
            </div>

            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-3">
                <h2 className="text-xl md:text-2xl font-bold tracking-tight text-foreground">
                  {profile.name}
                </h2>
                <Badge text={profile.availabilityLabel} variant="green" />
              </div>

              <p className="mt-2 text-sm md:text-base text-text-secondary">
                {profile.headline}
              </p>

              <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-text-secondary">
                <span className="inline-flex items-center gap-1.5">
                  <LocationOnRounded sx={{ fontSize: 18 }} aria-hidden />
                  {profile.location}
                </span>

                <span className="inline-flex items-center gap-1.5">
                  <CalendarTodayRounded sx={{ fontSize: 18 }} aria-hidden />
                  {profile.yearsOfExperience} anos de Experiência
                </span>

                <span className="inline-flex items-center gap-1.5">
                  <StarRounded sx={{ fontSize: 18 }} className="text-yellow-400" aria-hidden />
                  {profile.rating} ({profile.totalReviews} avaliações)
                </span>
              </div>
            </div>
          </div>

          <div className="flex-1" />

          <div className="flex items-center gap-2 md:self-start">
            <Button variant="ghost" size="sm">
              Editar
            </Button>
          </div>
        </div>
      </section>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <section className="rounded-3xl border border-[#1B2233] bg-[#0d1526] p-6 lg:col-span-2">
          <header className="flex items-start justify-between gap-4">
            <div className="flex items-start gap-4">
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-[#2585F4]/15 text-[#2585F4] shrink-0">
                <VerifiedRounded fontSize="small" aria-hidden />
              </span>
              <div>
                <h3 className="text-base font-semibold text-white">Dados da OAB</h3>
                <p className="text-sm text-white/50">Registro Profissional</p>
              </div>
            </div>

            <Badge text={profile.oab.validatedLabel} variant="green" />
          </header>

          <div className="mt-6 space-y-5">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-white/35">
                Número de inscrição
              </p>
              <div className="mt-2 rounded-xl border border-[#1B2233] bg-[#0a0f1a]/40 px-4 py-3">
                <p className="text-sm font-semibold text-white">
                  {profile.oab.number}
                </p>
              </div>
            </div>

            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-white/35">
                Seccional
              </p>
              <p className="mt-2 text-sm font-medium text-white">
                {profile.oab.section}
              </p>
            </div>

            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-white/35">
                Status na Ordem
              </p>
              <p className="mt-2 text-sm font-medium text-white">
                {profile.oab.status}
              </p>
            </div>
          </div>
        </section>

        <section className="rounded-2xl border border-(--border-subtle) bg-surface-elevated p-6">
          <header className="flex items-start justify-between gap-4">
            <div>
              <h3 className="text-lg font-semibold tracking-tight text-foreground">
                Áreas de Atuação
              </h3>
              <p className="text-sm text-text-secondary">Especialidades visíveis</p>
            </div>

            <Button variant="ghost" size="sm">
              Editar
            </Button>
          </header>

          <div className="mt-4 flex flex-wrap gap-2">
            {profile.practiceAreas.map((area) => (
              <span
                key={area}
                className="inline-flex items-center rounded-full border border-(--border-subtle) bg-surface px-3 py-1 text-xs font-medium text-foreground"
              >
                {area}
              </span>
            ))}

            <button
              type="button"
              className="inline-flex items-center rounded-full border border-(--border-subtle) bg-surface px-3 py-1 text-xs font-medium text-text-secondary hover:bg-foreground/5"
            >
              + Adicionar
            </button>
          </div>

          <div className="mt-6">
            <p className="text-sm font-semibold text-foreground">Idiomas de Atendimento</p>
            <div className="mt-2 flex flex-wrap gap-2">
              {profile.languages.map((lang) => (
                <span
                  key={lang}
                  className="inline-flex items-center rounded-full border border-(--border-subtle) bg-surface px-3 py-1 text-xs font-medium text-text-secondary"
                >
                  {lang}
                </span>
              ))}
            </div>
          </div>
        </section>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <section className="relative overflow-hidden rounded-3xl border border-blue-500/20 bg-[radial-gradient(circle_at_15%_20%,rgba(37,133,244,0.22)_0%,rgba(13,21,38,1)_55%)] p-8 lg:col-span-2">
          <header className="flex items-start justify-between gap-6">
            <div className="flex items-start gap-5">
              <span className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-[#2585F4] text-white">
                <DiamondOutlined sx={{ fontSize: 28 }} aria-hidden />
              </span>

              <div className="min-w-0">
                <h3 className="text-2xl font-bold tracking-tight text-white">
                  {profile.plan.name}
                </h3>
                <p className="mt-1 text-base text-white/70">Assinatura Ativa</p>
              </div>
            </div>

            <span className="inline-flex items-center justify-center rounded-xl bg-white/10 px-4 py-2 text-sm font-semibold text-white">
              {profile.plan.status}
            </span>
          </header>

          <ul className="mt-8 space-y-6" role="list">
            {profile.plan.benefits.map((benefit) => (
              <li key={benefit} className="flex items-center gap-4">
                <span className="inline-flex h-7 w-7 items-center justify-center rounded-full border border-[#2585F4]/35 bg-[#2585F4]/10 text-[#2585F4]">
                  <CheckCircleOutlined sx={{ fontSize: 20 }} aria-hidden />
                </span>
                <span className="text-lg text-white/80">{benefit}</span>
              </li>
            ))}
          </ul>

          <div className="mt-10 h-px w-full bg-blue-500/20" aria-hidden="true" />

          <footer className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-base text-white/45">
              Renovação em <span className="font-semibold text-white/80">{profile.plan.renewal}</span>
            </p>
            <a
              href="/advogado/configuracoes"
              className="text-base font-semibold uppercase tracking-wide text-[#2585F4] hover:text-[#2585F4]/80 transition-colors"
            >
              Gerenciar Plano
            </a>
          </footer>
        </section>

        <section className="rounded-2xl border border-(--border-subtle) bg-surface-elevated p-6">
          <header className="flex items-start gap-3">
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-foreground/5 text-text-secondary">
              <ShieldRounded fontSize="small" aria-hidden />
            </span>
            <div>
              <h3 className="text-lg font-semibold tracking-tight text-foreground">
                Segurança e LGPD
              </h3>
              <p className="text-sm text-text-secondary">Privacidade e controle</p>
            </div>
          </header>

          <div className="mt-5 space-y-4">
            <div className="flex items-center justify-between gap-4 rounded-xl border border-(--border-subtle) bg-surface p-4">
              <div className="min-w-0">
                <p className="text-sm font-semibold text-foreground">
                  Autenticação em 2 Fatores
                </p>
                <p className="text-xs text-text-secondary">
                  Proteção extra para sua conta
                </p>
              </div>
              <Toggle
                checked={twoFactorEnabled}
                onChange={setTwoFactorEnabled}
                aria-label="Autenticação em 2 fatores"
              />
            </div>

            <div className="flex items-center justify-between gap-4 rounded-xl border border-(--border-subtle) bg-surface p-4">
              <div className="min-w-0">
                <p className="text-sm font-semibold text-foreground">
                  Visibilidade do Perfil
                </p>
                <p className="text-xs text-text-secondary">
                  Seu perfil aparece nas buscas
                </p>
              </div>
              <Toggle
                checked={profileVisible}
                onChange={setProfileVisible}
                aria-label="Visibilidade do perfil"
              />
            </div>

            <div className="pt-1">
              <Button
                variant="ghost"
                size="sm"
                href="/advogado/configuracoes"
                leftIcon={<LockRounded fontSize="small" aria-hidden />}
              >
                Ver Histórico de Acessos
              </Button>
            </div>
          </div>
        </section>
      </div>

      <div className="sr-only" aria-live="polite">
        {twoFactorEnabled ? "2FA ativado" : "2FA desativado"}
        {profileVisible ? "Perfil visível" : "Perfil oculto"}
      </div>
    </div>
  );
}
