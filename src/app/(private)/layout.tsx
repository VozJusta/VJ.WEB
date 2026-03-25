"use client";

import { useState } from "react";
import { cn } from "@/src/lib/utils";
import { Sidebar } from "@/src/components/layout/sidebar";
import { DashboardHeader } from "@/src/components/layout/dashboard-header";
import { useAuth } from "@/src/contexts/auth-context";

export default function PrivateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { user } = useAuth();

  const displayUser = {
    name: user.name,
    role: "Cidadão",
    avatarUrl: user.avatarUrl,
  };

  return (
    <div className="layout-bg min-h-screen">
      <Sidebar
        isOpen={isSidebarOpen}
        onToggle={() => setIsSidebarOpen((prev) => !prev)}
        onClose={() => setIsSidebarOpen(false)}
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
  );
}
