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
  // Prevents re-emitting simulation:start on WebSocket reconnections
  const simulationStartedRef = useRef(false);
  // Holds end status while waiting for simulation:report before navigating
  const pendingEndStatusRef = useRef<SimulationStatus | null>(null);
  // Tracks current reportId in a ref to avoid stale closure in socket handlers
  const reportIdRef = useRef<string | null>(null);
  // Timeout ref for WebSocket start acknowledgement
  const wsStartTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    reportIdRef.current = reportId;
  }, [reportId]);

  useEffect(() => {
    if (remainingSecs === null || remainingSecs <= 0) return;
    const id = setInterval(() => setRemainingSecs((p) => (p !== null ? p - 1 : null)), 1000);
    return () => clearInterval(id);
  }, [remainingSecs]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (status === 'Completed' || status === 'TimedOut') setRemainingSecs(null);
  }, [status]);

  // Apply end status as soon as reportId arrives
  useEffect(() => {
    if (pendingEndStatusRef.current && reportId) {
      setStatus(pendingEndStatusRef.current);
      pendingEndStatusRef.current = null;
    }
  }, [reportId]);

  const disconnectSocket = useCallback(() => {
    if (wsStartTimeoutRef.current) {
      clearTimeout(wsStartTimeoutRef.current);
      wsStartTimeoutRef.current = null;
    }
    socketRef.current?.disconnect();
    socketRef.current = null;
  }, []);

  useEffect(() => () => disconnectSocket(), [disconnectSocket]);

  const synthesizeAndPlay = useCallback(async (text: string) => {
    setIsSpeaking(true);
    try {
      const blob = await simulationService.synthesize(text);

      // Guard: ensure we actually got audio binary data
      if (!blob.type.startsWith('audio') && !blob.type.includes('octet-stream')) {
        // Likely got a JSON error body — skip playback silently
        setIsSpeaking(false);
        return;
      }

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
      audio.play().catch(() => { setIsSpeaking(false); });
    } catch {
      setIsSpeaking(false);
    }
  }, []);

  const start = useCallback(async (personality: SimulationPersonality) => {
    setIsLoading(true);
    setError(null);
    simulationStartedRef.current = false;
    pendingEndStatusRef.current = null;

    try {
      // Check for existing simulation to prevent page reload creating a new one
      const savedSimId = typeof window !== 'undefined' ? sessionStorage.getItem('vj_sim_id') : null;

      let simId: string;
      if (savedSimId) {
        simId = savedSimId;
        setSimulationId(simId);
      } else {
        const sim = await simulationService.start(personality);
        simId = sim.id;
        setSimulationId(simId);
        if (typeof window !== 'undefined') sessionStorage.setItem('vj_sim_id', simId);
      }

      const token = authStorage.getAccessToken();
      const apiUrl = process.env.NEXT_PUBLIC_API_URL!;

      // Step 2: connect WebSocket — token goes in auth.token without Bearer prefix
      const socket = io(`${apiUrl}/simulation`, {
        transports: ['websocket'],
        reconnection: true,
        reconnectionAttempts: 3,
        auth: { token: token ?? '' },
      });

      socketRef.current = socket;

      socket.on('connect', () => {
        // Guard: only emit simulation:start on first connect, not on reconnections
        if (!simulationStartedRef.current) {
          simulationStartedRef.current = true;
          socket.emit('simulation:start', { simulationId: simId });

          // 10-second timeout: if simulation:started never arrives, show error
          wsStartTimeoutRef.current = setTimeout(() => {
            if (socketRef.current === socket) {
              setError('A sessão demorou para iniciar. Verifique sua conexão e tente novamente.');
              setIsLoading(false);
            }
          }, 10_000);
        }
      });

      socket.on('simulation:started', () => {
        if (wsStartTimeoutRef.current) {
          clearTimeout(wsStartTimeoutRef.current);
          wsStartTimeoutRef.current = null;
        }
        setIsLoading(false);
        setStatus('InProgress');
      });

      socket.on('simulation:warning', (payload: WarningPayload) => {
        setWarning(payload);
        setRemainingSecs(payload.remainingSecs);
      });

      socket.on('simulation:end', (payload: { simulationId: string; status: string }) => {
        if (typeof window !== 'undefined') sessionStorage.removeItem('vj_sim_id');

        const endStatus: SimulationStatus =
          payload.status === 'Completed' ? 'Completed' : 'TimedOut';

        // Use ref to check reportId without stale closure
        if (reportIdRef.current) {
          setStatus(endStatus);
        } else {
          pendingEndStatusRef.current = endStatus;
          setTimeout(() => {
            if (pendingEndStatusRef.current) {
              setStatus(pendingEndStatusRef.current);
              pendingEndStatusRef.current = null;
            }
          }, 3000);
        }
      });

      socket.on('simulation:report', (payload: { simulationId: string; reportId: string }) => {
        reportIdRef.current = payload.reportId;
        setReportId(payload.reportId);
      });

      socket.on('simulation:resumed', (payload: { simulationId: string }) => {
        setSimulationId(payload.simulationId);
        setStatus('InProgress');
        setIsLoading(false);
      });

      socket.on('connect_error', (err: Error) => {
        const msg = err?.message?.toLowerCase() ?? '';
        if (msg.includes('unauthorized') || msg.includes('jwt') || msg.includes('token')) {
          setError('Sessão expirada. Por favor, faça login novamente.');
        } else {
          setError('Erro de conexão com o servidor de simulação. Tente novamente.');
        }
        setIsLoading(false);
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao iniciar simulação');
      setIsLoading(false);
    }
  }, []);

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
        const msg = err instanceof Error ? err.message : 'Erro ao enviar mensagem';
        setError(msg);
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
  }, [simulationId]);

  const reset = useCallback(() => {
    if (typeof window !== 'undefined') sessionStorage.removeItem('vj_sim_id');
    disconnectSocket();
    simulationStartedRef.current = false;
    pendingEndStatusRef.current = null;
    reportIdRef.current = null;
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
