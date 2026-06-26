export interface UploadFileDto {
  courseId: number;
  file: File;
}

export interface UploadFileResponse {
  id: number;
  originalFilename: string;
  fileSize: number;
  fileType: string;
  uploadStatus: string;
  uploadedAt: string;
}

export interface GenerateFlashcardsDto {
  fileId: number;
  contentType: "flashcard";
  topic: string;
  targetCourseId: number;
  numberOfItems: number;
  difficulty: "easy" | "medium" | "hard";
  language: string;
}

export interface GenerateFlashcardsResponse {
  generationId: number;
  fileId: number;
  contentType: string;
  status: string;
  progress: number;
  estimatedTime: number;
  createdAt: string;
}

export interface ManualCard {
  id: string;
  question: string;
  answer: string;
}

export interface Deck {
  id: number;
  name: string;
  courseName: string;
  colorHex: string;
  totalCards: number;
  masteredPercentage: number;
  dueCardsCount: number;
}

export interface DeckDetail {
  id: number;
  name: string;
  description: string;
  courseId: number;
  courseName: string;
  colorHex: string;
  totalCards: number;
  masteredPercentage: number;
  dueCardsCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface CreateDeckDto {
  name: string;
  description?: string;
  courseId: number;
  colorHex?: string;
}

export interface UpdateDeckDto {
  name?: string;
  description?: string;
  colorHex?: string;
}

export interface Flashcard {
  id: number;
  question: string;
  answer: string;
  hint: string | null;
  difficulty: 'easy' | 'medium' | 'hard';
  tags: string[];
  deckId: number;
  deckName: string;
  lastReviewed: string | null;
  nextReview: string;
  interval: number;
  ease: number;
  repetitions: number;
  createdAt: string;
}

export interface CreateFlashcardDto {
  question: string;
  answer: string;
  hint?: string;
  difficulty?: 'easy' | 'medium' | 'hard';
  tags?: string[];
}

export interface UpdateFlashcardDto {
  question?: string;
  answer?: string;
  hint?: string;
  difficulty?: 'easy' | 'medium' | 'hard';
  tags?: string[];
}

export interface PaginatedFlashcards {
  items: Flashcard[];
  totalCount: number;
  page: number;
  pageSize: number;
  hasNextPage: boolean;
}

export interface ImportFlashcardsDto {
  deckId: number;
  cards: { question: string; answer: string }[];
}

export interface FlashcardProgress {
  deckId: number;
  deckName: string;
  totalCards: number;
  newCards: number;
  learningCards: number;
  reviewCards: number;
  masteredCards: number;
  masteryPercentage: number;
  cardsReviewedToday: number;
  averageEase: number;
  averageInterval: number;
}

export interface DeckMastery {
  deckId: number;
  deckName: number;
  masteryPercentage: number;
  byDifficulty: { easy: number; medium: number; hard: number };
  trend: { date: string; mastery: number }[];
  predictedMastery: number;
  estimatedDaysToMastery: number;
}

export interface ReorderCardsDto {
  cardIds: number[];
}

export interface SearchFlashcardsDto {
  query?: string;
  deckId?: number;
  courseId?: number;
  tags?: string[];
  difficulty?: 'easy' | 'medium' | 'hard';
  page?: number;
  pageSize?: number;
}

export interface BulkCreateFlashcardsDto {
  cards: CreateFlashcardDto[];
}

export interface BulkUpdateFlashcardsDto {
  cards: UpdateFlashcardDto[];
}

export interface CourseFlashcardProgress {
  courseId: number;
  courseName: string;
  totalDecks: number;
  totalCards: number;
  masteredCards: number;
  masteryPercentage: number;
  cardsReviewedToday: number;
  averageEase: number;
}

export interface DeckPredictions {
  deckId: number;
  deckName: string;
  predictedMastery: number;
  estimatedDaysToMastery: number;
  predictedRetentionRate: number;
  nextWeekReviewLoad: number;
  confidenceInterval: { lower: number; upper: number };
}

export interface DeckTimelineEntry {
  date: string;
  newCards: number;
  reviewCards: number;
  masteredCards: number;
  cumulativeMastery: number;
}

export interface DeckTimeline {
  deckId: number;
  deckName: string;
  entries: DeckTimelineEntry[];
}

