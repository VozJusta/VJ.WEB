import type { User, UserRole } from "@/src/types/user.types";

export function getUserRole(): UserRole {
  if (typeof window === "undefined") {
    return "citizen";
  }

  const storedRole = localStorage.getItem("userRole") as UserRole | null;
  return storedRole || "citizen";
}

export function setUserRole(role: UserRole): void {
  if (typeof window !== "undefined") {
    localStorage.setItem("userRole", role);
  }
}

export function getCurrentUser(): User {
  const role = getUserRole();

  if (role === "lawyer") {
    return {
      id: "lawyer-1",
      name: "Dra. Ana Carolina Silva",
      email: "ana.silva@adv.com.br",
      role: "lawyer",
      avatarUrl: undefined,
    };
  }

  return {
    id: "citizen-1",
    name: "Ricardo Silva",
    email: "ricardo@email.com",
    role: "citizen",
    avatarUrl: undefined,
  };
}

export const AUTH_STORAGE_KEYS = {
  ACCESS_TOKEN: 'access_token',
  REFRESH_TOKEN: 'refresh_token',
  SECURITY_TOKEN: 'x-security-token',
} as const;

export const authStorage = {
  setAccessToken(token: string): void {
    if (typeof window === 'undefined') return;
    localStorage.setItem(AUTH_STORAGE_KEYS.ACCESS_TOKEN, token);
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

  clearAll(): void {
    if (typeof window === 'undefined') return;
    localStorage.removeItem(AUTH_STORAGE_KEYS.ACCESS_TOKEN);
    localStorage.removeItem(AUTH_STORAGE_KEYS.REFRESH_TOKEN);
    localStorage.removeItem(AUTH_STORAGE_KEYS.SECURITY_TOKEN);
  },

  hasTokens(): boolean {
    return !!(this.getAccessToken() && this.getRefreshToken());
  },
};

