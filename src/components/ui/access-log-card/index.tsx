import Image from "next/image";
import { InfoOutlined } from "@mui/icons-material";
import { Badge } from "@/src/components/ui/badge";

export type AccessLogEntry = {
  id: string;
  userType: "lawyer" | "admin" | "support";
  userName: string;
  userAvatar: string;
  accessedAt: string;
  reason: string;
  ipAddress?: string;
};

function formatDateTime(dateString: string): string {
  const date = new Date(dateString);

  const dateFormatted = date.toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  const time = date.toLocaleTimeString("pt-BR", {
    hour: "2-digit",
    minute: "2-digit",
  });

  return `${dateFormatted} • ${time}`;
}

function getUserTypeBadge(userType: AccessLogEntry["userType"]) {
  switch (userType) {
    case "lawyer":
      return <Badge variant="blue" text="ADVOGADO" />;
    case "admin":
      return (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-semibold bg-purple-500/15 text-purple-400 border border-purple-500/30">
          ADMIN
        </span>
      );
    case "support":
      return (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-semibold bg-green-500/15 text-green-400 border border-green-500/30">
          SUPORTE
        </span>
      );
  }
}

type AccessLogCardProps = {
  entry: AccessLogEntry;
};

export function AccessLogCard({ entry }: AccessLogCardProps) {
  return (
    <article className="flex items-start gap-4 p-5 rounded-2xl bg-[#0D1B2E] border border-[#1B2233]">
      <figure className="relative w-14 h-14 rounded-full overflow-hidden shrink-0">
        <Image
          src={entry.userAvatar}
          alt={`Foto de ${entry.userName}`}
          fill
          className="object-cover"
          sizes="56px"
        />
        <span
          className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-green-500 border-2 border-[#0D1B2E]"
          aria-label="Online"
        />
      </figure>

      <div className="flex-1 min-w-0">
        <header className="flex items-start justify-between gap-3 mb-2">
          <h3 className="text-base font-semibold text-white">
            {entry.userName}
          </h3>
          {getUserTypeBadge(entry.userType)}
        </header>

        <time
          className="block text-xs text-white/40 mb-3"
          dateTime={entry.accessedAt}
        >
          <span className="inline-flex items-center gap-1">
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="text-white/40"
              aria-hidden
            >
              <path
                d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M12 6V12L16 14"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            {formatDateTime(entry.accessedAt)}
          </span>
        </time>

        <div className="flex items-start gap-2 p-3 rounded-lg bg-white/5">
          <InfoOutlined
            fontSize="small"
            className="text-white/40 shrink-0 mt-0.5"
            aria-hidden
          />
          <p className="text-sm text-white/70 leading-relaxed">
            <strong className="font-semibold text-white">Motivo:</strong>{" "}
            {entry.reason}
          </p>
        </div>
      </div>
    </article>
  );
}
