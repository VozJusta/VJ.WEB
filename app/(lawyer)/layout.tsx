"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { Sidebar } from "@/components/layout/sidebar";
import { DashboardHeader } from "@/components/layout/dashboard-header";
import { lawyerSidebarMainNav, lawyerSidebarBottomNav } from "./sidebar.navigation";

const DEMO_LAWYER = {
  name: "Dra. Ana Carolina Silva",
  role: "Advogada",
  avatarUrl: undefined,
};

export default function LawyerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="layout-bg min-h-screen">
      <Sidebar
        isOpen={isSidebarOpen}
        onToggle={() => setIsSidebarOpen((prev) => !prev)}
        onClose={() => setIsSidebarOpen(false)}
        mainNav={lawyerSidebarMainNav}
        bottomNav={lawyerSidebarBottomNav}
      />

      <div
        className={cn(
          "flex min-h-screen flex-col transition-[padding-left] duration-300 ease-in-out",
          "lg:pl-60",
        )}
      >
        <DashboardHeader
          user={DEMO_LAWYER}
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
