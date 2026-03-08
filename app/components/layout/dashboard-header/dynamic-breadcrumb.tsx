"use client";

import { usePathname } from "next/navigation";
import { Breadcrumb } from "@/app/components/ui/breadcrumb";
import type { BreadcrumbItem } from "@/app/components/ui/breadcrumb/breadcrumb.types";

const routeLabelMap: Record<string, string> = {
  dashboard: "Dashboard",
  documentos: "Documentos",
  chat: "Chat",
  simulador: "Simulador",
  perfil: "Perfil",
  configuracoes: "Configurações",
  casos: "Meus Casos",
};

const pageNameMap: Record<string, string> = {
  "/dashboard": "Resumo Geral",
  "/dashboard/documentos": "Documentos",
  "/dashboard/chat": "Chat",
  "/dashboard/simulador": "Simulador de Audiência",
  "/dashboard/perfil": "Meu Perfil",
  "/dashboard/configuracoes": "Configurações",
  "/dashboard/casos": "Meus Casos",
};

function buildBreadcrumbs(pathname: string): BreadcrumbItem[] {
  const segments = pathname.split("/").filter(Boolean);
  const items: BreadcrumbItem[] = [];

  for (let i = 0; i < segments.length; i++) {
    const segment = segments[i];
    const href = "/" + segments.slice(0, i + 1).join("/");
    const isLast = i === segments.length - 1;
    const label = isLast
      ? (pageNameMap[pathname] ?? routeLabelMap[segment] ?? segment)
      : (routeLabelMap[segment] ?? segment);

    items.push({ label, href: isLast ? undefined : href });
  }

  return items;
}

export function DynamicBreadcrumb() {
  const pathname = usePathname();
  const items = buildBreadcrumbs(pathname);

  return <Breadcrumb items={items} />;
}
