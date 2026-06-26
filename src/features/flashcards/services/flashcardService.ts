import api from "@/lib/axios";
import { FLASHCARD_API_ROUTES } from "../constants/api";
import type {
  UploadFileDto,
  UploadFileResponse,
  GenerateFlashcardsDto,
  GenerateFlashcardsResponse,
  Deck,
  DeckDetail,
  CreateDeckDto,
  UpdateDeckDto,
  Flashcard,
  CreateFlashcardDto,
  UpdateFlashcardDto,
  PaginatedFlashcards,
  SearchFlashcardsDto,
  ImportFlashcardsDto,
  ReorderCardsDto,
  FlashcardProgress,
  DeckMastery,
  BulkCreateFlashcardsDto,
  BulkUpdateFlashcardsDto,
  CourseFlashcardProgress,
  DeckPredictions,
  DeckTimeline,
} from "../types/flashcard.types";

interface BackendFlashcardResponse {
  id: number;
  question: string;
  answer: string;
  hint: string | null;
  difficulty: string;
  tags: string[] | null;
  position: number;
  isActive: boolean;
  deckId: number;
  lastReviewedAt: string | null;
  nextReviewDate: string | null;
  repetitionCount: number;
  easeFactor: number;
}

function mapFlashcard(fc: BackendFlashcardResponse): Flashcard {
  return {
    id: fc.id,
    question: fc.question,
    answer: fc.answer,
    hint: fc.hint,
    difficulty: fc.difficulty as 'easy' | 'medium' | 'hard',
    tags: fc.tags ?? [],
    deckId: fc.deckId,
    deckName: "",
    lastReviewed: fc.lastReviewedAt,
    nextReview: fc.nextReviewDate ?? "",
    interval: fc.repetitionCount,
    ease: fc.easeFactor,
    repetitions: fc.repetitionCount,
    createdAt: "",
  };
}

