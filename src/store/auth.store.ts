import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import type { AuthState, UserRole, AuthResponse } from '@/types/auth.types';

interface AuthStore extends AuthState {
  setUserRole: (role: UserRole) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  setUser: (user: AuthState['user']) => void;
  setAuthenticated: (authenticated: boolean) => void;
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

        loginWithGoogle: (response: AuthResponse) =>
          set(authResponseToState(response), false, 'loginWithGoogle'),

        logout: () =>
          set({ ...initialState }, false, 'logout'),

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
