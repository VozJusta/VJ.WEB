'use client';

import { useState, useCallback, useEffect, useRef } from 'react';
import { io, Socket } from 'socket.io-client';
import { simulationService, SimulationPersonality } from '@/services/simulation.service';
import { authStorage } from '@/lib/auth';

type SimulationStatus = 'Waiting' | 'InProgress' | 'Completed' | 'TimedOut';

interface WarningPayload {
  message: string;
  remainingSecs: number;
}

export function useSimulation() {
  const [simulationId, setSimulationId] = useState<string | null>(null);
  const [status, setStatus] = useState<SimulationStatus>('Waiting');
  const [aiResponse, setAiResponse] = useState<string | null>(null);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isAudioPaused, setIsAudioPaused] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [warning, setWarning] = useState<WarningPayload | null>(null);
  const [remainingSecs, setRemainingSecs] = useState<number | null>(null);
  const [reportId, setReportId] = useState<string | null>(null);

  const socketRef = useRef<Socket | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  // Track pending end event until reportId arrives
  const pendingEndStatusRef = useRef<SimulationStatus | null>(null);

  useEffect(() => {
    if (remainingSecs === null || remainingSecs <= 0) return;
    const id = setInterval(() => setRemainingSecs((p) => (p !== null ? p - 1 : null)), 1000);
    return () => clearInterval(id);
  }, [remainingSecs]);

  useEffect(() => {
    if (status === 'Completed' || status === 'TimedOut') setRemainingSecs(null);
  }, [status]);

  // Resolve race: apply end status once reportId is received
  useEffect(() => {
    if (pendingEndStatusRef.current && reportId) {
      setStatus(pendingEndStatusRef.current);
      pendingEndStatusRef.current = null;
    }
  }, [reportId]);

  const disconnectSocket = useCallback(() => {
    socketRef.current?.disconnect();
    socketRef.current = null;
  }, []);

  useEffect(() => () => disconnectSocket(), [disconnectSocket]);

  const synthesizeAndPlay = useCallback(async (text: string) => {
    setIsSpeaking(true);
    try {
      const blob = await simulationService.synthesize(text);
      const url = URL.createObjectURL(blob);

      if (audioRef.current) {
        audioRef.current.pause();
        if (audioRef.current.src) URL.revokeObjectURL(audioRef.current.src);
      }

      const audio = new Audio(url);
      audioRef.current = audio;
      setAudioUrl(url);
      setIsAudioPaused(false);

      audio.onended = () => { setIsSpeaking(false); setIsAudioPaused(false); };
      audio.onerror = () => { setIsSpeaking(false); setIsAudioPaused(false); };
      audio.play();
    } catch {
      setIsSpeaking(false);
    }
  }, []);

  const start = useCallback(
    async (personality: SimulationPersonality) => {
      setIsLoading(true);
      setError(null);
      pendingEndStatusRef.current = null;

      try {
        const sim = await simulationService.start(personality);
        setSimulationId(sim.id);
        setStatus('InProgress');

        const token = authStorage.getAccessToken();
        const apiUrl = process.env.NEXT_PUBLIC_API_URL!;

        const socket = io(`${apiUrl}/simulation`, {
          transports: ['websocket'],
          auth: { token: token ? `Bearer ${token}` : null },
        });

        socketRef.current = socket;

        socket.on('connect', () => {
          socket.emit('simulation:start', {
            simulationId: sim.id,
            citizenId: null,
          });
        });

        socket.on('simulation:started', () => {
          setIsLoading(false);
          setStatus('InProgress');
        });

        socket.on('simulation:warning', (payload: WarningPayload) => {
          setWarning(payload);
          setRemainingSecs(payload.remainingSecs);
        });

        socket.on('simulation:end', (payload: { status: SimulationStatus }) => {
          disconnectSocket();
          // Defer applying the end status until reportId is available
          pendingEndStatusRef.current = payload.status;
          // Give 2s for the report event to arrive; if not, apply status anyway
          setTimeout(() => {
            if (pendingEndStatusRef.current) {
              setStatus(pendingEndStatusRef.current);
              pendingEndStatusRef.current = null;
            }
          }, 2000);
        });

        socket.on('simulation:report', (payload: { reportId: string }) => {
          setReportId(payload.reportId);
        });

        socket.on('connect_error', () => {
          setError('Erro de conexão com o servidor de simulação');
          disconnectSocket();
          setIsLoading(false);
        });
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erro ao iniciar simulação');
        setIsLoading(false);
      }
    },
    [disconnectSocket],
  );

  const sendChat = useCallback(
    async (text: string) => {
      if (!simulationId) return;
      setIsLoading(true);
      setError(null);

      try {
        const data = await simulationService.chat(simulationId, text);
        setAiResponse(data.text);
        await synthesizeAndPlay(data.text);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erro ao enviar mensagem');
      } finally {
        setIsLoading(false);
      }
    },
    [simulationId, synthesizeAndPlay],
  );

  const pauseAudio = useCallback(() => {
    if (audioRef.current && !audioRef.current.paused) {
      audioRef.current.pause();
      setIsAudioPaused(true);
      setIsSpeaking(false);
    }
  }, []);

  const resumeAudio = useCallback(() => {
    if (audioRef.current && audioRef.current.paused && audioRef.current.src) {
      audioRef.current.play().catch(() => {});
      setIsAudioPaused(false);
      setIsSpeaking(true);
    }
  }, []);

  const stop = useCallback(() => {
    if (socketRef.current && simulationId) {
      socketRef.current.emit('simulation:stop', { simulationId });
    }
    disconnectSocket();
    setStatus('Waiting');
  }, [simulationId, disconnectSocket]);

  const reset = useCallback(() => {
    disconnectSocket();
    pendingEndStatusRef.current = null;
    if (audioRef.current) {
      audioRef.current.pause();
      if (audioRef.current.src) URL.revokeObjectURL(audioRef.current.src);
      audioRef.current = null;
    }
    if (audioUrl) URL.revokeObjectURL(audioUrl);
    setSimulationId(null);
    setStatus('Waiting');
    setAiResponse(null);
    setAudioUrl(null);
    setError(null);
    setWarning(null);
    setRemainingSecs(null);
    setReportId(null);
    setIsSpeaking(false);
    setIsAudioPaused(false);
  }, [audioUrl, disconnectSocket]);

  return {
    simulationId,
    status,
    aiResponse,
    audioUrl,
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
  };
}
