// import api from '@/lib/axios'
// import type { ApiResponse } from '@/types/api.types'
// import type { AuthResponse, LoginPayload, RegisterPayload } from '@/types/auth.types'

// export const authService = {
//     login: (payload: LoginPayload) =>
//         api.post<ApiResponse<AuthResponse>>('/auth/login', payload).then((r) => r.data.data),

//     register: (payload: RegisterPayload) =>
//         api.post<ApiResponse<AuthResponse>>('/auth/register', payload).then((r) => r.data.data),

//     logout: () =>
//         api.post('/auth/logout'),
// }


import api from '@/lib/axios'
import type { ApiResponse } from '@/types/api.types'
import type { AuthResponse, LoginPayload, RegisterPayload } from '@/types/auth.types'

// ─── Mock para desarrollo ────────────────────────────────────────────────────
const USE_MOCK = true // ← false cuando tengas el backend

const mockLogin = async (payload: LoginPayload): Promise<AuthResponse> => {
    await new Promise((r) => setTimeout(r, 800))

    if (payload.email === 'admin@test.com' && payload.password === '123456') {
        return {
            user: { id: '1', name: 'Admin User', email: payload.email, role: 'admin' },
            token: 'mock-token-admin',
        }
    }

    if (payload.email === 'user@test.com' && payload.password === '123456') {
        return {
            user: { id: '2', name: 'Juan García', email: payload.email, role: 'user' },
            token: 'mock-token-user',
        }
    }

    throw new Error('Credenciales incorrectas')
}

const mockRegister = async (payload: RegisterPayload): Promise<AuthResponse> => {
    await new Promise((r) => setTimeout(r, 800))
    return {
        user: { id: '3', name: payload.name, email: payload.email, role: 'user' },
        token: 'mock-token-new',
    }
}
// ─────────────────────────────────────────────────────────────────────────────

export const authService = {
    login: (payload: LoginPayload) => {
        if (USE_MOCK) return mockLogin(payload)
        return api.post<ApiResponse<AuthResponse>>('/auth/login', payload).then((r) => r.data.data)
    },

    register: (payload: RegisterPayload) => {
        if (USE_MOCK) return mockRegister(payload)
        return api.post<ApiResponse<AuthResponse>>('/auth/register', payload).then((r) => r.data.data)
    },

    logout: () => {
        if (USE_MOCK) return Promise.resolve()
        return api.post('/auth/logout')
    },
}