
// auth/guards/ProtectedRoute.tsx
import { Outlet, Navigate } from 'react-router-dom'
import { useAuthStore } from '@/features/auth/store/authStore'
import { ROUTES } from '@/app/router/routes'

export function ProtectedRoute() {
    const { isAuthenticated } = useAuthStore()
    if (!isAuthenticated) {
        return <Navigate to={ROUTES.LOGIN} replace />
    }
    return <Outlet />
}