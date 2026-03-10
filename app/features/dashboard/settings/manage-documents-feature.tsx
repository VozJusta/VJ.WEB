"use client";

import Link from "next/link";
import { useState } from "react";
import { DescriptionRounded } from "@mui/icons-material";
import { Button } from "@/components/ui/button";
import {
  DocumentCard,
  type DocumentItem,
} from "@/components/ui/document-card";

const mockDocuments: DocumentItem[] = [
  {
    id: "1",
    name: "RG - Frente e Verso.pdf",
    type: "pdf",
    size: "2.4 MB",
    uploadDate: "2024-01-15",
    accessEnabled: true,
    accessCount: 3,
  },
  {
    id: "2",
    name: "Comprovante de Residência.pdf",
    type: "pdf",
    size: "1.8 MB",
    uploadDate: "2024-01-15",
    accessEnabled: true,
    accessCount: 2,
  },
  {
    id: "3",
    name: "Certidão de Nascimento.pdf",
    type: "pdf",
    size: "3.2 MB",
    uploadDate: "2024-01-14",
    accessEnabled: false,
    accessCount: 0,
  },
  {
    id: "4",
    name: "Foto do Local - Evidência.jpg",
    type: "image",
    size: "4.1 MB",
    uploadDate: "2024-01-14",
    accessEnabled: true,
    accessCount: 5,
  },
  {
    id: "5",
    name: "Contrato de Trabalho.pdf",
    type: "pdf",
    size: "1.2 MB",
    uploadDate: "2024-01-13",
    accessEnabled: true,
    accessCount: 1,
  },
];

export function ManageDocumentsFeature() {
  const [documents, setDocuments] = useState(mockDocuments);

  const handleToggleAccess = (id: string, enabled: boolean) => {
    setDocuments((prev) =>
      prev.map((doc) =>
        doc.id === id ? { ...doc, accessEnabled: enabled } : doc
      )
    );
  };

  const enabledCount = documents.filter((doc) => doc.accessEnabled).length;
  const totalCount = documents.length;

  return (
    <div className="flex flex-col items-center gap-5 w-full max-w-2xl mx-auto px-4 py-6 md:px-0 md:py-8">
      <div className="w-full flex flex-col gap-2">
        <h1 className="text-xs font-semibold tracking-widest uppercase text-[#2585F4]">
          Gerenciar Documentos
        </h1>
        <p className="text-sm text-white/50">
          Controle quais documentos podem ser acessados por advogados
        </p>
      </div>

      {/* Summary Card */}
      <div className="w-full rounded-xl bg-[#111c30] border-2 border-[#1B2233] p-5">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-2xl font-bold text-white mb-1">
              {enabledCount} de {totalCount}
            </p>
            <p className="text-sm text-white/50">
              documentos com acesso permitido
            </p>
          </div>
          <span className="flex items-center justify-center w-12 h-12 rounded-xl bg-[#2585F4]/15 text-[#2585F4]">
            <DescriptionRounded aria-hidden />
          </span>
        </div>
      </div>

      {/* Documents List */}
      <div className="w-full flex flex-col gap-3">
        {documents.map((document) => (
          <DocumentCard
            key={document.id}
            document={document}
            onToggleAccess={handleToggleAccess}
          />
        ))}
      </div>

      {documents.length === 0 && (
        <div className="w-full rounded-xl bg-[#111c30] border border-[#1B2233] p-8 text-center">
          <span className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/05 text-white/30 mb-4">
            <DescriptionRounded fontSize="large" aria-hidden />
          </span>
          <h3 className="text-base font-semibold text-white mb-2">
            Nenhum documento ainda
          </h3>
          <p className="text-sm text-white/50 mb-4">
            Faça upload de documentos para gerenciar o acesso
          </p>
          <Button asChild>
            <Link href="/dashboard/documentos">
              Ir para Documentos
            </Link>
          </Button>
        </div>
      )}

      <Link
        href="/dashboard/configuracoes/privacidade"
        className="text-sm text-[#2585F4] hover:text-[#3d96ff] transition-colors duration-150"
      >
        Voltar para Privacidade
      </Link>
    </div>
  );
}
