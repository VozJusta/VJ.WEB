"use client";

import { useCallback, useMemo, useState } from "react";
import { useToast } from "@/components/ui/toast/toast-provider";
import type { DocumentFileItemProps } from "@/components/ui/document-file-item/document-file-item.types";

export interface UseDocumentsActionsParams {
  initialDocuments: DocumentFileItemProps[];
}

function safeFilename(input: string): string {
  return input
    .replace(/[\u0000-\u001F\u007F]/g, "")
    .replace(/[\\/]/g, "-")
    .replace(/\s+/g, " ")
    .trim();
}

function getExtension(filename: string): string {
  const index = filename.lastIndexOf(".");
  if (index <= 0 || index === filename.length - 1) return "";
  return filename.slice(index);
}

export function useDocumentsActions({ initialDocuments }: UseDocumentsActionsParams) {
  const { toast } = useToast();
  const [documents, setDocuments] = useState<DocumentFileItemProps[]>(() => initialDocuments);

  const documentsById = useMemo(() => {
    return new Map(documents.map((doc) => [doc.id, doc] as const));
  }, [documents]);

  const handleDownload = useCallback(
    (id: string) => {
      const doc = documentsById.get(id);
      const filename = doc?.filename ?? "arquivo";

      toast({
        title: "Download indisponível",
        description: `O arquivo “${filename}” ainda não possui um link de download configurado.`,
        variant: "info",
      });
    },
    [documentsById, toast]
  );

  const handleRename = useCallback(
    (id: string) => {
      const doc = documentsById.get(id);
      if (!doc) {
        toast({
          title: "Documento não encontrado",
          description: "Não foi possível localizar o documento selecionado.",
          variant: "error",
        });
        return;
      }

      const currentExtension = getExtension(doc.filename);
      const raw = window.prompt("Novo nome do arquivo", doc.filename);
      if (raw == null) return;

      const sanitized = safeFilename(raw);
      if (!sanitized) {
        toast({
          title: "Nome inválido",
          description: "Informe um nome de arquivo válido.",
          variant: "warning",
        });
        return;
      }

      const nextFilename = sanitized.includes(".") || !currentExtension
        ? sanitized
        : `${sanitized}${currentExtension}`;

      if (nextFilename === doc.filename) return;

      setDocuments((prev) => prev.map((item) => (item.id === id ? { ...item, filename: nextFilename } : item)));

      toast({
        title: "Documento renomeado",
        description: `Agora o arquivo se chama “${nextFilename}”.`,
        variant: "success",
      });
    },
    [documentsById, toast]
  );

  const handleDelete = useCallback(
    (id: string) => {
      const doc = documentsById.get(id);
      if (!doc) {
        toast({
          title: "Documento não encontrado",
          description: "Não foi possível localizar o documento selecionado.",
          variant: "error",
        });
        return;
      }

      const confirmed = window.confirm(`Excluir “${doc.filename}”? Esta ação não pode ser desfeita.`);
      if (!confirmed) return;

      setDocuments((prev) => prev.filter((item) => item.id !== id));

      toast({
        title: "Documento excluído",
        description: `“${doc.filename}” foi removido da lista.`,
        variant: "success",
      });
    },
    [documentsById, toast]
  );

  return {
    documents,
    handleDownload,
    handleRename,
    handleDelete,
  };
}
