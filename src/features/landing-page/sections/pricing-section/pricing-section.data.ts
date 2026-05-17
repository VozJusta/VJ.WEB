import { Plan } from "./pricing-section.types";

export const citizenPlans: Plan[] = [
  {
    id: "cidadao-consciente",
    name: "Cidadão Consciente",
    description: "Para tirar dúvidas rápidas e diagnóstico.",
    price: "Grátis",
    features: [
      {
        id: "1",
        text: "1 diagnóstico completo por mês",
      },
      {
        id: "2",
        text: "Explicação simplificada do problema",
      },
      {
        id: "3",
        text: "Lista de advogados especializados",
      },
    ],
    ctaText: "Começar Grátis",
    ctaHref: "/onBoarding/cidadao",
    variant: "dark",
    audience: "citizen",
  },
  {
    id: "voz-protegida",
    name: "Voz Protegida",
    description: "Para quem precisa usar todos os dias.",
    price: "R$ 29,90/mês",
    features: [
      {
        id: "1",
        text: "Diagnósticos ilimitados",
      },
      {
        id: "2",
        text: "Simulador de Audiência com IA",
      },
      {
        id: "3",
        text: "Envio de PDF para advogados",
      },
      {
        id: "4",
        text: "5GB armazenamento na nuvem",
      },
    ],
    ctaText: "Assinar Agora",
    ctaHref: "/onBoarding/cidadao",
    variant: "light",
    recommended: true,
    audience: "citizen",
  },
  {
    id: "sos-juridico",
    name: "SOS Jurídico",
    description: "Solução pontual para urgências.",
    price: "R$ 49,90",
    features: [
      {
        id: "1",
        text: "1 Dossiê Técnico completo",
      },
      {
        id: "2",
        text: "3 sessões de simulação focadas",
      },
      {
        id: "3",
        text: "Sem mensalidade",
      },
    ],
    ctaText: "Comprar Agora",
    ctaHref: "/onBoarding/cidadao",
    variant: "dark",
    audience: "citizen",
  },
];

export const lawyerPlans: Plan[] = [
  {
    id: "advogado-junior",
    name: "Advogado Júnior",
    description: "O empurrão que sua carreira precisa.",
    price: "R$ 99/mês",
    features: [
      {
        id: "1",
        text: "Até 5 leads qualificados/mês",
      },
      {
        id: "2",
        text: "Dossiê técnico pré-analisado",
      },
      {
        id: "3",
        text: "Perfil profissional básico",
      },
      {
        id: "4",
        text: "Contato direto via WhatsApp",
      },
    ],
    ctaText: "Começar Agora",
    ctaHref: "/onBoarding/advogado",
    variant: "dark",
    audience: "lawyer",
  },
  {
    id: "escritorio-digital",
    name: "Escritório Digital",
    description: "Transforme sua produtividade.",
    price: "R$ 249/mês",
    features: [
      {
        id: "1",
        text: "Leads ilimitados",
      },
      {
        id: "2",
        text: "IA gera esboço da Petição Inicial",
      },
      {
        id: "3",
        text: 'Selo "Advogado Pro" verificado',
      },
      {
        id: "4",
        text: "Prioridade no match com clientes",
      },
    ],
    ctaText: "Assinar Pro",
    ctaHref: "/onBoarding/advogado",
    variant: "light",
    recommended: true,
    audience: "lawyer",
  },
  {
    id: "master-juridico",
    name: "Master Jurídico",
    description: "Domine o mercado com dados.",
    price: "R$ 499/mês",
    features: [
      {
        id: "1",
        text: "Tudo do plano Pro",
      },
      {
        id: "2",
        text: "Painel Analytics Exclusivo",
      },
      {
        id: "3",
        text: "Perfil sempre no topo",
      },
      {
        id: "4",
        text: "Suporte VIP 24/7",
      },
    ],
    ctaText: "Ir para Master",
    ctaHref: "/onBoarding/advogado",
    variant: "dark",
    audience: "lawyer",
  },
];