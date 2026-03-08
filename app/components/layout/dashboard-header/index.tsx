import { SearchRounded, NotificationsNoneRounded } from "@mui/icons-material";
import Image from "next/image";
import { DynamicBreadcrumb } from "./dynamic-breadcrumb";
import { cn } from "@/lib/utils";
import type { DashboardHeaderProps } from "./dashboard-header.types";

export function DashboardHeader({ user }: DashboardHeaderProps) {
  return (
    <header
      aria-label="Cabeçalho do dashboard"
      className={cn(
        "sticky top-0 z-30 flex h-16 shrink-0 items-center gap-4 px-6",
        "bg-surface",
        "border-b border-(--border-subtle)",
      )}
    >
      <DynamicBreadcrumb />

      <div className="flex flex-1 items-center justify-end gap-3">
        <form
          role="search"
          action="/dashboard/busca"
          className="hidden md:flex items-center gap-2 rounded-xl border border-[var(--border-subtle)] bg-white/5 px-3 py-2 text-sm transition-colors hover:border-[var(--border-subtle-hover)] focus-within:border-[var(--primary)]/40 focus-within:bg-white/8 w-56"
        >
          <SearchRounded
            fontSize="small"
            className="shrink-0 text-[var(--text-muted)]"
            aria-hidden="true"
          />
          <label htmlFor="dashboard-search" className="sr-only">
            Pesquisar
          </label>
          <input
            id="dashboard-search"
            type="search"
            name="q"
            placeholder="Pesquisar..."
            autoComplete="off"
            className="flex-1 bg-transparent text-[var(--foreground)] placeholder:text-[var(--text-muted)] outline-none min-w-0"
          />
        </form>

        <button
          type="button"
          aria-label="Notificações"
          className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-[var(--border-subtle)] bg-white/5 text-[var(--text-secondary)] transition-all hover:bg-white/10 hover:text-[var(--foreground)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)]"
        >
          <NotificationsNoneRounded fontSize="small" aria-hidden="true" />
          <span
            aria-label="Você tem notificações não lidas"
            className="absolute right-2 top-2 h-2 w-2 rounded-full bg-[var(--primary)]"
          />
        </button>

        <div className="flex items-center gap-2.5 rounded-xl border border-[var(--border-subtle)] bg-white/5 px-3 py-2 transition-colors hover:border-[var(--border-subtle-hover)]">
          <figure className="m-0">
            {user.avatarUrl ? (
              <Image
                src={user.avatarUrl}
                alt={`Foto de ${user.name}`}
                width={32}
                height={32}
                className="h-8 w-8 rounded-full object-cover ring-1 ring-white/10"
              />
            ) : (
              <span
                aria-label={`Avatar de ${user.name}`}
                className="flex h-8 w-8 items-center justify-center rounded-full bg-[var(--primary)] text-xs font-semibold text-white ring-1 ring-[var(--primary)]/40"
              >
                {user.name
                  .split(" ")
                  .slice(0, 2)
                  .map((n) => n[0])
                  .join("")
                  .toUpperCase()}
              </span>
            )}
          </figure>

          <div className="hidden md:flex flex-col">
            <span className="text-sm font-semibold leading-none text-[var(--foreground)]">
              {user.name}
            </span>
            <span className="mt-0.5 text-xs font-medium uppercase tracking-widest text-[var(--primary)]">
              {user.role}
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}
