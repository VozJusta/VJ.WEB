import type { Notification } from "@/types/notification.types";

export const MOCK_NOTIFICATIONS: Notification[] = [
  {
    id: "1",
    type: "case-update",
    title: "Caso atualizado",
    message: "O caso #2345 teve uma atualização importante. Um novo documento foi anexado.",
    timestamp: new Date(Date.now() - 1000 * 60 * 30),
    read: false,
    actionUrl: "/dashboard/casos/2345",
    actionLabel: "Ver caso",
  },
  {
    id: "2",
    type: "success",
    title: "Documento aprovado",
    message: "Seu documento 'Certidão de Nascimento' foi aprovado e está disponível para download.",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2),
    read: false,
    actionUrl: "/dashboard/documentos",
    actionLabel: "Ver documento",
  },
  {
    id: "3",
    type: "info",
    title: "Nova mensagem",
    message: "Você recebeu uma nova mensagem do advogado Dr. João Silva.",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 5),
    read: true,
    actionUrl: "/dashboard/casos/2345",
    actionLabel: "Ver mensagem",
  },
  {
    id: "4",
    type: "warning",
    title: "Prazo próximo",
    message: "O prazo para envio de documentos do caso #2345 vence em 3 dias.",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24),
    read: true,
    actionUrl: "/dashboard/casos/2345",
    actionLabel: "Ver detalhes",
  },
];
