import api from '@/lib/axios'
import { STUDY_API_ROUTES } from '../constants/api'
import type {
  StudySession,
  CreateSessionRequest,
  CreateSessionResponse,
  NextCardResponse,
  SubmitAnswerRequest,
  SubmitAnswerResponse,
  EndSessionResponse,
  SessionSummary,
  DueCardsInfo,
  OverdueInfo,
  ReviewScheduleRequest,
  ReviewScheduleResponse,
  DeckPerformance,
  CardDetail,
} from '../types/study.types'

export const studyService = {
  async getSessions(): Promise<StudySession[]> {
    const { data } = await api.get<StudySession[]>(STUDY_API_ROUTES.SESSIONS)
    return data
  },

  async getSession(id: number): Promise<StudySession> {
    const { data } = await api.get<StudySession>(STUDY_API_ROUTES.SESSION_BY_ID(id))
    return data
  },

  async createSession(req: CreateSessionRequest): Promise<CreateSessionResponse> {
    const { data } = await api.post<CreateSessionResponse>(
      STUDY_API_ROUTES.CREATE_SESSION,
      req,
    )
    return data
  },

  async getNextCard(sessionId: number): Promise<NextCardResponse> {
    const { data } = await api.get<NextCardResponse>(
      STUDY_API_ROUTES.NEXT_CARD(sessionId),
    )
    return data
  },

  async submitAnswer(
    sessionId: number,
    req: SubmitAnswerRequest,
  ): Promise<SubmitAnswerResponse> {
    const { data } = await api.post<SubmitAnswerResponse>(
      STUDY_API_ROUTES.SUBMIT_ANSWER(sessionId),
      req,
    )
    return data
  },

  async endSession(sessionId: number): Promise<EndSessionResponse> {
    const { data } = await api.post<EndSessionResponse>(
      STUDY_API_ROUTES.END_SESSION(sessionId),
    )
    return data
  },

  async getSessionSummary(id: number): Promise<SessionSummary> {
    const { data } = await api.get<SessionSummary>(
      STUDY_API_ROUTES.SESSION_SUMMARY(id),
    )
    return data
  },

  async getDueCards(deckId: number): Promise<DueCardsInfo> {
    const { data } = await api.get<DueCardsInfo>(
      STUDY_API_ROUTES.DUE_CARDS(deckId),
    )
    return data
  },

  async getOverdue(deckId: number): Promise<OverdueInfo> {
    const { data } = await api.get<OverdueInfo>(
      STUDY_API_ROUTES.OVERDUE(deckId),
    )
    return data
  },

  async getDeckPerformance(deckId: number): Promise<DeckPerformance> {
    const { data } = await api.get<DeckPerformance>(
      STUDY_API_ROUTES.DECK_PERFORMANCE(deckId),
    )
    return data
  },

  async scheduleReview(req: ReviewScheduleRequest): Promise<ReviewScheduleResponse> {
    const { data } = await api.post<ReviewScheduleResponse>(
      STUDY_API_ROUTES.REVIEWS_SCHEDULE,
      req,
    )
    return data
  },

  async getCardDetail(cardId: number): Promise<CardDetail> {
    const { data } = await api.get<CardDetail>(
      STUDY_API_ROUTES.CARD_DETAIL(cardId),
    )
    return data
  },
}
