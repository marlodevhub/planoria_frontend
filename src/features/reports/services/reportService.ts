import api from '@/lib/axios'
import { REPORT_API_ROUTES } from '../constants/api'
import type {
  StudyReport,
  StudyReportDto,
  PerformanceReport,
  CustomReport,
  ReportTemplate,
  GenerateReportResponse,
} from '../types/report.types'

export const reportService = {
  async getStudyReport(dto: StudyReportDto): Promise<StudyReport> {
    const { data } = await api.get<StudyReport>(REPORT_API_ROUTES.STUDY_REPORT, {
      params: dto,
    })
    return data
  },

  async getPerformanceReport(courseId?: number): Promise<PerformanceReport> {
    const { data } = await api.get<PerformanceReport>(
      REPORT_API_ROUTES.PERFORMANCE_REPORT,
      { params: { courseId } },
    )
    return data
  },

  async getCustomReports(): Promise<CustomReport[]> {
    const { data } = await api.get<CustomReport[]>(REPORT_API_ROUTES.CUSTOM_REPORT)
    return data
  },

  async getTemplates(): Promise<ReportTemplate[]> {
    const { data } = await api.get<ReportTemplate[]>(REPORT_API_ROUTES.TEMPLATES)
    return data
  },

  async generateReport(templateId: number, config?: Record<string, unknown>): Promise<GenerateReportResponse> {
    const { data } = await api.post<GenerateReportResponse>(
      REPORT_API_ROUTES.GENERATE,
      { templateId, config },
    )
    return data
  },

  async getReport(id: number): Promise<CustomReport> {
    const { data } = await api.get<CustomReport>(REPORT_API_ROUTES.BY_ID(id))
    return data
  },

  async exportReport(reportId: number): Promise<Blob> {
    const { data } = await api.get<Blob>(REPORT_API_ROUTES.EXPORT(reportId), {
      responseType: 'blob',
    })
    return data
  },
}
