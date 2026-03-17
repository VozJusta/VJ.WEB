"use client";

import { useState, useRef, useEffect } from "react";
import { MessageBubble } from "@/components/ui/message-bubble";
import { ChatInput } from "@/components/ui/chat-input";
import type { Message, QuickAction } from "@/types/chat.types";

interface AIChatFeatureProps {
  initialMessages?: Message[];
  caseId?: string;
  progress?: number;
  stage?: string;
}

export function AIChatFeature({
  initialMessages = [],
  caseId,
  progress = 40,
  stage = "Análise Inicial",
}: AIChatFeatureProps) {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [inputValue, setInputValue] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (content: string) => {
    if (!content.trim() || isProcessing) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: content.trim(),
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsProcessing(true);

    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content:
          "Entendi. Vou analisar as informações fornecidas. Você pode me fornecer mais detalhes sobre o contexto do incidente?",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiResponse]);
      setIsProcessing(false);
    }, 1500);
  };

  const handleQuickAction = (action: QuickAction) => {
    handleSendMessage(action.value);
  };

  const handleVoiceRecord = () => {
    console.log("Voice recording not implemented yet");
  };

  return (
    <div className="flex h-full min-h-screen flex-col">
      <header
        className="sticky top-16 z-20 border-b border-(--border-subtle) bg-surface/95 backdrop-blur-sm px-6 py-4"
        aria-label="Progresso da análise"
      >
        <div className="flex items-center justify-between">
          <h2 className="text-xs font-semibold uppercase tracking-widest text-text-muted">
            {stage}
          </h2>
          <span className="text-xs font-semibold uppercase tracking-widest text-primary">
            {progress}% Concluído
          </span>
        </div>
        <div
          className="mt-2 h-1 overflow-hidden rounded-full bg-surface-elevated"
          role="progressbar"
          aria-valuenow={progress}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label={`Progresso da análise: ${progress}%`}
        >
          <div
            className="h-full bg-primary transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
      </header>

      <main className="flex-1 overflow-y-auto px-6 py-8">
        <div className="mx-auto flex max-w-4xl flex-col gap-6">
          {messages.length === 0 && (
            <section
              className="flex flex-col items-center justify-center py-16 text-center"
              aria-label="Estado inicial do chat"
            >
              <p className="text-sm text-text-muted">
                Aguardando sua resposta para continuar a análise...
              </p>
            </section>
          )}

          {messages.map((message) => (
            <MessageBubble
              key={message.id}
              role={message.role}
              content={message.content}
              timestamp={message.timestamp}
              quickActions={message.quickActions}
              onQuickAction={handleQuickAction}
            />
          ))}

          {isProcessing && (
            <article
              className="flex gap-3"
              aria-label="IA está digitando"
              aria-live="polite"
            >
              <figure
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/20"
                aria-hidden="true"
              >
                <span className="text-xs font-semibold text-primary">AI</span>
              </figure>
              <div className="flex items-center gap-1 rounded-2xl bg-surface-elevated px-4 py-3">
                <span className="h-2 w-2 animate-bounce rounded-full bg-text-muted [animation-delay:-0.3s]" />
                <span className="h-2 w-2 animate-bounce rounded-full bg-text-muted [animation-delay:-0.15s]" />
                <span className="h-2 w-2 animate-bounce rounded-full bg-text-muted" />
              </div>
            </article>
          )}

          <div ref={messagesEndRef} aria-hidden="true" />
        </div>
      </main>

      <ChatInput
        value={inputValue}
        onChange={setInputValue}
        onSend={() => handleSendMessage(inputValue)}
        onVoiceRecord={handleVoiceRecord}
        disabled={isProcessing}
        maxHeight={200}
      />
    </div>
  );
}
