import type { FooterColumn } from "./footer.types";

export const footerNavigation: FooterColumn[] = [
  {
    title: "EXPLORAR",
    items: [
      { label: "Início", href: "#hero-section" },
      { label: "Nosso time", href: "/nosso-time" },
      { label: "Portfólio", href: "#portfolio" },
      { label: "Blog", href: "#blog" },
    ],
  },
  {
    title: "SUPORTE",
    items: [
      { label: "Ajuda", href: "#help" },
      { label: "Contato", href: "/contato" },
      { label: "Status", href: "#status" },
      { label: "FAQ", href: "#faq-section" },
    ],
  },
  {
    title: "LEGAL",
    items: [
      { label: "Termos", href: "#terms" },
      { label: "Privacidade", href: "#privacy-section" },
      { label: "Cookies", href: "#cookies" },
      { label: "Licença", href: "#license" },
    ],
  },
];
