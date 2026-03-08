"use client";

import Link from "next/link";
import {
  NotificationsRounded,
  DarkModeRounded,
  LanguageRounded,
  ShieldRounded,
  LockResetRounded,
  DescriptionRounded,
  PolicyRounded,
  ChevronRightRounded,
  ArrowForwardRounded,
  HeadsetMicRounded,
} from "@mui/icons-material";
import { useState } from "react";
import { Toggle } from "@/components/ui/toggle";

type SettingRowProps =
  | {
      icon: React.ElementType;
      label: string;
      type: "toggle";
      checked: boolean;
      onToggle: (v: boolean) => void;
    }
  | {
      icon: React.ElementType;
      label: string;
      type: "link";
      href: string;
      value?: string;
    };

function SettingRow(props: SettingRowProps) {
  const Icon = props.icon;

  const inner = (
    <div className="flex items-center justify-between px-4 py-3.5 group">
      <div className="flex items-center gap-3">
        <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-white/05 text-white/50">
          <Icon fontSize="small" aria-hidden />
        </span>
        <span className="text-sm font-medium text-white/90">{props.label}</span>
      </div>

      {props.type === "toggle" && (
        <Toggle
          checked={props.checked}
          onChange={props.onToggle}
          aria-label={props.label}
        />
      )}

      {props.type === "link" && (
        <div className="flex items-center gap-1.5 text-white/40 group-hover:text-white/70 transition-colors duration-150">
          {props.value && (
            <span className="text-sm text-white/50">{props.value}</span>
          )}
          <ChevronRightRounded fontSize="small" aria-hidden />
        </div>
      )}
    </div>
  );

  if (props.type === "link") {
    return (
      <li>
        <Link
          href={props.href}
          className="block hover:bg-white/03 transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#2585F4]"
        >
          {inner}
        </Link>
      </li>
    );
  }

  return <li>{inner}</li>;
}

function SectionDivider() {
  return <li aria-hidden><hr className="border-[#1B2233]" /></li>;
}

type SettingsGroup = {
  label: string;
  id: string;
};

function GroupHeader({ label, id }: SettingsGroup) {
  return (
    <p
      id={id}
      className="px-4 pt-5 pb-2 text-xs font-semibold tracking-widest uppercase text-white/35 "
    >
      {label}
    </p>
  );
}

export function SettingsFeature() {
  const [pushNotifications, setPushNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(true);
  const [twoFactor, setTwoFactor] = useState(false);

  return (
    <div className="flex flex-col items-center gap-5 w-full max-w-2xl mx-auto px-4 py-6 md:px-0 md:py-8">
      <h1 className="text-xs font-semibold tracking-widest uppercase text-[#2585F4]">
        Configurações
      </h1>

      <section
        className="w-full rounded-2xl bg-[#111c30] border border-[#1B2233] overflow-hidden"
        aria-label="Configurações do sistema"
      >
        <GroupHeader label="Preferências do App" id="prefs-heading" />
        <ul aria-labelledby="prefs-heading">
          <SettingRow
            icon={NotificationsRounded}
            label="Notificações Push"
            type="toggle"
            checked={pushNotifications}
            onToggle={setPushNotifications}
          />
          <SectionDivider />
          <SettingRow
            icon={DarkModeRounded}
            label="Modo Escuro"
            type="toggle"
            checked={darkMode}
            onToggle={setDarkMode}
          />
          <SectionDivider />
          <SettingRow
            icon={LanguageRounded}
            label="Idioma"
            type="link"
            href="/dashboard/configuracoes/idioma"
            value="Português (BR)"
          />
        </ul>

        <hr className="border-[#1B2233] mx-4 mt-1" />

        <GroupHeader label="Segurança" id="security-heading" />
        <ul aria-labelledby="security-heading">
          <SettingRow
            icon={ShieldRounded}
            label="Autenticação 2FA"
            type="toggle"
            checked={twoFactor}
            onToggle={setTwoFactor}
          />
          <SectionDivider />
          <SettingRow
            icon={LockResetRounded}
            label="Alterar Senha"
            type="link"
            href="/redefinir-senha"
          />
        </ul>

        <hr className="border-[#1B2233] mx-4 mt-1" />

        <GroupHeader label="Informações" id="info-heading" />
        <ul aria-labelledby="info-heading">
          <SettingRow
            icon={DescriptionRounded}
            label="Termos de Uso"
            type="link"
            href="/termos-de-uso"
          />
          <SectionDivider />
          <SettingRow
            icon={PolicyRounded}
            label="Privacidade"
            type="link"
            href="/privacidade"
          />
        </ul>

        <p className="text-center text-xs text-white/25 py-5">
          Versão 2.4.0 (Build 88)
        </p>
      </section>

      <Link
        href="/suporte"
        className="w-full flex items-center gap-4 px-5 py-4 rounded-2xl bg-[#111c30] border border-[#1B2233] hover:border-[#1B2233] hover:bg-[#152036] transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2585F4]"
        aria-label="Falar com suporte — atendimento 24/7 disponível"
      >
        <p className="flex items-center justify-center w-10 h-10 rounded-full bg-[#2585F4]/15 text-[#2585F4] shrink-0">
          <HeadsetMicRounded fontSize="small" aria-hidden />
        </p>
        <div className="flex flex-col flex-1 min-w-0">
          <p className="text-sm font-semibold text-white">Falar com suporte</p>
          <p className="text-xs text-white/45">Atendimento 24/7 disponível</p>
        </div>
        <ArrowForwardRounded fontSize="small" className="text-white/40 shrink-0" aria-hidden />
      </Link>
    </div>
  );
}
