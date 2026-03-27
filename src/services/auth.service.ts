import { API } from '@/lib/api';
import { authStorage } from '@/lib/auth';
import type {
  CredentialsLoginRequest,
  AuthResponse,
  AuthenticateResponse,
  CitizenSignupRequest,
  CitizenSignupResponse,
  LawyerSignupRequest,
  LawyerSignupResponse,
  SendEmailVerificationResponse,
  ValidateEmailVerificationRequest,
  ValidateEmailVerificationResponse,
  SendForgotPasswordEmailRequest,
  SendForgotPasswordEmailResponse,
  VerifyForgotPasswordCodeRequest,
  VerifyForgotPasswordCodeResponse,
  ForgotPasswordResetRequest,
  ForgotPasswordResetResponse,
  UserRole,
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
    const trimmed = payload.trim();

    // Some endpoints may reply with HTML (misconfigured content-type).
    // Avoid bubbling raw markup to the UI.
    if (trimmed.startsWith('<') && trimmed.includes('>')) {
      return fallback;
    }

    return trimmed;
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

function extractSecurityToken(response: Response, payload: unknown): string {
  const rawHeader = response.headers.get('x-security-token') || response.headers.get('X-Security-Token') || '';
  const fallbackToken =
    payload && typeof payload === 'object'
      ? (((payload as Record<string, unknown>).securityToken as string) || '')
      : '';

  return (rawHeader || fallbackToken).trim();
}

function persistSecurityToken(token: string): void {
  if (!token) return;
  authStorage.setSecurityToken(token);
}

function normalizeUserRole(role: unknown): UserRole {
  if (typeof role !== 'string') {
    throw new AuthServiceError('Perfil de usuário inválido retornado pelo servidor.');
  }

  const firstRole = role.split('|')[0].trim().toLowerCase();

  if (firstRole === 'citizen' || firstRole === 'lawyer') {
    return firstRole;
  }

  throw new AuthServiceError('Perfil de usuário inválido retornado pelo servidor.');
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
      case 401:
        throw new AuthServiceError(errorMessage, statusCode, error);
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
  async authenticate(data: CredentialsLoginRequest): Promise<AuthenticateResponse & { securityToken: string }> {
    try {
      const response = await fetch(`${API.BASE_URL}${API.ENDPOINTS.AUTH.AUTHENTICATE}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        if (response.status === 401) {
          throw new AuthServiceError('Acesso não autorizado. Verifique seu e-mail e senha.', 401, response);
        }
        await handleAPIError(response);
      }

      const payload = await parseResponseBody(response);

      if (!payload || typeof payload !== 'object') {
        throw new AuthServiceError('Resposta inválida do servidor ao autenticar.');
      }

      const raw = payload as Record<string, unknown>;
      const validated = typeof raw.validate === 'boolean'
        ? raw.validate
        : typeof raw.validated === 'boolean'
          ? raw.validated
          : null;

      if (typeof validated !== 'boolean') {
        throw new AuthServiceError('Resposta inválida do servidor ao autenticar.');
      }

      if (typeof raw.sub !== 'string' || typeof raw.email !== 'string' || typeof raw.full_name !== 'string') {
        throw new AuthServiceError('Resposta inválida do servidor ao autenticar.');
      }

      const role = normalizeUserRole(raw.role);
      const loggedWithGoogle = typeof raw.loggedWithGoogle === 'boolean' ? raw.loggedWithGoogle : false;

      const token = extractSecurityToken(response, payload);
      persistSecurityToken(token);

      return {
        validated,
        sub: raw.sub,
        role,
        email: raw.email,
        full_name: raw.full_name,
        loggedWithGoogle,
        securityToken: token,
      };
    } catch (error) {
      if (error instanceof AuthServiceError) {
        throw error;
      }
      return handleAPIError(error);
    }
  },

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

      const token = extractSecurityToken(response, payload);
      persistSecurityToken(token);

      return {
        ...(payload as CitizenSignupResponse),
        securityToken: token,
      };
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

      const token = extractSecurityToken(response, payload);
      persistSecurityToken(token);

      return {
        ...(payload as LawyerSignupResponse),
        securityToken: token,
      };
    } catch (error) {
      if (error instanceof AuthServiceError) {
        throw error;
      }
      return handleAPIError(error);
    }
  },

  async sendEmailVerificationCode(
    email: string,
    securityToken?: string
  ): Promise<SendEmailVerificationResponse> {
    try {
      const headers: Record<string, string> = {
        'Content-Type': 'application/json',
      };

      if (securityToken && securityToken.trim().length > 0) {
        headers['x-security-token'] = securityToken;
      }

      const response = await fetch(`${API.BASE_URL}${API.ENDPOINTS.AUTH.SEND_EMAIL_2FA}`, {
        method: 'POST',
        credentials: 'include',
        headers,
        body: JSON.stringify({ email }),
      });

      const data = await parseResponseBody(response);
      const token = extractSecurityToken(response, data);

      if (!response.ok) {
        if (response.status === 409) {
          return {
            message: getResponseMessage(data, 'Código já existe para este e-mail. Use o código já enviado.'),
            securityToken: token || undefined,
          };
        }
        await handleAPIError(response);
      }

      return {
        message: getResponseMessage(data, 'Código enviado para o e-mail informado.'),
        securityToken: token || undefined,
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
    securityToken: string
  ): Promise<ValidateEmailVerificationResponse> {
    try {
      const response = await fetch(`${API.BASE_URL}${API.ENDPOINTS.AUTH.VALIDATE_EMAIL_2FA}`, {
        method: 'POST',
        credentials: 'include',
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

  async sendForgotPasswordEmail(payload: SendForgotPasswordEmailRequest): Promise<SendForgotPasswordEmailResponse> {
    try {
      const response = await fetch(`${API.BASE_URL}${API.ENDPOINTS.AUTH.FORGOT_SEND_EMAIL}`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const data = await parseResponseBody(response);

      if (!response.ok) {
        if (response.status === 409) {
          return {
            message: getResponseMessage(data, 'Não foi possível enviar o código de recuperação.'),
          };
        }
        await handleAPIError(response);
      }

      return {
        message: getResponseMessage(data, 'Código de recuperação enviado para o e-mail informado.'),
      };
    } catch (error) {
      if (error instanceof AuthServiceError) {
        throw error;
      }
      return handleAPIError(error);
    }
  },

  async verifyForgotPasswordCode(
    payload: VerifyForgotPasswordCodeRequest
  ): Promise<VerifyForgotPasswordCodeResponse> {
    try {
      const response = await fetch(`${API.BASE_URL}${API.ENDPOINTS.AUTH.FORGOT_VERIFY_CODE}`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const data = await parseResponseBody(response);

      if (!response.ok) {
        await handleAPIError(response);
      }

      return {
        message: getResponseMessage(data, 'Código validado com sucesso.'),
      };
    } catch (error) {
      if (error instanceof AuthServiceError) {
        throw error;
      }
      return handleAPIError(error);
    }
  },

  async forgotPasswordReset(payload: ForgotPasswordResetRequest): Promise<ForgotPasswordResetResponse> {
    try {
      const response = await fetch(`${API.BASE_URL}${API.ENDPOINTS.AUTH.FORGOT_PASSWORD}`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const data = await parseResponseBody(response);

      if (!response.ok) {
        await handleAPIError(response);
      }

      authStorage.clearAll();
      authStorage.clearAuthStore();

      return {
        message: getResponseMessage(data, 'Senha alterada com sucesso.'),
      };
    } catch (error) {
      if (error instanceof AuthServiceError) {
        throw error;
      }
      return handleAPIError(error);
    }
  },
};
