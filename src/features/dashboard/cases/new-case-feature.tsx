"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  ArrowBackRounded,
  HourglassEmptyRounded,
  AutoAwesomeRounded,
  AttachFileRounded,
  PictureAsPdfRounded,
  ImageRounded,
  CloseRounded,
} from "@mui/icons-material";
import { extractPdfText } from "@/lib/pdf-extract";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { VoiceRecorder } from "@/components/ui/voice-recorder";
import { useChat } from "@/hooks/useChat";
import { chatService } from "@/services/chat.service";

export function NewCaseFeature() {
  const router = useRouter();
  const [story, setStory] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [isTranscribing, setIsTranscribing] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const [isReady, setIsReady] = useState(false);
  const [attachedFile, setAttachedFile] = useState<{ file: File; name: string; type: 'pdf' | 'image' } | null>(null);
  const [isProcessingFile, setIsProcessingFile] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const { startAnalysis, isLoading, conversationId, caseId, error, clearChat } = useChat();

  // Always start fresh so a second case doesn't inherit state from a previous session.
  // isReady gates the navigation effect so stale store values don't trigger a redirect
  // before clearChat() has zeroed them out.
  useEffect(() => {
    clearChat();
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsReady(true);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (isRecording) {
      timerRef.current = setInterval(() => setElapsed((e) => e + 1), 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setElapsed(0);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isRecording]);

  useEffect(() => {
    if (isReady && conversationId && caseId) {
      router.push(`/dashboard/casos/${caseId}/chat?conversationId=${conversationId}`);
    }
  }, [isReady, conversationId, caseId, router]);

  const handleStartRecording = async () => {
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
          if (text.trim()) setStory((prev) => (prev ? `${prev} ${text}` : text));
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
      // microphone access denied or unavailable
    }
  };

  const handleStopRecording = () => {
    mediaRecorderRef.current?.stop();
    setIsRecording(false);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const isPdf = file.type === 'application/pdf';
    const isImage = file.type.startsWith('image/');
    if (!isPdf && !isImage) return;

    setAttachedFile({ file, name: file.name, type: isPdf ? 'pdf' : 'image' });
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleRemoveAttachment = () => {
    setAttachedFile(null);
  };

  const canSubmit = (story.trim().length > 0 || !!attachedFile) && !isLoading && !isTranscribing && !isProcessingFile;

  const handleSubmit = async () => {
    if (!canSubmit) return;

    let extractedContent = '';
    if (attachedFile) {
      setIsProcessingFile(true);
      try {
        if (attachedFile.type === 'pdf') {
          extractedContent = await extractPdfText(attachedFile.file);
          if (!extractedContent.trim()) extractedContent = '(Não foi possível extrair texto deste PDF)';
        } else {
          const evidence = await chatService.uploadEvidence(attachedFile.file);
          extractedContent = evidence.ocr_content ?? '(Nenhum texto identificado na imagem)';
        }
      } catch {
        extractedContent = '';
      } finally {
        setIsProcessingFile(false);
      }
    }

    const visibleStory = story.trim() || attachedFile?.name || '';
    const apiContent = extractedContent
      ? story.trim() ? `${story}\n\n${extractedContent}` : extractedContent
      : story;

    await startAnalysis(visibleStory, 'outros', apiContent || visibleStory);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className="flex flex-col gap-6 w-full max-w-3xl mx-auto px-4 py-6 md:px-6 md:py-8">
      <header className="flex items-center gap-3">
        <Link
          href="/dashboard/casos"
          aria-label="Voltar para Meus Casos"
          className="flex items-center justify-center w-9 h-9 rounded-lg text-white/50 hover:text-white hover:bg-white/08 transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2585F4]"
        >
          <ArrowBackRounded fontSize="small" aria-hidden />
        </Link>
        <h1 className="text-2xl font-bold text-white tracking-tight">
          Relatar Novo Caso
        </h1>
      </header>

      <section aria-labelledby="story-heading">
        <header className="flex items-center justify-between mb-3">
          <h2
            id="story-heading"
            className="text-xs font-semibold tracking-widest uppercase text-white/40"
          >
            Conte sua história
          </h2>
          {isRecording && (
            <span className="flex items-center gap-1.5 text-xs font-medium text-[#2585F4]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#2585F4] animate-pulse" aria-hidden />
              Gravando...
            </span>
          )}
        </header>

        <div className="relative">
          {isRecording ? (
            <VoiceRecorder
              isRecording={isRecording}
              elapsedSeconds={elapsed}
              onStart={handleStartRecording}
              onStop={handleStopRecording}
            />
          ) : (
            <div className="relative">
              <textarea
                id="story"
                value={story}
                onChange={(e) => setStory(e.target.value.slice(0, 2000))}
                onKeyDown={handleKeyDown}
                placeholder="Descreva o que aconteceu com suas próprias palavras..."
                rows={7}
                maxLength={2000}
                aria-labelledby="story-heading"
                aria-describedby="story-hint story-char-count"
                className="w-full px-4 py-3 pr-16 bg-[#0d1526] border border-[#1B2233] rounded-xl text-sm text-white placeholder:text-white/25 resize-none focus:outline-none focus:ring-2 focus:ring-[#2585F4] focus:border-transparent transition-all duration-200"
              />
              <VoiceRecorder
                isRecording={false}
                elapsedSeconds={0}
                onStart={handleStartRecording}
                onStop={handleStopRecording}
              />
            </div>
          )}
        </div>

        {attachedFile && (
          <div className="mt-2 flex items-center gap-2 px-3 py-2 rounded-lg border border-[#1B2233] bg-[#0d1526]">
            {attachedFile.type === 'pdf' ? (
              <PictureAsPdfRounded fontSize="small" className="text-red-400 shrink-0" aria-hidden />
            ) : (
              <ImageRounded fontSize="small" className="text-blue-400 shrink-0" aria-hidden />
            )}
            <span className="text-xs text-white/70 flex-1 truncate">{attachedFile.name}</span>
            {isProcessingFile ? (
              <span className="h-3.5 w-3.5 animate-spin rounded-full border border-[#2585F4] border-t-transparent shrink-0" />
            ) : (
              <button
                type="button"
                onClick={handleRemoveAttachment}
                className="shrink-0 text-white/30 hover:text-white/70 transition-colors"
                aria-label="Remover anexo"
              >
                <CloseRounded fontSize="small" />
              </button>
            )}
          </div>
        )}

        <input
          ref={fileInputRef}
          type="file"
          accept=".pdf,image/*"
          className="hidden"
          onChange={handleFileSelect}
          aria-label="Anexar arquivo"
        />

        <div className="mt-2 flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <p id="story-hint" className="text-xs text-white/25">
              Cifrado ponta a ponta
              <span className="mx-1">•</span>
              <kbd className="px-1.5 py-0.5 bg-white/10 rounded text-[10px] font-mono">Ctrl+Enter</kbd> para enviar
            </p>
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              disabled={isProcessingFile}
              className="flex items-center gap-1 text-xs text-white/35 hover:text-white/60 transition-colors disabled:opacity-40"
              aria-label="Anexar arquivo"
            >
              <AttachFileRounded style={{ fontSize: 14 }} aria-hidden />
              Anexar
            </button>
          </div>
          <p
            id="story-char-count"
            aria-live="polite"
            className={cn(
              "shrink-0 text-xs tabular-nums select-none",
              story.length >= 1800 ? "text-yellow-400" : "text-white/25",
            )}
          >
            {story.length}/2000
          </p>
        </div>
      </section>

      {error && (
        <p className="text-sm text-red-400 text-center">{error}</p>
      )}

      <Button
        variant="primary"
        size="lg"
        fullWidth
        disabled={!canSubmit}
        loading={isLoading}
        onClick={handleSubmit}
        leftIcon={
          isRecording ? (
            <HourglassEmptyRounded fontSize="small" aria-hidden />
          ) : (
            <AutoAwesomeRounded fontSize="small" aria-hidden />
          )
        }
        className={isRecording ? "opacity-60 cursor-not-allowed" : ""}
      >
        {isLoading ? "Iniciando análise..." : isRecording ? "Aguardando relato..." : "Iniciar Análise por IA"}
      </Button>
    </div>
  );
}
