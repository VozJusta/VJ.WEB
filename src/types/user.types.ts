export type UserRole = "citizen" | "lawyer";

export type User = {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatarUrl?: string;
  phone?: string;
};

export type AuthUser = User & {
  token: string;
  refreshToken: string;
};
