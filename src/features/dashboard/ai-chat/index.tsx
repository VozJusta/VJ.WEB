"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { CheckCircleRounded } from "@mui/icons-material";
import { MessageBubble } from "@/components/ui/message-bubble";
import { ChatInput } from "@/components/ui/chat-input";
import { Button } from "@/components/ui/button";
import { useChat } from "@/hooks/useChat";
import { chatService } from "@/services/chat.service";
import { evidenceService } from "@/services/evidence.service";
import { useToast } from "@/components/ui/toast/toast-provider";

interface AIChatFeatureProps {
  conversationId?: string;
  caseId?: string;
}

export function AIChatFeature({ conversationId, caseId }: AIChatFeatureProps) {
  const router = useRouter();
  const { toast } = useToast();
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
  const [isUploading, setIsUploading] = useState(false);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);

  useEffect(() => {
    if (conversationId && messages.length === 0) {
      loadHistory(conversationId);
    }
  }, [conversationId]);

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

  const handleFileAttach = async (file: File) => {
    setIsUploading(true);
    try {
      await evidenceService.upload(file);
      toast({
        title: "Arquivo enviado",
        description: "O arquivo foi anexado como evidência.",
        variant: "success",
      });
    } catch (err) {
      toast({
        title: "Erro ao enviar arquivo",
        description: err instanceof Error ? err.message : "Tente novamente.",
        variant: "error",
      });
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="flex flex-1 flex-col -mx-4 -my-6 md:-mx-6 md:-my-8">
      <main className="flex-1 px-4 py-4 md:px-6 md:py-6 pb-2">
        <div className="mx-auto flex max-w-4xl flex-col gap-6">
          {isFetchingHistory && (
            <div className="flex justify-center py-10">
              <span className="animate-spin h-6 w-6 rounded-full border-2 border-primary border-t-transparent" />
            </div>
          )}

          {!isFetchingHistory && messages.length === 0 && (
            <section
              className="flex flex-col items-center justify-center py-10 text-center"
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

          {isFinished && (
            <article
              className="flex flex-col items-center gap-4 rounded-2xl border border-green-500/30 bg-green-500/10 px-6 py-8 text-center"
              aria-live="polite"
              aria-label="Análise concluída"
            >
              <span className="flex h-14 w-14 items-center justify-center rounded-full bg-green-500/20">
                <CheckCircleRounded className="text-green-400" sx={{ fontSize: 32 }} aria-hidden />
              </span>
              <div>
                <h3 className="text-base font-bold text-white mb-1">Análise Concluída!</h3>
                <p className="text-sm text-white/60">
                  Nossa IA processou seu relato com sucesso. Veja o resultado completo abaixo.
                </p>
              </div>
              {reportId && (
                <Button
                  variant="primary"
                  size="md"
                  href={`/dashboard/casos/${caseId ?? 'novo'}/analise?reportId=${reportId}`}
                >
                  Ver Análise Completa
                </Button>
              )}
            </article>
          )}

          {isLoading && (
            <article
              className="flex gap-3"
              aria-label="IA está digitando"
              aria-live="polite"
            >
              <figure
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/20"
                aria-hidden="true"
              >
                <span className="text-sm font-semibold text-primary">AI</span>
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

      {/* Sticky input — always visible at the bottom of the viewport */}
      <div className="sticky bottom-0 z-10 border-t border-(--border-subtle) bg-surface px-4 pb-4 pt-3 md:px-6">
        <div className="mx-auto max-w-4xl">
          <ChatInput
            value={inputValue}
            onChange={setInputValue}
            onSend={() => sendMessage(inputValue)}
            onVoiceRecord={handleVoiceRecord}
            onFileAttach={handleFileAttach}
            disabled={isLoading || isFinished || isFetchingHistory}
            isRecording={isRecording}
            isTranscribing={isTranscribing}
            isUploading={isUploading}
            maxHeight={160}
          />
        </div>
      </div>
    </div>
  );
}
