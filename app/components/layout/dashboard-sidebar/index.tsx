"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  HomeRounded,
  ArticleRounded,
  ForumRounded,
  GavelRounded,
  PersonRounded,
  SettingsRounded,
  LogoutRounded,
} from "@mui/icons-material";
import { cn } from "@/lib/utils";
import { mainNavItems, bottomNavItems } from "./dashboard-sidebar.navigation";
import type { SidebarNavItem } from "./dashboard-sidebar.navigation";

type IconName = SidebarNavItem["icon"];

const navIconMap: Record<IconName, React.ElementType> = {
  home: HomeRounded,
  documents: ArticleRounded,
  chat: ForumRounded,
  simulator: GavelRounded,
  profile: PersonRounded,
  settings: SettingsRounded,
  logout: LogoutRounded,
};

function NavIcon({ name }: { name: IconName }) {
  const Icon = navIconMap[name];
  return <Icon aria-hidden fontSize="small" className="shrink-0" />;
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
