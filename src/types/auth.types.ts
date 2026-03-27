export type UserRole = 'citizen' | 'lawyer';

export interface GoogleAuthResponse {
  validated: boolean;
  sub: string;
  role: UserRole;
  email: string;
  full_name: string;
  loggedWithGoogle: boolean;
}

export interface AuthenticateResponse {
  validated: boolean;
  sub: string;
  role: UserRole;
  email: string;
  full_name: string;
  loggedWithGoogle: boolean;
}

export type AuthResponse = GoogleAuthResponse;

export interface CredentialsLoginRequest {
  email: string;
  password: string;
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

export interface CitizenSignupRequest {
  fullName: string;
  cpf: string;
  phone: string;
  email: string;
  password: string;
}

export interface CitizenSignupResponse {
  full_name: string;
  cpf: string;
  cnpj: string | null;
  phone: string;
  email: string;
  securityToken?: string;
}

export interface LawyerSignupRequest extends CitizenSignupRequest {
  oab: string;
  uf: string;
  specialty: string;
}

export interface LawyerSignupResponse extends CitizenSignupResponse {
  oab: string;
  uf: string;
  specialty: string;
}

export interface SendEmailVerificationResponse {
  message: string;
  securityToken?: string;
}

export interface ValidateEmailVerificationRequest {
  email: string;
  code: string;
}

export interface ValidateEmailVerificationResponse {
  access_token: string;
  refresh_token: string;
  securityToken?: string;
}

export interface SendForgotPasswordEmailRequest {
  email: string;
}

export interface SendForgotPasswordEmailResponse {
  message: string;
}

export interface VerifyForgotPasswordCodeRequest {
  email: string;
  code: string;
}

export interface VerifyForgotPasswordCodeResponse {
  message: string;
}

export interface ForgotPasswordResetRequest {
  email: string;
  new_password: string;
}

export interface ForgotPasswordResetResponse {
  message: string;
}
