import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { authService } from '../services/authService'
import { useAuthStore } from '../store/authStore'
import type { LoginCredentials } from '../types/auth.types'
import { AuthError } from '../types/auth.types'
import { ROUTES } from '@/app/router/routes'

export function useLogin() {
    const navigate = useNavigate()
    const queryClient = useQueryClient()
    const { setAuth, setError, setLoading } = useAuthStore()

    return useMutation({
        mutationFn: async (credentials: LoginCredentials) => {
            setLoading(true)
            try {
                const response = await authService.login(credentials)
                setLoading(false)
                return response
            } catch (error) {
                setLoading(false)
                throw error
            }
        },
        onSuccess: ({ user, token, refreshToken }) => {
            setAuth(user, token, refreshToken)
            queryClient.invalidateQueries({ queryKey: ['user'] })
            queryClient.invalidateQueries({ queryKey: ['decks'] })
            navigate(ROUTES.DASHBOARD)
        },
        onError: (error: AuthError) => {
            console.error('Login error:', error.code, error.message)
            setError(error.message)
        },
    })
}