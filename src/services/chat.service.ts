import { apiFetch } from '@/lib/api-client';

export interface ConversationMessage {
  id: string;
  content: string;
  role: 'User' | 'Assistant';
  created_at: string;
}

export interface ConversationResponse {
  conversationId: string;
  caseId: string;
  question: string;
  finished: boolean;
  reportId?: string;
}

export interface HistoryResponse {
  messages: ConversationMessage[];
}

export const chatService = {
  async startConversation(message: string): Promise<ConversationResponse> {
    const response = await apiFetch('/report/conversation/start', {
      method: 'POST',
      body: JSON.stringify({ message }),
    });
    if (!response.ok) {
      const err = await response.json().catch(() => ({}));
      throw new Error(err.message || 'Erro ao iniciar conversa');
    }
    return response.json();
  },

  async continueConversation(
    conversationId: string,
    message: string,
  ): Promise<ConversationResponse> {
    const response = await apiFetch('/report/conversation/continue', {
      method: 'POST',
      body: JSON.stringify({ conversationId, message }),
    });
    if (!response.ok) {
      const err = await response.json().catch(() => ({}));
      throw new Error(err.message || 'Erro ao enviar mensagem');
    }
    return response.json();
  },

  async getHistory(conversationId: string): Promise<HistoryResponse> {
    const response = await apiFetch(`/report/chat/${conversationId}`);
    if (!response.ok) throw new Error('Erro ao carregar histórico');
    return response.json();
  },

  async transcribeAudio(audioUri: string): Promise<string> {
    const formData = new FormData();
    const audioBlob = await fetch(audioUri).then((r) => r.blob());
    formData.append('file', audioBlob, 'audio.webm');

    const response = await apiFetch('/report/transcribe', {
      method: 'POST',
      body: formData,
    });
    if (!response.ok) throw new Error('Erro ao transcrever áudio');
    const data = await response.json();
    return (
      data.transcription ??
      data.transcript ??
      data.text ??
      data.result ??
      data.content ??
      data.message ??
      ''
    );
  },
};
