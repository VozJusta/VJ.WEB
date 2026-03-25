"use client";

import { useRef, KeyboardEvent, ClipboardEvent, ChangeEvent } from "react";
import { cn } from "@/src/lib/utils";
import { otpInputStyles } from "./otp-input.styles";
import type { OtpInputProps } from "./otp-input.types";

export function OtpInput({
  length = 6,
  value,
  onChange,
  error,
  disabled = false,
  autoFocus = true,
}: OtpInputProps) {
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const focusInput = (index: number) => {
    const input = inputRefs.current[index];
    if (input) {
      input.focus();
      input.select();
    }
  };

  const handleChange = (index: number, newValue: string) => {
    const sanitized = newValue.replace(/\D/g, "");
    
    if (sanitized.length === 0) {
      const newOtp = value.split("");
      newOtp[index] = "";
      onChange(newOtp.join(""));
      return;
    }

    if (sanitized.length === 1) {
      const newOtp = value.split("");
      newOtp[index] = sanitized;
      onChange(newOtp.join(""));
      
      if (index < length - 1) {
        focusInput(index + 1);
      }
    } else if (sanitized.length > 1) {
      const newOtp = sanitized.slice(0, length).split("");
      while (newOtp.length < length) {
        newOtp.push("");
      }
      onChange(newOtp.join(""));
      
      const nextIndex = Math.min(sanitized.length, length - 1);
      focusInput(nextIndex);
    }
  };

  const handleKeyDown = (index: number, event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Backspace" && !value[index] && index > 0) {
      focusInput(index - 1);
    } else if (event.key === "ArrowLeft" && index > 0) {
      focusInput(index - 1);
    } else if (event.key === "ArrowRight" && index < length - 1) {
      focusInput(index + 1);
    }
  };

  const handlePaste = (event: ClipboardEvent<HTMLInputElement>) => {
    event.preventDefault();
    const pastedData = event.clipboardData.getData("text/plain");
    const sanitized = pastedData.replace(/\D/g, "").slice(0, length);
    
    if (sanitized) {
      const newOtp = sanitized.split("");
      while (newOtp.length < length) {
        newOtp.push("");
      }
      onChange(newOtp.join(""));
      
      const nextIndex = Math.min(sanitized.length, length - 1);
      focusInput(nextIndex);
    }
  };

  return (
    <div>
      <div className={otpInputStyles.container}>
        {Array.from({ length }, (_, index) => (
          <input
            key={index}
            ref={(el) => {
              inputRefs.current[index] = el;
            }}
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            maxLength={1}
            autoComplete={index === 0 ? "one-time-code" : "off"}
            value={value[index] || ""}
            onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange(index, e.target.value)}
            onKeyDown={(e) => handleKeyDown(index, e)}
            onPaste={handlePaste}
            disabled={disabled}
            autoFocus={autoFocus && index === 0}
            className={cn(
              otpInputStyles.input,
              error && otpInputStyles.inputError
            )}
            aria-label={`Dígito ${index + 1} de ${length}`}
          />
        ))}
      </div>
      {error && (
        <p className={otpInputStyles.error} role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
