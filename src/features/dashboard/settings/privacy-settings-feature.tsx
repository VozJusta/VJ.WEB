"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  FolderOpenRounded,
  ShieldRounded,
  ErrorRounded,
  LockOutline,
  WarningAmberRounded,
} from "@mui/icons-material";
import { Toggle } from "@/components/ui/toggle";
import { PrivacyCard } from "@/components/ui/privacy-card";
import { PrivacySettingCard } from "@/components/ui/privacy-setting-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/toast/toast-provider";
import { userService } from "@/services/user.service";
import { authStorage } from "@/lib/auth";

export function PrivacySettingsFeature() {
  const router = useRouter();
  const { toast } = useToast();
  const [documentSharing, setDocumentSharing] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [password, setPassword] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDeleteAccount = async () => {
    if (!password.trim()) return;
    setIsDeleting(true);
    try {
      await userService.deleteAccount(password);
      toast({ title: "Conta excluída", description: "Seus dados foram removidos permanentemente.", variant: "success" });
      authStorage.logout();
      router.push("/login");
    } catch (err) {
      toast({
        title: "Erro ao excluir conta",
        description: err instanceof Error ? err.message : "Tente novamente.",
        variant: "error",
      });
    } finally {
      setIsDeleting(false);
      setShowModal(false);
      setPassword("");
    }
  };

  return (
    <div className="flex flex-col items-start gap-8 w-full max-w-3xl mx-auto px-4 py-6 md:px-6 md:py-8">
      <div className="w-full flex flex-col gap-3">
        <h1 className="text-2xl md:text-3xl font-bold text-white">
          Privacidade e Segurança
        </h1>
        <p className="text-sm md:text-base text-white/60 leading-relaxed">
          Controle suas preferências de privacidade e proteja seus dados de
          acordo com os padrões LGPD de segurança. Sua segurança é nossa
          prioridade fundamental.
        </p>
      </div>

      <section className="w-full flex flex-col gap-4" aria-label="Configurações de acesso">
        <h2 className="text-xs font-semibold tracking-widest uppercase text-white/40">
          CONFIGURAÇÕES DE ACESSO
        </h2>

        <PrivacySettingCard
          title="Compartilhamento"
          description="Permitir que advogados parceiros visualizem seus documentos básicos para pré-análise jurídica."
          rightElement={
            <Toggle
              checked={documentSharing}
              onChange={setDocumentSharing}
              aria-label="Compartilhamento de documentos"
            />
          }
        />

        <PrivacyCard
          icon={FolderOpenRounded}
          title="Gerenciar Documentos"
          description="Acessos e permissões individuais"
          type="link"
          href="/dashboard/configuracoes/privacidade/documentos"
        />
      </section>

      <section className="w-full flex flex-col gap-4" aria-label="Proteção ativa">
        <h2 className="text-xs font-semibold tracking-widest uppercase text-white/40">
          PROTEÇÃO ATIVA
        </h2>

        <PrivacySettingCard
          icon={ShieldRounded}
          iconColor="green"
          title="Criptografia de Ponta a Ponta"
          description="Seus dados são protegidos por criptografia AES-256 em repouso e TLS em trânsito. Somente você e quem você autorizar têm acesso às informações."
        />
      </section>

      <section className="w-full flex flex-col gap-4" aria-label="Zona crítica">
        <h2 className="text-xs font-semibold tracking-widest uppercase text-white/40">
          ZONA CRÍTICA
        </h2>

        <div className="w-full rounded-2xl bg-[#0D1B2E] border border-red-500/20 p-6">
          <div className="flex items-start gap-4 mb-5">
            <span className="flex items-center justify-center w-10 h-10 rounded-xl bg-red-500/15 text-red-400 shrink-0">
              <ErrorRounded fontSize="small" aria-hidden />
            </span>
            <div className="flex-1 min-w-0">
              <h3 className="text-base font-semibold text-red-400 mb-1">
                Zona de Perigo
              </h3>
              <p className="text-sm text-white/50 leading-relaxed">
                Ao excluir sua conta, todos os seus dados e documentos serão
                permanentemente removidos da nossos servidores. Esta ação é
                irreversível conforme o RNF07 da LGPD.
              </p>
            </div>
          </div>

          <button
            onClick={() => setShowModal(true)}
            className="w-full px-4 py-3 rounded-xl bg-red-500 hover:bg-red-600 text-white font-semibold text-sm transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0D1B2E]"
          >
            EXCLUIR CONTA
          </button>
        </div>
      </section>

      {showModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm px-4"
          onClick={() => { if (!isDeleting) { setShowModal(false); setPassword(""); } }}
        >
          <div
            className="w-full max-w-md rounded-2xl bg-[#111c30] border border-red-500/20 p-6 flex flex-col gap-5"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-3">
              <span className="flex items-center justify-center w-10 h-10 rounded-full bg-red-500/15">
                <WarningAmberRounded className="text-red-400" />
              </span>
              <h2 className="text-lg font-bold text-white">Excluir conta permanentemente</h2>
            </div>

            <p className="text-sm text-white/60 leading-relaxed">
              Esta ação é <strong className="text-white">irreversível</strong>. Todos os seus dados, documentos e histórico serão permanentemente excluídos de nossos servidores conforme a LGPD.
            </p>

            <Input
              id="delete-password"
              type="password"
              label="CONFIRME SUA SENHA"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              leftIcon={<LockOutline fontSize="small" aria-hidden />}
              containerClassName="space-y-2"
              className="h-12 rounded-xl border-white/10 bg-[#05112A] text-sm text-white placeholder:text-white/35"
            />

            <div className="flex gap-3">
              <Button
                variant="ghost"
                size="md"
                fullWidth
                onClick={() => { setShowModal(false); setPassword(""); }}
                disabled={isDeleting}
                className="border border-[#1B2233] text-white/70 hover:text-white hover:bg-white/8"
              >
                Cancelar
              </Button>
              <Button
                size="md"
                fullWidth
                loading={isDeleting}
                disabled={!password.trim() || isDeleting}
                onClick={handleDeleteAccount}
                className="bg-red-500 hover:bg-red-600 text-white border-transparent"
              >
                Excluir conta
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
