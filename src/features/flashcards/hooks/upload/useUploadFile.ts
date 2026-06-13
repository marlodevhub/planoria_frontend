import { useMutation, useQueryClient } from '@tanstack/react-query'
import { flashcardService } from '../../services/flashcards.service'
import type { UploadFileResponse } from '../../types/flashcard.types'

export function useUploadFile() {
    const queryClient = useQueryClient()

    return useMutation<UploadFileResponse, Error, File>({
        mutationFn: flashcardService.uploadDocument,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['decks'] })
        },
        onError: (error: Error) => {
            console.error('Error procesando el documento:', error)
            alert('Hubo un error al procesar tu archivo con la IA.')
        },
    })
}
