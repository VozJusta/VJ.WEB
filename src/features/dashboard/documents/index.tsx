"use client";

import { useEffect, useState, useCallback } from "react";
import { InsertDriveFileRounded, ImageRounded } from "@mui/icons-material";
import Link from "next/link";
import { evidenceService, Evidence } from "@/services/evidence.service";
import { useToast } from "@/components/ui/toast/toast-provider";

function getFileIcon(url: string) {
  const lower = url.toLowerCase();
  if (lower.match(/\.(jpg|jpeg|png)(\?|$)/)) {
    return <ImageRounded fontSize="small" aria-hidden />;
  }
  return <InsertDriveFileRounded fontSize="small" aria-hidden />;
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

export function DocumentsFeature() {
  const { toast } = useToast();
  const [evidences, setEvidences] = useState<Evidence[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isUploading, setIsUploading] = useState(false);

  const loadEvidences = useCallback(async () => {
    try {
      const data = await evidenceService.list();
      setEvidences(data);
    } catch {
      // silently fail — list stays empty
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadEvidences();
  }, [loadEvidences]);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setIsUploading(true);
    let successCount = 0;

    for (const file of Array.from(files)) {
      try {
        await evidenceService.upload(file);
        successCount++;
      } catch (err) {
        toast({
          title: `Erro ao enviar ${file.name}`,
          description: err instanceof Error ? err.message : "Tente novamente.",
          variant: "error",
        });
      }
    }

    if (successCount > 0) {
      toast({
        title: successCount === 1 ? "Arquivo enviado" : `${successCount} arquivos enviados`,
        variant: "success",
      });
      await loadEvidences();
    }

    setIsUploading(false);
    e.target.value = "";
  };

  const recent = evidences.slice(0, 5);

  return (
    <main
      className="flex flex-col gap-6 w-full px-4 py-6 md:px-6 md:py-8"
      aria-label="Gerenciamento de documentos"
    >
      {/* Upload zone */}
      <section aria-labelledby="upload-heading">
        <label
          id="upload-heading"
          htmlFor="doc-upload"
          className={`flex flex-col items-center justify-center gap-3 rounded-2xl border-2 border-dashed px-6 py-10 text-center transition-colors cursor-pointer ${
            isUploading
              ? "border-[#2585F4]/50 bg-[#2585F4]/05 cursor-not-allowed"
              : "border-[#1B2233] hover:border-[#2585F4]/50 hover:bg-[#2585F4]/05"
          }`}
        >
          {isUploading ? (
            <>
              <span className="h-6 w-6 animate-spin rounded-full border-2 border-[#2585F4] border-t-transparent" />
              <span className="text-sm text-white/50">Enviando...</span>
            </>
          ) : (
            <>
              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#1B2233] text-white/50">
                <InsertDriveFileRounded />
              </span>
              <div>
                <p className="text-sm font-medium text-white/80">Clique para enviar arquivos</p>
                <p className="text-xs text-white/40 mt-1">JPG, JPEG, PNG ou PDF • máx. 10 MB</p>
              </div>
            </>
          )}
          <input
            id="doc-upload"
            type="file"
            accept=".jpg,.jpeg,.png,.pdf"
            multiple
            className="sr-only"
            disabled={isUploading}
            onChange={handleFileChange}
          />
        </label>
      </section>

      {/* Recent evidences */}
      <section aria-labelledby="recent-docs-heading">
        <header className="flex items-center justify-between mb-3">
          <h2
            id="recent-docs-heading"
            className="text-xs font-semibold tracking-widest uppercase text-white/40"
          >
            Arquivos Recentes
          </h2>
          {evidences.length > 5 && (
            <Link
              href="/dashboard/documentos/todos"
              className="text-xs font-medium text-[#2585F4] hover:text-[#1978E5] transition-colors duration-150 focus-visible:outline-none focus-visible:underline"
            >
              Ver todos ({evidences.length})
            </Link>
          )}
        </header>

        {isLoading ? (
          <ul className="flex flex-col gap-3" aria-label="Carregando documentos">
            {[1, 2, 3].map((i) => (
              <li key={i} className="h-14 animate-pulse rounded-xl bg-[#111c30]" />
            ))}
          </ul>
        ) : recent.length === 0 ? (
          <p className="text-sm text-white/40 text-center py-8">
            Nenhum arquivo enviado ainda.
          </p>
        ) : (
          <ul className="flex flex-col gap-3" aria-label="Lista de documentos recentes">
            {recent.map((ev) => {
              const filename = ev.public_id || ev.url.split("/").pop() || "Arquivo";
              return (
                <li key={ev.id}>
                  <a
                    href={ev.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 rounded-xl border border-[#1B2233] bg-[#111c30] px-4 py-3 text-sm text-[#2585F4] hover:bg-[#0d1526] transition-colors"
                  >
                    {getFileIcon(ev.url)}
                    <span className="flex-1 truncate text-white/80">{filename}</span>
                    <span className="text-xs text-white/35 shrink-0">{formatDate(ev.created_at)}</span>
                  </a>
                </li>
              );
            })}
          </ul>
        )}
      </section>
    </main>
  );
}
