"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const routeLabels: Record<string, string> = {
  "/dashboard": "Dashboard",
  "/documentos": "Documentos",
  "/chat": "Chat",
  "/simulador": "Simulador",
  "/perfil": "Perfil",
  "/configuracoes": "Configurações",
};

interface Crumb {
  label: string;
  href?: string;
}

function ChevronRightIcon() {
  return (
    <svg aria-hidden="true" className="w-3.5 h-3.5 text-white/25" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <polyline points="9,18 15,12 9,6" />
    </svg>
  );
}

export function DashboardBreadcrumb() {
  const pathname = usePathname();

  const crumbs: Crumb[] = [{ label: "Dashboard", href: "/dashboard" }];

  if (pathname !== "/dashboard") {
    const label = routeLabels[pathname] ?? pathname.split("/").pop() ?? "";
    crumbs.push({ label: label.charAt(0).toUpperCase() + label.slice(1) });
  }

  return (
    <nav aria-label="Breadcrumb">
      <ol className="flex items-center gap-1.5 list-none">
        {crumbs.map((crumb, index) => {
          const isLast = index === crumbs.length - 1;
          return (
            <li key={crumb.label} className="flex items-center gap-1.5">
              {!isLast ? (
                <>
                  <Link
                    href={crumb.href ?? "#"}
                    className="text-sm text-white/40 hover:text-white/70 transition-colors duration-150 focus-visible:outline-none focus-visible:underline"
                  >
                    {crumb.label}
                  </Link>
                  <ChevronRightIcon />
                </>
              ) : (
                <span className="text-sm font-semibold text-[#2585F4]" aria-current="page">
                  {crumb.label}
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
