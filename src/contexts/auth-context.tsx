"use client";

import { createContext, useContext, ReactNode } from "react";
import type { User, UserRole } from "@/types/user.types";
import { useAuthStore } from "@/store/auth.store";

type AuthContextType = {
  user: User;
  setRole: (role: UserRole) => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const storeUser = useAuthStore((s) => s.user);
  const setUserRole = useAuthStore((s) => s.setUserRole);

  const user: User = {
    id: storeUser?.id ?? "",
    name: storeUser?.fullName || "Usuário",
    email: storeUser?.email ?? "",
    role: (storeUser?.role ?? "citizen") as UserRole,
    avatarUrl: undefined,
  };

  return (
    <AuthContext.Provider value={{ user, setRole: setUserRole }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
