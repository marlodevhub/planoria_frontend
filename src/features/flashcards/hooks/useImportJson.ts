import { useMutation, useQueryClient } from "@tanstack/react-query";
import { flashcardService } from "../services/flashcardService";

export function useImportJson(deckId: number) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (file: File) => flashcardService.importJson(deckId, file),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["flashcards", deckId] });
    },
  });
}
