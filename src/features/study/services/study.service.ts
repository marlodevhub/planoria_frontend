import api from '@/lib/axios'
import { STUDY_API_ROUTES } from '../constants/api'
import type {
  StudySession,
  StartSessionResponse,
  NextCardResponse,
  SubmitResultRequest,
  SubmitResultResponse,
  CompleteSessionResponse,
  DueCardsInfo,
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

  async startSession(id: number): Promise<StartSessionResponse> {
    const { data } = await api.post<StartSessionResponse>(
      STUDY_API_ROUTES.START_SESSION(id),
    )
    return data
  },

  async getNextCard(id: number): Promise<NextCardResponse> {
    const { data } = await api.post<NextCardResponse>(
      STUDY_API_ROUTES.NEXT_CARD(id),
    )
    return data
  },

  async submitResult(
    sessionId: number,
    req: SubmitResultRequest,
  ): Promise<SubmitResultResponse> {
    const { data } = await api.post<SubmitResultResponse>(
      STUDY_API_ROUTES.SUBMIT_RESULT(sessionId),
      req,
    )
    return data
  },

  async pauseSession(id: number): Promise<void> {
    await api.post(STUDY_API_ROUTES.PAUSE_SESSION(id))
  },

  async resumeSession(id: number): Promise<void> {
    await api.post(STUDY_API_ROUTES.RESUME_SESSION(id))
  },

  async completeSession(id: number): Promise<CompleteSessionResponse> {
    const { data } = await api.post<CompleteSessionResponse>(
      STUDY_API_ROUTES.COMPLETE_SESSION(id),
    )
    return data
  },

  async getDueCards(deckId: number): Promise<DueCardsInfo> {
    const { data } = await api.get<DueCardsInfo>(
      STUDY_API_ROUTES.DUE_CARDS(deckId),
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
