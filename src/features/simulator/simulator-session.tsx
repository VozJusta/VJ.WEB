'use client';

import { useEffect, useRef, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import PauseIcon from '@mui/icons-material/Pause';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import MicIcon from '@mui/icons-material/Mic';
import StopIcon from '@mui/icons-material/Stop';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { useSimulation } from '@/hooks/useSimulation';
import type { SimulationPersonality } from '@/services/simulation.service';
import { chatService } from '@/services/chat.service';

const PERSONALITY_MAP: Record<string, SimulationPersonality> = {
  calm: 'Calm',
  aggressive: 'Agressive',
  impartial: 'Impartial',
  empathetic: 'Empathetic',
  pragmatic: 'Pragmatic',
  researcher: 'Researcher',
};

export function SimulatorSession() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const personalityParam = searchParams.get('personality') ?? 'impartial';
  const judgeName = searchParams.get('judgeName') ?? 'Juiz IA';

  const {
    status,
    aiResponse,
    isLoading,
    isSpeaking,
    error,
    warning,
    remainingSecs,
    reportId,
    start,
    sendChat,
    stop,
    reset,
  } = useSimulation();

  const [isRecording, setIsRecording] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [transcription, setTranscription] = useState('');
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [isTranscribing, setIsTranscribing] = useState(false);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const isSessionEnded = status === 'Completed' || status === 'TimedOut';

  // Stop active recording when session ends
  useEffect(() => {
    if (isSessionEnded && isRecording) {
      mediaRecorderRef.current?.stop();
      setIsRecording(false);
      setIsPaused(false);
    }
  }, [isSessionEnded, isRecording]);

  useEffect(() => {
    const personality = PERSONALITY_MAP[personalityParam] ?? 'Impartial';
    start(personality);
    return () => {
      // Disconnect WebSocket and clean up on unmount / navigation
      reset();
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (status === 'Completed' || status === 'TimedOut') {
      const path = reportId
        ? `/dashboard/simulador/feedback?reportId=${reportId}`
        : '/dashboard/simulador/feedback';
      router.push(path);
    }
  }, [status, reportId, router]);

  useEffect(() => {
    if (isRecording && !isPaused) {
      timerRef.current = setInterval(() => setElapsedSeconds((p) => p + 1), 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isRecording, isPaused]);

  const formatTime = (s: number) =>
    `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`;

  const handleStartRecording = async () => {
    if (isSessionEnded) return;
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
          setTranscription(text);
          if (text.trim() && !isSessionEnded) await sendChat(text);
        } catch {
          // transcription failure — user can retry
        } finally {
          URL.revokeObjectURL(url);
          setIsTranscribing(false);
        }
      };

      mediaRecorderRef.current = recorder;
      recorder.start();
      setIsRecording(true);
      setElapsedSeconds(0);
    } catch {
      // microphone access denied or unavailable
    }
  };

  const handleStopRecording = () => {
    mediaRecorderRef.current?.stop();
    setIsRecording(false);
    setIsPaused(false);
  };

  const handleTogglePause = () => {
    const recorder = mediaRecorderRef.current;
    if (!recorder) return;
    if (isPaused) {
      recorder.resume();
      setIsPaused(false);
    } else {
      recorder.pause();
      setIsPaused(true);
    }
  };

  const handleEndSession = () => {
    if (isRecording) {
      mediaRecorderRef.current?.stop();
      setIsRecording(false);
    }
    stop();
    router.push('/dashboard/simulador/feedback');
  };

  const canRecord = !isLoading && !isSpeaking && !isTranscribing && !isSessionEnded;

  return (
    <main className="flex min-h-screen flex-col">
      {warning && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 rounded-xl bg-yellow-500/20 border border-yellow-500 px-6 py-3 text-center text-sm text-yellow-300">
          {warning.message}
          {remainingSecs !== null && remainingSecs > 0 && (
            <span className="ml-2 font-bold">{remainingSecs}s</span>
          )}
        </div>
      )}

      {error && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 rounded-xl bg-red-500/20 border border-red-500 px-6 py-3 text-sm text-red-300">
          {error}
        </div>
      )}

      <section className="flex flex-1 flex-col gap-4 p-4 md:p-6">
        {/* Judge video area */}
        <article className="relative overflow-hidden rounded-2xl bg-linear-to-br from-teal-600 to-teal-800 shadow-2xl max-h-64">
          <div className="aspect-video w-full max-h-64 overflow-hidden">
            <div className="flex h-full items-end justify-center p-4">
              {isLoading && (
                <div className="flex items-center gap-2 rounded-full bg-black/40 px-4 py-2 text-sm text-white">
                  <span className="h-2 w-2 animate-pulse rounded-full bg-blue-400" />
                  Processando...
                </div>
              )}
              {isSpeaking && (
                <div className="flex items-center gap-2 rounded-full bg-black/40 px-4 py-2 text-sm text-white">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-green-400" />
                  </span>
                  Juiz falando...
                </div>
              )}
              {isRecording && !isPaused && (
                <div className="flex items-center gap-2 rounded-full bg-black/30 px-4 py-2 text-sm text-white backdrop-blur-sm">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-500 opacity-75" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-red-500" />
                  </span>
                  REC {formatTime(elapsedSeconds)}
                </div>
              )}
              {isPaused && (
                <div className="flex items-center gap-2 rounded-full bg-black/30 px-4 py-2 text-sm text-white backdrop-blur-sm">
                  <PauseIcon sx={{ fontSize: 14 }} />
                  Pausado
                </div>
              )}
            </div>
          </div>

          <div className="absolute bottom-4 left-4 rounded-lg bg-blue-600/90 px-4 py-2 backdrop-blur-sm">
            <p className="text-sm font-medium text-white">{judgeName}</p>
          </div>
        </article>

        {/* Response area */}
        <article className="rounded-xl bg-gray-900 p-5 shadow-lg">
          {aiResponse && (
            <h2 className="mb-3 text-center text-base font-semibold text-white leading-relaxed">
              &ldquo;{aiResponse}&rdquo;
            </h2>
          )}

          {(transcription || isTranscribing) && (
            <div className="rounded-lg border border-gray-700 bg-gray-800 p-3 mb-3">
              <div className="mb-1.5 flex items-center gap-2">
                <div className={`h-2 w-2 rounded-full ${isTranscribing ? 'animate-pulse bg-blue-500' : 'bg-green-500'}`} />
                <span className="text-xs font-medium uppercase tracking-wide text-blue-400">
                  {isTranscribing ? 'Transcrevendo...' : 'Sua fala'}
                </span>
              </div>
              {transcription && (
                <p className="text-sm leading-relaxed text-gray-300">{transcription}</p>
              )}
            </div>
          )}

          {/* Controls */}
          <div className="mt-4 flex items-center justify-center gap-4">
            {/* Pause button — shown while recording, BEFORE the mic button */}
            {isRecording && (
              <button
                type="button"
                onClick={handleTogglePause}
                className="flex h-14 w-14 items-center justify-center rounded-full bg-white text-gray-900 shadow-lg transition-all hover:scale-105 cursor-pointer"
                aria-label={isPaused ? 'Retomar gravação' : 'Pausar gravação'}
              >
                {isPaused ? <PlayArrowIcon fontSize="large" /> : <PauseIcon fontSize="large" />}
              </button>
            )}

            {/* Mic / Stop button */}
            <button
              type="button"
              onClick={isRecording ? handleStopRecording : handleStartRecording}
              disabled={!canRecord && !isRecording}
              className="flex h-14 w-14 items-center justify-center rounded-full bg-[#2585F4] text-white shadow-[0_4px_16px_rgba(37,133,244,0.45)] transition-all hover:bg-[#1978E5] disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
              aria-label={isRecording ? 'Parar gravação' : 'Gravar áudio'}
            >
              {isRecording ? <StopIcon /> : <MicIcon />}
            </button>
          </div>

          {isSessionEnded && (
            <p className="mt-3 text-center text-xs text-white/50">Audiência encerrada — envio de áudio desativado</p>
          )}
        </article>

        <div className="flex justify-center">
          <Button
            variant="primary"
            size="lg"
            onClick={handleEndSession}
            rightIcon={<ExitToAppIcon />}
          >
            Encerrar e Ver Feedback
          </Button>
        </div>
      </section>
    </main>
  );
}
