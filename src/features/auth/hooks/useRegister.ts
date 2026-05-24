import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { authService } from '../services/authService'
import { useAuthStore } from '../store/authStore'
import { RegisterPayload } from '../types/auth.types'
import { ROUTES } from '@/app/router/routes'

export function useRegister() {
    const navigate = useNavigate()
    const queryClient = useQueryClient()
    const setAuth = useAuthStore((s) => s.setAuth)

    return useMutation({
        mutationFn: (payload: RegisterPayload) => authService.register(payload),
        onSuccess: ({ user, token }) => {
            setAuth(user, token)

            queryClient.clear()

            navigate(ROUTES.DASHBOARD)
        },
    })
}