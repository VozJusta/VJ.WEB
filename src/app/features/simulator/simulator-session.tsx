'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/src/components/ui/button';
import PauseIcon from '@mui/icons-material/Pause';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import VideocamIcon from '@mui/icons-material/Videocam';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';

export function SimulatorSession() {
  const router = useRouter();
  const [isRecording, setIsRecording] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [transcription, setTranscription] = useState(
    '"No dia 15 de março, eu recebi uma notificação no meu aplicativo bancário sobre uma transação que eu não reconheci... tentei contato..."'
  );
  const [confidence, setConfidence] = useState(75);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (isRecording && !isPaused) {
      interval = setInterval(() => {
        setElapsedSeconds((prev) => prev + 1);
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRecording, isPaused]);

  const handleStartRecording = () => {
    setIsRecording(true);
    setElapsedSeconds(0);
  };

  const handleStopRecording = () => {
    setIsRecording(false);
    setElapsedSeconds(0);
  };

  const handleTogglePause = () => {
    setIsPaused(!isPaused);
  };

  const handleEndSession = () => {
    router.push('/dashboard/simulador/feedback');
  };

  return (
    <main className="flex min-h-screen flex-col ">
      <section className="flex flex-1 flex-col gap-6 p-6">
        <article className="relative overflow-hidden rounded-2xl bg-linear-to-br from-teal-600 to-teal-800 shadow-2xl">
          <div className="aspect-video w-full">
            <div className="flex h-full items-end justify-center p-6">
              <div className="flex items-center gap-2 rounded-full bg-black/30 px-4 py-2 text-sm text-white backdrop-blur-sm">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-500 opacity-75"></span>
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-red-500"></span>
                </span>
                REC 00:42
              </div>
            </div>
          </div>

          <div className="absolute bottom-6 left-6 rounded-lg bg-blue-600/90 px-4 py-2 backdrop-blur-sm">
            <p className="text-sm font-medium text-white">Juiz IA - Dr. Silva</p>
          </div>
        </article>

        <article className="rounded-xl bg-gray-900 p-6 shadow-lg">
          <h2 className="mb-4 text-center text-lg font-semibold text-white">
            "Pode nos detalhar o momento da cobrança indevida?"
          </h2>

          <div className="rounded-lg border border-gray-700 bg-gray-800 p-4">
            <div className="mb-2 flex items-center gap-2">
              <div className="h-2 w-2 animate-pulse rounded-full bg-blue-500"></div>
              <span className="text-xs font-medium uppercase tracking-wide text-blue-400">
                Transcrevendo fala...
              </span>
            </div>
            <p className="text-sm leading-relaxed text-gray-300">
              {transcription}
            </p>
          </div>

          <div className="mt-6 flex items-center justify-center gap-4">
            <button
              type="button"
              onClick={handleStartRecording}
              className="flex h-14 w-14 items-center justify-center rounded-full bg-[#2585F4] text-white shadow-[0_4px_16px_rgba(37,133,244,0.45)] transition-all hover:bg-[#1978E5] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2585F4]"
              aria-label="Gravar áudio"
            >
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3z"/>
                <path d="M17 11c0 2.76-2.24 5-5 5s-5-2.24-5-5H5c0 3.53 2.61 6.43 6 6.92V21h2v-3.08c3.39-.49 6-3.39 6-6.92h-2z"/>
              </svg>
            </button>

            <button
              type="button"
              onClick={handleTogglePause}
              className="flex h-16 w-16 items-center justify-center rounded-full bg-white text-gray-900 shadow-lg transition-all hover:scale-105 hover:shadow-xl"
              aria-label={isPaused ? 'Retomar' : 'Pausar'}
              aria-pressed={isPaused}
            >
              {isPaused ? (
                <PlayArrowIcon fontSize="large" />
              ) : (
                <PauseIcon fontSize="large" />
              )}
            </button>

            <button
              type="button"
              className="flex h-14 w-14 items-center justify-center rounded-full bg-gray-700 text-gray-300 transition-all hover:bg-gray-600"
              aria-label="Câmera"
            >
              <VideocamIcon />
            </button>
          </div>
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

      <aside
        className="fixed right-4 top-1/2 flex -translate-y-1/2 flex-col items-center gap-2"
        aria-label="Indicador de confiança"
      >
        <div className="h-32 w-3 overflow-hidden rounded-full bg-gray-800">
          <div
            className="w-full bg-linear-to-t from-red-500 via-yellow-500 to-green-500 transition-all duration-500"
            style={{ height: `${confidence}%` }}
            role="progressbar"
            aria-valuenow={confidence}
            aria-valuemin={0}
            aria-valuemax={100}
          ></div>
        </div>
        <span className="text-xs font-medium uppercase tracking-wide text-gray-400">
          Confiança
        </span>
      </aside>
    </main>
  );
}
