import Link from "next/link";
import { ChevronRightRounded } from "@mui/icons-material";
import { cn } from "@/lib/utils";
import type { BreadcrumbProps } from "./breadcrumb.types";

export function Breadcrumb({ items, className }: BreadcrumbProps) {
  return (
    <nav aria-label="Navegação estrutural" className={cn("flex items-center", className)}>
      <ol role="list" className="flex items-center gap-1.5 text-sm">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;

          return (
            <li key={`${item.label}-${index}`} className="flex items-center gap-1.5">
              {index > 0 && (
                <ChevronRightRounded
                  fontSize="small"
                  className="shrink-0 text-[var(--text-muted)]"
                  aria-hidden="true"
                />
              )}

              {isLast ? (
                <span
                  aria-current="page"
                  className="font-semibold text-[var(--foreground)]"
                >
                  {item.label}
                </span>
              ) : (
                <Link
                  href={item.href ?? "#"}
                  className="text-[var(--text-secondary)] transition-colors hover:text-[var(--foreground)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)] rounded"
                >
                  {item.label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
