import api from '@/lib/axios'
import { PROGRESOS_API_ROUTES } from '../constants/api'
import type {
  GlobalStats,
  WeeklyTrend,
  MasteryTrend,
  FlashcardProgress,
  BackendFlashcardProgress,
  QuizProgress,
  Goal,
  Achievement,
} from '../types/progresos.types'

interface BackendGlobalStats {
  totalCardsMastered: number
  totalCardsInLearning: number
  totalQuizzesPassed: number
  averageQuizScore: number
  totalStudySessions: number
  totalReviews: number
}

interface BackendDailyBreakdown {
  date: string
  activities: number
}

interface BackendWeeklyTrend {
  weekStart: string
  weekEnd: string
  totalActivities: number
  dailyBreakdown: BackendDailyBreakdown[]
}

interface BackendAchievement {
  id: number
  name: string
  description: string
  unlockedAt: string | null
}

interface BackendQuizProgress {
  quizId: number
  quizTitle: string
  totalAttempts: number
  bestScore: number | null
  averageScore: number | null
  lastAttemptDate: string | null
}

interface BackendDashboardOverview {
  totalStudyTimeToday: number
  totalStudyTimeWeek: number
  totalStudyTimeMonth: number
  cardsReviewedToday: number
  quizzesCompletedToday: number
  streakDays: number
  upcomingExamsCount: number
  pendingReviewsCount: number
}

function mapFlashcardProgress(b: BackendFlashcardProgress): FlashcardProgress {
  return {
    deckId: b.deckId,
    deckName: b.deckName,
    totalCards: b.totalCards,
    masteredCards: b.masteredCount,
    masteryPercentage: b.masteryPercentage,
    lastStudiedAt: b.lastStudiedAt,
  }
}

function mapGlobalStats(
  b: BackendGlobalStats,
  d: BackendDashboardOverview,
  enrolledCourses: number,
): GlobalStats {
  return {
    totalStudyHours: Math.round((b.totalStudySessions * 30) / 60),
    totalCardsReviewed: b.totalReviews,
    totalQuizzesCompleted: b.totalQuizzesPassed,
    averageRetention: Math.round(b.averageQuizScore),
    streakDays: d.streakDays,
    coursesEnrolled: enrolledCourses,
  }
}

function mapWeeklyTrend(b: BackendWeeklyTrend): WeeklyTrend[] {
  const days = b.dailyBreakdown ?? []
  if (days.length === 0) return []
  const reordered = [...days.slice(1), ...days.slice(0, 1)]
  const labels = ['lun', 'mar', 'mié', 'jue', 'vie', 'sáb', 'dom']
  return reordered.map((day, i) => ({
    day: labels[i],
    studyMinutes: day.activities * 30,
    cardsReviewed: Math.round(day.activities * 3),
    quizzesCompleted: Math.max(0, Math.round(day.activities / 2)),
  }))
}

function mapQuizProgress(b: BackendQuizProgress): QuizProgress {
  return {
    quizId: b.quizId,
    quizTitle: b.quizTitle,
    courseName: '',
    attempts: b.totalAttempts,
    bestScore: Math.round(b.bestScore ?? 0),
    averageScore: Math.round(b.averageScore ?? 0),
    lastAttemptDate: b.lastAttemptDate ?? '',
  }
}

function mapAchievement(b: BackendAchievement): Achievement {
  return {
    id: b.id,
    nombre: b.name,
    descripcion: b.description,
    icono: b.id === 1 ? '🃏' : b.id === 2 ? '📝' : '🏆',
    fechaDesbloqueo: b.unlockedAt ?? '',
    progreso: b.unlockedAt ? 100 : 0,
    completado: !!b.unlockedAt,
  }
}

export const progresosService = {
  async getGlobalStats(): Promise<{
    stats: GlobalStats
    overview: BackendDashboardOverview
  }> {
    const [statsRes, overviewRes, coursesRes] = await Promise.all([
      api.get<BackendGlobalStats>(PROGRESOS_API_ROUTES.GLOBAL_STATS),
      api.get<BackendDashboardOverview>('/dashboard/overview'),
      api.get<any[]>('/courses'),
    ])
    const enrolled = Array.isArray(coursesRes.data)
      ? coursesRes.data.filter((c: any) => !c.isArchived).length
      : 0
    return {
      stats: mapGlobalStats(statsRes.data, overviewRes.data, enrolled),
      overview: overviewRes.data,
    }
  },

  async getWeeklyTrend(weeks = 1): Promise<WeeklyTrend[]> {
    const { data } = await api.get<BackendWeeklyTrend>(
      PROGRESOS_API_ROUTES.WEEKLY_TREND,
      { params: { weeks } },
    )
    return mapWeeklyTrend(data)
  },

  async getMasteryTrend(days = 30): Promise<MasteryTrend[]> {
    const { data } = await api.get<MasteryTrend[]>(
      PROGRESOS_API_ROUTES.MONTHLY_TREND,
      { params: { days } },
    )
    return data
  },

  async getFlashcardProgress(): Promise<FlashcardProgress[]> {
    const res = await api.get<BackendFlashcardProgress[]>(
      PROGRESOS_API_ROUTES.FLASHCARD_PROGRESS,
    )
    return (res.data ?? []).map(mapFlashcardProgress)
  },

  async getQuizProgress(): Promise<QuizProgress[]> {
    const { data } = await api.get<BackendQuizProgress[]>(
      PROGRESOS_API_ROUTES.QUIZ_PROGRESS,
    )
    return (data ?? []).map(mapQuizProgress)
  },

  async getGoals(): Promise<Goal[]> {
    const { data } = await api.get<Goal[]>(PROGRESOS_API_ROUTES.GOALS)
    return data
  },

  async getAchievements(): Promise<Achievement[]> {
    const { data } = await api.get<BackendAchievement[]>(
      PROGRESOS_API_ROUTES.ACHIEVEMENTS,
    )
    return (data ?? []).map(mapAchievement)
  },
}
