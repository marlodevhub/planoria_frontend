import { useMutation, useQueryClient } from "@tanstack/react-query";
import { flashcardService } from "../services/flashcardService";

export function useDuplicateDeck() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => flashcardService.duplicateDeck(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["decks"] });
    },
  });
}
