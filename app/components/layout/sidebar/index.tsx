import Image from "next/image";
import Link from "next/link";
import logo from "@/public/logo/logo+name.svg";
import { SidebarNav } from "./sidebar-nav";
import type { SidebarProps } from "./sidebar.types";
import { cn } from "@/lib/utils";

export function Sidebar({ className }: SidebarProps) {
  return (
    <aside
      aria-label="Menu lateral"
      className={cn(
        "fixed inset-y-0 left-0 z-40 flex w-[var(--sidebar-width)] flex-col",
        "bg-[var(--dashboard-sidebar-bg)]",
        "border-r border-[var(--dashboard-border)]",
        className,
      )}
    >
      <div className="flex h-16 shrink-0 items-center border-b border-[var(--dashboard-border)] px-5">
        <Link
          href="/dashboard"
          aria-label="Ir para o início do dashboard"
          className="inline-flex items-center gap-2 transition-opacity hover:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)] rounded-md"
        >
          <Image
            src={logo}
            alt="VozJusta"
            width={120}
            height={32}
            priority
            className="h-8 w-auto"
          />
        </Link>
      </div>

      <SidebarNav />
    </aside>
  );
}
