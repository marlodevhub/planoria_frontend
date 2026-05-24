import { Navigate, Outlet } from 'react-router-dom'
import { useAuthStore } from '@/features/auth/store/authStore'
import { ROUTES } from '../routes'
import type { User } from '@/shared/types/user.types'  // ← actualizado

interface RoleGuardProps {
    allowedRoles: User['rol'][]
}

export function RoleGuard({ allowedRoles }: RoleGuardProps) {
    const user = useAuthStore((s) => s.user)
    return user && allowedRoles.includes(user.rol)
        ? <Outlet />
        : <Navigate to={ROUTES.DASHBOARD} replace />
}