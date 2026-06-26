export interface UserProfile {
  id: number
  email: string
  fullName: string
  avatar: string | null
  role: string
  isActive: boolean
  createdAt: string
  updatedAt: string
}

export interface UpdateProfileDto {
  fullName: string
  bio?: string
  avatar?: string
  timezone?: string
}

export interface UserPreferences {
  id: number
  language: string
  theme: 'light' | 'dark' | 'system'
  timezone: string
  emailNotifications: boolean
  pushNotifications: boolean
  weeklyDigest: boolean
  studyReminders: boolean
  reminderTime: string
}

export interface UpdatePreferencesDto {
  language?: string
  theme?: 'light' | 'dark' | 'system'
  timezone?: string
  emailNotifications?: boolean
  pushNotifications?: boolean
  weeklyDigest?: boolean
  studyReminders?: boolean
  reminderTime?: string
}

export interface NotificationSettings {
  id: number
  emailNotifications: boolean
  pushNotifications: boolean
  weeklyDigest: boolean
  studyReminders: boolean
  reminderTime: string
  marketingEmails: boolean
  courseUpdates: boolean
  achievementAlerts: boolean
}

export interface UpdateNotificationSettingsDto {
  emailNotifications?: boolean
  pushNotifications?: boolean
  weeklyDigest?: boolean
  studyReminders?: boolean
  reminderTime?: string
  marketingEmails?: boolean
  courseUpdates?: boolean
  achievementAlerts?: boolean
}

export interface UserActivity {
  id: number
  action: string
  entityType: string
  entityId: number
  metadata: string | null
  createdAt: string
}

export interface ExportDataResponse {
  exportId: number
  status: string
  downloadUrl: string
  expiresAt: string
  createdAt: string
}

export interface DeleteAccountResponse {
  success: boolean
  message: string
  deletionDate: string
}

export interface DeactivateAccountResponse {
  success: boolean
  message: string
  reactivationToken: string
}

export interface AvatarUploadResponse {
  avatarUrl: string
}
