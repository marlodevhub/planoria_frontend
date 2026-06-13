import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { cursoService } from '../services/cursoService'
import { useCouserStore } from '../store/couserStore'
import type { RegisterCredentials } from '../types/auth.types'
import { AuthError } from '../types/auth.types'
import { ROUTES } from '@/app/router/routes'

export function CourserRegister() {
    const navigate = useNavigate()
    const queryClient = useQueryClient()
    const { setAuth, setError, setLoading } = useAuthStore()

    return useMutation({
        mutationFn: async (credentials: RegisterCredentials) => {
            setLoading(true)
            try {
                const response = await authService.register(credentials)
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
            navigate(ROUTES.DASHBOARD)
        },
        onError: (error: AuthError) => {
            console.error('Register error:', error.code, error.message)
            setError(error.message)
        },
    })
}