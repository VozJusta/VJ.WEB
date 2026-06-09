"use client";

import Link from "next/link";
import { DescriptionRounded, DownloadRounded } from "@mui/icons-material";
import {
  AccessLogCard,
  type AccessLogEntry,
} from "@/components/ui/access-log-card";

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

type DocumentAccessHistoryFeatureProps = {
  documentId: string;
};

export function DocumentAccessHistoryFeature({
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  documentId,
}: DocumentAccessHistoryFeatureProps) {
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

      <div className="w-full flex flex-col gap-3">
        {accessLog.map((entry) => (
          <AccessLogCard key={entry.id} entry={entry} />
        ))}
      </div>

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

      {accessLog.length > 0 && (
        <button
          onClick={() => {
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

      <Link
        href="/dashboard/configuracoes/privacidade/documentos"
        className="text-sm text-[#2585F4] hover:text-[#3d96ff] transition-colors duration-150"
      >
        Voltar para Gerenciar Documentos
      </Link>
    </div>
  );
}
