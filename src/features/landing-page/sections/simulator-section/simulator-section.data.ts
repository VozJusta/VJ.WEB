import { SimulatorFeature } from "./simulator-section.types";
import SimulatorIllustration from '@/assets/illustrations/simulator-illustration.png';

export const simulatorFeatures: Omit<SimulatorFeature, "icon">[] = [
  {
    id: "voice-analysis",
    text: "Análise de tom de voz e clareza",
    iconColor: "text-blue-500",
  },
  {
    id: "real-time-feedback",
    text: "Feedback em tempo real sobre contradições",
    iconColor: "text-blue-500",
  },
  {
    id: "anxiety-reduction",
    text: "Redução comprovada de ansiedade",
    iconColor: "text-blue-500",
  },
];


export const simulatorContent = {
  tag: "SIMULADOR DE AUDIÊNCIA",
  title: "Treine com um ",
  titleHighlight: "Juiz de IA",
  description:
    "Perca o medo do tribunal. Nossa ferramenta cria um ambiente realista onde a IA assume o papel do juiz, fazendo perguntas específicas sobre seu caso para preparar suas respostas e acalmar seus nervos.",
  ctaText: "Testar simulador",
  ctaHref: "#simulator",
  illustrationPath: SimulatorIllustration,
  illustrationAlt:
    "Interface do simulador de tribunal com IA mostrando análise de voz em tempo real",
} as const;
