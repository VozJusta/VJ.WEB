import Link from "next/link";
import {
  VisibilityRounded,
  ImageRounded,
  PictureAsPdfRounded,
  InsertDriveFileRounded,
} from "@mui/icons-material";
import { Toggle } from "@/components/ui/toggle";

export type DocumentItem = {
  id: string;
  name: string;
  type: "pdf" | "image" | "document";
  size: string;
  uploadDate: string;
  accessEnabled: boolean;
  accessCount: number;
};

function getDocumentIcon(type: DocumentItem["type"]) {
  switch (type) {
    case "pdf":
      return PictureAsPdfRounded;
    case "image":
      return ImageRounded;
    case "document":
      return InsertDriveFileRounded;
  }
}

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

type DocumentCardProps = {
  document: DocumentItem;
  onToggleAccess: (id: string, enabled: boolean) => void;
};

export function DocumentCard({ document, onToggleAccess }: DocumentCardProps) {
  const Icon = getDocumentIcon(document.type);

  return (
    <div className="rounded-xl bg-[#111c30] border border-[#1B2233] p-4">
      <div className="flex items-start gap-3 mb-4">
        <span className="flex items-center justify-center w-10 h-10 rounded-lg bg-white/05 text-white/50 shrink-0">
          <Icon fontSize="small" aria-hidden />
        </span>

        <div className="flex-1 min-w-0">
          <h3 className="text-sm font-semibold text-white mb-1 truncate">
            {document.name}
          </h3>
          <div className="flex items-center gap-2 text-xs text-white/40">
            <span>{document.size}</span>
            <span>•</span>
            <span>{formatDate(document.uploadDate)}</span>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between gap-4 pt-3 border-t border-[#1B2233]">
        <div className="flex items-center gap-2">
          <span className="text-xs text-white/50">Permitir acesso</span>
          <Toggle
            checked={document.accessEnabled}
            onChange={(enabled) => onToggleAccess(document.id, enabled)}
            aria-label={`Permitir acesso ao documento ${document.name}`}
          />
        </div>

        {document.accessCount > 0 && (
          <Link
            href={`/dashboard/configuracoes/privacidade/documentos/${document.id}/historico`}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/05 hover:bg-white/10 transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2585F4]"
          >
            <VisibilityRounded
              fontSize="small"
              className="text-white/50"
              aria-hidden
            />
            <span className="text-xs font-medium text-white/70">
              Ver Quem Acessou ({document.accessCount})
            </span>
          </Link>
        )}
      </div>
    </div>
  );
}
