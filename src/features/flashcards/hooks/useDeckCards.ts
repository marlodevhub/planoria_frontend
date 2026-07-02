import { useQuery } from "@tanstack/react-query";
import { flashcardService } from "../services/flashcardService";
import type { Flashcard } from "../types/flashcard.types";

// Obtiene todas las tarjetas de un mazo
export function useDeckCards(deckId: number) {
  return useQuery<Flashcard[]>({
    queryKey: ["deck-cards", deckId],
    queryFn: () => flashcardService.getDeckCards(deckId),
    enabled: !!deckId,
  });
}
