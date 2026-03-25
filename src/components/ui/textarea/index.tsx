import { forwardRef, useState } from "react";
import { cn } from "@/src/lib/utils";
import { textareaStyles } from "./textarea.styles";
import type { TextareaProps } from "./textarea.types";

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      label,
      error,
      helperText,
      className,
      containerClassName,
      disabled,
      showCharCount,
      maxLength,
      value,
      onChange,
      ...props
    },
    ref,
  ) => {
    const [charCount, setCharCount] = useState(
      value ? String(value).length : 0,
    );

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setCharCount(e.target.value.length);
      onChange?.(e);
    };

    return (
      <div className={cn(textareaStyles.container, containerClassName)}>
        {label && (
          <label htmlFor={props.id} className={textareaStyles.label}>
            {label}
          </label>
        )}

        <div className={textareaStyles.textareaWrapper}>
          <textarea
            ref={ref}
            disabled={disabled}
            maxLength={maxLength}
            value={value}
            onChange={handleChange}
            className={cn(
              textareaStyles.textarea,
              error && textareaStyles.textareaError,
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
        </div>

        <div className={textareaStyles.footer}>
          <div>
            {error && (
              <p
                id={`${props.id}-error`}
                className={textareaStyles.error}
                role="alert"
              >
                {error}
              </p>
            )}

            {!error && helperText && (
              <p
                id={`${props.id}-helper`}
                className={textareaStyles.helperText}
              >
                {helperText}
              </p>
            )}
          </div>

          {showCharCount && maxLength && (
            <span className={textareaStyles.charCount}>
              {charCount}/{maxLength}
            </span>
          )}
        </div>
      </div>
    );
  },
);

Textarea.displayName = "Textarea";
