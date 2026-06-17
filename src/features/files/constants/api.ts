export const FILE_API_ROUTES = {
  UPLOAD: '/files/upload',
  LIST: '/files',
  HISTORY: '/files/history',
  STATUS: (id: number) => `/files/${id}/status`,
  DELETE: (id: number) => `/files/${id}`,
  DOWNLOAD: (id: number) => `/files/${id}/download`,
} as const
