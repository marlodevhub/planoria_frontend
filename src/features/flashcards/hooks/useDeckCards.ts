import { useQuery } from "@tanstack/react-query";
import { flashcardService } from "../services/flashcardService";

export function useDeckCards(deckId: number, page = 1, pageSize = 50) {
  return useQuery({
    queryKey: ["flashcards", deckId, page, pageSize],
    queryFn: () => flashcardService.getCardsByDeck(deckId, page, pageSize),
    enabled: !!deckId,
  });
}
