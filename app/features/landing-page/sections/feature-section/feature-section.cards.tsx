import { FeatureCardProps } from "@/components/ui/feature-card/feature-card.types";

export const featureCardsData: FeatureCardProps[] = [
    {
        icon: <BoltI color="#1978E5" />,
        title: "Acesso à Justiça",
        description: "Desabafe em linguagem natural. Nossa IA traduz sua história para termos jurídicos precisos, sem que você precise saber uma única lei.",
        variant: "elevated",
    },
    {
        icon: <Zap color="#22D3EE" />,
        title: "Digital First",
        description: "Diagnóstico instantâneo e organização de provas. Receba um roteiro claro e acionável em segundos, não semanas.",
        variant: "elevated",
    },
    {
        icon: <MessageSquare color="#1978E5" />,
    }
]