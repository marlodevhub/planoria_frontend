// POST /files/upload
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

// POST /ai/generate/flashcards
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

//------------------------------------

export interface DeckDetail {
  id: number;
  name: string;
  description: string;
  courseId: number;
  courseName: string;
  totalCards: number;
  spacedRepetitionEnabled: boolean;
  masteredCards: number;
  learningCards: number;
  notStudiedCards: number;
  progressPercentage: number;
  createdAt: string;
  updatedAt: string;
}

export interface Flashcard {
  id: number;
  question: string;
  answer: string;
  hint: string;
  difficulty: string;
  tags: string[];
  position: number;
  isActive: boolean;
  deckId: number;
  lastReviewedAt: string | null;
  nextReviewDate: string | null;
  repetitionCount: number;
  easeFactor: number;
}

//------------------------------------

// POST /study/sessions
export interface StartStudySessionDto {
  deckId: number;
  sessionType: "normal" | "repeat_failed" | "quick";
}

// Response de iniciar sesión y terminar sesión
export interface StudySession {
  id: number;
  deckId: number;
  deckName: string;
  startedAt: string;
  endedAt: string | null;
  cardsReviewed: number;
  cardsKnown: number;
  cardsUnknown: number;
  sessionType: string;
  performanceScore: number;
}

// GET /study/sessions/:id/next
export interface NextCard {
  sessionId: number;
  flashcard: Flashcard | null;
  current: number;
  total: number;
  remainingCards: number;
}

// POST /study/sessions/:id/answer
export interface SubmitAnswerDto {
  flashcardId: number;
  knewIt: boolean;
  responseTimeMs: number;
}

