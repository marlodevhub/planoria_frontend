import api from '@/lib/axios'
import { QUIZ_API_ROUTES } from '../constants/api'
import type {
  QuizListItem,
  QuizDetail,
  Question,
  CreateQuestionDto,
  Option,
  QuizAttempt,
  QuizResult,
  CreateQuizRequest,
  UpdateQuizRequest,
  StartAttemptResponse,
  SubmitAttemptRequest,
  QuizSettings,
  QuizProgressInfo,
  QuizComparison,
  QuizProgressDetail,
  QuizWeakTopics,
  ReorderQuestionsDto,
  CreateOptionDto,
  UpdateOptionDto,
  UpdateQuizSettingsDto,
  SimulateRequest,
  SimulateResponse,
  SubmitAnswerDto,
  UpdateAnswerDto,
  BulkAnswersDto,
  GradeResponse,
  QuizAttemptHistory,
  QuizAttemptBest,
  AttemptCompareItem,
  QuizImprovement,
  QuizAverage,
  CourseComparisonItem,
  TimeframeComparisonItem,
} from '../types/quiz.types'

interface BackendQuizListItem {
  id: number
  title: string
  totalQuestions: number
  bestScore: number | null
  averageScore: number | null
  attemptsCount: number
  lastAttemptAt: string | null
}

interface BackendQuizDetail {
  id: number
  title: string
  description: string
  courseId: number
  courseName: string
  totalQuestions: number
  passingScore: number
  timeLimitMinutes: number | null
  userAttempts: number
  bestScore: number | null
  isCompleted: boolean
}

interface BackendQuestion {
  id: number
  questionText: string
  questionType: string
  points: number
  orderPosition: number
  options: BackendOption[]
}

interface BackendOption {
  id: number
  optionText: string
  isCorrect: boolean
  orderPosition: number
}

interface BackendAttempt {
  id: number
  quizId: number
  startedAt: string
  timeSpentSeconds?: number | null
}

interface BackendQuizResult {
  attempt: {
    scorePercentage: number
    correctAnswersCount: number
    answersCount: number
  }
}

function mapQuizListItem(q: BackendQuizListItem): QuizListItem {
  return {
    id: q.id,
    titulo: q.title,
    descripcion: 'Sin descripción',
    cursoId: 0,
    cursoNombre: 'Curso sin nombre',
    duracionMinutos: 0,
    puntuacionTotal: q.totalQuestions,
    preguntaCount: q.totalQuestions,
    intentosRealizados: q.attemptsCount,
    mejorPuntuacion: Math.round(q.bestScore ?? 0),
    fechaCreacion: q.lastAttemptAt ?? new Date().toISOString(),
    activo: true,
  }
}

function mapQuizDetail(q: BackendQuizDetail): QuizDetail {
  return {
    id: q.id,
    titulo: q.title,
    descripcion: q.description,
    cursoId: q.courseId,
    cursoNombre: q.courseName,
    duracionMinutos: q.timeLimitMinutes ?? 0,
    puntuacionTotal: q.totalQuestions,
    preguntas: [],
    fechaCreacion: '',
    activo: true,
  }
}

function mapQuestion(q: BackendQuestion): Question {
  return {
    id: q.id,
    texto: q.questionText,
    tipo: q.questionType,
    puntuacion: q.points,
    orden: q.orderPosition,
    opciones: (q.options ?? []).map((o) => ({
      id: o.id,
      texto: o.optionText,
      esCorrecta: o.isCorrect,
      orden: o.orderPosition,
    })),
  }
}

