import api from '@/lib/axios'
import type { ApiResponse } from '@/shared/types/api.types'
import type { AuthResponse, LoginPayload } from '../types/auth.types'

export const authService = {
    login: (payload: LoginPayload) =>
        api.post<ApiResponse<AuthResponse>>('/auth/login', payload).then((r) => r.data.data),

    logout: () =>
        api.post('/auth/logout'),
}