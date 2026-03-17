export type UserRole = 'citizen' | 'lawyer';

export interface GoogleAuthResponse {
  validated: boolean;
  sub: string;
  role: UserRole;
  email: string;
  full_name: string;
  loggedWithGoogle: boolean;
}

export interface AuthState {
  userRole: UserRole | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  user: {
    id: string;
    email: string;
    fullName: string;
    role: UserRole;
  } | null;
}
