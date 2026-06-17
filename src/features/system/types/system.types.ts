export interface SystemStatus {
  status: 'healthy' | 'degraded' | 'down'
  uptime: string
  version: string
  environment: string
  lastRestart: string
}

export interface HealthCheckResponse {
  status: 'healthy' | 'degraded' | 'unhealthy'
  database: 'connected' | 'disconnected'
  aiService: 'available' | 'unavailable'
  storage: 'ok' | 'error'
  lastChecked: string
}

export interface SystemConfig {
  id: number
  key: string
  value: string
  description: string
  updatedAt: string
}

export interface UpdateSystemConfigDto {
  value: string
}

export interface SystemMetrics {
  activeUsers: number
  totalCourses: number
  totalFlashcards: number
  totalQuizzes: number
  apiRequestsLastHour: number
  averageResponseTime: number
  storageUsed: string
  storageLimit: string
}

export interface CacheStats {
  totalCachedItems: number
  cacheSize: string
  hitRate: number
  missRate: number
  oldestCacheEntry: string
}

export interface LogEntry {
  id: number
  timestamp: string
  level: 'info' | 'warning' | 'error' | 'debug'
  source: string
  message: string
  details: string | null
}
