export interface Notification {
  id: number
  type: string
  title: string
  message: string
  isRead: boolean
  entityType: string | null
  entityId: number | null
  createdAt: string
}

export interface NotificationListResponse {
  notifications: Notification[]
  totalCount: number
  unreadCount: number
  page: number
  pageSize: number
}

export interface UnreadCountResponse {
  unreadCount: number
}

export interface PushDevice {
  id: number
  deviceToken: string
  platform: 'ios' | 'android' | 'web'
  isActive: boolean
  lastUsed: string
  createdAt: string
}

export interface RegisterDeviceDto {
  deviceToken: string
  platform: 'ios' | 'android' | 'web'
}

export interface NotificationSettings {
  emailNotifications: boolean
  pushNotifications: boolean
  studyReminders: boolean
  reminderTime: string
  marketingEmails: boolean
  courseUpdates: boolean
  achievementAlerts: boolean
}

export interface EmailLog {
  id: number
  recipient: string
  subject: string
  status: 'sent' | 'failed' | 'pending'
  sentAt: string
  error: string | null
}
