import { AIChatFeature } from "@/features/dashboard/ai-chat";

export const metadata = {
  title: "Chat com IA | Voz Justa",
  description: "Converse com a IA para análise do seu caso",
};

interface AIChatPageProps {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ conversationId?: string }>;
}

export default async function AIChatPage({ params, searchParams }: AIChatPageProps) {
  const { id } = await params;
  const { conversationId } = await searchParams;

  return <AIChatFeature caseId={id} conversationId={conversationId} />;
}
