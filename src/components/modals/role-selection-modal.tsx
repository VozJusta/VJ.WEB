'use client';

import { useState } from 'react';
import type { UserRole } from '@/types/auth.types';

interface RoleSelectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectRole: (role: UserRole) => void;
  isLoading?: boolean;
}

export function RoleSelectionModal({
  isOpen,
  onClose,
  onSelectRole,
  isLoading = false,
}: RoleSelectionModalProps) {
  const [selectedRole, setSelectedRole] = useState<UserRole | null>(null);

  const handleSelect = (role: UserRole) => {
    setSelectedRole(role);
    onSelectRole(role);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="mx-auto w-full max-w-md rounded-2xl border border-white/10 bg-[#071735]/95 p-8 shadow-2xl">
        <div className="space-y-6">
          <div className="text-center space-y-2">
            <h2 className="text-2xl font-bold text-white">
              Qual é seu perfil?
            </h2>
            <p className="text-sm text-white/60">
              Escolha para continuar com o login
            </p>
          </div>

          <div className="grid grid-cols-1 gap-3">
            <button
              type="button"
              onClick={() => handleSelect('citizen')}
              disabled={isLoading}
              className="group relative overflow-hidden rounded-xl border border-white/10 bg-white/5 p-4 transition-all duration-300 hover:border-white/20 hover:bg-white/10 disabled:opacity-50 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
            >
              <div className="absolute inset-0 bg-linear-to-br from-blue-500/0 to-blue-500/0 group-hover:from-blue-500/10 group-hover:to-blue-500/5 transition-all duration-300" />
              <div className="relative z-10 text-left">
                <p className="font-semibold text-white group-hover:text-blue-300 transition-colors">
                  Sou Cidadão
                </p>
                <p className="text-xs text-white/50 group-hover:text-white/70 transition-colors mt-1">
                  Procurando orientação jurídica
                </p>
              </div>
            </button>

            <button
              type="button"
              onClick={() => handleSelect('lawyer')}
              disabled={isLoading}
              className="group relative overflow-hidden rounded-xl border border-white/10 bg-white/5 p-4 transition-all duration-300 hover:border-white/20 hover:bg-white/10 disabled:opacity-50 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
            >
              <div className="absolute inset-0 bg-linear-to-br from-blue-500/0 to-blue-500/0 group-hover:from-blue-500/10 group-hover:to-blue-500/5 transition-all duration-300" />
              <div className="relative z-10 text-left">
                <p className="font-semibold text-white group-hover:text-blue-300 transition-colors">
                  Sou Advogado
                </p>
                <p className="text-xs text-white/50 group-hover:text-white/70 transition-colors mt-1">
                  Oferecendo expertise jurídica
                </p>
              </div>
            </button>
          </div>

          <button
            type="button"
            onClick={onClose}
            disabled={isLoading}
            className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/70 transition-all hover:bg-white/10 hover:text-white disabled:opacity-50"
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
}
