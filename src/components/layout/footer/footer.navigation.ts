import type { FooterColumn } from "./footer.types";

export const footerNavigation: FooterColumn[] = [
  {
    title: "EXPLORAR",
    items: [
      { label: "Início", href: "/" },
      { label: "Nosso time", href: "/nosso-time" },
    ],
  },
  {
    title: "SUPORTE",
    items: [
      { label: "Contato", href: "/contato" },
      { label: "FAQ", href: "/#faq-section" },
    ],
  },
  {
    title: "LEGAL",
    items: [
      { label: "Termos de Uso", href: "/termos" },
    ],
  },
];
