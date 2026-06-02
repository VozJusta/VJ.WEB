import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Em Breve",
  description:
    "Novidades chegando à VozJusta. Fique atento às próximas funcionalidades da plataforma de acesso à justiça.",
  robots: { index: false, follow: false },
};

export default function ComingSoonLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
