"use client";

import { useId } from "react";
import { toggleTrack, toggleThumb } from "./toggle.styles";
import type { ToggleProps } from "./toggle.types";

export function Toggle({
  checked,
  onChange,
  disabled = false,
  size = "md",
  id,
  "aria-label": ariaLabel,
  "aria-labelledby": ariaLabelledby,
}: ToggleProps) {
  const generatedId = useId();
  const toggleId = id ?? generatedId;

  return (
    <button
      type="button"
      role="switch"
      id={toggleId}
      aria-checked={checked}
      aria-label={ariaLabel}
      aria-labelledby={ariaLabelledby}
      disabled={disabled}
      onClick={() => onChange(!checked)}
      className={toggleTrack({ checked, size })}
    >
      <span className="sr-only">{checked ? "Ativado" : "Desativado"}</span>
      <span
        aria-hidden
        className={toggleThumb({ checked, size })}
      />
    </button>
  );
}
