import { Navigate, Outlet } from 'react-router-dom'
import { useAuthStore } from '@/features/auth/store/authStore'
import { ROUTES } from '@/app/router/routes'
import type { User } from '@/features/auth/types/auth.types'

interface RoleGuardProps {
    allowedRoles: User['rol'][]
}

export function RoleGuard({ allowedRoles }: RoleGuardProps) {
    const user = useAuthStore((s) => s.user)
    return user && allowedRoles.includes(user.rol)
        ? <Outlet />
        : <Navigate to={ROUTES.DASHBOARD} replace />
}