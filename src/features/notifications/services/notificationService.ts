import api from '@/lib/axios'
import { NOTIFICATION_API_ROUTES } from '../constants/api'
import type {
  Notification,
  NotificationListResponse,
  UnreadCountResponse,
  PushDevice,
  RegisterDeviceDto,
  NotificationSettings,
  EmailLog,
} from '../types/notification.types'

export const notificationService = {
  async getAll(page = 1, pageSize = 20): Promise<NotificationListResponse> {
    const { data } = await api.get<NotificationListResponse>(
      NOTIFICATION_API_ROUTES.LIST,
      { params: { page, pageSize } },
    )
    return data
  },

  async getUnreadCount(): Promise<UnreadCountResponse> {
    const { data } = await api.get<UnreadCountResponse>(
      NOTIFICATION_API_ROUTES.UNREAD_COUNT,
    )
    return data
  },

  async markAsRead(id: number): Promise<void> {
    await api.patch(NOTIFICATION_API_ROUTES.MARK_READ(id))
  },

  async markAllAsRead(): Promise<void> {
    await api.patch(NOTIFICATION_API_ROUTES.MARK_ALL_READ)
  },

  async delete(id: number): Promise<void> {
    await api.delete(NOTIFICATION_API_ROUTES.DELETE(id))
  },

  async getSettings(): Promise<NotificationSettings> {
    const { data } = await api.get<NotificationSettings>(
      NOTIFICATION_API_ROUTES.SETTINGS,
    )
    return data
  },

  async updateSettings(
    dto: Partial<NotificationSettings>,
  ): Promise<NotificationSettings> {
    const { data } = await api.put<NotificationSettings>(
      NOTIFICATION_API_ROUTES.UPDATE_SETTINGS,
      dto,
    )
    return data
  },

  async registerDevice(dto: RegisterDeviceDto): Promise<PushDevice> {
    const { data } = await api.post<PushDevice>(
      NOTIFICATION_API_ROUTES.REGISTER_DEVICE,
      dto,
    )
    return data
  },

  async unregisterDevice(id: number): Promise<void> {
    await api.delete(NOTIFICATION_API_ROUTES.UNREGISTER_DEVICE(id))
  },

  async getEmailLogs(limit = 50): Promise<EmailLog[]> {
    const { data } = await api.get<EmailLog[]>(
      NOTIFICATION_API_ROUTES.EMAIL_LOGS,
      { params: { limit } },
    )
    return data
  },
}
