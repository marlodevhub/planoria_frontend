import { useMutation } from '@tanstack/react-query'
import { userService } from '../services/userService'

export function useExportData() {
  return useMutation({
    mutationFn: () => userService.exportData(),
  })
}
