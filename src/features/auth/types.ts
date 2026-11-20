export type AdminRole = 'admin' | 'doctor';

export interface AdminUser {
  id: string;
  email: string;
  role: AdminRole;
  fullName: string | null;
  isEmailVerified: boolean;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  user: AdminUser;
}
