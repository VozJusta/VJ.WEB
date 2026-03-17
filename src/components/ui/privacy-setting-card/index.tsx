import { ReactNode } from "react";

export type PrivacySettingCardProps = {
  title: string;
  description: string;
  icon?: React.ElementType;
  iconColor?: "blue" | "green" | "red" | "purple";
  rightElement?: ReactNode;
  variant?: "default" | "danger";
};

function getIconColorClasses(color: PrivacySettingCardProps["iconColor"]) {
  switch (color) {
    case "blue":
      return "bg-[#2585F4]/15 text-[#2585F4]";
    case "green":
      return "bg-green-500/15 text-green-400";
    case "red":
      return "bg-red-500/15 text-red-400";
    case "purple":
      return "bg-purple-500/15 text-purple-400";
    default:
      return "bg-white/5 text-white/50";
  }
}

export function PrivacySettingCard({
  title,
  description,
  icon: Icon,
  iconColor = "blue",
  rightElement,
  variant = "default",
}: PrivacySettingCardProps) {
  const isDanger = variant === "danger";

  return (
    <div
      className={`w-full rounded-2xl bg-[#0D1B2E] border p-5 ${
        isDanger ? "border-red-500/20" : "border-[#1B2233]"
      }`}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-start gap-4 flex-1 min-w-0">
          {Icon && (
            <span
              className={`flex items-center justify-center w-10 h-10 rounded-xl shrink-0 ${getIconColorClasses(
                iconColor
              )}`}
            >
              <Icon fontSize="small" aria-hidden />
            </span>
          )}
          <div className="flex-1 min-w-0">
            <h3
              className={`text-base font-semibold mb-1 ${
                isDanger ? "text-red-400" : "text-white"
              }`}
            >
              {title}
            </h3>
            <p className="text-sm text-white/50 leading-relaxed">
              {description}
            </p>
          </div>
        </div>
        {rightElement && <div className="shrink-0">{rightElement}</div>}
      </div>
    </div>
  );
}
