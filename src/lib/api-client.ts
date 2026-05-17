import { authStorage } from './auth';

const API_URL = process.env.NEXT_PUBLIC_API_URL!;

function forceLogout(): void {
  authStorage.logout();
  // Clear persisted Zustand auth store so the next page load starts clean
  if (typeof window !== 'undefined') {
    try {
      localStorage.removeItem('auth-store');
    } catch {
      // storage unavailable
    }
    window.location.href = '/login';
  }
}

let isRefreshing = false;
let failedQueue: Array<{
  resolve: (token: string) => void;
  reject: (err: Error) => void;
}> = [];

function processQueue(error: Error | null, token: string | null = null) {
  failedQueue.forEach((p) => {
    if (error) p.reject(error);
    else p.resolve(token!);
  });
  failedQueue = [];
}

async function refreshAccessToken(): Promise<string> {
  const refreshToken = authStorage.getRefreshToken();
  if (!refreshToken) throw new Error('No refresh token');

  const response = await fetch(`${API_URL}/auth/refresh-token`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      refreshToken,
    },
  });

  if (!response.ok) throw new Error('Refresh failed');

  const data = await response.json();
  const newAccessToken: string = data.access_token;

  authStorage.setAccessToken(newAccessToken);

  return newAccessToken;
}

export async function apiFetch(
  endpoint: string,
  init?: RequestInit,
): Promise<Response> {
  const url = endpoint.startsWith('http') ? endpoint : `${API_URL}${endpoint}`;

  const buildHeaders = (token: string | null): Headers => {
    const headers = new Headers(init?.headers);
    // Don't set Content-Type for FormData — the browser must set it with the multipart boundary
    if (!(init?.body instanceof FormData)) {
      headers.set('Content-Type', headers.get('Content-Type') ?? 'application/json');
    }
    if (token) headers.set('Authorization', `Bearer ${token}`);
    return headers;
  };

  let accessToken = authStorage.getAccessToken();
  let response = await fetch(url, { ...init, headers: buildHeaders(accessToken) });

  if (response.status !== 401) return response;

  if (isRefreshing) {
    const newToken = await new Promise<string>((resolve, reject) => {
      failedQueue.push({ resolve, reject });
    });
    response = await fetch(url, { ...init, headers: buildHeaders(newToken) });
    return response;
  }

  isRefreshing = true;

  try {
    const newToken = await refreshAccessToken();
    processQueue(null, newToken);
    isRefreshing = false;
    response = await fetch(url, { ...init, headers: buildHeaders(newToken) });
    return response;
  } catch (err) {
    processQueue(err as Error, null);
    isRefreshing = false;
    forceLogout();
    throw err;
  }
}
