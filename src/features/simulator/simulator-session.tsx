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
import { useTranslation } from 'react-i18next';

const PERSONALITY_MAP: Record<string, SimulationPersonality> = {
  calm: 'Calm',
  aggressive: 'Agressive',
  impartial: 'Impartial',
  empathetic: 'Empathetic',
  pragmatic: 'Pragmatic',
  researcher: 'Researcher',
};

export function SimulatorSession() {
  const { t } = useTranslation();
  const router = useRouter();
  const searchParams = useSearchParams();
  const personalityParam = searchParams.get('personality') ?? 'impartial';
  const judgeName = searchParams.get('judgeName') ?? 'Juiz IA';

  const {
    status,
    aiResponse,
    isLoading,
    isSpeaking,
    isAudioPaused,
    error,
    warning,
    remainingSecs,
    reportId,
    start,
    sendChat,
    stop,
    reset,
    pauseAudio,
    resumeAudio,
  } = useSimulation();

  const [isRecording, setIsRecording] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [transcription, setTranscription] = useState('');
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [isTranscribing, setIsTranscribing] = useState(false);
  const [transcriptionError, setTranscriptionError] = useState<string | null>(null);
  // Tracks manual termination so audio is blocked even before WebSocket confirms
  const [isManuallyEnded, setIsManuallyEnded] = useState(false);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  // Ref so recorder.onstop always reads the latest session state
  const isSessionEndedRef = useRef(false);

  const isSessionEnded = status === 'Completed' || status === 'TimedOut' || isManuallyEnded;

  // Keep ref in sync with derived state
  useEffect(() => {
    isSessionEndedRef.current = isSessionEnded;
  }, [isSessionEnded]);

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
      reset();
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const hasNavigatedRef = useRef(false);

  const buildFeedbackPath = (rId: string | null) => {
    const params = new URLSearchParams();
    if (rId) params.set('reportId', rId);
    params.set('judgeName', judgeName);
    params.set('personality', personalityParam);
    params.set('date', new Date().toISOString().slice(0, 10));
    return `/dashboard/simulador/feedback?${params.toString()}`;
  };

  useEffect(() => {
    if ((status === 'Completed' || status === 'TimedOut') && !hasNavigatedRef.current) {
      hasNavigatedRef.current = true;
      router.push(buildFeedbackPath(reportId));
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
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
    if (isSessionEndedRef.current) return;
    setTranscriptionError(null);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream);
      chunksRef.current = [];

      recorder.ondataavailable = (e) => {
        if (e.data.size > 0) chunksRef.current.push(e.data);
      };

      recorder.onstop = async () => {
        stream.getTracks().forEach((trk) => trk.stop());
        const blob = new Blob(chunksRef.current, { type: 'audio/webm' });
        const url = URL.createObjectURL(blob);

        setIsTranscribing(true);
        setTranscriptionError(null);
        try {
          const text = await chatService.transcribeAudio(url);
          setTranscription(text);
          if (text.trim() && !isSessionEndedRef.current) {
            await sendChat(text);
          }
        } catch {
          setTranscriptionError('Não foi possível transcrever o áudio. Tente gravar novamente.');
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
      setTranscriptionError('Acesso ao microfone negado. Verifique as permissões do navegador.');
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
    setIsManuallyEnded(true);
    if (isRecording) {
      mediaRecorderRef.current?.stop();
      setIsRecording(false);
      setIsPaused(false);
    }
    stop();
    setTimeout(() => {
      if (!hasNavigatedRef.current) {
        hasNavigatedRef.current = true;
        router.push(buildFeedbackPath(reportId));
      }
    }, 4000);
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
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 rounded-xl bg-red-500/20 border border-red-500 px-6 py-3 text-sm text-red-300 max-w-sm text-center">
          {error}
        </div>
      )}

      <section className="flex flex-1 flex-col gap-4 p-4 md:p-6">
        {/* Judge video area */}
        <article className="relative overflow-hidden rounded-2xl bg-linear-to-br from-teal-600 to-teal-800 shadow-2xl max-h-80">
          <div className="aspect-video w-full max-h-80 overflow-hidden">
            <div className="flex h-full items-end justify-center p-4">
              {isLoading && (
                <div className="flex items-center gap-2 rounded-full bg-black/40 px-4 py-2 text-sm text-white">
                  <span className="h-2 w-2 animate-pulse rounded-full bg-blue-400" />
                  {t("simulator.session.processing")}
                </div>
              )}
              {(isSpeaking || isAudioPaused) && (
                <div className="flex items-center gap-2 rounded-full bg-black/40 px-4 py-2 text-sm text-white">
                  {isAudioPaused ? (
                    <>
                      <PauseIcon sx={{ fontSize: 14 }} />
                      <span>{t("simulator.session.audioPaused")}</span>
                    </>
                  ) : (
                    <>
                      <span className="relative flex h-2 w-2">
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
                        <span className="relative inline-flex h-2 w-2 rounded-full bg-green-400" />
                      </span>
                      <span>{t("simulator.session.judgeSpeaking")}</span>
                    </>
                  )}
                  <button
                    type="button"
                    onClick={isAudioPaused ? resumeAudio : pauseAudio}
                    className="ml-1 flex items-center justify-center w-7 h-7 rounded-full bg-white/20 hover:bg-white/30 transition-colors"
                    aria-label={isAudioPaused ? t("simulator.session.resumeAudio") : t("simulator.session.pauseAudio")}
                  >
                    {isAudioPaused
                      ? <PlayArrowIcon sx={{ fontSize: 16 }} />
                      : <PauseIcon sx={{ fontSize: 16 }} />
                    }
                  </button>
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
                  {t("simulator.session.paused")}
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
          {(aiResponse || isLoading) && (
            <div className="rounded-lg border border-gray-700 bg-gray-800 p-3 mb-3">
              <div className="mb-1.5 flex items-center gap-2">
                <div className={`h-2 w-2 rounded-full ${isLoading ? 'animate-pulse bg-teal-500' : 'bg-teal-400'}`} />
                <span className="text-xs font-medium uppercase tracking-wide text-teal-400">
                  {isLoading ? t("simulator.session.processing") : judgeName}
                </span>
              </div>
              {aiResponse && (
                <p className="text-sm leading-relaxed text-gray-300">{aiResponse}</p>
              )}
            </div>
          )}

          {(transcription || isTranscribing) && (
            <div className="rounded-lg border border-gray-700 bg-gray-800 p-3 mb-3">
              <div className="mb-1.5 flex items-center gap-2">
                <div className={`h-2 w-2 rounded-full ${isTranscribing ? 'animate-pulse bg-blue-500' : 'bg-green-500'}`} />
                <span className="text-xs font-medium uppercase tracking-wide text-blue-400">
                  {isTranscribing ? t("simulator.session.transcribing") : t("simulator.session.yourSpeech")}
                </span>
              </div>
              {transcription && (
                <p className="text-sm leading-relaxed text-gray-300">{transcription}</p>
              )}
            </div>
          )}

          {transcriptionError && (
            <div className="rounded-lg border border-red-700/50 bg-red-900/20 p-3 mb-3">
              <p className="text-sm text-red-400">{transcriptionError}</p>
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
                aria-label={isPaused ? t("simulator.session.resumeRecording") : t("simulator.session.pauseRecording")}
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
              aria-label={isRecording ? t("simulator.session.stopRecording") : t("simulator.session.startRecording")}
            >
              {isRecording ? <StopIcon /> : <MicIcon />}
            </button>
          </div>

          {isSessionEnded && (
            <p className="mt-3 text-center text-xs text-white/50">{t("simulator.session.sessionEnded")}</p>
          )}
        </article>

        <div className="flex justify-center">
          <Button
            variant="primary"
            size="lg"
            onClick={handleEndSession}
            rightIcon={<ExitToAppIcon />}
          >
            {t("simulator.session.endSession")}
          </Button>
        </div>
      </section>
    </main>
  );
}
