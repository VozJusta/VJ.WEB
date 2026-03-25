"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { authStorage } from "@/lib/auth";

export default function LogoutPage() {
  const router = useRouter();

  useEffect(() => {
    authStorage.clearAll();
    localStorage.removeItem("auth-store");
    router.replace("/login");
  }, [router]);

  return (
    <div className="layout-bg flex min-h-screen items-center justify-center">
      <p className="text-text-secondary">Saindo...</p>
    </div>
  );
}
