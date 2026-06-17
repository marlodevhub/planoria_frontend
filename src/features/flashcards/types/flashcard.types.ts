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

