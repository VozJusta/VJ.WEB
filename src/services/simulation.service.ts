import { apiFetch } from '@/lib/api-client';
import { authStorage } from '@/lib/auth';

export type SimulationPersonality =
  | 'Calm'
  | 'Agressive'
  | 'Impartial'
  | 'Empathetic'
  | 'Pragmatic'
  | 'Researcher';

export interface SimulationResponse {
  id: string;
  citizen_id: string;
  personality: SimulationPersonality;
  report_id: string;
  status: string;
}

export const simulationService = {
  async start(personality: SimulationPersonality): Promise<SimulationResponse> {
    const response = await apiFetch('/simulation', {
      method: 'POST',
      body: JSON.stringify({ personality }),
    });
    if (!response.ok) {
      const err = await response.json().catch(() => ({}));
      throw new Error(
        Array.isArray(err.message) ? err.message[0] : err.message || 'Erro ao iniciar simulação',
      );
    }
    return response.json();
  },

  async chat(simulationId: string, text: string): Promise<{ text: string }> {
    const response = await apiFetch('/simulation/chat', {
      method: 'POST',
      body: JSON.stringify({ simulationId, text }),
    });
    if (!response.ok) {
      const err = await response.json().catch(() => ({}));
      throw new Error(err.message || 'Erro ao enviar mensagem');
    }
    return response.json();
  },

  async synthesize(text: string): Promise<Blob> {
    const response = await apiFetch('/simulation/synthesize', {
      method: 'POST',
      body: JSON.stringify({ text }),
    });
    if (!response.ok) throw new Error('Erro ao sintetizar áudio');
    return response.blob();
  },

  async downloadPdf(simulationId: string): Promise<Blob> {
    const response = await apiFetch(`/simulation/pdf/${simulationId}`, {
      headers: { Accept: 'application/pdf' },
    });
    if (!response.ok) throw new Error('Erro ao baixar PDF');
    return response.blob();
  },

  getSocketToken(): string | null {
    return authStorage.getAccessToken();
  },
};
