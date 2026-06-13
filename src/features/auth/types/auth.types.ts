// ─── Usuario ───────────────────────────────────────────────
export interface User {
    id: string
    nombre: string
    correo: string
    rol: 'admin' | 'student'
}

// ─── Credenciales ──────────────────────────────────────────
export interface LoginCredentials {
    email: string
    password: string
}

export interface RegisterCredentials {
    nombre: string
    apellido: string
    email: string
    password: string
}

// ─── Respuestas ────────────────────────────────────────────
export interface AuthResponse {
    token: string
    refreshToken: string
    user: User
}

/** Shape cruda que devuelve el backend */
export interface ApiAuthResponse {
    token: string
    refreshToken: string
    idUsuario: number
    nombre: string
    correo: string
    rol: 'admin' | 'student'
}

// ─── Errores ───────────────────────────────────────────────
export enum AuthErrorCode {
    UNAUTHORIZED = 'UNAUTHORIZED',
    EMAIL_ALREADY_EXISTS = 'EMAIL_ALREADY_EXISTS',
    INVALID_CREDENTIALS = 'INVALID_CREDENTIALS',
    WEAK_PASSWORD = 'WEAK_PASSWORD',
    NETWORK_ERROR = 'NETWORK_ERROR',
    UNKNOWN = 'UNKNOWN',
}

export class AuthError extends Error {
    constructor(
        public code: AuthErrorCode,
        message: string,
        public originalError?: unknown,
    ) {
        super(message)
        this.name = 'AuthError'
    }
}