import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Começar | VozJusta",
  description: "Configure sua conta e comece a usar o VozJusta.",
};

export default function OnboardingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="isolate min-h-screen w-full bg-[#0A0E14]">{children}</div>
  );
}
