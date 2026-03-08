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
  return (
    <div className="min-h-screen bg-[var(--dashboard-bg)]">
      <Sidebar />

      <div className="flex min-h-screen flex-col pl-[var(--sidebar-width)]">
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
