"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRightRounded } from "@mui/icons-material";

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
                  <ChevronRightRounded fontSize="small" aria-hidden className="text-white/25" />
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
