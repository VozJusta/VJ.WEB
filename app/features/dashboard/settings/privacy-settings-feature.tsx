"use client";

import Link from "next/link";
import { useState } from "react";
import {
  ShareRounded,
  FolderOpenRounded,
  LockRounded,
  DeleteForeverRounded,
  ChevronRightRounded,
  InfoOutlined,
} from "@mui/icons-material";
import { Toggle } from "@/components/ui/toggle";
import { Button } from "@/components/ui/button";

type PrivacyCardProps =
  | {
      icon: React.ElementType;
      title: string;
      description: string;
      type: "link";
      href: string;
    }
  | {
      icon: React.ElementType;
      title: string;
      description: string;
      type: "action";
      onClick: () => void;
      variant?: "default" | "danger";
    };

function PrivacyCard(props: PrivacyCardProps) {
  const Icon = props.icon;
  const isDanger = props.type === "action" && props.variant === "danger";

  const inner = (
    <div className="flex items-start gap-4 p-5">
      <span
        className={`flex items-center justify-center w-10 h-10 rounded-xl shrink-0 ${
          isDanger
            ? "bg-red-500/10 text-red-400"
            : "bg-[#2585F4]/15 text-[#2585F4]"
        }`}
      >
        <Icon fontSize="small" aria-hidden />
      </span>

      <div className="flex-1 min-w-0">
        <h3
          className={`text-sm font-semibold mb-1 ${
            isDanger ? "text-red-400" : "text-white"
          }`}
        >
          {props.title}
        </h3>
        <p className="text-sm text-white/50">{props.description}</p>
      </div>

      {props.type === "link" && (
        <ChevronRightRounded
          className="text-white/40 shrink-0 mt-1"
          fontSize="small"
          aria-hidden
        />
      )}
    </div>
  );

  if (props.type === "link") {
    return (
      <Link
        href={props.href}
        className="block rounded-2xl bg-[#111c30] border border-[#1B2233] hover:border-[#2a3547] hover:bg-[#152036] transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2585F4]"
      >
        {inner}
      </Link>
    );
  }

  return (
    <button
      onClick={props.onClick}
      className={`w-full text-left rounded-2xl bg-[#111c30] border transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 ${
        isDanger
          ? "border-red-500/20 hover:border-red-500/40 hover:bg-red-500/5 focus-visible:ring-red-500"
          : "border-[#1B2233] hover:border-[#2a3547] hover:bg-[#152036] focus-visible:ring-[#2585F4]"
      }`}
    >
      {inner}
    </button>
  );
}

export function PrivacySettingsFeature() {
  const [documentSharing, setDocumentSharing] = useState(true);

  const handleDeleteAccount = () => {
    if (
      window.confirm(
        "Tem certeza que deseja excluir sua conta? Esta ação não pode ser desfeita."
      )
    ) {
      // TODO: Implement account deletion
      console.log("Delete account");
    }
  };

  return (
    <div className="flex flex-col items-center gap-5 w-full max-w-2xl mx-auto px-4 py-6 md:px-0 md:py-8">
      <div className="w-full flex flex-col gap-2">
        <h1 className="text-xs font-semibold tracking-widest uppercase text-[#2585F4]">
          Privacidade
        </h1>
        <p className="text-sm text-white/50">
          Gerencie como seus dados são compartilhados e acessados
        </p>
      </div>

      {/* Document Sharing Toggle */}
      <section
        className="w-full rounded-2xl bg-[#111c30] border-2 border-[#1B2233] p-5"
        aria-label="Compartilhamento de documentos"
      >
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-start gap-3 flex-1">
            <span className="flex items-center justify-center w-10 h-10 rounded-xl bg-[#2585F4]/15 text-[#2585F4] shrink-0">
              <ShareRounded fontSize="small" aria-hidden />
            </span>
            <div className="flex-1 min-w-0">
              <h2 className="text-sm font-semibold text-white mb-1">
                Compartilhamento de Documentos
              </h2>
              <p className="text-sm text-white/50">
                Permite que advogados acessem seus documentos compartilhados
              </p>
            </div>
          </div>
          <Toggle
            checked={documentSharing}
            onChange={setDocumentSharing}
            aria-label="Compartilhamento de documentos"
          />
        </div>

        {documentSharing && (
          <div className="mt-4 p-3 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-start gap-2">
            <InfoOutlined
              fontSize="small"
              className="text-blue-400 shrink-0 mt-0.5"
              aria-hidden
            />
            <p className="text-xs text-blue-200/80">
              Seus documentos estão protegidos por criptografia de ponta a
              ponta. Apenas advogados autorizados podem acessá-los.
            </p>
          </div>
        )}
      </section>

      {/* Privacy Actions */}
      <div className="w-full flex flex-col gap-3">
        <PrivacyCard
          icon={FolderOpenRounded}
          title="Gerenciar Documentos"
          description="Controle quais documentos podem ser acessados e veja o histórico de acessos"
          type="link"
          href="/dashboard/configuracoes/privacidade/documentos"
        />

        <PrivacyCard
          icon={LockRounded}
          title="Criptografia de Dados"
          description="Todos os seus dados são criptografados usando AES-256 e TLS 1.3"
          type="action"
          onClick={() => {
            alert(
              "Seus dados estão protegidos com:\n\n• Criptografia AES-256 em repouso\n• TLS 1.3 para transmissão\n• Criptografia de ponta a ponta para documentos sensíveis"
            );
          }}
        />

        <PrivacyCard
          icon={DeleteForeverRounded}
          title="Excluir Conta"
          description="Remover permanentemente sua conta e todos os dados associados"
          type="action"
          onClick={handleDeleteAccount}
          variant="danger"
        />
      </div>

      {/* Back to Settings */}
      <Link
        href="/dashboard/configuracoes"
        className="text-sm text-[#2585F4] hover:text-[#3d96ff] transition-colors duration-150"
      >
        ← Voltar para Configurações
      </Link>
    </div>
  );
}
