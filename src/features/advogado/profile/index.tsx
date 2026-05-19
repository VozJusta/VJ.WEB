"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useTranslation } from "react-i18next";
import {
  SaveRounded,
  EditRounded,
  GavelRounded,
  PersonRounded,
} from "@mui/icons-material";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useAuthStore } from "@/store/auth.store";
import { userService } from "@/services/user.service";
import { useToast } from "@/components/ui/toast/toast-provider";
import { formatCPF, formatPhone, getCategoryLabel } from "@/lib/status";

const OAB_STATES: Record<string, string> = {
  AC: "Acre",
  AL: "Alagoas",
  AP: "Amapá",
  AM: "Amazonas",
  BA: "Bahia",
  CE: "Ceará",
  DF: "Distrito Federal",
  ES: "Espírito Santo",
  GO: "Goiás",
  MA: "Maranhão",
  MT: "Mato Grosso",
  MS: "Mato Grosso do Sul",
  MG: "Minas Gerais",
  PA: "Pará",
  PB: "Paraíba",
  PR: "Paraná",
  PE: "Pernambuco",
  PI: "Piauí",
  RJ: "Rio de Janeiro",
  RN: "Rio Grande do Norte",
  RS: "Rio Grande do Sul",
  RO: "Rondônia",
  RR: "Roraima",
  SC: "Santa Catarina",
  SP: "São Paulo",
  SE: "Sergipe",
  TO: "Tocantins",
};

function SectionCard({
  icon,
  title,
  children,
}: {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="w-full rounded-2xl bg-[#0C1326] border border-[#1B2233] p-6 flex flex-col gap-5">
      <div className="flex items-center gap-2.5 pb-1 border-b border-[#1B2233]">
        <span className="text-[#2585F4]">{icon}</span>
        <h2 className="text-sm font-semibold text-[#8BA3C7] uppercase tracking-wider">
          {title}
        </h2>
      </div>
      {children}
    </section>
  );
}

function ReadonlyField({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-1.5">
      <span className="text-xs font-medium text-[#8BA3C7] uppercase tracking-wide">
        {label}
      </span>
      <div className="w-full rounded-lg bg-[#111c30] border border-[#1B2233] px-4 py-2.5 text-sm text-[#C8D8F0]">
        {value || "—"}
      </div>
    </div>
  );
}

