// import { useMutation, useQueryClient } from '@tanstack/react-query'
// import { flashcardService } from '../services/flashcards.service'
// import type { Deck } from '../types/flashcard.types'

// export function useEditDeck() {
//     const queryClient = useQueryClient()
//     return useMutation({
//         mutationFn: (deck: Deck) => flashcardService.updateDeck(deck),
//         onSuccess: () => queryClient.invalidateQueries({ queryKey: ['decks'] }),
//     })
// }