import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { useStudySession } from '../hooks/useStudySession'

function FlipCard({
  question,
  answer,
  flipped,
  onFlip,
}: {
  question: string
  answer: string
  flipped: boolean
  onFlip: () => void
}) {
  return (
    <div
      className="relative w-full max-w-lg mx-auto cursor-pointer select-none"
      style={{ minHeight: 260 }}
      onClick={onFlip}
    >
      <div
        className={`absolute inset-0 transition-all duration-500 [transform-style:preserve-3d] ${flipped ? '[transform:rotateY(180deg)]' : ''}`}
      >
        <div
          className={`rounded-2xl border bg-card p-8 flex flex-col items-center justify-center text-center backface-hidden ${flipped ? 'invisible' : ''}`}
          style={{ minHeight: 260 }}
        >
          <i className="ti ti-question-mark text-4xl text-muted-foreground/30 mb-4" />
          <p className="text-lg font-medium text-foreground leading-relaxed">
            {question}
          </p>
          <p className="text-xs text-muted-foreground mt-6">Toca para ver la respuesta</p>
        </div>
        <div
          className={`absolute inset-0 rounded-2xl border bg-card p-8 flex flex-col items-center justify-center text-center [transform:rotateY(180deg)] backface-hidden ${!flipped ? 'invisible' : ''}`}
          style={{ minHeight: 260 }}
        >
          <i className="ti ti-bulb text-4xl text-yellow-500/30 mb-4" />
          <p className="text-lg font-medium text-foreground leading-relaxed">
            {answer}
          </p>
          <p className="text-xs text-muted-foreground mt-6">Toca para ocultar</p>
        </div>
      </div>
    </div>
  )
}

export function DeckDetailPage() {
  const { deckId } = useParams<{ deckId: string }>()
  const navigate = useNavigate()
  const {
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
  } = useStudySession()
  const [flipped, setFlipped] = useState(false)

  useEffect(() => {
    if (deckId) {
      startSession(Number(deckId))
    }
  }, [deckId])

  useEffect(() => {
    setFlipped(false)
  }, [currentCard?.flashcard.id])

  if (isLoading && !currentCard) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="space-y-4 text-center">
          <i className="ti ti-loader-2 animate-spin text-3xl text-muted-foreground" />
          <p className="text-muted-foreground text-sm">Preparando sesión de estudio...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="space-y-4 animate-fade-up">
        <Button variant="ghost" onClick={() => navigate('/workspace/flashcards')}>
          <i className="ti ti-arrow-left text-[18px]" />
        </Button>
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <div className="h-14 w-14 rounded-2xl bg-destructive/10 flex items-center justify-center mb-4">
            <i className="ti ti-alert-circle text-2xl text-destructive" />
          </div>
          <p className="font-semibold text-foreground mb-1">Error al iniciar sesión</p>
          <p className="text-muted-foreground text-sm mb-5">{error}</p>
          <Button onClick={() => deckId && startSession(Number(deckId))}>
            Reintentar
          </Button>
        </div>
      </div>
    )
  }

  if (isFinished && result) {
    const percentage = result.total > 0 ? Math.round((result.correct / result.total) * 100) : 0
    return (
      <div className="space-y-6 animate-fade-up max-w-md mx-auto py-10">
        <Button variant="ghost" onClick={() => navigate('/workspace/flashcards')}>
          <i className="ti ti-arrow-left text-[18px]" />
        </Button>

        <div className="text-center space-y-2">
          <div className="h-16 w-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-3">
            <i className="ti ti-certificate text-3xl text-primary" />
          </div>
          <h2 className="text-xl font-bold text-foreground">¡Sesión completada!</h2>
          <p className="text-muted-foreground text-sm">{deckName}</p>
        </div>

        <Card className="p-6 space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Puntaje</span>
            <span className="text-2xl font-bold text-foreground">{Math.round(result.score)}%</span>
          </div>
          <Progress value={result.score} className="h-2" />
          <div className="grid grid-cols-3 gap-3 pt-2">
            <div className="text-center">
              <p className="text-2xl font-bold text-green-500">{result.correct}</p>
              <p className="text-xs text-muted-foreground">Correctas</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-red-500">{result.incorrect}</p>
              <p className="text-xs text-muted-foreground">Incorrectas</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-foreground">{result.total}</p>
              <p className="text-xs text-muted-foreground">Total</p>
            </div>
          </div>
        </Card>

        <div className="flex gap-3">
          <Button
            variant="outline"
            className="flex-1"
            onClick={() => navigate('/workspace/flashcards')}
          >
            Volver a mazos
          </Button>
          <Button
            className="flex-1"
            onClick={() => {
              reset()
              if (deckId) startSession(Number(deckId))
            }}
          >
            <i className="ti ti-refresh text-[15px]" />
            Estudiar de nuevo
          </Button>
        </div>
      </div>
    )
  }

  if (!currentCard) return null

  const progressPct = currentCard.total > 0
    ? Math.round(((currentCard.current - 1) / currentCard.total) * 100)
    : 0

  return (
    <div className="space-y-6 animate-fade-up max-w-2xl mx-auto py-6">
      <div className="flex items-center gap-3">
        <Button variant="ghost" onClick={endSession}>
          <i className="ti ti-arrow-left text-[18px]" />
        </Button>
        <div className="flex-1 min-w-0">
          <h1 className="text-lg font-bold text-foreground truncate">{deckName}</h1>
          <p className="text-xs text-muted-foreground">
            Tarjeta {currentCard.current} de {currentCard.total}
          </p>
        </div>
        <Button variant="ghost" size="sm" onClick={endSession}>
          Finalizar
        </Button>
      </div>

      <Progress value={progressPct} className="h-1.5" />

      <FlipCard
        question={currentCard.flashcard.question}
        answer={currentCard.flashcard.answer}
        flipped={flipped}
        onFlip={() => setFlipped(!flipped)}
      />

      <div className="flex gap-4 justify-center">
        <Button
          variant="outline"
          size="lg"
          className="flex-1 max-w-[180px] h-14 border-red-200 hover:bg-red-50 hover:border-red-300 text-red-600 hover:text-red-700"
          onClick={async () => {
            setFlipped(false)
            await submitAnswer(false)
          }}
        >
          <i className="ti ti-x text-xl mr-2" />
          No me la sé
        </Button>
        <Button
          size="lg"
          className="flex-1 max-w-[180px] h-14 bg-green-600 hover:bg-green-700 text-white"
          onClick={async () => {
            setFlipped(false)
            await submitAnswer(true)
          }}
        >
          <i className="ti ti-check text-xl mr-2" />
          La sé
        </Button>
      </div>

      <p className="text-center text-xs text-muted-foreground">
        {currentCard.remainingCards} tarjetas restantes
      </p>
    </div>
  )
}
