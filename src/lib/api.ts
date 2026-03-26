const API_URL = process.env.NEXT_PUBLIC_API_URL;

if (!API_URL) {
  throw new Error('NEXT_PUBLIC_API_URL is not defined in environment variables');
}

export const API = {
  BASE_URL: API_URL,
  ENDPOINTS: {
    AUTH: {
      GOOGLE: '/auth/google',
      GOOGLE_CALLBACK: '/auth/google/callback',
      AUTHENTICATE: '/auth/authenticate',
      SEND_EMAIL_2FA: '/auth/send/email',
      VALIDATE_EMAIL_2FA: '/auth/validate/email',
      FORGOT_SEND_EMAIL: '/auth/send/forgot/email',
      FORGOT_VERIFY_CODE: '/auth/forgot/verify-code',
      FORGOT_PASSWORD: '/auth/forgot/password',
    },
    SIGNUP: {
      CITIZEN: '/citizen',
      EMAIL_SEND: '/auth/send/email',
      EMAIL_VALIDATE: '/auth/validate/email',
      LAWYER: '/lawyer',
    },
  },
} as const;

async function parseApiResponse<T>(response: Response): Promise<T> {
  const contentType = response.headers.get('content-type') || '';

  if (contentType.includes('application/json')) {
    return response.json() as Promise<T>;
  }

  const text = await response.text();

  if (!text) {
    return null as T;
  }

  try {
    return JSON.parse(text) as T;
  } catch {
    return text as T;
  }
}

export async function fetchAPI<T>(
  endpoint: string,
  options?: RequestInit
): Promise<T> {
  const url = `${API.BASE_URL}${endpoint}`;

  const response = await fetch(url, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
  });

  if (!response.ok) {
    throw new Error(`API Error: ${response.status} ${response.statusText}`);
  }

  return parseApiResponse<T>(response);
}
