import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import type { AuthState, UserRole, GoogleAuthResponse } from '@/types/auth.types';

interface AuthStore extends AuthState {
  setUserRole: (role: UserRole) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  setUser: (user: AuthState['user']) => void;
  setAuthenticated: (authenticated: boolean) => void;
  loginWithGoogle: (response: GoogleAuthResponse) => void;
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

export const useAuthStore = create<AuthStore>()(
  devtools(
    persist(
      (set) => ({
        ...initialState,

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

        loginWithGoogle: (response: GoogleAuthResponse) =>
          set(
            {
              isAuthenticated: response.validated,
              userRole: response.role,
              user: {
                id: response.sub,
                email: response.email,
                fullName: response.full_name,
                role: response.role,
              },
              error: null,
            },
            false,
            'loginWithGoogle'
          ),

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
