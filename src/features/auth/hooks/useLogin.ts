import { useMutation } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { authService } from '../api/authService'
import { useAuthStore } from '../store/authStore'
import { ROUTES } from '@/app/router/routes'

export function useLogin() {
    const navigate = useNavigate()
    const setAuth = useAuthStore((s) => s.setAuth)

    return useMutation({
        mutationFn: authService.login,
        onSuccess: ({ user, token }) => {
            setAuth(user, token)
            navigate(ROUTES.DASHBOARD)
        },
    })
}