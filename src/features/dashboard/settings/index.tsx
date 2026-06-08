"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";
import {
  LanguageRounded,
  LockResetRounded,
  DescriptionRounded,
  ChevronRightRounded,
  ArrowForwardRounded,
  HeadsetMicRounded,
  DeleteForeverRounded,
  WarningAmberRounded,
  CheckRounded,
} from "@mui/icons-material";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { userService } from "@/services/user.service";
import { useAuthStore } from "@/store/auth.store";
import { useToast } from "@/components/ui/toast/toast-provider";

const LANGUAGES = [
  { code: "pt-BR", label: "Português (BR)", flag: "🇧🇷" },
  { code: "en", label: "English", flag: "🇺🇸" },
  { code: "es", label: "Español", flag: "🇪🇸" },
] as const;

type SettingRowBase = {
  icon: React.ElementType;
  label: string;
  value?: string;
};

type SettingRowProps = SettingRowBase &
  ({ href: string; onClick?: never } | { href?: never; onClick: () => void });

function SettingRow({ icon, label, href, value, onClick }: SettingRowProps) {
  const Icon = icon;
  const inner = (
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
  );

  if (href) {
    return (
      <li>
        <Link
          href={href}
          className="block hover:bg-white/03 transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#2585F4]"
        >
          {inner}
        </Link>
      </li>
    );
  }

  return (
    <li>
      <button
        type="button"
        onClick={onClick}
        className="w-full hover:bg-white/03 transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#2585F4]"
      >
        {inner}
      </button>
    </li>
  );
}

function GroupHeader({ label, id }: { label: string; id: string }) {
  return (
    <p
      id={id}
      className="px-4 pt-5 pb-2 text-xs font-semibold tracking-widest uppercase text-white/35"
    >
      {label}
    </p>
  );
}

