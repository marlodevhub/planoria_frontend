import { useState, useCallback } from 'react'
import { useStartAttempt } from '../hooks/useStartAttempt'
import { useSubmitAttempt } from '../hooks/useSubmitAttempt'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import {
  Dialog,
  DialogContent,
} from '@/components/ui/dialog'
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
  const [error, setError] = useState<string | null>(null)

  const startAttempt = useStartAttempt()
  const submitAttempt = useSubmitAttempt()

  const handleStart = useCallback(async () => {
    setError(null)
    try {
      const res = await startAttempt.mutateAsync(quiz.id)
      setAttemptId(res.attemptId)
      setQuestions(res.preguntas)
      setPhase('taking')
    } catch (e: any) {
      setError(e?.message ?? 'Error al iniciar intento')
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
    setError(null)
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
    } catch (e: any) {
      setError(e?.message ?? 'Error al enviar respuestas')
    }
  }, [attemptId, answers, submitAttempt])

  const answeredCount = Object.keys(answers).length
  const currentQuestion = questions[currentIndex]

  // Intro
  if (phase === 'intro') {
    return (
      <Dialog open={true} onOpenChange={onClose}>
        <DialogContent className="max-w-lg p-0 overflow-hidden gap-0 border-border">
          <Card className="w-full max-w-lg p-6 space-y-6 border-0 shadow-none">
            <div className="flex items-start justify-between gap-3">
              <div className="h-12 w-12 rounded-2xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                <i className="ti ti-clipboard-check text-2xl text-primary" />
              </div>
            </div>
            <div>
              <h2 className="text-lg font-bold text-foreground">{quiz.titulo}</h2>
              {quiz.descripcion && (
                <p className="text-sm text-muted-foreground mt-1">{quiz.descripcion}</p>
              )}
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div className="rounded-xl bg-muted/50 p-3 flex flex-col gap-1">
                <div className="flex items-center gap-1.5 text-muted-foreground">
                  <i className="ti ti-question-mark text-[13px]" />
                  <span className="text-xs">Preguntas</span>
                </div>
                <p className="text-sm font-semibold text-foreground">{quiz.preguntaCount}</p>
              </div>
              <div className="rounded-xl bg-muted/50 p-3 flex flex-col gap-1">
                <div className="flex items-center gap-1.5 text-muted-foreground">
                  <i className="ti ti-clock text-[13px]" />
                  <span className="text-xs">Duración</span>
                </div>
                <p className="text-sm font-semibold text-foreground">{quiz.duracionMinutos} min</p>
              </div>
            </div>
            {error && (
              <div className="rounded-xl bg-destructive/10 border border-destructive/20 p-3 flex items-center gap-2">
                <i className="ti ti-alert-circle text-destructive text-[15px]" />
                <p className="text-xs text-destructive">{error}</p>
              </div>
            )}
            <div className="flex gap-3">
              <Button variant="outline" onClick={onClose} className="flex-1">
                Cancelar
              </Button>
              <Button onClick={handleStart} disabled={startAttempt.isPending} className="flex-1">
                {startAttempt.isPending ? (
                  <><i className="ti ti-loader-2 animate-spin text-[15px]" /> Cargando...</>
                ) : (
                  <><i className="ti ti-player-play text-[15px]" /> Comenzar</>
                )}
              </Button>
            </div>
          </Card>
        </DialogContent>
      </Dialog>
    )
  }

  // Taking
  if (phase === 'taking' && currentQuestion) {
    return (
      <Dialog open={true} onOpenChange={onClose}>
        <DialogContent className="max-w-2xl p-0 overflow-hidden gap-0 border-border">
          <Card className="w-full p-6 space-y-5 border-0 shadow-none">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <i className="ti ti-question-mark text-[13px]" />
                <span>Pregunta {currentIndex + 1} de {questions.length}</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <i className="ti ti-checks text-[13px]" />
                <span>{answeredCount}/{questions.length} respondidas</span>
              </div>
            </div>

            <Progress
              value={((currentIndex + 1) / questions.length) * 100}
              className="h-1.5"
            />

            <div className="rounded-xl bg-muted/30 p-4 border border-border">
              <h3 className="text-base font-medium text-foreground leading-relaxed">
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
                    className={`w-full text-left px-4 py-3.5 rounded-xl border transition-all text-sm
                      ${isSelected
                        ? 'border-accent bg-accent/10 text-foreground font-medium'
                        : 'border-border hover:border-accent/50 hover:bg-accent/5 text-muted-foreground'
                      }
                    `}
                  >
                    {opt.texto}
                  </button>
                )
              })}
            </div>

            {error && (
              <div className="rounded-xl bg-destructive/10 border border-destructive/20 p-3 flex items-center gap-2">
                <i className="ti ti-alert-circle text-destructive text-[15px]" />
                <p className="text-xs text-destructive">{error}</p>
              </div>
            )}

            <div className="flex justify-between items-center pt-1">
              <Button variant="ghost" size="sm" onClick={handlePrev} disabled={currentIndex === 0}>
                <i className="ti ti-arrow-left text-[15px]" />
                Anterior
              </Button>
              {currentIndex === questions.length - 1 ? (
                <Button
                  size="sm"
                  onClick={handleSubmit}
                  disabled={submitAttempt.isPending || answeredCount < questions.length}
                >
                  {submitAttempt.isPending ? (
                    <><i className="ti ti-loader-2 animate-spin text-[15px]" /> Enviando...</>
                  ) : (
                    <><i className="ti ti-check text-[15px]" /> Finalizar</>
                  )}
                </Button>
              ) : (
                <Button size="sm" onClick={handleNext} disabled={!answers[currentQuestion.id]}>
                  Siguiente
                  <i className="ti ti-arrow-right text-[15px]" />
                </Button>
              )}
            </div>
          </Card>
        </DialogContent>
      </Dialog>
    )
  }

  // Result
  if (phase === 'result' && result) {
    const label = result.pct >= 80
      ? 'Excelente resultado'
      : result.pct >= 50
        ? 'Buen esfuerzo'
        : 'Sigue practicando'

    return (
      <Dialog open={true} onOpenChange={onClose}>
        <DialogContent className="max-w-lg p-0 overflow-hidden gap-0 border-border">
          <Card className="w-full p-6 space-y-6 text-center border-0 shadow-none">
            <div className="h-16 w-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto">
              <i className="ti ti-certificate text-3xl text-primary" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-foreground">{label}</h2>
              <p className="text-sm text-muted-foreground mt-0.5">{quiz.titulo}</p>
            </div>

            <div className="rounded-2xl border border-border bg-card p-6 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Puntaje</span>
                <span className="text-2xl font-bold text-foreground">{Math.round(result.pct)}%</span>
              </div>
              <Progress value={result.pct} className="h-2" />
              <div className="grid grid-cols-3 gap-3 pt-2">
                <div className="text-center">
                  <p className="text-2xl font-bold text-green-500">{result.score}</p>
                  <p className="text-xs text-muted-foreground">Correctas</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-red-500">{result.total - result.score}</p>
                  <p className="text-xs text-muted-foreground">Incorrectas</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-foreground">{result.total}</p>
                  <p className="text-xs text-muted-foreground">Total</p>
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <Button variant="outline" onClick={onClose} className="flex-1">
                Volver a quizzes
              </Button>
              <Button className="flex-1" onClick={() => {
                setPhase('intro')
                setQuestions([])
                setCurrentIndex(0)
                setAnswers({})
                setResult(null)
                setAttemptId(null)
                setError(null)
              }}>
                <i className="ti ti-refresh text-[15px]" />
                Intentar de nuevo
              </Button>
            </div>
          </Card>
        </DialogContent>
      </Dialog>
    )
  }

  return null
}