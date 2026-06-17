import { useQuery } from '@tanstack/react-query'
import { reportService } from '../services/reportService'
import type { StudyReportDto } from '../types/report.types'

export function useStudyReport(dto: StudyReportDto) {
  return useQuery({
    queryKey: ['reports', 'study', dto],
    queryFn: () => reportService.getStudyReport(dto),
    staleTime: 5 * 60 * 1000,
    enabled: !!dto.periodStart && !!dto.periodEnd,
  })
}
