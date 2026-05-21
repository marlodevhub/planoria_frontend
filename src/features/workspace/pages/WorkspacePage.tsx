import { useAuthStore } from '@/features/auth/store/authStore'
import { ProductivityList } from '../components/ProductivityList'
import { StatisticsPanel } from '../components/StatisticsPanel'
import { UpcomingActivity } from '../components/UpcomingActivity'
import { UpcomingSchedule } from '../components/UpcomingSchedule'

export function WorkspacePage() {
    const user = useAuthStore((s) => s.user)

    return (
        <div className="space-y-6 animate-fade-up">

            {/* Header */}
            <div>
                <h1 className="text-2xl font-bold text-text">
                    Productividad laboral
                </h1>
                <p className="text-muted text-sm mt-1">
                    Hola {user?.name ?? 'Usuario'}, revisemos tu progreso
                </p>
            </div>

            {/* Fila superior — tarjetas + estadísticas */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
                <div className="lg:col-span-2">
                    <ProductivityList />
                </div>
                <div>
                    <StatisticsPanel />
                </div>
            </div>

            {/* Fila inferior — actividad + horario */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
                <div className="lg:col-span-2">
                    <UpcomingActivity />
                </div>
                <div>
                    <UpcomingSchedule />
                </div>
            </div>

        </div>
    )
}