"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { SearchRounded, ArrowForwardRounded } from "@mui/icons-material";
import { useAuthStore } from "@/store/auth.store";
import { citizenRoutes, lawyerRoutes, type SearchRoute } from "@/lib/search-routes";
import { cn } from "@/lib/utils";

export function SearchCommand() {
  const router = useRouter();
  const userRole = useAuthStore((s) => s.userRole);
  const routes = userRole === "lawyer" ? lawyerRoutes : citizenRoutes;

  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const filtered = query.trim()
    ? routes.filter(
        (r) =>
          r.label.toLowerCase().includes(query.toLowerCase()) ||
          r.description?.toLowerCase().includes(query.toLowerCase()),
      )
    : routes;

  const open = useCallback(() => {
    setIsOpen(true);
    setActiveIndex(0);
    setTimeout(() => inputRef.current?.focus(), 0);
  }, []);

  const close = useCallback(() => {
    setIsOpen(false);
    setQuery("");
  }, []);

  const navigate = useCallback(
    (route: SearchRoute) => {
      close();
      router.push(route.href);
    },
    [close, router],
  );

  // Ctrl+K / Cmd+K shortcut
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault();
        isOpen ? close() : open();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, open, close]);

  // Close on outside click
  useEffect(() => {
    if (!isOpen) return;
    const onPointer = (e: PointerEvent) => {
      if (!containerRef.current?.contains(e.target as Node)) close();
    };
    window.addEventListener("pointerdown", onPointer);
    return () => window.removeEventListener("pointerdown", onPointer);
  }, [isOpen, close]);

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") { close(); return; }
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((i) => Math.min(i + 1, filtered.length - 1));
      return;
    }
    if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((i) => Math.max(i - 1, 0));
      return;
    }
    if (e.key === "Enter" && filtered[activeIndex]) {
      navigate(filtered[activeIndex]);
    }
  };

  return (
    <div ref={containerRef} className="relative hidden md:block">
      {/* Trigger button */}
      <button
        type="button"
        onClick={open}
        aria-label="Abrir pesquisa de páginas"
        className="flex items-center gap-2 rounded-xl border border-(--border-subtle) bg-white/5 px-3 py-2 text-sm transition-colors hover:border-(--border-subtle-hover) hover:bg-white/8 w-56 text-left"
      >
        <SearchRounded fontSize="small" className="shrink-0 text-text-muted" aria-hidden />
        <span className="flex-1 text-text-muted">Pesquisar...</span>
        <kbd className="flex items-center rounded border border-(--border-subtle) px-1.5 py-0.5 text-[10px] font-mono text-text-muted">
          ⌃K
        </kbd>
      </button>

      {/* Command palette dropdown */}
      {isOpen && (
        <>
          {/* Backdrop for mobile */}
          <div className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm md:hidden" />

          <div
            role="dialog"
            aria-label="Pesquisa de páginas"
            className="absolute top-full left-0 mt-2 w-80 rounded-2xl border border-(--border-subtle) bg-[#0d1526] shadow-2xl shadow-black/60 overflow-hidden z-50"
          >
            {/* Search input */}
            <div className="flex items-center gap-2 border-b border-(--border-subtle) px-3 py-2.5">
              <SearchRounded fontSize="small" className="shrink-0 text-text-muted" aria-hidden />
              <input
                ref={inputRef}
                type="text"
                placeholder="Para onde deseja ir?"
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setActiveIndex(0);
                }}
                onKeyDown={onKeyDown}
                className="flex-1 bg-transparent text-sm text-foreground placeholder:text-text-muted outline-none"
                aria-autocomplete="list"
                aria-controls="search-results"
                aria-activedescendant={filtered[activeIndex] ? `sr-${activeIndex}` : undefined}
              />
              <kbd
                role="button"
                tabIndex={0}
                onClick={close}
                onKeyDown={(e) => e.key === "Enter" && close()}
                className="cursor-pointer flex items-center rounded border border-(--border-subtle) px-1.5 py-0.5 text-[10px] font-mono text-text-muted hover:text-foreground transition-colors"
              >
                ESC
              </kbd>
            </div>

            {/* Results */}
            <ul
              id="search-results"
              role="listbox"
              className="max-h-72 overflow-y-auto py-1.5"
            >
              {filtered.length === 0 ? (
                <li className="px-4 py-8 text-center text-sm text-text-muted">
                  Nenhuma página encontrada
                </li>
              ) : (
                filtered.map((route, i) => {
                  const Icon = route.icon;
                  const isActive = i === activeIndex;
                  return (
                    <li
                      key={route.href}
                      id={`sr-${i}`}
                      role="option"
                      aria-selected={isActive}
                    >
                      <button
                        type="button"
                        onMouseEnter={() => setActiveIndex(i)}
                        onClick={() => navigate(route)}
                        className={cn(
                          "flex w-full items-center gap-3 px-3 py-2.5 text-left transition-colors",
                          isActive
                            ? "bg-white/8 text-foreground"
                            : "text-text-secondary hover:bg-white/5",
                        )}
                      >
                        <span
                          className={cn(
                            "flex h-8 w-8 shrink-0 items-center justify-center rounded-lg transition-colors",
                            isActive
                              ? "bg-primary/20 text-primary"
                              : "bg-white/5 text-text-muted",
                          )}
                        >
                          <Icon sx={{ fontSize: 16 }} aria-hidden />
                        </span>
                        <div className="min-w-0 flex-1">
                          <p className="text-sm font-medium leading-none">{route.label}</p>
                          {route.description && (
                            <p className="mt-0.5 text-xs text-text-muted truncate">
                              {route.description}
                            </p>
                          )}
                        </div>
                        {isActive && (
                          <ArrowForwardRounded
                            sx={{ fontSize: 14 }}
                            className="shrink-0 text-primary"
                            aria-hidden
                          />
                        )}
                      </button>
                    </li>
                  );
                })
              )}
            </ul>

            {/* Footer hint */}
            <div className="border-t border-(--border-subtle) px-3 py-2 flex items-center gap-3 text-[11px] text-text-muted">
              <span className="flex items-center gap-1">
                <kbd className="rounded border border-(--border-subtle) px-1 py-0.5 font-mono">↑↓</kbd>
                navegar
              </span>
              <span className="flex items-center gap-1">
                <kbd className="rounded border border-(--border-subtle) px-1 py-0.5 font-mono">↵</kbd>
                ir para
              </span>
              <span className="flex items-center gap-1">
                <kbd className="rounded border border-(--border-subtle) px-1 py-0.5 font-mono">ESC</kbd>
                fechar
              </span>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