export const quizService = {
  async getAll(): Promise<QuizListItem[]> {
    const { data } = await api.get<BackendQuizListItem[]>(QUIZ_API_ROUTES.QUIZZES)
    return (data ?? []).map(mapQuizListItem)
  },

  async getById(id: number): Promise<QuizDetail> {
    const { data } = await api.get<BackendQuizDetail>(QUIZ_API_ROUTES.QUIZ_BY_ID(id))
    return mapQuizDetail(data)
  },

  async getQuestions(id: number): Promise<Question[]> {
    const { data } = await api.get<BackendQuestion[]>(QUIZ_API_ROUTES.QUIZ_QUESTIONS(id))
    return (data ?? []).map(mapQuestion)
  },

  async createQuestion(quizId: number, dto: CreateQuestionDto): Promise<Question> {
    const { data } = await api.post<Question>(
      QUIZ_API_ROUTES.CREATE_QUESTION(quizId),
      dto,
    )
    return data
  },

  async updateQuestion(quizId: number, questionId: number, dto: Partial<CreateQuestionDto>): Promise<Question> {
    const { data } = await api.put<Question>(
      QUIZ_API_ROUTES.UPDATE_QUESTION(quizId, questionId),
      dto,
    )
    return data
  },

  async deleteQuestion(quizId: number, questionId: number): Promise<void> {
    await api.delete(QUIZ_API_ROUTES.DELETE_QUESTION(quizId, questionId))
  },

  async getCourseQuizzes(courseId: number): Promise<QuizListItem[]> {
    const { data } = await api.get<BackendQuizListItem[]>(
      QUIZ_API_ROUTES.COURSE_QUIZZES,
      { params: { courseId } },
    )
    return (data ?? []).map(mapQuizListItem)
  },

  async duplicateQuiz(id: number): Promise<QuizDetail> {
    const { data } = await api.post<QuizDetail>(QUIZ_API_ROUTES.DUPLICATE_QUIZ(id))
    return data
  },

  async reorderQuestions(quizId: number, dto: ReorderQuestionsDto): Promise<void> {
    await api.put(QUIZ_API_ROUTES.REORDER_QUESTIONS(quizId), dto)
  },

  async createOption(quizId: number, questionId: number, dto: CreateOptionDto): Promise<Option> {
    const { data } = await api.post<Option>(
      QUIZ_API_ROUTES.CREATE_OPTION(quizId, questionId),
      dto,
    )
    return data
  },

  async updateOption(quizId: number, questionId: number, optionId: number, dto: UpdateOptionDto): Promise<Option> {
    const { data } = await api.put<Option>(
      QUIZ_API_ROUTES.UPDATE_OPTION(quizId, questionId, optionId),
      dto,
    )
    return data
  },

  async deleteOption(quizId: number, questionId: number, optionId: number): Promise<void> {
    await api.delete(QUIZ_API_ROUTES.DELETE_OPTION(quizId, questionId, optionId))
  },

  async updateSettings(id: number, dto: UpdateQuizSettingsDto): Promise<QuizSettings> {
    const { data } = await api.put<QuizSettings>(QUIZ_API_ROUTES.SETTINGS(id), dto)
    return data
  },

  async resetSettings(id: number): Promise<QuizSettings> {
    const { data } = await api.post<QuizSettings>(QUIZ_API_ROUTES.SETTINGS_RESET(id))
    return data
  },

  async getPreview(id: number): Promise<QuizDetail> {
    const { data } = await api.get<QuizDetail>(QUIZ_API_ROUTES.PREVIEW(id))
    return data
  },

  async simulate(id: number, dto: SimulateRequest): Promise<SimulateResponse> {
    const { data } = await api.post<SimulateResponse>(QUIZ_API_ROUTES.SIMULATE(id), dto)
    return data
  },

  async create(req: CreateQuizRequest): Promise<QuizDetail> {
    const { data } = await api.post<QuizDetail>(QUIZ_API_ROUTES.QUIZZES, req)
    return data
  },

  async update(id: number, req: UpdateQuizRequest): Promise<QuizDetail> {
    const { data } = await api.put<QuizDetail>(
      QUIZ_API_ROUTES.QUIZ_BY_ID(id),
      req,
    )
    return data
  },

  async delete(id: number): Promise<void> {
    await api.delete(QUIZ_API_ROUTES.QUIZ_BY_ID(id))
  },

  async getSettings(id: number): Promise<QuizSettings> {
    const { data } = await api.get<QuizSettings>(QUIZ_API_ROUTES.SETTINGS(id))
    return data
  },

  async startAttempt(quizId: number): Promise<StartAttemptResponse> {
    const { data } = await api.post<BackendAttempt>(
      QUIZ_API_ROUTES.START_ATTEMPT,
      { quizId },
    )
    const preguntas = await this.getQuestions(quizId)
    return {
      attemptId: data.id,
      quizId: data.quizId,
      preguntas,
      fechaInicio: data.startedAt,
      duracionMinutos: 0,
    }
  },

  async submitAttempt(req: SubmitAttemptRequest): Promise<QuizResult> {
    const { data } = await api.post<BackendQuizResult>(
      QUIZ_API_ROUTES.SUBMIT_ATTEMPT(req.attemptId),
      {
        answers: req.respuestas.map((r) => ({
          questionId: r.preguntaId,
          selectedOptionId: r.opcionId,
          shortAnswerText: '',
        })),
      },
    )
    const score = data.attempt.correctAnswersCount
    const total = data.attempt.answersCount
    return {
      attemptId: req.attemptId,
      puntuacion: score,
      puntuacionTotal: total,
      porcentaje: Math.round(data.attempt.scorePercentage ?? 0),
      respuestas: [],
      fechaCompletado: new Date().toISOString(),
      tiempoTomado: 0,
    }
  },

  async getAttemptResult(attemptId: number): Promise<QuizResult> {
    const { data } = await api.get<QuizResult>(
      QUIZ_API_ROUTES.ATTEMPT_RESULT(attemptId),
    )
    return data
  },

  async getMyAttempts(quizId: number): Promise<QuizAttempt[]> {
    const { data } = await api.get<QuizAttempt[]>(
      QUIZ_API_ROUTES.MY_ATTEMPTS,
      { params: { quizId } },
    )
    return data
  },

  async submitAnswer(dto: SubmitAnswerDto): Promise<void> {
    await api.post(QUIZ_API_ROUTES.ANSWER, dto)
  },

  async updateAnswer(dto: UpdateAnswerDto): Promise<void> {
    await api.put(QUIZ_API_ROUTES.ANSWER, dto)
  },

  async submitBulkAnswers(dto: BulkAnswersDto): Promise<void> {
    await api.post(QUIZ_API_ROUTES.ANSWERS_BULK, dto)
  },

  async gradeAttempt(attemptId: number): Promise<GradeResponse> {
    const { data } = await api.post<GradeResponse>(QUIZ_API_ROUTES.GRADE(attemptId))
    return data
  },

  async regradeAttempt(attemptId: number): Promise<GradeResponse> {
    const { data } = await api.post<GradeResponse>(QUIZ_API_ROUTES.REGRADE(attemptId))
    return data
  },

  async getAttemptHistory(quizId: number): Promise<QuizAttemptHistory[]> {
    const { data } = await api.get<QuizAttemptHistory[]>(
      QUIZ_API_ROUTES.HISTORY,
      { params: { quizId } },
    )
    return data
  },

  async getBestAttempt(quizId: number): Promise<QuizAttemptBest> {
    const { data } = await api.get<QuizAttemptBest>(
      QUIZ_API_ROUTES.BEST,
      { params: { quizId } },
    )
    return data
  },

  async compareAttempts(ids: number[]): Promise<AttemptCompareItem[]> {
    const { data } = await api.get<AttemptCompareItem[]>(
      QUIZ_API_ROUTES.COMPARE,
      { params: { ids: ids.join(',') } },
    )
    return data
  },

  async getQuizProgress(quizId: number): Promise<QuizProgressDetail> {
    const { data } = await api.get<QuizProgressDetail>(
      QUIZ_API_ROUTES.QUIZ_PROGRESS_BY_QUIZ(quizId),
    )
    return data
  },

  async getCourseQuizProgress(courseId: number): Promise<QuizProgressInfo[]> {
    const { data } = await api.get<QuizProgressInfo[]>(
      QUIZ_API_ROUTES.QUIZ_PROGRESS_BY_COURSE(courseId),
    )
    return data
  },

  async getQuizComparison(quizId1: number, quizId2: number): Promise<QuizComparison> {
    const { data } = await api.get<QuizComparison>(
      QUIZ_API_ROUTES.QUIZ_PROGRESS_COMPARE,
      { params: { quizId1, quizId2 } },
    )
    return data
  },

  async getQuizWeakTopics(courseId: number): Promise<QuizWeakTopics> {
    const { data } = await api.get<QuizWeakTopics>(
      QUIZ_API_ROUTES.QUIZ_PROGRESS_WEAK(courseId),
    )
    return data
  },

  async getQuizImprovement(quizId: number): Promise<QuizImprovement> {
    const { data } = await api.get<QuizImprovement>(
      QUIZ_API_ROUTES.QUIZ_PROGRESS_IMPROVEMENT,
      { params: { quizId } },
    )
    return data
  },

  async getQuizAverage(): Promise<QuizAverage> {
    const { data } = await api.get<QuizAverage>(QUIZ_API_ROUTES.QUIZ_AVERAGE)
    return data
  },

  async getCompareCourses(): Promise<CourseComparisonItem[]> {
    const { data } = await api.get<CourseComparisonItem[]>(QUIZ_API_ROUTES.QUIZ_COMPARE_COURSES)
    return data
  },

  async getCompareTimeframes(): Promise<TimeframeComparisonItem[]> {
    const { data } = await api.get<TimeframeComparisonItem[]>(QUIZ_API_ROUTES.QUIZ_COMPARE_TIMEFRAMES)
    return data
  },

  async uploadFile(courseId: number, file: File): Promise<{ id: number }> {
    const formData = new FormData()
    formData.append('courseId', String(courseId))
    formData.append('file', file)
    const { data } = await api.post(QUIZ_API_ROUTES.UPLOAD_FILE, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    })
    return data as { id: number }
  },

  async generateFromPdf(dto: {
    fileId: number
    topic: string
    targetCourseId: number
    numberOfItems: number
    difficulty: string
    language: string
  }): Promise<{ generationId: number }> {
    const { data } = await api.post(
      QUIZ_API_ROUTES.GENERATE_QUIZ,
      {
        ...dto,
        contentType: 'quiz',
      },
      { timeout: 120000 },
    )
    return data as { generationId: number }
  },
}
