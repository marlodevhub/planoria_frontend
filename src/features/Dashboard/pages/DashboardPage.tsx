import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '@/features/auth/store/authStore'
import { StatsCards } from '../components/StatsCards'
import { TodayRecommendation } from '../components/TodayRecommendation'
import { UpcomingExam } from '../components/UpcomingExam'
import { RetentionByTopic } from '../components/RetentionByTopic'
import { RecentActivity } from '../components/RecentActivity'
import { ROUTES } from '@/app/router/routes'
import { Button } from '@/components/ui/button'

export function DashboardPage() {
  const user = useAuthStore((s) => s.user)
  const navigate = useNavigate()

  const hour = new Date().getHours()
  const greeting =
    hour < 12 ? 'Buenos días' : hour < 18 ? 'Buenas tardes' : 'Buenas noches'

  return (
    <div className="space-y-6 animate-fade-up">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">
            {greeting}, {user?.nombre?.split(' ')[0] ?? 'Estudiante'}
          </h1>
          <p className="text-muted-foreground text-sm mt-1">
            Aquí está tu panorama de estudio.
          </p>
        </div>
        <Button onClick={() => navigate(ROUTES.FLASHCARDS)}>
          <i className="ti ti-plus text-[16px] mr-1" />
          Nueva sesión
        </Button>
      </div>

      <StatsCards />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <div className="lg:col-span-2">
          <TodayRecommendation />
        </div>
        <div>
          <UpcomingExam />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <RetentionByTopic />
        <RecentActivity />
      </div>
    </div>
  )
}
