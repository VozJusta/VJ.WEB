"use client";

import { cloneElement, isValidElement } from "react";
import { BadgeProps } from "./badge.types";
import { badgeVariants, badgeBaseStyles, iconStyles } from "./badge.styles";

export function Badge({
  text,
  icon,
  variant = "blue",
  className = "",
  ariaLabel,
}: BadgeProps) {
  const variantStyles = badgeVariants[variant];

  const combinedClasses = `
    ${badgeBaseStyles}
    ${variantStyles.bg}
    ${variantStyles.text}
    ${variantStyles.rounded}
    ${className}
  `
    .trim()
    .replace(/\s+/g, " ");

  return (
    <div
      className={combinedClasses}
      role="status"
      aria-label={ariaLabel || text}
    >
      {icon && (
        <span
          className={`${iconStyles} ${variantStyles.icon}`}
          aria-hidden="true"
        >
          {isValidElement(icon)
            ? cloneElement(icon, {
                ...(icon.props as Record<string, unknown>),
              } as Record<string, unknown>)
            : icon}
        </span>
      )}

      <span className="leading-none">{text}</span>
    </div>
  );
}
