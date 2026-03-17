'use client';

import { useAuthStore } from '@/store/auth.store';
import type { UserRole, GoogleAuthResponse } from '@/types/auth.types';

export function useAuth() {
  const {
    userRole,
    isAuthenticated,
    isLoading,
    error,
    user,
    setUserRole,
    setLoading,
    setError,
    setUser,
    setAuthenticated,
    loginWithGoogle,
    logout,
    reset,
  } = useAuthStore();

  return {
    userRole,
    isAuthenticated,
    isLoading,
    error,
    user,
    setUserRole,
    setLoading,
    setError,
    setUser,
    setAuthenticated,
    loginWithGoogle,
    logout,
    reset,
  };
}
