// src/features/auth/types/auth.types.ts

export interface User {
  id: string;
  nombre: string;
  correo: string;
  rol: "admin" | "student";
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials {
  nombre: string;
  apellido: string;
  email: string;
  password: string;
  preferredLanguage?: string;
}

export interface AuthResponse {
  token: string;
  refreshToken: string;
  user: User;
}

export interface ApiAuthResponse {
  accessToken: string;
  refreshToken: string;
  tokenType: string;
  expiresIn: number;
  user: {
    id: number;
    fullName: string;
    email: string;
    avatar: string;
    rol?: "admin" | "student";
  };
}

export enum AuthErrorCode {
  UNAUTHORIZED = "UNAUTHORIZED",
  EMAIL_ALREADY_EXISTS = "EMAIL_ALREADY_EXISTS",
  INVALID_CREDENTIALS = "INVALID_CREDENTIALS",
  WEAK_PASSWORD = "WEAK_PASSWORD",
  NETWORK_ERROR = "NETWORK_ERROR",
  UNKNOWN = "UNKNOWN",
}

export class AuthError extends Error {
  constructor(
    public code: AuthErrorCode,
    message: string,
    public originalError?: unknown,
  ) {
    super(message);
    this.name = "AuthError";
  }
}

