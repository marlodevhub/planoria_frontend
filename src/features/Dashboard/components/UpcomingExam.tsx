import { useMemo } from 'react'
import { useUpcomingDeadlines } from '../hooks'
import { useCourses } from '@/features/courses/hooks'
import { cronogramaService } from '@/features/cronograma/services/cronogramaService'
import { useQuery } from '@tanstack/react-query'
import type { ScheduleListItem } from '@/features/cronograma/types/cronograma.types'

interface Exam {
  subject: string
  daysUntil: number
  retention: number
  courseName: string
  urgency: string
  type: 'exam' | 'schedule'
}

function getTodayRange() {
  const now = new Date()
  const from = new Date(now.getFullYear(), now.getMonth(), now.getDate())
  const to = new Date(from)
  to.setDate(to.getDate() + 14)
  const fmt = (d: Date) => {
    const y = d.getFullYear()
    const m = String(d.getMonth() + 1).padStart(2, '0')
    const day = String(d.getDate()).padStart(2, '0')
    return `${y}-${m}-${day}`
  }
  return { from: fmt(from), to: fmt(to) }
}

export function UpcomingExam() {
  const { data: deadlines, isLoading: deadlinesLoading } = useUpcomingDeadlines(30)
  const { data: courses, isLoading: coursesLoading } = useCourses()

  const { from, to } = getTodayRange()
  const { data: schedules } = useQuery<ScheduleListItem[]>({
    queryKey: ['dashboard', 'schedules-range', from, to],
    queryFn: () => cronogramaService.getByDateRange(from, to),
    staleTime: 1000 * 60 * 5,
  })

  if (deadlinesLoading || coursesLoading) {
    return <div className="h-48 rounded-2xl bg-muted animate-pulse" />
  }

  const examDeadlines = deadlines?.filter((d) => d.type === 'exam') ?? []

  const safeDate = (val: string | null | undefined): Date | null => {
    if (!val) return null;
    const d = new Date(val);
    return isNaN(d.getTime()) ? null : d;
  };

  const courseExams: Exam[] = (courses ?? [])
    .filter((c) => c.examDate && !c.isArchived)
    .map((c) => {
      const examDate = safeDate(c.examDate + 'T00:00:00')
      const today = new Date()
      today.setHours(0, 0, 0, 0)
      const diffTime = examDate ? examDate.getTime() - today.getTime() : 0
      const daysUntil = examDate ? Math.ceil(diffTime / (1000 * 60 * 60 * 24)) : -1
      return {
        subject: c.name,
        daysUntil,
        retention: c.progressPercentage ?? 0,
        courseName: c.name,
        urgency: daysUntil <= 3 ? 'critical' : daysUntil <= 14 ? 'warning' : 'normal',
        type: 'exam' as const,
      }
    })
    .filter((e) => e.daysUntil >= 0)

  const scheduleItems: Exam[] = (schedules ?? [])
    .filter((s) => !s.isCompleted)
    .map((s) => {
      const sDate = safeDate(s.startDateTime)
      const today = new Date()
      today.setHours(0, 0, 0, 0)
      if (sDate) sDate.setHours(0, 0, 0, 0)
      const diffTime = sDate ? sDate.getTime() - today.getTime() : 0
      const daysUntil = sDate ? Math.ceil(diffTime / (1000 * 60 * 60 * 24)) : -1
      return {
        subject: s.title,
        daysUntil,
        retention: s.progressPercentage,
        courseName: s.courseName,
        urgency: daysUntil <= 0 ? 'critical' : daysUntil <= 3 ? 'warning' : 'normal',
        type: 'schedule' as const,
      }
    })
    .filter((e) => e.daysUntil >= 0)

  const allItems = [
    ...examDeadlines.map((d) => ({
      subject: d.title,
      daysUntil: d.daysRemaining,
      retention: 0,
      courseName: d.courseName,
      urgency: d.urgency,
      type: 'exam' as const,
    })),
    ...courseExams,
    ...scheduleItems,
  ]

  allItems.sort((a, b) => a.daysUntil - b.daysUntil)

  const next: Exam | null = allItems.length > 0 ? allItems[0] : null

  const daysLabel =
    !next
      ? 'sin eventos'
      : next.daysUntil === 0
        ? 'hoy'
        : next.daysUntil === 1
          ? 'mañana'
          : `en ${next.daysUntil} días`

  return (
    <div className="bg-card border border-border rounded-2xl p-6 h-full flex flex-col gap-4">
      <div className="flex items-center gap-2 text-muted-foreground text-sm font-medium">
        <span>{'\uD83D\uDCC5'}</span>
        {next && next.type === 'schedule' ? 'Próximo horario' : 'Próximo examen'}
      </div>

      <div>
        <h2 className="text-foreground text-2xl font-bold">
          {next?.subject ?? 'Sin pendientes'}
        </h2>
        {next?.courseName && (
          <p className="text-muted-foreground text-xs mt-0.5">{next.courseName}</p>
        )}
        <p className="text-accent-foreground text-sm mt-1">{daysLabel}</p>
      </div>

      {next && (
        <div className="mt-auto space-y-2">
          <div className="flex justify-between items-center text-sm">
            <span className="text-muted-foreground">Progreso actual:</span>
            <span className="text-foreground font-medium">{next.retention}%</span>
          </div>
          <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
            <div
              className="bg-accent h-2 rounded-full transition-all duration-500"
              style={{ width: `${next.retention}%` }}
            />
          </div>
        </div>
      )}

      {!next && (
        <p className="text-muted-foreground text-sm mt-auto">
          No tienes eventos próximos. Creá horarios en el cronograma o cursos con fecha de examen.
        </p>
      )}
    </div>
  )
}
