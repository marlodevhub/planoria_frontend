import { useState, useCallback } from 'react'
import { useStartAttempt } from '../hooks/useStartAttempt'
import { useSubmitAttempt } from '../hooks/useSubmitAttempt'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import type { Question } from '../types/quiz.types'
import type { QuizListItem } from '../types/quiz.types'

type Phase = 'intro' | 'taking' | 'result'

interface TakeQuizModalProps {
  quiz: QuizListItem
  onClose: () => void
}

export function TakeQuizModal({ quiz, onClose }: TakeQuizModalProps) {
  const [phase, setPhase] = useState<Phase>('intro')
  const [questions, setQuestions] = useState<Question[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [answers, setAnswers] = useState<Record<number, number>>({})
  const [result, setResult] = useState<{ score: number; total: number; pct: number } | null>(null)
  const [attemptId, setAttemptId] = useState<number | null>(null)

  const startAttempt = useStartAttempt()
  const submitAttempt = useSubmitAttempt()

  const handleStart = useCallback(async () => {
    try {
      const res = await startAttempt.mutateAsync(quiz.id)
      setAttemptId(res.attemptId)
      setQuestions(res.preguntas)
      setPhase('taking')
    } catch {
      // handled by error boundary or toast
    }
  }, [quiz.id, startAttempt])

  const handleSelectOption = useCallback((questionId: number, optionId: number) => {
    setAnswers((prev) => ({ ...prev, [questionId]: optionId }))
  }, [])

  const handleNext = useCallback(() => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((i) => i + 1)
    }
  }, [currentIndex, questions.length])

  const handlePrev = useCallback(() => {
    if (currentIndex > 0) {
      setCurrentIndex((i) => i - 1)
    }
  }, [currentIndex])

  const handleSubmit = useCallback(async () => {
    if (!attemptId) return
    try {
      const res = await submitAttempt.mutateAsync({
        attemptId,
        respuestas: Object.entries(answers).map(([preguntaId, opcionId]) => ({
          preguntaId: Number(preguntaId),
          opcionId,
        })),
      })
      setResult({
        score: res.puntuacion,
        total: res.puntuacionTotal,
        pct: res.porcentaje,
      })
      setPhase('result')
    } catch {
      //
    }
  }, [attemptId, answers, submitAttempt])

  const answeredCount = Object.keys(answers).length
  const currentQuestion = questions[currentIndex]

  if (phase === 'intro') {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
        <Card className="w-full max-w-lg mx-4 p-8 space-y-6">
          <div>
            <h2 className="text-foreground text-xl font-bold">{quiz.titulo}</h2>
            <p className="text-muted-foreground text-sm mt-2">
              {quiz.descripcion || 'Pon a prueba tus conocimientos con este quiz.'}
            </p>
          </div>
          <div className="space-y-2 text-sm text-muted-foreground">
            <p>📝 {quiz.preguntaCount} preguntas</p>
            <p>⏱ {quiz.duracionMinutos} minutos</p>
            <p>🏆 Puntuación máxima: {quiz.puntuacionTotal}</p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" onClick={onClose} className="flex-1">
              Cancelar
            </Button>
            <Button onClick={handleStart} disabled={startAttempt.isPending} className="flex-1">
              {startAttempt.isPending ? 'Cargando...' : 'Comenzar'}
            </Button>
          </div>
        </Card>
      </div>
    )
  }

  if (phase === 'taking' && currentQuestion) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
        <Card className="w-full max-w-2xl mx-4 p-8 space-y-6">
          <div className="flex items-center justify-between">
            <span className="text-xs text-muted-foreground">
              Pregunta {currentIndex + 1} de {questions.length}
            </span>
            <span className="text-xs text-muted-foreground">
              {answeredCount} respondidas
            </span>
          </div>

          <div className="w-full bg-muted rounded-full h-1.5 overflow-hidden">
            <div
              className="bg-accent h-1.5 rounded-full transition-all duration-300"
              style={{
                width: `${((currentIndex + 1) / questions.length) * 100}%`,
              }}
            />
          </div>

          <div>
            <h3 className="text-foreground text-base font-medium">
              {currentQuestion.texto}
            </h3>
          </div>

          <div className="space-y-2">
            {currentQuestion.opciones.map((opt) => {
              const isSelected = answers[currentQuestion.id] === opt.id
              return (
                <button
                  key={opt.id}
                  onClick={() => handleSelectOption(currentQuestion.id, opt.id)}
                  className={`w-full text-left px-4 py-3 rounded-xl border transition-all text-sm
                    ${isSelected 
                      ? 'border-accent bg-accent/10 text-foreground' 
                      : 'border-border hover:border-accent/50 text-muted-foreground'
                    }
                  `}
                >
                  {opt.texto}
                </button>
              )
            })}
          </div>

          <div className="flex justify-between items-center pt-2">
            <Button
              variant="ghost"
              onClick={handlePrev}
              disabled={currentIndex === 0}
            >
              Anterior
            </Button>

            {currentIndex === questions.length - 1 ? (
              <Button
                onClick={handleSubmit}
                disabled={submitAttempt.isPending || answeredCount < questions.length}
              >
                {submitAttempt.isPending ? 'Enviando...' : 'Finalizar'}
              </Button>
            ) : (
              <Button onClick={handleNext} disabled={!answers[currentQuestion.id]}>
                Siguiente
              </Button>
            )}
          </div>
        </Card>
      </div>
    )
  }

  if (phase === 'result' && result) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
        <Card className="w-full max-w-lg mx-4 p-8 space-y-6 text-center">
          <div className="text-5xl mb-2">
            {result.pct >= 80 ? '🎉' : result.pct >= 50 ? '👍' : '💪'}
          </div>
          <h2 className="text-foreground text-2xl font-bold">
            {result.pct >= 80
              ? 'Excelente resultado'
              : result.pct >= 50
                ? 'Buen esfuerzo'
                : 'Sigue practicando'}
          </h2>
          <div className="flex justify-center items-baseline gap-1">
            <span className="text-5xl font-bold text-accent">
              {result.score}
            </span>
            <span className="text-muted-foreground text-lg">
              / {result.total}
            </span>
          </div>
          <p className="text-muted-foreground text-sm">
            {result.pct}% de respuestas correctas
          </p>
          <div className="flex gap-3">
            <Button variant="outline" onClick={onClose} className="flex-1">
              Volver a quizzes
            </Button>
            <Button
              className="flex-1"
              onClick={() => {
                setPhase('intro')
                setQuestions([])
                setCurrentIndex(0)
                setAnswers({})
                setResult(null)
                setAttemptId(null)
              }}
            >
              <i className="ti ti-refresh text-[14px]" />
              Intentar de nuevo
            </Button>
          </div>
        </Card>
      </div>
    )
  }

  return null
}
