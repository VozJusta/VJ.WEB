"use client";

import { useState } from "react";
import {
  SaveRounded,
  LockOutlined,
  DeleteOutlineRounded,
  EditRounded,
} from "@mui/icons-material";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const MOCK_USER = {
  name: "Ricardo Oliveira",
  plan: "Membro Premium",
  avatarUrl: "",
  fields: {
    fullName: "Ricardo Oliveira Silva",
    cpf: "123.456.789-00",
    email: "ricardo.silva@exemplo.com",
    phone: "(11) 98765-4321",
  },
};

export function ProfileFeature() {
  const [fullName, setFullName] = useState(MOCK_USER.fields.fullName);
  const [cpf, setCpf] = useState(MOCK_USER.fields.cpf);
  const [email, setEmail] = useState(MOCK_USER.fields.email);
  const [phone, setPhone] = useState(MOCK_USER.fields.phone);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleSave = async () => {
    setSaving(true);
    await new Promise((r) => setTimeout(r, 1200));
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const initials = MOCK_USER.name
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
              {MOCK_USER.avatarUrl ? (
                <img
                  src={MOCK_USER.avatarUrl}
                  alt={`Foto de ${MOCK_USER.name}`}
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-2xl font-bold text-white select-none">
                  {initials}
                </span>
              )}
            </div>
          </div>

          <button
            type="button"
            aria-label="Alterar foto de perfil"
            className="absolute bottom-0 right-0 flex items-center justify-center w-7 h-7 rounded-full bg-[#2585F4] border-2 border-[#0d1526] text-white hover:bg-[#1978E5] transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2585F4] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0d1526]"
          >
            <EditRounded sx={{ fontSize: 14 }} aria-hidden />
          </button>
        </div>

        <div className="flex flex-col items-center gap-2">
          <h1 className="text-2xl font-bold text-white tracking-tight">
            {MOCK_USER.name}
          </h1>
          <Badge text={MOCK_USER.plan} variant="blue" />
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
          onChange={(e) => setCpf(e.target.value)}
          inputMode="numeric"
          autoComplete="off"
        />
        <Input
          id="profile-email"
          label="E-mail"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoComplete="email"
        />
        <Input
          id="profile-phone"
          label="Telefone"
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          autoComplete="tel"
        />

        <Button
          variant="primary"
          size="lg"
          fullWidth
          loading={saving}
          onClick={handleSave}
          rightIcon={
            saved ? undefined : <SaveRounded fontSize="small" aria-hidden />
          }
          className={
            saved
              ? "bg-green-600 hover:bg-green-600 shadow-[0_4px_15px_rgba(34,197,94,0.35)]"
              : ""
          }
        >
          {saved ? "Alterações salvas!" : "Salvar alterações"}
        </Button>
      </section>

      <div className="w-full grid grid-cols-2 gap-3">
        <Button
          variant="outline"
          size="md"
          fullWidth
          leftIcon={<LockOutlined fontSize="small" aria-hidden />}
          href="/redefinir-senha"
        >
          Alterar Senha
        </Button>

        <Button
          variant="danger"
          size="md"
          fullWidth
          leftIcon={<DeleteOutlineRounded fontSize="small" aria-hidden />}
          className="bg-transparent border border-[#1B2233] text-red-400 hover:bg-red-500/10 hover:border-red-500/40 shadow-none"
        >
          Excluir Conta
        </Button>
      </div>
    </div>
  );
}
