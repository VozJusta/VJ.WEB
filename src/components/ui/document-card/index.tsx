import Link from "next/link";
import {
  VisibilityRounded,
  ImageRounded,
  PictureAsPdfRounded,
  InsertDriveFileRounded,
} from "@mui/icons-material";
import { Toggle } from "@/src/components/ui/toggle";

export type DocumentItem = {
  id: string;
  name: string;
  type: "pdf" | "image" | "document";
  size: string;
  uploadDate: string;
  accessEnabled: boolean;
  accessCount: number;
};

type DocumentIconConfig = {
  icon: React.ElementType;
  bgColor: string;
  textColor: string;
};

function getDocumentIconConfig(type: DocumentItem["type"]): DocumentIconConfig {
  switch (type) {
    case "pdf":
      return {
        icon: PictureAsPdfRounded,
        bgColor: "bg-red-500/10",
        textColor: "text-red-400",
      };
    case "image":
      return {
        icon: ImageRounded,
        bgColor: "bg-orange-500/10",
        textColor: "text-orange-400",
      };
    case "document":
      return {
        icon: InsertDriveFileRounded,
        bgColor: "bg-green-500/10",
        textColor: "text-green-400",
      };
  }
}

function formatDateTime(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));

  if (diffInHours < 24) {
    const time = date.toLocaleTimeString("pt-BR", {
      hour: "2-digit",
      minute: "2-digit",
    });
    return `Enviado às ${time}`;
  }

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
  const { icon: Icon, bgColor, textColor } = getDocumentIconConfig(document.type);

  return (
    <article className="rounded-2xl bg-[#0D1B2E] border border-[#1B2233] p-5">
      <header className="flex items-start gap-4 mb-4">
        <span
          className={`flex items-center justify-center w-12 h-12 rounded-xl shrink-0 ${bgColor} ${textColor}`}
        >
          <Icon fontSize="medium" aria-hidden />
        </span>

        <div className="flex-1 min-w-0">
          <h3 className="text-base font-semibold text-white mb-1 truncate">
            {document.name}
          </h3>
          <time className="flex items-center gap-2 text-xs text-white/40">
            <span>{document.size}</span>
            <span aria-hidden>•</span>
            <span>{formatDateTime(document.uploadDate)}</span>
          </time>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <span className="text-xs font-medium text-white/50">
            Acesso ao Advogado
          </span>
          <Toggle
            checked={document.accessEnabled}
            onChange={(enabled) => onToggleAccess(document.id, enabled)}
            aria-label={`Acesso ao advogado para ${document.name}`}
          />
        </div>
      </header>

      {document.accessCount > 0 && (
        <footer className="pt-4 border-t border-[#1B2233]">
          <Link
            href={`/dashboard/configuracoes/privacidade/documentos/${document.id}/historico`}
            className="flex items-center justify-center gap-2 w-full px-4 py-2.5 rounded-lg bg-white/5 hover:bg-white/10 transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2585F4] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0D1B2E]"
          >
            <VisibilityRounded fontSize="small" className="text-white/50" aria-hidden />
            <span className="text-sm font-medium text-white/70">
              VER QUEM ACESSOU
            </span>
          </Link>
        </footer>
      )}
    </article>
  );
}
