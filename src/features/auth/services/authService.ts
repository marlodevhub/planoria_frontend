import api from '@/lib/axios'
import type { AuthResponse, LoginPayload, RegisterPayload, ApiAuthResponse } from '../types/auth.types'

function mapAuthResponse(data: ApiAuthResponse): AuthResponse {
    return {
        token: data.token,
        user: {
            id: String(data.idUsuario),
            nombre: data.nombre,
            correo: data.correo,
            rol: data.rol,
        },
    }
}

export const authService = {
    async login(payload: LoginPayload): Promise<AuthResponse> {
        const response = await api.post<ApiAuthResponse>('/auth/login', payload)
        return mapAuthResponse(response.data)
    },

    async register(payload: RegisterPayload): Promise<AuthResponse> {
        const response = await api.post<ApiAuthResponse>('/auth/register', payload)
        return mapAuthResponse(response.data)
    },

    async logout(): Promise<void> {
        await api.post('/auth/logout')
    },
}