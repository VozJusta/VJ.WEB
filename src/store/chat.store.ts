import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface StoredMessage {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: string;
}

interface ChatStore {
  conversationId: string;
  caseId: string;
  finished: boolean;
  reportId: string;
  messages: StoredMessage[];

  setConversationId: (id: string) => void;
  setCaseId: (id: string) => void;
  setFinished: (v: boolean) => void;
  setReportId: (id: string) => void;
  setMessages: (msgs: StoredMessage[]) => void;
  addMessage: (msg: StoredMessage) => void;
  clearChat: () => void;
}

export const useChatStore = create<ChatStore>()(
  persist(
    (set) => ({
      conversationId: '',
      caseId: '',
      finished: false,
      reportId: '',
      messages: [],

      setConversationId: (conversationId) => set({ conversationId }),
      setCaseId: (caseId) => set({ caseId }),
      setFinished: (finished) => set({ finished }),
      setReportId: (reportId) => set({ reportId }),
      setMessages: (messages) => set({ messages }),
      addMessage: (msg) => set((state) => ({ messages: [...state.messages, msg] })),
      clearChat: () =>
        set({ conversationId: '', caseId: '', finished: false, reportId: '', messages: [] }),
    }),
    { name: 'chat' }
  )
);
