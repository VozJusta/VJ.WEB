"use client";

import Image from "next/image";
import Link from "next/link";
import { MenuRounded, MenuOpenRounded } from "@mui/icons-material";
import logoFull from "@/public/logo/logo+name.svg";
import { SidebarNav } from "./sidebar-nav";
import { cn } from "@/lib/utils";
import type { SidebarProps } from "./sidebar.types";

export function Sidebar({ isOpen, onToggle, className }: SidebarProps) {

  return (
    <aside
      aria-label="Menu lateral"
      aria-expanded={isOpen}
      className={cn(
        "fixed inset-y-0 left-0 z-40 flex flex-col",
        "bg-[var(--surface)]",
        "border-r border-[var(--border-subtle)]",
        "transition-all duration-300 ease-in-out",
        isOpen ? "w-[var(--sidebar-width)]" : "w-[var(--sidebar-collapsed-width)]",
        className,
      )}
    >
      <div
        className={cn(
          "flex h-16 shrink-0 items-center border-b border-[var(--border-subtle)]",
          isOpen ? "justify-between px-5" : "justify-center px-3",
        )}
      >
        {isOpen && (
          <Link
            href="/dashboard"
            aria-label="Ir para o início do dashboard"
            className="inline-flex items-center transition-opacity hover:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)] rounded-md"
          >
            <Image
              src={logoFull}
              alt="VozJusta"
              width={120}
              height={32}
              priority
              className="h-8 w-auto"
            />
          </Link>
        )}

        <button
          type="button"
          onClick={onToggle}
          aria-label={isOpen ? "Recolher menu lateral" : "Expandir menu lateral"}
          className={cn(
            "flex h-9 w-9 shrink-0 items-center justify-center rounded-xl",
            "text-[var(--text-secondary)]",
            "border border-[var(--border-subtle)]",
            "transition-all duration-200",
            "hover:bg-white/5 hover:text-[var(--foreground)]",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)]",
          )}
        >
          {isOpen ? (
            <MenuOpenRounded fontSize="small" aria-hidden="true" />
          ) : (
            <MenuRounded fontSize="small" aria-hidden="true" />
          )}
        </button>
      </div>

      <SidebarNav isOpen={isOpen} />
    </aside>
  );
}
