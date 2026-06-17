export interface UploadFileResponse {
  id: number
  originalFilename: string
  fileSize: number
  fileType: string
  uploadStatus: string
  uploadedAt: string
}

export interface FileProcessingStatus {
  fileId: number
  status: 'pending' | 'processing' | 'completed' | 'failed'
  progress: number
  errorMessage: string | null
  startedAt: string
  completedAt: string | null
}

export interface FileHistory {
  files: FileHistoryItem[]
  totalCount: number
  page: number
  pageSize: number
}

export interface FileHistoryItem {
  id: number
  originalFilename: string
  fileSize: number
  fileType: string
  uploadStatus: string
  courseId: number | null
  courseName: string | null
  uploadedAt: string
}
