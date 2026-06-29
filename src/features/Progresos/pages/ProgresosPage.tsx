import { useMemo } from 'react'
import { useGlobalStats } from '../hooks/useGlobalStats'
import { useWeeklyTrend } from '../hooks/useWeeklyTrend'
import { useFlashcardProgress } from '../hooks/useFlashcardProgress'
import { useQuizProgress } from '../hooks/useQuizProgress'
import { useAchievements } from '../hooks/useAchievements'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

function StatCard({ label, value, icon, color }: { label: string; value: string; icon: string; color: string }) {
  return (
    <div className="relative overflow-hidden rounded-2xl border bg-card p-5 transition-all duration-200 hover:shadow-md">
      <div className="absolute right-0 top-0 h-20 w-20 translate-x-6 -translate-y-6 rounded-full opacity-10" style={{ backgroundColor: color }} />
      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">{label}</p>
          <p className="text-2xl font-bold text-foreground">{value}</p>
        </div>
        <div className="flex h-10 w-10 items-center justify-center rounded-xl" style={{ backgroundColor: `${color}15` }}>
          <span className="text-lg">{icon}</span>
        </div>
      </div>
    </div>
  )
}

export function ProgresosPage() {
  const { data: globalStats, isLoading: statsLoading } = useGlobalStats()
  const { data: weeklyTrend, isLoading: trendLoading } = useWeeklyTrend()
  const { data: flashcardProgress, isLoading: flashcardLoading } = useFlashcardProgress()
  const { data: quizProgress, isLoading: quizLoading } = useQuizProgress()
  const { data: achievements, isLoading: achLoading } = useAchievements()

  const statsCards = useMemo(() => [
    { label: 'Horas de estudio', value: String(globalStats?.totalStudyHours ?? 0), icon: '⏱', color: '#6366f1' },
    { label: 'Tarjetas revisadas', value: String(globalStats?.totalCardsReviewed ?? 0), icon: '🃏', color: '#8b5cf6' },
    { label: 'Quizzes completados', value: String(globalStats?.totalQuizzesCompleted ?? 0), icon: '📝', color: '#06b6d4' },
    { label: 'Retención promedio', value: `${globalStats?.averageRetention ?? 0}%`, icon: '🧠', color: '#10b981' },
    { label: 'Racha', value: `${globalStats?.streakDays ?? 0} días`, icon: '🔥', color: '#f59e0b' },
    { label: 'Cursos inscritos', value: String(globalStats?.coursesEnrolled ?? 0), icon: '📚', color: '#ef4444' },
  ], [globalStats])

  return (
    <div className="space-y-6 animate-fade-up">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Progresos</h1>
        <p className="text-muted-foreground text-sm mt-1">Estadísticas y rendimiento general</p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {statsLoading
          ? Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="h-[108px] rounded-2xl bg-muted animate-pulse" />
            ))
          : statsCards.map((s) => <StatCard key={s.label} {...s} />)}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <Card className="p-5">
          <h2 className="text-foreground font-semibold text-base mb-4 flex items-center gap-2">
            <i className="ti ti-calendar-stats text-[18px] text-muted-foreground" />
            Actividad semanal
          </h2>
          {trendLoading ? (
            <div className="h-40 rounded-xl bg-muted animate-pulse" />
          ) : weeklyTrend && weeklyTrend.length > 0 ? (
            <div className="space-y-2">
              {weeklyTrend.map((day) => (
                <div key={day.day} className="flex items-center gap-3">
                  <span className="text-foreground text-sm w-16 font-medium">{day.day}</span>
                  <div className="flex-1">
                    <div className="w-full bg-muted rounded-full h-2.5 overflow-hidden">
                      <div
                        className="h-2.5 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 transition-all duration-500"
                        style={{ width: `${Math.min(100, (day.studyMinutes / 120) * 100)}%` }}
                      />
                    </div>
                  </div>
                  <span className="text-muted-foreground text-xs w-12 text-right font-mono">
                    {day.studyMinutes}m
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-10 text-center">
              <div className="h-10 w-10 rounded-xl bg-muted flex items-center justify-center mb-3">
                <i className="ti ti-chart-bar text-lg text-muted-foreground" />
              </div>
              <p className="text-sm text-muted-foreground">No hay datos de actividad esta semana.</p>
            </div>
          )}
        </Card>

        <Card className="p-5">
          <h2 className="text-foreground font-semibold text-base mb-4 flex items-center gap-2">
            <i className="ti ti-cards text-[18px] text-muted-foreground" />
            Progreso de Flashcards
          </h2>
          {flashcardLoading ? (
            <div className="space-y-4">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="h-14 rounded-xl bg-muted animate-pulse" />
              ))}
            </div>
          ) : flashcardProgress && flashcardProgress.length > 0 ? (
            <div className="space-y-4">
              {flashcardProgress.map((deck) => (
                <div key={deck.deckId} className="space-y-1.5">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-foreground truncate">{deck.deckName}</span>
                    <span className="text-xs font-mono text-muted-foreground">{deck.masteryPercentage}%</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
                    <div
                      className="h-2 rounded-full bg-gradient-to-r from-violet-500 to-indigo-500 transition-all duration-500"
                      style={{ width: `${deck.masteryPercentage}%` }}
                    />
                  </div>
                  <p className="text-[11px] text-muted-foreground">
                    {deck.masteredCards}/{deck.totalCards} dominadas
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-10 text-center">
              <div className="h-10 w-10 rounded-xl bg-muted flex items-center justify-center mb-3">
                <i className="ti ti-cards text-lg text-muted-foreground" />
              </div>
              <p className="text-sm text-muted-foreground">Crea y estudia flashcards para ver tu progreso.</p>
            </div>
          )}
        </Card>
      </div>

      <Card className="p-5">
        <h2 className="text-foreground font-semibold text-base mb-4 flex items-center gap-2">
          <i className="ti ti-notes text-[18px] text-muted-foreground" />
          Progreso de Quizzes
        </h2>
        {quizLoading ? (
          <div className="space-y-3">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-12 rounded-xl bg-muted animate-pulse" />
            ))}
          </div>
        ) : quizProgress && quizProgress.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border text-muted-foreground text-xs uppercase tracking-wider">
                  <th className="text-left py-3 pr-4 font-medium">Quiz</th>
                  <th className="text-center py-3 pr-4 font-medium">Intentos</th>
                  <th className="text-center py-3 pr-4 font-medium">Mejor</th>
                  <th className="text-center py-3 font-medium">Promedio</th>
                </tr>
              </thead>
              <tbody>
                {quizProgress.map((q) => (
                  <tr key={q.quizId} className="border-b border-border last:border-0 hover:bg-muted/30 transition-colors">
                    <td className="py-3 pr-4 text-foreground font-medium">{q.quizTitle}</td>
                    <td className="py-3 pr-4 text-center text-muted-foreground">{q.attempts}</td>
                    <td className="py-3 pr-4 text-center">
                      <span className={`font-semibold ${q.bestScore >= 70 ? 'text-green-600' : 'text-orange-600'}`}>
                        {q.bestScore}%
                      </span>
                    </td>
                    <td className="py-3 text-center text-muted-foreground">{q.averageScore}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-10 text-center">
            <div className="h-10 w-10 rounded-xl bg-muted flex items-center justify-center mb-3">
              <i className="ti ti-notes text-lg text-muted-foreground" />
            </div>
            <p className="text-sm text-muted-foreground">Completa quizzes para ver tu progreso.</p>
          </div>
        )}
      </Card>

      <Card className="p-5">
        <h2 className="text-foreground font-semibold text-base mb-4 flex items-center gap-2">
          <i className="ti ti-award text-[18px] text-muted-foreground" />
          Logros
        </h2>
        {achLoading ? (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-28 rounded-2xl bg-muted animate-pulse" />
            ))}
          </div>
        ) : achievements && achievements.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {achievements.map((ach) => (
              <Card
                key={ach.id}
                className={`p-5 flex flex-col items-center gap-2 text-center transition-all duration-200 ${
                  ach.completado ? 'border-primary/30 bg-primary/[0.03]' : 'opacity-45 grayscale'
                }`}
              >
                <span className="text-3xl">{ach.icono}</span>
                <span className="text-foreground text-sm font-semibold">{ach.nombre}</span>
                <span className="text-muted-foreground text-[11px] leading-relaxed">{ach.descripcion}</span>
                {!ach.completado && ach.progreso > 0 && (
                  <div className="w-full bg-muted rounded-full h-1 mt-1 overflow-hidden">
                    <div className="bg-accent h-1 rounded-full" style={{ width: `${ach.progreso}%` }} />
                  </div>
                )}
                {ach.completado && (
                  <Badge variant="secondary" className="text-[10px] mt-1">
                    <i className="ti ti-check text-[11px] mr-0.5" />
                    Desbloqueado
                  </Badge>
                )}
              </Card>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-10 text-center">
            <div className="h-10 w-10 rounded-xl bg-muted flex items-center justify-center mb-3">
              <i className="ti ti-award text-lg text-muted-foreground" />
            </div>
            <p className="text-sm text-muted-foreground">Sigue estudiando para desbloquear logros.</p>
          </div>
        )}
      </Card>
    </div>
  )
}
