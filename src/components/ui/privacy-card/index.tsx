import Link from "next/link";
import { ChevronRightRounded } from "@mui/icons-material";

export type PrivacyCardProps =
  | {
      icon: React.ElementType;
      title: string;
      description: string;
      type: "link";
      href: string;
    }
  | {
      icon: React.ElementType;
      title: string;
      description: string;
      type: "action";
      onClick: () => void;
      variant?: "default" | "danger";
    };

export function PrivacyCard(props: PrivacyCardProps) {
  const Icon = props.icon;
  const isDanger = props.type === "action" && props.variant === "danger";

  const inner = (
    <div className="flex items-start gap-4 p-5">
      <span
        className={`flex items-center justify-center w-10 h-10 rounded-xl shrink-0 ${
          isDanger
            ? "bg-red-500/10 text-red-400"
            : "bg-[#2585F4]/15 text-[#2585F4]"
        }`}
      >
        <Icon fontSize="small" aria-hidden />
      </span>

      <div className="flex-1 min-w-0">
        <h3
          className={`text-sm font-semibold mb-1 ${
            isDanger ? "text-red-400" : "text-white"
          }`}
        >
          {props.title}
        </h3>
        <p className="text-sm text-white/50">{props.description}</p>
      </div>

      {props.type === "link" && (
        <ChevronRightRounded
          className="text-white/40 shrink-0 mt-1"
          fontSize="small"
          aria-hidden
        />
      )}
    </div>
  );

  if (props.type === "link") {
    return (
      <Link
        href={props.href}
        className="block rounded-2xl bg-[#111c30] border border-[#1B2233] hover:border-[#2a3547] hover:bg-[#152036] transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2585F4]"
      >
        {inner}
      </Link>
    );
  }

  return (
    <button
      onClick={props.onClick}
      className={`w-full text-left rounded-2xl bg-[#111c30] border transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 ${
        isDanger
          ? "border-red-500/20 hover:border-red-500/40 hover:bg-red-500/5 focus-visible:ring-red-500"
          : "border-[#1B2233] hover:border-[#2a3547] hover:bg-[#152036] focus-visible:ring-[#2585F4]"
      }`}
    >
      {inner}
    </button>
  );
}
