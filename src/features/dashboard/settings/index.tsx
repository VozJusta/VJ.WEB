"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  LanguageRounded,
  ShieldRounded,
  LockResetRounded,
  DescriptionRounded,
  ChevronRightRounded,
  ArrowForwardRounded,
  HeadsetMicRounded,
  DeleteForeverRounded,
  WarningAmberRounded,
} from "@mui/icons-material";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { userService } from "@/services/user.service";
import { useAuthStore } from "@/store/auth.store";
import { useToast } from "@/components/ui/toast/toast-provider";

type SettingRowProps = {
  icon: React.ElementType;
  label: string;
  href: string;
  value?: string;
};

function SettingRow({ icon, label, href, value }: SettingRowProps) {
  const Icon = icon;
  return (
    <li>
      <Link
        href={href}
        className="block hover:bg-white/03 transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#2585F4]"
      >
        <div className="flex items-center justify-between px-4 py-3.5 group">
          <div className="flex items-center gap-3">
            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-white/05 text-white/50">
              <Icon fontSize="small" aria-hidden />
            </span>
            <span className="text-sm font-medium text-white/90">{label}</span>
          </div>
          <div className="flex items-center gap-1.5 text-white/40 group-hover:text-white/70 transition-colors duration-150">
            {value && <span className="text-sm text-white/50">{value}</span>}
            <ChevronRightRounded fontSize="small" aria-hidden />
          </div>
        </div>
      </Link>
    </li>
  );
}

function SectionDivider() {
  return <li aria-hidden><hr className="border-[#1B2233]" /></li>;
}

function GroupHeader({ label, id }: { label: string; id: string }) {
  return (
    <p id={id} className="px-4 pt-5 pb-2 text-xs font-semibold tracking-widest uppercase text-white/35">
      {label}
    </p>
  );
}

function DeleteAccountModal({ onClose, onConfirm, isDeleting }: {
  onClose: () => void;
  onConfirm: (password: string) => void;
  isDeleting: boolean;
}) {
  const [password, setPassword] = useState("");

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm px-4"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md rounded-2xl bg-[#111c30] border border-[#1B2233] p-6 flex flex-col gap-5"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-3">
          <span className="flex items-center justify-center w-10 h-10 rounded-full bg-red-500/15">
            <WarningAmberRounded className="text-red-400" />
          </span>
          <h2 className="text-lg font-bold text-white">Excluir conta</h2>
        </div>

        <p className="text-sm text-white/60 leading-relaxed">
          Esta ação é <strong className="text-white">permanente e irreversível</strong>. Todos os seus dados serão apagados. Confirme sua senha para continuar.
        </p>

        <Input
          id="delete-password"
          type="password"
          label="Sua senha atual"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="••••••••"
        />

        <div className="flex gap-3">
          <Button variant="ghost" size="md" fullWidth onClick={onClose} disabled={isDeleting}
            className="border border-[#1B2233] text-white/70 hover:text-white hover:bg-white/8"
          >
            Cancelar
          </Button>
          <Button
            variant="danger"
            size="md"
            fullWidth
            loading={isDeleting}
            disabled={!password.trim() || isDeleting}
            onClick={() => onConfirm(password)}
            className="bg-red-600 hover:bg-red-700"
          >
            Excluir conta
          </Button>
        </div>
      </div>
    </div>
  );
}

type SettingsFeatureProps = {
  /** Base path for settings sub-routes — defaults to the citizen dashboard. */
  basePath?: string;
};

export function SettingsFeature({ basePath = "/dashboard/configuracoes" }: SettingsFeatureProps = {}) {
  const router = useRouter();
  const { toast } = useToast();
  const logout = useAuthStore((s) => s.logout);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDeleteAccount = async (password: string) => {
    setIsDeleting(true);
    try {
      await userService.deleteAccount(password);
      logout();
      router.push("/login");
    } catch (err) {
      toast({
        title: "Erro ao excluir conta",
        description: err instanceof Error ? err.message : "Tente novamente.",
        variant: "error",
      });
    } finally {
      setIsDeleting(false);
      setShowDeleteModal(false);
    }
  };

  return (
    <>
      {showDeleteModal && (
        <DeleteAccountModal
          onClose={() => setShowDeleteModal(false)}
          onConfirm={handleDeleteAccount}
          isDeleting={isDeleting}
        />
      )}

      <div className="flex flex-col items-center gap-5 w-full max-w-2xl mx-auto px-4 py-6 md:px-0 md:py-8">
        <h1 className="text-xs font-semibold tracking-widest uppercase text-[#2585F4]">
          Configurações
        </h1>

        <section
          className="w-full rounded-2xl bg-[#111c30] border-2 border-[#1B2233] overflow-hidden"
          aria-label="Configurações do sistema"
        >
          <GroupHeader label="Preferências do App" id="prefs-heading" />
          <ul aria-labelledby="prefs-heading">
            <SettingRow
              icon={LanguageRounded}
              label="Idioma"
              href="#"
              value="Português (BR)"
            />
          </ul>

          <hr className="border-[#1B2233] mx-4 mt-1" />

          <GroupHeader label="Segurança" id="security-heading" />
          <ul aria-labelledby="security-heading">
            <SettingRow
              icon={LockResetRounded}
              label="Alterar Senha"
              href={`${basePath}/alterar-senha`}
            />
          </ul>

          <hr className="border-[#1B2233] mx-4 mt-1" />

          <GroupHeader label="Informações" id="info-heading" />
          <ul aria-labelledby="info-heading">
            <SettingRow
              icon={DescriptionRounded}
              label="Termos de Uso"
              href="/termos"
            />
          </ul>

          <hr className="border-[#1B2233] mx-4 mt-1" />

          <GroupHeader label="Conta" id="account-heading" />
          <ul aria-labelledby="account-heading">
            <li>
              <button
                type="button"
                onClick={() => setShowDeleteModal(true)}
                className="w-full flex items-center justify-between px-4 py-3.5 hover:bg-red-500/05 transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-red-500 cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-red-500/10 text-red-400">
                    <DeleteForeverRounded fontSize="small" aria-hidden />
                  </span>
                  <span className="text-sm font-medium text-red-400">Excluir Conta</span>
                </div>
              </button>
            </li>
          </ul>

          <p className="text-center text-xs text-white/25 py-5">
            Versão 2.4.0 (Build 88)
          </p>
        </section>

        <Link
          href="/contato"
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
    </>
  );
}
