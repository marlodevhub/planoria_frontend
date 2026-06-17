import api from '@/lib/axios'
import { FILE_API_ROUTES } from '../constants/api'
import type {
  UploadFileResponse,
  FileProcessingStatus,
  FileHistory,
} from '../types/files.types'

export const fileService = {
  async upload(courseId: number, file: File): Promise<UploadFileResponse> {
    const formData = new FormData()
    formData.append('courseId', String(courseId))
    formData.append('file', file)
    const { data } = await api.post<UploadFileResponse>(
      FILE_API_ROUTES.UPLOAD,
      formData,
      { headers: { 'Content-Type': 'multipart/form-data' } },
    )
    return data
  },

  async getAll(): Promise<FileHistory> {
    const { data } = await api.get<FileHistory>(FILE_API_ROUTES.LIST)
    return data
  },

  async getHistory(page = 1, pageSize = 20): Promise<FileHistory> {
    const { data } = await api.get<FileHistory>(FILE_API_ROUTES.HISTORY, {
      params: { page, pageSize },
    })
    return data
  },

  async getStatus(id: number): Promise<FileProcessingStatus> {
    const { data } = await api.get<FileProcessingStatus>(
      FILE_API_ROUTES.STATUS(id),
    )
    return data
  },

  async delete(id: number): Promise<void> {
    await api.delete(FILE_API_ROUTES.DELETE(id))
  },

  async download(id: number): Promise<Blob> {
    const { data } = await api.get<Blob>(FILE_API_ROUTES.DOWNLOAD(id), {
      responseType: 'blob',
    })
    return data
  },
}
