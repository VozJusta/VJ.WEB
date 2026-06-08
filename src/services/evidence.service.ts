import { apiFetch } from '@/lib/api-client';

export interface Evidence {
  id: string;
  url: string;
  public_id: string;
  citizen_id: string;
  created_at: string;
}

export const evidenceService = {
  async upload(file: File): Promise<Evidence> {
    const formData = new FormData();
    formData.append('file', file);

    const response = await apiFetch('/citizen/me/evidence', {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      const err = await response.json().catch(() => ({}));
      throw new Error(err.message || 'Erro ao enviar arquivo');
    }

    return response.json();
  },

  async list(): Promise<Evidence[]> {
    const response = await apiFetch('/citizen/me/evidences/citizenId');

    if (!response.ok) {
      const err = await response.json().catch(() => ({}));
      throw new Error(err.message || 'Erro ao listar evidências');
    }

    return response.json();
  },
};
