'use client';

import { useState, useCallback, useRef, useEffect } from 'react';
import { chatService, ConversationMessage } from '@/services/chat.service';
import { useChatStore, StoredMessage } from '@/store/chat.store';

interface ChatMessage {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: Date;
  attachment?: { name: string; type: 'pdf' | 'image'; previewUrl?: string; url?: string };
}

function toUiMessage(msg: ConversationMessage): ChatMessage {
  return {
    id: msg.id,
    content: msg.content,
    role: msg.role === 'User' ? 'user' : 'assistant',
    timestamp: new Date(msg.created_at),
  };
}

function storedToUi(msg: StoredMessage): ChatMessage {
  return { ...msg, timestamp: new Date(msg.timestamp) };
}

function uiToStored(msg: ChatMessage): StoredMessage {
  return {
    id: msg.id,
    content: msg.content,
    role: msg.role,
    timestamp: msg.timestamp.toISOString(),
    attachment: msg.attachment
      ? { name: msg.attachment.name, type: msg.attachment.type, url: msg.attachment.url }
      : undefined,
  };
}

export function useChat() {
  const store = useChatStore();

  const [messages, setMessages] = useState<ChatMessage[]>(
    () => store.messages.map(storedToUi)
  );
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isFetchingHistory, setIsFetchingHistory] = useState(false);
  const [isFinished, setIsFinished] = useState(() => store.finished);
  const [conversationId, setConversationId] = useState<string | null>(
    () => store.conversationId || null
  );
  const [caseId, setCaseId] = useState<string | null>(
    () => store.caseId || null
  );
  const [reportId, setReportId] = useState<string | null>(
    () => store.reportId || null
  );
  const [error, setError] = useState<string | null>(null);
  const [progress, setProgress] = useState(() => (store.finished ? 100 : 10));
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const syncMessages = useCallback((msgs: ChatMessage[]) => {
    setMessages(msgs);
    store.setMessages(msgs.map(uiToStored));
  }, [store]);

  const loadHistory = useCallback(async (convId: string) => {
    setConversationId(convId);
    store.setConversationId(convId);
    setIsFetchingHistory(true);
    try {
      const data = await chatService.getHistory(convId);
      const uiMsgs = data.messages.map(toUiMessage);
      setMessages(uiMsgs);
      store.setMessages(uiMsgs.map(uiToStored));
    } catch {
      // history load failure is non-critical
    } finally {
      setIsFetchingHistory(false);
    }
  }, [store]);

  const startAnalysis = useCallback(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    async (description: string, category: string, apiContent?: string) => {
      if (!description.trim()) {
        setError('Descreva o ocorrido para iniciar a análise');
        return;
      }

      setIsLoading(true);
      setError(null);

      const userMsg: ChatMessage = {
        id: `${Date.now()}-user`,
        content: description,
        role: 'user',
        timestamp: new Date(),
      };
      syncMessages([userMsg]);

      const contentForApi = apiContent ?? description;

      try {
        const data = await chatService.startConversation(contentForApi);

        setConversationId(data.conversationId);
        store.setConversationId(data.conversationId);
        setCaseId(data.caseId);
        store.setCaseId(data.caseId);
        setProgress(20);

        if (data.finished) {
          setIsFinished(true);
          store.setFinished(true);
          if (data.reportId) {
            setReportId(data.reportId);
            store.setReportId(data.reportId);
          }
          setProgress(100);
        }

        if (data.question) {
          const aiMsg: ChatMessage = {
            id: `${Date.now()}-assistant`,
            content: data.question,
            role: 'assistant',
            timestamp: new Date(),
          };
          const updated = [userMsg, aiMsg];
          syncMessages(updated);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erro ao iniciar análise');
        syncMessages([]);
      } finally {
        setIsLoading(false);
      }
    },
    [store, syncMessages],
  );

  const sendMessage = useCallback(
    async (
      message: string,
      attachment?: ChatMessage['attachment'],
      apiContent?: string,
    ) => {
      const contentForApi = apiContent ?? message;
      if (!contentForApi.trim() || isLoading || isFinished || !conversationId) return;

      const tempId = `${Date.now()}-user`;
      const newMsg: ChatMessage = { id: tempId, content: message, role: 'user', timestamp: new Date(), attachment };
      const updated = [...messages, newMsg];
      syncMessages(updated);
      setInputValue('');
      setIsLoading(true);
      setError(null);

      try {
        const data = await chatService.continueConversation(conversationId, contentForApi);

        if (data.question) {
          const aiMsg: ChatMessage = {
            id: `${Date.now()}-assistant`,
            content: data.question,
            role: 'assistant',
            timestamp: new Date(),
          };
          syncMessages([...updated, aiMsg]);
        }

        if (data.finished) {
          setIsFinished(true);
          store.setFinished(true);
          if (data.reportId) {
            setReportId(data.reportId);
            store.setReportId(data.reportId);
          }
          setProgress(100);
        } else {
          setProgress((p) => Math.min(p + 10, 90));
        }
      } catch (err) {
        syncMessages(messages);
        setInputValue(message);
        setError(err instanceof Error ? err.message : 'Erro ao enviar mensagem');
      } finally {
        setIsLoading(false);
      }
    },
    [conversationId, isLoading, isFinished, messages, store, syncMessages],
  );

  const clearChat = useCallback(() => {
    setMessages([]);
    setConversationId(null);
    setCaseId(null);
    setReportId(null);
    setIsFinished(false);
    setProgress(10);
    setError(null);
    store.clearChat();
  }, [store]);

  return {
    messages,
    inputValue,
    setInputValue,
    isLoading,
    isFetchingHistory,
    isFinished,
    conversationId,
    caseId,
    reportId,
    error,
    progress,
    bottomRef,
    startAnalysis,
    sendMessage,
    loadHistory,
    clearChat,
  };
}
