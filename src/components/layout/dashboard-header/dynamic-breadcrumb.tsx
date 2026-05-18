"use client";

import { usePathname } from "next/navigation";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import type { BreadcrumbItem } from "@/components/ui/breadcrumb/breadcrumb.types";

const routeLabelMap: Record<string, string> = {
  dashboard: "Dashboard",
  documentos: "Documentos",
  chat: "Chat com IA",
  simulador: "Simulador",
  perfil: "Perfil",
  configuracoes: "Configurações",
  casos: "Meus Casos",
  advogados: "Especialistas",
  notificacoes: "Notificações",
  novo: "Novo Caso",
  analise: "Análise",
  sessao: "Sessão",
  feedback: "Feedback",
  enviar: "Enviar Dossiê",
  "alterar-senha": "Alterar Senha",
  // Lawyer area
  advogado: "Dashboard",
  solicitacoes: "Solicitações",
};

const pageNameMap: Record<string, string> = {
  "/dashboard": "Resumo Geral",
  "/dashboard/documentos": "Documentos",
  "/dashboard/simulador": "Simulador de Audiência",
  "/dashboard/perfil": "Meu Perfil",
  "/dashboard/configuracoes": "Configurações",
  "/dashboard/casos": "Meus Casos",
  "/dashboard/casos/novo": "Novo Caso",
  // Lawyer area
  "/advogado": "Resumo Geral",
  "/advogado/solicitacoes": "Solicitações",
  "/advogado/notificacoes": "Notificações",
  "/advogado/perfil": "Perfil Profissional",
  "/advogado/configuracoes": "Configurações",
};

const UUID_PATTERN = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

function isUUID(segment: string): boolean {
  return UUID_PATTERN.test(segment);
}

function buildBreadcrumbs(pathname: string): BreadcrumbItem[] {
  const segments = pathname.split("/").filter(Boolean);
  const items: BreadcrumbItem[] = [];

  for (let i = 0; i < segments.length; i++) {
    const segment = segments[i];
    if (isUUID(segment)) continue;

    const href = "/" + segments.slice(0, i + 1).join("/");
    const isLast = i === segments.length - 1 || segments.slice(i + 1).every(isUUID);
    const label = isLast
      ? (pageNameMap[pathname] ?? routeLabelMap[segment] ?? routeLabelMap[segment.toLowerCase()] ?? segment)
      : (routeLabelMap[segment] ?? routeLabelMap[segment.toLowerCase()] ?? segment);

    items.push({ label, href: isLast ? undefined : href });
  }

  return items;
}

export function DynamicBreadcrumb() {
  const pathname = usePathname();
  const items = buildBreadcrumbs(pathname);

  return <Breadcrumb items={items} />;
}
