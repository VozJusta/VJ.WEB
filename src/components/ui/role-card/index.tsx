"use client";

import { cn } from "@/lib/utils";
import { RoleCardProps } from "./role-card.types";

export function RoleCard({
  title,
  description,
  icon: Icon,
  isSelected,
  onSelect,
}: RoleCardProps) {
  return (
    <button
      type="button"
      role="radio"
      aria-checked={isSelected}
      onClick={onSelect}
      className={cn(
        "relative flex flex-col gap-4 rounded-2xl p-5 text-left w-full h-59 justify-center",
        "transition-all duration-300",
        "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/50",
        isSelected
          ? "bg-white text-[#0F172A]"
          : "bg-white/5 border border-white/8 text-white hover:bg-white/8 hover:border-white/15",
      )}
    >
      <span
        aria-hidden="true"
        className={cn(
          "absolute top-4 right-4 flex h-5 w-5 items-center justify-center rounded-full border-2 transition-all duration-200",
          isSelected ? "border-[#0F172A]" : "border-white/25",
        )}
      >
        {isSelected && (
          <span className="h-2 w-2 rounded-full bg-[#0F172A]" />
        )}
      </span>

      <span
        className={cn(
          "flex h-11 w-11 items-center justify-center rounded-xl transition-all duration-300",
          isSelected ? "bg-[#0F172A]/10" : "bg-white/10",
        )}
      >
        <Icon
          fontSize="small"
          className={isSelected ? "text-[#0F172A]" : "text-white/70"}
        />
      </span>

      <span className="flex flex-col gap-1 pr-6">
        <span
          className={cn(
            "text-base font-bold",
            isSelected ? "text-[#0F172A]" : "text-white",
          )}
        >
          {title}
        </span>
        <span
          className={cn(
            "text-sm leading-snug",
            isSelected ? "text-[#94A3B8]" : "text-white/45",
          )}
        >
          {description}
        </span>
      </span>
    </button>
  );
}
