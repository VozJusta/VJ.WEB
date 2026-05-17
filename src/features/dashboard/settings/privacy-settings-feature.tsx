"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  FolderOpenRounded,
  ShieldRounded,
  ErrorRounded,
} from "@mui/icons-material";
import { Toggle } from "@/components/ui/toggle";
import { PrivacyCard } from "@/components/ui/privacy-card";
import { PrivacySettingCard } from "@/components/ui/privacy-setting-card";

export function PrivacySettingsFeature() {
  const router = useRouter();
  const [documentSharing, setDocumentSharing] = useState(true);

  const handleDeleteAccount = () => {
    router.push("/dashboard/configuracoes");
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
            onClick={handleDeleteAccount}
            className="w-full px-4 py-3 rounded-xl bg-red-500 hover:bg-red-600 text-white font-semibold text-sm transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0D1B2E]"
          >
            EXCLUIR CONTA
          </button>
        </div>
      </section>
    </div>
  );
}
