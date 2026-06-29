import { useRecentActivity } from '../hooks'

const TYPE_ICON: Record<string, string> = {
  quiz: '\uD83D\uDCDD',
  flashcards: '\uD83C\uDCCF',
  study: '\uD83D\uDCD6',
  schedule: '\uD83D\uDCC5',
  course: '\uD83D\uDCDA',
  exam: '\uD83C\uDFAF',
  achievement: '\uD83C\uDFC6',
}

const ACTION_LABELS: Record<string, string> = {
  'course.created': 'Creaste el curso',
  'course.updated': 'Actualizaste el curso',
  'course.deleted': 'Eliminaste el curso',
  'course.archived': 'Archivaste el curso',
  'course.restored': 'Restauraste el curso',
  'flashcard.created': 'Creaste tarjetas en',
  'flashcard.updated': 'Actualizaste tarjetas en',
  'flashcard.deleted': 'Eliminaste tarjetas de',
  'flashcard.reviewed': 'Repasaste tarjetas de',
  'deck.created': 'Creaste el mazo',
  'deck.updated': 'Actualizaste el mazo',
  'deck.deleted': 'Eliminaste el mazo',
  'quiz.created': 'Creaste el quiz',
  'quiz.updated': 'Actualizaste el quiz',
  'quiz.deleted': 'Eliminaste el quiz',
  'quiz.completed': 'Completaste el quiz',
  'quiz.started': 'Iniciaste el quiz',
  'study.session_started': 'Iniciaste sesión de estudio en',
  'study.session_completed': 'Completaste sesión de estudio en',
  'schedule.created': 'Agregaste un horario',
  'schedule.updated': 'Actualizaste un horario',
  'schedule.deleted': 'Eliminaste un horario',
  'schedule.completed': 'Completaste un horario',
  'exam.created': 'Registraste examen de',
  'exam.updated': 'Actualizaste examen de',
  'exam.deleted': 'Eliminaste examen de',
  'file.uploaded': 'Subiste un archivo a',
  'file.processed': 'Procesaste un archivo de',
  'ai.generated': 'Generaste contenido con IA para',
  'user.registered': 'Te registraste en Planoria',
  'user.login': 'Iniciaste sesión',
  'user.logout': 'Cerraste sesión',
  'achievement.unlocked': 'Desbloqueaste el logro',
  'goal.created': 'Estableciste una meta',
  'goal.updated': 'Actualizaste una meta',
  'goal.completed': 'Completaste una meta',
}

function translateAction(action: string, title: string): string {
  const label = ACTION_LABELS[action]
  if (label) return `${label} ${title}`
  if (action) return `${action.replace(/\./g, ' ')} ${title}`
  return title
}

export function RecentActivity() {
  const { data: activities, isLoading } = useRecentActivity(10)

  if (isLoading) {
    return <div className="h-48 rounded-2xl bg-muted animate-pulse" />
  }

  const items = activities ?? []

  return (
    <div className="bg-card border border-border rounded-2xl p-6 space-y-4">
      <h2 className="text-foreground font-semibold text-base">
        Actividad reciente
      </h2>

      {items.length === 0 ? (
        <p className="text-muted-foreground text-sm">
          Aún no hay actividad. Empieza a estudiar para ver tu progreso.
        </p>
      ) : (
        <div className="space-y-1">
          {items.map((item, i) => (
            <div
              key={`${item.timestamp}-${i}`}
              className="flex items-start justify-between gap-3 py-2.5 border-b border-border last:border-0"
            >
              <div className="flex items-start gap-2.5 min-w-0">
                <span className="text-sm mt-0.5 shrink-0">
                  {TYPE_ICON[item.type] ?? '\uD83D\uDCCC'}
                </span>
                <div className="min-w-0">
                  <p className="text-foreground text-sm">
                    {translateAction(item.action, item.title)}
                  </p>
                  {item.courseName && (
                    <p className="text-muted-foreground text-xs mt-0.5">
                      {item.courseName}
                    </p>
                  )}
                </div>
              </div>
              <span className="text-muted-foreground text-xs shrink-0 whitespace-nowrap">
                {formatRelativeTime(item.timestamp)}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

function formatRelativeTime(timestamp: string): string {
  const now = Date.now()
  const date = new Date(timestamp).getTime()
  const diffMs = now - date
  const diffMins = Math.floor(diffMs / 60000)
  const diffHours = Math.floor(diffMs / 3600000)
  const diffDays = Math.floor(diffMs / 86400000)

  if (diffMins < 1) return 'ahora'
  if (diffMins < 60) return `hace ${diffMins}m`
  if (diffHours < 24) return `hace ${diffHours}h`
  if (diffDays < 7) return `hace ${diffDays}d`
  return new Date(timestamp).toLocaleDateString('es-ES', {
    day: 'numeric', month: 'short',
  })
}
