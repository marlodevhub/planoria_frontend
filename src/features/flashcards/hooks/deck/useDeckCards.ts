import { useQuery } from '@tanstack/react-query'
import { flashcardService } from '../../services/flashcards.service'

export function useDeckCards(deckId: string | undefined) {
    return useQuery({
        queryKey: ['deckCards', deckId],
        queryFn: () => flashcardService.getCardsByDeck(deckId ?? ''),
        enabled: Boolean(deckId),
        staleTime: 1000 * 60 * 5,
    })
}
