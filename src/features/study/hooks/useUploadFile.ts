import { useMutation, useQueryClient } from '@tanstack/react-query'
import { studyService } from '../services/study.service'
import { UploadFileResponse } from '../types/study.types'

export function useUploadFile() {
    const queryClient = useQueryClient()

    return useMutation<UploadFileResponse, Error, File>({
        mutationFn: studyService.uploadDocument,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['decks'] })
        },
        onError: (error: Error) => {
            console.error('Error procesando el documento:', error)
            alert('Hubo un error al procesar tu archivo con la IA.')
        }
    })
}