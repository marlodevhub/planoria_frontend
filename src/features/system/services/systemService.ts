import api from '@/lib/axios'
import { SYSTEM_API_ROUTES } from '../constants/api'
import type {
  SystemStatus,
  HealthCheckResponse,
  SystemConfig,
  UpdateSystemConfigDto,
  SystemMetrics,
  CacheStats,
  LogEntry,
} from '../types/system.types'

export const systemService = {
  async getStatus(): Promise<SystemStatus> {
    const { data } = await api.get<SystemStatus>(SYSTEM_API_ROUTES.STATUS)
    return data
  },

  async healthCheck(): Promise<HealthCheckResponse> {
    const { data } = await api.get<HealthCheckResponse>(SYSTEM_API_ROUTES.HEALTH)
    return data
  },

  async getConfig(): Promise<SystemConfig[]> {
    const { data } = await api.get<SystemConfig[]>(SYSTEM_API_ROUTES.CONFIG)
    return data
  },

  async getConfigByKey(key: string): Promise<SystemConfig> {
    const { data } = await api.get<SystemConfig>(
      SYSTEM_API_ROUTES.CONFIG_BY_KEY(key),
    )
    return data
  },

  async updateConfig(key: string, dto: UpdateSystemConfigDto): Promise<SystemConfig> {
    const { data } = await api.put<SystemConfig>(
      SYSTEM_API_ROUTES.CONFIG_BY_KEY(key),
      dto,
    )
    return data
  },

  async getMetrics(): Promise<SystemMetrics> {
    const { data } = await api.get<SystemMetrics>(SYSTEM_API_ROUTES.METRICS)
    return data
  },

  async getCacheStats(): Promise<CacheStats> {
    const { data } = await api.get<CacheStats>(SYSTEM_API_ROUTES.CACHE)
    return data
  },

  async clearCache(): Promise<void> {
    await api.post(SYSTEM_API_ROUTES.CLEAR_CACHE)
  },

  async getLogs(level?: string, source?: string, limit = 100): Promise<LogEntry[]> {
    const { data } = await api.get<LogEntry[]>(SYSTEM_API_ROUTES.LOGS, {
      params: { level, source, limit },
    })
    return data
  },
}
