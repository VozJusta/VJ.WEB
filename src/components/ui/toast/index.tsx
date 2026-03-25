import { useEffect } from "react";
import { cn } from "@/src/lib/utils";
import {
  toastStyles,
  getToastVariantStyles,
  getIconVariantStyles,
} from "./toast.styles";
import type { ToastProps } from "./toast.types";
import {
  CheckCircleOutlined,
  ErrorOutlined,
  WarningAmberOutlined,
  InfoOutlined,
  CloseOutlined,
} from "@mui/icons-material";

const toastIcons = {
  success: CheckCircleOutlined,
  error: ErrorOutlined,
  warning: WarningAmberOutlined,
  info: InfoOutlined,
};

export function Toast({
  id,
  title,
  description,
  variant,
  duration = 5000,
  onClose,
}: ToastProps) {
  const Icon = toastIcons[variant];

  useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [duration, onClose]);

  return (
    <div
      className={cn(
        toastStyles.container,
        getToastVariantStyles(variant),
        "animate-slide-in-right",
      )}
      role="alert"
      aria-live="polite"
    >
      <div className={toastStyles.content}>
        <div
          className={cn(toastStyles.iconWrapper, getIconVariantStyles(variant))}
        >
          <Icon />
        </div>

        <div className={toastStyles.textContainer}>
          <h3 className={toastStyles.title}>{title}</h3>
          {description && (
            <p className={toastStyles.description}>{description}</p>
          )}
        </div>

        <button
          onClick={onClose}
          className={toastStyles.closeButton}
          aria-label="Fechar notificação"
        >
          <CloseOutlined fontSize="small" />
        </button>
      </div>
    </div>
  );
}
