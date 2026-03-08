"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { sidebarMainNav, sidebarBottomNav } from "./sidebar.navigation";
import type { SidebarNavItem } from "./sidebar.types";

type SidebarNavLinkProps = {
  item: SidebarNavItem;
  isActive: boolean;
  isDanger?: boolean;
};

function SidebarNavLink({ item, isActive, isDanger = false }: SidebarNavLinkProps) {
  const Icon = item.icon;

  return (
    <li>
      <Link
        href={item.href}
        aria-current={isActive ? "page" : undefined}
        className={cn(
          "group relative flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200",
          isActive && [
            "bg-[var(--dashboard-nav-active-bg)]",
            "text-[var(--primary)]",
            "border border-[var(--dashboard-nav-active-border)]",
          ],
          !isActive && !isDanger && [
            "text-[var(--dashboard-text-secondary)]",
            "hover:bg-white/5",
            "hover:text-[var(--dashboard-text-primary)]",
            "border border-transparent",
          ],
          isDanger && [
            "text-red-400",
            "hover:bg-red-400/10",
            "hover:text-red-300",
            "border border-transparent",
          ],
        )}
      >
        <Icon
          fontSize="small"
          className={cn(
            "shrink-0 transition-colors duration-200",
            isActive && "text-[var(--primary)]",
            !isActive && !isDanger && "text-[var(--dashboard-text-muted)] group-hover:text-[var(--dashboard-text-primary)]",
            isDanger && "text-red-400 group-hover:text-red-300",
          )}
          aria-hidden="true"
        />
        <span>{item.label}</span>

        {isActive && (
          <span
            aria-hidden="true"
            className="absolute left-0 top-1/2 h-4 w-0.5 -translate-y-1/2 rounded-r-full bg-[var(--primary)]"
          />
        )}
      </Link>
    </li>
  );
}

export function SidebarNav() {
  const pathname = usePathname();

  return (
    <nav aria-label="Navegação principal" className="flex flex-1 flex-col justify-between overflow-y-auto px-3 py-4">
      <ul role="list" className="flex flex-col gap-1">
        {sidebarMainNav.map((item) => (
          <SidebarNavLink
            key={item.href}
            item={item}
            isActive={pathname === item.href || (item.href !== "/dashboard" && pathname.startsWith(item.href))}
          />
        ))}
      </ul>

      <ul role="list" className="flex flex-col gap-1 border-t border-[var(--dashboard-border)] pt-4">
        {sidebarBottomNav.map((item, index) => (
          <SidebarNavLink
            key={item.href}
            item={item}
            isActive={pathname === item.href}
            isDanger={index === sidebarBottomNav.length - 1}
          />
        ))}
      </ul>
    </nav>
  );
}
