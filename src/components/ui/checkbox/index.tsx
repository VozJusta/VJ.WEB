import { forwardRef, useId } from "react";
import { cn } from "@/src/lib/utils";
import { checkboxStyles } from "./checkbox.styles";
import type { CheckboxProps } from "./checkbox.types";

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ label, error, helperText, className, children, id, ...props }, ref) => {
    const generatedId = useId();
    const checkboxId = id || generatedId;

    return (
      <div className={checkboxStyles.container}>
        <input
          ref={ref}
          type="checkbox"
          id={checkboxId}
          className={cn(checkboxStyles.checkbox, className)}
          aria-invalid={!!error}
          aria-describedby={
            error
              ? `${checkboxId}-error`
              : helperText
                ? `${checkboxId}-helper`
                : undefined
          }
          {...props}
        />

        {(label || children) && (
          <div className={checkboxStyles.labelWrapper}>
            <label htmlFor={checkboxId} className={checkboxStyles.label}>
              {children || label}
            </label>

            {error && (
              <span
                id={`${checkboxId}-error`}
                className={checkboxStyles.error}
                role="alert"
              >
                {error}
              </span>
            )}

            {!error && helperText && (
              <span id={`${checkboxId}-helper`} className={checkboxStyles.helperText}>
                {helperText}
              </span>
            )}
          </div>
        )}
      </div>
    );
  },
);

Checkbox.displayName = "Checkbox";
