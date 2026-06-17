import api from '@/lib/axios'
import { USER_API_ROUTES } from '../constants/api'
import type {
  UserProfile,
  UpdateProfileDto,
  UserPreferences,
  UpdatePreferencesDto,
  NotificationSettings,
  UpdateNotificationSettingsDto,
  UserActivity,
  ExportDataResponse,
  DeleteAccountResponse,
  DeactivateAccountResponse,
  AvatarUploadResponse,
} from '../types/user.types'

export const userService = {
  async getProfile(): Promise<UserProfile> {
    const { data } = await api.get<UserProfile>(USER_API_ROUTES.PROFILE)
    return data
  },

  async updateProfile(dto: UpdateProfileDto): Promise<UserProfile> {
    const { data } = await api.put<UserProfile>(USER_API_ROUTES.UPDATE_PROFILE, dto)
    return data
  },

  async updateAvatar(file: File): Promise<AvatarUploadResponse> {
    const formData = new FormData()
    formData.append('avatar', file)
    const { data } = await api.post<AvatarUploadResponse>(
      USER_API_ROUTES.UPDATE_AVATAR,
      formData,
      { headers: { 'Content-Type': 'multipart/form-data' } },
    )
    return data
  },

  async getPreferences(): Promise<UserPreferences> {
    const { data } = await api.get<UserPreferences>(USER_API_ROUTES.PREFERENCES)
    return data
  },

  async updatePreferences(dto: UpdatePreferencesDto): Promise<UserPreferences> {
    const { data } = await api.put<UserPreferences>(
      USER_API_ROUTES.UPDATE_PREFERENCES,
      dto,
    )
    return data
  },

  async getNotificationSettings(): Promise<NotificationSettings> {
    const { data } = await api.get<NotificationSettings>(
      USER_API_ROUTES.NOTIFICATION_SETTINGS,
    )
    return data
  },

  async updateNotificationSettings(
    dto: UpdateNotificationSettingsDto,
  ): Promise<NotificationSettings> {
    const { data } = await api.put<NotificationSettings>(
      USER_API_ROUTES.UPDATE_NOTIFICATION_SETTINGS,
      dto,
    )
    return data
  },

  async getActivity(limit = 20): Promise<UserActivity[]> {
    const { data } = await api.get<UserActivity[]>(USER_API_ROUTES.ACTIVITY, {
      params: { limit },
    })
    return data
  },

  async exportData(): Promise<ExportDataResponse> {
    const { data } = await api.post<ExportDataResponse>(USER_API_ROUTES.EXPORT_DATA)
    return data
  },

  async deleteAccount(password: string): Promise<DeleteAccountResponse> {
    const { data } = await api.post<DeleteAccountResponse>(
      USER_API_ROUTES.DELETE_ACCOUNT,
      { password },
    )
    return data
  },

  async deactivateAccount(password: string): Promise<DeactivateAccountResponse> {
    const { data } = await api.post<DeactivateAccountResponse>(
      USER_API_ROUTES.DEACTIVATE_ACCOUNT,
      { password },
    )
    return data
  },
}
