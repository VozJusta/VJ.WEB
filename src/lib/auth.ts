export const AUTH_STORAGE_KEYS = {
  ACCESS_TOKEN: 'access_token',
  REFRESH_TOKEN: 'refresh_token',
  SECURITY_TOKEN: 'x-security-token',
  AUTH_STORE: 'auth-store',
  PENDING_VERIFICATION_TOKEN: 'pending_verification_token',
} as const;

function setCookie(name: string, value: string, days = 7): void {
  if (typeof document === 'undefined') return;
  const expires = new Date(Date.now() + days * 864e5).toUTCString();
  document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expires}; path=/; SameSite=Lax`;
}

function deleteCookie(name: string): void {
  if (typeof document === 'undefined') return;
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/; SameSite=Lax`;
}

export const authStorage = {
  setUserRole(role: string): void {
    if (typeof document === 'undefined') return;
    setCookie('user_role', role);
  },

  getUserRole(): string | null {
    if (typeof document === 'undefined') return null;
    const match = document.cookie.match(/(?:^|;\s*)user_role=([^;]+)/);
    return match ? decodeURIComponent(match[1]) : null;
  },

  clearUserRole(): void {
    deleteCookie('user_role');
  },

  setAccessToken(token: string): void {
    if (typeof window === 'undefined') return;
    localStorage.setItem(AUTH_STORAGE_KEYS.ACCESS_TOKEN, token);
    setCookie(AUTH_STORAGE_KEYS.ACCESS_TOKEN, token);
  },

  getAccessToken(): string | null {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem(AUTH_STORAGE_KEYS.ACCESS_TOKEN);
  },

  setRefreshToken(token: string): void {
    if (typeof window === 'undefined') return;
    localStorage.setItem(AUTH_STORAGE_KEYS.REFRESH_TOKEN, token);
  },

  getRefreshToken(): string | null {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem(AUTH_STORAGE_KEYS.REFRESH_TOKEN);
  },

  setSecurityToken(token: string): void {
    if (typeof window === 'undefined') return;
    localStorage.setItem(AUTH_STORAGE_KEYS.SECURITY_TOKEN, token);
  },

  getSecurityToken(): string | null {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem(AUTH_STORAGE_KEYS.SECURITY_TOKEN);
  },

  setTokens(accessToken: string, refreshToken: string): void {
    this.setAccessToken(accessToken);
    this.setRefreshToken(refreshToken);
  },

  clearAll(): void {
    if (typeof window === 'undefined') return;
    localStorage.removeItem(AUTH_STORAGE_KEYS.ACCESS_TOKEN);
    localStorage.removeItem(AUTH_STORAGE_KEYS.REFRESH_TOKEN);
    localStorage.removeItem(AUTH_STORAGE_KEYS.SECURITY_TOKEN);
    deleteCookie(AUTH_STORAGE_KEYS.ACCESS_TOKEN);
    deleteCookie('user_role');
  },

  clearAuthStore(): void {
    if (typeof window === 'undefined') return;
    localStorage.removeItem(AUTH_STORAGE_KEYS.AUTH_STORE);
  },

  clearPendingVerificationToken(): void {
    if (typeof window === 'undefined') return;
    sessionStorage.removeItem(AUTH_STORAGE_KEYS.PENDING_VERIFICATION_TOKEN);
  },

  logout(): void {
    this.clearAll();
    this.clearAuthStore();
    this.clearPendingVerificationToken();
  },

  hasTokens(): boolean {
    return !!(this.getAccessToken() && this.getRefreshToken());
  },
};

