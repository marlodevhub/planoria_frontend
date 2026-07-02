// src/features/auth/services/authService.ts
import api from '@/lib/axios'
import { AUTH_API_ROUTES } from '../constants/api'
import { useAuthStore } from '../store/authStore'
import type {
    AuthResponse,
    ApiAuthResponse,
    LoginCredentials,
    RegisterCredentials,
    User,
} from '../types/auth.types'
import { AuthError, AuthErrorCode } from '../types/auth.types'

function mapAuthResponse(data: ApiAuthResponse): AuthResponse {
    return {
        token: data.accessToken,
        refreshToken: data.refreshToken,
        user: {
            id: String(data.user.id),
            nombre: data.user.fullName,
            correo: data.user.email,
            rol: data.user.rol ?? 'student',
        },
    }
}

function parseAuthError(error: any): AuthError {
    const status = error.response?.status
    const code = error.response?.data?.code
    const message = error.response?.data?.message || error.message

    if (status === 401 || code === 'UNAUTHORIZED')
        return new AuthError(AuthErrorCode.UNAUTHORIZED, 'No autorizado', error)
    if (status === 409 || code === 'EMAIL_ALREADY_EXISTS')
        return new AuthError(AuthErrorCode.EMAIL_ALREADY_EXISTS, 'El email ya está registrado', error)
    if (status === 400) {
        if (code === 'INVALID_CREDENTIALS')
            return new AuthError(AuthErrorCode.INVALID_CREDENTIALS, 'Credenciales inválidas', error)
        if (code === 'WEAK_PASSWORD')
            return new AuthError(AuthErrorCode.WEAK_PASSWORD, 'La contraseña es muy débil', error)
    }
    if (!navigator.onLine)
        return new AuthError(AuthErrorCode.NETWORK_ERROR, 'Sin conexión a internet', error)

    return new AuthError(AuthErrorCode.UNKNOWN, message || 'Error desconocido', error)
}

export const authService = {
    async login(credentials: LoginCredentials): Promise<AuthResponse> {
        try {
            const { data } = await api.post<ApiAuthResponse>(AUTH_API_ROUTES.LOGIN, credentials)
            return mapAuthResponse(data)
        } catch (error) {
            throw parseAuthError(error)
        }
    },

    async register(credentials: RegisterCredentials): Promise<AuthResponse> {
        try {
            const { data } = await api.post<ApiAuthResponse>(AUTH_API_ROUTES.REGISTER, credentials)
            return mapAuthResponse(data)
        } catch (error) {
            throw parseAuthError(error)
        }
    },

    async logout(): Promise<void> {
        try {
            await api.post(AUTH_API_ROUTES.LOGOUT)
        } catch (error) {
            console.error('Error al cerrar sesión en el servidor', error)
        }
    },

    async refreshToken(token: string): Promise<AuthResponse | null> {
        try {
            const { data } = await api.post<ApiAuthResponse>(AUTH_API_ROUTES.REFRESH, {
                refreshToken: token,
            })
            const authResponse = mapAuthResponse(data)
            useAuthStore.getState().setToken(authResponse.token, authResponse.refreshToken)
            return authResponse
        } catch (error) {
            console.error('Token refresh failed:', error)
            return null
        }
    },

    async validateToken(): Promise<User> {
        try {
            const { data } = await api.get<User>(AUTH_API_ROUTES.VALIDATE)
            return data
        } catch (error) {
            throw parseAuthError(error)
        }
    },
}