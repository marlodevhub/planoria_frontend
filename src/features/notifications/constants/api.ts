export const NOTIFICATION_API_ROUTES = {
  LIST: '/notifications',
  UNREAD_COUNT: '/notifications/unread-count',
  MARK_READ: (id: number) => `/notifications/${id}/read`,
  MARK_ALL_READ: '/notifications/read-all',
  DELETE: (id: number) => `/notifications/${id}`,
  SETTINGS: '/notifications/settings',
  UPDATE_SETTINGS: '/notifications/settings',
  REGISTER_DEVICE: '/notifications/devices',
  UNREGISTER_DEVICE: (id: number) => `/notifications/devices/${id}`,
  EMAIL_LOGS: '/notifications/email-logs',
} as const
