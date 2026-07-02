import api from '@/lib/axios'

export interface UserProfile {
  id: number
  fullName: string
  email: string
  avatar: string | null
  rol: 'admin' | 'student'
}

export const userService = {
  async getProfile(): Promise<UserProfile> {
    const { data } = await api.get<UserProfile>('/user/profile')
    return data
  },

  async updateProfile(data: { fullName: string }): Promise<UserProfile> {
    const { data: res } = await api.put<UserProfile>('/user/profile', data)
    return res
  },

  async uploadAvatar(file: File): Promise<{ avatarUrl: string }> {
    const formData = new FormData()
    formData.append('file', file)
    const { data } = await api.post<{ avatarUrl: string }>('/user/avatar', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    })
    return data
  },
}
