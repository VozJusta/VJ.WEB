import { FeatureCardProps } from "@/components/ui/feature-card/feature-card.types";
import BoltIcon from "@mui/icons-material/BoltOutlined";
import ChatIcon from "@mui/icons-material/ChatBubbleOutline";
import HubIcon from "@mui/icons-material/HubOutlined";

export const featureCardsData: FeatureCardProps[] = [
  {
    icon: <ChatIcon sx={{ color: "#1978E5" }} />,
    title: "Acesso à Justiça",
    description:
      "Desabafe em linguagem natural. Nossa IA traduz sua história para termos jurídicos precisos, sem que você precise saber uma única lei.",
    variant: "elevated",
  },
  {
    icon: <BoltIcon sx={{ color: "#22D3EE" }} />,
    title: "Digital First",
    description:
      "Diagnóstico instantâneo e organização de provas. Receba um roteiro claro e acionável em segundos, não semanas.",
    variant: "elevated",
  },
  {
    icon: <HubIcon sx={{ color: "#8B5CF6" }} />,
    title: "Eficiência Profissional",
    description:
      "Conexão direta com advogados especialistas. Eles recebem seu caso estruturado, acelerando o início da sua defesa.",
    variant: "elevated",
  },
];
