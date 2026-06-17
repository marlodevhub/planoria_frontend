import { useMutation, useQueryClient } from "@tanstack/react-query";
import { flashcardService } from "../services/flashcardService";
import type { CreateDeckDto } from "../types/flashcard.types";

export function useCreateDeck() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (dto: CreateDeckDto) => flashcardService.createDeck(dto),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["decks"] });
    },
  });
}
