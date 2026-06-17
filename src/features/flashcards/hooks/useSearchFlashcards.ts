import { useQuery } from "@tanstack/react-query";
import { flashcardService } from "../services/flashcardService";
import type { SearchFlashcardsDto } from "../types/flashcard.types";

export function useSearchFlashcards(dto: SearchFlashcardsDto) {
  return useQuery({
    queryKey: ["flashcards", "search", dto],
    queryFn: () => flashcardService.searchCards(dto),
    enabled: !!dto.query || !!dto.deckId || !!dto.courseId,
    staleTime: 30 * 1000,
  });
}
