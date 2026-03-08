"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { mainNavItems, bottomNavItems } from "./dashboard-sidebar.navigation";
import type { SidebarNavItem } from "./dashboard-sidebar.navigation";

type IconName = SidebarNavItem["icon"];

function NavIcon({ name }: { name: IconName }) {
  const props = {
    className: "w-5 h-5 flex-shrink-0",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.75,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
  };

  if (name === "home") return (
    <svg {...props}><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9,22 9,12 15,12 15,22"/></svg>
  );
  if (name === "documents") return (
    <svg {...props}><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14,2 14,8 20,8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>
  );
  if (name === "chat") return (
    <svg {...props}><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
  );
  if (name === "simulator") return (
    <svg {...props}><circle cx="12" cy="12" r="3"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14M4.93 4.93a10 10 0 0 0 0 14.14"/></svg>
  );
  if (name === "profile") return (
    <svg {...props}><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
  );
  if (name === "settings") return (
    <svg {...props}><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>
  );
  if (name === "logout") return (
    <svg {...props}><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16,17 21,12 16,7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
  );
  return null;
}

function NavLink({ item }: { item: SidebarNavItem }) {
  const pathname = usePathname();
  const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
  const isLogout = item.icon === "logout";

  return (
    <Link
      href={item.href}
      className={cn(
        "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2585F4]",
        isLogout
          ? "text-red-400 hover:text-red-300 hover:bg-red-400/08"
          : isActive
          ? "bg-[#2585F4]/12 text-[#2585F4]"
          : "text-white/50 hover:text-white/80 hover:bg-white/06"
      )}
      aria-current={isActive ? "page" : undefined}
    >
      <NavIcon name={item.icon} />
      <span>{item.label}</span>
    </Link>
  );
}

export function DashboardSidebar() {
  return (
    <aside
      className="flex flex-col w-50 shrink-0 min-h-screen bg-[#0d1117] border-r border-[rgba(255,255,255,0.07)] px-3 py-5"
      aria-label="Navegação principal"
    >
      <figure className="flex items-center px-3 mb-7" aria-label="Voz Justa">
        <Image
          src="/logo/logo.svg"
          alt="Voz Justa"
          width={36}
          height={36}
          className="object-contain"
          priority
        />
      </figure>

      <nav aria-label="Menu principal" className="flex-1">
        <ul className="flex flex-col gap-1" role="list">
          {mainNavItems.map((item) => (
            <li key={item.href}>
              <NavLink item={item} />
            </li>
          ))}
        </ul>
      </nav>

      <nav aria-label="Menu secundário">
        <ul className="flex flex-col gap-1" role="list">
          {bottomNavItems.map((item) => (
            <li key={item.href}>
              <NavLink item={item} />
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}
