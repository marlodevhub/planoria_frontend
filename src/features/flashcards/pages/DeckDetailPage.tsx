import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import { useDeckById, useDeckCards, useStudySession } from '../hooks'
import { DeckProgressPanel } from '../components/DeckProgressPanel'
import { ImportCsvModal } from '../components/ImportCsvModal'
import { ImportJsonModal } from '../components/ImportJsonModal'
import { BulkCardsModal } from '../components/BulkCardsModal'

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

type Tab = 'cards' | 'study' | 'progress'

export function DeckDetailPage() {
  const { deckId } = useParams<{ deckId: string }>()
  const navigate = useNavigate()
  const [tab, setTab] = useState<Tab>('cards')
  const [flipped, setFlipped] = useState(false)
  const [page, setPage] = useState(1)

  const csvModalOpen = useState(false)
  const jsonModalOpen = useState(false)
  const bulkModalOpen = useState(false)

  const numDeckId = Number(deckId) || 0

  const { data: deck, isLoading: deckLoading, isError: deckError } = useDeckById(numDeckId)
  const { data: cardsData, isLoading: cardsLoading, isError: cardsError } = useDeckCards(numDeckId, page, 50)

  const {
    deckName,
    currentCard,
    isLoading: studyLoading,
    isFinished,
    result,
    error: studyError,
    startSession,
    submitAnswer,
    endSession,
    reset,
  } = useStudySession()

  useEffect(() => {
    setFlipped(false)
  }, [currentCard?.flashcard.id])

  const handleStartStudy = () => {
    reset()
    startSession(numDeckId)
    setTab('study')
  }

  return (
    <div className="space-y-4 animate-fade-up">
      {/* Back button + header */}
      <div className="flex items-center gap-3">
        <Button variant="ghost" onClick={() => navigate('/workspace/flashcards')}>
          <i className="ti ti-arrow-left text-[18px]" />
        </Button>
        <div className="flex-1 min-w-0">
          {deckLoading ? (
            <div className="h-5 w-40 rounded bg-muted animate-pulse" />
          ) : (
            <h1 className="text-lg font-bold text-foreground truncate">{deck?.name ?? deckName}</h1>
          )}
        </div>
      </div>

      {/* Tabs */}
      <Tabs value={tab} onValueChange={(v) => setTab(v as Tab)} className="flex-1 flex flex-col min-h-0">
        <TabsList className="h-8">
          <TabsTrigger value="cards" className="text-xs px-3 h-6">Tarjetas</TabsTrigger>
          <TabsTrigger value="study" className="text-xs px-3 h-6">Estudiar</TabsTrigger>
          <TabsTrigger value="progress" className="text-xs px-3 h-6">Progreso</TabsTrigger>
        </TabsList>

        {/* ─── CARDS TAB ───────────────────────────────── */}
        <TabsContent value="cards" className="space-y-4 mt-4">
          {/* Deck info header */}
          {deck && (
            <Card className="p-4 flex items-center gap-4">
              <div
                className="h-10 w-10 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ backgroundColor: deck.colorHex + '20' }}
              >
                <i className="ti ti-cards text-lg" style={{ color: deck.colorHex }} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-foreground truncate">{deck.name}</p>
                <p className="text-xs text-muted-foreground">{deck.courseName} &middot; {deck.totalCards} tarjetas</p>
              </div>
              <div className="flex items-center gap-1">
                <Badge variant="secondary" className="text-xs">
                  {deck.masteredPercentage}% dominado
                </Badge>
              </div>
            </Card>
          )}

          {/* Action buttons */}
          <div className="flex flex-wrap gap-2">
            <Button size="sm" variant="default" onClick={handleStartStudy}>
              <i className="ti ti-player-play text-[15px]" />
              Estudiar
            </Button>
            <Button size="sm" variant="outline" onClick={() => bulkModalOpen[1](true)}>
              <i className="ti ti-plus text-[15px]" />
              Añadir lote
            </Button>
            <Button size="sm" variant="outline" onClick={() => csvModalOpen[1](true)}>
              <i className="ti ti-file-spreadsheet text-[15px]" />
              Importar CSV
            </Button>
            <Button size="sm" variant="outline" onClick={() => jsonModalOpen[1](true)}>
              <i className="ti ti-file-code text-[15px]" />
              Importar JSON
            </Button>
          </div>

          {/* Error state */}
          {deckError && (
            <Card className="p-6 text-center">
              <div className="h-10 w-10 rounded-xl bg-destructive/10 flex items-center justify-center mx-auto mb-3">
                <i className="ti ti-alert-circle text-xl text-destructive" />
              </div>
              <p className="font-semibold text-foreground mb-1">No se pudo cargar el mazo</p>
              <p className="text-xs text-muted-foreground mb-3">Verificá que el mazo exista o intentá de nuevo</p>
              <Button size="sm" variant="outline" onClick={() => navigate('/workspace/flashcards')}>
                Volver a flashcards
              </Button>
            </Card>
          )}

          {!deckError && cardsError && (
            <Card className="p-6 text-center">
              <div className="h-10 w-10 rounded-xl bg-destructive/10 flex items-center justify-center mx-auto mb-3">
                <i className="ti ti-alert-circle text-xl text-destructive" />
              </div>
              <p className="font-semibold text-foreground mb-1">Error al cargar tarjetas</p>
              <Button size="sm" variant="outline" onClick={() => setPage(1)}>
                Reintentar
              </Button>
            </Card>
          )}

          {/* Cards list */}
          {!deckError && !cardsError && cardsLoading && (
            <div className="space-y-2">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-14 rounded-xl bg-muted animate-pulse" />
              ))}
            </div>
          )}

          {!deckError && !cardsError && !cardsLoading && cardsData && cardsData.items.length === 0 && (
            <div className="flex flex-col items-center py-16 text-center">
              <div className="h-12 w-12 rounded-2xl bg-muted flex items-center justify-center mb-3">
                <i className="ti ti-cards text-[22px] text-muted-foreground" />
              </div>
              <p className="font-semibold text-foreground mb-1">Sin tarjetas todavía</p>
              <p className="text-xs text-muted-foreground mb-4 max-w-[200px]">
                Añadí tarjetas en lote o importá un archivo CSV/JSON
              </p>
              <div className="flex gap-2">
                <Button size="sm" variant="outline" onClick={() => bulkModalOpen[1](true)}>
                  Añadir lote
                </Button>
                <Button size="sm" variant="outline" onClick={() => csvModalOpen[1](true)}>
                  Importar CSV
                </Button>
              </div>
            </div>
          )}

          {!deckError && !cardsError && !cardsLoading && cardsData && cardsData.items.length > 0 && (
            <div className="space-y-1.5">
              {cardsData.items.map((card) => (
                <Card key={card.id} className="p-3 flex items-center gap-3">
                  <span className={`h-2 w-2 rounded-full flex-shrink-0 ${
                    card.difficulty === 'easy' ? 'bg-green-500' :
                    card.difficulty === 'medium' ? 'bg-yellow-500' : 'bg-red-500'
                  }`} />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground truncate">{card.question}</p>
                    <p className="text-xs text-muted-foreground truncate">{card.answer}</p>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground flex-shrink-0">
                    {card.tags.length > 0 && (
                      <span className="hidden sm:inline">{card.tags.join(', ')}</span>
                    )}
                    <span className="font-mono">{card.repetitions} rep.</span>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>

        {/* ─── STUDY TAB ───────────────────────────────── */}
        <TabsContent value="study" className="space-y-4 mt-4">
          {!currentCard && !studyLoading && !isFinished && !studyError && (
            <div className="flex flex-col items-center py-20 text-center">
              <div className="h-14 w-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-4">
                <i className="ti ti-player-play text-2xl text-primary" />
              </div>
              <p className="font-semibold text-foreground mb-1">
                {deck?.name ?? deckName}
              </p>
              <p className="text-xs text-muted-foreground mb-5 max-w-[220px]">
                Iniciá una sesión de estudio para repasar las tarjetas
              </p>
              <Button onClick={() => startSession(numDeckId)} size="sm">
                <i className="ti ti-player-play text-[15px]" />
                Iniciar sesión
              </Button>
            </div>
          )}

          {studyLoading && !currentCard && (
            <div className="flex items-center justify-center min-h-[40vh]">
              <div className="space-y-4 text-center">
                <i className="ti ti-loader-2 animate-spin text-3xl text-muted-foreground" />
                <p className="text-muted-foreground text-sm">Preparando sesión de estudio...</p>
              </div>
            </div>
          )}

          {studyError && (
            <div className="space-y-4">
              <div className="flex flex-col items-center justify-center py-16 text-center">
                <div className="h-14 w-14 rounded-2xl bg-destructive/10 flex items-center justify-center mb-4">
                  <i className="ti ti-alert-circle text-2xl text-destructive" />
                </div>
                <p className="font-semibold text-foreground mb-1">Error al iniciar sesión</p>
                <p className="text-muted-foreground text-sm mb-5">{studyError}</p>
                <Button onClick={() => startSession(numDeckId)} size="sm">
                  Reintentar
                </Button>
              </div>
            </div>
          )}

          {isFinished && result && (
            <div className="space-y-6 max-w-md mx-auto py-6">
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
                  onClick={() => { reset(); setTab('cards'); }}
                >
                  Volver a tarjetas
                </Button>
                <Button
                  className="flex-1"
                  onClick={() => {
                    reset()
                    startSession(numDeckId)
                  }}
                >
                  <i className="ti ti-refresh text-[15px]" />
                  Estudiar de nuevo
                </Button>
              </div>
            </div>
          )}

          {currentCard && (
            <div className="space-y-6 max-w-2xl mx-auto">
              <div className="flex items-center gap-3">
                <Button variant="ghost" onClick={endSession}>
                  <i className="ti ti-arrow-left text-[18px]" />
                </Button>
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-muted-foreground">
                    Tarjeta {currentCard.current} de {currentCard.total}
                  </p>
                </div>
                <Button variant="ghost" size="sm" onClick={endSession}>
                  Finalizar
                </Button>
              </div>

              <Progress
                value={currentCard.total > 0 ? Math.round(((currentCard.current - 1) / currentCard.total) * 100) : 0}
                className="h-1.5"
              />

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
          )}
        </TabsContent>

        {/* ─── PROGRESS TAB ────────────────────────────── */}
        <TabsContent value="progress" className="space-y-4 mt-4">
          <DeckProgressPanel deckId={numDeckId} deckName={deck?.name ?? deckName} />
        </TabsContent>
      </Tabs>

      {/* Modals */}
      <ImportCsvModal
        deckId={numDeckId}
        deckName={deck?.name ?? deckName}
        open={csvModalOpen[0]}
        onClose={() => csvModalOpen[1](false)}
      />
      <ImportJsonModal
        deckId={numDeckId}
        deckName={deck?.name ?? deckName}
        open={jsonModalOpen[0]}
        onClose={() => jsonModalOpen[1](false)}
      />
      <BulkCardsModal
        deckId={numDeckId}
        deckName={deck?.name ?? deckName}
        open={bulkModalOpen[0]}
        onClose={() => bulkModalOpen[1](false)}
      />
    </div>
  )
}
