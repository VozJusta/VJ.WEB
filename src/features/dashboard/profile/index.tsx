"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { SaveRounded, LockOutlined, EditRounded } from "@mui/icons-material";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useAuthStore } from "@/store/auth.store";
import { userService } from "@/services/user.service";
import { useToast } from "@/components/ui/toast/toast-provider";
import { formatCPF, formatPhone } from "@/lib/status";

export function ProfileFeature() {
  const user = useAuthStore((s) => s.user);
  const setUser = useAuthStore((s) => s.setUser);
  const { toast } = useToast();

  const [fullName, setFullName] = useState(user?.fullName ?? "");
  const [email, setEmail] = useState(user?.email ?? "");
  const [cpf, setCpf] = useState("");
  const [phone, setPhone] = useState("");
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [uploadingAvatar, setUploadingAvatar] = useState(false);
  const avatarInputRef = useRef<HTMLInputElement>(null);

  const handleAvatarClick = () => {
    avatarInputRef.current?.click();
  };

  const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadingAvatar(true);
    try {
      const result = await userService.uploadAvatar(file);
      if (result.avatar_image) setAvatarUrl(result.avatar_image);
      else setAvatarUrl(URL.createObjectURL(file));
      toast({ title: "Foto atualizada!", variant: "success" });
    } catch (err) {
      toast({
        title: "Erro ao enviar foto",
        description: err instanceof Error ? err.message : "Tente novamente.",
        variant: "error",
      });
    } finally {
      setUploadingAvatar(false);
      if (avatarInputRef.current) avatarInputRef.current.value = "";
    }
  };

  useEffect(() => {
    userService.getProfile().then((profile) => {
      if (profile.cpf) setCpf(formatCPF(profile.cpf));
      if (profile.phone) setPhone(formatPhone(profile.phone));
      if (profile.full_name) setFullName(profile.full_name);
      if (profile.email) setEmail(profile.email);
      if (profile.avatar_image) setAvatarUrl(profile.avatar_image);
    }).catch(() => {});
  }, []);

  const handleSave = async () => {
    setSaving(true);
    try {
      await userService.updateProfile({ fullName, phone: phone.replace(/\D/g, "") });
      // Sync new name into the Zustand auth store so the header/sidebar reflect the change immediately
      if (user) {
        setUser({ ...user, fullName });
      }
      toast({
        title: "Alterações salvas!",
        description: "Seu perfil foi atualizado com sucesso.",
        variant: "success",
      });
    } catch (err) {
      toast({
        title: "Erro ao salvar perfil",
        description: err instanceof Error ? err.message : "Tente novamente.",
        variant: "error",
      });
    } finally {
      setSaving(false);
    }
  };

  const displayName = user?.fullName ?? "Usuário";
  const initials = displayName
    .split(" ")
    .slice(0, 2)
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  return (
    <div className="flex flex-col items-center gap-6 w-full max-w-2xl mx-auto px-4 py-6 md:px-0 md:py-8">
      <div className="flex flex-col items-center gap-3">
        <div className="relative">
          <div className="w-24 h-24 rounded-full p-0.5 bg-linear-to-br from-[#2585F4] to-[#1565C0] shadow-[0_0_24px_rgba(37,133,244,0.35)]">
            <div className="w-full h-full rounded-full bg-[#111c30] overflow-hidden flex items-center justify-center">
              {avatarUrl ? (
                <Image
                  src={avatarUrl}
                  alt={`Foto de ${displayName}`}
                  width={96}
                  height={96}
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-2xl font-bold text-white select-none">{initials}</span>
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
            aria-label="Alterar foto de perfil"
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
          <Badge text="Cidadão" variant="blue" />
        </div>
      </div>

      <section
        className="w-full rounded-2xl bg-[#0C1326] border border-[#1B2233] p-6 flex flex-col gap-5"
        aria-label="Dados do perfil"
      >
        <Input
          id="profile-fullname"
          label="Nome Completo"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          autoComplete="name"
        />
        <Input
          id="profile-cpf"
          label="CPF"
          value={cpf}
          onChange={(e) => setCpf(formatCPF(e.target.value))}
          inputMode="numeric"
          autoComplete="off"
          placeholder="000.000.000-00"
          disabled
        />
        <Input
          id="profile-email"
          label="E-mail"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoComplete="email"
          disabled
        />
        <Input
          id="profile-phone"
          label="Telefone"
          type="tel"
          value={phone}
          onChange={(e) => setPhone(formatPhone(e.target.value))}
          autoComplete="tel"
          placeholder="(00) 00000-0000"
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
          Salvar alterações
        </Button>
      </section>

      <div className="w-full">
        <Button
          variant="outline"
          size="md"
          fullWidth
          leftIcon={<LockOutlined fontSize="small" aria-hidden />}
          href="/dashboard/configuracoes/alterar-senha"
        >
          Alterar Senha
        </Button>
      </div>
    </div>
  );
}
