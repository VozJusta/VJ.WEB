'use client';

import { useAuth } from '@/hooks/useAuth';
import type { UserRole } from '@/types/auth.types';

interface RoleOption {
  id: UserRole;
  title: string;
  description: string;
  icon: React.ReactNode;
}

interface RoleSelectionProps {
  onRoleSelected?: (role: UserRole) => void;
  options?: RoleOption[];
}

function DefaultIcon() {
  return (
    <svg
      className="w-8 h-8"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
  );
}

export function RoleSelection({
  onRoleSelected,
  options = [
    {
      id: 'user',
      title: 'Sou Cidadão',
      description: 'Procurando orientação jurídica ou conhecer meus direitos',
      icon: <DefaultIcon />,
    },
    {
      id: 'lawyer',
      title: 'Sou Advogado',
      description: 'Oferecendo minha expertise jurídica para a comunidade',
      icon: <DefaultIcon />,
    },
  ],
}: RoleSelectionProps) {
  const { setUserRole } = useAuth();

  const handleRoleSelect = (role: UserRole) => {
    setUserRole(role);
    onRoleSelected?.(role);
  };

  return (
    <section className="space-y-6">
      <div className="text-center space-y-2">
        <h1 className="text-2xl sm:text-3xl font-bold text-white">
          Bem-vindo à VozJusta
        </h1>
        <p className="text-gray-400 text-sm sm:text-base">
          Escolha qual é o seu perfil para continuar
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {options.map((option) => (
          <button
            key={option.id}
            onClick={() => handleRoleSelect(option.id)}
            className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-6 transition-all duration-300 hover:border-white/20 hover:bg-white/10 hover:shadow-lg hover:shadow-blue-500/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-900"
            type="button"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/0 to-blue-500/0 group-hover:from-blue-500/10 group-hover:to-blue-500/5 transition-all duration-300" />

            <div className="relative z-10 space-y-4">
              <div className="flex justify-center text-blue-400 group-hover:text-blue-300 transition-colors">
                {option.icon}
              </div>

              <div className="space-y-2">
                <h2 className="text-lg font-semibold text-white group-hover:text-blue-300 transition-colors">
                  {option.title}
                </h2>
                <p className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors">
                  {option.description}
                </p>
              </div>
            </div>
          </button>
        ))}
      </div>
    </section>
  );
}
