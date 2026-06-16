import { useMutation } from "@tanstack/react-query";
import { flashcardService } from "../services/flashcardService";
import type { UploadFileDto } from "../types/flashcard.types";

export function useUploadFile() {
  return useMutation({
    mutationFn: (dto: UploadFileDto) => flashcardService.uploadFile(dto),
  });
}
