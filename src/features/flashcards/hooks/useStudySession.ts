import { useState, useCallback, useRef } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import { flashcardService } from '../services/flashcardService'
import type { Flashcard } from '../types/flashcard.types'

interface StudyCard {
  flashcard: Flashcard
  sessionId: number
  current: number
  total: number
  remainingCards: number
}

interface StudyResult {
  correct: number
  incorrect: number
  total: number
  score: number
}

export function useStudySession() {
  const queryClient = useQueryClient()
  const [sessionId, setSessionId] = useState<number | null>(null)
  const [deckName, setDeckName] = useState('')
  const [currentCard, setCurrentCard] = useState<StudyCard | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isFinished, setIsFinished] = useState(false)
  const [result, setResult] = useState<StudyResult | null>(null)
  const [error, setError] = useState<string | null>(null)

  const startTimeRef = useRef<number>(0)

  const startSession = useCallback(async (deckId: number) => {
    setIsLoading(true)
    setError(null)
    try {
      const session = await flashcardService.startSession(deckId)
      setSessionId(session.id)
      setDeckName(session.deckName)
      startTimeRef.current = Date.now()
      await fetchNextCard(session.id)
    } catch (e: any) {
      setError(e?.message ?? 'Error al iniciar sesión')
    } finally {
      setIsLoading(false)
    }
  }, [])

  const fetchNextCard = async (sid: number) => {
    try {
      const next = await flashcardService.getNextCard(sid)
      if (!next.flashcard) {
        setIsFinished(true)
        await fetchResult(sid)
        return
      }
      setCurrentCard({
        flashcard: {
          id: next.flashcard.id,
          question: next.flashcard.question,
          answer: next.flashcard.answer,
          hint: next.flashcard.hint ?? null,
          difficulty: next.flashcard.difficulty as 'easy' | 'medium' | 'hard',
          tags: next.flashcard.tags ?? [],
          deckId: next.flashcard.deckId,
          deckName: '',
          lastReviewed: next.flashcard.lastReviewedAt,
          nextReview: next.flashcard.nextReviewDate ?? '',
          interval: next.flashcard.repetitionCount,
          ease: next.flashcard.easeFactor,
          repetitions: next.flashcard.repetitionCount,
          createdAt: '',
        },
        sessionId: next.sessionId,
        current: next.current,
        total: next.total,
        remainingCards: next.remainingCards,
      })
      setIsFinished(false)
      startTimeRef.current = Date.now()
    } catch (e: any) {
      setError(e?.message ?? 'Error al obtener tarjeta')
    }
  }

  const submitAnswer = useCallback(async (knewIt: boolean) => {
    if (!sessionId || !currentCard) return
    const elapsed = Date.now() - startTimeRef.current
    try {
      await flashcardService.submitAnswer(
        sessionId,
        currentCard.flashcard.id,
        knewIt,
        elapsed,
      )
      await fetchNextCard(sessionId)
    } catch (e: any) {
      setError(e?.message ?? 'Error al enviar respuesta')
    }
  }, [sessionId, currentCard])

  const fetchResult = async (sid: number) => {
    try {
      const summary = await flashcardService.endSession(sid)
      setResult({
        correct: summary.cardsKnown,
        incorrect: summary.cardsUnknown,
        total: summary.cardsReviewed,
        score: summary.performanceScore,
      })
      queryClient.invalidateQueries({ queryKey: ['progresos'] })
      queryClient.invalidateQueries({ queryKey: ['dashboard'] })
      queryClient.invalidateQueries({ queryKey: ['flashcards'] })
    } catch (e: any) {
      setError(e?.message ?? 'Error al finalizar sesión')
    }
  }

  const endSession = useCallback(async () => {
    if (!sessionId) return
    setIsLoading(true)
    try {
      await fetchResult(sessionId)
    } catch (e: any) {
      setError(e?.message ?? 'Error al finalizar sesión')
    } finally {
      setIsFinished(true)
      setIsLoading(false)
    }
  }, [sessionId])

  const reset = useCallback(() => {
    setSessionId(null)
    setCurrentCard(null)
    setIsLoading(false)
    setIsFinished(false)
    setResult(null)
    setError(null)
  }, [])

  return {
    sessionId,
    deckName,
    currentCard,
    isLoading,
    isFinished,
    result,
    error,
    startSession,
    submitAnswer,
    endSession,
    reset,
  }
}
