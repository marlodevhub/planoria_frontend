export interface UpdateCourseDto {
    name?: string
    description?: string
    examDate?: string
    examTime?: string
    colorHex?: string
    isArchived?: boolean
}

export interface CreateCourseDto {
    name: string
    description: string
    examDate: string
    examTime: string
    colorHex?: string
}

export interface Course {
    id: number
    name: string
    colorHex: string
    examDate: string
    progressPercentage: number
    isArchived: boolean
}

export interface CourseDetail {
    id: number
    name: string
    colorHex: string
    examDate: string
    progressPercentage: number
    isArchived: boolean
    description: string
    examTime: string
    totalFlashcards: number
    totalQuizzes: number
    createdAt: string
    updatedAt: string
}

export interface CourseMember {
  id: number
  userId: number
  fullName: string
  email: string
  role: 'owner' | 'editor' | 'viewer'
  joinedAt: string
}

export interface AddMemberDto {
  email: string
  role: 'editor' | 'viewer'
}

export interface UpdateMemberRoleDto {
  role: 'owner' | 'editor' | 'viewer'
}

export interface CourseExam {
  id: number
  title: string
  description: string
  date: string
  time: string
  duration: number
  location: string | null
  createdAt: string
}

export interface CreateExamDto {
  title: string
  description: string
  date: string
  time: string
  duration: number
  location?: string
}

export interface UpdateExamDto {
  title?: string
  description?: string
  date?: string
  time?: string
  duration?: number
  location?: string
}

export interface CourseStats {
  totalFlashcards: number
  totalQuizzes: number
  totalSchedules: number
  totalMembers: number
  averageMastery: number
  studyTimeThisWeek: number
  quizzesCompleted: number
  averageQuizScore: number
  cardsReviewed: number
  streakDays: number
}

export interface CourseExamProgress {
  courseId: number
  courseName: string
  examDate: string
  daysUntilExam: number
  totalFlashcards: number
  reviewedFlashcards: number
  masteryPercentage: number
  quizzesCompleted: number
  averageQuizScore: number
  readinessScore: number
  studyHoursCompleted: number
  studyHoursTarget: number
  weeklyGoalProgress: number
}

export interface ReadinessScore {
  overall: number
  byTopic: Record<string, number>
  predictedScore: number
  confidenceInterval: { low: number; high: number }
}

export interface WeaknessesResponse {
  topics: { topic: string; strength: number; cardCount: number; lastReviewed: string | null }[]
  recommendations: string[]
}