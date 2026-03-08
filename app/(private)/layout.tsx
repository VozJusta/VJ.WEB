"use client";

import { useState } from "react";
import { Sidebar } from "@/app/components/layout/sidebar";
import { DashboardHeader } from "@/app/components/layout/dashboard-header";

const DEMO_USER = {
  name: "Ricardo Silva",
  role: "Cidadão",
  avatarUrl: undefined,
};

export default function PrivateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className="layout-bg min-h-screen">
      <Sidebar
        isOpen={isSidebarOpen}
        onToggle={() => setIsSidebarOpen((prev) => !prev)}
      />

      <div
        className="flex min-h-screen flex-col transition-[padding-left] duration-300 ease-in-out"
        style={{ paddingLeft: isSidebarOpen ? "var(--sidebar-width)" : "var(--sidebar-collapsed-width)" }}
      >
        <DashboardHeader user={DEMO_USER} />

        <main
          id="main-content"
          tabIndex={-1}
          className="flex flex-1 flex-col gap-8 px-6 py-8 focus-visible:outline-none"
        >
          {children}
        </main>
      </div>
    </div>
  );
}
