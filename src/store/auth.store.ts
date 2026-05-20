import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { authStorage } from '@/lib/auth';
import type { AuthState, UserRole, AuthResponse } from '@/types/auth.types';

function decodeJwt(token: string): Record<string, unknown> {
  try {
    const payload = token.split('.')[1];
    return JSON.parse(atob(payload.replace(/-/g, '+').replace(/_/g, '/')));
  } catch {
    return {};
  }
}

interface AuthStore extends AuthState {
  setUserRole: (role: UserRole) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  setUser: (user: AuthState['user']) => void;
  setAuthenticated: (authenticated: boolean) => void;
  setTokens: (accessToken: string, refreshToken: string) => void;
  login: (response: AuthResponse) => void;
  loginWithGoogle: (response: AuthResponse) => void;
  logout: () => void;
  reset: () => void;
}

const initialState: AuthState = {
  userRole: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
  user: null,
};

function authResponseToState(response: AuthResponse) {
  return {
    isAuthenticated: response.validated,
    userRole: response.role,
    user: {
      id: response.sub,
      email: response.email,
      fullName: response.full_name,
      role: response.role,
    },
    error: null,
  } as const;
}

export const useAuthStore = create<AuthStore>()(
  devtools(
    persist(
      (set) => ({
        ...initialState,

        login: (response: AuthResponse) =>
          set(authResponseToState(response), false, 'login'),

        setUserRole: (role: UserRole) =>
          set({ userRole: role }, false, 'setUserRole'),

        setLoading: (loading: boolean) =>
          set({ isLoading: loading }, false, 'setLoading'),

        setError: (error: string | null) =>
          set({ error }, false, 'setError'),

        setAuthenticated: (authenticated: boolean) =>
          set({ isAuthenticated: authenticated }, false, 'setAuthenticated'),

        setUser: (user: AuthState['user']) =>
          set({ user }, false, 'setUser'),

        setTokens: (accessToken: string, refreshToken: string) => {
          authStorage.setTokens(accessToken, refreshToken);
          const payload = decodeJwt(accessToken);
          set({
            isAuthenticated: true,
            userRole: (payload.role as UserRole) || null,
            user: payload.sub
              ? {
                  id: payload.sub as string,
                  email: (payload.email as string) || '',
                  fullName: (payload.full_name as string) || '',
                  role: (payload.role as UserRole) || 'citizen',
                }
              : null,
          }, false, 'setTokens');
        },

        loginWithGoogle: (response: AuthResponse) =>
          set(authResponseToState(response), false, 'loginWithGoogle'),

        logout: () => {
          authStorage.logout();
          authStorage.clearAll();
          set({ ...initialState }, false, 'logout');
        },

        reset: () =>
          set({ ...initialState }, false, 'reset'),
      }),
      {
        name: 'auth-store',
        version: 1,
      }
    ),
    {
      name: 'AuthStore',
    }
  )
);
