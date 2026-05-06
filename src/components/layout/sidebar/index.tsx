"use client";

import Image from "next/image";
import Link from "next/link";
import {  MenuOpenRounded } from "@mui/icons-material";
import logoFull from "@/assets/logo/logo+name.svg";
import { cn } from "@/lib/utils";
import type { SidebarProps } from "./sidebar.types";
import { SidebarNav } from "./sidebar-nav";

export function Sidebar({ isOpen, onToggle, onClose, className, homeHref = "/dashboard", mainNav, bottomNav }: SidebarProps) {

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm lg:hidden"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      <aside
        aria-label="Menu lateral"
        aria-expanded={isOpen}
        className={cn(
          "fixed inset-y-0 left-0 z-50 flex flex-col w-60",
          "bg-surface",
          "border-r border-(--border-subtle)",
          "transition-transform duration-300 ease-in-out",
          "lg:translate-x-0",
          isOpen ? "translate-x-0" : "-translate-x-full",
          className,
        )}
      >
        <div
          className={cn(
            "flex h-16 shrink-0 items-center border-b border-(--border-subtle) justify-between px-5",
          )}
        >
          <Link
            href={homeHref}
            aria-label="Ir para o início do dashboard"
            className="inline-flex items-center transition-opacity hover:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-md"
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

          <button
            type="button"
            onClick={onClose || onToggle}
            aria-label="Fechar menu lateral"
            className={cn(
              "flex h-9 w-9 shrink-0 items-center justify-center rounded-xl lg:hidden",
              "text-text-secondary",
              "border border-(--border-subtle)",
              "transition-all duration-200",
              "hover:bg-white/5 hover:text-foreground",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary",
            )}
          >
            <MenuOpenRounded fontSize="small" aria-hidden="true" />
          </button>
        </div>

        <SidebarNav isOpen={isOpen} mainNav={mainNav} bottomNav={bottomNav} />
      </aside>
    </>
  );
}
