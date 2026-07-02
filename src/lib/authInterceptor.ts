/**
 * Auth Interceptor
 * Agrega el token Bearer a todas las requests
 * Desacoplado de la lógica de negocio
 */

import type { InternalAxiosRequestConfig } from 'axios'
import { useAuthStore } from '@/features/auth/store/authStore'

export const authRequestInterceptor = (config: InternalAxiosRequestConfig) => {
    const token = useAuthStore.getState().token
    if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`
    }
    return config
}
