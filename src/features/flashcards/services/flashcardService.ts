import api from "@/lib/axios";
import type {
  UploadFileDto,
  UploadFileResponse,
  GenerateFlashcardsDto,
  GenerateFlashcardsResponse,
  Deck,
} from "../types/flashcard.types";

const ROUTES = {
  UPLOAD: "/files/upload",
  GENERATE: "/ai/generate/flashcards",
  MY_DECKS: "/decks/my",
} as const;

export const flashcardService = {
  async uploadFile(dto: UploadFileDto): Promise<UploadFileResponse> {
    const formData = new FormData();
    formData.append("courseId", String(dto.courseId));
    formData.append("file", dto.file);
    const { data } = await api.post<UploadFileResponse>(
      ROUTES.UPLOAD,
      formData,
      {
        headers: { "Content-Type": "multipart/form-data" },
      },
    );
    return data;
  },

  async generate(
    dto: GenerateFlashcardsDto,
  ): Promise<GenerateFlashcardsResponse> {
    const { data } = await api.post<GenerateFlashcardsResponse>(
      ROUTES.GENERATE,
      dto,
    );
    return data;
  },

  async getMyDecks(): Promise<Deck[]> {
    const { data } = await api.get<Deck[]>(ROUTES.MY_DECKS);
    return data;
  },
};
