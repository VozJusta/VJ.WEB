import { forwardRef } from "react";
import { cn } from "@/lib/utils";
import { inputStyles } from "./input.styles";
import type { InputProps } from "./input.types";

/**
 * Input Component
 *
 * Componente de input reutilizável com suporte a labels, erros, ícones e estados
 *
 * @component
 * @example
 * ```tsx
 * <Input
 *   label="E-mail"
 *   type="email"
 *   placeholder="seu@email.com"
 *   error="E-mail inválido"
 * />
 * ```
 */
export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      error,
      helperText,
      leftIcon,
      rightIcon,
      className,
      containerClassName,
      disabled,
      ...props
    },
    ref,
  ) => {
    const hasLeftIcon = !!leftIcon;
    const hasRightIcon = !!rightIcon;

    return (
      <div className={cn(inputStyles.container, containerClassName)}>
        {label && (
          <label htmlFor={props.id} className={inputStyles.label}>
            {label}
          </label>
        )}

        <div className={inputStyles.inputWrapper}>
          {leftIcon && <div className={inputStyles.leftIcon}>{leftIcon}</div>}

          <input
            ref={ref}
            disabled={disabled}
            className={cn(
              inputStyles.input,
              hasLeftIcon && inputStyles.inputWithLeftIcon,
              hasRightIcon && inputStyles.inputWithRightIcon,
              error && inputStyles.inputError,
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
          />

          {rightIcon && (
            <div className={inputStyles.rightIcon}>{rightIcon}</div>
          )}
        </div>

        {error && (
          <p
            id={`${props.id}-error`}
            className={inputStyles.error}
            role="alert"
          >
            {error}
          </p>
        )}

        {!error && helperText && (
          <p id={`${props.id}-helper`} className={inputStyles.helperText}>
            {helperText}
          </p>
        )}
      </div>
    );
  },
);

Input.displayName = "Input";
