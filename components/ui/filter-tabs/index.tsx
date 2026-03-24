"use client";

import { cn } from "@/lib/utils";
import type { FilterTabsProps } from "./filter-tabs.types";

export function FilterTabs<T extends string = string>({
  tabs,
  activeTab,
  onTabChange,
  className,
  ariaLabel = "Filtros",
}: FilterTabsProps<T>) {
  return (
    <nav
      role="tablist"
      aria-label={ariaLabel}
      className={cn(
        "flex items-center gap-2 overflow-x-auto scrollbar-hide",
        className,
      )}
    >
      {tabs.map((tab) => {
        const isActive = tab.value === activeTab;

        return (
          <button
            key={tab.value}
            type="button"
            role="tab"
            aria-selected={isActive}
            aria-controls={`tabpanel-${tab.value}`}
            onClick={() => onTabChange(tab.value)}
            className={cn(
              "inline-flex items-center gap-2 rounded-full px-4 py-2",
              "text-sm font-medium whitespace-nowrap",
              "transition-all duration-200",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background",
              isActive
                ? "bg-primary text-primary-foreground shadow-md"
                : "bg-surface-elevated text-text-secondary hover:bg-surface-hover hover:text-foreground border border-(--border-subtle)",
            )}
          >
            {tab.label}
            {typeof tab.count === "number" && (
              <span
                className={cn(
                  "inline-flex items-center justify-center min-w-5 h-5 rounded-full px-1.5",
                  "text-xs font-semibold",
                  isActive
                    ? "bg-white/20 text-white"
                    : "bg-white/5 text-text-muted",
                )}
              >
                {tab.count}
              </span>
            )}
          </button>
        );
      })}
    </nav>
  );
}
