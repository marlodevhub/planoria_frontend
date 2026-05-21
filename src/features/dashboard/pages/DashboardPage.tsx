import { useAuthStore } from '@/features/auth/store/authStore'

const stats = [
    { label: 'Usuarios totales', value: '1,284', delta: '+12%' },
    { label: 'Sesiones hoy', value: '342', delta: '+5%' },
    { label: 'Ingresos', value: '$8,420', delta: '+23%' },
    { label: 'Errores', value: '3', delta: '-80%' },
]

export function DashboardPage() {
    const user = useAuthStore((s) => s.user)

    return (
        <div className="space-y-8 animate-fade-up">
            {/* Header */}
            <div>
                <h1 className="text-2xl font-bold text-text">
                    Hola, {user?.name ?? 'Usuario'} 👋
                </h1>
                <p className="text-muted text-sm mt-1">
                    Aquí tienes un resumen de hoy
                </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {stats.map((stat) => (
                    <div
                        key={stat.label}
                        className="bg-surface border border-border rounded-xl p-5 hover:border-accent/50 transition-colors duration-200"
                    >
                        <p className="text-muted text-xs font-mono uppercase tracking-widest mb-2">
                            {stat.label}
                        </p>
                        <p className="text-2xl font-bold text-text">{stat.value}</p>
                        <p className="text-accent text-xs font-mono mt-1">{stat.delta} este mes</p>
                    </div>
                ))}
            </div>

            {/* Placeholder de contenido */}
            <div className="bg-surface border border-border rounded-xl p-8 flex items-center justify-center min-h-48">
                <p className="text-muted text-sm font-mono">
                    → Aquí van tus tablas, gráficas y features
                </p>
            </div>
        </div>
    )
}