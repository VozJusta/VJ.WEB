"use client";

import { createContext, useContext, useState, useCallback } from "react";
import { Toast } from "./index";
import type { Toast as ToastType, ToastContextValue } from "./toast.types";

const ToastContext = createContext<ToastContextValue | undefined>(undefined);

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
}

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<ToastType[]>([]);

  const toast = useCallback((toastData: Omit<ToastType, "id">) => {
    const id = Math.random().toString(36).substring(2, 9);
    const newToast: ToastType = {
      id,
      duration: 5000,
      ...toastData,
    };

    setToasts((prev) => [...prev, newToast]);
  }, []);

  const dismiss = useCallback((id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  const dismissAll = useCallback(() => {
    setToasts([]);
  }, []);

  return (
    <ToastContext.Provider value={{ toasts, toast, dismiss, dismissAll }}>
      {children}

      <div
        className="fixed top-6 right-6 z-100 flex flex-col gap-3 pointer-events-none"
        aria-live="polite"
        aria-atomic="true"
      >
        {toasts.map((t) => (
          <Toast
            key={t.id}
            id={t.id}
            title={t.title}
            description={t.description}
            variant={t.variant}
            duration={t.duration}
            onClose={() => dismiss(t.id)}
          />
        ))}
      </div>
    </ToastContext.Provider>
  );
}
