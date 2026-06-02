import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contato",
  description:
    "Entre em contato com a equipe VozJusta. Tire dúvidas sobre a plataforma, suporte jurídico e tecnológico — por e-mail ou WhatsApp.",
  alternates: { canonical: "/contato" },
  openGraph: {
    title: "Contato | VozJusta",
    description:
      "Fale com nossa equipe. Suporte jurídico e tecnológico à disposição.",
    url: "/contato",
    type: "website",
  },
};

export default function ContatoLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
