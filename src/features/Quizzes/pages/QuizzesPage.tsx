import { useState } from 'react'
import { useQuizzes } from '../hooks'
import { useCourses } from '@/features/courses/hooks'
import { TakeQuizModal } from '../components/TakeQuizModal'
import { GenerateQuizModal } from '../components/GenerateQuizModal'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import type { QuizListItem } from '../types/quiz.types'

function QuizzesSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
      {[...Array(6)].map((_, i) => (
        <div
          key={i}
          className="h-[160px] rounded-xl bg-muted animate-pulse"
          style={{ animationDelay: `${i * 80}ms` }}
        />
      ))}
    </div>
  )
}

export function QuizzesPage() {
  const { data: quizzes, isLoading, isError } = useQuizzes()
  const { data: courses } = useCourses()
  const [selectedQuiz, setSelectedQuiz] = useState<QuizListItem | null>(null)
  const [showGenerateModal, setShowGenerateModal] = useState(false)

  const courseColors = new Map(
    courses?.filter((c) => !c.isArchived).map((c) => [c.name, c.colorHex]) ?? [],
  )

  return (
    <div className="space-y-5 animate-fade-up">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-foreground tracking-tight">Quizzes</h1>
          <p className="text-muted-foreground text-sm mt-0.5">
            {isLoading
              ? 'Cargando...'
              : quizzes?.length
                ? `${quizzes.length} quiz${quizzes.length !== 1 ? 'zes' : ''}`
                : 'Generá quizzes desde tus archivos'}
          </p>
        </div>
        <Button onClick={() => setShowGenerateModal(true)} size="sm">
          <i className="ti ti-sparkles text-[15px]" />
          Generar quiz
        </Button>
      </div>

      {isLoading && <QuizzesSkeleton />}

      {isError && (
        <div className="flex items-center gap-3 p-4 rounded-xl bg-destructive/5 border border-destructive/15">
          <i className="ti ti-alert-circle text-destructive text-[18px] flex-shrink-0" />
          <div>
            <p className="text-sm font-medium text-foreground">No se pudieron cargar los quizzes</p>
            <p className="text-xs text-muted-foreground mt-0.5">Revisá tu conexión e intentá de nuevo</p>
          </div>
        </div>
      )}

      {!isLoading && !isError && quizzes?.length === 0 && (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <div className="relative mb-5">
            <div className="h-14 w-14 rounded-2xl bg-muted flex items-center justify-center">
              <i className="ti ti-notes text-[26px] text-muted-foreground" />
            </div>
            <div className="absolute -bottom-1 -right-1 h-5 w-5 rounded-full bg-primary flex items-center justify-center">
              <i className="ti ti-sparkles text-[11px] text-primary-foreground" />
            </div>
          </div>
          <p className="font-semibold text-foreground mb-1">Sin quizzes todavía</p>
          <p className="text-muted-foreground text-sm mb-5 max-w-[220px] leading-relaxed">
            Generá tu primer quiz subiendo un PDF de tu curso
          </p>
          <Button onClick={() => setShowGenerateModal(true)} size="sm">
            <i className="ti ti-sparkles text-[15px]" />
            Generar quiz
          </Button>
        </div>
      )}

      {!isLoading && !isError && !!quizzes?.length && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {quizzes.map((quiz) => {
            const color = courseColors.get(quiz.cursoNombre ?? '') ?? '#888'
            return (
              <Card
                key={quiz.id}
                className="relative cursor-pointer transition-all duration-200 group p-0 overflow-hidden hover:shadow-md hover:-translate-y-px"
                onClick={() => setSelectedQuiz(quiz)}
              >
                <div
                  className="absolute left-0 top-0 bottom-0 w-[3px]"
                  style={{ backgroundColor: color }}
                />
                <div className="pl-5 pr-4 pt-4 pb-4 flex flex-col gap-3">
                  <div className="flex items-start gap-2">
                    <div
                      className="h-2.5 w-2.5 rounded-full flex-shrink-0 mt-0.5"
                      style={{ backgroundColor: color }}
                    />
                    <div className="min-w-0 flex-1">
                      <p className="font-semibold text-foreground text-sm leading-tight truncate">
                        {quiz.titulo}
                      </p>
                      {quiz.cursoNombre && (
                        <p className="text-muted-foreground text-[11px] mt-0.5">{quiz.cursoNombre}</p>
                      )}
                    </div>
                  </div>

                  <p className="text-muted-foreground text-xs line-clamp-2 leading-relaxed">
                    {quiz.descripcion || 'Sin descripción'}
                  </p>

                  <div className="flex items-center gap-3 text-[11px] font-mono text-muted-foreground">
                    <span>{quiz.preguntaCount} preguntas</span>
                    {quiz.duracionMinutos > 0 && <span>{quiz.duracionMinutos}min</span>}
                    {quiz.intentosRealizados > 0 && (
                      <span className="ml-auto text-accent font-semibold">{quiz.mejorPuntuacion}%</span>
                    )}
                  </div>

                  <Button
                    size="sm"
                    className="w-full mt-auto"
                    onClick={(e) => {
                      e.stopPropagation()
                      setSelectedQuiz(quiz)
                    }}
                  >
                    <i className="ti ti-player-play text-[14px]" />
                    {quiz.intentosRealizados > 0 ? 'Intentar de nuevo' : 'Comenzar'}
                  </Button>
                </div>
              </Card>
            )
          })}
        </div>
      )}

      <GenerateQuizModal
        open={showGenerateModal}
        onClose={() => setShowGenerateModal(false)}
      />

      {selectedQuiz && (
        <TakeQuizModal quiz={selectedQuiz} onClose={() => setSelectedQuiz(null)} />
      )}
    </div>
  )
}
