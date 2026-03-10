import type { Message } from "@/types/chat.types";

export const MOCK_CHAT_MESSAGES: Message[] = [
  {
    id: "1",
    role: "assistant",
    content:
      "Recebi seu relato. Para aprofundar minha análise, você poderia me dizer: Em qual data exata ocorreu o incidente e se você possui algum comprovante por escrito?",
    timestamp: new Date(Date.now() - 1000 * 60 * 5),
    quickActions: [
      {
        id: "has-proof",
        label: "Tenho o comprovante",
        value: "Sim, tenho o comprovante do incidente.",
      },
      {
        id: "no-date",
        label: "Não lembro a data",
        value: "Não me lembro da data exata, mas foi aproximadamente há um mês.",
      },
    ],
  },
];
