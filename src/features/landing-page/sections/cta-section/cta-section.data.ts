import { Stat } from "./cta-section.types";

export const ctaStats: Stat[] = [
  {
    id: "time-saved",
    value: "10h",
    label: "Poupadas por semana",
    valueColor: "text-blue-500",
  },
  {
    id: "lgpd-compliance",
    value: "100%",
    label: "Segurança LGPD",
    valueColor: "text-blue-500",
  },
  {
    id: "lead-conversion",
    value: "+40%",
    label: "Conversão de leads",
    valueColor: "text-blue-500",
  },
  {
    id: "setup-cost",
    value: "Zero",
    label: "Custo de setup",
    valueColor: "text-blue-500",
  },
];

export const ctaContent = {
  title: "Advogado, pare de perder tempo com triagem manual.",
  description:
    "Receba leads qualificados, casos organizados e documentos pré-analisados pela nossa IA. Foque na estratégia, nós cuidamos da triagem.",
  ctaText: "VozJusta para Advogados",
  ctaHref: "/onBoarding/advogado",
} as const;
