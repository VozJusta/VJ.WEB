import Link from "next/link";
import { ArrowForwardRounded, PlayCircleOutlineRounded } from "@mui/icons-material";
import { cn } from "@/lib/utils";
import { actionCardVariants, actionCardButtonVariants } from "./action-card.styles";
import type { ActionCardProps } from "./action-card.types";

export function ActionCard({
  icon,
  decorativeIcon,
  title,
  description,
  action,
  className,
}: ActionCardProps) {
  const isPrimary = action.variant === "primary";

  return (
    <article
      className={cn(
        actionCardVariants({ variant: action.variant }),
        className,
      )}
    >
      <header className="flex items-start justify-between gap-4">
        <span
          aria-hidden="true"
          className={cn(
            "flex h-11 w-11 items-center justify-center rounded-xl",
            isPrimary
              ? "bg-[var(--primary)]/15 text-[var(--primary)]"
              : "bg-white/8 text-[var(--dashboard-text-secondary)]",
          )}
        >
          {icon}
        </span>

        {decorativeIcon && (
          <span
            aria-hidden="true"
            className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/5 text-[var(--dashboard-text-muted)]"
          >
            {decorativeIcon}
          </span>
        )}
      </header>

      <div className="flex flex-col gap-2">
        <h2 className="text-xl font-bold leading-tight text-[var(--dashboard-text-primary)]">
          {title}
        </h2>
        <p className="text-sm leading-relaxed text-[var(--dashboard-text-secondary)]">
          {description}
        </p>
      </div>

      <Link
        href={action.href}
        className={cn(
          actionCardButtonVariants({ variant: action.variant }),
          isPrimary ? "w-full justify-center" : "self-start",
        )}
      >
        {action.label}
        {isPrimary ? (
          <ArrowForwardRounded fontSize="small" aria-hidden="true" />
        ) : (
          <PlayCircleOutlineRounded fontSize="small" aria-hidden="true" />
        )}
      </Link>
    </article>
  );
}
