"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import type { User, UserRole } from "@/types/user.types";
import { getUserRole, setUserRole as setStoredUserRole, getCurrentUser } from "@/lib/auth";

type AuthContextType = {
  user: User;
  setRole: (role: UserRole) => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [currentRole, setCurrentRole] = useState<UserRole>("citizen");
  const [user, setUser] = useState<User>(() => getCurrentUser());

  useEffect(() => {
    const role = getUserRole();
    setCurrentRole(role);
    setUser(getCurrentUser());
  }, []);

  const handleSetRole = (role: UserRole) => {
    setStoredUserRole(role);
    setCurrentRole(role);
    setUser(getCurrentUser());
  };

  return (
    <AuthContext.Provider value={{ user, setRole: handleSetRole }}>
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
