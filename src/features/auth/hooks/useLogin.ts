import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { authService } from '../services/authService'
import { useAuthStore } from '../store/authStore'
import { LoginPayload } from '../types/auth.types'
import { ROUTES } from '@/app/router/routes'

export function useLogin() {
    const navigate = useNavigate()
    const queryClient = useQueryClient()
    const setAuth = useAuthStore((s) => s.setAuth)

    return useMutation({
        mutationFn: async (payload: LoginPayload) => authService.login(payload),
        onSuccess: ({ user, token }) => {
            setAuth(user, token)

            queryClient.clear()

            navigate(ROUTES.DASHBOARD)
        },
    })
}