import type { User, UserRole } from "@/types/user.types";

export function getUserRole(): UserRole {
  if (typeof window === "undefined") {
    return "citizen";
  }

  const storedRole = localStorage.getItem("userRole") as UserRole | null;
  return storedRole || "citizen";
}

export function setUserRole(role: UserRole): void {
  if (typeof window !== "undefined") {
    localStorage.setItem("userRole", role);
  }
}

export function getCurrentUser(): User {
  const role = getUserRole();

  if (role === "lawyer") {
    return {
      id: "lawyer-1",
      name: "Dra. Ana Carolina Silva",
      email: "ana.silva@adv.com.br",
      role: "lawyer",
      avatarUrl: undefined,
    };
  }

  return {
    id: "citizen-1",
    name: "Ricardo Silva",
    email: "ricardo@email.com",
    role: "citizen",
    avatarUrl: undefined,
  };
}
