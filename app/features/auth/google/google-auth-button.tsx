'use client';

import { useAuth } from '@/hooks/useAuth';
import { API } from '@/lib/api';

export function GoogleAuthButton() {
  const { userRole, isLoading } = useAuth();

  const handleGoogleAuth = () => {
    if (!userRole) {
      console.warn('User role not selected');
      return;
    }

    const googleAuthUrl = `${API.BASE_URL}${API.ENDPOINTS.AUTH.GOOGLE}?state=${userRole}`;
    window.location.href = googleAuthUrl;
  };

  return (
    <button
      onClick={handleGoogleAuth}
      disabled={!userRole || isLoading}
      type="button"
      className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-white font-medium transition-all duration-200 hover:border-white/20 hover:bg-white/10 disabled:opacity-50 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-900"
    >
      {isLoading ? 'Conectando...' : 'Continuar com Google'}
    </button>
  );
}
