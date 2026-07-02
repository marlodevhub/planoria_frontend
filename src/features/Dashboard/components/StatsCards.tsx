import { useDashboardOverview } from '../hooks'
import { Card } from '@/components/ui/card'

function formatStudyTime(minutes: number): string {
  if (minutes < 1) return '<1m'
  const h = Math.floor(minutes / 60)
  const m = minutes % 60
  if (h === 0) return `${m}m`
  return `${h}h ${m}m`
}

interface StatCardProps {
  label: string
  value: string
  subtitle: string
  icon: string
}

function StatCard({ label, value, subtitle, icon }: StatCardProps) {
  return (
    <Card className="p-5 flex items-start justify-between">
      <div>
        <p className="text-muted-foreground text-xs font-medium uppercase tracking-wide">
          {label}
        </p>
        <p className="text-foreground text-3xl font-bold mt-1">{value}</p>
        <p className="text-muted-foreground text-sm mt-0.5">{subtitle}</p>
      </div>
      <div className="bg-muted border border-border rounded-xl p-2.5 text-xl">
        {icon}
      </div>
    </Card>
  )
}

export function StatsCards() {
  const { data: overview, isLoading } = useDashboardOverview()

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="h-28 rounded-xl bg-muted animate-pulse" />
        ))}
      </div>
    )
  }

  const stats: StatCardProps[] = [
    {
      label: 'Tarjetas hoy',
      value: String(overview?.cardsReviewedToday ?? 0),
      subtitle: 'revisadas',
      icon: '🃏',
    },
    {
      label: 'Tiempo de estudio',
      value: formatStudyTime(overview?.totalStudyTimeToday ?? 0),
      subtitle: 'hoy',
      icon: '⏱',
    },
    {
      label: 'Racha',
      value: `${overview?.streakDays ?? 0} días`,
      subtitle: 'consecutivos',
      icon: '🔥',
    },
    {
      label: 'Pendientes',
      value: String(overview?.pendingReviewsCount ?? 0),
      subtitle: 'revisiones',
      icon: '📋',
    },
  ]

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat) => (
        <StatCard key={stat.label} {...stat} />
      ))}
    </div>
  )
}
