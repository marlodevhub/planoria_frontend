import { useAuthStore } from '@/features/auth/store/authStore'
import { StatsGrid } from '@/components/ui/StatsGrid'

const stats = [
    { label: 'Usuarios registrados', value: '1,284', delta: '+12%' },
    { label: 'Usuarios activos', value: '342', delta: '+5%' },
    { label: 'Reportes pendientes', value: '8', delta: '-20%' },
    { label: 'Errores del sistema', value: '3', delta: '-80%' },
]

export function AdminPage() {
    const user = useAuthStore((s) => s.user)

    return (
        <div className="space-y-8 animate-fade-up">
            <div>
                <h1 className="text-2xl font-bold text-text">
                    Panel de administración 🛡️
                </h1>
                <p className="text-muted text-sm mt-1">
                    Bienvenido, {user?.name ?? 'Admin'}
                </p>
            </div>

            <StatsGrid stats={stats} />

            <div className="bg-surface border border-border rounded-xl p-8 flex items-center justify-center min-h-48">
                <p className="text-muted text-sm font-mono">
                    → Gestión de usuarios, roles y configuración
                </p>
            </div>
        </div>
    )
}