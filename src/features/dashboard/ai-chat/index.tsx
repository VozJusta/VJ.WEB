"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { MessageBubble } from "@/components/ui/message-bubble";
import { ChatInput } from "@/components/ui/chat-input";
import { useChat } from "@/hooks/useChat";
import { chatService } from "@/services/chat.service";

interface AIChatFeatureProps {
  conversationId?: string;
  caseId?: string;
}

export function AIChatFeature({ conversationId, caseId }: AIChatFeatureProps) {
  const router = useRouter();
  const {
    messages,
    inputValue,
    setInputValue,
    isLoading,
    isFetchingHistory,
    isFinished,
    reportId,
    error,
    progress,
    bottomRef,
    sendMessage,
    loadHistory,
  } = useChat();

  const [isRecording, setIsRecording] = useState(false);
  const [isTranscribing, setIsTranscribing] = useState(false);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);

  useEffect(() => {
    if (conversationId && messages.length === 0) {
      loadHistory(conversationId);
    }
  }, [conversationId]);

  useEffect(() => {
    if (isFinished && reportId) {
      router.push(`/dashboard/casos/${caseId ?? 'novo'}/analise?reportId=${reportId}`);
    }
  }, [isFinished, reportId, caseId, router]);

  const handleVoiceRecord = async () => {
    if (isRecording) {
      mediaRecorderRef.current?.stop();
      setIsRecording(false);
      return;
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream);
      chunksRef.current = [];

      recorder.ondataavailable = (e) => {
        if (e.data.size > 0) chunksRef.current.push(e.data);
      };

      recorder.onstop = async () => {
        stream.getTracks().forEach((t) => t.stop());
        const blob = new Blob(chunksRef.current, { type: 'audio/webm' });
        const url = URL.createObjectURL(blob);

        setIsTranscribing(true);
        try {
          const text = await chatService.transcribeAudio(url);
          if (text.trim()) {
            setInputValue(text);
          }
        } catch {
          // transcription failed — user can type manually
        } finally {
          URL.revokeObjectURL(url);
          setIsTranscribing(false);
        }
      };

      mediaRecorderRef.current = recorder;
      recorder.start();
      setIsRecording(true);
    } catch {
      // microphone access denied or not available
    }
  };

  const stage = isFinished ? "Análise Concluída" : isFetchingHistory ? "Carregando..." : "Análise em Andamento";

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
          {isFetchingHistory && (
            <div className="flex justify-center py-10">
              <span className="animate-spin h-6 w-6 rounded-full border-2 border-primary border-t-transparent" />
            </div>
          )}

          {!isFetchingHistory && messages.length === 0 && (
            <section
              className="flex flex-col items-center justify-center py-16 text-center"
              aria-label="Estado inicial do chat"
            >
              <p className="text-sm text-text-muted">
                Aguardando sua resposta para continuar a análise...
              </p>
            </section>
          )}

          {error && (
            <p className="text-center text-sm text-red-400">{error}</p>
          )}

          {messages.map((message) => (
            <MessageBubble
              key={message.id}
              role={message.role}
              content={message.content}
              timestamp={message.timestamp}
            />
          ))}

          {isLoading && (
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

          <div ref={bottomRef} aria-hidden="true" />
        </div>
      </main>

      <ChatInput
        value={inputValue}
        onChange={setInputValue}
        onSend={() => sendMessage(inputValue)}
        onVoiceRecord={handleVoiceRecord}
        disabled={isLoading || isFinished || isFetchingHistory}
        isRecording={isRecording}
        isTranscribing={isTranscribing}
        maxHeight={200}
      />
    </div>
  );
}
