import axios from 'axios'
import { env } from '@/app/config/env'
import { useAuthStore } from '@/features/auth/store/authStore'

const api = axios.create({
    baseURL: env.apiUrl,
    timeout: 15000,
    headers: { 'Content-Type': 'application/json' },
})

api.interceptors.request.use((config) => {
    const token = useAuthStore.getState().token
    if (token) config.headers.Authorization = `Bearer ${token}`
    return config
})

api.interceptors.response.use(
    (res) => res,
    (error) => {
        if (error.response?.status === 401) {
            useAuthStore.getState().logout()
            window.location.href = '/login'
        }
        return Promise.reject(error)
    }
)

export default api