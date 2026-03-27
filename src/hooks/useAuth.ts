'use client';

import { useAuthStore } from '@/store/auth.store';

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
    login,
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
    login,
    loginWithGoogle,
    logout,
    reset,
  };
}
