import { useQuery } from "@tanstack/react-query";
import { flashcardService } from "../services/flashcardService";
import type { Deck } from "../types/flashcard.types";

export function useDecks() {
  return useQuery<Deck[]>({
    queryKey: ["decks"],
    queryFn: () => flashcardService.getMyDecks(),
  });
}