export function LawyerDashboardProfileFeature() {
  const user = useAuthStore((s) => s.user);
  const setUser = useAuthStore((s) => s.setUser);
  const { toast } = useToast();
  const { t } = useTranslation();

  const [fullName, setFullName] = useState(user?.fullName ?? "");
  const [bio, setBio] = useState("");
  const [phone, setPhone] = useState("");
  const [cpf, setCpf] = useState("");
  const [email, setEmail] = useState(user?.email ?? "");
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);

  const [oabNumber, setOabNumber] = useState("");
  const [oabState, setOabState] = useState("");
  const [specialization, setSpecialization] = useState("");

  const [saving, setSaving] = useState(false);
  const [uploadingAvatar, setUploadingAvatar] = useState(false);
  const avatarInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    userService
      .getProfile()
      .then((profile) => {
        if (profile.full_name) setFullName(profile.full_name);
        if (profile.email) setEmail(profile.email);
        if (profile.cpf) setCpf(formatCPF(profile.cpf));
        if (profile.phone) setPhone(formatPhone(profile.phone));
        if (profile.avatar_image) setAvatarUrl(profile.avatar_image);
        if (profile.bio) setBio(profile.bio);
        if (profile.oab_number) setOabNumber(profile.oab_number);
        if (profile.oab_state) setOabState(profile.oab_state);
        if (profile.specialization) setSpecialization(profile.specialization);
      })
      .catch(() => {});
  }, []);

  const handleAvatarClick = () => avatarInputRef.current?.click();

  const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadingAvatar(true);
    try {
      const result = await userService.uploadAvatar(file);
      if (result.avatar_image) setAvatarUrl(result.avatar_image);
      else setAvatarUrl(URL.createObjectURL(file));
      toast({ title: t("lawyerProfile.photoUpdatedTitle"), variant: "success" });
    } catch (err) {
      toast({
        title: t("lawyerProfile.photoErrorTitle"),
        description: err instanceof Error ? err.message : t("lawyerProfile.tryAgain"),
        variant: "error",
      });
    } finally {
      setUploadingAvatar(false);
      if (avatarInputRef.current) avatarInputRef.current.value = "";
    }
  };

  const handleSave = async () => {
    const phoneDigits = phone.replace(/\D/g, "");
    if (phoneDigits.length > 0 && phoneDigits.length !== 10 && phoneDigits.length !== 11) {
      toast({
        title: t("lawyerProfile.phoneInvalidTitle"),
        description: t("lawyerProfile.phoneInvalidDesc"),
        variant: "error",
      });
      return;
    }

    setSaving(true);
    try {
      await userService.updateProfile({
        fullName,
        phone: phoneDigits || undefined,
        bio,
      });
      if (user) setUser({ ...user, fullName });
      toast({
        title: t("lawyerProfile.savedTitle"),
        description: t("lawyerProfile.savedDesc"),
        variant: "success",
      });
    } catch (err) {
      toast({
        title: t("lawyerProfile.saveErrorTitle"),
        description: err instanceof Error ? err.message : t("lawyerProfile.tryAgain"),
        variant: "error",
      });
    } finally {
      setSaving(false);
    }
  };

  const displayName = fullName || user?.fullName || t("lawyerProfile.lawyerBadge");
  const initials = displayName
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  const oabStateName = oabState
    ? `${OAB_STATES[oabState] ?? oabState} (${oabState})`
    : "—";
  const specializationLabel = specialization ? getCategoryLabel(specialization) : "—";

  return (
    <div className="flex flex-col items-center gap-6 w-full max-w-2xl mx-auto px-4 py-6 md:px-0 md:py-8">
      {/* Avatar */}
      <div className="flex flex-col items-center gap-3">
        <div className="relative">
          <div className="w-24 h-24 rounded-full p-0.5 bg-linear-to-br from-[#2585F4] to-[#1565C0] shadow-[0_0_24px_rgba(37,133,244,0.35)]">
            <div className="w-full h-full rounded-full bg-[#111c30] overflow-hidden flex items-center justify-center">
              {avatarUrl ? (
                <Image
                  src={avatarUrl}
                  alt={displayName}
                  width={96}
                  height={96}
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-2xl font-bold text-white select-none">
                  {initials}
                </span>
              )}
            </div>
          </div>

          <input
            ref={avatarInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            aria-hidden="true"
            onChange={handleAvatarChange}
          />
          <button
            type="button"
            aria-label={t("lawyerProfile.editPhotoAria")}
            onClick={handleAvatarClick}
            disabled={uploadingAvatar}
            className="absolute bottom-0 right-0 flex items-center justify-center w-7 h-7 rounded-full bg-[#2585F4] border-2 border-[#0d1526] text-white hover:bg-[#1978E5] transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2585F4] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0d1526] disabled:opacity-60"
          >
            <EditRounded sx={{ fontSize: 14 }} aria-hidden />
          </button>
        </div>

        <div className="flex flex-col items-center gap-2">
          <h1 className="text-2xl font-bold text-white tracking-tight">
            {displayName}
          </h1>
          <div className="flex items-center gap-2">
            <Badge text={t("lawyerProfile.lawyerBadge")} variant="blue" />
            <Badge text={t("lawyerProfile.regularActive")} variant="green" />
          </div>
        </div>
      </div>

      {/* Informações do Perfil */}
      <SectionCard
        icon={<PersonRounded fontSize="small" />}
        title={t("lawyerProfile.infoSection")}
      >
        <Input
          id="profile-fullname"
          label={t("lawyerProfile.fullName")}
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          autoComplete="name"
        />

        <Textarea
          id="profile-bio"
          label={t("lawyerProfile.bio")}
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          rows={3}
          placeholder={t("lawyerProfile.bioPlaceholder")}
          maxLength={300}
          showCharCount
        />

        <Input
          id="profile-phone"
          label={t("lawyerProfile.phone")}
          type="tel"
          value={phone}
          onChange={(e) => setPhone(formatPhone(e.target.value))}
          autoComplete="tel"
          placeholder="(00) 00000-0000"
        />

        <Input
          id="profile-cpf"
          label={t("lawyerProfile.cpf")}
          value={cpf}
          inputMode="numeric"
          autoComplete="off"
          placeholder="000.000.000-00"
          disabled
        />

        <Input
          id="profile-email"
          label={t("lawyerProfile.email")}
          type="email"
          value={email}
          autoComplete="email"
          disabled
        />

        <Button
          variant="primary"
          size="lg"
          fullWidth
          loading={saving}
          disabled={saving}
          onClick={handleSave}
          rightIcon={<SaveRounded fontSize="small" aria-hidden />}
        >
          {t("lawyerProfile.saveChanges")}
        </Button>
      </SectionCard>

      {/* Dados da OAB */}
      <SectionCard
        icon={<GavelRounded fontSize="small" />}
        title={t("lawyerProfile.oabSection")}
      >
        <ReadonlyField label={t("lawyerProfile.oabNumber")} value={oabNumber} />
        <ReadonlyField label={t("lawyerProfile.oabState")} value={oabStateName} />
        <ReadonlyField label={t("lawyerProfile.practiceArea")} value={specializationLabel} />
        <ReadonlyField label={t("lawyerProfile.status")} value={t("lawyerProfile.regularActive")} />
      </SectionCard>
    </div>
  );
}
