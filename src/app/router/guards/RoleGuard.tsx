import { Navigate, Outlet } from 'react-router-dom'
import { useAuthStore } from '@/features/auth/store/authStore'
import { ROUTES } from '../routes'
import type { User } from '@/types/auth.types'

interface RoleGuardProps {
    allowedRoles: User['role'][]
}

export function RoleGuard({ allowedRoles }: RoleGuardProps) {
    const user = useAuthStore((s) => s.user)
    return user && allowedRoles.includes(user.role)
        ? <Outlet />
        : <Navigate to={ROUTES.WORKSPACE} replace />
}