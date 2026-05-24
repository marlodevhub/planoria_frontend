import axios, { InternalAxiosRequestConfig } from 'axios'
import { env } from '@/app/config/env'
import { useAuthStore } from '@/features/auth/store/authStore'

const api = axios.create({
    baseURL: env.apiUrl,
    timeout: 15000,
    headers: { 'Content-Type': 'application/json' },
})

// Tipado estricto para evitar anys implícitos
api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
    const token = useAuthStore.getState().token
    if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`
    }
    return config
})

api.interceptors.response.use(
    (res) => res,
    (error) => {
        if (error.response?.status === 401) {
            const isLoginRequest = error.config?.url?.includes('/auth/login')
            const isLoginPage = window.location.pathname.includes('/login')

            // Solo deslogueamos y redirigimos si NO estamos intentando loguearnos
            if (!isLoginRequest && !isLoginPage) {
                useAuthStore.getState().logout()
                window.location.href = '/login'
            }
        }
        return Promise.reject(error)
    }
)

export default api