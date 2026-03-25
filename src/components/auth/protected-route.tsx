"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { authStorage } from "@/lib/auth";

interface ProtectedRouteProps {
  children: React.ReactNode;
  redirectTo?: string;
}

export function ProtectedRoute({
  children,
  redirectTo = "/login",
}: ProtectedRouteProps) {
  const router = useRouter();
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    const hasTokens = authStorage.hasTokens();

    if (!hasTokens) {
      router.replace(redirectTo);
    } else {
      setIsChecking(false);
    }
  }, [router, redirectTo]);

  if (isChecking) {
    return (
      <div className="layout-bg flex min-h-screen items-center justify-center">
        <p className="text-text-secondary">Carregando...</p>
      </div>
    );
  }

  return <>{children}</>;
}
