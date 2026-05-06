'use client';

import { useState, useCallback, useRef, useEffect } from 'react';
import { chatService, ConversationMessage } from '@/services/chat.service';

interface ChatMessage {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: Date;
}

function toUiMessage(msg: ConversationMessage): ChatMessage {
  return {
    id: msg.id,
    content: msg.content,
    role: msg.role === 'User' ? 'user' : 'assistant',
    timestamp: new Date(msg.created_at),
  };
}

export function useChat() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isFetchingHistory, setIsFetchingHistory] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [conversationId, setConversationId] = useState<string | null>(null);
  const [caseId, setCaseId] = useState<string | null>(null);
  const [reportId, setReportId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [progress, setProgress] = useState(10);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const loadHistory = useCallback(async (convId: string) => {
    setConversationId(convId);
    setIsFetchingHistory(true);
    try {
      const data = await chatService.getHistory(convId);
      setMessages(data.messages.map(toUiMessage));
    } catch {
      // history load failure is non-critical
    } finally {
      setIsFetchingHistory(false);
    }
  }, []);

  const startAnalysis = useCallback(
    async (description: string, category: string) => {
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
      setMessages([userMsg]);

      try {
        const data = await chatService.startConversation(description);

        setConversationId(data.conversationId);
        setCaseId(data.caseId);
        setProgress(20);

        if (data.finished) {
          setIsFinished(true);
          if (data.reportId) setReportId(data.reportId);
          setProgress(100);
        }

        if (data.question) {
          setMessages((prev) => [
            ...prev,
            {
              id: `${Date.now()}-assistant`,
              content: data.question,
              role: 'assistant',
              timestamp: new Date(),
            },
          ]);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erro ao iniciar análise');
        setMessages([]);
      } finally {
        setIsLoading(false);
      }
    },
    [],
  );

  const sendMessage = useCallback(
    async (message: string) => {
      if (!message.trim() || isLoading || isFinished || !conversationId) return;

      const tempId = `${Date.now()}-user`;
      setMessages((prev) => [
        ...prev,
        { id: tempId, content: message, role: 'user', timestamp: new Date() },
      ]);
      setInputValue('');
      setIsLoading(true);
      setError(null);

      try {
        const data = await chatService.continueConversation(conversationId, message);

        if (data.question) {
          setMessages((prev) => [
            ...prev,
            {
              id: `${Date.now()}-assistant`,
              content: data.question,
              role: 'assistant',
              timestamp: new Date(),
            },
          ]);
        }

        if (data.finished) {
          setIsFinished(true);
          if (data.reportId) setReportId(data.reportId);
          setProgress(100);
        } else {
          setProgress((p) => Math.min(p + 10, 90));
        }
      } catch (err) {
        setMessages((prev) => prev.filter((m) => m.id !== tempId));
        setInputValue(message);
        setError(err instanceof Error ? err.message : 'Erro ao enviar mensagem');
      } finally {
        setIsLoading(false);
      }
    },
    [conversationId, isLoading, isFinished],
  );

  const clearChat = useCallback(() => {
    setMessages([]);
    setConversationId(null);
    setCaseId(null);
    setReportId(null);
    setIsFinished(false);
    setProgress(10);
    setError(null);
  }, []);

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
