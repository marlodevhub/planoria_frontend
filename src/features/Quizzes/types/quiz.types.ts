export interface QuizListItem {
  id: number
  titulo: string
  descripcion: string
  cursoId: number
  cursoNombre: string
  duracionMinutos: number
  puntuacionTotal: number
  preguntaCount: number
  intentosRealizados: number
  mejorPuntuacion: number
  fechaCreacion: string
  activo: boolean
}

export interface QuizDetail {
  id: number
  titulo: string
  descripcion: string
  cursoId: number
  cursoNombre: string
  duracionMinutos: number
  puntuacionTotal: number
  preguntas: Question[]
  fechaCreacion: string
  activo: boolean
}

export interface Question {
  id: number
  texto: string
  tipo: string
  puntuacion: number
  opciones: Option[]
  orden: number
}

export interface CreateQuestionDto {
  texto: string
  tipo: string
  puntuacion: number
  orden: number
  opciones: { texto: string; esCorrecta: boolean; orden: number }[]
}

export interface Option {
  id: number
  texto: string
  esCorrecta: boolean
  orden: number
}

export interface QuizAttempt {
  id: number
  quizId: number
  usuarioId: number
  fechaInicio: string
  fechaFin: string
  puntuacion: number
  puntuacionTotal: number
  respuestas: AnswerResult[]
  completado: boolean
}

export interface QuizResult {
  attemptId: number
  puntuacion: number
  puntuacionTotal: number
  porcentaje: number
  respuestas: AnswerResult[]
  fechaCompletado: string
  tiempoTomado: number
}

export interface AnswerResult {
  preguntaId: number
  opcionId: number
  esCorrecta: boolean
  puntosObtenidos: number
}

export interface CreateQuizRequest {
  title: string
  description: string
  courseId: number
  passingScore?: number
  timeLimitMinutes?: number | null
  shuffleQuestions?: boolean
  shuffleOptions?: boolean
  attemptsAllowed?: number
}

export interface UpdateQuizRequest {
  title?: string
  description?: string
  passingScore?: number
  timeLimitMinutes?: number | null
  shuffleQuestions?: boolean
  shuffleOptions?: boolean
  attemptsAllowed?: number
  isActive?: boolean
}

export interface StartAttemptResponse {
  attemptId: number
  quizId: number
  preguntas: Question[]
  fechaInicio: string
  duracionMinutos: number
}

export interface SubmitAttemptRequest {
  attemptId: number
  respuestas: { preguntaId: number; opcionId: number }[]
}

export interface QuizSettings {
  id: number
  mostrarResultados: boolean
  permitirReintentos: boolean
  maxIntentos: number
  tiempoPorPregunta: number
}

export interface QuizProgressInfo {
  quizId: number
  quizTitle: string
  courseName: string
  attempts: number
  bestScore: number
  averageScore: number
  lastAttemptDate: string
  totalQuestions: number
  correctAnswers: number
  weakTopics: { topicId: number; topicName: string; accuracy: number }[]
}

export interface QuizComparison {
  quizId: number
  yourScore: number
  averageScore: number
  highestScore: number
  percentileRank: number
  totalParticipants: number
}

export interface QuizProgressDetail {
  totalAttempts: number
  averageScore: number
  bestScore: number
  recentScores: { attemptId: number; score: number; date: string }[]
  scoreTrend: 'improving' | 'declining' | 'stable'
  weakTopics: { topic: string; accuracy: number; questionCount: number }[]
  improvement: { previousAverage: number; currentAverage: number; change: number } | null
}

export interface QuizProgressList {
  items: QuizProgressInfo[]
  totalCount: number
}

export interface QuizWeakTopics {
  quizId: number
  topics: { questionId: number; text: string; timesWrong: number; totalAttempts: number }[]
}

export interface ReorderQuestionsDto {
  questionIds: number[]
}

export interface CreateOptionDto {
  texto: string
  esCorrecta: boolean
  orden: number
}

export interface UpdateOptionDto {
  texto?: string
  esCorrecta?: boolean
  orden?: number
}

export interface UpdateQuizSettingsDto {
  mostrarResultados?: boolean
  permitirReintentos?: boolean
  maxIntentos?: number
  tiempoPorPregunta?: number
}

export interface SimulateRequest {
  respuestas: { preguntaId: number; opcionId: number }[]
}

export interface SimulateResponse {
  puntuacion: number
  puntuacionTotal: number
  porcentaje: number
  respuestas: { preguntaId: number; opcionId: number; esCorrecta: boolean }[]
}

export interface SubmitAnswerDto {
  attemptId: number
  preguntaId: number
  opcionId: number
  tiempoMs?: number
}

export interface UpdateAnswerDto {
  answerId: number
  opcionId: number
}

export interface BulkAnswersDto {
  attemptId: number
  respuestas: { preguntaId: number; opcionId: number }[]
}

export interface GradeResponse {
  attemptId: number
  puntuacion: number
  puntuacionTotal: number
  porcentaje: number
  respuestas: AnswerResult[]
}

export interface QuizAttemptHistory {
  id: number
  quizId: number
  quizTitle: string
  puntuacion: number
  puntuacionTotal: number
  porcentaje: number
  fechaInicio: string
  fechaFin: string
  completado: boolean
}

export interface QuizAttemptBest {
  id: number
  quizId: number
  puntuacion: number
  puntuacionTotal: number
  porcentaje: number
  fechaCompletado: string
}

export interface AttemptCompareItem {
  attemptId: number
  usuario: string
  puntuacion: number
  puntuacionTotal: number
  porcentaje: number
  fechaCompletado: string
}

export interface QuizImprovement {
  quizId: number
  previousAverage: number
  currentAverage: number
  change: number
  attemptsCount: number
}

export interface QuizAverage {
  overallAverage: number
  totalQuizzes: number
  totalAttempts: number
}

export interface CourseComparisonItem {
  courseId: number
  courseName: string
  averageScore: number
  quizzesCount: number
  totalAttempts: number
}

export interface TimeframeComparisonItem {
  timeframe: string
  averageScore: number
  quizzesCompleted: number
  totalAttempts: number
}
