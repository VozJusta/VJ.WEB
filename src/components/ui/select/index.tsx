import { forwardRef } from "react";
import { KeyboardArrowDown } from "@mui/icons-material";
import { cn } from "@/src/lib/utils";
import { selectStyles } from "./select.styles";
import type { SelectProps } from "./select.types";

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  (
    {
      label,
      error,
      helperText,
      options,
      placeholder,
      className,
      containerClassName,
      disabled,
      ...props
    },
    ref,
  ) => {
    return (
      <div className={cn(selectStyles.container, containerClassName)}>
        {label && (
          <label htmlFor={props.id} className={selectStyles.label}>
            {label}
          </label>
        )}

        <div className={selectStyles.selectWrapper}>
          <select
            ref={ref}
            disabled={disabled}
            className={cn(
              selectStyles.select,
              error && selectStyles.selectError,
              className,
            )}
            aria-invalid={!!error}
            aria-describedby={
              error
                ? `${props.id}-error`
                : helperText
                  ? `${props.id}-helper`
                  : undefined
            }
            {...props}
          >
            {placeholder && (
              <option value="" disabled>
                {placeholder}
              </option>
            )}
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>

          <div className={selectStyles.icon}>
            <KeyboardArrowDown fontSize="small" aria-hidden="true" />
          </div>
        </div>

        {error && (
          <p
            id={`${props.id}-error`}
            className={selectStyles.error}
            role="alert"
          >
            {error}
          </p>
        )}

        {!error && helperText && (
          <p id={`${props.id}-helper`} className={selectStyles.helperText}>
            {helperText}
          </p>
        )}
      </div>
    );
  },
);

Select.displayName = "Select";
