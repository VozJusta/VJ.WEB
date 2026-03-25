import { cn } from "@/src/lib/utils";
import { EmailRounded, PhoneRounded, PersonRounded } from "@mui/icons-material";
import type { ContactInfoCardProps } from "./contact-info-card.types";

export function ContactInfoCard({
  name,
  phone,
  email,
  avatarUrl,
  className,
}: ContactInfoCardProps) {
  const initials = name
    .split(" ")
    .slice(0, 2)
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  return (
    <article
      className={cn(
        "rounded-2xl border border-(--border-subtle) bg-surface-elevated p-5",
        className,
      )}
    >
      <header className="mb-4 flex items-center gap-3">
        <figure className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#2585F4] to-[#1565C0]">
          {avatarUrl ? (
            <img
              src={avatarUrl}
              alt=""
              className="h-full w-full rounded-full object-cover"
            />
          ) : (
            <span className="text-sm font-bold text-white">{initials}</span>
          )}
        </figure>
        <div>
          <h3 className="text-base font-semibold text-white">{name}</h3>
          <p className="text-xs text-text-muted">Informações de Contato</p>
        </div>
      </header>

      <dl className="flex flex-col gap-3">
        <div className="flex items-center gap-2">
          <dt className="sr-only">Telefone</dt>
          <PhoneRounded
            sx={{ fontSize: 18 }}
            className="text-text-muted"
            aria-hidden
          />
          <dd className="text-sm text-text-secondary">{phone}</dd>
        </div>

        <div className="flex items-center gap-2">
          <dt className="sr-only">Email</dt>
          <EmailRounded
            sx={{ fontSize: 18 }}
            className="text-text-muted"
            aria-hidden
          />
          <dd className="text-sm text-text-secondary">{email}</dd>
        </div>
      </dl>
    </article>
  );
}

export type { ContactInfoCardProps } from "./contact-info-card.types";
