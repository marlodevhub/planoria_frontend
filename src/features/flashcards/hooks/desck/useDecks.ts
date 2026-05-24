import { useQuery } from '@tanstack/react-query'
import { flashcardService } from '../../services/flashcards.service'

export function useDecks() {
    return useQuery({
        queryKey: ['decks'],
        queryFn: flashcardService.getDecks,
    })
}