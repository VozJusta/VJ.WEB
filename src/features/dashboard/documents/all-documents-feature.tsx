"use client";

import Link from "next/link";
import { ArrowBackRounded } from "@mui/icons-material";
import { DocumentFileItem } from "@/components/ui/document-file-item";
import { allDocuments } from "./documents.data";
import type { DocumentFileItemProps } from "@/components/ui/document-file-item/document-file-item.types";

export function AllDocumentsFeature() {

  return (
    <main
      className="flex flex-col gap-6 w-full px-4 py-6 md:px-6 md:py-8"
      aria-label="Todos os documentos"
    >
      <header className="flex items-center gap-3">
        <Link
          href="/dashboard/documentos"
          aria-label="Voltar para documentos"
          className="flex items-center justify-center w-9 h-9 rounded-lg text-white/50 hover:text-white hover:bg-white/08 transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2585F4]"
        >
          <ArrowBackRounded fontSize="small" aria-hidden />
        </Link>
        <h1 className="text-2xl font-bold text-white tracking-tight">
          Todos documentos
        </h1>
      </header>

      <section aria-labelledby="all-docs-heading">
        <h2
          id="all-docs-heading"
          className="text-xs font-semibold tracking-widest uppercase text-white/40 mb-3"
        >
          Informações do arquivo
        </h2>

        <ul className="flex flex-col gap-3" aria-label="Lista completa de documentos">
          {allDocuments.map((doc: DocumentFileItemProps) => (
            <li key={doc.id}>
              <DocumentFileItem
                {...doc}
                onDownload={handleDownload}
                onRename={handleRename}
                onDelete={handleDelete}
              />
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
