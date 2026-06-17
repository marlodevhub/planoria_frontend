import { useMutation, useQueryClient } from "@tanstack/react-query";
import { flashcardService } from "../../services/flashcardService";

// Finaliza la sesión e invalida los mazos para reflejar el progreso
export function useEndSession() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (sessionId: number) => flashcardService.endSession(sessionId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["decks"] });
      queryClient.invalidateQueries({ queryKey: ["deck"] });
    },
  });
}
