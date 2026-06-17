export const REPORT_API_ROUTES = {
  STUDY_REPORT: '/reports/study',
  PERFORMANCE_REPORT: '/reports/performance',
  CUSTOM_REPORT: '/reports/custom',
  TEMPLATES: '/reports/templates',
  GENERATE: '/reports/generate',
  EXPORT: (reportId: number) => `/reports/${reportId}/export`,
  BY_ID: (reportId: number) => `/reports/${reportId}`,
} as const
