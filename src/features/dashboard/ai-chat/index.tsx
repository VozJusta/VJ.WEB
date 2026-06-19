"use client";

import { useEffect, useRef, useState } from "react";
import { CheckCircleRounded, PictureAsPdfRounded, ImageRounded, CloseRounded } from "@mui/icons-material";
import { MessageBubble } from "@/components/ui/message-bubble";
import { ChatInput } from "@/components/ui/chat-input";
import { Button } from "@/components/ui/button";
import { useChat } from "@/hooks/useChat";
import { chatService } from "@/services/chat.service";
import { extractPdfText } from "@/lib/pdf-extract";

interface AIChatFeatureProps {
  conversationId?: string;
  caseId?: string;
}

interface PendingFileItem {
  name: string;
  type: 'pdf' | 'image';
  previewUrl?: string;
  apiText: string;
}

export function AIChatFeature({ conversationId, caseId }: AIChatFeatureProps) {
  const {
    messages,
    inputValue,
    setInputValue,
    isLoading,
    isFetchingHistory,
    isFinished,
    reportId,
    error,
    bottomRef,
    sendMessage,
    loadHistory,
  } = useChat();

  const [isRecording, setIsRecording] = useState(false);
  const [isTranscribing, setIsTranscribing] = useState(false);
  const [isProcessingFile, setIsProcessingFile] = useState(false);
  const [pendingFiles, setPendingFiles] = useState<PendingFileItem[]>([]);
  const [fileError, setFileError] = useState<string | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);

  useEffect(() => {
    if (conversationId && messages.length === 0) {
      loadHistory(conversationId);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [conversationId]);

  const handleFileUpload = async (files: File[]) => {
    const validFiles = files.filter(
      (f) => f.type === 'application/pdf' || f.type.startsWith('image/')
    ).slice(0, 5);
    if (validFiles.length === 0) return;

    setIsProcessingFile(true);
    setFileError(null);

    try {
      const newPending: PendingFileItem[] = [];

      for (const file of validFiles) {
        const isPdf = file.type === 'application/pdf';
        const previewUrl = !isPdf ? URL.createObjectURL(file) : undefined;
        let extractedText = '';

        if (isPdf) {
          // Try client-side extraction first; fallback to backend OCR for scanned PDFs
          extractedText = await extractPdfText(file).catch(() => '');
          if (!extractedText.trim()) {
            const ev = await chatService.uploadEvidence(file).catch(() => null);
            extractedText = ev?.ocr_content ?? '';
          }
          if (!extractedText.trim()) extractedText = '(Não foi possível extrair texto deste PDF)';
        } else {
          const ev = await chatService.uploadEvidence(file).catch(() => null);
          extractedText = ev?.ocr_content ?? '';
          if (!extractedText.trim()) extractedText = '(Nenhum texto identificado na imagem)';
        }

        newPending.push({
          name: file.name,
          type: isPdf ? 'pdf' : 'image',
          previewUrl,
          apiText: `[${isPdf ? 'PDF' : 'Imagem'}: ${file.name}]\n${extractedText}`,
        });
      }

      setPendingFiles((prev) => [...prev, ...newPending]);
    } catch {
      setFileError('Erro ao processar arquivo. Tente novamente.');
    } finally {
      setIsProcessingFile(false);
    }
  };

  const handleRemovePendingFile = (index: number) => {
    setPendingFiles((prev) => {
      const removed = prev[index];
      if (removed?.previewUrl) URL.revokeObjectURL(removed.previewUrl);
      return prev.filter((_, i) => i !== index);
    });
  };

  const handleSend = () => {
    const hasText = inputValue.trim().length > 0;
    const hasFiles = pendingFiles.length > 0;
    if ((!hasText && !hasFiles) || isLoading || isFinished) return;

    const fileApiContent = pendingFiles.map((pf) => pf.apiText).join('\n\n');
    const combinedApiContent = [fileApiContent, inputValue.trim()].filter(Boolean).join('\n\n');

    const attachment = hasFiles
      ? {
          name: pendingFiles.length > 1 ? `${pendingFiles.length} arquivos` : pendingFiles[0].name,
          type: pendingFiles[0].type,
          previewUrl: pendingFiles[0].previewUrl,
        }
      : undefined;

    sendMessage(inputValue.trim(), attachment, combinedApiContent || inputValue.trim());
    setInputValue('');
    setFileError(null);
    setPendingFiles((prev) => {
      prev.forEach((pf) => { if (pf.previewUrl) URL.revokeObjectURL(pf.previewUrl); });
      return [];
    });
  };

  // No auto-redirect: show completion banner and let user click through

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
              attachment={message.attachment}
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
          {fileError && (
            <p className="mb-2 text-xs text-red-400 px-1">{fileError}</p>
          )}

          {pendingFiles.length > 0 && (
            <div className="mb-2 flex flex-col gap-1">
              {pendingFiles.map((pf, index) => (
                <div
                  key={`${pf.name}-${index}`}
                  className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-3 py-2"
                >
                  {pf.type === 'pdf' ? (
                    <PictureAsPdfRounded fontSize="small" className="text-red-400 shrink-0" aria-hidden />
                  ) : pf.previewUrl ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={pf.previewUrl} alt="" className="h-8 w-8 rounded object-cover shrink-0" />
                  ) : (
                    <ImageRounded fontSize="small" className="text-blue-400 shrink-0" aria-hidden />
                  )}
                  <span className="flex-1 truncate text-xs text-white/70">{pf.name}</span>
                  <button
                    type="button"
                    onClick={() => handleRemovePendingFile(index)}
                    className="shrink-0 text-white/30 hover:text-white/70 transition-colors"
                    aria-label={`Remover ${pf.name}`}
                  >
                    <CloseRounded fontSize="small" />
                  </button>
                </div>
              ))}
            </div>
          )}

          <ChatInput
            value={inputValue}
            onChange={setInputValue}
            onSend={handleSend}
            onVoiceRecord={handleVoiceRecord}
            onFileUpload={handleFileUpload}
            disabled={isLoading || isFinished || isFetchingHistory}
            isRecording={isRecording}
            isTranscribing={isTranscribing}
            isProcessingFile={isProcessingFile}
            hasPendingFiles={pendingFiles.length > 0}
            maxHeight={160}
          />
        </div>
      </div>
    </div>
  );
}
