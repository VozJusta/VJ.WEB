"use client";

import Link from "next/link";
import Image from "next/image";
import { DescriptionRounded, DownloadRounded } from "@mui/icons-material";
import { Badge } from "@/components/ui/badge";

type AccessLogEntry = {
  id: string;
  userType: "lawyer" | "admin" | "support";
  userName: string;
  userAvatar: string;
  accessedAt: string;
  reason: string;
  ipAddress?: string;
};

const mockAccessLog: AccessLogEntry[] = [
  {
    id: "1",
    userType: "lawyer",
    userName: "Dr. Carlos Mendes",
    userAvatar: "https://i.pravatar.cc/150?img=12",
    accessedAt: "2024-01-20T14:30:00",
    reason: "Análise inicial do caso para elaboração de petição",
  },
  {
    id: "2",
    userType: "lawyer",
    userName: "Dra. Ana Paula Silva",
    userAvatar: "https://i.pravatar.cc/150?img=45",
    accessedAt: "2024-01-19T10:15:00",
    reason: "Verificação de documentos para audiência",
  },
  {
    id: "3",
    userType: "lawyer",
    userName: "Dr. Roberto Santos",
    userAvatar: "https://i.pravatar.cc/150?img=33",
    accessedAt: "2024-01-18T16:45:00",
    reason: "Consulta para parecer jurídico",
  },
  {
    id: "4",
    userType: "admin",
    userName: "Sistema Voz Justa",
    userAvatar: "https://i.pravatar.cc/150?img=60",
    accessedAt: "2024-01-15T09:00:00",
    reason: "Verificação automática de conformidade",
  },
];

function formatDateTime(dateString: string): string {
  const date = new Date(dateString);
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);

  const isToday = date.toDateString() === today.toDateString();
  const isYesterday = date.toDateString() === yesterday.toDateString();

  const time = date.toLocaleTimeString("pt-BR", {
    hour: "2-digit",
    minute: "2-digit",
  });

  if (isToday) {
    return `Hoje às ${time}`;
  } else if (isYesterday) {
    return `Ontem às ${time}`;
  } else {
    const dateStr = date.toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "short",
    });
    return `${dateStr} às ${time}`;
  }
}

function getUserTypeBadge(userType: AccessLogEntry["userType"]) {
  switch (userType) {
    case "lawyer":
      return <Badge variant="blue" text="ADVOGADO" />;
    case "admin":
      return (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-semibold bg-purple-500/15 text-purple-400 border border-purple-500/30">
          ADMIN
        </span>
      );
    case "support":
      return (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-semibold bg-green-500/15 text-green-400 border border-green-500/30">
          SUPORTE
        </span>
      );
  }
}

type AccessLogCardProps = {
  entry: AccessLogEntry;
};

function AccessLogCard({ entry }: AccessLogCardProps) {
  return (
    <div className="flex items-start gap-4 p-4 rounded-xl bg-[#111c30] border border-[#1B2233]">
      <div className="relative w-12 h-12 rounded-full overflow-hidden shrink-0 ring-2 ring-[#1B2233]">
        <Image
          src={entry.userAvatar}
          alt={entry.userName}
          fill
          className="object-cover"
          sizes="48px"
        />
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2 mb-2">
          <div className="flex items-center gap-2 flex-wrap">
            <h3 className="text-sm font-semibold text-white">
              {entry.userName}
            </h3>
            {getUserTypeBadge(entry.userType)}
          </div>
        </div>

        <p className="text-sm text-white/70 mb-2">{entry.reason}</p>

        <div className="flex items-center gap-2 text-xs text-white/40">
          <span>{formatDateTime(entry.accessedAt)}</span>
          {entry.ipAddress && (
            <>
              <span>•</span>
              <span>IP: {entry.ipAddress}</span>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

type DocumentAccessHistoryFeatureProps = {
  documentId: string;
};

export function DocumentAccessHistoryFeature({
  documentId,
}: DocumentAccessHistoryFeatureProps) {
  // In a real app, fetch document and access log based on documentId
  const documentName = "RG - Frente e Verso.pdf";
  const accessLog = mockAccessLog;

  return (
    <div className="flex flex-col items-center gap-5 w-full max-w-2xl mx-auto px-4 py-6 md:px-0 md:py-8">
      <div className="w-full flex flex-col gap-2">
        <h1 className="text-xs font-semibold tracking-widest uppercase text-[#2585F4]">
          Histórico de Acesso
        </h1>
        <p className="text-sm text-white/50">
          Veja quem acessou este documento
        </p>
      </div>

      {/* Document Info Card */}
      <div className="w-full rounded-xl bg-[#111c30] border-2 border-[#1B2233] p-5">
        <div className="flex items-center gap-3">
          <span className="flex items-center justify-center w-12 h-12 rounded-xl bg-[#2585F4]/15 text-[#2585F4]">
            <DescriptionRounded aria-hidden />
          </span>
          <div className="flex-1 min-w-0">
            <h2 className="text-base font-semibold text-white mb-1 truncate">
              {documentName}
            </h2>
            <p className="text-sm text-white/50">
              {accessLog.length} {accessLog.length === 1 ? "acesso" : "acessos"}{" "}
              registrados
            </p>
          </div>
        </div>
      </div>

      {/* Access Log */}
      <div className="w-full flex flex-col gap-3">
        {accessLog.map((entry) => (
          <AccessLogCard key={entry.id} entry={entry} />
        ))}
      </div>

      {/* Empty State */}
      {accessLog.length === 0 && (
        <div className="w-full rounded-xl bg-[#111c30] border border-[#1B2233] p-8 text-center">
          <span className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/05 text-white/30 mb-4">
            <DescriptionRounded fontSize="large" aria-hidden />
          </span>
          <h3 className="text-base font-semibold text-white mb-2">
            Nenhum acesso registrado
          </h3>
          <p className="text-sm text-white/50">
            Este documento ainda não foi acessado por nenhum advogado
          </p>
        </div>
      )}

      {/* Export Option */}
      {accessLog.length > 0 && (
        <button
          onClick={() => {
            // TODO: Implement export functionality
            alert("Exportar histórico de acesso em formato PDF");
          }}
          className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-[#111c30] border border-[#1B2233] hover:border-[#2a3547] hover:bg-[#152036] transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2585F4]"
        >
          <DownloadRounded fontSize="small" className="text-white/50" aria-hidden />
          <span className="text-sm font-medium text-white/70">
            Exportar Histórico
          </span>
        </button>
      )}

      {/* Back Link */}
      <Link
        href="/dashboard/configuracoes/privacidade/documentos"
        className="text-sm text-[#2585F4] hover:text-[#3d96ff] transition-colors duration-150"
      >
        ← Voltar para Gerenciar Documentos
      </Link>
    </div>
  );
}
