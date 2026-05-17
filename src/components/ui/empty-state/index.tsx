"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";
import type { EmptyStateProps } from "./empty-state.types";

export function EmptyState({
  illustration,
  illustrationAlt,
  illustrationSvg,
  title,
  description,
  action,
}: EmptyStateProps) {
  return (
    <section
      className="flex flex-col items-center justify-center px-6 py-16 text-center"
      aria-labelledby="empty-state-title"
    >
      <figure className="mb-8 flex items-center justify-center h-48 w-48">
        {illustrationSvg ?? (illustration ? (
          <Image
            src={illustration}
            alt={illustrationAlt ?? ""}
            width={200}
            height={200}
            className="h-48 w-48 object-contain opacity-90"
            priority
          />
        ) : null)}
      </figure>

      <header className="mb-4 max-w-md space-y-2">
        <h2
          id="empty-state-title"
          className="text-2xl font-bold leading-tight text-foreground"
        >
          {title}
        </h2>
        <p className="text-sm leading-relaxed text-text-secondary">
          {description}
        </p>
      </header>

      {action && (
        <button
          type="button"
          onClick={action.onClick}
          disabled={action.disabled}
          className={cn(
            "mt-4 rounded-xl border px-6 py-2.5 text-sm font-semibold transition-all",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary",
            action.disabled
              ? "cursor-not-allowed border-(--border-subtle) bg-white/5 text-text-muted opacity-50"
              : "border-(--border-default) bg-white/5 text-foreground hover:bg-white/10",
          )}
          aria-label={action.label}
        >
          {action.label}
        </button>
      )}
    </section>
  );
}
