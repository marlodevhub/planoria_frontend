export interface Schedule {
  id: number
  title: string
  startDateTime: string
  endDateTime: string
  isCompleted: boolean
  completedAt: string | null
  totalDurationMinutes: number
  courseIds: number[]
  intervals: IntervalDto[]
  content: ScheduleContentResponseDto[]
  courseName?: string
}

export interface ScheduleListItem {
  id: number
  title: string
  startDateTime: string
  endDateTime: string
  isCompleted: boolean
  progressPercentage: number
  courseName: string
}

export interface IntervalDto {
  id: number
  intervalType: string
  durationMinutes: number
  orderPosition: number
  startedAt: string | null
  endedAt: string | null
  isCompleted: boolean
}

export interface ScheduleContentResponseDto {
  id: number
  contentType: string
  contentId: number
  contentName: string
  estimatedMinutes: number
  completed: boolean
  completedAt: string | null
}

export interface CreateScheduleRequest {
  title: string
  startDateTime: string
  endDateTime: string
  courseIds: number[]
  intervals?: CreateIntervalRequestDto[]
  content?: ScheduleContentRequestDto[]
}

export interface CreateIntervalRequestDto {
  intervalType: string
  durationMinutes: number
  orderPosition: number
}

export interface ScheduleContentRequestDto {
  scheduleId?: number
  contentType: string
  contentId: number
  estimatedMinutes: number
}

export interface UpdateScheduleRequest {
  title?: string
  startDateTime?: string
  endDateTime?: string
  isCompleted?: boolean
}

export interface ScheduleRecommendation {
  recommendedStartTime: string
  recommendedDuration: number
  suggestedContent: string[]
  priority: string
  reason: string
}

export interface AutoScheduleRequest {
  courseId: number
  studyHoursPerDay: number
  preferredStartTime: string
  preferredEndTime: string
  daysOfWeek: number[]
  prioritizeExam: boolean
}

export interface AutoScheduleResponse {
  generatedSchedules: Schedule[]
  totalHours: number
  recommendedAdjustments: string[]
  conflicts: string[]
}

export interface ScheduleContentItem {
  id: number
  contentType: string
  contentId: number
  contentName: string
  estimatedMinutes: number
  completed: boolean
  completedAt: string | null
}

export interface CreateScheduleContentDto {
  contentId: number
  contentType: string
  estimatedMinutes: number
}

export interface UpdateScheduleContentDto {
  contentType?: string
  estimatedMinutes?: number
  completed?: boolean
}

export interface AutoAssignRequest {
  courseId: number
  daysBeforeExam: number
}

export interface ScheduleSuggestion {
  contentId: number
  title: string
  suggestedDate: string
  suggestedDuration: number
  reason: string
  priority: number
}

export interface ScheduleContentListResponse {
  contents: ScheduleContentItem[]
  totalDuration: number
  totalCompleted: number
}

export interface CalendarDay {
  date: string
  schedules: ScheduleListItem[]
}

export interface CalendarWeek {
  days: CalendarDay[]
}
