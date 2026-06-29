export interface DashboardOverview {
  totalStudyTimeToday: number
  totalStudyTimeWeek: number
  totalStudyTimeMonth: number
  cardsReviewedToday: number
  quizzesCompletedToday: number
  streakDays: number
  upcomingExamsCount: number
  pendingReviewsCount: number
}

export interface ActivityItem {
  type: string
  title: string
  courseName: string
  timestamp: string
  action: string
  metadata: string
}

export interface UpcomingDeadline {
  type: string
  title: string
  courseName: string
  dueDate: string
  daysRemaining: number
  urgency: string
}

export interface MetricCardData {
  title: string
  value: number
  change: number
  changeType: string
  icon: string
  color: string
}

export interface ChartDataset {
  label: string
  data: number[]
  backgroundColor: string
  borderColor: string
  fill: boolean
}

export interface ChartData {
  labels: string[]
  datasets: ChartDataset[]
}

export interface HeatmapDay {
  date: string
  intensity: number
}

export interface HeatmapData {
  year: number
  days: HeatmapDay[]
  totalActivity: number
}

export interface DistributionData {
  labels: string[]
  values: number[]
  total: number
}
