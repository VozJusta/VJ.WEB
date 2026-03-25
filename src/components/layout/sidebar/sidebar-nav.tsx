"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/src/lib/utils";
import { sidebarMainNav, sidebarBottomNav } from "./sidebar.navigation";
import type { SidebarNavItem } from "./sidebar.types";

type SidebarNavLinkProps = {
  item: SidebarNavItem;
  isActive: boolean;
  isDanger?: boolean;
  isOpen: boolean;
};

function SidebarNavLink({ item, isActive, isDanger = false, isOpen }: SidebarNavLinkProps) {
  const Icon = item.icon;

  return (
    <li>
      <Link
        href={item.href}
        aria-current={isActive ? "page" : undefined}
        aria-label={!isOpen ? item.label : undefined}
        title={!isOpen ? item.label : undefined}
        className={cn(
          "group relative flex items-center rounded-xl text-sm font-medium transition-all duration-200",
          isOpen ? "gap-3 px-3 py-2.5" : "justify-center p-2.5",
          isActive && [
            "bg-(--nav-active-bg)",
            "text-primary",
            "border border-(--nav-active-border)",
          ],
          !isActive && !isDanger && [
            "text-text-secondary",
            "hover:bg-white/5",
            "hover:text-foreground",
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
            isActive && "text-primary",
            !isActive && !isDanger && "text-text-muted group-hover:text-foreground",
            isDanger && "text-red-400 group-hover:text-red-300",
          )}
          aria-hidden="true"
        />

        {isOpen && <span>{item.label}</span>}

        {isActive && isOpen && (
          <span
            aria-hidden="true"
            className="absolute left-0 top-1/2 h-4 w-0.5 -translate-y-1/2 rounded-r-full bg-primary"
          />
        )}
      </Link>
    </li>
  );
}

type SidebarNavProps = {
  isOpen: boolean;
  mainNav?: SidebarNavItem[];
  bottomNav?: SidebarNavItem[];
};

export function SidebarNav({ isOpen, mainNav, bottomNav }: SidebarNavProps) {
  const pathname = usePathname();
  const mainNavItems = mainNav || sidebarMainNav;
  const bottomNavItems = bottomNav || sidebarBottomNav;

  const isMainNavItemActive = (href: string) => {
    const isDashboardRoot = href === "/dashboard" || href === "/advogado" || href.endsWith("/dashboard");
    return pathname === href || (!isDashboardRoot && pathname.startsWith(`${href}/`));
  };

  return (
    <nav aria-label="Navegação principal" className="flex flex-1 flex-col justify-between overflow-y-auto px-3 py-4">
      <ul role="list" className="flex flex-col gap-1">
        {mainNavItems.map((item) => (
          <SidebarNavLink
            key={item.href}
            item={item}
            isOpen={isOpen}
            isActive={isMainNavItemActive(item.href)}
          />
        ))}
      </ul>

      <ul role="list" className="flex flex-col gap-1 border-t border-(--border-subtle) pt-4">
        {bottomNavItems.map((item, index) => (
          <SidebarNavLink
            key={item.href}
            item={item}
            isOpen={isOpen}
            isActive={pathname === item.href}
            isDanger={index === bottomNavItems.length - 1}
          />
        ))}
      </ul>
    </nav>
  );
}
