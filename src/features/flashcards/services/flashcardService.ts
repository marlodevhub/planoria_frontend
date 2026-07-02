import api from "@/lib/axios";

import type {
  UploadFileDto,
  UploadFileResponse,
  GenerateFlashcardsDto,
  GenerateFlashcardsResponse,
  Deck,
  DeckDetail,
  Flashcard,
  StartStudySessionDto,
  StudySession,
  NextCard,
  SubmitAnswerDto,
} from "../types/flashcard.types";

const ROUTES = {
  UPLOAD: "/files/upload",
  GENERATE: "/ai/generate/flashcards",
  MY_DECKS: "/decks/my",
} as const;

export const flashcardService = {
  // [POST] /files/upload — sube un PDF asociado a un curso
  async uploadFile(dto: UploadFileDto): Promise<UploadFileResponse> {
    const formData = new FormData();
    formData.append("courseId", String(dto.courseId));
    formData.append("file", dto.file);
    const { data } = await api.post<UploadFileResponse>(
      ROUTES.UPLOAD,
      formData,
      { headers: { "Content-Type": "multipart/form-data" } },
    );
    return data;
  },

  // [POST] /ai/generate/flashcards — genera flashcards con IA a partir de un archivo
  async generate(
    dto: GenerateFlashcardsDto,
  ): Promise<GenerateFlashcardsResponse> {
    const { data } = await api.post<GenerateFlashcardsResponse>(
      ROUTES.GENERATE,
      dto,
    );
    return data;
  },

  // [GET] /decks/my — obtiene todos los mazos del usuario autenticado
  async getMyDecks(): Promise<Deck[]> {
    const { data } = await api.get<Deck[]>(ROUTES.MY_DECKS);
    return data;
  },

  // [GET] /decks/:id — obtiene el detalle completo de un mazo por su ID
  async getDeckById(id: number): Promise<DeckDetail> {
    const { data } = await api.get<DeckDetail>(`/decks/${id}`);
    return data;
  },

  // [GET] /decks/:id/cards — obtiene todas las tarjetas de un mazo
  async getDeckCards(deckId: number): Promise<Flashcard[]> {
    const { data } = await api.get<Flashcard[]>(`/decks/${deckId}/cards`);
    return data;
  },

  // [DELETE] /decks/:id — elimina un mazo permanentemente
  async deleteDeck(id: number): Promise<void> {
    await api.delete(`/decks/${id}`);
  },

  //### Seccion de estudio

  // [POST] /study/sessions — inicia una sesión de estudio
  async startSession(dto: StartStudySessionDto): Promise<StudySession> {
    const { data } = await api.post<StudySession>("/study/sessions", {
      deckId: dto.deckId,
      sessionType: dto.sessionType,
      includeCards: [],
    });
    return data;
  },
  // [GET] /study/sessions/:id/next — obtiene la siguiente tarjeta
  async getNextCard(sessionId: number): Promise<NextCard> {
    const { data } = await api.get<NextCard>(
      `/study/sessions/${sessionId}/next`,
    );
    return data;
  },

  // [POST] /study/sessions/:id/answer — registra si sabía o no la tarjeta
  async submitAnswer(sessionId: number, dto: SubmitAnswerDto): Promise<void> {
    await api.post(`/study/sessions/${sessionId}/answer`, dto);
  },

  // [POST] /study/sessions/:id/end — finaliza la sesión y devuelve stats
  async endSession(sessionId: number): Promise<StudySession> {
    const { data } = await api.post<StudySession>(
      `/study/sessions/${sessionId}/end`,
    );
    return data;
  },
};
