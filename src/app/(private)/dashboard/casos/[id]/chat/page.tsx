import { AIChatFeature } from "@/features/dashboard/ai-chat";
import { MOCK_CHAT_MESSAGES } from "@/features/dashboard/ai-chat/ai-chat.data";

export const metadata = {
  title: "Chat com IA | Voz Justa",
  description: "Converse com a IA para análise do seu caso",
};

interface AIChatPageProps {
  params: Promise<{ id: string }>;
}

export default async function AIChatPage({ params }: AIChatPageProps) {
  const { id } = await params;

  return (
    <AIChatFeature
      initialMessages={MOCK_CHAT_MESSAGES}
      caseId={id}
      progress={40}
      stage="Análise Inicial"
    />
  );
}
