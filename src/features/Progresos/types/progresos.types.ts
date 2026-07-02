export interface GlobalStats {
  totalStudyHours: number
  totalCardsReviewed: number
  totalQuizzesCompleted: number
  averageRetention: number
  streakDays: number
  coursesEnrolled: number
}

export interface WeeklyTrend {
  day: string
  studyMinutes: number
  cardsReviewed: number
  quizzesCompleted: number
}

export interface MasteryTrend {
  date: string
  overallMastery: number
  byTopic: Record<string, number>
}

export interface FlashcardProgress {
  deckId: number
  deckName: string
  totalCards: number
  masteredCards: number
  masteryPercentage: number
  lastStudiedAt: string | null
}

export interface BackendFlashcardProgress {
  deckId: number
  deckName: string
  totalCards: number
  studiedCount: number
  masteredCount: number
  learningCount: number
  notStartedCount: number
  masteryPercentage: number
  lastStudiedAt: string | null
}

export interface QuizProgress {
  quizId: number
  quizTitle: string
  courseName: string
  attempts: number
  bestScore: number
  averageScore: number
  lastAttemptDate: string
}

export interface Goal {
  id: number
  titulo: string
  descripcion: string
  tipo: string
  meta: number
  progreso: number
  fechaInicio: string
  fechaFin: string
  completada: boolean
}

export interface Achievement {
  id: number
  nombre: string
  descripcion: string
  icono: string
  fechaDesbloqueo: string
  progreso: number
  completado: boolean
}
