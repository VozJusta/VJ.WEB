import { API } from '@/lib/api';
import type {
  CitizenSignupRequest,
  CitizenSignupResponse,
  LawyerSignupRequest,
  LawyerSignupResponse,
  SendEmailVerificationResponse,
  ValidateEmailVerificationRequest,
  ValidateEmailVerificationResponse,
} from '@/types/auth.types';

export class AuthServiceError extends Error {
  constructor(
    message: string,
    public statusCode?: number,
    public originalError?: unknown,
  ) {
    super(message);
    this.name = 'AuthServiceError';
  }
}

async function parseResponseBody(response: Response): Promise<unknown> {
  const contentType = response.headers.get('content-type') || '';

  if (contentType.includes('application/json')) {
    try {
      return await response.json();
    } catch {
      return null;
    }
  }

  const text = await response.text();

  if (!text) {
    return null;
  }

  try {
    return JSON.parse(text);
  } catch {
    return text;
  }
}

function getResponseMessage(payload: unknown, fallback: string): string {
  if (typeof payload === 'string' && payload.trim().length > 0) {
    return payload;
  }

  if (payload && typeof payload === 'object') {
    const data = payload as Record<string, unknown>;
    const message = data.message;
    const error = data.error;

    if (typeof message === 'string' && message.trim().length > 0) {
      return message;
    }

    if (typeof error === 'string' && error.trim().length > 0) {
      return error;
    }
  }

  return fallback;
}

async function handleAPIError(error: unknown): Promise<never> {
  if (error instanceof Response) {
    const statusCode = error.status;

    let errorMessage = 'Erro ao processar solicitação';

    try {
      const errorData = await parseResponseBody(error);
      errorMessage = getResponseMessage(errorData, errorMessage);
    } catch {
      errorMessage = error.statusText || errorMessage;
    }

    switch (statusCode) {
      case 400:
        throw new AuthServiceError('Dados inválidos. Verifique as informações fornecidas.', statusCode, error);
      case 409:
        throw new AuthServiceError(errorMessage, statusCode, error);
      case 422:
        throw new AuthServiceError('Dados inválidos. Verifique as informações fornecidas.', statusCode, error);
      case 500:
        throw new AuthServiceError('Erro no servidor. Tente novamente mais tarde.', statusCode, error);
      default:
        throw new AuthServiceError(errorMessage, statusCode, error);
    }
  }

  if (error instanceof Error) {
    throw new AuthServiceError(error.message, undefined, error);
  }

  throw new AuthServiceError('Erro desconhecido ao processar solicitação', undefined, error);
}

export const authService = {
  async signupCitizen(data: CitizenSignupRequest): Promise<CitizenSignupResponse> {
    try {
      const response = await fetch(`${API.BASE_URL}${API.ENDPOINTS.SIGNUP.CITIZEN}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        await handleAPIError(response);
      }

      const payload = await parseResponseBody(response);

      if (!payload || typeof payload !== 'object') {
        throw new AuthServiceError('Resposta inválida do servidor ao criar conta.');
      }

      return payload as CitizenSignupResponse;
    } catch (error) {
      if (error instanceof AuthServiceError) {
        throw error;
      }
      return handleAPIError(error);
    }
  },

  async signupLawyer(data: LawyerSignupRequest): Promise<LawyerSignupResponse> {
    try {
      const response = await fetch(`${API.BASE_URL}${API.ENDPOINTS.SIGNUP.LAWYER}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        await handleAPIError(response);
      }

      const payload = await parseResponseBody(response);

      if (!payload || typeof payload !== 'object') {
        throw new AuthServiceError('Resposta inválida do servidor ao criar conta profissional.');
      }

      return payload as LawyerSignupResponse;
    } catch (error) {
      if (error instanceof AuthServiceError) {
        throw error;
      }
      return handleAPIError(error);
    }
  },

  async sendEmailVerificationCode(email: string): Promise<SendEmailVerificationResponse> {
    try {
      const response = await fetch(`${API.BASE_URL}${API.ENDPOINTS.SIGNUP.EMAIL_SEND}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        await handleAPIError(response);
      }

      const data = await parseResponseBody(response);
      const mappedData = data && typeof data === 'object' ? (data as Record<string, unknown>) : null;

      const securityToken =
        response.headers.get('x-security-token') ||
        response.headers.get('X-Security-Token') ||
        (typeof mappedData?.securityToken === 'string' ? mappedData.securityToken : '') ||
        (typeof mappedData?.xSecurityToken === 'string' ? mappedData.xSecurityToken : '') ||
        (typeof mappedData?.token === 'string' ? mappedData.token : '') ||
        '';

      return {
        message: getResponseMessage(data, 'Código enviado para o e-mail informado.'),
        securityToken,
      };
    } catch (error) {
      if (error instanceof AuthServiceError) {
        throw error;
      }
      return handleAPIError(error);
    }
  },

  async validateEmailVerificationCode(
    payload: ValidateEmailVerificationRequest,
    securityToken: string,
  ): Promise<ValidateEmailVerificationResponse> {
    try {
      const response = await fetch(`${API.BASE_URL}${API.ENDPOINTS.SIGNUP.EMAIL_VALIDATE}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-security-token': securityToken,
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        await handleAPIError(response);
      }

      const parsedPayload = await parseResponseBody(response);

      if (!parsedPayload || typeof parsedPayload !== 'object') {
        throw new AuthServiceError('Resposta inválida do servidor na validação do código.');
      }

      const data = parsedPayload as Record<string, unknown>;

      if (typeof data.access_token !== 'string' || typeof data.refresh_token !== 'string') {
        throw new AuthServiceError('Resposta inválida do servidor na validação do código.');
      }

      return {
        access_token: data.access_token,
        refresh_token: data.refresh_token,
      };
    } catch (error) {
      if (error instanceof AuthServiceError) {
        throw error;
      }
      return handleAPIError(error);
    }
  },
};
