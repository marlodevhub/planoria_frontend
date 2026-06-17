export const SYSTEM_API_ROUTES = {
  STATUS: '/system/status',
  HEALTH: '/system/health',
  CONFIG: '/system/config',
  CONFIG_BY_KEY: (key: string) => `/system/config/${key}`,
  METRICS: '/system/metrics',
  CACHE: '/system/cache',
  CLEAR_CACHE: '/system/cache/clear',
  LOGS: '/system/logs',
} as const
