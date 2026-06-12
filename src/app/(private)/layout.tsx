"use client";

import { Suspense, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { Sidebar } from "@/components/layout/sidebar";
import { DashboardHeader } from "@/components/layout/dashboard-header";
import { GoogleAuthHandler } from "@/features/auth/google-auth-handler";
import { NotificationsInitializer } from "@/components/notifications-initializer";
import { useAuthStore } from "@/store/auth.store";
import { authStorage } from "@/lib/auth";

export default function PrivateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const user = useAuthStore((s) => s.user);
  const userRole = useAuthStore((s) => s.userRole);

  useEffect(() => {
    if (!authStorage.hasTokens()) {
      router.replace("/login");
    } else if (userRole === "lawyer") {
      // Lawyers must never land on citizen routes
      router.replace("/advogado");
    }
  }, [router, userRole]);

  useEffect(() => {
    const handleResize = () => {
      setIsSidebarOpen(window.innerWidth >= 1024);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const roleLabel = userRole === "lawyer" ? "Advogado" : "Cidadão";

  const displayUser = {
    name: user?.fullName || "Usuário",
    role: roleLabel,
    avatarUrl: undefined,
  };

  return (
    <>
      <Suspense fallback={null}>
        <GoogleAuthHandler />
      </Suspense>
      <NotificationsInitializer />
      <div className="layout-bg min-h-screen">
        <Sidebar
          isOpen={isSidebarOpen}
          onToggle={() => setIsSidebarOpen((prev) => !prev)}
          onClose={() => setIsSidebarOpen(false)}
          homeHref="/dashboard"
        />

        <div
          className={cn(
            "flex min-h-screen flex-col transition-[padding-left] duration-300 ease-in-out",
            "lg:pl-60",
          )}
        >
          <DashboardHeader
            user={displayUser}
            onMenuToggle={() => setIsSidebarOpen((prev) => !prev)}
          />

          <main
            id="main-content"
            tabIndex={-1}
            className="flex flex-1 flex-col gap-8 px-4 py-6 md:px-6 md:py-8 focus-visible:outline-none"
          >
            {children}
          </main>
        </div>
      </div>
    </>
  );
}
