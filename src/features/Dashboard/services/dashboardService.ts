import api from '@/lib/axios'
import { DASHBOARD_API_ROUTES } from '../constants/api'
import type {
  DashboardOverview,
  ActivityItem,
  UpcomingDeadline,
  MetricCardData,
  ChartData,
  HeatmapData,
  DistributionData,
} from '../types/dashboard.types'

export const dashboardService = {
  async getOverview(): Promise<DashboardOverview> {
    const { data } = await api.get<DashboardOverview>(DASHBOARD_API_ROUTES.OVERVIEW)
    return data
  },

  async getRecentActivity(limit = 20): Promise<ActivityItem[]> {
    const { data } = await api.get<ActivityItem[]>(DASHBOARD_API_ROUTES.ACTIVITY, {
      params: { limit },
    })
    return data
  },

  async getUpcomingDeadlines(days = 30): Promise<UpcomingDeadline[]> {
    const { data } = await api.get<UpcomingDeadline[]>(DASHBOARD_API_ROUTES.DEADLINES, {
      params: { days },
    })
    return data
  },

  async getStudyTime(period = 'today'): Promise<MetricCardData> {
    const { data } = await api.get<MetricCardData>(DASHBOARD_API_ROUTES.METRICS_STUDY_TIME, {
      params: { period },
    })
    return data
  },

  async getCardsReviewed(period = 'today'): Promise<MetricCardData> {
    const { data } = await api.get<MetricCardData>(DASHBOARD_API_ROUTES.METRICS_CARDS_REVIEWED, {
      params: { period },
    })
    return data
  },

  async getQuizzesCompleted(period = 'today'): Promise<MetricCardData> {
    const { data } = await api.get<MetricCardData>(DASHBOARD_API_ROUTES.METRICS_QUIZZES_COMPLETED, {
      params: { period },
    })
    return data
  },

  async getProgressChart(courseId?: number, period = 'week'): Promise<ChartData> {
    const { data } = await api.get<ChartData>(DASHBOARD_API_ROUTES.CHARTS_PROGRESS, {
      params: { courseId, period },
    })
    return data
  },

  async getHeatmapData(year?: number): Promise<HeatmapData> {
    const { data } = await api.get<HeatmapData>(DASHBOARD_API_ROUTES.CHARTS_HEATMAP, {
      params: { year },
    })
    return data
  },

  async getDistributionData(courseId?: number): Promise<DistributionData> {
    const { data } = await api.get<DistributionData>(DASHBOARD_API_ROUTES.CHARTS_DISTRIBUTION, {
      params: { courseId },
    })
    return data
  },
}
