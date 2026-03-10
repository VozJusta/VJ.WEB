import Image from "next/image";
import { Badge } from "@/components/ui/badge";

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
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);

  const isToday = date.toDateString() === today.toDateString();
  const isYesterday = date.toDateString() === yesterday.toDateString();

  const time = date.toLocaleTimeString("pt-BR", {
    hour: "2-digit",
    minute: "2-digit",
  });

  if (isToday) {
    return `Hoje às ${time}`;
  } else if (isYesterday) {
    return `Ontem às ${time}`;
  } else {
    const dateStr = date.toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "short",
    });
    return `${dateStr} às ${time}`;
  }
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
    <div className="flex items-start gap-4 p-4 rounded-xl bg-[#111c30] border border-[#1B2233]">
      <div className="relative w-12 h-12 rounded-full overflow-hidden shrink-0 ring-2 ring-[#1B2233]">
        <Image
          src={entry.userAvatar}
          alt={entry.userName}
          fill
          className="object-cover"
          sizes="48px"
        />
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2 mb-2">
          <div className="flex items-center gap-2 flex-wrap">
            <h3 className="text-sm font-semibold text-white">
              {entry.userName}
            </h3>
            {getUserTypeBadge(entry.userType)}
          </div>
        </div>

        <p className="text-sm text-white/70 mb-2">{entry.reason}</p>

        <div className="flex items-center gap-2 text-xs text-white/40">
          <span>{formatDateTime(entry.accessedAt)}</span>
          {entry.ipAddress && (
            <>
              <span>•</span>
              <span>IP: {entry.ipAddress}</span>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
