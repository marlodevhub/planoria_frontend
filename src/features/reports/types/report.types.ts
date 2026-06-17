export interface StudyReport {
  totalStudyTime: number
  studyTimeByDay: { date: string; minutes: number }[]
  totalCardsReviewed: number
  cardsReviewedByDay: { date: string; count: number }[]
  totalQuizzesCompleted: number
  averageQuizScore: number
  streakDays: number
  periodStart: string
  periodEnd: string
}

export interface StudyReportDto {
  periodStart: string
  periodEnd: string
  courseId?: number
}

export interface PerformanceReport {
  overallMastery: number
  masteryByCourse: { courseId: number; courseName: string; mastery: number }[]
  weakestTopics: { topic: string; score: number }[]
  strongestTopics: { topic: string; score: number }[]
  quizPerformance: { quizId: number; title: string; averageScore: number }[]
  recommendations: string[]
}

export interface CustomReport {
  id: number
  name: string
  type: 'study' | 'performance' | 'progress' | 'custom'
  config: string
  createdAt: string
  lastGenerated: string | null
}

export interface ReportTemplate {
  id: number
  name: string
  description: string
  type: string
  isDefault: boolean
  config: string
}

export interface GenerateReportResponse {
  reportId: number
  status: 'pending' | 'completed' | 'failed'
  downloadUrl: string | null
  createdAt: string
}