export const flashcardService = {
  async uploadFile(dto: UploadFileDto): Promise<UploadFileResponse> {
    const formData = new FormData();
    formData.append("courseId", String(dto.courseId));
    formData.append("file", dto.file);
    const { data } = await api.post<UploadFileResponse>(
      FLASHCARD_API_ROUTES.UPLOAD_FILE,
      formData,
    );
    return data;
  },

  async generate(dto: GenerateFlashcardsDto): Promise<GenerateFlashcardsResponse> {
    const { data } = await api.post<GenerateFlashcardsResponse>(
      FLASHCARD_API_ROUTES.GENERATE,
      dto,
    );
    return data;
  },

  async getMyDecks(): Promise<Deck[]> {
    const { data } = await api.get<Deck[]>(FLASHCARD_API_ROUTES.DECKS_MY);
    return data;
  },

  async getDeckById(id: number): Promise<DeckDetail> {
    const { data } = await api.get<DeckDetail>(FLASHCARD_API_ROUTES.DECK_BY_ID(id));
    return data;
  },

  async createDeck(dto: CreateDeckDto): Promise<DeckDetail> {
    const { data } = await api.post<DeckDetail>(FLASHCARD_API_ROUTES.CREATE_DECK, dto);
    return data;
  },

  async updateDeck(id: number, dto: UpdateDeckDto): Promise<DeckDetail> {
    const { data } = await api.put<DeckDetail>(FLASHCARD_API_ROUTES.UPDATE_DECK(id), dto);
    return data;
  },

  async deleteDeck(id: number): Promise<void> {
    await api.delete(FLASHCARD_API_ROUTES.DELETE_DECK(id));
  },

  async duplicateDeck(id: number): Promise<DeckDetail> {
    const { data } = await api.post<DeckDetail>(FLASHCARD_API_ROUTES.DUPLICATE_DECK(id));
    return data;
  },

  async reorderCards(deckId: number, dto: ReorderCardsDto): Promise<void> {
    await api.put(FLASHCARD_API_ROUTES.REORDER_CARDS(deckId), dto);
  },

  async getCardsByDeck(deckId: number, page = 1, pageSize = 50): Promise<PaginatedFlashcards> {
    const res = await api.get<BackendFlashcardResponse[]>(
      FLASHCARD_API_ROUTES.CARDS_BY_DECK(deckId),
      { params: { page, pageSize } },
    );
    const items = (res.data ?? []).map(mapFlashcard);
    return {
      items,
      totalCount: items.length,
      page,
      pageSize,
      hasNextPage: false,
    };
  },

  async getCardById(id: number): Promise<Flashcard> {
    const { data } = await api.get<BackendFlashcardResponse>(FLASHCARD_API_ROUTES.CARD_BY_ID(id));
    return mapFlashcard(data);
  },

  async createCard(deckId: number, dto: CreateFlashcardDto): Promise<Flashcard> {
    const { data } = await api.post<BackendFlashcardResponse>(
      FLASHCARD_API_ROUTES.CREATE_CARD(deckId),
      { ...dto, deckId },
    );
    return mapFlashcard(data);
  },

  async updateCard(id: number, dto: UpdateFlashcardDto): Promise<Flashcard> {
    const { data } = await api.put<BackendFlashcardResponse>(FLASHCARD_API_ROUTES.UPDATE_CARD(id), dto);
    return mapFlashcard(data);
  },

  async deleteCard(id: number): Promise<void> {
    await api.delete(FLASHCARD_API_ROUTES.DELETE_CARD(id));
  },

  async searchCards(dto: SearchFlashcardsDto): Promise<PaginatedFlashcards> {
    const res = await api.get<BackendFlashcardResponse[]>(
      FLASHCARD_API_ROUTES.SEARCH_CARDS,
      { params: dto },
    );
    const items = (res.data ?? []).map(mapFlashcard);
    return {
      items,
      totalCount: items.length,
      page: 1,
      pageSize: items.length,
      hasNextPage: false,
    };
  },

  async bulkDeleteCards(ids: number[]): Promise<void> {
    await api.post(FLASHCARD_API_ROUTES.BULK_DELETE_CARDS, { ids });
  },

  async getAllCards(page = 1, pageSize = 50): Promise<PaginatedFlashcards> {
    const res = await api.get<BackendFlashcardResponse[]>(
      FLASHCARD_API_ROUTES.ALL_CARDS,
      { params: { page, pageSize } },
    );
    const items = (res.data ?? []).map(mapFlashcard);
    return {
      items,
      totalCount: items.length,
      page,
      pageSize,
      hasNextPage: false,
    };
  },

  async bulkCreateCards(deckId: number, dto: BulkCreateFlashcardsDto): Promise<Flashcard[]> {
    const { data } = await api.post<BackendFlashcardResponse[]>(
      FLASHCARD_API_ROUTES.BULK_CREATE_CARDS,
      { ...dto, deckId },
    );
    return (data ?? []).map(mapFlashcard);
  },

  async bulkUpdateCards(dto: BulkUpdateFlashcardsDto): Promise<Flashcard[]> {
    const { data } = await api.put<BackendFlashcardResponse[]>(
      FLASHCARD_API_ROUTES.BULK_UPDATE_CARDS,
      dto,
    );
    return (data ?? []).map(mapFlashcard);
  },

  async importCsv(deckId: number, file: File): Promise<void> {
    const formData = new FormData();
    formData.append("deckId", String(deckId));
    formData.append("file", file);
    await api.post(FLASHCARD_API_ROUTES.IMPORT_CSV, formData);
  },

  async importJson(deckId: number, file: File): Promise<void> {
    const formData = new FormData();
    formData.append("deckId", String(deckId));
    formData.append("file", file);
    await api.post(FLASHCARD_API_ROUTES.IMPORT_JSON, formData);
  },

  async importFromText(dto: ImportFlashcardsDto): Promise<void> {
    await api.post(FLASHCARD_API_ROUTES.IMPORT_TEXT, dto);
  },

  async exportDeck(deckId: number): Promise<Blob> {
    const { data } = await api.get<Blob>(FLASHCARD_API_ROUTES.EXPORT_DECK(deckId), {
      responseType: "blob",
    });
    return data;
  },

  async getFlashcardProgress(deckId: number): Promise<FlashcardProgress> {
    const { data } = await api.get<FlashcardProgress>(
      FLASHCARD_API_ROUTES.FLASHCARD_PROGRESS(deckId),
    );
    return data;
  },

  async getCourseFlashcardProgress(courseId: number): Promise<CourseFlashcardProgress> {
    const { data } = await api.get<CourseFlashcardProgress>(
      FLASHCARD_API_ROUTES.FLASHCARD_PROGRESS_COURSE(courseId),
    );
    return data;
  },

  async getDeckPredictions(deckId: number): Promise<DeckPredictions> {
    const { data } = await api.get<DeckPredictions>(
      FLASHCARD_API_ROUTES.FLASHCARD_PREDICTIONS(deckId),
    );
    return data;
  },

  async getDeckTimeline(deckId: number): Promise<DeckTimeline> {
    const { data } = await api.get<DeckTimeline>(
      FLASHCARD_API_ROUTES.FLASHCARD_TIMELINE(deckId),
    );
    return data;
  },

  async getDeckMastery(deckId: number): Promise<DeckMastery> {
    const { data } = await api.get<DeckMastery>(
      FLASHCARD_API_ROUTES.DECK_MASTERY(deckId),
    )
    return data
  },

  // ─── Study session ──────────────────────────────────────────

  async startSession(deckId: number, sessionType = 'normal'): Promise<{
    id: number
    deckId: number
    deckName: string
    startedAt: string
    cardsReviewed: number
    cardsKnown: number
    cardsUnknown: number
    performanceScore: number
  }> {
    const { data } = await api.post(FLASHCARD_API_ROUTES.STUDY_SESSION, {
      deckId,
      sessionType,
      includeCards: [],
    })
    return data as any
  },

  async getNextCard(sessionId: number): Promise<{
    flashcard: BackendFlashcardResponse
    sessionId: number
    current: number
    total: number
    remainingCards: number
  }> {
    const { data } = await api.get(FLASHCARD_API_ROUTES.STUDY_NEXT_CARD(sessionId))
    return data as any
  },

  async submitAnswer(
    sessionId: number,
    flashcardId: number,
    knewIt: boolean,
    responseTimeMs = 0,
  ): Promise<void> {
    await api.post(FLASHCARD_API_ROUTES.STUDY_SUBMIT_ANSWER(sessionId), {
      flashcardId,
      sessionId,
      knewIt,
      responseTimeMs,
    })
  },

  async endSession(sessionId: number): Promise<{
    id: number
    deckId: number
    deckName: string
    startedAt: string
    endedAt: string
    cardsReviewed: number
    cardsKnown: number
    cardsUnknown: number
    performanceScore: number
  }> {
    const { data } = await api.post(FLASHCARD_API_ROUTES.STUDY_END_SESSION(sessionId), {
      sessionId,
    })
    return data as any
  },
};
