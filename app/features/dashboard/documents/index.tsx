import Link from "next/link";
import { FileUpload } from "@/components/ui/file-upload";
import { DocumentFileItem } from "@/components/ui/document-file-item";
import { recentDocuments } from "./documents.data";
import { SaveAllButton } from "./save-all-button";

export function DocumentsFeature() {
  return (
    <main
      className="flex flex-col gap-6 w-full  px-4 py-6 md:px-6 md:py-8"
      aria-label="Gerenciamento de documentos"
    >
      <FileUpload
        accept="application/pdf,image/png,image/jpeg"
        maxSizeMB={10}
        multiple
        aria-labelledby="upload-heading"
      />

      <section aria-labelledby="recent-docs-heading">
        <header className="flex items-center justify-between mb-3">
          <h2
            id="recent-docs-heading"
            className="text-xs font-semibold tracking-widest uppercase text-white/40"
          >
            Arquivos Recentes
          </h2>
          <Link
            href="/documentos"
            className="text-xs font-medium text-[#2585F4] hover:text-[#1978E5] transition-colors duration-150 focus-visible:outline-none focus-visible:underline"
          >
            Ver todos
          </Link>
        </header>

        <ul className="flex flex-col gap-3" aria-label="Lista de documentos recentes">
          {recentDocuments.map((doc) => (
            <li key={doc.id}>
              <DocumentFileItem {...doc} />
            </li>
          ))}
        </ul>
      </section>

      <SaveAllButton />
    </main>
  );
}