function LanguagePicker({ onClose }: { onClose: () => void }) {
  const { i18n, t } = useTranslation();

  const handleSelect = (code: string) => {
    i18n.changeLanguage(code);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/70 backdrop-blur-sm px-4 pb-4 sm:pb-0 cursor-pointer"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={t("settings.languages.title")}
    >
      <div
        className="w-full max-w-md rounded-2xl bg-[#111c30] border border-[#1B2233] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="px-4 py-4 border-b border-[#1B2233]">
          <h2 className="text-sm font-semibold text-white text-center">
            {t("settings.languages.title")}
          </h2>
        </div>
        <ul role="list">
          {LANGUAGES.map((lang) => {
            const isActive = i18n.language === lang.code;
            return (
              <li key={lang.code}>
                <button
                  type="button"
                  onClick={() => handleSelect(lang.code)}
                  aria-pressed={isActive}
                  className={`w-full flex items-center gap-3 px-4 py-4 hover:bg-white/05 transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#2585F4] ${
                    isActive ? "bg-[#2585F4]/08" : ""
                  }`}
                >
                  <span className="text-xl w-8 text-center leading-none">
                    {lang.flag}
                  </span>
                  <span
                    className={`text-sm font-medium flex-1 text-left ${
                      isActive ? "text-[#2585F4]" : "text-white/80"
                    }`}
                  >
                    {lang.label}
                  </span>
                  {isActive && (
                    <CheckRounded
                      fontSize="small"
                      className="text-[#2585F4]"
                      aria-hidden
                    />
                  )}
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

function DeleteAccountModal({
  onClose,
  onConfirm,
  isDeleting,
}: {
  onClose: () => void;
  onConfirm: (password: string) => void;
  isDeleting: boolean;
}) {
  const { t } = useTranslation();
  const [password, setPassword] = useState("");

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm px-4 cursor-pointer"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="w-full max-w-md rounded-2xl bg-[#111c30] border border-[#1B2233] p-6 flex flex-col gap-5"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-3">
          <span className="flex items-center justify-center w-10 h-10 rounded-full bg-red-500/15">
            <WarningAmberRounded className="text-red-400" />
          </span>
          <h2 className="text-lg font-bold text-white">
            {t("settings.deleteAccountTitle")}
          </h2>
        </div>

        <p className="text-sm text-white/60 leading-relaxed">
          {t("settings.deleteAccountDesc")}
        </p>

        <Input
          id="delete-password"
          type="password"
          label={t("settings.currentPassword")}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="••••••••"
        />

        <div className="flex gap-3">
          <Button
            variant="ghost"
            size="md"
            fullWidth
            onClick={onClose}
            disabled={isDeleting}
            className="border border-[#1B2233] text-white/70 hover:text-white hover:bg-white/8"
          >
            {t("common.cancel")}
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
            {t("settings.deleteAccount")}
          </Button>
        </div>
      </div>
    </div>
  );
}

type SettingsFeatureProps = {
  basePath?: string;
};

export function SettingsFeature({
  basePath = "/dashboard/configuracoes",
}: SettingsFeatureProps = {}) {
  const router = useRouter();
  const { toast } = useToast();
  const { t, i18n } = useTranslation();
  const logout = useAuthStore((s) => s.logout);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showLanguagePicker, setShowLanguagePicker] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const currentLangLabel =
    LANGUAGES.find((l) => l.code === i18n.language)?.label ?? "Português (BR)";

  const handleDeleteAccount = async (password: string) => {
    setIsDeleting(true);
    try {
      await userService.deleteAccount(password);
      logout();
      router.push("/login");
    } catch (err) {
      toast({
        title: t("settings.deleteErrorTitle"),
        description:
          err instanceof Error ? err.message : t("settings.deleteErrorDesc"),
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

      {showLanguagePicker && (
        <LanguagePicker onClose={() => setShowLanguagePicker(false)} />
      )}

      <div className="flex flex-col items-center gap-5 w-full max-w-2xl mx-auto px-4 py-6 md:px-0 md:py-8">
        <h1 className="text-xs font-semibold tracking-widest uppercase text-[#2585F4]">
          {t("settings.title")}
        </h1>

        <section
          className="w-full rounded-2xl bg-[#111c30] border-2 border-[#1B2233] overflow-hidden"
          aria-label={t("settings.systemSettings")}
        >
          <GroupHeader label={t("settings.appPreferences")} id="prefs-heading" />
          <ul aria-labelledby="prefs-heading">
            <SettingRow
              icon={LanguageRounded}
              label={t("settings.language")}
              value={currentLangLabel}
              onClick={() => setShowLanguagePicker(true)}
            />
          </ul>

          <hr className="border-[#1B2233] mx-4 mt-1" />

          <GroupHeader label={t("settings.security")} id="security-heading" />
          <ul aria-labelledby="security-heading">
            <SettingRow
              icon={LockResetRounded}
              label={t("settings.changePassword")}
              href={`${basePath}/alterar-senha`}
            />
          </ul>

          <hr className="border-[#1B2233] mx-4 mt-1" />

          <GroupHeader label={t("settings.information")} id="info-heading" />
          <ul aria-labelledby="info-heading">
            <SettingRow
              icon={DescriptionRounded}
              label={t("settings.termsOfUse")}
              href="/termos"
            />
          </ul>

          <hr className="border-[#1B2233] mx-4 mt-1" />

          <GroupHeader label={t("settings.account")} id="account-heading" />
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
                  <span className="text-sm font-medium text-red-400">
                    {t("settings.deleteAccount")}
                  </span>
                </div>
              </button>
            </li>
          </ul>

          <p className="text-center text-xs text-white/25 py-5">
            {t("settings.version")}
          </p>
        </section>

        <Link
          href="/contato"
          className="w-full flex items-center gap-4 px-5 py-4 rounded-2xl bg-[#111c30] border border-[#1B2233] hover:bg-[#152036] transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2585F4]"
          aria-label={`${t("settings.support")} — ${t("settings.supportSubtitle")}`}
        >
          <span className="flex items-center justify-center w-10 h-10 rounded-full bg-[#2585F4]/15 text-[#2585F4] shrink-0">
            <HeadsetMicRounded fontSize="small" aria-hidden />
          </span>
          <div className="flex flex-col flex-1 min-w-0">
            <p className="text-sm font-semibold text-white">
              {t("settings.support")}
            </p>
            <p className="text-xs text-white/45">{t("settings.supportSubtitle")}</p>
          </div>
          <ArrowForwardRounded
            fontSize="small"
            className="text-white/40 shrink-0"
            aria-hidden
          />
        </Link>
      </div>
    </>
  );
}
